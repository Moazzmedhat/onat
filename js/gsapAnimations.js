/**
 * Shared GSAP + ScrollTrigger effects.
 */
import { GOOGLE_REVIEWS } from './reviews.js';

export function refreshScroll() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
}

export function initLandingAnimations(lang) {
  if (typeof gsap === 'undefined') return;

  gsap.from('.header', {
    y: -24,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    clearProps: 'transform,opacity',
  });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero__eyebrow', { opacity: 0, y: 24, duration: 0.65 })
    .from('.hero__line', { opacity: 0, y: 48, rotationX: -12, duration: 0.75, stagger: 0.14 }, '-=0.35')
    .from('.hero__desc', { opacity: 0, y: 22, duration: 0.6 }, '-=0.45')
    .from('.hero__stats .hero__stat', { opacity: 0, y: 20, scale: 0.9, duration: 0.5, stagger: 0.1 }, '-=0.4')
    .from('.hero__cta .btn', { opacity: 0, y: 24, scale: 0.92, duration: 0.55, stagger: 0.12 }, '-=0.35')
    .from(
      '.hero__feature-wrap',
      { opacity: 0, scale: 0.88, y: 40, rotation: lang === 'en' ? 4 : -4, duration: 1.1 },
      '-=0.75'
    )
    .from('.hero__feature-badge', { opacity: 0, x: lang === 'en' ? -20 : 20, duration: 0.5 }, '-=0.5')
    .from('.hero__scroll', { opacity: 0, y: 10, duration: 0.5 }, '-=0.3');

  gsap.to('.hero__scroll-line', {
    scaleY: 1.3,
    opacity: 0.5,
    duration: 1.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    transformOrigin: 'top center',
  });

  gsap.to('.hero__feature-badge', {
    y: -6,
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  gsap.to('.hero__orb--1', {
    x: 40,
    y: 25,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  gsap.to('.hero__orb--2', {
    x: -30,
    y: -20,
    duration: 9,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  const heroBg = document.querySelector('.hero__bg-img');
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  }

  gsap.to('.marquee__track', {
    xPercent: lang === 'en' ? 10 : -10,
    ease: 'none',
    scrollTrigger: {
      trigger: '.marquee',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });

  gsap.utils.toArray('.section__head').forEach((head) => {
    gsap.from(head.children, {
      scrollTrigger: { trigger: head, start: 'top 88%', once: true },
      opacity: 0,
      y: 32,
      duration: 0.65,
      stagger: 0.1,
      ease: 'power2.out',
    });
  });

  gsap.from('.why-onat__lead', {
    scrollTrigger: { trigger: '.why-onat__head', start: 'top 85%', once: true },
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 0.15,
  });

  document.querySelectorAll('.why-row').forEach((row, index) => {
    const media = row.querySelector('.why-row__media');
    const textParts = row.querySelectorAll(
      '.why-row__tag, .why-row__title, .why-row__desc, .why-row__detail'
    );
    const img = row.querySelector('.why-row__media img');
    const fromX = index % 2 === 0 ? (lang === 'en' ? -80 : 80) : lang === 'en' ? 80 : -80;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: row, start: 'top 82%', once: true },
    });

    tl.from(media, {
      opacity: 0,
      x: fromX,
      scale: 0.94,
      duration: 0.9,
      ease: 'power3.out',
    }).from(
      textParts,
      {
        opacity: 0,
        y: 28,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power2.out',
      },
      '-=0.55'
    );

    if (img) {
      gsap.to(img, {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: row,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
        },
      });
    }
  });

  gsap.from('.preview-cat', {
    scrollTrigger: { trigger: '#menuPreviewGrid', start: 'top 88%', once: true },
    opacity: 0,
    y: 48,
    scale: 0.92,
    duration: 0.65,
    stagger: 0.06,
    ease: 'power3.out',
  });

  document.querySelectorAll('.preview-cat').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card.querySelector('img'), { scale: 1.1, duration: 0.5, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card.querySelector('img'), { scale: 1, duration: 0.5, ease: 'power2.out' });
    });
  });

  gsap.from('.section__cta-wrap .btn', {
    scrollTrigger: { trigger: '.section__cta-wrap', start: 'top 90%', once: true },
    opacity: 0,
    scale: 0.85,
    duration: 0.6,
    ease: 'back.out(2)',
  });

  const orderHero = document.querySelector('.order-spotlight__hero');
  if (orderHero) {
    gsap.from('.order-spotlight__hero-text > *', {
      scrollTrigger: { trigger: orderHero, start: 'top 85%', once: true },
      opacity: 0,
      y: 28,
      duration: 0.65,
      stagger: 0.12,
      ease: 'power3.out',
    });

    const orderImg = orderHero.querySelector('img');
    if (orderImg) {
      gsap.from(orderImg, {
        scrollTrigger: { trigger: orderHero, start: 'top 85%', once: true },
        scale: 1.15,
        duration: 1.2,
        ease: 'power2.out',
      });
      gsap.to(orderImg, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: orderHero,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }
  }

  gsap.from('.order-path', {
    scrollTrigger: { trigger: '#orderPaths', start: 'top 88%', once: true },
    opacity: 0,
    y: 50,
    rotateX: 8,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out',
  });

  gsap.from('.order-spotlight__actions .btn', {
    scrollTrigger: { trigger: '.order-spotlight__actions', start: 'top 92%', once: true },
    opacity: 0,
    y: 20,
    scale: 0.9,
    duration: 0.5,
    stagger: 0.1,
    ease: 'back.out(2)',
  });

  gsap.from('.order-spotlight__note', {
    scrollTrigger: { trigger: '.order-spotlight__note', start: 'top 95%', once: true },
    opacity: 0,
    duration: 0.5,
  });

  gsap.from('.about__media', {
    scrollTrigger: { trigger: '#about', start: 'top 78%', once: true },
    opacity: 0,
    x: lang === 'en' ? -80 : 80,
    scale: 0.95,
    duration: 1,
    ease: 'power3.out',
  });

  gsap.from('.about__content > *', {
    scrollTrigger: { trigger: '#about', start: 'top 78%', once: true },
    opacity: 0,
    y: 35,
    duration: 0.6,
    stagger: 0.09,
  });

  gsap.from('.reviews__head > *, .reviews__badge', {
    scrollTrigger: { trigger: '#testimonials', start: 'top 88%', once: true },
    opacity: 0,
    y: 28,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power2.out',
  });

  const scoreNum = document.querySelector('.reviews__score-num');
  if (scoreNum) {
    const target = parseFloat(scoreNum.dataset.score || '5');
    const score = { value: 0 };
    gsap.to(score, {
      scrollTrigger: { trigger: '.reviews__badge', start: 'top 90%', once: true },
      value: target,
      duration: 1.1,
      ease: 'power2.out',
      onUpdate() {
        scoreNum.textContent = score.value.toFixed(1);
      },
    });
  }

  gsap.from('.reviews__stars--live span', {
    scrollTrigger: { trigger: '.reviews__badge', start: 'top 90%', once: true },
    opacity: 0,
    scale: 0,
    rotation: -30,
    duration: 0.45,
    stagger: 0.07,
    ease: 'back.out(2.4)',
  });

  gsap.to('.reviews__orb--1', {
    x: 30,
    y: 20,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  gsap.to('.reviews__orb--2', {
    x: -25,
    y: -18,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  gsap.to('.reviews__orb--3', {
    scale: 1.15,
    opacity: 0.55,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  gsap.from('.reviews__stage', {
    scrollTrigger: { trigger: '.reviews__stage', start: 'top 92%', once: true },
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: 'power3.out',
  });

  document.querySelectorAll('.reviews__marquee').forEach((row, rowIndex) => {
    gsap.from(row, {
      scrollTrigger: { trigger: row, start: 'top 94%', once: true },
      opacity: 0,
      x: rowIndex === 0 ? (lang === 'en' ? -60 : 60) : lang === 'en' ? 60 : -60,
      duration: 0.85,
      delay: rowIndex * 0.12,
      ease: 'power3.out',
    });
  });

  initReviewBubbles(lang);

  gsap.from('#branches .section__head > *, .branches__lead', {
    scrollTrigger: { trigger: '#branches', start: 'top 88%', once: true },
    opacity: 0,
    y: 24,
    duration: 0.55,
    stagger: 0.08,
    ease: 'power2.out',
  });

  gsap.from('.branch-card', {
    scrollTrigger: { trigger: '.branches__grid', start: 'top 90%', once: true },
    opacity: 0,
    y: 36,
    scale: 0.96,
    duration: 0.55,
    stagger: 0.1,
    ease: 'power3.out',
  });

  gsap.from('.contact__inner > *', {
    scrollTrigger: { trigger: '#contact', start: 'top 88%', once: true },
    opacity: 0,
    y: 30,
    scale: 0.96,
    duration: 0.55,
    stagger: 0.1,
    ease: 'back.out(1.5)',
  });

  gsap.from('.footer__grid > *', {
    scrollTrigger: { trigger: '.footer', start: 'top 95%', once: true },
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.08,
  });
}

function initReviewBubbles(lang) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.review-bubble').forEach((bubble, i) => {
    if (i >= GOOGLE_REVIEWS.length) return;

    const glow = bubble.querySelector('.review-bubble__glow');

    const photoImg = bubble.querySelector('.review-bubble__photo img');

    bubble.addEventListener('mouseenter', () => {
      gsap.to(bubble, {
        scale: 1.04,
        y: -6,
        rotation: 0,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      if (glow) {
        gsap.to(glow, { opacity: 1, scale: 1.08, duration: 0.4 });
      }
      if (photoImg) {
        gsap.to(photoImg, { scale: 1.1, duration: 0.55, ease: 'power2.out' });
      }
    });

    bubble.addEventListener('mousemove', (e) => {
      const rect = bubble.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const tiltX = py * -8;
      const tiltY = px * (lang === 'en' ? 8 : -8);
      gsap.to(bubble, {
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 900,
        duration: 0.25,
        ease: 'power2.out',
      });
    });

    bubble.addEventListener('mouseleave', () => {
      gsap.to(bubble, {
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      if (glow) {
        gsap.to(glow, { opacity: 0.6, scale: 1, duration: 0.4 });
      }
      if (photoImg) {
        gsap.to(photoImg, { scale: 1, duration: 0.5, ease: 'power2.out' });
      }
    });
  });
}

export function initMenuPageAnimations(lang) {
  if (typeof gsap === 'undefined') return;

  gsap.from('.header', {
    y: -20,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
    clearProps: 'transform,opacity',
  });

  gsap.from('.menu-page__hero > .container > *', {
    opacity: 0,
    y: 35,
    duration: 0.65,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 0.15,
  });

  gsap.from('.menu-chip', {
    opacity: 0,
    y: 16,
    scale: 0.9,
    duration: 0.45,
    stagger: 0.04,
    ease: 'back.out(1.6)',
    delay: 0.4,
  });
}

export function animateMenuSections() {
  if (typeof gsap === 'undefined') return;

  gsap.utils.toArray('.menu-section').forEach((section) => {
    const head = section.querySelector('.menu-section__head');
    const items = section.querySelectorAll('.menu-item');

    if (head) {
      gsap.from(head, {
        scrollTrigger: { trigger: section, start: 'top 88%', once: true },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    if (items.length) {
      gsap.from(items, {
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
        opacity: 0,
        y: 45,
        scale: 0.94,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power2.out',
      });
    }
  });

  gsap.from('.menu-page__cta .container > *', {
    scrollTrigger: { trigger: '.menu-page__cta', start: 'top 90%', once: true },
    opacity: 0,
    y: 28,
    duration: 0.55,
    stagger: 0.1,
    ease: 'back.out(1.4)',
  });

  refreshScroll();
}

export function animateMenuItemsQuick(container) {
  if (typeof gsap === 'undefined' || !container) return;
  const items = container.querySelectorAll('.menu-item');
  gsap.from(items, {
    opacity: 0,
    y: 25,
    scale: 0.96,
    duration: 0.4,
    stagger: 0.03,
    ease: 'power2.out',
  });
}
