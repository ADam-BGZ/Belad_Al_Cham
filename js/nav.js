/* nav.js — Sticky nav & scroll-to-anchor + IntersectionObserver */
(function () {
  'use strict';

  window.Nav = {
    init() {
      const pills = document.querySelectorAll('.nav-pills button[data-target]');
      pills.forEach(btn => {
        btn.addEventListener('click', () => {
          this._scrollPillIntoView(btn);
          const target = document.getElementById(btn.dataset.target);
          if (target) {
            const offset = document.querySelector('.nav-pills').offsetHeight + 8;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
          }
        });
      });

      this.observe();
    },

    _scrollPillIntoView(pill) {
      var container = document.querySelector('.nav-pills');
      if (!container || !pill) return;
      var pillLeft = pill.offsetLeft;
      var pillWidth = pill.offsetWidth;
      var containerWidth = container.clientWidth;
      var target = pillLeft - (containerWidth / 2) + (pillWidth / 2);
      container.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    },

    observe() {
      const sections = document.querySelectorAll('.category-section');
      const pills = document.querySelectorAll('.nav-pills button[data-target]');
      if (!sections.length || !pills.length) return;

      const self = this;
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.category;
            let activePill = null;
            pills.forEach(btn => {
              const isActive = btn.dataset.target === `cat-${id}`;
              btn.classList.toggle('active', isActive);
              if (isActive) activePill = btn;
            });
            if (activePill) self._scrollPillIntoView(activePill);
          }
        });
      }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });

      sections.forEach(s => observer.observe(s));
    }
  };

  /* search.js — Fuzzy search + autocomplete */
  window.Search = {
    _dropdown: null,
    _activeIndex: -1,
    _suggestions: [],
    _input: null,
    _allItems: [],

    init() {
      this._input = document.querySelector('.search-input');
      if (!this._input) return;
      this._buildDropdown();
      this._cacheItems();
      this._input.addEventListener('input', () => this._onInput());
      this._input.addEventListener('keydown', (e) => this._onKeydown(e));
      document.addEventListener('click', (e) => {
        if (!this._dropdown.contains(e.target) && e.target !== this._input) {
          this._hide();
        }
      });
      this._input.addEventListener('focus', () => {
        if (this._input.value.trim()) this._onInput();
      });
    },

    _cacheItems() {
      this._allItems = [];
      document.querySelectorAll('.item-entry').forEach(el => {
        var entry = el.closest('.item-entry');
        if (!entry) return;
        var section = entry.closest('.category-section');
        var catId = section ? section.dataset.category : '';
        var catName = '';
        if (section) {
          var h2 = section.querySelector('.category-title');
          catName = h2 ? h2.textContent : '';
        }
        var nameEl = entry.querySelector('.item-name');
        var name = nameEl ? nameEl.textContent : (entry.dataset.search || '').split(' ')[0];
        var priceEl = entry.querySelector('.item-price');
        var price = priceEl ? priceEl.textContent.trim() : '';
        this._allItems.push({
          el: entry,
          name: name,
          catId: catId,
          catName: catName,
          price: price,
          searchText: (entry.dataset.search || '').toLowerCase()
        });
      });
    },

    /* ---- Levenshtein distance ---- */
    _levenshtein(a, b) {
      if (a.length === 0) return b.length;
      if (b.length === 0) return a.length;
      var matrix = [];
      for (var i = 0; i <= b.length; i++) matrix[i] = [i];
      for (var j = 0; j <= a.length; j++) matrix[0][j] = j;
      for (var i = 1; i <= b.length; i++) {
        for (var j = 1; j <= a.length; j++) {
          var cost = b.charAt(i - 1) === a.charAt(j - 1) ? 0 : 1;
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + cost
          );
        }
      }
      return matrix[b.length][a.length];
    },

    /* ---- Score a candidate against query ---- */
    _score(query, candidateText) {
      var q = query.toLowerCase();
      var t = candidateText.toLowerCase();

      /* Exact substring → highest score */
      var idx = t.indexOf(q);
      if (idx !== -1) return 1000 - idx;

      /* Prefix match on any word */
      var words = t.split(/\s+/);
      for (var i = 0; i < words.length; i++) {
        if (words[i].indexOf(q) === 0) return 900 - i;
      }

      /* Levenshtein: accept if distance ≤ 2 for short queries, ≤ 3 for longer */
      var maxDist = q.length <= 3 ? 1 : q.length <= 6 ? 2 : 3;
      var best = Infinity;

      /* Check query against full text and each word */
      var fullDist = this._levenshtein(q, t);
      if (fullDist < best) best = fullDist;

      for (var i = 0; i < words.length; i++) {
        var d = this._levenshtein(q, words[i]);
        if (d < best) best = d;
      }

      if (best <= maxDist) return 800 - best * 10;

      /* Partial prefix containment: each query char in order */
      var ti = 0;
      var matched = 0;
      for (var qi = 0; qi < q.length && ti < t.length; ti++) {
        if (t.charAt(ti) === q.charAt(qi)) { matched++; qi++; }
      }
      if (matched === q.length) return 600;

      return -1; /* no match */
    },

    /* ---- Build suggestions list ---- */
    _findSuggestions(query) {
      if (!query || query.length < 1) return [];
      var scored = [];
      for (var i = 0; i < this._allItems.length; i++) {
        var item = this._allItems[i];
        var s = this._score(query, item.name + ' ' + item.catName);
        if (s >= 0) scored.push({ item: item, score: s });
      }
      scored.sort(function (a, b) { return b.score - a.score; });
      return scored.slice(0, 8).map(function (s) { return s.item; });
    },

    /* ---- Highlight matched portion ---- */
    _highlight(query, text) {
      if (!query) return text;
      var q = query.toLowerCase();
      var lower = text.toLowerCase();
      var idx = lower.indexOf(q);
      if (idx !== -1) {
        return text.substring(0, idx) + '<mark>' + text.substring(idx, idx + query.length) + '</mark>' + text.substring(idx + query.length);
      }
      return text;
    },

    /* ---- Create dropdown element ---- */
    _buildDropdown() {
      this._dropdown = document.createElement('div');
      this._dropdown.className = 'search-dropdown';
      this._dropdown.setAttribute('role', 'listbox');
      this._dropdown.style.display = 'none';
      this._input.parentNode.appendChild(this._dropdown);
    },

    /* ---- Show dropdown ---- */
    _show(suggestions, query) {
      this._suggestions = suggestions;
      this._activeIndex = -1;
      if (!suggestions.length) {
        this._dropdown.innerHTML = '<div class="search-dropdown-empty">Aucun résultat</div>';
        this._dropdown.style.display = 'block';
        return;
      }
      var html = '';
      for (var i = 0; i < suggestions.length; i++) {
        var s = suggestions[i];
        html += '<div class="search-dropdown-item" role="option" data-index="' + i + '" data-item-id="' + s.el.closest('.item-entry').id + '">' +
          '<span class="search-dropdown-name">' + this._highlight(query, s.name) + '</span>' +
          '<span class="search-dropdown-cat">' + s.catName + '</span>' +
          '<span class="search-dropdown-price">' + s.price + '</span>' +
        '</div>';
      }
      this._dropdown.innerHTML = html;
      this._dropdown.style.display = 'block';

      /* Click handlers */
      var self = this;
      this._dropdown.querySelectorAll('.search-dropdown-item').forEach(function (el) {
        el.addEventListener('click', function () {
          var idx = parseInt(el.dataset.index, 10);
          self._selectItem(idx);
        });
      });
    },

    _hide() {
      this._dropdown.style.display = 'none';
      this._activeIndex = -1;
      this._suggestions = [];
    },

    _selectItem(index) {
      if (index < 0 || index >= this._suggestions.length) return;
      var item = this._suggestions[index];
      this._hide();
      this._input.value = '';
      this.filter('');
      /* Scroll to item */
      var offset = document.querySelector('.nav-pills').offsetHeight + 16;
      var section = item.el.closest('.category-section');
      if (section) {
        window.scrollTo({ top: section.offsetTop - offset, behavior: 'smooth' });
      }
      /* Flash the item */
      item.el.style.transition = 'background 0.3s';
      item.el.style.background = 'rgba(200,155,60,0.12)';
      setTimeout(function () { item.el.style.background = ''; }, 1500);
    },

    _onInput() {
      var query = this._input.value.trim();
      if (!query) {
        this._hide();
        this.filter('');
        return;
      }
      this._suggestions = this._findSuggestions(query);
      this._show(this._suggestions, query);
      this.filter(query.toLowerCase());
    },

    _onKeydown(e) {
      if (this._dropdown.style.display === 'none' && e.key !== 'Escape') return;
      var items = this._dropdown.querySelectorAll('.search-dropdown-item');
      if (!items.length && e.key !== 'Escape') return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this._activeIndex = Math.min(this._activeIndex + 1, items.length - 1);
        this._highlightActive(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this._activeIndex = Math.max(this._activeIndex - 1, 0);
        this._highlightActive(items);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (this._activeIndex >= 0) {
          this._selectItem(this._activeIndex);
        } else if (this._suggestions.length) {
          this._selectItem(0);
        }
      } else if (e.key === 'Escape') {
        this._hide();
        this._input.blur();
      }
    },

    _highlightActive(items) {
      items.forEach(function (el, i) {
        el.classList.toggle('active', i === this._activeIndex);
      }.bind(this));
      if (this._activeIndex >= 0 && items[this._activeIndex]) {
        items[this._activeIndex].scrollIntoView({ block: 'nearest' });
      }
    },

    filter(query) {
      var entries = document.querySelectorAll('.item-entry');
      var sections = document.querySelectorAll('.category-section');
      if (!query) {
        entries.forEach(function (c) { c.style.display = ''; });
        sections.forEach(function (s) { s.style.display = ''; });
        return;
      }
      entries.forEach(function (c) {
        var text = (c.dataset.search || '').toLowerCase();
        /* Use fuzzy scoring for filtering too */
        var score = Search._score(query, text);
        c.style.display = score >= 0 ? '' : 'none';
      });
      sections.forEach(function (s) {
        var visible = s.querySelectorAll('.item-entry:not([style*="display: none"])');
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
