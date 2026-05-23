import fs from 'fs';
import path from 'path';

const [id, b64File] = process.argv.slice(2);
if (!id || !b64File) {
  console.error('Usage: node save-b64-image.mjs <photoId> <base64.txt>');
  process.exit(1);
}
const b64 = fs.readFileSync(b64File, 'utf8').trim();
const buf = Buffer.from(b64, 'base64');
const dest = path.join('images', 'facebook', `fb-${id}.jpg`);
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, buf);
console.log(`Saved ${dest} (${buf.length} bytes)`);
