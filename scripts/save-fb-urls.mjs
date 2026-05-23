/**
 * Download Facebook CDN URLs listed in fb-urls.json (from browser extract).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'images', 'facebook');
const urls = JSON.parse(fs.readFileSync(path.join(__dirname, 'fb-urls.json'), 'utf8'));

function photoIdFromUrl(url) {
  const m = url.match(/\/(\d+)_(\d+)_\d+_n\.jpg/);
  return m ? m[2] : `img-${urls.indexOf(url)}`;
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
      Referer: 'https://www.facebook.com/',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) throw new Error('too small');
  fs.writeFileSync(dest, buf);
}

fs.mkdirSync(OUT, { recursive: true });

for (const url of urls) {
  const id = photoIdFromUrl(url);
  const dest = path.join(OUT, `fb-${id}.jpg`);
  try {
    await download(url, dest);
    console.log(`+ fb-${id}.jpg (${fs.statSync(dest).size} bytes)`);
  } catch (e) {
    console.log(`! fb-${id}: ${e.message}`);
  }
}
