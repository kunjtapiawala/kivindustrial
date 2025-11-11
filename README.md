# KIV Industrial Parts

Minimal sourcing request site for Kunj's Industrial Vault. The site keeps the experience focused on a single sourcing form so prospects can quickly tell you which part they need, how many, and how quickly they need it.

## Stack
- Next.js 16 (App Router, TypeScript)
- Tailwind CSS 4 (utility styling)
- Axios for client-side requests
- Nodemailer + Zod validation on the API route
- Jest + React Testing Library

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the site locally.

## Environment Variables
Create a `.env.local` file with your email delivery credentials and eBay API credentials:

```
# Email Configuration
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
CONTACT_SENDER_EMAIL=noreply@yourdomain.com
CONTACT_RECIPIENT_EMAIL=your@email.com

# eBay API Configuration (for Instant Quote feature)
EBAY_APP_ID=your-ebay-app-id
EBAY_API_ENV=sandbox
```

- `CONTACT_SENDER_EMAIL` is the "from" address shown to recipients. If omitted, the app will fall back to `SMTP_USER`.
- `CONTACT_RECIPIENT_EMAIL` is where sourcing requests are delivered.
- `EBAY_APP_ID` is your eBay Application ID (Client ID). Get it from [eBay Developer Program](https://developer.ebay.com/my/keys).
- `EBAY_API_ENV` can be `sandbox` (default) or `production`. Use sandbox for testing.

Restart the dev server after adding environment variables.

## Content Structure
- `src/data/catalog.ts` lists every catalog category, highlights, and representative items. Update this file to add, rename, or expand categories.
- `src/data/manufacturers.ts` contains the popular and extended manufacturer roster. Set `popular: true` to surface a brand in the “most requested” grid.
- `/catalog` renders every category with detailed supply bullets and callouts for blind shipping and easy payment.
- `/manufacturers` highlights popular brands (the sample logos provided) and an extended list, reiterating that more manufacturers are available on request.
- The home page now previews top catalog categories, popular brands, and reinforces 24/7 support with the 469-316-8517 hotline.

## Scripts

```bash
npm run dev      # start development server
npm run build    # create production build
npm run start    # serve production build
npm run lint     # run ESLint across the project
npm run test     # execute unit tests
```

## Testing
- `src/components/contact-form.test.tsx` ensures the form validates input and posts data correctly.
- `src/app/api/contact/route.test.ts` covers the API handler, including email delivery and validation failures.
- `src/app/catalog/page.test.tsx` verifies the catalog page renders its categories and messaging.
- `src/app/manufacturers/page.test.tsx` checks that popular manufacturers appear in the dedicated page.

Run `npm run test` to execute the full suite.

## Deployment Notes
1. Deploy to a free host such as [Vercel](https://vercel.com). Import the repository, set the environment variables above in the project settings, and deploy.
2. In GoDaddy, create a CNAME record for `www` (or desired subdomain) pointing to your Vercel-provided target (e.g. `cname.vercel-dns.com`).
3. Optionally add an A record for the root domain pointing to Vercel's IPs, then enable the domain in the Vercel dashboard.

That's it—once DNS propagates the site will be live on your GoDaddy-managed domain.
