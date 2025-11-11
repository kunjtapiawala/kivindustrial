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

      // eBay requires hashing in this exact order: challengeCode + verificationToken + endpoint
      // Use multiple hash.update() calls as shown in eBay's official Node.js example
      // This ensures proper UTF-8 encoding and matches eBay's expectations exactly
      const hash = crypto.createHash("sha256");
      hash.update(challengeCode, "utf8");
      hash.update(VERIFICATION_TOKEN, "utf8");
      hash.update(ENDPOINT_URL, "utf8");
      const responseHash = hash.digest("hex");
      
      console.log("eBay challenge verification:");
      console.log("  Challenge code:", challengeCode);
      console.log("  Endpoint:", ENDPOINT_URL);
      console.log("  Computed hash:", responseHash);
      
      // Return the hash in JSON format using NextResponse.json() to avoid BOM issues
      // eBay documentation emphasizes using a JSON library to prevent byte order marks
      return NextResponse.json(
        { challengeResponse: responseHash },
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
    // Parse the notification payload
    // Note: According to eBay docs, X-EBAY-SIGNATURE contains a Base64-encoded signature
    // that should be verified using eBay's public keys via their SDKs.
    // For now, we acknowledge all notifications. Signature verification can be added later.
    const payload = await request.json();
    
    // Log the notification (you can process this as needed)
    console.log("eBay Marketplace Account Deletion Notification:", JSON.stringify(payload, null, 2));

    // Handle marketplace account deletion notifications
    // According to eBay docs, check metadata.topic for "MARKETPLACE_ACCOUNT_DELETION"
    if (payload.metadata?.topic === "MARKETPLACE_ACCOUNT_DELETION") {
      const notification = payload.notification;
      
      if (notification?.data) {
        const { username, userId, eiasToken } = notification.data;
        
        console.log("Marketplace account deletion notification received:");
        console.log("  Notification ID:", notification.notificationId);
        console.log("  Event Date:", notification.eventDate);
        console.log("  User ID:", userId);
        console.log("  Username:", username || "N/A");
        console.log("  EIAS Token:", eiasToken ? eiasToken.substring(0, 20) + "..." : "N/A");
        
        // TODO: Implement your business logic here:
        // 1. Delete all user data associated with this userId
        // 2. Delete data associated with eiasToken if used
        // 3. Delete data associated with username if used
        // 4. Log the deletion for audit purposes
        // 5. Ensure deletion is permanent (cannot be reversed)
        
        // Note: Deletion should be done in a manner such that even the highest
        // system privilege cannot reverse the deletion, unless required by law
        // (e.g., tax, collections, AML regulations)
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

