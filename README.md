# Magda's Melons Website

Simple React + TypeScript + Tailwind website for carved watermelon basket orders.

## Run Locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Where To Edit Content

- Brand name, contact, social: `src/config/brand.ts`
- Basket names/descriptions/images: `src/config/products.ts`
- Gallery images/captions: `src/config/gallery.ts`
- Pricing: `src/config/pricing.ts`

## Order Flow

- Customers pick a package on `/order`
- They place order from that package card
- Form appears only on package route: `/order/:productId/request`

## Fruit Options

- Default fruits: `includedFruits` in `src/config/products.ts`
- Optional non-default fruits (like chocolate-covered strawberries): `optionalFruitAddOns`

## Delivery Fee

Delivery fee is intentionally not auto-calculated yet and is confirmed from address.

## Form Integration

Order form submissions are sent to `/api/order` (Cloudflare Pages Function).

That function:

- verifies Cloudflare Turnstile captcha server-side
- forwards the order payload to FormSubmit
- sends email to your `FORMSUBMIT_EMAIL`

## Environment Variables

Vite frontend (`.env`):

- `VITE_TURNSTILE_SITE_KEY`
- `VITE_ORDER_API_PATH` (default `/api/order`)

Cloudflare function vars (`.dev.vars` locally, Pages settings in production):

- `TURNSTILE_SECRET_KEY`
- `FORMSUBMIT_EMAIL`

Note: Turnstile keys must be valid Cloudflare-issued keys (or official test keys). Random strings will fail.

## Cloudflare Pages Deploy

1. Push this repo to GitHub.
2. In Cloudflare, go to `Workers & Pages` -> `Create` -> `Pages` -> `Connect to Git`.
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Add Pages environment variables:
   - `TURNSTILE_SECRET_KEY` (your real Turnstile secret key)
   - `FORMSUBMIT_EMAIL` (your receiving email address)
5. Deploy and test an order submission.

Order emails are received at:

- `FORMSUBMIT_EMAIL` (or fallback `contactEmail` behavior in code)

Integration is implemented in:

- `src/components/features/InquiryForm.tsx`
- `functions/api/order.ts`
