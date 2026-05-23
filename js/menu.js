import { CATEGORIES, getProductsByCategory, findProduct } from './products.js';
import { getProductImage, CATEGORY_HERO_IMAGES } from './productImages.js';
import { getProductDescription, getProductUnit, getProductTags } from './productDetails.js';
import { applyLanguage } from './i18n.js';
import { initCartUI, setCartLanguage, addToCart } from './cartUI.js';
import { setupNav } from './nav.js';
import { initMenuPageAnimations, animateMenuSections } from './gsapAnimations.js';

gsap.registerPlugin(ScrollTrigger);

let lang = localStorage.getItem('onat-lang') || 'ar';
let i18n = applyLanguage(lang);

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function t(key) {
  return i18n[key] || key;
}

function categoryName(c) {
  return lang === 'en' ? c.nameEn : c.nameAr;
}

function productName(p) {
  return lang === 'en' ? p.nameEn : p.nameAr;
}

function formatPrice(n) {
  const formatted = Number.isInteger(n) ? n : n.toFixed(2);
  return `${formatted} ${t('currency')}`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function init() {
  $('#year').textContent = new Date().getFullYear();
  setCartLanguage(lang, t);
  await initCartUI();
  renderJumpNav();
  renderMenuSections();
  setupLangToggle();
  setupNav();
  initMenuPageAnimations(lang);
  animateMenuSections();
}

function renderJumpNav() {
  const chips = $('#menuChips');
  chips.innerHTML = CATEGORIES.map(
    (c) => `<a href="#menu-${c.id}" class="menu-chip">${escapeHtml(categoryName(c))}</a>`
  ).join('');
}

function bindAddButtons() {
  $$('[data-add]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const product = findProduct(btn.dataset.add);
      if (product) addToCart(product, btn);
    });
  });
}

function renderMenuSections() {
  const wrap = $('#menuSections');
  wrap.innerHTML = CATEGORIES.map((cat) => {
    const items = getProductsByCategory(cat.id);
    const sectionImg = CATEGORY_HERO_IMAGES[cat.id] || '';

    const cards = items
      .map((p) => {
        const img = getProductImage(p);
        const desc = getProductDescription(p, lang);
        const unit = getProductUnit(p, lang);
        const tags = getProductTags(p, lang);
        const tagHtml = tags
          .map((tag) => `<span class="menu-item__tag">${escapeHtml(tag)}</span>`)
          .join('');

        return `
          <article class="menu-item">
            <div class="menu-item__media">
              <img src="${img}" alt="${escapeHtml(productName(p))}" loading="lazy" width="320" height="240" onerror="this.onerror=null;this.src='${sectionImg}'" />
            </div>
            <div class="menu-item__body">
              <div class="menu-item__head">
                <h3 class="menu-item__name">${escapeHtml(productName(p))}</h3>
                <p class="menu-item__price">${formatPrice(p.price)}</p>
              </div>
              ${unit ? `<p class="menu-item__unit">${escapeHtml(unit)}</p>` : ''}
              <p class="menu-item__desc">${escapeHtml(desc)}</p>
              ${tags.length ? `<div class="menu-item__tags">${tagHtml}</div>` : ''}
              <button type="button" class="menu-item__add" data-add="${p.id}" aria-label="${escapeHtml(t('menu-add'))}">
                <span>+</span> ${escapeHtml(t('menu-add'))}
              </button>
            </div>
          </article>
        `;
      })
      .join('');

    return `
      <section class="menu-section" id="menu-${cat.id}">
        <header class="menu-section__head">
          <img src="${sectionImg}" alt="${escapeHtml(categoryName(cat))}" loading="lazy" width="160" height="120" />
          <div>
            <h2>${escapeHtml(categoryName(cat))}</h2>
            <p>${items.length} ${t('stat-products')}</p>
          </div>
        </header>
        <div class="menu-items__grid">${cards}</div>
      </section>
    `;
  }).join('');

  bindAddButtons();
}

function setupLangToggle() {
  const btn = $('#langToggle');
  btn.textContent = lang === 'ar' ? 'EN' : 'ع';
  btn.addEventListener('click', () => {
    lang = lang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('onat-lang', lang);
    i18n = applyLanguage(lang);
    btn.textContent = lang === 'ar' ? 'EN' : 'ع';
    setCartLanguage(lang, t);
    renderJumpNav();
    renderMenuSections();
    ScrollTrigger.getAll().forEach((st) => st.kill());
    initMenuPageAnimations(lang);
    animateMenuSections();
  });
}

init();
