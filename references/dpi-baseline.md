# The xstack DPI baseline

Digital Public Infrastructure (DPI) is the set of shared platforms a government builds once so every service can use them. For xstack there are three pillars and one rule that ties them together:

- **Identity:** prove who the citizen is, and get verified facts about them
- **Payments:** take money, or pay money out, through the government's shared rails
- **Data exchange:** pull what the government already knows from the register that holds it, with the citizen's consent
- **The once-only rule:** never ask a citizen for something the government already holds. Show it and ask them to confirm it.

Every country builds these differently. This file is the country-agnostic common ground. It uses the **GovStack building blocks** as its vocabulary because they are open and neutral. A country profile names the real platforms and records them in `.xstack/dpi.md` (template: `profiles/_template/dpi.md`).

- **If the team has a country profile with a `dpi.md`**, agents use its platforms, protocols, data catalogue and tiers.
- **If it doesn't**, agents use this baseline. Prototypes still mock sign-in, prefill and payment, and tag every platform assumption `[VERIFY WITH PLATFORM]`.

It supports the **Open platforms and standards**, **Whole problem**, **Trust, security and privacy** and **Works first time** themes in `references/service-standard-baseline.md`.

---

## The pillars

| Pillar | What a service needs from it | GovStack building block | Examples of real platforms |
|---|---|---|---|
| **Identity** | Sign the citizen in, and get a small set of verified claims (name, date of birth, national ID number) | Identity | MOSIP with eSignet, GOV.UK One Login, Singpass, Aadhaar, Trident ID |
| **Payments** | Take a fee, or pay a benefit or refund, and get a reliable status back | Payments | Mojaloop-based national switches, UPI, GOV.UK Pay, a national payment gateway |
| **Data exchange** | Ask a register for specific facts about this citizen, for a stated purpose | Information Mediator, Digital Registries | X-Road, Myinfo, DigiLocker, the EU Once-Only Technical System |
| **Consent** | Record that the citizen agreed to a data pull, for which purpose, and let them see it later | Consent | Account Aggregator (India), Myinfo consent, a department's own records |

Registers are the sources behind data exchange: civil registration, tax, social protection, vehicles, businesses, land, professional licensing. The data catalogue in `dpi.md` records which register holds which fact.

---

## The contract prototypes code against

Prototypes never call a real platform. They call three functions, which behave the same way whatever sits behind them. `references/dpi-mock.js` implements them for alpha.

```js
dpi.identity.signIn({ purpose })
  // → { status: 'signed_in' | 'cancelled' | 'failed', subject, claims: { fullName, dateOfBirth, nationalId }, level }

dpi.data.fetch({ subject, attributes: ['address', 'vehicle'], purpose })
  // → { status: 'ok' | 'not_found' | 'refused', consentId, values: { address: { value, source, asOf } }, missing: [] }

dpi.payments.create({ amount, currency, reference, description })
  // → { status: 'paid' | 'declined' | 'cancelled', receipt }
```

Every call returns a `status`, and every status other than the happy one needs a page in the prototype. A fetch can also come back `ok` with some facts in `missing`, so ask for just those. That is where most real-world DPI services break, so it is where research should look.

| Mode | Phase | What sits behind the contract |
|---|---|---|
| `mock` | Alpha | `dpi-mock.js`, in the browser. It shows simulated sign-in, consent and payment screens with made-up citizens |
| `sandbox` | Beta | A server-side adapter calling the platform's test environment (`/xstack:productionise`) |
| `live` | Live | The same adapter with production credentials, after the cyber engineer's review |

The page code stays the same from mock to live. Only the adapter changes.

---

## Platform tiers

`dpi.md` gives each platform a tier, in the same way `design-system.md` does for the design system.

| Tier | What's true | What xstack does |
|---|---|---|
| **1 – sandbox** | The platform publishes an API spec and a test environment teams can get access to | Mock in alpha, matching the real claims and flows. Wire the sandbox in beta |
| **2 – spec only** | There is a published API or data spec, but no sandbox | Mock in alpha, matching the spec. Tag the flow `[VERIFY WITH PLATFORM]` |
| **3 – unknown** | Nothing public, or the platform doesn't exist yet | Mock the generic contract above. Tag every platform assumption `[VERIFY WITH PLATFORM]`, and always show the manual-entry route next to it |

---

## Once-only: how to use what the government already knows

These rules apply whatever the platform. The content designer owns the words and the cyber engineer owns the data. The developer builds it.

1. **Map every question first.** Before building pages, sort every question the service asks into:
   - **known:** a register holds it, so pull it and ask the citizen to confirm it
   - **derived:** it can be worked out from known facts (age from date of birth, eligibility from a benefit record), so work it out and show the result
   - **ask:** only the citizen knows it (their intentions, their circumstances today), so ask it
   `brief-to-prototypes` writes this as the question map in `assumptions.md`.
2. **Pull the least you need.** Only the facts this decision needs, for a stated purpose. "We might need it later" is not a purpose.
3. **Ask before you pull, in plain language.** Name the source, name the facts, say why. For example: "To check your vehicle is eligible, we'll get its make, model and registration date from the Licensing Authority."
4. **Confirm, never prefill silently.** Show what came back, with its source, and ask "Is this correct?" Silent prefill hides mistakes and makes the citizen responsible for errors they never saw.
5. **Let them correct it, and tell the source.** When a fact is wrong, take the correction, carry on with the application and tell the citizen how the register will be fixed. The citizen shouldn't be blocked because the government has old data.
6. **Always have a route without the platform.** For people who can't sign in, have no record, or refuse consent: manual entry, an assisted channel, or an intermediary. A service that only works with DPI shuts people out (**Inclusion**).
7. **Show the source on Check your answers.** Mark pulled facts with where they came from, so the citizen can tell pulled facts from typed ones.
8. **Never put real data in a prototype.** Mock citizens only, in the country's data formats, marked as fake.

---

## What to test in research

The happy path shows that the prototype works. These scenarios show whether the service does. `dpi-mock.js` has a persona for each one:

| Scenario | What you learn |
|---|---|
| Everything found and correct | Do people trust pulled data? Do they read it, or click past it? |
| A fact is out of date (moved house) | Do they notice? Can they correct it without getting stuck? |
| No record found | Does the manual route feel like a failure, or like a normal option? |
| Consent refused | Can they still finish? |
| Payment declined | Do they understand what happened and what to do? Is anything charged twice? |

---

## Who owns what

| Work | Primary | Supporting |
|---|---|---|
| Which platforms exist and how to reach them (`dpi.md`) | Developer | Delivery manager (profile owner) |
| The question map | Service designer | Content designer, developer |
| Consent, source and confirm-your-details wording | Content & interaction designer | Cyber engineer |
| Data inventory, lawful basis, DPIA for each pull | Cyber engineer | Developer |
| The mock in alpha and the adapter in beta | Developer | Cyber engineer |
