# Build spec – Household Support Grant prototypes

The working spec the three prototypes were built from. It folds in the service designer's review of the hypotheses and the cyber engineer's security flags. Read it with `brief.md`, `profiles/kestria/profile.md`, `profiles/kestria/dpi.md` and `skills/brief-to-prototypes/SKILL.md`.

## Hypotheses (after review)

| # | Folder | Name | The bet |
|---|---|---|---|
| 1 | `prototype-1-once-only/` | **Once-only, phone-first** | Sign in with KestriaID (level 2). We pull the household, programmes and payout account. The citizen confirms, and we show the eligibility outcome before they apply. The start page also works as the landing page for a neutral SPA text message ("Check if you can get help from SPA at gov.kestria.test/hsg"). |
| 2 | `prototype-2-assisted-csc/` | **Assisted at a Citizen Service Centre** | A CSC officer runs the service on a certified device with the citizen beside them. The citizen gives informed consent, then signs in by fingerprint (level 3). Village digital champions can only *prepare and refer*: they book a CSC visit or a mobile CSC day for the rainy season. Not being in the registry becomes a booked survey visit. |
| 3 | `prototype-3-household-first/` | **Household-first** | Starts from "What's changed in your household?", not "apply". Anyone in the household can start it. They report changes (a birth, a death, someone moved, lost income), name who should receive the money, and the default outcome is a reassessment or survey, not a yes or no on the spot. |

The original H3, "proactive SMS with no application", was replaced:
- It was the same bet as H1 with a different entry point.
- A typed code is only level 1.
- It shuts out households not in the registry.

## Chrome (all three, xstack neutral style)

- **Official banner:** "Kestria is a fictional country, used for demonstration. This is a prototype of a Kestria government service."
- **Header:** GovKestria – Apply for the Household Support Grant (H3: "Tell us about your household – Household Support Grant")
- **Phase banner:** "alpha – This is a prototype. Don't use it for real applications."
- **xstack banner:** the variant name, plus a "Show assumptions (N)" toggle
- **Language switcher in the header:** Kestrian | English | Vell | Sora. Only English works. The others show a short notice: "Translation not available in this prototype" `[KNOWN GAP]`. The profile has no Kestrian, Vell or Sora text.
- **Footer:**
  - privacy notice
  - accessibility statement
  - contact SPA: `*999#`, or the free line `0800 400 400` (fictional)
  - find your nearest Citizen Service Centre
  - "Kestria is fictional"
- **`<html lang="en">`.** The `<head>` comment cites the Kestria Digital Service Standard by point and title: Points 1, 3, 4, 5, 6, 7 and 11.

## Facts to use

- **The grant:** K 1,500 a month, paid monthly. Write amounts as `K 1,500` in page copy.
- **Eligibility (a demo assumption, not in the profile):**
  - the household is in the National Social Registry, in the lowest welfare bands
  - it isn't already getting another SPA cash programme

  **Never show the band or the score.** Show only the outcome: "You can probably get the grant", "We need to visit your household" or "You already get support from SPA". `[VERIFY WITH POLICY]`
- **Decision time:** about 4 weeks from a complete online application, or 8–10 weeks if a survey visit is needed. `[VERIFY WITH DEPARTMENT]`
- **Reference format:** `HSG-` + 7 digits, for example `HSG-4418213`, marked as fake data
- **Data use:** SPA pulls registry data under public task (Data Protection Act 2022, s.13), so this is a *notice*, not a consent request. Every pull shows up in "Who has used my data" in the citizen's GovKestria account.

## Question map

