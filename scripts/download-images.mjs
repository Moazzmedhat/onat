/**
 * Downloads bakery stock images into /images for local serving.
 * Run: node scripts/download-images.mjs
 * Then: node scripts/fill-missing-images.mjs  (Pexels + Foodish fallbacks)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTS, CATEGORIES } from '../js/products.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const IMAGES = path.join(ROOT, 'images');

const unsplash = (id, w, h) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

/** Curated Unsplash IDs per category — varied bakery/food shots */
const CATEGORY_POOLS = {
  biscuits: [
    'photo-1558961363-fa8fdf8db449',
    'photo-1499636136210-6f4ee915583e',
    'photo-1607924480493-4d31b9a5b4b8',
    'photo-1599599810769-bcde5a160d2a',
    'photo-1615485290382-441d4e5c2c0b',
    'photo-1488477181946-6428a0291777',
    'photo-1558961403-4af7f7bdd932',
    'photo-1587241329680-66c5c0586ad7',
    'photo-1606890737304-57b2c0876c8a',
    'photo-1548368328-7d0bc7259235',
    'photo-1607472586893-ed812aede2d4',
    'photo-1551110562-0e04776a8a39',
    'photo-1517433670267-08bbd9661e51',
    'photo-1590080874080-d1c1527bdc9d',
    'photo-1586985289688-ca3cf47d3e6e',
  ],
  'diet-bread': [
    'photo-1509440159596-0249088772ff',
    'photo-1586444247375-97f416a5de0e',
    'photo-1542838132-92c53300491e',
    'photo-1549931319-a545dcf3bc73',
    'photo-1589360691255-6cd02289f046',
    'photo-1509365364321-e4c444a10043',
    'photo-1585478257739-70231c84969d',
    'photo-1612186888868-3062699fc96d',
    'photo-1608198095492-87b8ecfc49ec',
    'photo-1517433670267-08bbd9661e51',
  ],
  patisserie: [
    'photo-1555507036-ab1f4038808a',
    'photo-1623334044303-241c4a6aecb6',
    'photo-1558618047-3c8c76ca7d13',
    'photo-1528735602780-2552fd46c7af',
    'photo-1555509114-2a27e6e8e2b5',
    'photo-1509440159596-0249088772ff',
    'photo-1558961363-fa8fdf8db449',
    'photo-1486427947921-c35b0f7b8f1',
    'photo-1608198095492-87b8ecfc49ec',
    'photo-1464349095430-e772a1679e68',
  ],
  'pizza-savory': [
    'photo-1513104890138-7c749659a591',
    'photo-1565299624946-b28f40a0ae38',
    'photo-1574071318508-1cdbab80d002',
    'photo-1604382354936-07c5d9983bd3',
    'photo-1571997478779-27ad564f2e0e',
    'photo-1565299624946-b28f40a0ae38',
    'photo-1513104890138-7c749659a591',
    'photo-1571407970349-0c3d0c4d0a4a',
    'photo-1593560702161-0e4b46e0c4c0',
  ],
  'rusks-feteer': [
    'photo-1549931319-a545dcf3bc73',
    'photo-1586444247375-97f416a5de0e',
    'photo-1509440159596-0249088772ff',
    'photo-1542838132-92c53300491e',
    'photo-1589360691255-6cd02289f046',
    'photo-1608198095492-87b8ecfc49ec',
  ],
  snacks: [
    'photo-1621939514649-280fb2c433fd',
    'photo-1599490659213-4bb9c5d0e0b1',
    'photo-1613919113640-25732d5b49f0',
    'photo-1558961363-fa8fdf8db449',
    'photo-1486427947921-c35b0f7b8f1',
    'photo-1606890737304-57b2c0876c8a',
  ],
  'kahk-sweets': [
    'photo-1576618148400-f54bed99fa73',
    'photo-1598110750624-ad4f3aead00a',
    'photo-1563805042-7684c019e1cb',
    'photo-1488477181946-6428a0291777',
    'photo-1578985545062-69928b1d9587',
    'photo-1551024506-0bccd828f307',
    'photo-1486427947921-c35b0f7b8f1',
    'photo-1535250490542-efd150a2c47e',
    'photo-1563729784474-fb7e2fd2fb6a',
  ],
  pastries: [
    'photo-1464349095430-e772a1679e68',
    'photo-1578985545062-69928b1d9587',
    'photo-1563729784474-fb7e2fd2fb6a',
    'photo-1555507036-ab1f4038808a',
    'photo-1623334044303-241c4a6aecb6',
    'photo-1488477181946-6428a0291777',
  ],
  eclairs: [
    'photo-1586985289688-ca3cf47d3e6e',
    'photo-1624353365286-3f8cbb4e38e0',
    'photo-1563805042-7684c019e1cb',
    'photo-1551024506-0bccd828f307',
    'photo-1578985545062-69928b1d9587',
    'photo-1486427947921-c35b0f7b8f1',
    'photo-1535250490542-efd150a2c47e',
  ],
  'cakes-donuts': [
    'photo-1578985545062-69928b1d9587',
    'photo-1551024506-0bccd828f307',
    'photo-1486427947921-c35b0f7b8f1',
    'photo-1535250490542-efd150a2c47e',
    'photo-1558618666-fcd25c85cd64',
    'photo-1587662259927-32477e9c6b66',
    'photo-1571115764595-644a1f54a55c',
    'photo-1464349095430-e772a1679e68',
  ],
};

