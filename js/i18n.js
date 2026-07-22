/* i18n.js — Language switching & RTL */
(function () {
  'use strict';

  const STORAGE_KEY = 'bac-lang';
  const SUPPORTED = ['fr', 'ar', 'es'];
  const RTL_LANGS = ['ar'];

  function detectLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
    const nav = navigator.language || navigator.userLanguage || '';
    const code = nav.slice(0, 2).toLowerCase();
    return SUPPORTED.includes(code) ? code : 'fr';
  }

  window.I18n = {
    init() {
      const lang = detectLang();
      this.setButtons(lang);
      document.querySelectorAll('.lang-selector button').forEach(btn => {
        btn.addEventListener('click', () => this.switch(btn.dataset.lang));
      });
      return lang;
    },

    switch(lang) {
      if (!SUPPORTED.includes(lang)) return;
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
      this.setButtons(lang);
      App.currentLang = lang;
      Render.all(App.menuData, lang);
      Nav.init();
      Search.init();
    },

    apply(lang) {
      document.documentElement.lang = lang;
      document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
    },

    setButtons(lang) {
      document.querySelectorAll('.lang-selector button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
        btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
      });
    },

    t(obj) {
      if (!obj) return '';
      return obj[App.currentLang] || obj.fr || '';
    },

    isRTL() {
      return RTL_LANGS.includes(App.currentLang);
    }
  };
})();
