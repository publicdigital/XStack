# Sandbox – Prototype 1 (Once-only, phone-first)

A copy of `iteration-4/index.html` that signs in through **real eSignet** on your computer instead of the simulated KestriaID. It's the `sandbox` mode in `references/dpi-baseline.md`. Iteration 4 itself is unchanged.

**How to open it:** follow `sandbox/README.md`, then go to <http://localhost:4400/examples/build-household-support-grant/prototype-1-once-only/sandbox/>. It doesn't work opened as a file, because eSignet can only send people back to an http address.

## What changed

**One script.** The inlined `references/dpi-mock.js` is replaced by `references/dpi-sandbox.js`, made with:

```bash
node sandbox/use-sandbox.mjs examples/build-household-support-grant/prototype-1-once-only/iteration-4/index.html \
  examples/build-household-support-grant/prototype-1-once-only/sandbox
```

The page's own code, its `xstackDpi.create(…)` config, the Kestrian strings and the switcher are byte-identical to iteration 4. The persona filter in the config is now ignored: the people are the ones seeded into eSignet.

## What a participant sees that's different

- **Sign-in:** a KestriaID window opens with eSignet's own screens: KUIN, one-time code, then eSignet's consent screen listing full name, date of birth and, if they choose, phone number. The prototype shows a "Sign in with KestriaID" screen behind it, with a hint for the researcher. Use Ines Kestel: `9900817347`, code `111111`.
- **Strip colour:** sandbox screens have a blue strip, "Sandbox KestriaID – real eSignet on this computer, with made-up people", not the purple "Simulated" one. The KesLink consent screen is still the page's own, because there's no consent registry locally.
- **"I can't sign in with KestriaID":** a new link on the sign-in screen. eSignet never tells a service that someone couldn't get a code, so this is how they say so. It leads to the existing "We could not confirm who you are" page.
- **The new screens are in English only.** They aren't in `kestrin/strings.json`, so the Kestrian switcher leaves them alone. eSignet's own screens follow its language menu, which doesn't have Kestrian.

## Statuses, checked in a browser

`cd sandbox && npm test` runs this prototype through the real eSignet screens: Ines signs in and her household comes back; Deny, closing the window and "Go back to the service" lead to the cancelled page; Aru's KUIN plus "I can't sign in" leads to the failed page. See `sandbox/README.md`.

## Known gaps

- Sign-in is at level 1 (`low`): eSignet 2.0 has no linked-wallet sign-in, so nobody can reach level 2. This prototype doesn't check the level, but the service sheet asks for level 2 to apply.
- The pairwise `sub` is the subject. The KUIN on screen comes from the adapter's register match, not from eSignet.
- Payments and payouts are as in iteration 4.
