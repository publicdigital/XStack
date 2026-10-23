# Brief – Apply for the Household Support Grant

> **Fictional country, synthetic discovery.** Kestria is a fictional country (`profiles/kestria/`). There has been no real research. The findings below are a **demo brief** made from the profile's world bible (`world.md`) so `/xstack:build` has something evidence-shaped to work from. Treat every finding as `[VERIFY WITH USERS]`. In a real team, this brief would come from `/xstack:discover`.

**Profile:** `xstack profile: kestria`
**Owner:** Social Protection Agency (SPA), with Kestria Digital Service (KDS)
**Paper form today:** SPA/HSG-1, six pages (not yet made; no form spec)

## The service today

- The **Household Support Grant (HSG)** pays **K 1,500 a month** to about 610,000 low-income households.
- Eligibility depends on the household being in the **National Social Registry** with a welfare score in the lowest bands. Households already in another SPA cash programme can't get the HSG as well. `[VERIFY WITH POLICY]`
- **How people apply:**
  1. Fill in the paper form SPA/HSG-1 at a district office.
  2. Bring the KestriaID cards of every adult in the household.
  3. A village committee confirms the household's circumstances.
  4. SPA decides.

  This takes 3–5 months. `[VERIFY WITH DEPARTMENT]`
- **Payouts:** since 2025, payouts go over KesPay to the mobile money or bank account linked to the applicant's KUIN, or as cash at a post office.
- **The registry:** it's re-surveyed every 3–4 years, so many households that have become poor since the last survey aren't in it, or are in a higher band.

## What we (synthetically) learned

1. People make 2–4 trips to the district office, often a long and costly journey, to apply and to chase their application.
2. The form asks again for everything SPA already holds: household members, ages, KUINs and address.
3. The person who looks after the household's money is often a woman who doesn't own the registered phone, or shares it. Payouts to the "head of household's" number can go to the wrong person.
4. Many households that need the grant are **not in the registry**, or their record is out of date: a new baby, a death, someone has moved away. For them, the service has to start a survey, not make a decision.
5. Fake "government grant" SMS scams are common. People are wary of links in messages and of anyone asking for wallet PINs.
6. Many applicants have low literacy. Vell speakers in the Northern Plains and Sora speakers on the coast want to use their own language.
7. CSC officers and village digital champions already help people with online services on their own devices.

## The cohort

- **Who:** low-income households, mostly rural, concentrated in the Northern Plains, Lake Region and Highlands
- **Phones:** under half own a smartphone. Many share a phone. 2G or 3G with small data bundles.
- **ID:** 52–78% of adults have a KestriaID, depending on region
- **Accounts:** about two-thirds have a mobile money account, few have a bank account, and some have neither

## Users' need

> As someone looking after a household that's struggling, I need to get regular help with money without travelling repeatedly or proving things government already knows, so that I can feed and keep my family.

## Constraints

- **Kestria Digital Service Standard:**
  - Point 3 (languages, no-KUIN route)
  - Point 5 (once-only)
  - Point 11 (any network)
- **National Identity Act 2020, s.19:** no service may refuse someone with no KUIN where an alternative route is reasonable.
- **Data Protection Act 2022:**
  - SPA uses public task (s.13) for registry data
  - health and disability are sensitive data (s.15)
- **Payouts:** must go through the Treasury disbursement service on KesPay. The service never collects wallet PINs.

## Three hypotheses (for service-designer review)

| # | Name | The bet | Strongest for | Weakest for |
|---|---|---|---|---|
| 1 | **Once-only, phone-first** | The citizen signs in with KestriaID. We pull their household, programmes and payout account, and they confirm rather than retype. Eligibility is shown before they apply. About 6 pages for a household already in the registry. | People with a smartphone and a working KestriaID phone number who are in the registry | People not in the registry, people with no KUIN, shared phones |
| 2 | **Assisted at a Citizen Service Centre** | A CSC officer or village digital champion runs the service on their own device with the citizen beside them. The citizen signs in by fingerprint (level 3). Household changes and "not in the registry" become a booked survey visit, not a dead end. | No smartphone, no working phone number, low literacy, Vell and Sora speakers, not in the registry | People who can't easily reach a CSC (the rainy season in the north) |
| 3 | **Proactive offer by SMS** | SPA finds likely eligible households in the registry and texts them a short code (no link) to type in at `gov.kestria.test/hsg` or `*999#`. The citizen confirms the household and who gets paid, and that's it – no application. | Households already in the registry with a working phone | Anyone not in the registry. Raises scam and trust questions. |
