/* app.js — Init & data loading */
(function () {
  'use strict';

  window.App = {
    menuData: null,
    currentLang: 'fr',

    async init() {
      this.currentLang = I18n.init();
      try {
        const res = await fetch('data/menu.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        this.menuData = await res.json();
        Render.all(this.menuData, this.currentLang);
        I18n.apply(this.currentLang);
        Search.init();
        Nav.init();
        BackToTop.init();
      } catch (err) {
        console.error('Failed to load menu:', err);
        document.getElementById('menu-content').innerHTML =
          '<p style="text-align:center;padding:2rem;color:#7A2E22;">Erreur de chargement du menu.</p>';
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => App.init());
})();
