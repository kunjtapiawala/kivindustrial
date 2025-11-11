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

    if (!EBAY_APP_ID) {
      return NextResponse.json(
        {
          success: false,
          error: "eBay API credentials not configured. Please contact support.",
        },
        { status: 500 }
      );
    }

    // eBay Finding API endpoint (sandbox or production)
    const ebayApiUrl = process.env.EBAY_API_ENV === "production"
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

    const response = await fetch(`${ebayApiUrl}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`eBay API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Parse eBay API response
    const items = data.findItemsAdvancedResponse?.[0]?.searchResult?.[0]?.item || [];

    if (items.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No items found matching your search criteria.",
      });
    }

    // Find the lowest priced item with shipping
    let lowestItem = null;
    let lowestTotalPrice = Infinity;

    for (const item of items) {
      const price = parseFloat(item.sellingStatus?.[0]?.currentPrice?.[0]?.__value__ || "0");
      const shippingCost = parseFloat(
        item.shippingInfo?.[0]?.shippingServiceCost?.[0]?.__value__ || "0"
      );
      const currency = item.sellingStatus?.[0]?.currentPrice?.[0]?.["@currencyId"] || "USD";
      const totalPrice = price + shippingCost;

      if (totalPrice < lowestTotalPrice) {
        lowestTotalPrice = totalPrice;
        lowestItem = {
          price,
          shippingCost,
          currency,
          title: item.title?.[0] || "",
          url: item.viewItemURL?.[0] || "",
        };
      }
    }

    if (!lowestItem) {
      return NextResponse.json({
        success: false,
        error: "Could not determine pricing for the items found.",
      });
    }

    return NextResponse.json({
      success: true,
      lowestPrice: lowestItem.price,
      shippingCost: lowestItem.shippingCost,
      totalPrice: lowestTotalPrice,
      currency: lowestItem.currency,
      itemTitle: lowestItem.title,
      itemUrl: lowestItem.url,
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

