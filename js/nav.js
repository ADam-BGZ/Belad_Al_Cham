/* nav.js — Sticky nav & scroll-to-anchor + IntersectionObserver */
(function () {
  'use strict';

  window.Nav = {
    init() {
      const pills = document.querySelectorAll('.nav-pills button[data-target]');
      pills.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = document.getElementById(btn.dataset.target);
          if (target) {
            const offset = document.querySelector('.nav-pills').offsetHeight + 8;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
          }
        });
      });

      this.observe();
    },

    observe() {
      const sections = document.querySelectorAll('.category-section');
      const pills = document.querySelectorAll('.nav-pills button[data-target]');
      if (!sections.length || !pills.length) return;

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.category;
            pills.forEach(btn => {
              btn.classList.toggle('active', btn.dataset.target === `cat-${id}`);
            });
          }
        });
      }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });

      sections.forEach(s => observer.observe(s));
    }
  };

  /* search.js */
  window.Search = {
    init() {
      const input = document.querySelector('.search-input');
      if (!input) return;
      input.addEventListener('input', () => this.filter(input.value.trim().toLowerCase()));
    },

    filter(query) {
      const cards = document.querySelectorAll('.item-card');
      const sections = document.querySelectorAll('.category-section');
      if (!query) {
        cards.forEach(c => c.style.display = '');
        sections.forEach(s => s.style.display = '');
        return;
      }
      cards.forEach(c => {
        const text = (c.dataset.search || '').toLowerCase();
        c.style.display = text.includes(query) ? '' : 'none';
      });
      sections.forEach(s => {
        const visible = s.querySelectorAll('.item-card:not([style*="display: none"])');
        s.style.display = visible.length ? '' : 'none';
      });
    }
  };

  /* back-to-top */
  window.BackToTop = {
    init() {
      const btn = document.querySelector('.back-to-top');
      if (!btn) return;
      window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
      }, { passive: true });
      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };
})();
