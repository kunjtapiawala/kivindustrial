import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Verification token - should match what's configured in eBay dashboard
const VERIFICATION_TOKEN = process.env.EBAY_VERIFICATION_TOKEN || "";

// Endpoint URL - should match what's configured in eBay dashboard
const ENDPOINT_URL = process.env.EBAY_NOTIFICATION_ENDPOINT_URL || "https://www.kivindustrial.com/api/ebay/notifications";

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-EBAY-SIGNATURE",
    },
  });
}

/**
 * eBay Marketplace Account Deletion Notification Endpoint
 * 
 * This endpoint handles:
 * 1. Verification challenges from eBay (GET request)
 * 2. Account deletion notifications (POST request)
 * 
 * eBay will send a GET request to verify the endpoint, then POST notifications
 * when marketplace accounts are deleted.
 */
export async function GET(request: NextRequest) {
  try {
    // eBay sends a verification challenge with query parameters
    // The challenge_code parameter contains the verification code
    const challengeCode = request.nextUrl.searchParams.get("challenge_code");

    if (challengeCode) {
      console.log("eBay verification challenge received:", challengeCode);
      
      // eBay requires a specific challenge-response mechanism:
      // 1. Concatenate: challenge_code + verificationToken + endpoint URL
      // 2. Compute SHA-256 hash of the concatenated string
      // 3. Return the hash in JSON format: { "challengeResponse": "hash" }
      
      if (!VERIFICATION_TOKEN) {
        console.error("EBAY_VERIFICATION_TOKEN not configured");
        return NextResponse.json(
          { error: "Verification token not configured" },
          { status: 500 }
        );
      }

      // Concatenate challenge_code + verificationToken + endpoint URL
      const concatenatedString = challengeCode + VERIFICATION_TOKEN + ENDPOINT_URL;
      
      // Compute SHA-256 hash (hexadecimal, not base64)
      const hash = crypto.createHash("sha256").update(concatenatedString).digest("hex");
      
      console.log("Computed challenge response hash:", hash);
      
      // Return the hash in JSON format
      return NextResponse.json(
        { challengeResponse: hash },
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        }
      );
    }

    // If no challenge code, return a simple response to indicate endpoint is alive
    // This allows basic health checks
    return NextResponse.json(
      { status: "ok", message: "Endpoint is active" },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("eBay notification verification error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from eBay
    const verificationToken = request.headers.get("X-EBAY-SIGNATURE");
    
    if (VERIFICATION_TOKEN && verificationToken && verificationToken !== VERIFICATION_TOKEN) {
      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 401 }
      );
    }

    // Parse the notification payload
    const payload = await request.json();
    
    // Log the notification (you can process this as needed)
    console.log("eBay Marketplace Account Deletion Notification:", JSON.stringify(payload, null, 2));

    // Handle different notification types
    if (payload.notification) {
      const notificationType = payload.notification.notificationType;
      const event = payload.notification.event;

      // Handle marketplace account deletion
      if (notificationType === "MARKETPLACE_ACCOUNT_DELETED" || event === "MARKETPLACE_ACCOUNT_DELETED") {
        // Process the account deletion notification
        // You can save this to a database, send an email, etc.
        console.log("Marketplace account deleted:", payload);
        
        // TODO: Add your business logic here
        // - Log to database
        // - Send email notification to admin
        // - Update internal records
      }
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ status: "received" }, { status: 200 });
  } catch (error) {
    console.error("eBay notification processing error:", error);
    
    // Still return 200 to prevent eBay from retrying immediately
    // You may want to log errors for manual review
    return NextResponse.json(
      { error: "Processing failed but acknowledged" },
      { status: 200 }
    );
  }
}

