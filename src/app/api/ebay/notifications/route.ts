import { NextRequest, NextResponse } from "next/server";

// Verification token - should match what's configured in eBay dashboard
const VERIFICATION_TOKEN = process.env.EBAY_VERIFICATION_TOKEN || "";

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
    // The challenge_code parameter contains the verification code that must be echoed back
    // This is eBay's way of verifying the endpoint is accessible and working
    const challengeCode = request.nextUrl.searchParams.get("challenge_code");

    // eBay requires the endpoint to return the challenge_code in the response body
    // This is a simple echo-back mechanism - no authentication required for verification
    if (challengeCode) {
      console.log("eBay verification challenge received:", challengeCode);
      // Return the challenge code as plain text in the response body
      // Content-Type should be text/plain
      // Status should be 200
      return new NextResponse(challengeCode, {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    // If no challenge code, return a simple response to indicate endpoint is alive
    // This allows basic health checks
    return new NextResponse("Endpoint is active", {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("eBay notification verification error:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
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

