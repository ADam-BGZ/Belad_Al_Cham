/* render.js — Physical menu page rendering */
(function () {
  'use strict';

  function loadIcon(iconClass) {
    return '<i class="fa-solid ' + iconClass + '"></i>';
  }

  function itemHTML(item, lang) {
    var name = item.name[lang] || item.name.fr || '';
    var desc = item.description[lang] || item.description.fr || '';
    var badge = '';
    if (item.badge === 'topVentes') {
      var label = lang === 'ar' ? 'الأكثر مبيعاً' : lang === 'es' ? 'Más vendido' : 'Top des ventes';
      badge = '<span class="badge">' + label + '</span>';
    }
    var unit = lang === 'ar' ? ' د.م' : ' Dh';

    var thumb = '';
    if (item.image) {
      thumb = '<div class="item-thumb"><img src="' + item.image + '" alt="' + name + '" loading="lazy" width="56" height="56"></div>';
    }

    return '' +
      '<div class="item-entry" data-search="' + name + ' ' + desc + '">' +
        thumb +
        '<div class="item-text">' +
          badge +
          '<div class="item-top">' +
            '<span class="item-name">' + name + '</span>' +
            '<span class="item-dots"></span>' +
            '<span class="item-price">' + item.price + '<span class="item-price-unit">' + unit + '</span></span>' +
          '</div>' +
          '<p class="item-desc">' + desc + '</p>' +
        '</div>' +
      '</div>';
  }

  function categoryHTML(cat, lang) {
    var name = cat.name[lang] || cat.name.fr || '';
    var icon = loadIcon(cat.icon);
    var items = cat.items.map(function (it) { return itemHTML(it, lang); }).join('');

    return '' +
      '<section class="category-section" id="cat-' + cat.id + '" data-category="' + cat.id + '">' +
        '<div class="category-header">' +
          '<div class="category-medallion">' + icon + '</div>' +
          '<h2 class="category-title">' + name + '</h2>' +
          '<hr class="category-rule">' +
        '</div>' +
        '<div class="items-list">' + items + '</div>' +
      '</section>';
  }

  function pillsHTML(categories, lang) {
    return categories.map(function (cat) {
      var name = cat.name[lang] || cat.name.fr || '';
      return '<button data-target="cat-' + cat.id + '">' + name + '</button>';
    }).join('');
  }

  window.Render = {
    all: function (data, lang) {
      if (!data || !data.categories) return;
      var container = document.getElementById('menu-content');
      container.innerHTML = data.categories.map(function (cat) {
        return categoryHTML(cat, lang);
      }).join('');

      var pills = document.getElementById('nav-pills-inner');
      if (pills) pills.innerHTML = pillsHTML(data.categories, lang);
    }
  };
})();
