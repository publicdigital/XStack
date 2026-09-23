/*
  xstack DPI mock – v1
  Simulated identity, data exchange (with consent) and payments for single-file alpha prototypes.
  Implements the contract in references/dpi-baseline.md. Inline this whole file in a <script> tag.

  Nothing here talks to a real platform. Every citizen is made up. Every screen says it is simulated.

  Usage:
    const dpi = xstackDpi.create({
      serviceName: 'Renew your vehicle licence',
      locale: 'en-US',                    // optional – formats amounts on the payment screen
      platforms: {
        identity: { name: 'National ID' },
        exchange: { name: 'Government data exchange' },
        payments: { name: 'Government payments', currency: 'USD' }
      },
      attributes: {                       // the slice of the data catalogue this service uses
        address: { label: 'Home address', source: 'Civil Registry' },
        vehicle: { label: 'Vehicle', source: 'Licensing Authority' }
      },
      personas: [ … ]                     // optional – see DEFAULT_PERSONAS for the shape
    });

    const who = await dpi.identity.signIn({ purpose: 'renew your vehicle licence' });
    //  { status: 'signed_in' | 'cancelled' | 'failed', subject, claims, level }
    const got = await dpi.data.fetch({ subject: who.subject, attributes: ['address', 'vehicle'], purpose: '…' });
    //  { status: 'ok' | 'not_found' | 'refused', consentId, values: { address: { value, source, asOf } }, missing: [] }
    const paid = await dpi.payments.create({ amount: 120, reference: 'VL-4821', description: 'Vehicle licence, 12 months' });
    //  { status: 'paid' | 'declined' | 'cancelled', receipt }
*/
(function (global) {
  'use strict';

  // Placeholder personas, one per research scenario. Replace them with locally realistic
  // people in the profile's data formats. Keep every value obviously fake.
  var DEFAULT_PERSONAS = [
    { id: 'found', label: 'Everything found and correct',
      claims: { fullName: 'Test Citizen A', dateOfBirth: '1984-03-12', nationalId: 'MOCK-000-0001' },
      data: { address: '[Mock] 1 Example Street, Central District' } },
    { id: 'stale', label: 'Address is out of date (has moved)',
      claims: { fullName: 'Test Citizen B', dateOfBirth: '1991-11-02', nationalId: 'MOCK-000-0002' },
      data: { address: '[Mock] 22 Old Road, North District' }, note: 'Now lives somewhere else. Should correct the address.' },
    { id: 'no-record', label: 'No record in the registers',
      claims: { fullName: 'Test Citizen C', dateOfBirth: '2001-06-30', nationalId: 'MOCK-000-0003' },
      data: {} },
    { id: 'declined', label: 'Payment is declined',
      claims: { fullName: 'Test Citizen D', dateOfBirth: '1976-01-19', nationalId: 'MOCK-000-0004' },
      data: { address: '[Mock] 5 Sample Lane, South District' }, payment: 'declined' },
    { id: 'no-sign-in', label: 'Can\'t be verified',
      claims: {}, data: {}, signIn: 'failed' }
  ];

  var CSS = [
    '.xsdpi{position:fixed;inset:0;z-index:1000;background:#F4F4F6;color:#1B1B1F;overflow-y:auto;font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans",Arial,sans-serif;line-height:1.5}',
    '.xsdpi__sim{background:#4A148C;color:#FFF;padding:8px 16px;font-size:14px;font-weight:600}',
    '.xsdpi__bar{background:#FFF;border-bottom:1px solid #C8C8D0;padding:14px 16px;font-weight:700;font-size:18px}',
    '.xsdpi__body{max-width:560px;margin:24px auto;padding:0 16px}',
    '.xsdpi h2{font-size:26px;line-height:1.25;margin:0 0 16px}',
    '.xsdpi p,.xsdpi li,.xsdpi label,.xsdpi dd,.xsdpi dt{font-size:18px}',
    '.xsdpi p{margin:0 0 16px}',
    '.xsdpi ul{margin:0 0 16px 20px}',
    '.xsdpi fieldset{border:0;padding:0;margin:0 0 20px}',
    '.xsdpi legend{font-weight:700;font-size:18px;margin-bottom:8px}',
    '.xsdpi__opt{display:flex;gap:10px;align-items:flex-start;padding:10px;border:2px solid #C8C8D0;background:#FFF;margin-bottom:8px;cursor:pointer}',
    '.xsdpi__opt input{width:22px;height:22px;margin-top:3px;flex:none}',
    '.xsdpi__opt small{display:block;color:#55555F;font-size:15px}',
    '.xsdpi__card{background:#FFF;border:1px solid #C8C8D0;padding:16px;margin-bottom:20px}',
    '.xsdpi dl{display:grid;grid-template-columns:auto 1fr;gap:4px 16px;margin:0}',
    '.xsdpi dt{font-weight:700}.xsdpi dd{margin:0}',
    '.xsdpi__actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-top:8px}',
    '.xsdpi__btn{background:#4A148C;color:#FFF;border:0;padding:12px 20px;font:inherit;font-size:18px;font-weight:700;cursor:pointer}',
    '.xsdpi__btn--secondary{background:#FFF;color:#4A148C;border:2px solid #4A148C;padding:10px 18px}',
    '.xsdpi__link{background:none;border:0;color:#4A148C;text-decoration:underline;font:inherit;font-size:18px;cursor:pointer;padding:0}',
    '.xsdpi :focus{outline:3px solid #FFDD00;outline-offset:0;box-shadow:inset 0 0 0 2px #1B1B1F}',
    '.xsdpi__error{border-left:5px solid #D4351C;padding-left:12px}',
    '.xsdpi__wait{font-size:20px;padding:32px 0}'
  ].join('\n');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function id(prefix) { return prefix + '-' + Math.random().toString(36).slice(2, 8).toUpperCase(); }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function today() { return new Date().toISOString().slice(0, 10); }
  function money(amount, currency, locale) {
    try { return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(amount); }
    catch (e) { return currency + ' ' + Number(amount).toFixed(2); }
  }

  function create(config) {
    config = config || {};
    var platforms = config.platforms || {};
    var identityName = (platforms.identity && platforms.identity.name) || 'National identity platform';
    var exchangeName = (platforms.exchange && platforms.exchange.name) || 'Government data exchange';
    var paymentsName = (platforms.payments && platforms.payments.name) || 'Government payments';
    var currency = (platforms.payments && platforms.payments.currency) || 'USD';
    var serviceName = config.serviceName || 'This service';
    var attributes = config.attributes || {};
    var personas = config.personas || DEFAULT_PERSONAS;
    var locale = config.locale;               // e.g. 'en-BB', so amounts match the service's own formatting
    var latency = config.latencyMs == null ? 900 : config.latencyMs;
    var current = null;

    if (!document.getElementById('xsdpi-style')) {
      var style = document.createElement('style');
      style.id = 'xsdpi-style';
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    // One simulated platform screen at a time, as a modal dialog over the service.
    function screen(platformName, html, bind) {
      return new Promise(function (resolve) {
        var opener = document.activeElement;
        var siblings = Array.prototype.filter.call(document.body.children, function (el) { return !el.hasAttribute('inert'); });
        siblings.forEach(function (el) { el.setAttribute('inert', ''); });
        var root = document.createElement('div');
        root.className = 'xsdpi';
        root.setAttribute('role', 'dialog');
        root.setAttribute('aria-modal', 'true');
        root.setAttribute('aria-labelledby', 'xsdpi-title');
        root.innerHTML =
          '<div class="xsdpi__sim">Simulated ' + esc(platformName) + ' – part of an xstack prototype. No real data is used.</div>' +
          '<div class="xsdpi__bar">' + esc(platformName) + '</div>' +
          '<div class="xsdpi__body">' + html + '</div>';
        document.body.appendChild(root);
        function done(result) {
          root.remove();
          siblings.forEach(function (el) { el.removeAttribute('inert'); });
          if (opener && opener.focus) opener.focus();
          resolve(result);
        }
        root.addEventListener('keydown', function (e) { if (e.key === 'Escape') done({ status: 'cancelled' }); });
        focusTitle(root);
        bind(root, done);
      });
    }

    // Keep the 'Simulated' strip in view: focus the heading without scrolling past it.
    function focusTitle(root) {
      var title = root.querySelector('#xsdpi-title');
      if (title) { title.setAttribute('tabindex', '-1'); title.focus({ preventScroll: true }); }
      root.scrollTop = 0;
    }

    function replace(root, html) {
      root.querySelector('.xsdpi__body').innerHTML = html;
      focusTitle(root);
    }

    function signIn(opts) {
      opts = opts || {};
      var options = personas.map(function (p, i) {
        return '<label class="xsdpi__opt"><input type="radio" name="xsdpi-persona" value="' + i + '"' + (i === 0 ? ' checked' : '') + '>' +
          '<span>' + esc(p.claims.fullName || 'Unknown person') + '<small>' + esc(p.label) + (p.note ? ' – ' + esc(p.note) : '') + '</small></span></label>';
      }).join('');
      var html =
        '<h2 id="xsdpi-title">Sign in to continue</h2>' +
        '<p>' + esc(serviceName) + ' uses ' + esc(identityName) + ' to check who you are' + (opts.purpose ? ', so you can ' + esc(opts.purpose) : '') + '.</p>' +
        '<fieldset><legend>Test person (for the researcher to choose)</legend>' + options + '</fieldset>' +
        '<div class="xsdpi__actions"><button class="xsdpi__btn" data-go>Continue</button>' +
        '<button class="xsdpi__link" data-cancel>Go back to the service</button></div>';
      return screen(identityName, html, function (root, done) {
        root.querySelector('[data-cancel]').onclick = function () { done({ status: 'cancelled' }); };
        root.querySelector('[data-go]').onclick = function () {
          var picked = personas[Number(root.querySelector('input[name="xsdpi-persona"]:checked').value)];
          replace(root, '<p class="xsdpi__wait" id="xsdpi-title" role="status">Checking your identity…</p>');
          wait(latency).then(function () {
            if (picked.signIn === 'failed') {
              replace(root,
                '<div class="xsdpi__error"><h2 id="xsdpi-title">We could not confirm who you are</h2>' +
                '<p>You can go back to the service and continue another way.</p></div>' +
                '<button class="xsdpi__btn" data-back>Go back to the service</button>');
              root.querySelector('[data-back]').onclick = function () { done({ status: 'failed' }); };
              return;
            }
            current = picked;
            done({ status: 'signed_in', subject: 'sub-' + picked.id, claims: Object.assign({}, picked.claims), level: 'substantial', persona: picked.id });
          });
        };
      });
    }

    function fetchData(opts) {
      opts = opts || {};
      var wanted = opts.attributes || [];
      var bySource = {};
      wanted.forEach(function (key) {
        var a = attributes[key] || { label: key, source: exchangeName };
        (bySource[a.source] = bySource[a.source] || []).push(a.label);
      });
      var list = Object.keys(bySource).map(function (src) {
        return '<li><strong>' + esc(src) + ':</strong> ' + esc(bySource[src].join(', ')) + '</li>';
      }).join('');
      var html =
        '<h2 id="xsdpi-title">Can we get your details from government records?</h2>' +
        '<p>' + esc(serviceName) + ' wants to get:</p><ul>' + list + '</ul>' +
        (opts.purpose ? '<p>This is so we can ' + esc(opts.purpose) + '.</p>' : '') +
        '<p>You will be able to check them and change anything that is wrong. If you say no, you can type them in yourself.</p>' +
        '<div class="xsdpi__actions"><button class="xsdpi__btn" data-yes>Yes, get my details</button>' +
        '<button class="xsdpi__btn xsdpi__btn--secondary" data-no>No, I will type them in</button></div>';
      return screen(exchangeName, html, function (root, done) {
        root.querySelector('[data-no]').onclick = function () { done({ status: 'refused', values: {}, missing: wanted.slice() }); };
        root.querySelector('[data-yes]').onclick = function () {
          var consent = { id: id('CONSENT'), purpose: opts.purpose || '', attributes: wanted.slice(), sources: Object.keys(bySource), grantedAt: new Date().toISOString() };
          api.consents.push(consent);
          replace(root, '<p class="xsdpi__wait" id="xsdpi-title" role="status">Getting your details…</p>');
          wait(latency).then(function () {
            var data = (current && current.data) || {};
            var values = {}, missing = [];
            wanted.forEach(function (key) {
              if (data[key] == null) { missing.push(key); return; }
              var a = attributes[key] || { source: exchangeName };
              values[key] = { value: data[key], source: a.source, asOf: today() };
            });
            done({ status: Object.keys(values).length ? 'ok' : 'not_found', consentId: consent.id, values: values, missing: missing });
          });
        };
      });
    }

    function pay(opts) {
      opts = opts || {};
      var cur = opts.currency || currency;
      var amount = money(opts.amount || 0, cur, locale);
      var html =
        '<h2 id="xsdpi-title">Pay ' + esc(amount) + '</h2>' +
        '<div class="xsdpi__card"><dl>' +
        '<dt>To</dt><dd>' + esc(serviceName) + '</dd>' +
        '<dt>For</dt><dd>' + esc(opts.description || '') + '</dd>' +
        '<dt>Reference</dt><dd>' + esc(opts.reference || '') + '</dd></dl></div>' +
        '<p>This is a simulated payment page. Nothing will be charged.</p>' +
        '<div class="xsdpi__actions"><button class="xsdpi__btn" data-pay>Pay ' + esc(amount) + '</button>' +
        '<button class="xsdpi__link" data-cancel>Cancel payment</button></div>';
      return screen(paymentsName, html, function (root, done) {
        root.querySelector('[data-cancel]').onclick = function () { done({ status: 'cancelled' }); };
        root.querySelector('[data-pay]').onclick = function () {
          replace(root, '<p class="xsdpi__wait" id="xsdpi-title" role="status">Processing your payment…</p>');
          wait(latency).then(function () {
            if (current && current.payment === 'declined') {
              replace(root,
                '<div class="xsdpi__error"><h2 id="xsdpi-title">Your payment was declined</h2>' +
                '<p>You have not been charged. Go back to the service to try again or pay another way.</p></div>' +
                '<button class="xsdpi__btn" data-back>Go back to the service</button>');
              root.querySelector('[data-back]').onclick = function () { done({ status: 'declined' }); };
              return;
            }
            done({ status: 'paid', receipt: {
              transactionId: id('TXN'), reference: opts.reference || '', amount: opts.amount || 0,
              currency: cur, formatted: amount, paidAt: new Date().toISOString() } });
          });
        };
      });
    }

    var api = {
      mode: 'mock',
      identity: { signIn: signIn },
      data: { fetch: fetchData },
      payments: { create: pay },
      consents: [],
      persona: function () { return current; },
      reset: function () { current = null; api.consents.length = 0; }
    };
    return api;
  }

  global.xstackDpi = { create: create, DEFAULT_PERSONAS: DEFAULT_PERSONAS };
})(window);
