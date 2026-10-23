# The Kestria sandbox: real eSignet on your laptop

This folder runs **MOSIP eSignet** – the OpenID Connect sign-in that KestriaID is built on – with MOSIP's **mock identity system**, on your own computer. A prototype can then sign people in through eSignet's real screens instead of the in-browser mock. It's the `sandbox` mode in `references/dpi-baseline.md`, and it makes KestriaID **Tier 1 locally** (`profiles/kestria/dpi.md`).

Everyone in it is made up: the `KESTRIA_PERSONAS` from `profiles/kestria/dpi.md`, with KUINs in the never-issued `9900` test range. Never put real people's data in it.

```
 prototype page  ──signIn()──▶  adapter :4400  ──OIDC──▶  eSignet :8080 ──▶ mock identity system :8082
 (dpi-sandbox.js)  ◀─claims──   (this repo)    ◀─tokens─  sign-in screens :3000      Postgres :5455
                 ──data.fetch()──▶ mock registers (from dpi.md)
                 ──payments.create()──▶ still the in-browser mock
```

| Folder | What's in it |
|---|---|
| `esignet/` | `esignet.sh` starts and stops eSignet. `compose.override.yaml` fixes upstream's rough edges. `seed.mjs` creates the personas and the xstack OIDC client. Nothing from eSignet is copied here: `esignet.sh` downloads eSignet's own compose files at a pinned release into `esignet/.upstream/`. |
| `adapter/` | A small Node server, no dependencies. It serves the repo's prototypes over http, runs the sign-in with eSignet and answers `data.fetch`. |
| `use-sandbox.mjs` | Copies a prototype and swaps its inlined `dpi-mock.js` for `references/dpi-sandbox.js`. |
| `test/` | An end-to-end check in a real browser, and a small harness page for the contract. |
| `.secrets/` | The OIDC client's private key. Made by `seed.mjs`. Git ignores it. |

## From clone to Ines Kestel signed in

You need:
- **Docker Desktop**, running, with about 4 GB of memory free and 2 GB of disk for images
- **Node 20 or later**
- ports **3000, 4400, 5455, 8080 and 8082** free

1. **Start eSignet.** The first run downloads the images, which takes a few minutes. Later runs take about 20 seconds.

   ```bash
   sandbox/esignet/esignet.sh up
   ```

   It ends by seeding nine personas and registering the client:

   ```
     added   Ines Kestel    KUIN 9900 817 347
     …
     registered OIDC client "xstack-kestria-sandbox" (private_key_jwt). Private key: sandbox/.secrets/xstack-client.json
   ```

2. **Start the adapter**, in a second terminal. Leave it running: it prints each sign-in and data pull.

   ```bash
   node sandbox/adapter/server.mjs
   ```

3. **Open the demo:** <http://localhost:4400/examples/build-household-support-grant/prototype-1-once-only/sandbox/>. It's Prototype 1 of the Household Support Grant, iteration 4, with only the DPI script swapped.

