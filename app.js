/* =============================================================================
   MAÃŽTRE MORGANE JOSEPH â€” app.js â€” astr.studio
   Native scroll Â· RAF loop for cursor + parallax + massive text
============================================================================= */

'use strict';

/* ---------------------------------------------------------------------------
   0. GLOBALS
--------------------------------------------------------------------------- */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch        = window.matchMedia('(pointer: coarse)').matches;
const isMobile       = window.innerWidth < 768;

let cursorX = 0, cursorY = 0;
let ringX   = 0, ringY   = 0;
let loaderActive = false;

/* ---------------------------------------------------------------------------
   0.5 SITE LOADER (first visit via sessionStorage)
--------------------------------------------------------------------------- */
function initLoader() {
  const loader = document.getElementById('siteLoader');
  if (!loader) return;

  if (sessionStorage.getItem('mj-loader-shown')) {
    loader.classList.add('gone');
    return;
  }

  loaderActive = true;

  /* Suppress page-overlay: loader handles the reveal */
  const overlay = document.querySelector('.page-overlay');
  if (overlay) overlay.style.opacity = '0';

  setTimeout(() => loader.classList.add('logo-in'), 220);
  setTimeout(() => {
    loader.classList.add('lifting');
    document.body.classList.remove('is-locked');
  }, 1100);
  setTimeout(() => {
    loader.classList.add('gone');
    loaderActive = false;
    if (!document.querySelector('.hero')) {
      document.querySelector('.page-overlay')?.classList.add('gone');
    }
    sessionStorage.setItem('mj-loader-shown', '1');
  }, 2600);
}

