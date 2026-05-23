import { Cart } from './cart.js';
import { findProduct } from './products.js';
import { getProductImage } from './productImages.js';
import { loadShopifyConfig, isShopifyEnabled, createCheckout } from './shopify.js';

export const cart = new Cart();

let lang = 'ar';
let t = (key) => key;

export function setCartLanguage(newLang, translateFn) {
  lang = newLang;
  t = translateFn;
  updateCartCount();
  renderCart();
}

function formatPrice(n) {
  const formatted = Number.isInteger(n) ? n : n.toFixed(2);
  return `${formatted} ${t('currency')}`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getItemImage(item) {
  if (item.image) return item.image;
  const product = findProduct(item.id);
  return product ? getProductImage(product) : '';
}

export function updateCartCount() {
  const el = document.querySelector('#cartCount');
  if (el) el.textContent = cart.count;
}

export function renderCart() {
  const body = document.querySelector('#cartItems');
  const totalEl = document.querySelector('#cartTotal');
  if (!body || !totalEl) return;

  if (!cart.items.length) {
    body.innerHTML = `<p class="cart-empty">${t('cart-empty')}</p>`;
    totalEl.textContent = formatPrice(0);
    return;
  }

  body.innerHTML = cart.items
    .map((item) => {
      const name = lang === 'en' ? item.nameEn : item.nameAr;
      const image = getItemImage(item);
      const thumb = image
        ? `<div class="cart-item__thumb"><img src="${escapeHtml(image)}" alt="${escapeHtml(name)}" loading="lazy" width="72" height="72" /></div>`
        : '';

      return `
    <div class="cart-item" data-id="${item.id}">
      ${thumb}
      <div class="cart-item__info">
        <div class="cart-item__top">
          <div class="cart-item__name">${escapeHtml(name)}</div>
          <button type="button" class="cart-item__remove" data-remove="${item.id}" aria-label="${lang === 'en' ? 'Remove' : 'حذف'}">×</button>
        </div>
        <div class="cart-item__price">${formatPrice(item.price)}</div>
        <div class="cart-item__qty">
          <button type="button" data-qty="-1" data-id="${item.id}">−</button>
          <span>${item.qty}</span>
          <button type="button" data-qty="1" data-id="${item.id}">+</button>
        </div>
      </div>
    </div>
  `;
    })
    .join('');

  totalEl.textContent = formatPrice(cart.total);

  body.querySelectorAll('[data-qty]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const delta = parseInt(btn.dataset.qty, 10);
      const item = cart.items.find((i) => i.id === id);
      if (item) cart.updateQty(id, item.qty + delta);
    });
  });

  body.querySelectorAll('[data-remove]').forEach((btn) => {
    btn.addEventListener('click', () => cart.remove(btn.dataset.remove));
  });

  const note = document.querySelector('#cartNote');
  if (note) {
    note.textContent = isShopifyEnabled()
      ? lang === 'en'
        ? 'Secure checkout via Shopify'
        : 'دفع آمن عبر Shopify'
      : t('cart-note');
  }
}

export function showToast(msg) {
  const toast = document.querySelector('#toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  if (typeof gsap !== 'undefined') {
    gsap.fromTo(toast, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(1.7)' });
  }
  setTimeout(() => toast.classList.remove('show'), 2600);
}

export function addToCart(product, btn) {
  cart.add(product);
  showToast(t('added-to-cart'));
  updateCartCount();

  if (btn && typeof gsap !== 'undefined') {
    gsap.fromTo(btn, { scale: 1 }, { scale: 1.2, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' });
  }

  const countEl = document.querySelector('#cartCount');
  if (countEl && typeof gsap !== 'undefined') {
    gsap.fromTo(countEl, { scale: 1.5 }, { scale: 1, duration: 0.35, ease: 'elastic.out(1, 0.5)' });
  }
}

export async function initCartUI() {
  await loadShopifyConfig();

  const drawer = document.querySelector('#cartDrawer');
  if (!drawer) return;

  const panel = drawer.querySelector('.cart-drawer__panel');
  const slideFrom = () => (lang === 'en' ? '-100%' : '100%');

  const open = () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    if (panel && typeof gsap !== 'undefined') {
      gsap.fromTo(panel, { x: slideFrom() }, { x: '0%', duration: 0.5, ease: 'power3.out' });
    }
  };

  const close = () => {
    if (panel && typeof gsap !== 'undefined') {
      gsap.to(panel, {
        x: slideFrom(),
        duration: 0.35,
        ease: 'power3.in',
        onComplete: () => {
          drawer.classList.remove('open');
          drawer.setAttribute('aria-hidden', 'true');
        },
      });
    } else {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
    }
  };

  document.querySelector('#cartOpen')?.addEventListener('click', open);
  document.querySelector('#cartClose')?.addEventListener('click', close);
  document.querySelector('#cartOverlay')?.addEventListener('click', close);

  document.querySelector('#checkoutBtn')?.addEventListener('click', async () => {
    if (!cart.items.length) return;

    if (isShopifyEnabled()) {
      const btn = document.querySelector('#checkoutBtn');
      try {
        if (btn) btn.disabled = true;
        const url = await createCheckout(cart.items);
        if (url) window.location.href = url;
      } catch (err) {
        showToast(err.message);
      } finally {
        if (btn) btn.disabled = false;
      }
    } else {
      const lines = cart.items
        .map((i) => `${lang === 'en' ? i.nameEn : i.nameAr} × ${i.qty}`)
        .join('\n');
      const msg =
        lang === 'en'
          ? `Order request:\n${lines}\n\nTotal: ${formatPrice(cart.total)}`
          : `طلب:\n${lines}\n\nالمجموع: ${formatPrice(cart.total)}`;
      window.open(
        `https://www.instagram.com/onatbakery/?text=${encodeURIComponent(msg)}`,
        '_blank'
      );
    }
  });

  cart.subscribe(() => {
    updateCartCount();
    renderCart();
  });

  updateCartCount();
  renderCart();
}
