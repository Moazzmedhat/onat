/**
 * Downloads public photos from ONAT Bakery Facebook page.
 * Run: node scripts/download-facebook-photos.mjs
 *
 * Note: Facebook may block or rate-limit requests. For full gallery,
 * export photos from Facebook Page Manager or log in and re-run.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'images', 'facebook');
const PAGE = 'https://www.facebook.com/ONAT.BAKERY/photos_by';

const KNOWN_FBIDS = [
  '1294095352822002',
  '1294095349488669',
  '1294095346155336',
  '1294095342822003',
  '1294095339488670',
  '1294095336155337',
  '1294095332822004',
  '1294095329488671',
  '1058300886401451',
];

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function extractImageUrls(html) {
  const urls = new Set();
  const patterns = [
    /https:\/\/scontent[^"'\s\\]+\.jpg[^"'\s\\]*/gi,
    /https:\/\/scontent[^"'\s\\]+\.png[^"'\s\\]*/gi,
    /"url":"(https:\\\/\\\/scontent[^"]+)"/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(html)) !== null) {
      let u = m[1] || m[0];
      u = u.replace(/\\u0025/g, '%').replace(/\\\//g, '/').replace(/&amp;/g, '&');
      if (u.includes('scontent') && !u.includes('emoji')) urls.add(u);
    }
  }
  return [...urls];
}

function pickBestUrl(urls) {
  const scored = urls.map((u) => {
    let score = 0;
    if (u.includes('s960x960') || u.includes('s1080x1080')) score += 50;
    else if (u.includes('s720x720')) score += 40;
    else if (u.includes('p960x960')) score += 45;
    else if (u.includes('s320x320') || u.includes('fb50_s320')) score -= 20;
    if (u.includes('stp=dst-jpg')) score += 5;
    return { u, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.u || urls[0];
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Referer: 'https://www.facebook.com/' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 3000) throw new Error(`too small (${buf.length}b)`);
  fs.writeFileSync(dest, buf);
}

async function getPhotoUrlsFromPage(fbid) {
  const urls = new Set();
  for (const base of [
    `https://www.facebook.com/photo.php?fbid=${fbid}`,
    `https://m.facebook.com/photo.php?fbid=${fbid}`,
  ]) {
    try {
      const html = await fetchHtml(base);
      extractImageUrls(html).forEach((u) => urls.add(u));
      const og = html.match(/property="og:image" content="([^"]+)"/i);
      if (og?.[1]) urls.add(og[1].replace(/&amp;/g, '&'));
    } catch {
      /* try next */
    }
  }
  return [...urls];
}

async function main() {
  ensureDir(OUT);
  const manifest = [];
  const fbids = new Set(KNOWN_FBIDS);

  console.log('Fetching photo list from page…');
  try {
    const html = await fetchHtml(PAGE);
    const found = [...html.matchAll(/fbid=(\d+)/g)].map((m) => m[1]);
    found.forEach((id) => fbids.add(id));
    extractImageUrls(html).forEach((u) => {
      const id = u.match(/(\d{10,})_(\d{10,})_n\.jpg/)?.[2];
      if (id) fbids.add(id);
    });
  } catch (e) {
    console.warn('Page fetch:', e.message);
  }

  console.log(`Found ${fbids.size} photo IDs`);

  let ok = 0;
  let fail = 0;

  for (const fbid of fbids) {
    const dest = path.join(OUT, `fb-${fbid}.jpg`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 8000) {
      manifest.push({ fbid, file: `images/facebook/fb-${fbid}.jpg`, status: 'skipped' });
      continue;
    }

    try {
      const candidates = await getPhotoUrlsFromPage(fbid);
      if (!candidates.length) throw new Error('no image URL');
      const best = pickBestUrl(candidates);
      await download(best, dest);
      manifest.push({ fbid, file: `images/facebook/fb-${fbid}.jpg`, status: 'ok' });
      ok += 1;
      console.log(`+ fb-${fbid}.jpg`);
    } catch (e) {
      fail += 1;
      console.log(`! ${fbid}: ${e.message}`);
    }
  }

  fs.writeFileSync(
    path.join(OUT, 'manifest.json'),
    JSON.stringify({ downloadedAt: new Date().toISOString(), photos: manifest }, null, 2)
  );

  console.log(`\nDone: ${ok} downloaded, ${fail} failed → ${OUT}`);
}

main();
