---
name: government-dpi
description: Point xstack at a government's Digital Public Infrastructure – its identity platform, payment rails and gateway, and data exchange – starting from the DPI Map dataset, checking every fact, and recording what prototypes need in the project's dpi.md, including the data catalogue of which register holds which fact. Use when a team wants prototypes that sign people in, take payments and stop asking for what government already knows, is setting up a profile, or asks what DPI their country has. Triggers on "/xstack:dpi", "digital public infrastructure", "what DPI do we have", "identity platform", "payment gateway", "data exchange", "X-Road", "MOSIP", "eSignet", "Mojaloop", "once-only", "set up our platforms".
---

# Government Digital Public Infrastructure

xstack prototypes should sign people in, pull what the government already holds and take payments the way the real service will. This skill finds out what the government actually has, checks it, and records it in `.xstack/dpi.md`. `brief-to-prototypes` and `dpi-mock.js` read that file.

It supports the **Open platforms and standards**, **Whole problem** and **Trust, security and privacy** themes. Read `references/dpi-baseline.md` first: it explains the pillars, the tiers and the once-only rules this skill records against.

Hand off to the **developer** agent. The **cyber engineer** reviews the data catalogue's lawful-basis column before you finish.

---

## Where the facts come from

There are three sources, and `dpi.md` always says which one each fact came from:

| Source | What it's good for | Recorded as |
|---|---|---|
| **The DPI Map** | Which identity, payment and data exchange systems a country has, who runs them, how far along they are, and the technical base of its data exchange | `DPI Map, [snapshot date]` |
| **Published docs and live checks** | Protocols, sandbox and docs links, the claims an identity platform really returns, API operations | The URL and the date checked |
| **The team** | Everything that isn't public: access agreements, which registers they can reach, how fresh the data is | `Team, [date]` |

### The DPI Map

