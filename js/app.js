import { CATEGORIES, getProductsByCategory } from './products.js';
import {
  CATEGORY_HERO_IMAGES,
  ABOUT_IMAGES,
  HERO_BG_IMAGE,
  HERO_FEATURE_IMAGE,
  WHY_ONAT_ITEMS,
  ORDER_SPOTLIGHT_HERO,
  ORDER_PATHS,
} from './productImages.js';
import { applyLanguage } from './i18n.js';
import { initCartUI, setCartLanguage, updateCartCount } from './cartUI.js';
import { initLandingAnimations } from './gsapAnimations.js';
import {
  GOOGLE_REVIEWS,
  getReviewText,
  getReviewField,
  getReviewPhotoAlt,
} from './reviews.js';
import { BRANCHES, getBranchField, phoneTelHref } from './branches.js';
import { setupNav } from './nav.js';

gsap.registerPlugin(ScrollTrigger);

let lang = localStorage.getItem('onat-lang') || 'ar';
let i18n = applyLanguage(lang);

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function t(key) {
  return i18n[key] || key;
}

async function init() {
  $('#year').textContent = new Date().getFullYear();
  setStaticImages();
  renderMenuPreview();
  renderWhyOnat();
  renderOrderSpotlight();
  renderReviews();
  renderBranches();
  setCartLanguage(lang, t);
  await initCartUI();
  setupNav();
  setupLangToggle();
  initLandingAnimations(lang);
}

function setStaticImages() {
  const heroBg = $('#heroBgImg');
  if (heroBg) {
    heroBg.src = HERO_BG_IMAGE;
    heroBg.alt = lang === 'en' ? 'Fresh bakery bread' : 'خبز مخبوزات طازجة';
  }
  const heroFeature = $('#heroFeatureImg');
  if (heroFeature) {
    heroFeature.src = HERO_FEATURE_IMAGE;
    heroFeature.alt =
      lang === 'en'
        ? 'Onat Bakery — morning is sweeter with our croissant'
        : 'أونات بيكري — الصبح يحلي معاه';
  }
  const aboutMain = $('#aboutImgMain');
  const aboutFloat = $('#aboutImgFloat');
  if (aboutMain) {
    aboutMain.src = ABOUT_IMAGES.main;
    aboutMain.alt = lang === 'en' ? 'Fresh croissants' : 'كرواسون طازج';
  }
  if (aboutFloat) {
    aboutFloat.src = ABOUT_IMAGES.float;
    aboutFloat.alt = lang === 'en' ? 'Chocolate cake' : 'كيك شوكولاتة';
  }
}

function categoryName(c) {
  return lang === 'en' ? c.nameEn : c.nameAr;
}

function renderMenuPreview() {
  const grid = $('#menuPreviewGrid');
  if (!grid) return;

  grid.innerHTML = CATEGORIES.map((cat, index) => {
    const img = CATEGORY_HERO_IMAGES[cat.id] || '';
    const count = getProductsByCategory(cat.id).length;
    const num = String(index + 1).padStart(2, '0');
    return `
      <a href="menu.html#menu-${cat.id}" class="preview-cat">
        <div class="preview-cat__media">
          <img src="${img}" alt="${categoryName(cat)}" loading="lazy" width="400" height="500" />
          <div class="preview-cat__shade" aria-hidden="true"></div>
        </div>
        <div class="preview-cat__info">
          <span class="preview-cat__num">${num}</span>
          <h3 class="preview-cat__title">${categoryName(cat)}</h3>
          <p class="preview-cat__meta">${count} ${t('stat-products')}</p>
        </div>
        <span class="preview-cat__arrow" aria-hidden="true">→</span>
      </a>
    `;
  }).join('');
}

