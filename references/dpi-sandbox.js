/*
  xstack DPI sandbox client – v1
  The same contract as references/dpi-mock.js, but sign-in is real: it goes through a platform
  sandbox via the xstack adapter (sandbox/adapter/), which runs OpenID Connect against eSignet.
  This is the 'sandbox' mode in references/dpi-baseline.md.

  To switch a prototype from mock to sandbox, replace the inlined dpi-mock.js with this whole
  file. Nothing else on the page changes: xstackDpi.create(…) takes the same config, and
  signIn / data.fetch / payments.create return the same statuses and shapes.

  The page must be served by the adapter (http://localhost:4400/…), not opened as a file:
  eSignet can only send people back to an http(s) address. See sandbox/README.md.

  What's real and what isn't
    identity.signIn   real: eSignet's own sign-in and consent screens, in a separate window,
                      against MOSIP's mock identity system. Claims come from eSignet's signed
                      userinfo, checked by the adapter.
    data.fetch        the adapter's mock registers, built from KESTRIA_PERSONAS in
                      profiles/kestria/dpi.md (there's no X-Road locally). Only for the
                      signed-in person, or the person they act for.
    payments.create   still the in-browser mock, exactly as dpi-mock.js does it.
  config.personas is ignored: the people are the ones seeded into eSignet.

  Extra config (optional):
    sandbox: { adapterUrl: '',                                 // default: the page's own origin
               acr: 'mosip:idp:acr:generated-code' }           // eSignet acr_values to ask for
*/
(function (global) {
  'use strict';

  var CSS = [
    '.xsdpi{position:fixed;inset:0;z-index:1000;background:#F4F4F6;color:#1B1B1F;overflow-y:auto;font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans",Arial,sans-serif;line-height:1.5}',
    '.xsdpi__sim{background:#4A148C;color:#FFF;padding:8px 16px;font-size:14px;font-weight:600}',
    '.xsdpi__sim--sandbox{background:#0B4F6C}',
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
    '.xsdpi__wait{font-size:20px;padding:32px 0}',
    '.xsdpi__hint{background:#FFF;border-left:5px solid #0B4F6C;padding:12px 16px;margin:0 0 20px}',
    '.xsdpi__hint p{font-size:16px;margin:0 0 4px}',
    '.xsdpi code{font-size:16px;background:#EEE;padding:1px 4px}'
  ].join('\n');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function id(prefix) { return prefix + '-' + Math.random().toString(36).slice(2, 8).toUpperCase(); }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function today() { return new Date().toISOString().slice(0, 10); }
  function longDate(iso, locale) {
    try { return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso + 'T00:00:00Z')); }
    catch (e) { return iso; }
  }
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
    var locale = config.locale;
    var latency = config.latencyMs == null ? 900 : config.latencyMs;
    var sandbox = config.sandbox || {};
    var adapter = (sandbox.adapterUrl || (location.protocol === 'file:' ? 'http://localhost:4400' : location.origin)).replace(/\/$/, '');
    var acr = sandbox.acr || 'mosip:idp:acr:generated-code';
    var current = null;                       // { id, claims } – the person the service is about
    var actor = null;                         // { id, claims } – the person acting for them, if not the subject
    var subjectId = null;                     // the subject the adapter knows the session by

    if (!document.getElementById('xsdpi-style')) {
      var style = document.createElement('style');
      style.id = 'xsdpi-style';
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    function call(path, body) {
      return fetch(adapter + path, {
        method: body ? 'POST' : 'GET', credentials: 'include',
        headers: body ? { 'Content-Type': 'application/json' } : {},
        body: body ? JSON.stringify(body) : undefined
      }).then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (json) { return { status: res.status, json: json }; });
      });
    }

    // One platform screen at a time, as a modal dialog over the service. The strip says which
    // parts are real and which are still simulated.
    function screen(platformName, html, bind, real) {
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
          (real
            ? '<div class="xsdpi__sim xsdpi__sim--sandbox">Sandbox ' + esc(platformName) + ' – real eSignet on this computer, with made-up people. Part of an xstack prototype.</div>'
            : '<div class="xsdpi__sim">Simulated ' + esc(platformName) + ' – part of an xstack prototype. No real data is used.</div>') +
          '<div class="xsdpi__bar">' + esc(platformName) + '</div>' +
          '<div class="xsdpi__body">' + html + '</div>';
        document.body.appendChild(root);
        var finished = false, cleanup = null;
        function done(result) {
          if (finished) return;
          finished = true;
          if (cleanup) cleanup();
          root.remove();
          siblings.forEach(function (el) { el.removeAttribute('inert'); });
          if (opener && opener.focus) opener.focus();
          resolve(result);
        }
        root.addEventListener('keydown', function (e) { if (e.key === 'Escape') done({ status: 'cancelled' }); });
        focusTitle(root);
        cleanup = bind(root, done) || null;   // bind can return a function to run when the screen closes
      });
    }

    function focusTitle(root) {
      var title = root.querySelector('#xsdpi-title');
      if (title) { title.setAttribute('tabindex', '-1'); title.focus({ preventScroll: true }); }
      root.scrollTop = 0;
    }

    function replace(root, html) {
      root.querySelector('.xsdpi__body').innerHTML = html;
      focusTitle(root);
    }

    // ── Identity ─────────────────────────────────────────────────────────────────────────────
    // eSignet runs in its own window, so the prototype keeps its place. The adapter tells this
    // page when the person is back, over a BroadcastChannel and postMessage, with polling as
    // a fallback.

    function signIn(opts) {
      opts = opts || {};
      if (location.protocol === 'file:') return notServed();
      var tx = id('TX') + Math.random().toString(36).slice(2, 10);
      var loginUrl = adapter + '/sandbox/login?tx=' + encodeURIComponent(tx) +
        '&acr=' + encodeURIComponent(acr) + '&acting_for=' + (opts.actingFor ? '1' : '0') +
        '&locale=' + encodeURIComponent((document.documentElement.lang || 'en').slice(0, 2));
      // Open the window now, while the click that called signIn() still counts as the person's.
      var popup = openWindow(loginUrl);

      var html =
        '<h2 id="xsdpi-title">Sign in with ' + esc(identityName) + '</h2>' +
        '<p>' + esc(serviceName) + ' uses ' + esc(identityName) + ' to check who you are' + (opts.purpose ? ', so you can ' + esc(opts.purpose) : '') + '.</p>' +
        '<p data-state>' + (popup ? 'A ' + esc(identityName) + ' window has opened. Sign in there to continue.' : 'Your browser stopped the ' + esc(identityName) + ' window from opening.') + '</p>' +
        '<div class="xsdpi__hint"><p><strong>For the researcher:</strong> type a test person\'s KUIN without spaces, for example <code>9900817347</code> for Ines Kestel. The one-time code is always <code>111111</code>.</p></div>' +
        '<div class="xsdpi__actions"><button class="xsdpi__btn" data-open>' + (popup ? 'Show the ' + esc(identityName) + ' window' : 'Open ' + esc(identityName)) + '</button>' +
        '<button class="xsdpi__link" data-cancel>Go back to the service</button></div>' +
        // eSignet keeps someone who can't get a code on its own screen and never reports back.
        // This is how they tell the service, and it's what 'failed' means here.
        '<p style="margin-top:24px"><button class="xsdpi__link" data-cant>I can\'t sign in with ' + esc(identityName) + '</button></p>';

      return screen(identityName, html, function (root, done) {
        var settled = false;
        var channel = null;
        var timer = null;
        function stop() {
          settled = true;
          clearInterval(timer);
          if (channel) channel.close();
          window.removeEventListener('message', onMessage);
        }
        function finish(result) { done(result); }
        function collect() {
          if (settled) return;
          call('/sandbox/result?tx=' + encodeURIComponent(tx)).then(function (r) {
            if (settled || r.status === 202) return;
            stop();
            handle(root, r.json, opts, done);
          }).catch(function () { /* adapter not reachable yet – keep waiting */ });
        }
        function onMessage(e) { if (e.origin === adapter && e.data && e.data.type === 'xstack-sandbox' && e.data.tx === tx) collect(); }
        window.addEventListener('message', onMessage);
        try { channel = new BroadcastChannel('xstack-sandbox'); channel.onmessage = function (e) { if (e.data && e.data.tx === tx) collect(); }; } catch (e) { /* older browser: polling covers it */ }
        var closedChecks = 0;
        timer = setInterval(function () {
          collect();
          // Closing the KestriaID window without finishing counts as going back to the service.
          if (popup && popup.closed && ++closedChecks > 2 && !settled) {
            call('/sandbox/result?tx=' + encodeURIComponent(tx)).then(function (r) {
              if (settled) return;
              if (r.status === 202) finish({ status: 'cancelled' }); else { stop(); handle(root, r.json, opts, done); }
            });
          }
        }, 1500);
        root.querySelector('[data-cancel]').onclick = function () { finish({ status: 'cancelled' }); };
        root.querySelector('[data-cant]').onclick = function () { stop(); if (popup && !popup.closed) popup.close(); failed(root, done); };
        root.querySelector('[data-open]').onclick = function () {
          if (popup && !popup.closed) { popup.focus(); return; }
          popup = openWindow(loginUrl);
          closedChecks = 0;
          if (popup) root.querySelector('[data-state]').textContent = 'A ' + identityName + ' window has opened. Sign in there to continue.';
        };
        return function () { stop(); if (popup && !popup.closed) popup.close(); };
      }, true);
    }

    function openWindow(url) {
      var w = 520, h = 760;
      var left = Math.max(0, (window.screenX || 0) + ((window.outerWidth || w) - w) / 2);
      var top = Math.max(0, (window.screenY || 0) + 40);
      try { return window.open(url, 'xstack-kestriaid', 'popup,width=' + w + ',height=' + h + ',left=' + left + ',top=' + top); }
      catch (e) { return null; }
    }

    function handle(root, r, opts, done) {
      if (r.status === 'cancelled') return done({ status: 'cancelled' });
      if (r.status === 'choose_for') return whoFor(root, r, done);
      if (r.status !== 'signed_in') return failed(root, done);
      done(adopt(r));
    }

    function adopt(r) {
      subjectId = r.subject;
      current = { id: r.persona, claims: Object.assign({}, r.claims), payment: r.payment || null };
      actor = r.actor ? { id: r.actor.persona, subject: r.actor.subject, claims: Object.assign({}, r.actor.claims), payment: r.actor.payment || null } : null;
      return { status: 'signed_in', subject: r.subject, claims: Object.assign({}, r.claims), level: r.level, persona: r.persona, actor: r.actor || null };
    }

    function failed(root, done) {
      replace(root,
        '<div class="xsdpi__error"><h2 id="xsdpi-title">We could not confirm who you are</h2>' +
        '<p>You can go back to the service and continue another way.</p></div>' +
        '<button class="xsdpi__btn" data-back>Go back to the service</button>');
      root.querySelector('[data-back]').onclick = function () { done({ status: 'failed' }); };
    }

    // Acting for someone: eSignet has no step for this, so after the person signs in as
    // themselves, they choose here from the intermediary records the adapter holds for them.
    function whoFor(root, r, done) {
      var now = today();
      var options = r.options.map(function (o, i) {
        var a = o.authority || {};
        var ended = a.validUntil && a.validUntil < now;
        return '<label class="xsdpi__opt"><input type="radio" name="xsdpi-for" value="' + i + '"' + (ended ? ' disabled' : '') + '>' +
          '<span>' + esc(o.name || 'Unknown person') + (o.relationship ? ' (your ' + esc(o.relationship) + ')' : '') +
          '<small>' + (ended
            ? 'Your authority to act for them ended on ' + esc(longDate(a.validUntil, locale)) + '. You need to renew it before you can act for them.'
            : esc(a.type || 'Authority') + (a.canDo && a.canDo.length ? '. You can: ' + esc(a.canDo.join(', ')) : '') + (a.validUntil ? '. Until ' + esc(longDate(a.validUntil, locale)) : '') + '.') +
          '</small></span></label>';
      }).join('');
      replace(root,
        '<h2 id="xsdpi-title">Who are you using ' + esc(serviceName) + ' for?</h2>' +
        '<p>You are signed in as ' + esc(r.self.claims.fullName || 'yourself') + '.</p>' +
        '<fieldset><legend>Choose one</legend>' +
        '<label class="xsdpi__opt"><input type="radio" name="xsdpi-for" value="self" checked><span>Myself</span></label>' +
        options + '</fieldset>' +
        '<div class="xsdpi__actions"><button class="xsdpi__btn" data-for>Continue</button>' +
        '<button class="xsdpi__link" data-cancel>Go back to the service</button></div>');
      root.querySelector('[data-cancel]').onclick = function () { call('/sandbox/sign-out', {}); done({ status: 'cancelled' }); };
      root.querySelector('[data-for]').onclick = function () {
        var choice = root.querySelector('input[name="xsdpi-for"]:checked').value;
        call('/sandbox/act-for', { choice: choice }).then(function (res) {
          if (res.status !== 200) return failed(root, done);
          done(adopt(res.json));
        }, function () { failed(root, done); });
      };
    }

    function notServed() {
      var html =
        '<div class="xsdpi__error"><h2 id="xsdpi-title">Open this prototype through the sandbox</h2>' +
        '<p>Sandbox sign-in needs the page to come from the xstack adapter, not from a file.</p>' +
        '<p>Start it with <code>node sandbox/adapter/server.mjs</code>, then open this page from <code>http://localhost:4400</code>.</p></div>' +
        '<button class="xsdpi__btn" data-back>Go back to the service</button>';
      return screen(identityName, html, function (root, done) {
        root.querySelector('[data-back]').onclick = function () { done({ status: 'failed' }); };
      }, true);
    }

    // ── Data exchange ────────────────────────────────────────────────────────────────────────
    // The consent screen is this page's, as in the mock: locally there's no consent registry.
    // The facts come from the adapter, which only answers for the signed-in subject.

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
      var forName = actor && current ? current.claims.fullName : null;
      var html =
        (forName
          ? '<h2 id="xsdpi-title">Can we get ' + esc(forName) + '’s details from government records?</h2>' +
            '<p>You are acting for ' + esc(forName) + '. ' + esc(serviceName) + ' wants to get their:</p><ul>' + list + '</ul>'
          : '<h2 id="xsdpi-title">Can we get your details from government records?</h2>' +
            '<p>' + esc(serviceName) + ' wants to get:</p><ul>' + list + '</ul>') +
        (opts.purpose ? '<p>This is so we can ' + esc(opts.purpose) + '.</p>' : '') +
        '<p>You will be able to check them and change anything that is wrong. If you say no, you can type them in yourself.</p>' +
        '<div class="xsdpi__actions"><button class="xsdpi__btn" data-yes>' + (forName ? 'Yes, get their details' : 'Yes, get my details') + '</button>' +
        '<button class="xsdpi__btn xsdpi__btn--secondary" data-no>No, I will type them in</button></div>';
      return screen(exchangeName, html, function (root, done) {
        root.querySelector('[data-no]').onclick = function () { done({ status: 'refused', values: {}, missing: wanted.slice() }); };
        root.querySelector('[data-yes]').onclick = function () {
          replace(root, '<p class="xsdpi__wait" id="xsdpi-title" role="status">Getting your details…</p>');
          call('/sandbox/data', { subject: opts.subject || subjectId, attributes: wanted, purpose: opts.purpose || '' }).then(function (res) {
            if (res.status !== 200) {
              // The adapter has no session for this person (it restarted, or they signed out).
              replace(root,
                '<div class="xsdpi__error"><h2 id="xsdpi-title">We could not get your details</h2>' +
                '<p>Your sign-in has ended. You can go back to the service and type them in yourself.</p></div>' +
                '<button class="xsdpi__btn" data-back>Go back to the service</button>');
              root.querySelector('[data-back]').onclick = function () { done({ status: 'refused', values: {}, missing: wanted.slice(), error: 'session_ended' }); };
              return;
            }
            var got = res.json;
            api.consents.push({ id: got.consentId, purpose: opts.purpose || '', attributes: wanted.slice(), sources: Object.keys(bySource),
              grantedAt: new Date().toISOString(), subject: subjectId, grantedBy: actor ? actor.subject : null });
            var values = {};
            Object.keys(got.values || {}).forEach(function (key) {
              var a = attributes[key] || { source: exchangeName };
              values[key] = { value: got.values[key], source: a.source, asOf: got.asOf || today() };
            });
            done({ status: got.status, consentId: got.consentId, values: values, missing: got.missing || [] });
          }, function () {
            done({ status: 'refused', values: {}, missing: wanted.slice(), error: 'adapter_unreachable' });
          });
        };
      }, true);
    }

    // ── Payments: still the mock ─────────────────────────────────────────────────────────────

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
            var payer = actor || current;             // whoever is acting pays
            if (payer && payer.payment === 'declined') {
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
      mode: 'sandbox',
      identity: { signIn: signIn },
      data: { fetch: fetchData },
      payments: { create: pay },
      consents: [],
      persona: function () { return current; },
      actor: function () { return actor; },
      reset: function () {
        current = null; actor = null; subjectId = null; api.consents.length = 0;
        if (location.protocol !== 'file:') call('/sandbox/sign-out', {}).catch(function () {});
      }
    };
    return api;
  }

  global.xstackDpi = { create: create, DEFAULT_PERSONAS: [] };
})(window);
