/**
 * Shopify Storefront API integration.
 * Copy js/shopify.config.example.js → js/shopify.config.js and fill in your credentials.
 */

let config = {
  enabled: false,
  storeDomain: '',
  storefrontAccessToken: '',
};

export async function loadShopifyConfig() {
  try {
    const mod = await import('./shopify.config.js');
    config = { ...config, ...mod.default };
  } catch {
    /* use defaults — local cart only */
  }
  return config;
}

const API_VERSION = '2024-10';

async function storefront(query, variables = {}) {
  const res = await fetch(
    `https://${config.storeDomain}/api/${API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    }
  );
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data;
}

export function isShopifyEnabled() {
  return config.enabled && config.storeDomain && config.storefrontAccessToken;
}

/**
 * Create cart and add lines by Shopify variant GID.
 * @param {{ shopifyVariantId: string, qty: number }[]} lines
 */
export async function createCheckout(lines) {
  const merchandiseLines = lines
    .filter((l) => l.shopifyVariantId)
    .map((l) => ({
      merchandiseId: l.shopifyVariantId,
      quantity: l.qty,
    }));

  if (!merchandiseLines.length) {
    throw new Error('No Shopify variant IDs mapped. Import products and set shopifyVariantId in products.js');
  }

  const CART_CREATE = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { id checkoutUrl }
        userErrors { field message }
      }
    }
  `;

  const data = await storefront(CART_CREATE, {
    input: { lines: merchandiseLines },
  });

  const payload = data?.cartCreate;
  if (payload?.userErrors?.length) {
    throw new Error(payload.userErrors[0].message);
  }

  return payload?.cart?.checkoutUrl;
}

/**
 * Fetch products from Shopify to sync variant IDs (optional dev helper).
 */
export async function fetchShopProducts(first = 50) {
  const QUERY = `
    query ($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            variants(first: 5) {
              edges {
                node { id title price { amount currencyCode } }
              }
            }
          }
        }
      }
    }
  `;
  const data = await storefront(QUERY, { first });
  return data?.products?.edges?.map((e) => e.node) || [];
}
