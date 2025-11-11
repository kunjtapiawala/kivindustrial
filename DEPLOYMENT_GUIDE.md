# Quick Deployment Guide for eBay Notification Endpoint

You need a valid HTTPS endpoint to configure in the eBay dashboard. Here are your options:

## Option 1: Deploy to Vercel (Recommended - Permanent Solution)

### Step 1: Install Vercel CLI (if not installed)
```bash
# Install locally (no sudo required)
npm install vercel --save-dev

# Or use npx (no installation needed)
npx vercel
```

### Step 2: Deploy to Vercel
```bash
# From your project directory
cd "/Users/kunj8/Documents/KIV Industrial/kiv-industrial-site"

# Deploy (first time will ask you to login)
npx vercel

# For production deployment
npx vercel --prod
```

### Step 3: Get Your HTTPS URL
After deployment, Vercel will give you a URL like:
```
https://kiv-industrial-site.vercel.app
```

Your endpoint will be:
```
https://kiv-industrial-site.vercel.app/api/ebay/notifications
```

### Step 4: Add Environment Variables in Vercel
1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to Settings → Environment Variables
3. Add these variables:
   - `EBAY_APP_ID=kunjtapi-pricera-PRD-90e888693-70c32360`
   - `EBAY_API_ENV=production`
   - `EBAY_VERIFICATION_TOKEN=0ad188047b96856dd4642c61ceaa32f5dcd0c4080d691f0facc3819956f96ae4`
   - (Also add your SMTP credentials if not already set)

### Step 5: Configure in eBay Dashboard
- **Endpoint:** `https://kiv-industrial-site.vercel.app/api/ebay/notifications`
- **Verification Token:** `0ad188047b96856dd4642c61ceaa32f5dcd0c4080d691f0facc3819956f96ae4`
- Click "Save"
- Click "Send Test Notification"

---

## Option 2: Use ngrok for Quick Testing (Temporary Solution)

If you need to test immediately without deploying, use ngrok:

### Step 1: Install ngrok
```bash
# Install via Homebrew (macOS)
brew install ngrok

# Or download from https://ngrok.com/download
# Or use npm
npm install -g ngrok
```

### Step 2: Start Your Dev Server
```bash
cd "/Users/kunj8/Documents/KIV Industrial/kiv-industrial-site"
npm run dev
```

### Step 3: Start ngrok Tunnel
In a new terminal:
```bash
ngrok http 3000
```

### Step 4: Get Your HTTPS URL
ngrok will display a URL like:
```
Forwarding: https://abc123-def456.ngrok-free.app -> http://localhost:3000
```

Your endpoint will be:
```
https://abc123-def456.ngrok-free.app/api/ebay/notifications
```

### Step 5: Configure in eBay Dashboard
- **Endpoint:** `https://abc123-def456.ngrok-free.app/api/ebay/notifications`
- **Verification Token:** `0ad188047b96856dd4642c61ceaa32f5dcd0c4080d691f0facc3819956f96ae4`
- Click "Save"
- Click "Send Test Notification"

**Note:** ngrok URLs are temporary and change each time you restart ngrok. Use this for testing only, then deploy to Vercel for a permanent solution.

---

## Option 3: Deploy via Vercel Web Interface

1. Go to [Vercel](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Add environment variables in the project settings
6. Deploy

---

## Verification

After configuring the endpoint in eBay:

1. eBay will send a GET request to verify the endpoint
2. Check your server logs (Vercel logs or ngrok terminal) to see the verification request
3. Your endpoint should return the `challenge_code` that eBay sends
4. Once verified, your production keyset will be enabled

## Troubleshooting

### Endpoint Not Responding
- Make sure your site is deployed and accessible
- Verify the endpoint URL is correct: `https://yourdomain.com/api/ebay/notifications`
- Check that HTTPS is enabled (required by eBay)

### Verification Failed
- Verify the verification token matches exactly
- Check server logs for error messages
- Ensure the endpoint returns the challenge code correctly

### Still Getting Errors
- Make sure the endpoint URL starts with `https://`
- Verify the path is `/api/ebay/notifications` (exact path)
- Check that your server is running and accessible

