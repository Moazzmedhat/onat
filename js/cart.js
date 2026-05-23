import { findProduct } from './products.js';
import { getProductImage } from './productImages.js';

const STORAGE_KEY = 'onat-cart';

function resolveItemImage(item) {
  if (item.image) return item.image;
  const product = findProduct(item.id);
  return product ? getProductImage(product) : '';
}

export class Cart {
  constructor() {
    this.items = this.load();
    this.listeners = [];
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const items = raw ? JSON.parse(raw) : [];
      return items.map((item) => {
        const image = resolveItemImage(item);
        return image && !item.image ? { ...item, image } : item;
      });
    } catch {
      return [];
    }
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    this.notify();
  }

  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  notify() {
    this.listeners.forEach((fn) => fn(this.items));
  }

  add(product, qty = 1) {
    const image = product.image || getProductImage(product);
    const existing = this.items.find((i) => i.id === product.id);
    if (existing) {
      existing.qty += qty;
      if (!existing.image && image) existing.image = image;
    } else {
      this.items.push({
        id: product.id,
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        price: product.price,
        image,
        shopifyVariantId: product.shopifyVariantId || null,
        qty,
      });
    }
    this.save();
  }

  updateQty(id, qty) {
    const item = this.items.find((i) => i.id === id);
    if (!item) return;
    if (qty <= 0) this.remove(id);
    else {
      item.qty = qty;
      this.save();
    }
  }

  remove(id) {
    this.items = this.items.filter((i) => i.id !== id);
    this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }

  get count() {
    return this.items.reduce((s, i) => s + i.qty, 0);
  }

  get total() {
    return this.items.reduce((s, i) => s + i.price * i.qty, 0);
  }
}
