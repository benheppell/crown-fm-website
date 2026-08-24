/* ============================================================
   CROWN FM — Main JavaScript
   FAQ accordion, mobile nav toggle, scroll-reveal observer,
   and subtle parallax on the hero video + about-section image.
   Loaded as a plain <script> from BaseLayout.astro.
   ============================================================ */

// FAQ Accordion — only one item open at a time. Keeps aria-expanded
// in sync on every question button so screen readers announce state.
function toggleFaq(el) {
  const item = el.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq__item').forEach(i => {
    i.classList.remove('open');
    const btn = i.querySelector('.faq__q');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen) {
    item.classList.add('open');
    el.setAttribute('aria-expanded', 'true');
  }
}

// Mobile Nav Toggle — flips the .open class on the main <ul> and keeps
// aria-expanded on the trigger button synchronised.
function toggleNav(el) {
  const nav = document.getElementById('mainNav');
  const isOpen = nav.classList.toggle('open');
  const trigger = el || document.querySelector('.mobile-toggle');
  if (trigger) trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// Respect the user's reduced-motion preference. If they've opted out
// of motion at the OS level, skip every scroll-driven effect below.
const prefersReducedMotion =
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll Reveal — adds .visible to .reveal elements as they enter viewport.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  setHeroVideoSource();

  if (prefersReducedMotion) return;
  initParallax();
});

/* ============================================================
   HERO VIDEO — swap to a mobile-specific clip on small viewports.
   The <video> in markup has data-desktop and data-mobile pointing
   at the two MP4 files. We pick the right one once on load (and
   again on a debounced resize) and call .load() / .play() to
   re-trigger playback after the src change.
   ============================================================ */
function setHeroVideoSource() {
  const video = document.getElementById('heroVideo');
  if (!video) return;

  const desktopSrc = video.dataset.desktop;
  const mobileSrc  = video.dataset.mobile;
  if (!desktopSrc || !mobileSrc) return;

  function apply() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const desired  = isMobile ? mobileSrc : desktopSrc;
    const source   = video.querySelector('source');
    if (!source) return;

    // Compare against the resolved URL so it doesn't loop on every resize.
    const current = source.getAttribute('src') || '';
    if (current === desired) return;

    source.setAttribute('src', desired);
    video.load();
    // Some browsers pause after a src change; nudge it back to playing.
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => { /* autoplay blocked — fine, will play on interaction */ });
    }
  }

  apply();

  // Re-evaluate on viewport breakpoint crossings (debounced).
  let t;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(apply, 200);
  }, { passive: true });
}

/* ============================================================
   PARALLAX — subtle Y-axis drift on the hero video and the
   about-section construction photo as the user scrolls. Uses
   requestAnimationFrame so it stays buttery on 60fps devices,
   and falls back to nothing when reduced-motion is requested.
   ============================================================ */
function initParallax() {
  const targets = [
    {
      el: document.querySelector('.hero__video video'),
      strength: 0.25, // 25% of scroll distance
      bounds: document.querySelector('.hero'),
    },
    {
      el: document.querySelector('.about__image img'),
      strength: 0.12, // gentle
      bounds: document.querySelector('.about'),
    },
  ].filter(t => t.el && t.bounds);

  if (targets.length === 0) return;

  // Avoid layout jank — let the browser compose these as their own layer.
  targets.forEach(t => {
    t.el.style.willChange = 'transform';
    t.el.style.transition = 'transform 0s';
  });

  let ticking = false;
  function update() {
    const viewportH = window.innerHeight;
    targets.forEach(t => {
      const rect = t.bounds.getBoundingClientRect();
      // Only animate while the section is in or near the viewport.
      if (rect.bottom < -200 || rect.top > viewportH + 200) return;
      // -1 (above viewport) ... 0 (centered) ... 1 (below viewport)
      const progress = (rect.top + rect.height / 2 - viewportH / 2) / viewportH;
      const shift = -progress * t.strength * 100; // px
      t.el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    });
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}