4. **Sign in.** Answer "Yes" to having a KestriaID and press Continue. A KestriaID window opens with eSignet's own screens:
   - type `9900817347` (Ines's KUIN, without spaces) and press **Get OTP**
   - type `111111` in the six boxes and press **Verify** – the mock identity system always accepts this code
   - on the consent screen, press **Allow**

5. The window closes and the prototype says **"You are signed in as Ines Kestel"**. Continue, press **Yes, get my details**, and her household (`HH-LK-0118302`, five people, `likely`) comes back from the mock registers.

If your browser blocks the KestriaID window, press **Open KestriaID** on the prototype's screen.

## Who can sign in

Type the KUIN without spaces. The one-time code is always `111111`. The mock identity system also holds a PIN (`111111`) and a password (`Kestria@2026`) for each person, but the sandbox asks eSignet for one-time-code sign-in.

| Person | KUIN to type | What happens |
|---|---|---|
| Mirel Okand | `9900214705` | Everything found. `hsgAssessment` is `not_likely`. |
| Ines Kestel | `9900817347` | Everything found. `likely`. |
| Tessa Ondrey | `9900135887` | Found. She isn't the registered person. |
| Talin Vorsa | `9900318526` | Found, but the address and household are out of date |
| Sefa Tormik | `9900451261` | Signs in. `data.fetch` comes back `not_found`. |
| Desa Haldry | `9900529036` | Found, with `payoutAccount` in `missing`. Her payments are declined. |
| Jory Benmara | `9900773655` | Signs in. Choose "No" on the consent screen. |
| Anaïs Vorlek | `9900962518` | Found. Already gets the Older Persons Grant. |
| Mina Vorlek | `9900274665` | Can act for Anaïs, when the service calls `signIn({ actingFor: true })` |
| Aru Danvell | `9900644181` | **Not seeded**, because he can't sign in online. eSignet says "Send OTP failed". |

Kel Varrin and Pell Marrow have no KUIN, so they never reach sign-in.

## The unhappy paths

Every status the contract promises can happen in the sandbox:

| Status | How to get it |
|---|---|
| `signIn` → `cancelled` | Press **Deny** on eSignet's consent screen. Or close the KestriaID window. Or press **Go back to the service** on the prototype's screen. |
| `signIn` → `failed` | Type Aru's KUIN. eSignet keeps him on its screen, as it would in life, and never reports back. So the prototype's screen has **I can't sign in with KestriaID**, which returns `failed`. Errors back from eSignet, a token that doesn't check out, or a person with no register record also return `failed`. |
| `data.fetch` → `refused` | Press **No, I will type them in** on the KesLink consent screen. It also comes back `refused`, with `error: 'session_ended'`, if the adapter restarted since sign-in. |
| `data.fetch` → `not_found` | Sign in as Sefa Tormik |
| `data.fetch` → `ok` with `missing` | Sign in as Desa Haldry |
| `payments.create` → `declined` | Desa Haldry (payments are still the mock) |
| Acting for someone | Mina Vorlek, in a service that calls `signIn({ actingFor: true })`. See `test/harness.html`. |

## Switching a prototype to the sandbox

```bash
node sandbox/use-sandbox.mjs examples/build-household-support-grant/prototype-3-household-first/iteration-4/index.html \
  examples/build-household-support-grant/prototype-3-household-first/sandbox
```

This copies the page and swaps the inlined `references/dpi-mock.js` for `references/dpi-sandbox.js`. Nothing else changes: `xstackDpi.create(…)` takes the same config, and the three calls return the same statuses and shapes. Then open the copy from `http://localhost:4400/…`. Opened as a file, sign-in explains that it needs the adapter and returns `failed`, because eSignet can only send people back to an http address.

The adapter serves this whole repo, apart from dotfiles and dot-folders, so any prototype in it works on port 4400. Mock prototypes do too.

## What the adapter does

**Sign-in** is the OpenID Connect authorization code flow with PKCE (S256):

1. The page opens `/sandbox/login` in a new window. The adapter makes a `state`, a `nonce` and a PKCE verifier, and sends the person to eSignet's `/oauth2/authorize`. It asks for `acr_values=mosip:idp:acr:generated-code`, the claims `name` and `birthdate` (essential) and `phone_number` (voluntary), and `prompt=consent`.
2. eSignet shows its screens and sends the person back to `/sandbox/callback` with a code, or with `?error=`.
3. The adapter swaps the code at `/oauth2/token`, authenticating with **`private_key_jwt`**: an assertion signed PS256 with the key in `.secrets/`, whose public half `seed.mjs` registered.
4. It checks the ID token's signature against eSignet's JWKS, and its issuer, audience, expiry and nonce. It then gets `/oauth2/userinfo`, which eSignet returns as a **signed JWT**, and checks it the same way, including that its `sub` matches.
5. The window tells the page it's done (BroadcastChannel, `postMessage`, with polling as a fallback), and closes. The page collects the result with a session cookie.

**Claims to the contract:**

| Contract | From |
|---|---|
| `subject` | eSignet's `sub`. It's **pairwise**: a different value for each client, and never the KUIN. |
| `claims.fullName` | `name` |
| `claims.dateOfBirth` | `birthdate`, from `1996/03/12` to `1996-03-12` |
| `claims.phone` | `phone_number`, if the person shared it on the consent screen. Otherwise the register's. |
| `claims.nationalId` | **Not from eSignet.** KestriaID doesn't release the KUIN (`dpi.md`, Identity). The adapter matches the verified name and date of birth against the National Population Register mock, which stands in for the identifier the NIA gives KesLink, and returns the KUIN from there, so pages that show it keep working. A real service would only get it with the `kuin` claim, after NIA approval. |
| `claims.givenName`, `familyName` | The register. eSignet 2.0 only releases `name`. |
| `level` | eSignet's `acr`: `generated-code` and `password` are `low`, `linked-wallet` is `substantial`, `biometrics` is `high` |
| `actor` | eSignet has no "act for" step. After an intermediary signs in, the page shows the choice, from the `actsFor` records in `dpi.md`, and the adapter checks the authority hasn't ended. |

**`data.fetch`** answers from mock registers built from the personas' `data` in `dpi.md`. It only answers for the signed-in subject, or the person they act for. The consent screen is the page's, as in the mock, because there's no consent registry locally.

**`payments.create`** is unchanged from the mock.

## Checking it works

With eSignet and the adapter running:

```bash
cd sandbox && npm install && npm test
```

This uses your installed Google Chrome through Playwright. It signs in through the real eSignet screens and checks 12 things: Ines's happy path and household, Deny, closing the window, going back, Aru's `failed`, errors and a forged code from eSignet, `data.fetch` without a session, the private key not being served, Mina acting for Anaïs, Sefa's `not_found`, and Desa's missing payout account and declined payment. `HEADED=1 npm test` shows the browser. Without Chrome, run `npx playwright install chromium` and `PW_CHANNEL=chromium npm test`.

`SANDBOX_DEBUG=1 node sandbox/adapter/server.mjs` also prints the decoded ID token and userinfo.

## Using the Kestria hostnames (optional, not tested)

`dpi.md` names the sandbox `esignet.kestria.test`. To use it, map the name to your own computer. This needs your password, so do it yourself:

```bash
echo "127.0.0.1 esignet.kestria.test" | sudo tee -a /etc/hosts
```

Then start everything with that hostname:

```bash
ESIGNET_HOSTNAME=esignet.kestria.test sandbox/esignet/esignet.sh up
```

```bash
ESIGNET_URL=http://esignet.kestria.test:8080 node sandbox/adapter/server.mjs
```

The issuer becomes `http://esignet.kestria.test:8080` and the sign-in screens `http://esignet.kestria.test:3000`. The ports stay, and it's still http. **This hasn't been run**, because changing `/etc/hosts` was out of reach while building it. The pieces are there: the compose override, `esignet.sh` and the adapter all take the hostname.

## Stopping and resetting

```bash
sandbox/esignet/esignet.sh down
```

```bash
sandbox/esignet/esignet.sh reset
```

`down` keeps the identities, client and keys, and `up` brings them back. `reset` deletes them all, and the client's private key too. Stop the adapter with Ctrl+C.

If Docker Desktop restarts or updates, the eSignet containers stop. Run `esignet.sh up` again.

## Upstream rough edges, and what this does about them

eSignet 2.0.0 (September 2026) is a rewrite in Go, and its compose setup is new. These are the problems found while building this, and the fix for each:

| Problem | Fix |
|---|---|
| Every sign-in screen has an hCaptcha box, though nothing checks it locally | `esignet.sh` copies eSignet's own sign-in flow out of the image and takes out only the CAPTCHA parts (`no-captcha.mjs`). Screens, codes and consent are unchanged. |
| eSignet starts before the mock identity system is listening, can't fetch its certificates, and sign-in fails until it's restarted | A healthcheck on the mock identity system, and eSignet waits for it |
| The mock identity system's container can't be restarted: its entrypoint unzips into a folder that's already there and exits | `esignet.sh up` recreates the app containers every time |
| Both services make their keys on first start inside the container, while the database remembers the key names. A recreated container then won't start ("No such alias"). | Named volumes for both keystores |
| The database is on an anonymous volume, so `down` then `up` starts it empty | A named volume |
| The signed userinfo carries the mock identity system's default issuer, `http://localhost:8088/v1/esignet`, not eSignet's | The override sets it to eSignet's issuer, so the adapter can check `iss` properly |
| The `private_key_jwt` assertion is refused with the token endpoint as its audience, which most providers expect | The adapter uses the issuer as the audience, as eSignet's own Postman collection does |
| Discovery lists only PS256, but userinfo is signed RS256, with a key the JWKS labels PS256 | The adapter accepts PS256 and RS256, nothing else |
| eSignet's screens have no "go back to the service" link | Deny, closing the window, or the prototype's own buttons |
| eSignet remembers consent, so repeat sign-ins skip its consent screen | `prompt=consent` by default. Set `ESIGNET_PROMPT=none` to let it remember. |
| Some embedded browsers, such as editor preview panes, open the KestriaID window in the same tab, and the prototype loses its place | Use a normal browser |

## What isn't real

- **Assurance levels.** eSignet 2.0 offers `generated-code`, `password`, `knowledge` and `biometrics`, but not `linked-wallet`. So the sandbox signs people in at `low`, and nothing can sign in at `substantial`. The Household Support Grant sheet asks for level 2 to apply: a gap to raise with the NIA. Biometric sign-in needs a certified device, which the mock can't provide.
- **The KUIN.** See `claims.nationalId` above.
- **Acting for someone.** The choice is the page's, from `dpi.md`. KestriaID would offer it.
- **KesLink, MyData Kestria and GovPay.** No X-Road, no consent registry, no payments: mock registers and the in-browser payment screen.
- **Security.** It's http on localhost, with sessions in memory, test keys and a fixed one-time code. It's for research with made-up people, not a template for production. The cyber engineer reviews the real adapter before `live`.
