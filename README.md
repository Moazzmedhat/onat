# Onat Bakery Website

A bilingual (Arabic / English) bakery storefront for **Onat Bakery** — with GSAP animations, shopping cart, and Shopify Storefront API checkout.

## Features

- Brand styling from logo (cream, chocolate brown, gold)
- RTL Arabic default + English toggle
- Full menu gallery (10 menu pages from `images/`)
- Shop with 90+ products across all categories
- Cart with localStorage persistence
- GSAP hero, scroll, and micro-interactions
- Shopify checkout when configured

## Quick start

1. Open the site locally:

```bash
npx serve .
# or: python -m http.server 8080
```

2. Visit `http://localhost:3000` (or your port).

> Use a local server — ES modules require `http://`, not `file://`.

## Connect to Shopify

### 1. Import products

1. In Shopify Admin → **Products** → **Import**
2. Upload `shopify/products-import.csv`
3. Review and publish products

### 2. Create a Storefront API app

1. **Settings** → **Apps and sales channels** → **Develop apps**
2. Create an app → **Configure Storefront API**
3. Enable scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
4. Install the app and copy the **Storefront API access token**

### 3. Configure the website

```bash
cp js/shopify.config.example.js js/shopify.config.js
```

Edit `js/shopify.config.js`:

```js
export default {
  enabled: true,
  storeDomain: 'your-store.myshopify.com',
  storefrontAccessToken: 'shpat_xxxxxxxx',
};
```

### 4. Map variant IDs (for checkout)

After import, each product variant has a Shopify GID. Add to products in `js/products.js`:

```js
{
  id: 'bisc-001',
  nameAr: 'بسكوت جنزبيل',
  nameEn: 'Ginger Biscuits',
  price: 230,
  shopifyVariantId: 'gid://shopify/ProductVariant/1234567890',
}
```

To find variant IDs, use Shopify Admin GraphiQL or run in browser console (with config enabled):

```js
import { fetchShopProducts } from './js/shopify.js';
fetchShopProducts().then(console.log);
```

### 5. Deploy

Host on any static host:

- **Shopify** — upload as theme assets or use [Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen) later
- **Netlify / Vercel / GitHub Pages** — drag & drop or connect repo
- **Shopify Online Store 2.0** — embed via custom page with iframe (or migrate to theme sections)

## Project structure

```
onatbakery/
├── index.html
├── css/styles.css
├── images/          # logo + menu pages
├── js/
│   ├── app.js       # main UI + GSAP
│   ├── products.js  # catalog
│   ├── cart.js
│   ├── shopify.js
│   ├── i18n.js
│   └── shopify.config.example.js
└── shopify/
    └── products-import.csv
```

## Without Shopify

The site works standalone:

- Cart saves to browser localStorage
- **Checkout** opens Instagram DM with order summary (links to [@onatbakery](https://www.instagram.com/onatbakery/))

## Adding more products

Edit `js/products.js`, then regenerate the CSV:

```bash
node -e "/* see README or re-run import script */"
```

Or add products directly in Shopify Admin and map `shopifyVariantId` in `products.js`.

## Instagram

Brand: [@onatbakery](https://www.instagram.com/onatbakery/)

# onat
