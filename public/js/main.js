/* ============================================================
   CROWN FM — Main JavaScript
   FAQ accordion, mobile nav toggle, and scroll-reveal observer.
   Loaded as a plain <script> from BaseLayout.astro.
   ============================================================ */

// FAQ Accordion — only one item open at a time.
function toggleFaq(el) {
  const item = el.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

// Mobile Nav Toggle — flips the .open class on the main <ul>.
function toggleNav() {
  document.getElementById('mainNav').classList.toggle('open');
}

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
});