| Question | Map | Source | Fallback |
|---|---|---|---|
| Name | known | KestriaID claims | Ask (manual route) |
| Phone to contact you | known | KestriaID claims | Ask for a safe contact number if the one on record doesn't work |
| District (not full address) | known | `address`, National Population Register | Ask for the district if it's out of date. Flag the record for a survey. |
| Household members | known | `household`, National Social Registry, via KesLink (s.13) | No record: start a survey request and book a visit |
| Already getting SPA support | known | `programmes`, National Social Registry | Unavailable: don't block. SPA checks in the back office. |
| Eligibility | derived | Band and programmes. Never shown. | Outcome page |
| Nearest CSC, postcode | derived | District | – |
| Changes since the last survey (birth, death, moved, lost income) | ask | – | – |
| Who should receive the money | ask | – | The person applying, or another adult in the household |
| Where we pay | known | `payoutAccount`: the provider and last 4 digits only | None linked: phone number, then cash at a post office. **Changing it needs level 3 at a CSC. Never edit it inline.** |
| Declaration | ask | – | – |

**Don't pull:** date of birth (except to show it), sex, KUIN, TIN, vehicle, tax, land or health. **Don't ask** about disability or health.

## DPI mock

- **Inline the mock in full.** Inline `references/dpi-mock.js` in a `<script>` tag. `examples/dpi-mock-demo/index.html` shows the pattern.
- **Create it with this config:**
  - `platforms`: `{ identity: { name: 'KestriaID' }, exchange: { name: 'KesLink' }, payments: { name: 'GovPay Kestria', currency: 'XTS' } }`
  - `attributes`: only `address`, `household`, `programmes` and `payoutAccount`, with the labels and sources from `profiles/kestria/dpi.md`
  - `personas`: copy them from `profiles/kestria/dpi.md`, keeping the fake values and the `[Fictional]` prefixes. You may add page-level data keyed by `who.persona`, such as household member lists or which band is eligible. Keep it in a separate `PERSONA_EXTRAS` object, marked fake.
- **Known mock gaps.** Tag each one `[KNOWN GAP]` in the assumptions panel and work round it in page code:
  1. **Payouts:** the mock has no payout contract, because `dpi.payments.create` takes money in. Don't call it. Show the payout account confirmation as an ordinary service page, with `.fake-data` markers.
  2. **Consent screen:** `dpi.data.fetch` always shows one, but SPA's pull is s.13 public task, so it should be a notice. Use the mock anyway, put a notice page before it, and tag the gap. Treat `refused` as "carry on with manual answers and a survey".
  3. **Assurance level:** the mock always returns level `substantial`. H2 shows its own simulated "fingerprint check at the CSC" page, labelled simulated.
- **Every DPI status needs a page:** `cancelled`, `failed` (route without KestriaID), `not_found` (survey request) and `missing`.

## Security must-nots (from the cyber engineer)

- Never ask for a PIN, a full account number, or a KUIN that sign-in already gave us. Never show a raw score or band.
- Before sign-in, show no names, household details or amounts. Shared phones are common.
- No "you qualify" wording in anything that could reach a shared phone. Neutral SMS only.
- Payout account changes go to a CSC at level 3 only. Tell the citizen we'll text the old number when it changes.
- Say "We will never ask for your PIN" on the payout page and the confirmation page.
- Every route works without a KUIN. Ask "Do you have a KestriaID?" on the start page or the first question.
- H2:
  - fingerprint consent is a separate step the citizen can refuse without losing the service
  - show the officer's name and CSC on each page
  - log "acting for"
- H3 (and H2 when someone acts for another person): show "You're telling us about [household]" and who is acting. An intermediary can't change the payout account.

## Pages and style

- One thing per page.
- A Back link on every page except Start.
- Validation on submit, with an error summary and inline errors (`aria-invalid`, `aria-describedby`). Error messages say what went wrong and what to do.
- Check your answers marks each answer "From government records (source)" or "You told us".
- The confirmation page gives a fake reference, what happens next, the timing, and how to check progress (`*999#` or SMS).
- Short sentences, "you" and "we", a reading age of about 9.
- It must work at 320px wide. No external fonts, images or frameworks. Keep the page light (Point 11).
- Keep the class names `.xstack-banner`, `.xstack-assumptions`, `.verify-tag` and `.fake-data` exactly as they are.
