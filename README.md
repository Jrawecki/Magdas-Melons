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

Order form submissions are sent to `/api/order` (Cloudflare Worker route).

That route handler:

- verifies Cloudflare Turnstile captcha server-side
- forwards the order payload to FormSubmit
- sends email to your `FORMSUBMIT_EMAIL`

## Environment Variables

Vite frontend (`.env`):

- `VITE_TURNSTILE_SITE_KEY`
- `VITE_ORDER_API_PATH` (default `/api/order`)

Worker runtime vars (`.dev.vars` locally, Worker settings in production):

- `TURNSTILE_SECRET_KEY`
- `FORMSUBMIT_EMAIL`

`FORMSUBMIT_EMAIL` is required. There is no hardcoded fallback recipient in the Worker.

Note: Turnstile keys must be valid Cloudflare-issued keys (or official test keys). Random strings will fail.

## Cloudflare Workers Deploy

1. Set runtime secrets in Cloudflare Worker settings:
   - `TURNSTILE_SECRET_KEY` (secret)
   - `FORMSUBMIT_EMAIL`
2. Build and deploy:
   - `npm run deploy`
3. Add your custom domain in Worker settings and verify TLS is active.
4. Test `/api/order` from the live domain.

Order emails are received at:

- `FORMSUBMIT_EMAIL`

Integration is implemented in:

- `src/components/features/InquiryForm.tsx`
- `worker/index.ts`
