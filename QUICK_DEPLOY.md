# Quick Deploy to Get HTTPS Endpoint for eBay

## Fastest Way: Deploy via Vercel Web Interface

### Step 1: Push Your Code to GitHub
```bash
cd "/Users/kunj8/Documents/KIV Industrial/kiv-industrial-site"
git add .
git commit -m "Add eBay notification endpoint"
git push
```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign up/Login (use GitHub for easy integration)

2. **Import Your Repository:**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose your repository: `kunjtapiawala/kivindustrial` (or your repo name)
   - Click "Import"

3. **Configure Project:**
   - Framework Preset: Next.js (should auto-detect)
   - Root Directory: `kiv-industrial-site` (if your repo has this folder)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables:**
   Click "Environment Variables" and add:
   
   ```
   EBAY_APP_ID=kunjtapi-pricera-PRD-90e888693-70c32360
   EBAY_API_ENV=production
   EBAY_VERIFICATION_TOKEN=0ad188047b96856dd4642c61ceaa32f5dcd0c4080d691f0facc3819956f96ae4
   ```
   
   (Also add your SMTP credentials if you have them)

5. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)

### Step 3: Get Your HTTPS URL

After deployment, Vercel will give you a URL like:
```
https://kiv-industrial-site.vercel.app
```

Or if you have a custom domain:
```
https://yourdomain.com
```

### Step 4: Configure in eBay Dashboard

1. Go to eBay Developer Dashboard → Alerts & Notifications
2. Under "Marketplace Account Deletion":
   - **Endpoint:** `https://your-vercel-url.vercel.app/api/ebay/notifications`
   - **Verification Token:** `0ad188047b96856dd4642c61ceaa32f5dcd0c4080d691f0facc3819956f96ae4`
   - Click "Save"
   - Click "Send Test Notification"

### Step 5: Verify

- Check Vercel deployment logs to see if eBay's verification request came through
- Your production keyset should be enabled after successful verification

---

## Alternative: Quick Test with ngrok (Temporary)

If you need to test immediately:

1. **Install ngrok:**
   ```bash
   brew install ngrok
   # Or download from https://ngrok.com/download
   ```

2. **Start your dev server:**
   ```bash
   npm run dev
   ```

3. **Start ngrok (in another terminal):**
   ```bash
   ngrok http 3000
   ```

4. **Use the ngrok URL:**
   - Copy the HTTPS URL (e.g., `https://abc123.ngrok-free.app`)
   - Use in eBay: `https://abc123.ngrok-free.app/api/ebay/notifications`
   - **Note:** This is temporary - use Vercel for production

---

## Your Endpoint URL Format

The endpoint must be exactly:
```
https://yourdomain.com/api/ebay/notifications
```

**Important:**
- Must start with `https://`
- Must be publicly accessible
- Must return the challenge code for verification
- Path must be exactly `/api/ebay/notifications`

