/* =============================================================================
   MAÎTRE MORGANE JOSEPH — app.js
   Vanilla JS: smooth scroll, cursor, split text, reveals, parallax,
   canvas particles, nav, accordions, card glow/tilt — astr.studio
============================================================================= */

'use strict';

/* ---------------------------------------------------------------------------
   0. GLOBALS & MOTION PREFERENCE
--------------------------------------------------------------------------- */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(pointer: coarse)').matches;
const isMobile = window.innerWidth < 768;

let cursorX = 0, cursorY = 0;
let ringX = 0, ringY = 0;
let smoothY = 0;

const scrollContent = document.querySelector('.scroll-content');
const scrollSpacer  = document.querySelector('.scroll-spacer');
const smoothEnabled = !prefersReduced && !isTouch && !isMobile;

/* ---------------------------------------------------------------------------
   1. SMOOTH SCROLL (RAF lerp)
--------------------------------------------------------------------------- */
function initSmoothScroll() {
  if (!smoothEnabled) {
    document.body.classList.add('smooth-disabled');
    return;
  }

  smoothY = window.scrollY;

  function updateSpacer() {
    if (scrollSpacer && scrollContent) {
      scrollSpacer.style.height = scrollContent.scrollHeight + 'px';
    }
  }

  window.addEventListener('resize', updateSpacer, { passive: true });
  const ro = new ResizeObserver(updateSpacer);
  if (scrollContent) ro.observe(scrollContent);
  updateSpacer();

  function loop() {
    const targetY = window.scrollY;
    smoothY += (targetY - smoothY) * 0.08;
    if (Math.abs(targetY - smoothY) < 0.1) smoothY = targetY;
    if (scrollContent) scrollContent.style.transform = `translate3d(0,${-smoothY}px,0)`;
    updateParallax(smoothY);
    updateCursorRing();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

function getScroll() {
  return smoothEnabled ? smoothY : window.scrollY;
}

/* ---------------------------------------------------------------------------
   2. CUSTOM CURSOR
--------------------------------------------------------------------------- */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

function initCursor() {
  if (isTouch || prefersReduced) return;

  window.addEventListener('mousemove', e => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    if (dot) dot.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;
  }, { passive: true });

  if (!smoothEnabled) {
    (function ringLoop() {
      updateCursorRing();
      requestAnimationFrame(ringLoop);
    })();
  }

  document.addEventListener('mouseover', e => {
    const isImg  = !!e.target.closest('img, .hero__portrait-frame, .presentation__img-wrap');
    const isLink = !!e.target.closest('a, button, label[for], .pillar, .c-card, .h-card');

    dot?.classList.toggle('hov-img', isImg);
    dot?.classList.toggle('hov-link', !isImg && isLink);
    ring?.classList.toggle('hov-img', isImg);
    ring?.classList.toggle('hov-link', !isImg && isLink);
  }, { passive: true });

  window.addEventListener('mousedown', () => {
    dot?.style.setProperty('transform', `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%)) scale(0.75)`);
    setTimeout(() => {
      if (dot) dot.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;
    }, 300);
  }, { passive: true });
}

function updateCursorRing() {
  if (!ring || isTouch || prefersReduced) return;
  ringX += (cursorX - ringX) * 0.15;
  ringY += (cursorY - ringY) * 0.15;
  ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
}

/* ---------------------------------------------------------------------------
   3. SPLIT TEXT
--------------------------------------------------------------------------- */
function splitText(el, mode) {
  const original = el.textContent.trim();
  el.setAttribute('aria-label', original);

  if (mode === 'chars') {
    el.innerHTML = [...original].map((c, i) => {
      if (c === ' ') return '<span class="char-space" aria-hidden="true"> </span>';
      return `<span class="char-wrap" aria-hidden="true"><span class="char-inner" style="transition-delay:${i * 28}ms">${c}</span></span>`;
    }).join('');
  } else {
    el.innerHTML = original.split(' ').map((w, i) =>
      `<span class="word-wrap" aria-hidden="true"><span class="word-inner" style="transition-delay:${i * 72}ms">${w}</span></span>`
    ).join(' ');
  }
}

function initSplitText() {
  document.querySelectorAll('.split-chars').forEach(el => splitText(el, 'chars'));
  document.querySelectorAll('.split-words').forEach(el => splitText(el, 'words'));
}

/* ---------------------------------------------------------------------------
   4. INTERSECTION OBSERVER REVEALS
--------------------------------------------------------------------------- */
function initReveals() {
  const els = document.querySelectorAll(
    '.reveal-up, .reveal-fade, .reveal-scale, .reveal-mask, .reveal-stagger, ' +
    '.split-chars, .split-words, .section-sep__line'
  );
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  els.forEach(el => obs.observe(el));
}

/* ---------------------------------------------------------------------------
   5. PARALLAX (called from RAF loop)
--------------------------------------------------------------------------- */
const parallaxEls = [];

function initParallax() {
  if (prefersReduced) return;
  document.querySelectorAll('.parallax').forEach(el => {
    parallaxEls.push({ el, speed: parseFloat(el.dataset.speed || '0.15') });
    el.style.willChange = 'transform';
  });
}

function updateParallax() {
  if (!parallaxEls.length) return;
  const vh = window.innerHeight;
  parallaxEls.forEach(({ el, speed }) => {
    const parent = el.parentElement || el;
    const rect = parent.getBoundingClientRect();
    // When smooth scroll active, getBoundingClientRect already uses the
    // translated position — no extra math needed.
    const center = rect.top + rect.height / 2 - vh / 2;
    const offset = Math.max(-120, Math.min(120, center * speed));
    el.style.transform = `translate3d(0,${offset}px,0)`;
  });
}

// For native scroll (no smooth scroll), update parallax on scroll event
if (!smoothEnabled && !prefersReduced) {
  window.addEventListener('scroll', updateParallax, { passive: true });
}

/* ---------------------------------------------------------------------------
   6. HERO CHOREOGRAPHY
--------------------------------------------------------------------------- */
function initHero() {
  const overlay = document.querySelector('.page-overlay');
  document.body.classList.add('is-locked');

  function at(ms, fn) { setTimeout(fn, ms); }

  // Fade out page overlay
  at(0, () => overlay?.classList.add('gone'));

  // Staggered hero elements
  document.querySelectorAll('.hero-anim').forEach(el => {
    const delay = parseInt(el.dataset.delay || '0', 10);
    at(delay, () => el.classList.add('entered'));
  });

  // Portrait mask reveal
  const portrait = document.querySelector('.hero__portrait-frame[data-mask-hero]');
  at(1500, () => portrait?.classList.add('is-visible'));

  // Canvas fade in
  at(1900, () => document.querySelector('.hero__canvas')?.classList.add('ready'));

  // Unlock scroll
  at(1500, () => document.body.classList.remove('is-locked'));
}

/* ---------------------------------------------------------------------------
   7. CANVAS PARTICLES
--------------------------------------------------------------------------- */
function initParticles() {
  const canvas = document.getElementById('heroCanvas');
  const section = document.querySelector('.hero');
  if (!canvas || !section || prefersReduced) return;

  const ctx = canvas.getContext('2d');
  const count = isMobile ? 40 : 100;
  let W, H, pts = [], active = true;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function rand(a, b) { return a + Math.random() * (b - a); }

  for (let i = 0; i < count; i++) {
    pts.push({
      x: rand(0, W), y: rand(0, H),
      vx: rand(-0.14, 0.14), vy: rand(-0.14, 0.14),
      r: rand(0.8, 2),
      a: rand(0.05, 0.2)
    });
  }

  // Stop animation when hero is off screen
  new IntersectionObserver(([e]) => { active = e.isIntersecting; }, { threshold: 0 })
    .observe(section);

  (function draw() {
    requestAnimationFrame(draw);
    if (!active) return;
    ctx.clearRect(0, 0, W, H);

    pts.forEach(p => {
      p.x = (p.x + p.vx + W) % W;
      p.y = (p.y + p.vy + H) % H;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240,235,230,${p.a})`;
      ctx.fill();
    });

    // Constellation links
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(240,235,230,${(1 - d / 110) * 0.055})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  })();
}

/* ---------------------------------------------------------------------------
   8. NAV (scroll-based transform + magic hide/show)
--------------------------------------------------------------------------- */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastY = 0, ticking = false;

  function update() {
    const sy = window.scrollY;
    nav.classList.toggle('scrolled', sy > 80);

    if (sy > 800) {
      if (sy > lastY + 2)  nav.classList.add('hidden');
      if (sy < lastY - 4)  nav.classList.remove('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastY = sy;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
}

/* ---------------------------------------------------------------------------
   9. MOBILE NAV TOGGLE
--------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const links  = document.querySelector('.nav__links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('open', !expanded);
    document.body.style.overflow = expanded ? '' : 'hidden';
  });

  links.querySelectorAll('.nav__link').forEach(a => {
    a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---------------------------------------------------------------------------
   10. ACCORDIONS
--------------------------------------------------------------------------- */
function initAccordions() {
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    const panelId = trigger.getAttribute('aria-controls');
    const panel   = document.getElementById(panelId);
    const item    = trigger.closest('.accordion__item');
    if (!panel || !item) return;

    // Init closed state
    panel.style.maxHeight = '0';
    panel.setAttribute('hidden', '');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close siblings in same accordion wrapper
      item.closest('.accordion')?.querySelectorAll('.accordion__item.open').forEach(sib => {
        if (sib !== item) closeAccordion(sib);
      });

      isOpen ? closeAccordion(item) : openAccordion(item, panel, trigger);
    });
  });
}

function openAccordion(item, panel, trigger) {
  item.classList.add('open');
  trigger.setAttribute('aria-expanded', 'true');
  panel.removeAttribute('hidden');
  const content = panel.querySelector('.accordion__content');
  panel.style.maxHeight = (content ? content.scrollHeight + 40 : 0) + 'px';
}

function closeAccordion(item) {
  const trigger = item.querySelector('.accordion__trigger');
  const panelId = trigger?.getAttribute('aria-controls');
  const panel   = panelId ? document.getElementById(panelId) : null;
  item.classList.remove('open');
  trigger?.setAttribute('aria-expanded', 'false');
  if (panel) {
    panel.style.maxHeight = '0';
    panel.addEventListener('transitionend', () => {
      if (!item.classList.contains('open')) panel.setAttribute('hidden', '');
    }, { once: true });
  }
}

/* ---------------------------------------------------------------------------
   11. CARD GLOW + 3D TILT
--------------------------------------------------------------------------- */
function initCardEffects() {
  if (prefersReduced || isTouch) return;

  document.querySelectorAll('.h-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--gx', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--gy', `${(y / rect.height) * 100}%`);
      const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -3.5;
      const rotY = ((x - rect.width  / 2) / (rect.width  / 2)) *  3.5;
      card.style.transform = `translateY(-6px) perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    }, { passive: true });
  });
}

