/*
  xstack Kestrin switcher – v1
  Switches a single-file Kestria prototype between English and Kestrian (kestrin), the invented
  language in profiles/kestria/kestrian.md. Kestrian is fictional: nobody speaks it, and nothing
  here stands in for translation by real speakers in a real service.

  Usage: inline it in a script tag after the page's own scripts, with the strings defined first,
  in their own script tag: window.KESTRIN_STRINGS = { "Continue": "Edro", … };

  How it works
  - Translates text nodes whose (whitespace-normalised) English is a key in KESTRIN_STRINGS.
    Keys containing <x> match any value in that position (for text the page builds at runtime).
  - Watches the page, so text the prototype or the DPI mock writes later is translated too.
  - Switching back restores the English it replaced. English that is missing from the strings
    stays in English: call xstackKestrin.missing() to list it.
  - Never translates the xstack banner, the assumptions panel, .fake-data, or [data-no-kestrin].
  - Takes over the header language links: a "Kestrian"/"Kestrin" link switches to Kestrian and
    an "English" link (if there is one) switches back. With no English link, the one link toggles.
  - Start in Kestrian by opening the prototype with #kestrin on the end of its address.
*/
(function (global) {
  'use strict';

  var LANG_TAG = 'art-x-kestrin';            // ISO 639 "art" (artificial language) + private use
  var SKIP = '.xstack-banner, .xstack-assumptions, .fake-data, script, style, noscript, [data-no-kestrin]';
  var ATTRS = ['aria-label', 'title', 'placeholder', 'alt'];

  var dict = global.KESTRIN_STRINGS || {};
  var exact = Object.create(null);
  var patterns = [];
  Object.keys(dict).forEach(function (en) {
    var k = norm(en);
    if (k.indexOf('<x>') === -1) { exact[k] = dict[en]; return; }
    var parts = k.split('<x>').map(function (p) { return p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); });
    patterns.push({ re: new RegExp('^' + parts.join('(.+?)') + '$'), out: dict[en] });
  });

  var lang = 'en';
  var written = new WeakMap();                 // text node -> { en, ks } we wrote
  var attrWritten = new WeakMap();             // element -> { attr: { en, ks } }
  var observer = null;

  function norm(s) { return String(s).replace(/\s+/g, ' ').trim(); }

  // level stops patterns nesting too deep: "Error: <x>" can translate its <x>, but not forever.
  function lookup(text, level) {
    level = level || 0;
    var k = norm(text);
    if (!k) return null;
    var tries = [k, k.replace(/'/g, '’'), k.replace(/’/g, "'")];
    for (var i = 0; i < tries.length; i++) if (exact[tries[i]] != null) return exact[tries[i]];
    if (level > 2) return null;
    for (var t = 0; t < tries.length; t++) {
      for (var j = 0; j < patterns.length; j++) {
        var m = patterns[j].re.exec(tries[t]);
        if (!m) continue;
        // Each value slotted into a pattern is translated too, when the strings have it.
        var n = 1;
        return patterns[j].out.replace(/<x>/g, function () {
          var v = m[n++], tv = lookup(v, level + 1);
          return tv == null ? v : tv;
        });
      }
    }
    // A list the page joined with commas ("Your household, Support you get"): translate it part
    // by part, but only if every part has Kestrian – half a list in each language reads worse.
    if (k.indexOf(', ') > -1) {
      var parts = k.split(', ').map(function (p) { return lookup(p, level + 1); });
      if (parts.every(function (p) { return p != null; })) return parts.join(', ');
    }
    return null;
  }

  function skipped(node) {
    var el = node.nodeType === 1 ? node : node.parentElement;
    return !el || !!el.closest(SKIP);
  }

  function translateText(node) {
    if (skipped(node)) return;
    var cur = node.nodeValue;
    var w = written.get(node);
    if (w && w.ks === cur) return;             // already ours
    var ks = lookup(cur);
    if (ks == null) return;
    var lead = cur.match(/^\s*/)[0], trail = cur.match(/\s*$/)[0];
    var out = lead + ks + trail;
    written.set(node, { en: cur, ks: out });
    node.nodeValue = out;
  }

  function translateAttrs(el) {
    if (skipped(el)) return;
    ATTRS.forEach(function (a) {
      if (!el.hasAttribute(a)) return;
      var cur = el.getAttribute(a), store = attrWritten.get(el) || {};
      if (store[a] && store[a].ks === cur) return;
      var ks = lookup(cur);
      if (ks == null) return;
      store[a] = { en: cur, ks: ks };
      attrWritten.set(el, store);
      el.setAttribute(a, ks);
    });
  }

  function each(root, fn) {
    if (root.nodeType === 3) { fn(root); return; }
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var n; while ((n = walker.nextNode())) fn(n);
  }

  function translateTree(root) {
    each(root, translateText);
    if (root.nodeType === 1) {
      translateAttrs(root);
      Array.prototype.forEach.call(root.querySelectorAll('[' + ATTRS.join('],[') + ']'), translateAttrs);
    }
  }

  function restoreTree(root) {
    each(root, function (node) {
      var w = written.get(node);
      if (w && node.nodeValue === w.ks) node.nodeValue = w.en;
      written.delete(node);
    });
    Array.prototype.forEach.call(root.querySelectorAll('[' + ATTRS.join('],[') + ']'), function (el) {
      var store = attrWritten.get(el); if (!store) return;
      Object.keys(store).forEach(function (a) { if (el.getAttribute(a) === store[a].ks) el.setAttribute(a, store[a].en); });
      attrWritten.delete(el);
    });
  }

  // Page titles are "Page – Service – GovKestria": translate each part on its own.
  var titleEn = null;
  function translateTitle() {
    var cur = document.title;
    if (titleEn && cur === titleEn.ks) return;
    var ks = cur.split(' – ').map(function (part) { var t = lookup(part); return t == null ? part : t; }).join(' – ');
    titleEn = { en: cur, ks: ks };
    document.title = ks;
  }

  function quietly(fn) {
    if (observer) observer.disconnect();
    fn();
    if (observer && lang === 'ks') watch();
  }

  function watch() {
    observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    observer.observe(document.querySelector('title') || document.head, { subtree: true, childList: true, characterData: true });
  }

  observer = new MutationObserver(function (records) {
    if (lang !== 'ks') return;
    quietly(function () {
      records.forEach(function (r) {
        if (r.type === 'characterData') {
          if (r.target.parentNode && r.target.parentNode.nodeName === 'TITLE') translateTitle();
          else translateText(r.target);
        } else if (r.type === 'attributes') translateAttrs(r.target);
        else {
          if (r.target.nodeName === 'TITLE') { translateTitle(); return; }
          Array.prototype.forEach.call(r.addedNodes, function (n) { if (n.nodeType === 1 || n.nodeType === 3) translateTree(n); });
        }
      });
    });
  });

  // ---- The header switcher ----
  var links = Array.prototype.slice.call(document.querySelectorAll('.kg-header__lang'));
  var ksLink = links.filter(function (a) { return /^kestri(an|n)$/i.test(a.textContent.trim()); })[0];
  var enLink = links.filter(function (a) { return /^english$/i.test(a.textContent.trim()); })[0];

  function clearLangNotice() {
    var n = document.getElementById('lang-notice');
    if (!n) return;
    if (n.matches('.lang-notice')) n.textContent = ''; else n.hidden = true;
  }

  function paintSwitcher() {
    if (!ksLink) return;
    if (enLink) {
      ksLink.textContent = 'Kestrin';
      ksLink.setAttribute('lang', LANG_TAG);
      enLink.setAttribute('lang', 'en');
      links.forEach(function (a) { a.removeAttribute('aria-current'); });
      (lang === 'ks' ? ksLink : enLink).setAttribute('aria-current', 'true');
    } else {
      // One link: it names the other language, in that language (DESIGN.md, ServiceHeader).
      ksLink.textContent = lang === 'ks' ? 'English' : 'Kestrin';
      ksLink.setAttribute('lang', lang === 'ks' ? 'en' : LANG_TAG);
    }
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    quietly(function () {
      if (lang === 'ks') { translateTree(document.body); translateTitle(); }
      else {
        restoreTree(document.body);
        if (titleEn && document.title === titleEn.ks) document.title = titleEn.en;
        titleEn = null;
      }
      document.documentElement.setAttribute('lang', lang === 'ks' ? LANG_TAG : 'en');
      paintSwitcher();
      clearLangNotice();
    });
    // Take people to the top of what changed, so the new language is read from the start.
    var h1 = Array.prototype.filter.call(document.querySelectorAll('main h1'), function (h) { return h.offsetParent !== null; })[0];
    if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus(); }
  }

  function take(link, to) {
    if (!link) return;
    link.removeAttribute('onclick');
    link.setAttribute('data-no-kestrin', '');
    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      setLang(to === 'toggle' ? (lang === 'ks' ? 'en' : 'ks') : to);
    }, true);
  }

  if (ksLink) {
    take(ksLink, enLink ? 'ks' : 'toggle');
    take(enLink, 'en');
    paintSwitcher();
  }

  global.xstackKestrin = {
    setLang: setLang,
    lang: function () { return lang; },
    // English text on the page right now that has no Kestrian yet (visible, outside xstack tooling).
    missing: function () {
      var out = [];
      each(document.body, function (n) {
        var t = norm(n.nodeValue);
        if (!t || !/[A-Za-z]{2}/.test(t) || skipped(n) || !n.parentElement || n.parentElement.offsetParent === null) return;
        if (lang === 'ks' && written.has(n)) return;
        if (lang === 'en' && lookup(t) != null) return;
        out.push(t);
      });
      return out;
    },
    count: function () { return Object.keys(exact).length + patterns.length; }
  };

  if (/(^|#)kestrin$/.test(global.location.hash)) setLang('ks');
})(window);
