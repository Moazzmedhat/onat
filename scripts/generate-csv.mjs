import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'js/products.js'), 'utf8');
const re =
  /\{ id: '([^']+)', category: '([^']+)', nameAr: '([^']*)', nameEn: '([^']*)', price: ([\d.]+)/g;

const products = [];
let m;
while ((m = re.exec(src))) {
  products.push({ id: m[1], cat: m[2], ar: m[3], en: m[4], price: m[5] });
}

const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;

const header =
  'Handle,Title,Body (HTML),Vendor,Type,Tags,Published,Option1 Name,Option1 Value,Variant SKU,Variant Price,Variant Inventory Qty,Variant Inventory Policy,Variant Requires Shipping,Variant Taxable,Status';

const rows = products.map((p) =>
  [
    p.id,
    esc(p.en),
    esc(`<p>${p.ar}</p>`),
    'Onat Bakery',
    p.cat,
    'bakery,onat',
    'TRUE',
    'Title',
    'Default Title',
    p.id,
    p.price,
    '100',
    'deny',
    'TRUE',
    'TRUE',
    'active',
  ].join(',')
);

mkdirSync(join(root, 'shopify'), { recursive: true });
const out = join(root, 'shopify/products-import.csv');
writeFileSync(out, `${header}\n${rows.join('\n')}`);
console.log(`Wrote ${products.length} products to ${out}`);