function renderWhyOnat() {
  const list = $('#whyOnatList');
  if (!list) return;

  list.innerHTML = WHY_ONAT_ITEMS.map((item, index) => {
    const num = String(index + 1).padStart(2, '0');
    const reverse = index % 2 === 1 ? ' why-row--reverse' : '';
    const alt = t(`feature-${index + 1}-title`);

    return `
      <article class="why-row${reverse}" data-why="${item.id}">
        <div class="why-row__media">
          <img src="${item.image}" alt="${alt}" loading="lazy" width="800" height="560" />
          <span class="why-row__index">${num}</span>
        </div>
        <div class="why-row__text">
          <span class="why-row__tag">${t(`feature-${index + 1}-tag`)}</span>
          <h3 class="why-row__title">${t(`feature-${index + 1}-title`)}</h3>
          <p class="why-row__desc">${t(`feature-${index + 1}-desc`)}</p>
          <p class="why-row__detail">${t(`feature-${index + 1}-detail`)}</p>
        </div>
      </article>
    `;
  }).join('');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const REVIEW_VARIANTS = ['warm', 'glass', 'spotlight', 'gold', 'cream', 'dark'];

function reviewInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function reviewAvatarHue(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

function renderReviewBubble(review, index) {
  const text = getReviewText(review, lang);
  const badge = getReviewField(review.badge, lang);
  const meta = getReviewField(review.meta, lang);
  const timeAgo = getReviewField(review.timeAgo, lang);
  const variant = REVIEW_VARIANTS[index % REVIEW_VARIANTS.length];
  const tilt = index % 2 === 0 ? 'tilt-start' : 'tilt-end';
  const initials = reviewInitials(review.name);
  const hue = reviewAvatarHue(review.name);
  const photoAlt = getReviewPhotoAlt(review, lang) || review.name;
  const avatarHtml = review.avatar
    ? `<img class="review-bubble__avatar-img" src="${review.avatar}" alt="" width="42" height="42" loading="lazy" decoding="async" />`
    : '';
  const photoHtml = review.photo
    ? `<figure class="review-bubble__photo">
        <img src="${review.photo}" alt="${escapeHtml(photoAlt)}" width="360" height="200" loading="lazy" decoding="async" />
      </figure>`
    : '';

  const newBadge = review.isNew
    ? `<span class="review-bubble__pill review-bubble__pill--new">${lang === 'en' ? 'New' : 'جديد'}</span>`
    : '';

  let scoresHtml = '';
  if (review.scores) {
    const labels =
      lang === 'en'
        ? { food: 'Food', service: 'Service', atmosphere: 'Atmosphere' }
        : { food: 'الطعام', service: 'الخدمة', atmosphere: 'الأجواء' };
    scoresHtml = `<div class="review-bubble__chips">${Object.entries(review.scores)
      .map(([k, v]) => `<span>${labels[k]} <strong>${v}</strong></span>`)
      .join('')}</div>`;
  }

  let tagsHtml = '';
  if (review.tags) {
    const tags = review.tags[lang] || review.tags.ar || [];
    tagsHtml = `<div class="review-bubble__tags">${tags
      .map((tag) => `<span>${escapeHtml(tag)}</span>`)
      .join('')}</div>`;
  }

  return `
    <blockquote class="review-bubble review-bubble--${variant} review-bubble--${tilt}${review.photo ? ' review-bubble--has-photo' : ''}" data-review="${review.id}">
      <span class="review-bubble__glow" aria-hidden="true"></span>
      ${photoHtml}
      <header class="review-bubble__head">
        <div class="review-bubble__avatar" style="--avatar-hue: ${hue}">
          ${avatarHtml}
          <span class="review-bubble__initials" aria-hidden="true">${initials}</span>
        </div>
        <div class="review-bubble__who">
          <cite class="review-bubble__name">${escapeHtml(review.name)}</cite>
          <div class="review-bubble__meta">
            ${badge ? `<span class="review-bubble__guide">${escapeHtml(badge)}</span>` : ''}
            ${meta ? `<span>${escapeHtml(meta)}</span>` : ''}
            <span class="review-bubble__time">${escapeHtml(timeAgo)}</span>
          </div>
        </div>
        <div class="review-bubble__rating" aria-label="5 stars">
          <span class="review-bubble__stars" aria-hidden="true"></span>
          ${newBadge}
        </div>
      </header>
      <div class="review-bubble__body">
        <span class="review-bubble__mark" aria-hidden="true">"</span>
        <p class="review-bubble__quote" lang="${lang}">${escapeHtml(text)}</p>
      </div>
      ${scoresHtml}
      ${tagsHtml}
    </blockquote>
  `;
}

function bindReviewImages(root = document) {
  root.querySelectorAll('.review-bubble__avatar-img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0) {
      img.closest('.review-bubble__avatar')?.classList.add('review-bubble__avatar--fallback');
    }
    img.addEventListener('error', () => {
      img.closest('.review-bubble__avatar')?.classList.add('review-bubble__avatar--fallback');
    });
  });

  root.querySelectorAll('.review-bubble__photo img').forEach((img) => {
    img.addEventListener('error', () => {
      const figure = img.closest('.review-bubble__photo');
      if (figure) figure.remove();
      img.closest('.review-bubble')?.classList.remove('review-bubble--has-photo');
    });
  });
}