const SECTION_SOURCES = {
  'sections/hero-bg.jpg': unsplash('photo-1509440159596-0249088772ff', 1600, 900),
  'sections/hero-feature.jpg': unsplash('photo-1608198095492-87b8ecfc49ec', 900, 1100),
  'sections/about-main.jpg': unsplash('photo-1555507036-ab1f4038808a', 900, 700),
  'sections/about-float.jpg': unsplash('photo-1578985545062-69928b1d9587', 600, 600),
  'sections/why-fresh.jpg': unsplash('photo-1623334044303-241c4a6aecb6', 900, 630),
  'sections/why-craft.jpg': unsplash('photo-1509440159596-0249088772ff', 900, 630),
  'sections/why-order.jpg': unsplash('photo-1486427947921-c35b0f7b8f1', 900, 630),
  'sections/why-roots.jpg': unsplash('photo-1598110750624-ad4f3aead00a', 900, 630),
  'sections/order-hero.jpg': unsplash('photo-1608198095492-87b8ecfc49ec', 1200, 800),
  'sections/order-menu.jpg': unsplash('photo-1578985545062-69928b1d9587', 700, 450),
  'sections/order-cart.jpg': unsplash('photo-1558961363-fa8fdf8db449', 700, 450),
  'sections/order-instagram.jpg': unsplash('photo-1486427947921-c35b0f7b8f1', 700, 450),
};

const REVIEW_SOURCES = {
  'reviews/iman-photo.jpg': unsplash('photo-1509440159596-0249088772ff', 500, 300),
  'reviews/iman-avatar.jpg': unsplash('photo-1494790108377-be9c29b29330', 120, 120),
  'reviews/mahmoud-photo.jpg': unsplash('photo-1464349095430-e772a1679e68', 500, 300),
  'reviews/mahmoud-avatar.jpg': unsplash('photo-1500648767791-00dcc994a43e', 120, 120),
  'reviews/elham-photo.jpg': unsplash('photo-1558961363-fa8fdf8db449', 500, 300),
  'reviews/elham-avatar.jpg': unsplash('photo-1438761681033-6461ffad8d80', 120, 120),
  'reviews/esslam-photo.jpg': unsplash('photo-1608198095492-87b8ecfc49ec', 500, 300),
  'reviews/esslam-avatar.jpg': unsplash('photo-1472099645785-5658abf4ff4e', 120, 120),
  'reviews/mohamed-photo.jpg': unsplash('photo-1578985545062-69928b1d9587', 500, 300),
  'reviews/mohamed-avatar.jpg': unsplash('photo-1507003211169-0a1dd7228f2d', 120, 120),
  'reviews/ahmed-photo.jpg': unsplash('photo-1555507036-ab1f4038808a', 500, 300),
  'reviews/ahmed-avatar.jpg': unsplash('photo-1506794778202-cad84cf45f1d', 120, 120),
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 8000) {
    return 'skip';
  }
  const res = await fetch(url, {
    headers: { 'User-Agent': 'OnatBakery-ImageSetup/1.0' },
    redirect: 'follow',
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) {
    throw new Error(`File too small (${buf.length}b): ${dest}`);
  }
  fs.writeFileSync(dest, buf);
  return 'ok';
}

function productPhotoId(product, indexInCategory) {
  const pool = CATEGORY_POOLS[product.category];
  if (!pool?.length) return CATEGORY_POOLS.biscuits[0];
  return pool[indexInCategory % pool.length];
}

async function main() {
  ensureDir(path.join(IMAGES, 'categories'));
  ensureDir(path.join(IMAGES, 'products'));
  ensureDir(path.join(IMAGES, 'sections'));
  ensureDir(path.join(IMAGES, 'reviews'));

  const jobs = [];
  let ok = 0;
  let skip = 0;
  let fail = 0;

  for (const cat of CATEGORIES) {
    const heroId = CATEGORY_POOLS[cat.id]?.[0] || CATEGORY_POOLS.biscuits[0];
    jobs.push({
      url: unsplash(heroId, 700, 520),
      dest: path.join(IMAGES, 'categories', `${cat.id}.jpg`),
    });
  }

  const byCategory = {};
  for (const p of PRODUCTS) {
    if (!byCategory[p.category]) byCategory[p.category] = [];
    byCategory[p.category].push(p);
  }

  for (const p of PRODUCTS) {
    const idx = byCategory[p.category].indexOf(p);
    const photoId = productPhotoId(p, idx);
    jobs.push({
      url: unsplash(photoId, 480, 360),
      dest: path.join(IMAGES, 'products', `${p.id}.jpg`),
    });
  }

  for (const [rel, url] of Object.entries(SECTION_SOURCES)) {
    jobs.push({ url, dest: path.join(IMAGES, rel) });
  }

  for (const [rel, url] of Object.entries(REVIEW_SOURCES)) {
    jobs.push({ url, dest: path.join(IMAGES, rel) });
  }

  console.log(`Downloading ${jobs.length} images…`);

  for (const job of jobs) {
    try {
      const status = await download(job.url, job.dest);
      if (status === 'skip') {
        skip += 1;
        process.stdout.write('.');
      } else {
        ok += 1;
        process.stdout.write('+');
      }
    } catch (err) {
      fail += 1;
      console.error(`\nFAIL ${path.relative(ROOT, job.dest)}: ${err.message}`);
    }
  }

  console.log(`\nDone: ${ok} downloaded, ${skip} skipped, ${fail} failed.`);
  if (fail > 0) process.exitCode = 1;
}

main();