/* ---------------------------------------------------------------------------
   1. RAF MAIN LOOP
   Handles: cursor ring lerp Â· parallax Â· massive text scaling
--------------------------------------------------------------------------- */
function startRAF() {
  if (prefersReduced) return;

  function loop() {
    updateCursorRing();
    updateParallax();
    updateMassiveText();
    updateManifesto();
    updateQuote();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
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
    const under = document.elementFromPoint(cursorX, cursorY);
    const onLight = !!under?.closest('.section-light');
    dot?.classList.toggle('on-light', onLight);
    ring?.classList.toggle('on-light', onLight);
  }, { passive: true });

  document.addEventListener('mouseover', e => {
    const isImg  = !!e.target.closest('img, .hero__portrait-frame, .presentation__img-wrap');
    const isLink = !!e.target.closest('a, button, label[for], .pillar, .c-card, .h-card, .domaine-row__trigger');
    dot?.classList.toggle('hov-img',  isImg);
    dot?.classList.toggle('hov-link', !isImg && isLink);
    ring?.classList.toggle('hov-img',  isImg);
    ring?.classList.toggle('hov-link', !isImg && isLink);
  }, { passive: true });

  window.addEventListener('mousedown', () => {
    if (dot) dot.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%)) scale(0.75)`;
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
   3. PARALLAX
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
    const rect   = el.parentElement?.getBoundingClientRect() || el.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - vh / 2;
    const offset = Math.max(-120, Math.min(120, center * speed));
    el.style.transform = `translate3d(0,${offset}px,0)`;
  });
}

/* ---------------------------------------------------------------------------
   4. MASSIVE TEXT (scroll-driven font-size)
   Hero is 200vh; inner sticky is 100vh.
   Progress 0â†’1 as user scrolls through the extra 100vh.
--------------------------------------------------------------------------- */
const massiveText    = document.getElementById('massiveText');
const heroSection    = document.querySelector('.hero');
const heroStickyEl   = document.querySelector('.hero__sticky');

const MASSIVE_START  = isMobile ? 16 : 22;  /* vw â€” initial */
const MASSIVE_END    = isMobile ? 34 : 55;  /* vw â€” fully scrolled */
const OPACITY_START  = isMobile ? 0.12 : 0.28;
const OPACITY_END    = isMobile ? 0.04 : 0.08;

function updateMassiveText() {
  if (!massiveText || !heroSection || prefersReduced) return;

  const rect     = heroSection.getBoundingClientRect();
  const stickyH  = window.innerHeight;          /* 100vh */
  const scrolled = -rect.top;                   /* px scrolled into hero */

  /* Progress 0 â†’ 1 over the second 100vh of the hero */
  const progress = Math.max(0, Math.min(1, (scrolled - stickyH * 0) / stickyH));

  const fz  = MASSIVE_START + (MASSIVE_END - MASSIVE_START) * easeInOutCubic(progress);
  const op  = OPACITY_START + (OPACITY_END - OPACITY_START) * progress;

  massiveText.style.fontSize = `${fz}vw`;
  massiveText.style.opacity  = op;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function updateManifesto() {
  const section = document.querySelector('.manifesto');
  const word    = document.querySelector('.manifesto__word');
  const lines   = document.querySelectorAll('.manifesto__line');

  if (!section || !word) return;

  if (prefersReduced || isMobile) {
    lines.forEach(line => line.classList.add('is-visible'));
    word.style.removeProperty('font-size');
    return;
  }

  const rect     = section.getBoundingClientRect();
  const total    = Math.max(1, section.offsetHeight - window.innerHeight);
  const progress = clamp01(-rect.top / total);

  const phase1   = clamp01(progress / 0.38);
  const startVw  = 43;
  const endVw    = 12;
  const current  = startVw - (startVw - endVw) * easeInOutCubic(phase1);

  word.style.fontSize = `${current}vw`;

  const phase2 = clamp01((progress - 0.32) / 0.45);
  lines.forEach((line, index) => {
    const threshold = 0.14 + index * 0.2;
    line.classList.toggle('is-visible', phase2 > threshold);
  });
}

function updateQuote() {
  const section = document.querySelector('.quote-section');
  const words   = section?.querySelectorAll('.quote__word');

  if (!section || !words?.length) return;

  if (prefersReduced || isMobile) {
    words.forEach(word => word.classList.add('is-visible'));
    return;
  }

  const rect     = section.getBoundingClientRect();
  const total    = Math.max(1, section.offsetHeight - window.innerHeight);
  const progress = clamp01(-rect.top / total);

  words.forEach((word, index) => {
    const threshold = (index / Math.max(1, words.length - 1)) * 0.72;
    word.classList.toggle('is-visible', progress > threshold);
  });
}

/* ---------------------------------------------------------------------------
   5. SPLIT TEXT
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
  document.querySelectorAll('.split-chars').forEach(el => {
    const mode = isMobile && el.classList.contains('hero__title') ? 'words' : 'chars';
    splitText(el, mode);
  });
  document.querySelectorAll('.split-words').forEach(el => splitText(el, 'words'));
}

/* ---------------------------------------------------------------------------
   6. INTERSECTION OBSERVER REVEALS
--------------------------------------------------------------------------- */
function initReveals() {
  const els = document.querySelectorAll(
    '.reveal-up, .reveal-fade, .reveal-scale, .reveal-mask, .reveal-stagger, .reveal-flow, ' +
    '.reveal-ornament, .split-chars, .split-words, .section-sep__line'
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

function initDomainTextFlow() {
  const blocks = document.querySelectorAll(
    '.domaine-page .domaine-section, ' +
    '.domaine-page .domaine-faq-section, ' +
    '.domaine-page .domaine-cta-block, ' +
    '.domaine-page .domaine-related-section'
  );
  if (!blocks.length) return;

  blocks.forEach((block, index) => {
    block.classList.remove('reveal-up');
    block.classList.add('reveal-flow');
    block.dataset.revealSide = index % 2 === 0 ? 'right' : 'left';
  });
}

function initMaskAssets() {
  document.querySelectorAll('.domaine-card[data-fill]').forEach(card => {
    card.style.setProperty('--bg-img', `url("${card.dataset.fill}")`);
  });

  document.querySelectorAll('.hub-card[data-fill]').forEach(card => {
    card.style.setProperty('--bg-img', `url("${card.dataset.fill}")`);
  });

  document.querySelectorAll('.quote__word[data-fill]').forEach(word => {
    word.style.setProperty('--fill', `url("${word.dataset.fill}")`);
  });
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  if (prefersReduced) {
    counters.forEach(counter => {
      counter.textContent = counter.dataset.counter || '0';
    });
    return;
  }

  const animateCounter = counter => {
    const end = parseInt(counter.dataset.counter || '0', 10);
    const duration = end >= 1000 ? 1400 : 950;
    const start = performance.now();

    function tick(now) {
      const progress = clamp01((now - start) / duration);
      const eased    = easeInOutCubic(progress);
      counter.textContent = Math.round(end * eased).toString();
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.55 });

  counters.forEach(counter => observer.observe(counter));
}

/* ---------------------------------------------------------------------------
   7. HERO CHOREOGRAPHY
--------------------------------------------------------------------------- */
function initHero() {
  if (!document.querySelector('.hero')) return;

  const overlay = document.querySelector('.page-overlay');
  document.body.classList.add('is-locked');

  function at(ms, fn) { setTimeout(fn, ms); }

  /* Only fade the overlay when no loader is running */
  if (!loaderActive) at(0, () => overlay?.classList.add('gone'));

  document.querySelectorAll('.hero-anim').forEach(el => {
    const delay = parseInt(el.dataset.delay || '0', 10);
    at(delay, () => el.classList.add('entered'));
  });

  /* Portrait mask reveal */
  const portrait = document.querySelector('.hero__portrait-frame[data-mask-hero]');
  at(1500, () => portrait?.classList.add('is-visible'));

  /* Canvas fade in */
  at(1900, () => document.querySelector('.hero__canvas')?.classList.add('ready'));

  /* Unlock scroll */
  at(1400, () => document.body.classList.remove('is-locked'));
}

/* ---------------------------------------------------------------------------
   8. CANVAS PARTICLES
--------------------------------------------------------------------------- */
function initParticles() {
  const canvas  = document.getElementById('heroCanvas');
  const section = document.querySelector('.hero__sticky');
  if (!canvas || !section || prefersReduced) return;

  const ctx   = canvas.getContext('2d');
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
    pts.push({ x: rand(0, W), y: rand(0, H), vx: rand(-0.14, 0.14), vy: rand(-0.14, 0.14), r: rand(0.8, 2), a: rand(0.05, 0.2) });
  }

  new IntersectionObserver(([e]) => { active = e.isIntersecting; }, { threshold: 0 }).observe(section);

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
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
  })();
}

/* ---------------------------------------------------------------------------
   9. NAV
--------------------------------------------------------------------------- */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const forceScrolled = document.body.classList.contains('page-interior');
  let lastY = 0, ticking = false;

  function update() {
    const sy = window.scrollY;
    nav.classList.toggle('scrolled', forceScrolled || sy > 80);

    if (sy > 800) {
      if (sy > lastY + 2) nav.classList.add('hidden');
      if (sy < lastY - 4) nav.classList.remove('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastY    = sy;
    ticking  = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  update();
}

/* ---------------------------------------------------------------------------
   10. MOBILE NAV
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
   11. DOMAINES (row expand/collapse)
--------------------------------------------------------------------------- */
function initDomaines() {
  document.querySelectorAll('.domaine-row__trigger').forEach(trigger => {
    const panelId = trigger.getAttribute('aria-controls');
    const panel   = document.getElementById(panelId);
    const row     = trigger.closest('.domaine-row');
    if (!panel || !row) return;

    /* Remove hidden attr â€” CSS handles collapse via max-height/opacity */
    panel.removeAttribute('hidden');

    trigger.addEventListener('click', () => {
      const isOpen = row.classList.contains('is-open');

      document.querySelectorAll('.domaine-row.is-open').forEach(openRow => {
        if (openRow !== row) closeDomaineRow(openRow);
      });

      isOpen ? closeDomaineRow(row) : openDomaineRow(row, panel, trigger);
    });
  });
}

function openDomaineRow(row, panel, trigger) {
  row.classList.add('is-open');
  trigger.setAttribute('aria-expanded', 'true');
  panel.classList.add('is-open');
}

function closeDomaineRow(row) {
  row.classList.remove('is-open');
  const trigger = row.querySelector('.domaine-row__trigger');
  const panelId = trigger?.getAttribute('aria-controls');
  const panel   = panelId ? document.getElementById(panelId) : null;
  trigger?.setAttribute('aria-expanded', 'false');
  panel?.classList.remove('is-open');
}

/* ---------------------------------------------------------------------------
   12. ACCORDIONS (FAQ)
--------------------------------------------------------------------------- */
function initAccordions() {
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    const panelId = trigger.getAttribute('aria-controls');
    const panel   = document.getElementById(panelId);
    const item    = trigger.closest('.accordion__item');
    if (!panel || !item) return;

    panel.style.maxHeight = '0';
    panel.setAttribute('hidden', '');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

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
   13. CARD GLOW (h-card)
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
   14. SMOOTH ANCHOR CLICKS
--------------------------------------------------------------------------- */
function scrollToAnchorTarget(target, behavior = 'smooth') {
  const navH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h-s') || '64', 10
  );
  const top = target.getBoundingClientRect().top + window.scrollY - navH;
  window.scrollTo({ top, behavior });
}

function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      scrollToAnchorTarget(target, 'smooth');
    });
  });
}

function redirectLegacySectionHash() {
  const redirects = {
    '#presentation': 'presentation.html',
    '#domaines': 'domaines.html',
    '#honoraires': 'honoraires.html',
    '#faq': 'faq.html',
    '#contact': 'contact.html'
  };

  if (!document.querySelector('.hero')) return false;

  const nextPage = redirects[window.location.hash];
  if (!nextPage) return false;

  window.location.replace(nextPage);
  return true;
}
function initInitialHash() {
  const hash = window.location.hash;
  if (!hash || hash === '#' || hash === '#accueil') return;

  function jumpToHash() {
    const target = document.querySelector(hash);
    if (!target) return;

    let tries = 0;
    let domainOpened = false;

    function jump() {
      scrollToAnchorTarget(target, 'auto');

      if (!domainOpened && target.classList.contains('domaine-row')) {
        target.querySelector('.domaine-row__trigger')?.click();
        domainOpened = true;
      }

      if (Math.abs(target.getBoundingClientRect().top) > 8 && tries < 5) {
        tries += 1;
        window.setTimeout(jump, 220);
      }
    }

    jump();
  }

  const delay = sessionStorage.getItem('mj-loader-shown') ? 220 : 3000;

  if (document.readyState === 'complete') {
    window.setTimeout(jumpToHash, delay);
    return;
  }

  window.addEventListener('load', () => {
    window.setTimeout(jumpToHash, delay);
  }, { once: true });
}

/* ---------------------------------------------------------------------------
   15. CONTACT FORM
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
      `T\u00E9l\u00E9phone : ${tel || '\u2014'}`,
      `Domaine : ${domaine}`,
      '',
      message
    ].join('%0A');

    window.location.href =
      `mailto:morganejoseph.avocat@gmail.com` +
      `?subject=${encodeURIComponent('Demande de rendez-vous \u2014 ' + nom)}` +
      `&body=${body}`;

    if (success) {
      success.removeAttribute('hidden');
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    form.reset();
  });
}

/* ---------------------------------------------------------------------------
   15b. NAV DROPDOWN
--------------------------------------------------------------------------- */
function initNavDropdown() {
  const triggers = document.querySelectorAll('.nav__dropdown-trigger');
  if (!triggers.length) return;

  const getPreviewSrc = href => {
    if (!href) return '';
    const assetPrefix = href.startsWith('../') ? '../assets/' : 'assets/';
    if (href.includes('droit-de-la-famille')) return `${assetPrefix}domaine-famille.webp`;
    if (href.includes('droit-civil')) return `${assetPrefix}domaine-civil.webp`;
    if (href.includes('contentieux-aah')) return `${assetPrefix}domaine-aah.webp`;
    return '';
  };

  function closeAll() {
    triggers.forEach(t => {
      t.setAttribute('aria-expanded', 'false');
      const p = t.nextElementSibling;
      if (p?.classList.contains('nav__dropdown')) p.setAttribute('hidden', '');
    });
  }

  triggers.forEach(trigger => {
    const panel = trigger.nextElementSibling;
    if (!panel?.classList.contains('nav__dropdown')) return;
    const items = [...panel.querySelectorAll('.nav__dropdown-item')];

    items.forEach(item => {
      const src = getPreviewSrc(item.getAttribute('href') || '');
      if (src) item.style.setProperty('--nav-item-preview', `url("${src}")`);
    });

    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      closeAll();
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.removeAttribute('hidden');
      }
    });

    trigger.addEventListener('keydown', e => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      e.preventDefault();

      const items = [...panel.querySelectorAll('.nav__dropdown-item, .nav__dropdown-footer')];
      if (!items.length) return;

      closeAll();
      trigger.setAttribute('aria-expanded', 'true');
      panel.removeAttribute('hidden');

      const target = e.key === 'ArrowUp' ? items[items.length - 1] : items[0];
      target.focus();
    });

    panel.addEventListener('keydown', e => {
      const focusables = [...panel.querySelectorAll('.nav__dropdown-item, .nav__dropdown-footer')];
      const idx   = focusables.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); (focusables[idx + 1] || focusables[0]).focus(); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); (focusables[idx - 1] || focusables[focusables.length - 1]).focus(); }
      if (e.key === 'Escape')    { closeAll(); trigger.focus(); }
    });

    /* Close dropdown items close the mobile menu too */
    panel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        const toggle = document.querySelector('.nav__toggle');
        const links  = document.querySelector('.nav__links');
        if (toggle && links) {
          toggle.setAttribute('aria-expanded', 'false');
          links.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav__item--dropdown')) closeAll();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });

  /* Mark current page in dropdown */
  const path = window.location.pathname;
  document.querySelectorAll('.nav__dropdown-item').forEach(item => {
    const href = item.getAttribute('href') || '';
    const norm = href.replace(/^\.\.\//, '/');
    if (path.endsWith(href) || path.includes(norm.replace(/^\//, ''))) {
      item.setAttribute('aria-current', 'page');
      item.closest('.nav__item--dropdown')
          ?.querySelector('.nav__dropdown-trigger')
          ?.setAttribute('data-active', 'true');
    }
  });
  if (path.includes('/domaines.html')) {
    document.querySelector('.nav__dropdown-trigger')?.setAttribute('data-active', 'true');
  }
}

/* ---------------------------------------------------------------------------
   16. BOOT
--------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  if (redirectLegacySectionHash()) return;
  initLoader();

  /* Sur les pages sans hero, effacer le page-overlay */
  if (!document.querySelector('.hero') && !loaderActive) {
    setTimeout(() => document.querySelector('.page-overlay')?.classList.add('gone'), 80);
  }

  initCursor();
  initSplitText();
  initDomainTextFlow();
  initReveals();
  initMaskAssets();
  initParallax();
  initNav();
  initMobileNav();
  initNavDropdown();
  initDomaines();
  initAccordions();
  initCardEffects();
  initCounters();
  initAnchors();
  initInitialHash();
  initForm();
  startRAF();

  setTimeout(initHero, 80);
  setTimeout(initParticles, 300);
});