function fillReviewTrack(track, reviews, startIndex = 0) {
  if (!track) return;
  const cards = reviews
    .map((review, i) => renderReviewBubble(review, startIndex + i))
    .join('');
  track.innerHTML = cards + cards;
  bindReviewImages(track);
}

function renderBranches() {
  const list = $('#branchesList');
  if (!list) return;

  const callLabel = t('branches-call');

  list.innerHTML = BRANCHES.map(
    (branch) => `
    <article class="branch-card" data-branch="${branch.id}">
      <div class="branch-card__pin" aria-hidden="true">📍</div>
      <div class="branch-card__body">
        <h3 class="branch-card__name">${escapeHtml(getBranchField(branch.name, lang))}</h3>
        <p class="branch-card__address">${escapeHtml(getBranchField(branch.address, lang))}</p>
        <div class="branch-card__phones">
          ${branch.phones
            .map(
              (phone) =>
                `<a class="branch-card__phone" href="${phoneTelHref(phone)}">${escapeHtml(phone)}</a>`
            )
            .join('')}
        </div>
      </div>
      <a class="branch-card__cta" href="${phoneTelHref(branch.phones[0])}" aria-label="${escapeHtml(callLabel)} ${escapeHtml(getBranchField(branch.name, lang))}">
        <span aria-hidden="true">📞</span> ${escapeHtml(callLabel)}
      </a>
    </article>
  `
  ).join('');
}

function renderReviews() {
  const trackA = $('#reviewsTrackA');
  const trackB = $('#reviewsTrackB');
  if (!trackA && !trackB) return;

  const mid = Math.ceil(GOOGLE_REVIEWS.length / 2);
  const rowA = GOOGLE_REVIEWS.slice(0, mid);
  const rowB = GOOGLE_REVIEWS.slice(mid);

  fillReviewTrack(trackA, rowA, 0);
  fillReviewTrack(trackB, rowB.length ? rowB : rowA, mid);
}

function renderOrderSpotlight() {
  const heroImg = $('#orderSpotlightImg');
  if (heroImg) {
    heroImg.src = ORDER_SPOTLIGHT_HERO;
    heroImg.alt = lang === 'en' ? 'Fresh bakery display at Onat' : 'عرض مخبوزات أونات الطازجة';
  }

  const paths = $('#orderPaths');
  if (!paths) return;

  paths.innerHTML = ORDER_PATHS.map((path, index) => {
    const n = index + 1;
    const accent = path.accent ? ' order-path--accent' : '';
    const attrs = path.external
      ? 'target="_blank" rel="noopener"'
      : '';

    return `
      <a href="${path.href}" class="order-path${accent}" ${attrs}>
        <div class="order-path__thumb">
          <img src="${path.image}" alt="" loading="lazy" width="400" height="250" />
        </div>
        <div class="order-path__body">
          <span class="order-path__step">${t('order-step')} ${n}</span>
          <h3 class="order-path__title">${t(`order-path-${n}-title`)}</h3>
          <p class="order-path__desc">${t(`order-path-${n}-desc`)}</p>
          <span class="order-path__cta">${t(`order-path-${n}-cta`)} →</span>
        </div>
      </a>
    `;
  }).join('');
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
    setStaticImages();
    renderMenuPreview();
    renderWhyOnat();
    renderOrderSpotlight();
    renderReviews();
    renderBranches();
    updateCartCount();
    ScrollTrigger.getAll().forEach((st) => st.kill());
    initLandingAnimations(lang);
  });
}

init();
