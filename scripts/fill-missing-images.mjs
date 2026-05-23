/**
 * Fills any missing /images files using Pexels + Foodish + category fallbacks.
 * Run: node scripts/fill-missing-images.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTS, CATEGORIES } from '../js/products.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const IMAGES = path.join(ROOT, 'images');

const pexels = (id, w, h) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

/** Verified Pexels food/bakery photo IDs */
const PEXELS_POOL = [
  206743, 1775043, 2132890, 541216, 3026808, 205961, 1028714, 2135864, 2915283,
  2144112, 2092063, 2491281, 2915287, 3835675, 1126359, 2147490, 563420, 1267320,
  3026800, 1703272, 2137517, 5410367, 5949881, 5949882, 5949883, 2067423, 1893556,
  230325, 6294082, 2092906, 5873721, 4198379, 2067405, 1721932, 2137807, 105827,
  452910, 2144112, 1702373, 1028741, 2132663, 2147491, 2144113, 1703272,
];

const FOODISH_TYPE = {
  biscuits: 'dessert',
  'diet-bread': 'samosa',
  patisserie: 'dessert',
  'pizza-savory': 'pizza',
  'rusks-feteer': 'samosa',
  snacks: 'samosa',
  'kahk-sweets': 'dessert',
  pastries: 'dessert',
  eclairs: 'dessert',
  'cakes-donuts': 'dessert',
};

const SECTION_PEXELS = {
  'sections/hero-bg.jpg': pexels(206743, 1600, 900),
  'sections/hero-feature.jpg': pexels(3026808, 900, 1100),
  'sections/about-main.jpg': pexels(2132890, 900, 700),
  'sections/about-float.jpg': pexels(2915283, 600, 600),
  'sections/why-fresh.jpg': pexels(3026808, 900, 630),
  'sections/why-craft.jpg': pexels(1775043, 900, 630),
  'sections/why-order.jpg': pexels(2144112, 900, 630),
  'sections/why-roots.jpg': pexels(2092063, 900, 630),
  'sections/order-hero.jpg': pexels(3026808, 1200, 800),
  'sections/order-menu.jpg': pexels(2915283, 700, 450),
  'sections/order-cart.jpg': pexels(2132890, 700, 450),
  'sections/order-instagram.jpg': pexels(2144112, 700, 450),
};

const REVIEW_PEXELS = {
  'reviews/iman-photo.jpg': pexels(1775043, 500, 300),
  'reviews/iman-avatar.jpg': pexels(774909, 120, 120),
  'reviews/mahmoud-photo.jpg': pexels(2132890, 500, 300),
  'reviews/mahmoud-avatar.jpg': pexels(2379004, 120, 120),
  'reviews/elham-photo.jpg': pexels(2135864, 500, 300),
  'reviews/elham-avatar.jpg': pexels(415829, 120, 120),
  'reviews/esslam-photo.jpg': pexels(3026808, 500, 300),
  'reviews/esslam-avatar.jpg': pexels(1222271, 120, 120),
  'reviews/mohamed-photo.jpg': pexels(2915283, 500, 300),
  'reviews/mohamed-avatar.jpg': pexels(1681010, 120, 120),
  'reviews/ahmed-photo.jpg': pexels(2144112, 500, 300),
  'reviews/ahmed-avatar.jpg': pexels(1516680, 120, 120),
};

function existsGood(file) {
  return fs.existsSync(file) && fs.statSync(file).size > 8000;
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'OnatBakery-ImageSetup/1.0' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) throw new Error('too small');
  fs.writeFileSync(dest, buf);
}

async function foodishUrl(category) {
  const type = FOODISH_TYPE[category] || 'dessert';
  const endpoints = [
    `https://foodish-api.com/api/images/${type}/`,
    `https://foodish-api.herokuapp.com/api/images/${type}/`,
  ];
  for (const url of endpoints) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      if (data?.image) return data.image;
    } catch {
      /* try next */
    }
  }
  return null;
}

function copyFallback(dest, category, productId) {
  const catFile = path.join(IMAGES, 'categories', `${category}.jpg`);
  if (existsGood(catFile)) {
    fs.copyFileSync(catFile, dest);
    return 'category';
  }
  const siblings = PRODUCTS.filter((p) => p.category === category && p.id !== productId);
  for (const s of siblings) {
    const sib = path.join(IMAGES, 'products', `${s.id}.jpg`);
    if (existsGood(sib)) {
      fs.copyFileSync(sib, dest);
      return 'sibling';
    }
  }
  const any = path.join(IMAGES, 'products', 'bisc-002.jpg');
  if (existsGood(any)) {
    fs.copyFileSync(any, dest);
    return 'default';
  }
  return null;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  let ok = 0;
  let fail = 0;

  for (const [rel, url] of Object.entries({ ...SECTION_PEXELS, ...REVIEW_PEXELS })) {
    const dest = path.join(IMAGES, rel);
    if (existsGood(dest)) continue;
    try {
      await download(url, dest);
      ok += 1;
      console.log(`+ ${rel}`);
    } catch (e) {
      fail += 1;
      console.log(`! ${rel}: ${e.message}`);
    }
  }

  for (const cat of CATEGORIES) {
    const dest = path.join(IMAGES, 'categories', `${cat.id}.jpg`);
    if (existsGood(dest)) continue;
    const idx = CATEGORIES.indexOf(cat);
    const url = pexels(PEXELS_POOL[idx % PEXELS_POOL.length], 700, 520);
    try {
      await download(url, dest);
      ok += 1;
      console.log(`+ category ${cat.id}`);
    } catch (e) {
      fail += 1;
    }
  }

  let pIndex = 0;
  for (const p of PRODUCTS) {
    const dest = path.join(IMAGES, 'products', `${p.id}.jpg`);
    if (existsGood(dest)) continue;

    let saved = false;

    const foodUrl = await foodishUrl(p.category);
    if (foodUrl) {
      try {
        await download(foodUrl, dest);
        ok += 1;
        saved = true;
        console.log(`+ ${p.id} (foodish)`);
        await sleep(400);
      } catch {
        /* fall through */
      }
    }

    if (!saved) {
      for (let attempt = 0; attempt < 5; attempt += 1) {
        const id = PEXELS_POOL[(pIndex + attempt) % PEXELS_POOL.length];
        try {
          await download(pexels(id, 480, 360), dest);
          ok += 1;
          saved = true;
          console.log(`+ ${p.id} (pexels ${id})`);
          break;
        } catch {
          /* next id */
        }
      }
    }

    if (!saved) {
      const via = copyFallback(dest, p.category, p.id);
      if (via) {
        ok += 1;
        console.log(`+ ${p.id} (copy ${via})`);
        saved = true;
      }
    }

    if (!saved) {
      fail += 1;
      console.log(`! ${p.id}`);
    }

    pIndex += 1;
  }

  console.log(`\nFill complete: ${ok} added, ${fail} still missing.`);
}

main();
