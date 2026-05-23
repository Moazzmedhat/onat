/**
 * Local bakery images — files in /images (run: node scripts/download-images.mjs).
 */
import { PRODUCTS, CATEGORIES } from './products.js';

const img = (rel) => `images/${rel}`;

export const CATEGORY_HERO_IMAGES = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, img(`categories/${c.id}.jpg`)])
);

/** One image file per menu product */
export const PRODUCT_IMAGES = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, img(`products/${p.id}.jpg`)])
);

export function getProductImage(product) {
  return PRODUCT_IMAGES[product.id] || CATEGORY_HERO_IMAGES[product.category] || img('categories/biscuits.jpg');
}

export const ABOUT_IMAGES = {
  main: img('sections/about-main.jpg'),
  float: img('sections/about-float.jpg'),
};

export const HERO_BG_IMAGE = img('sections/hero-bg.jpg');

export const HERO_FEATURE_IMAGE = img('sections/hero-feature.jpg');

/** Why Onat section — images/facebook/img1–4.png */
export const WHY_ONAT_IMAGES = {
  fresh: img('facebook/img1.png'),
  craft: img('facebook/img2.png'),
  order: img('facebook/img3.png'),
  roots: img('facebook/img4.png'),
};

export const WHY_ONAT_ITEMS = [
  { id: 'fresh', image: WHY_ONAT_IMAGES.fresh },
  { id: 'craft', image: WHY_ONAT_IMAGES.craft },
  { id: 'order', image: WHY_ONAT_IMAGES.order },
  { id: 'roots', image: WHY_ONAT_IMAGES.roots },
];

export const ORDER_SPOTLIGHT_HERO = img('sections/order-hero.jpg');

export const ORDER_PATHS = [
  {
    id: 'menu',
    image: img('sections/order-menu.jpg'),
    href: 'menu.html',
    external: false,
  },
  {
    id: 'cart',
    image: img('sections/order-cart.jpg'),
    href: 'menu.html',
    external: false,
    accent: true,
  },
  {
    id: 'instagram',
    image: img('sections/order-instagram.jpg'),
    href: 'https://www.instagram.com/onatbakery/',
    external: true,
  },
];
