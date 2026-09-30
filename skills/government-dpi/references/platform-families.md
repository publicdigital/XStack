# DPI platform families

Many governments build on the same few open-source or reference platforms. Once you know which family a platform belongs to, you know where its docs are, what to check and what its screens look like, so the DPI mock can copy the shape of the real thing.

These are short pointers, not documentation. **Check everything against the platform's own docs and the country's own deployment.** A country can configure, rename or extend any of them. Record the family in `dpi.md` only when the country's docs, the DPI Map or the team confirm it.

---

## Identity

### MOSIP with eSignet

- **What it is:** MOSIP is an open-source foundational ID system. eSignet is its sign-in service, built on OpenID Connect, so services can use the ID to sign people in and receive verified claims.
- **How to recognise it:** the country's docs or the DPI Map's support organisations mention MOSIP. The sign-in URL often contains `esignet`.
- **What to check:** run `verify.py oidc <issuer>` on the country's eSignet issuer. MOSIP's own collaboration sandbox (`https://esignet.collab.mosip.net`) publishes claims such as `name`, `birthdate`, `address`, `phone_number` and `individual_id`, but a country's deployment can differ. Record the country's own list, not the sandbox's.
- **Screens to copy in the mock:** a hand-off to the national sign-in page, then a consent screen listing the claims the service asked for. Use the country's own name for the ID on screen.
- **In beta:** a standard OpenID Connect client. The service has to be registered with the country's eSignet operator, which usually needs an agreement.

### GOV.UK One Login (reference example)

- **What it is:** the UK government's sign-in and identity service. It is a useful, well-documented example of an OpenID Connect identity platform.
- **What to check:** `verify.py oidc https://oidc.account.gov.uk`. Its discovery document lists `email` and `phone_number`, and identity claims as vocabulary URLs, for example `https://vocab.account.gov.uk/v1/address` and `.../passport`. Identity claims come back only when the service asks for identity checking, not just sign-in.
- **Why it matters for other countries:** it separates signing in from proving identity. Many national platforms do the same. Ask which one the service needs.

### Any other OpenID Connect platform

If `verify.py oidc` finds a discovery document, the platform is OpenID Connect whatever its name. Record `claims_supported`, `scopes_supported` and `acr_values_supported` (assurance levels). If there is no discovery document, the platform may use SAML, a national API or a card reader. Ask the platform team, and treat it as tier 3 until you know.

---

## Payments

The DPI Map records **payment rails**: the national real-time payment systems that move money between banks and mobile wallets. Services rarely connect to a rail directly. They use a **government payment gateway** that sits on top of one or more rails. Record both in `dpi.md`, and make sure the mock copies the gateway the citizen actually sees.

### Mojaloop

- **What it is:** open-source software for building interoperable instant payment systems, run by the Mojaloop Foundation.
- **How to recognise it:** the central bank's or switch operator's docs mention Mojaloop, or the switch has a published FSPIOP API.
- **What to check:** whether government services can collect payments through it directly, or only through a gateway or a bank. That decides what the mock should show.

### Hosted payment page (GOV.UK Pay and similar)

- **What it is:** the most common gateway pattern. The service creates a payment, sends the citizen to a hosted payment page, and gets them back at a return URL. The service then asks the gateway for the payment's status, never trusting the redirect alone.
- **Screens to copy in the mock:** the hand-off to the gateway's own page, showing the amount, what it's for and the reference, then the outcome.
- **In beta:** create the payment server-side, keep the API key in a secret store, check the status after the return, and make retries safe so nobody is charged twice.

---

## Data exchange

In the DPI Map's snapshot of 31 March 2026, the most common technical base recorded for data exchange systems is X-Road. Next come an enterprise service bus (ESB), an API gateway, and UXP. Many entries are blank.

### X-Road

- **What it is:** open-source data exchange software, developed by the Nordic Institute for Interoperability Solutions (NIIS). Organisations join as members, and each service reads from another member's registers through secure servers, with every request logged.
- **How to recognise it:** the DPI Map's `technical_base` says X-Road, or the country's docs mention security servers and members.
- **What to check:** which registers are members and which services they publish. There is usually a catalogue for members, but it is rarely public. Ask the team or the coordination unit (the DPI Map often names it).
- **Screens to copy in the mock:** X-Road itself has no citizen-facing screen. Consent, if there is any, belongs to the service or a citizen portal. Check whether the law gives a legal basis to pull data without consent. If it does, the mock should say where the data came from rather than ask for consent. Record that in the consent model in `dpi.md`.

### UXP

- **What it is:** Cybernetica's data exchange platform, in the same family as X-Road. Treat it like X-Road, and check the vendor's and the country's docs.

### ESB or API gateway

- **What it is:** a general integration pattern, not a product. Every one is different.
- **What to check:** whether there's a published API catalogue or OpenAPI spec. If there is, run `verify.py openapi <url>`. If not, it's tier 3.

### Consented prefill (Myinfo-style)

- **What it is:** a pattern rather than a product. Singapore's Myinfo is the best-known example: the citizen signs in, sees exactly which facts a service wants from government records, agrees, and the form is filled in for them to check.
- **Why it matters:** it is the pattern `dpi-mock.js` copies by default. When a country has no consent layer, the mock still shows the pattern, tagged `[VERIFY WITH POLICY]`.
