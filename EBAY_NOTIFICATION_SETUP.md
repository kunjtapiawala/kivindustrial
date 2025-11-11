# eBay Marketplace Account Deletion Notification Setup

This guide explains how to set up the eBay Marketplace Account Deletion notification endpoint to enable your production keyset.

## Overview

eBay requires production keysets to have a notification endpoint configured for marketplace account deletion events. This endpoint:
- Receives verification challenges from eBay
- Processes account deletion notifications
- Helps eBay comply with data protection regulations

## Prerequisites

1. Your site must be deployed and accessible via HTTPS
2. The endpoint must be publicly accessible
3. You need your production App ID from eBay

## Setup Steps

### 1. Deploy Your Site

The notification endpoint must be publicly accessible over HTTPS. Deploy your site to Vercel, Netlify, or your preferred hosting platform.

**For Vercel:**
```bash
npm i -g vercel
vercel --prod
```

After deployment, your endpoint will be available at:
```
https://yourdomain.com/api/ebay/notifications
```

### 2. Get Your Verification Token

Your verification token is already generated in `.env.local`:
```
EBAY_VERIFICATION_TOKEN=0ad188047b96856dd4642c61ceaa32f5dcd0c4080d691f0facc3819956f96ae4
```

**Important:** Make sure this same token is added to your production environment variables on your hosting platform (Vercel, etc.).

### 3. Configure in eBay Dashboard

1. Go to [eBay Developer Program](https://developer.ebay.com/my/keys)
2. Select your production keyset ("pricera")
3. Navigate to the **"Alerts & Notifications"** tab
4. Under **"Marketplace Account Deletion"**:
   - **Email to notify:** `kunj8989@gmail.com` (already configured)
   - **Endpoint:** `https://yourdomain.com/api/ebay/notifications`
     - Replace `yourdomain.com` with your actual domain
   - **Verification Token:** `0ad188047b96856dd4642c61ceaa32f5dcd0c4080d691f0facc3819956f96ae4`
5. Click **"Save"**
6. Click **"Send Test Notification"** to verify the endpoint works

### 4. Verify the Setup

After saving, eBay will:
1. Send a GET request to your endpoint with a `challenge_code` parameter
2. Your endpoint should echo back the `challenge_code`
3. eBay will verify the response and enable your keyset

You can check your server logs to see the verification request.

## Endpoint Details

### GET Request (Verification)
eBay sends: `GET /api/ebay/notifications?challenge_code=XXXXX`

Your endpoint responds with: `XXXXX` (the same challenge code)

### POST Request (Notifications)
eBay sends account deletion notifications as POST requests with JSON payloads.

Your endpoint logs these notifications and returns a 200 status.

## Environment Variables

Make sure these are set in your production environment:

```env
EBAY_APP_ID=kunjtapi-pricera-PRD-90e888693-70c32360
EBAY_API_ENV=production
EBAY_VERIFICATION_TOKEN=0ad188047b96856dd4642c61ceaa32f5dcd0c4080d691f0facc3819956f96ae4
```

## Testing Locally

For local testing, you can use a tunneling service like ngrok:

```bash
# Install ngrok
npm i -g ngrok

# Start your dev server
npm run dev

# In another terminal, create a tunnel
ngrok http 3000

# Use the ngrok HTTPS URL in eBay dashboard
# Example: https://abc123.ngrok.io/api/ebay/notifications
```

## Troubleshooting

### Endpoint Not Responding
- Verify your site is deployed and accessible
- Check that the endpoint URL is correct (including `/api/ebay/notifications`)
- Ensure HTTPS is enabled

### Verification Failed
- Verify the verification token matches exactly in both places
- Check server logs for error messages
- Ensure the endpoint returns the challenge code correctly

### Keyset Still Disabled
- Wait a few minutes after saving - eBay may take time to verify
- Check the eBay dashboard for any error messages
- Try sending a test notification

## Security Notes

- The verification token should be kept secret
- Never commit `.env.local` to version control
- Use environment variables in your hosting platform
- The endpoint verifies requests using the token to prevent unauthorized access

## Support

If you encounter issues:
1. Check your server logs for error messages
2. Verify all environment variables are set correctly
3. Test the endpoint manually using curl or Postman
4. Contact eBay Developer Support if the keyset remains disabled

