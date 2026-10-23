#!/usr/bin/env node
// End-to-end check of the sandbox: a Household Support Grant prototype signing in through the
// real eSignet screens, and every status the contract promises. Needs eSignet and the adapter
// running (see sandbox/README.md) and Google Chrome, or set PW_CHANNEL=chromium after
// `npx playwright install chromium`.
//
//   cd sandbox && npm install && npm test          HEADED=1 npm test to watch it
import { chromium } from 'playwright';
import { config } from '../lib/config.mjs';

const BASE = config.adapterUrl;
const PROTOTYPE = BASE + '/examples/build-household-support-grant/prototype-1-once-only/sandbox/';
const HARNESS = BASE + '/sandbox/test/harness.html';
const OTP = '111111';

let failures = 0;
async function check(name, fn) {
  const t = Date.now();
  try { await fn(); console.log(`  ok    ${name} (${((Date.now() - t) / 1000).toFixed(1)}s)`); }
  catch (e) { failures++; console.log(`  FAIL  ${name}\n        ${String(e.message).split('\n')[0]}`); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg); }

// The eSignet screens, as a person uses them: KUIN, Get OTP, the six code boxes, Verify,
// then Allow or Deny on the consent screen.
async function esignet(popup, kuin, { consent = 'Allow' } = {}) {
  await popup.waitForURL(/\/signin/, { timeout: 20000 });
  await popup.getByPlaceholder(/UIN/i).fill(kuin);
  await popup.getByText('Get OTP', { exact: true }).click();
  const boxes = popup.locator('input[maxlength="1"]');
  await boxes.first().waitFor({ timeout: 15000 });
  for (let i = 0; i < 6; i++) await boxes.nth(i).fill(OTP[i]);
  await popup.getByText('Verify', { exact: true }).click();
  await popup.getByText(consent, { exact: true }).click({ timeout: 15000 });   // needs prompt=consent (the default)
}

async function startPrototype(context) {
  const page = await context.newPage();
  await page.goto(PROTOTYPE);
  await page.check('#haveid-yes', { force: true });   // the design system hides the native radio
  const [popup] = await Promise.all([page.waitForEvent('popup'), page.click('#f-start button[type=submit]')]);
  return { page, popup };
}
const activePage = (page) => page.evaluate(() => document.querySelector('.page--active').id);
async function waitForPage(page, id) {
  await page.waitForFunction((want) => document.querySelector('.page--active')?.id === want, id, { timeout: 20000 })
    .catch(async () => { throw new Error(`expected ${id}, on ${await activePage(page)}`); });
}

