import { NextRequest, NextResponse } from "next/server";

// eBay API condition IDs mapping
const CONDITION_MAP: Record<string, string> = {
  "New": "1000",
  "New (Other)": "1500",
  "Manufacturer Refurbished": "2000",
  "Seller Refurbished": "2500",
  "Used": "3000",
  "For Parts or Not Working": "7000",
};

export async function POST(request: NextRequest) {
  try {
    const { manufacturer, partNumber, condition } = await request.json();

    if (!manufacturer || !partNumber || !condition) {
      return NextResponse.json(
        { success: false, error: "Manufacturer, part number, and condition are required" },
        { status: 400 }
      );
    }

    // Build search query
    const searchQuery = `${manufacturer} ${partNumber}`.trim();
    const conditionId = CONDITION_MAP[condition] || "1000";

    // eBay Finding API only requires App ID (Client ID)
    // Get your App ID from: https://developer.ebay.com/my/keys
    const EBAY_APP_ID = process.env.EBAY_APP_ID;
    const EBAY_API_ENV = process.env.EBAY_API_ENV || "production";

    if (!EBAY_APP_ID) {
      console.error("EBAY_APP_ID not configured");
      return NextResponse.json(
        {
          success: false,
          error: "eBay API credentials not configured. Please contact support.",
        },
        { status: 500 }
      );
    }

    // eBay Finding API endpoint (sandbox or production)
    const ebayApiUrl = EBAY_API_ENV === "production"
      ? "https://svcs.ebay.com/services/search/FindingService/v1"
      : "https://svcs.sandbox.ebay.com/services/search/FindingService/v1";

    // Build eBay API request
    const params = new URLSearchParams({
      "OPERATION-NAME": "findItemsAdvanced",
      "SERVICE-VERSION": "1.0.0",
      "SECURITY-APPNAME": EBAY_APP_ID,
      "RESPONSE-DATA-FORMAT": "JSON",
      "REST-PAYLOAD": "",
      "keywords": searchQuery,
      "itemFilter(0).name": "Condition",
      "itemFilter(0).value(0)": conditionId,
      "itemFilter(1).name": "ListingType",
      "itemFilter(1).value(0)": "FixedPrice",
      "itemFilter(1).value(1)": "AuctionWithBIN",
      "sortOrder": "PricePlusShippingLowest",
      "paginationInput.entriesPerPage": "20",
    });

    const apiUrl = `${ebayApiUrl}?${params.toString()}`;
    console.log("eBay API request:", {
      environment: EBAY_API_ENV,
      appId: EBAY_APP_ID.substring(0, 20) + "...",
      searchQuery,
      conditionId,
      url: apiUrl.substring(0, 100) + "...",
    });

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "KIV-Industrial/1.0",
      },
    });

    // Get response text first to handle both JSON and text errors
    const responseText = await response.text();
    
    // Check for HTTP errors
    if (!response.ok) {
      console.error("eBay API HTTP error:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseText,
      });
      
      // Try to parse as JSON to get detailed error message
      try {
        const errorData = JSON.parse(responseText);
        if (errorData.errorMessage || errorData.findItemsAdvancedResponse?.[0]?.errorMessage) {
          const errorMsg = errorData.findItemsAdvancedResponse?.[0]?.errorMessage?.[0] || errorData.errorMessage?.[0];
          const errorDetails = errorMsg?.error?.[0];
          const errorMessage = errorDetails?.message?.[0] || "Unknown eBay API error";
          const errorId = errorDetails?.errorId?.[0] || "Unknown";
          const errorSubdomain = errorDetails?.subdomain?.[0] || "";
          
          // Handle rate limiting errors with user-friendly message
          if (errorId === "10001" || errorSubdomain === "RateLimiter") {
            throw new Error("eBay API rate limit exceeded. Please try again in a few minutes.");
          }
          
          throw new Error(`eBay API error (${errorId}): ${errorMessage}`);
        }
      } catch (parseError) {
        // If it's already our custom error, re-throw it
        if (parseError instanceof Error && parseError.message.includes("rate limit")) {
          throw parseError;
        }
        // If parsing fails, use the raw error text
      }
      
      throw new Error(`eBay API error (${response.status}): ${response.statusText}. ${responseText.substring(0, 200)}`);
    }

    // Parse JSON response
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse eBay API response:", responseText);
      throw new Error("Invalid response from eBay API");
    }

    // Check for eBay API errors in the response body
    if (data.findItemsAdvancedResponse?.[0]?.errorMessage || data.errorMessage) {
      const errorMsg = data.findItemsAdvancedResponse?.[0]?.errorMessage?.[0] || data.errorMessage?.[0];
      const errorDetails = errorMsg?.error?.[0];
      const errorMessage = errorDetails?.message?.[0] || "Unknown eBay API error";
      const errorId = errorDetails?.errorId?.[0] || "Unknown";
      const errorDomain = errorDetails?.domain?.[0] || "";
      const errorSubdomain = errorDetails?.subdomain?.[0] || "";
      
      console.error("eBay API error response:", JSON.stringify(errorMsg, null, 2));
      
      // Handle rate limiting errors with user-friendly message
      if (errorId === "10001" || errorSubdomain === "RateLimiter") {
        throw new Error("eBay API rate limit exceeded. Please try again in a few minutes.");
      }
      
      throw new Error(`eBay API error (${errorId}): ${errorMessage}`);
    }

    // Parse eBay API response
    const items = data.findItemsAdvancedResponse?.[0]?.searchResult?.[0]?.item || [];

    if (items.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No items found matching your search criteria.",
      });
    }

    // Find the best matching item (lowest price with shipping, or best match)
    let bestItem = null;
    let lowestTotalPrice = Infinity;

    for (const item of items) {
      const price = parseFloat(item.sellingStatus?.[0]?.currentPrice?.[0]?.__value__ || "0");
      const shippingCost = parseFloat(
        item.shippingInfo?.[0]?.shippingServiceCost?.[0]?.__value__ || "0"
      );
      const currency = item.sellingStatus?.[0]?.currentPrice?.[0]?.["@currencyId"] || "USD";
      const totalPrice = price + shippingCost;
      const itemId = item.itemId?.[0] || "";
      const title = item.title?.[0] || "";
      const url = item.viewItemURL?.[0] || "";
      const galleryUrl = item.galleryURL?.[0] || "";
      const location = item.location?.[0] || "";
      const sellerInfo = item.sellerInfo?.[0];
      const listingType = item.listingInfo?.[0]?.listingType?.[0] || "";
      const watchCount = item.listingInfo?.[0]?.watchCount?.[0] || "";
      
      // Extract specifications from subtitle or primary category
      const subtitle = item.subtitle?.[0] || "";
      const primaryCategory = item.primaryCategory?.[0]?.categoryName?.[0] || "";
      
      if (totalPrice < lowestTotalPrice) {
        lowestTotalPrice = totalPrice;
        bestItem = {
          price,
          shippingCost,
          currency,
          title,
          url,
          itemId,
          galleryUrl,
          location,
          subtitle,
          primaryCategory,
          listingType,
          watchCount,
          condition: condition,
        };
      }
    }

    if (!bestItem) {
      return NextResponse.json({
        success: false,
        error: "Could not determine pricing for the items found.",
      });
    }

    // Extract part number and manufacturer from title for better presentation
    const titleParts = bestItem.title.split(/[,\-\(\)]/).map((s: string) => s.trim()).filter(Boolean);

    // Build description based on available information
    const description = bestItem.subtitle || 
      `${manufacturer} ${partNumber} - ${condition} condition. ${bestItem.primaryCategory ? `Category: ${bestItem.primaryCategory}.` : ''} Ready to ship.`;

    // Extract specifications (common industrial part specs)
    const specifications: Record<string, string> = {
      Manufacturer: manufacturer,
      "Part Number": partNumber,
      Condition: condition,
    };

    if (bestItem.primaryCategory) {
      specifications.Category = bestItem.primaryCategory;
    }

    if (bestItem.location) {
      specifications.Location = bestItem.location;
    }

    return NextResponse.json({
      success: true,
      item: {
        title: bestItem.title,
        description,
        manufacturer,
        partNumber,
        condition: bestItem.condition,
        price: bestItem.price,
        shippingCost: bestItem.shippingCost,
        totalPrice: lowestTotalPrice,
        currency: bestItem.currency,
        specifications,
        imageUrl: bestItem.galleryUrl,
        availability: "In Stock",
        shipping: "Same-day or next-day shipping available",
      },
    });
  } catch (error) {
    console.error("Instant quote error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

