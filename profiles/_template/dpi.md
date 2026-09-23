# [Country] Digital Public Infrastructure

<!--
Copy this file to `.xstack/dpi.md` in your project, next to profile.md.
It records the government's shared platforms for identity, payments and data exchange, and the data catalogue:
which register holds which fact about a citizen. Prototypes use it to sign people in, take payments and
avoid asking for anything the government already holds. See references/dpi-baseline.md.
Never guess a fact about a platform. Leave it blank, and agents will tag it [VERIFY WITH PLATFORM].
Delete these comments when you're done.
-->

## Platforms

| Pillar | Platform | Owner | Protocol | Tier | Docs and sandbox |
|---|---|---|---|---|---|
| Identity | | | <!-- e.g. OpenID Connect --> | <!-- 1 sandbox, 2 spec only, 3 unknown --> | |
| Payments | | | <!-- e.g. redirect + webhook, ISO 20022 --> | | |
| Data exchange | | | <!-- e.g. X-Road REST, an API gateway --> | | |
| Consent | | | | | |

### Identity

- **What it's called on screen:** <!-- the name citizens recognise, e.g. on the sign-in button -->
- **Claims it returns:** <!-- e.g. full name, date of birth, national ID number, photo -->
- **Assurance levels:** <!-- e.g. low / substantial / high, and which one a service like this needs -->
- **Who can't use it:** <!-- e.g. under-18s, people without a smartphone, non-citizens -->
- **Assisted or offline route:** <!-- e.g. verify at a counter, an intermediary acting for someone -->

### Payments

- **What it's called on screen:**
- **Currency:** <!-- ISO code, e.g. BBD, KES, GBP -->
- **Ways to pay:** <!-- e.g. card, mobile money, bank transfer, cash at a counter with a reference -->
- **How the service learns a payment worked:** <!-- e.g. redirect back plus a signed webhook -->
- **Refunds:**

### Data exchange

- **How a service gets access:** <!-- e.g. a data-sharing agreement per register, approval by a board -->
- **Consent model:** <!-- e.g. citizen consent on each pull, a legal gateway with no consent screen, both -->
- **Where citizens can see who used their data:** <!-- e.g. a data tracker in the citizen portal -->

## Data catalogue

Every fact a service might pull, where it lives and on what basis. `brief-to-prototypes` uses this table to decide which questions a prototype doesn't need to ask.

| Fact (attribute key) | What it is | Source register | Reached through | How fresh | Lawful basis | Notes |
|---|---|---|---|---|---|---|
| `fullName` | Full name | | Identity | | | |
| `dateOfBirth` | Date of birth | | Identity | | | |
| `nationalId` | National ID number | | Identity | | | |
| `address` | Home address | | | <!-- e.g. updated when people tell the registry, often out of date --> | | |
| `phone` | Mobile number | | | | | |

<!-- Add a row for every register fact a service in this government could use: vehicles, businesses,
tax status, benefits, professional licences, land, qualifications. The attribute key is what prototypes
pass to dpi.data.fetch(). -->

## Test personas

Made-up citizens for prototypes, in this country's data formats. Cover at least: everything found, a fact out of date, no record, payment declined, can't sign in.

| Persona | Scenario | Notes |
|---|---|---|
| | Everything found and correct | |
| | Address out of date | |
| | No record in the registers | |
| | Payment declined | |
| | Can't be verified | |