The [DPI Map](https://dpimap.org) is run by the UCL Institute for Innovation and Public Purpose. Its data is published at <https://github.com/olizilla/digital-public-infra-map> as dated snapshots. xstack **reads it live** and doesn't bundle a copy: the repository has no licence that would let us redistribute it. Only what the team confirms is recorded in the project, with the citation the DPI Map asks for.

`scripts/dpimap.py` reads the newest snapshot. It uses only the Python standard library.

```bash
python3 scripts/dpimap.py countries --query guinea      # find the dataset's name for a country
python3 scripts/dpimap.py show Barbados                  # every system, all three pillars
python3 scripts/dpimap.py show Kenya --pillar exchange   # one pillar
python3 scripts/dpimap.py --source ./dpimap show Kenya   # offline: a folder with identity, payment and exchange .json or .csv
```

`show` prints JSON with a `source` block (repo, snapshot date, citation) and, for each pillar, a list of systems with `name`, `url`, `implementation` (active, planned or pilot, unknown), `dpi_map_status` (the DPI Map's own verdict: DPI, in progress, or not assessed as DPI), `owner`, `last_updated`, `technical_base` (data exchange only) and `details` (every other field the DPI Map records, with blanks removed). If the name is ambiguous it prints the candidates and exits with code 1. If the data can't be read it exits with code 2 – say so, and carry on from the team and published docs.

**What the DPI Map is not.** It is a research dataset about how mature DPI is. It doesn't have API specs, sandboxes, claims or registers. It records payment **rails**, not the **gateway** a government service uses. Its entries can be months old. Use it as the starting point for research, never as the last word.

### Checking facts

`scripts/verify.py` checks what can be checked from outside:

```bash
python3 scripts/verify.py url https://example.gov/id https://example.gov/pay   # do the links resolve?
python3 scripts/verify.py oidc https://id.example.gov                         # OpenID Connect discovery: real claims, scopes, assurance levels
python3 scripts/verify.py openapi https://api.example.gov/openapi.json        # operations in a published API spec
```

Each result carries the date checked. Exit code 1 means something didn't check out. Record that as a finding, don't skip it. For example, an expired certificate on the ID platform's website is worth telling the team about.

---

## 1. Scope it

Ask, using AskUserQuestion where the answers are choices:

- **Which government?** National, or a state or city? The DPI Map is mostly national.
- **Which services is the team working on now?** The data catalogue grows from real services. Don't try to list every register in the country.

If `.xstack/dpi.md` already exists, you are refreshing it. Read it, and go to *Refreshing* below.

## 2. Start from the DPI Map

Run `dpimap.py show <country>`. Show the team what it says, one pillar at a time, in plain words: the system's name, who runs it, how far along it is, and the DPI Map's verdict. Say how old each entry is.

Then ask the team to confirm or correct each one. Common corrections:

- **The name citizens see is different.** For example, the card and the sign-in service have different names. Record the name citizens see on screen.
- **Payments need two rows.** The DPI Map lists the national rail. Ask which **gateway** government services use to take fees, because that's what the citizen sees. Record both, and point the mock at the gateway.
- **There's more than one system.** Pick the one the team's services will use, and note the others.
- **The DPI Map has nothing.** That's common for data exchange. Carry on from published docs and the team.

## 3. Match each platform to a family

Read `references/platform-families.md`. Match each platform to a family from the evidence you have: the DPI Map's `technical_base`, its support organisations in `details`, the country's docs, or the team. The family tells you where to look and what the mock's screens should look like. If nothing matches, leave the family blank.

## 4. Research and check the specifics

For each platform, search the country's and the platform's own docs (WebSearch, WebFetch). Find:

- **Identity:** the sign-in URL and issuer, the protocol, the claims it returns, assurance levels, who can't use it, and the assisted or offline route. When it's OpenID Connect, run `verify.py oidc` and record the claims from the discovery document, not from a blog post
- **Payments:** the gateway citizens see, the currency, ways to pay (card, mobile money, bank transfer, cash with a reference), how the service learns a payment worked, and refunds. If the gateway publishes an OpenAPI spec, run `verify.py openapi`
- **Data exchange:** how a service joins, the consent model (citizen consent on each pull, a legal basis with no consent screen, or both) and where citizens can see who used their data
- **For every platform:** the owner, docs and sandbox links, and how a team requests access. Run `verify.py url` on every link before recording it

**Rules:**

- **Never invent a platform, URL, claim, register or legal basis.** Leave it blank or tag it `[VERIFY WITH PLATFORM]` or `[VERIFY WITH POLICY]`.
- **Never record credentials,** client IDs, secrets or API keys in `dpi.md`. Record how to request them.
- **Don't sign up for sandboxes or accept terms for the team.** Tell them the steps.
- **Prefer the country's own words** for platform and register names.

## 5. Set each platform's tier

Use the tiers in `references/dpi-baseline.md`, based on evidence:

| Tier | Evidence needed |
|---|---|
| **1 – sandbox** | A test environment that has passed `verify.py` checks, and a documented way to get access |
| **2 – spec only** | A published spec or discovery document, but no sandbox |
| **3 – unknown** | Neither. This includes a platform the DPI Map lists but that has nothing public |

The team can raise a tier ("we already have sandbox access"). Record that as `Team, [date]`.

## 6. Build the data catalogue with the team

Start with the identity claims from step 4. Then, for each service in scope, go through the facts it needs and ask:

- Which register holds this? Which platform reaches it?
- How fresh is it, and how often is it wrong? Addresses often are
- Is there an agreement for this service to use it?

Leave **lawful basis** as `[VERIFY WITH POLICY]` unless the team gives you a law or agreement to cite. The cyber engineer reviews this column. Use camelCase attribute keys (for example `address`, `vehicleRegistration`): prototypes pass them to `dpi.data.fetch()`.

## 7. Write test personas

Write made-up citizens in the profile's data formats, with names that fit the country. Write one per scenario: everything found, a fact out of date, no record, payment declined, and can't be verified. Every value must be obviously fake. Never use a real person's name or ID number.

## 8. Record it

Write `.xstack/dpi.md` from `profiles/_template/dpi.md`. Fill in the **Sources** section: the DPI Map snapshot and citation, and the date of each check. Then make sure the profile points to it:

- If `.xstack/profile.md` exists, update its **Shared platforms** section to name the platforms and say "Details: `dpi.md`".
- If it doesn't, create a minimal `.xstack/profile.md` with only **Shared platforms** filled in.
- If the team uses a bundled profile (`xstack profile: <name>` in `CLAUDE.md`), tell them a project profile in `.xstack/` takes precedence, and ask before creating one.

## 9. Prove it works

Build `.xstack/dpi-test.html`: a short single-file prototype with `references/dpi-mock.js` inlined. Set it up with the platform names, the catalogue's attributes for one service in scope, and the personas. It should run sign in → share data → confirm → pay. Open it, or describe what the team should see.

Finish with a short summary:

- each pillar's platform, family and tier
- what was checked, and anything that failed a check
- what's still `[VERIFY WITH …]`, and who to ask
- the next step – usually `/xstack:build`

---

## Refreshing

Run the skill again. Read the existing `dpi.md` first, then:

- run `dpimap.py show` and compare it with the recorded snapshot. Point out new systems or status changes
- rerun `verify.py` on every recorded link and discovery document. Point out any claim that has disappeared or appeared
- update only what has changed, and record the new dates

Suggest a refresh before each phase gate, and whenever a platform announces a new version.
