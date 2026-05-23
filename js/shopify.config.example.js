/**
 * Copy this file to shopify.config.js and fill in your Shopify credentials.
 *
 * Setup:
 * 1. Create a Shopify store (or use existing)
 * 2. Settings → Apps → Develop apps → Create app
 * 3. Configure Storefront API scopes: unauthenticated_read_product_listings,
 *    unauthenticated_write_checkouts, unauthenticated_read_checkouts
 * 4. Install app and copy Storefront API access token
 * 5. Import products via shopify/products-import.csv
 * 6. Map variant GIDs to products in js/products.js (shopifyVariantId field)
 */
export default {
  enabled: false,
  storeDomain: 'your-store.myshopify.com',
  storefrontAccessToken: 'your-storefront-access-token',
};
