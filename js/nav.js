/**
 * Header scroll state + mobile menu (lightweight, no ScrollTrigger).
 */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => root.querySelectorAll(sel);

let scrollTicking = false;

function updateHeaderScroll(header) {
  header.classList.toggle('scrolled', window.scrollY > 8);
  scrollTicking = false;
}

function bindHeaderScroll(header) {
  const onScroll = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => updateHeaderScroll(header));
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  updateHeaderScroll(header);
}

function setMenuOpen(open) {
  const links = $('.nav__links');
  const burger = $('#navBurger');
  const backdrop = $('.nav__backdrop');
  if (!links) return;

  links.classList.toggle('open', open);
  document.body.classList.toggle('nav-open', open);
  burger?.setAttribute('aria-expanded', open ? 'true' : 'false');
  backdrop?.setAttribute('aria-hidden', open ? 'false' : 'true');
}

export function setupNav() {
  const header = $('#header');
  if (!header) return;

  bindHeaderScroll(header);

  let backdrop = $('.nav__backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav__backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    header.after(backdrop);
    backdrop.addEventListener('click', () => setMenuOpen(false));
  }

  $('#navBurger')?.addEventListener('click', () => {
    setMenuOpen(!$('.nav__links')?.classList.contains('open'));
  });

  $$('.nav__links a').forEach((a) => {
    a.addEventListener('click', () => setMenuOpen(false));
  });

  window.addEventListener(
    'resize',
    () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    },
    { passive: true }
  );
}
