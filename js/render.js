/* render.js — Dynamic menu rendering */
(function () {
  'use strict';

  function loadIcon(iconClass) {
    return `<i class="fa-solid ${iconClass} category-icon"></i>`;
  }

  function itemHTML(item, lang) {
    const name = item.name[lang] || item.name.fr || '';
    const desc = item.description[lang] || item.description.fr || '';
    const badge = item.badge === 'topVentes' ? `<span class="badge">${lang === 'ar' ? 'الأكثر مبيعاً' : lang === 'es' ? 'Más vendido' : 'Top des ventes'}</span>` : '';
    const priceUnit = lang === 'ar' ? ' د.م' : ' Dh';

    return `
      <div class="item-card" data-search="${name} ${desc}">
        ${badge}
        <div class="item-top">
          <div class="item-name-price">
            <span class="item-name">${name}</span>
            <span class="item-dots"></span>
          </div>
          <span class="item-price">${item.price}<span class="item-price-unit">${priceUnit}</span></span>
        </div>
        <p class="item-desc">${desc}</p>
      </div>`;
  }

  function categoryHTML(cat, lang) {
    const name = cat.name[lang] || cat.name.fr || '';
    const icon = loadIcon(cat.icon);
    const items = cat.items.map(it => itemHTML(it, lang)).join('');

    return `
      <section class="category-section" id="cat-${cat.id}" data-category="${cat.id}">
        <div class="category-header">
          <div class="category-medallion">${icon}</div>
          <h2 class="category-title">${name}</h2>
        </div>
        <div class="category-filet"></div>
        <div class="items-list">${items}</div>
      </section>`;
  }

  function pillsHTML(categories, lang) {
    return categories.map(cat => {
      const name = cat.name[lang] || cat.name.fr || '';
      return `<button data-target="cat-${cat.id}">${name}</button>`;
    }).join('');
  }

  window.Render = {
    all(data, lang) {
      if (!data || !data.categories) return;
      const container = document.getElementById('menu-content');
      container.innerHTML = data.categories.map(cat => categoryHTML(cat, lang)).join('');

      const pills = document.getElementById('nav-pills-inner');
      if (pills) pills.innerHTML = pillsHTML(data.categories, lang);
    }
  };
})();