/* ---------------------------------------------------------------------------
   12. SMOOTH ANCHOR CLICKS
--------------------------------------------------------------------------- */
function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();

      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h-s') || '64',
        10
      );
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: smoothEnabled ? 'instant' : 'smooth' });
    });
  });
}

/* ---------------------------------------------------------------------------
   13. CONTACT FORM (mailto fallback)
--------------------------------------------------------------------------- */
function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const nom     = form.querySelector('#f-nom')?.value    || '';
    const email   = form.querySelector('#f-email')?.value  || '';
    const tel     = form.querySelector('#f-tel')?.value    || '';
    const domaine = form.querySelector('#f-domaine')?.value || '';
    const message = form.querySelector('#f-message')?.value || '';

    const body = [
      `Nom : ${nom}`,
      `Email : ${email}`,
      `Téléphone : ${tel || '—'}`,
      `Domaine : ${domaine}`,
      '',
      message
    ].join('%0A');

    window.location.href =
      `mailto:morganejoseph.avocat@gmail.com` +
      `?subject=${encodeURIComponent('Demande de rendez-vous — ' + nom)}` +
      `&body=${body}`;

    if (success) {
      success.removeAttribute('hidden');
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    form.reset();
  });
}

/* ---------------------------------------------------------------------------
   14. BOOT
--------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initCursor();
  initSplitText();
  initReveals();
  initParallax();
  initNav();
  initMobileNav();
  initAccordions();
  initCardEffects();
  initAnchors();
  initForm();

  // Hero choreography: small delay lets fonts render
  setTimeout(initHero, 80);
  setTimeout(initParticles, 300);
});