async function main() {
  const health = await fetch(BASE + '/').then((r) => r.text()).catch(() => '');
  if (!/running, issuer/.test(health)) {
    console.error(`The adapter (${BASE}) or eSignet isn't running. Start them first – see sandbox/README.md.`);
    process.exit(2);
  }
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'chrome', headless: !process.env.HEADED });
  const fresh = () => browser.newContext();
  console.log('Household Support Grant prototype, sandbox mode:');

  await check('Ines Kestel signs in on the eSignet screens and her household comes back', async () => {
    const { page, popup } = await startPrototype(await fresh());
    await esignet(popup, '9900817347');
    await waitForPage(page, 'page-notice');
    const s = await page.evaluate(() => ({ name: state.fullName, subject: state.subject, persona: state.persona, phone: state.claimsPhone }));
    assert(s.name === 'Ines Kestel', 'name was ' + s.name);
    assert(s.subject && !/9900/.test(s.subject), 'subject should be the pairwise sub, not the KUIN: ' + s.subject);
    assert(s.persona === 'ines', 'persona was ' + s.persona);
    await page.click('#page-notice button.kg-button');
    await page.getByText('Yes, get my details').click();
    await waitForPage(page, 'page-confirm-you');
    const got = await page.evaluate(() => ({ hh: state.household && state.household.number, assessment: state.assessment, payout: state.payout && state.payout.last4 }));
    assert(got.hh === 'HH-LK-0118302', 'household was ' + got.hh);
    assert(got.assessment === 'likely', 'assessment was ' + got.assessment);
    assert(got.payout === '7782', 'payout last4 was ' + got.payout);
  });

  await check('Deny on the eSignet consent screen → cancelled', async () => {
    const { page, popup } = await startPrototype(await fresh());
    await esignet(popup, '9900817347', { consent: 'Deny' });
    await waitForPage(page, 'page-cancelled');
  });

  await check('Closing the KestriaID window → cancelled', async () => {
    const { page, popup } = await startPrototype(await fresh());
    await popup.waitForURL(/\/signin/, { timeout: 20000 });
    await popup.close();
    await waitForPage(page, 'page-cancelled');
  });

  await check('"Go back to the service" while the window is open → cancelled', async () => {
    const { page } = await startPrototype(await fresh());
    await page.locator('.xsdpi').getByRole('button', { name: 'Go back to the service' }).click();
    await waitForPage(page, 'page-cancelled');
  });

  await check('Aru Danvell can\'t get a code, says so → failed', async () => {
    const { page, popup } = await startPrototype(await fresh());
    await popup.waitForURL(/\/signin/, { timeout: 20000 });
    await popup.getByPlaceholder(/UIN/i).fill('9900644181');
    await popup.getByText('Get OTP', { exact: true }).click();
    await popup.getByText(/Send OTP failed/i).waitFor({ timeout: 10000 });
    await page.locator('.xsdpi').getByRole('button', { name: /I can.t sign in with KestriaID/ }).click();
    assert(popup.isClosed(), 'the KestriaID window should close');
    await page.locator('.xsdpi').getByRole('button', { name: 'Go back to the service' }).click();
    await waitForPage(page, 'page-failed');
  });

  console.log('Adapter:');

  await check('An error back from eSignet → failed', async () => {
    const res = await fetch(BASE + '/sandbox/login?tx=TEST-ERR', { redirect: 'manual' });
    const state = new URL(res.headers.get('location')).searchParams.get('state');
    await fetch(BASE + '/sandbox/callback?error=server_error&state=' + state);
    const r = await fetch(BASE + '/sandbox/result?tx=TEST-ERR').then((x) => x.json());
    assert(r.status === 'failed', 'status was ' + r.status);
  });

  await check('A forged authorization code → failed', async () => {
    const res = await fetch(BASE + '/sandbox/login?tx=TEST-CODE', { redirect: 'manual' });
    const state = new URL(res.headers.get('location')).searchParams.get('state');
    await fetch(BASE + '/sandbox/callback?code=not-a-real-code&state=' + state);
    const r = await fetch(BASE + '/sandbox/result?tx=TEST-CODE').then((x) => x.json());
    assert(r.status === 'failed', 'status was ' + r.status);
  });

  await check('data.fetch without signing in is refused', async () => {
    const r = await fetch(BASE + '/sandbox/data', { method: 'POST', body: JSON.stringify({ subject: 'x', attributes: ['household'] }) });
    assert(r.status === 401, 'HTTP ' + r.status);
  });

  await check('The client\'s private key is never served', async () => {
    const r = await fetch(BASE + '/sandbox/.secrets/xstack-client.json');
    assert(r.status === 404, 'HTTP ' + r.status);
  });

  console.log('Contract harness:');

  await check('Mina Vorlek acts for Anaïs Vorlek: subject and actor stay apart', async () => {
    const page = await (await fresh()).newPage();
    await page.goto(HARNESS);
    const [popup] = await Promise.all([page.waitForEvent('popup'), page.click('#sign-in-for')]);
    await esignet(popup, '9900274665');
    await page.getByText('Anaïs Vorlek (your grandmother)').click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForFunction(() => window.lastResult && window.lastResult.status);
    const who = await page.evaluate(() => window.lastResult);
    assert(who.status === 'signed_in' && who.claims.fullName === 'Anaïs Vorlek', 'subject was ' + (who.claims && who.claims.fullName));
    assert(who.actor && who.actor.claims.fullName === 'Mina Vorlek', 'actor was ' + JSON.stringify(who.actor));
    assert(who.actor.authority.reference === 'AI-EI-2026-00418', 'authority ' + JSON.stringify(who.actor.authority));
    await page.evaluate(() => { window.lastResult = null; });
    await page.click('#fetch');
    await page.getByText('Yes, get their details').click();
    await page.waitForFunction(() => window.lastResult && window.lastResult.status);
    const got = await page.evaluate(() => window.lastResult);
    assert(got.values.household.value.registeredPerson === 'Anaïs Vorlek', 'household ' + JSON.stringify(got.values.household));
  });

  await check('Sefa Tormik: no record in the registers → not_found', async () => {
    const page = await (await fresh()).newPage();
    await page.goto(HARNESS);
    const [popup] = await Promise.all([page.waitForEvent('popup'), page.click('#sign-in')]);
    await esignet(popup, '9900451261');
    await page.waitForFunction(() => window.lastResult && window.lastResult.status === 'signed_in');
    await page.evaluate(() => { window.lastResult = null; });
    await page.click('#fetch');
    await page.getByText('Yes, get my details').click();
    await page.waitForFunction(() => window.lastResult && window.lastResult.status);
    const got = await page.evaluate(() => window.lastResult);
    assert(got.status === 'not_found', 'status ' + got.status);
  });

  await check('Desa Haldry: payout account missing, payment declined (payments still mocked)', async () => {
    const page = await (await fresh()).newPage();
    await page.goto(HARNESS);
    const [popup] = await Promise.all([page.waitForEvent('popup'), page.click('#sign-in')]);
    await esignet(popup, '9900529036');
    await page.waitForFunction(() => window.lastResult && window.lastResult.status === 'signed_in');
    await page.evaluate(() => { window.lastResult = null; });
    await page.click('#fetch');
    await page.getByText('Yes, get my details').click();
    await page.waitForFunction(() => window.lastResult && window.lastResult.status);
    const got = await page.evaluate(() => window.lastResult);
    assert(got.status === 'ok' && got.missing.includes('payoutAccount'), JSON.stringify({ status: got.status, missing: got.missing }));
    await page.evaluate(() => { window.lastResult = null; });
    await page.click('#pay');
    await page.getByRole('button', { name: /^Pay / }).click();
    await page.locator('.xsdpi').getByRole('button', { name: 'Go back to the service' }).click();
    await page.waitForFunction(() => window.lastResult && window.lastResult.status);
    assert((await page.evaluate(() => window.lastResult.status)) === 'declined', 'payment not declined');
  });

  await browser.close();
  console.log(failures ? `\n${failures} failed.` : '\nAll passed.');
  process.exit(failures ? 1 : 0);
}

main();
