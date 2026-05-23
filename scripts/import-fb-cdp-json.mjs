import fs from 'fs';
import path from 'path';

const jsonPath = process.argv[2];
if (!jsonPath) {
  console.error('Usage: node import-fb-cdp-json.mjs <cdp-response.json>');
  process.exit(1);
}

const raw = fs.readFileSync(jsonPath, 'utf8');
const parsed = JSON.parse(raw);
const items = parsed?.result?.value ?? parsed?.value ?? parsed;
const list = Array.isArray(items) ? items : [items];

const outDir = path.join('images', 'facebook');
fs.mkdirSync(outDir, { recursive: true });

let saved = 0;
for (const item of list) {
  if (!item?.id || !item?.b64) {
    if (item?.err) console.warn('Skip', item.id, item.err);
    continue;
  }
  const dest = path.join(outDir, `fb-${item.id}.jpg`);
  const buf = Buffer.from(item.b64, 'base64');
  fs.writeFileSync(dest, buf);
  console.log(`Saved ${dest} (${buf.length} bytes)`);
  saved++;
}

const manifest = list
  .filter((i) => i?.id && i?.b64)
  .map((i) => ({ id: i.id, file: `fb-${i.id}.jpg`, bytes: Buffer.from(i.b64, 'base64').length }));

fs.writeFileSync(
  path.join(outDir, 'manifest.json'),
  JSON.stringify({ source: 'facebook.com/ONAT.BAKERY/photos', count: saved, files: manifest }, null, 2)
);
console.log(`Done: ${saved} images`);
