# Choosing a digital treatment

One main treatment per row, plus any that also apply. When two seem to fit, use the order below: the first that fits is the main one.

1. **Back office** – an official fills it in. It never appears to the citizen.
2. **Lookup** – the profile lists a lookup that returns it.
3. **Government already holds this** – the owning department, or the authority that issued something, probably has it, but there's no lookup in the profile.
4. **Lookup opportunity** – a register plausibly holds it, but the profile has no lookup.
5. **Drop or challenge** – no clear reason to ask it.
6. **Conditional** / **Add-another** – shape modifiers on an ask.
7. **Ask** – the citizen is the only source.

---

## Lookup – only when the profile says so

A lookup is real only if it is in the profile's `dpi.md` data catalogue or its Shared platforms table. Name it as the profile does, and say which fact it returns:

> Lookup – [identity platform, as the profile names it] returns full name. Show it with "Is this correct?" and a way to change it.

Rules carried over from `references/dpi-baseline.md`:

- Confirm, don't prefill silently.
- Always have a manual route for people the lookup can't find or who refuse.
- Pull only what the decision needs. A form asking for date of birth to check age needs "over 18?", not the date.

If the data catalogue marks a fact as often out of date, say so in the Flag column.

## Government already holds this

Use this when the department that owns the form, or the authority named on the form, is the source:

- "Particulars of licences held" on a licence application – the licensing authority issued them
- "Have you made any previous applications?" – the department has the applications
- A permit number the same department issued

It isn't a lookup until someone confirms there's a way to reach the data. Flag `[VERIFY WITH DEPARTMENT]`.

## Lookup opportunity

Use this when a register plausibly holds the answer and the profile doesn't list it:

- identity facts (name, date of birth, place of birth, nationality) when the profile has no identity lookup
- company details by registered number
- vehicle details by registration
- property or land by title or parcel number
- passports, visas and immigration status
- professional registrations, tax status, benefits

Don't name the register's owner unless the form or profile does. List every opportunity in section 9.

## Drop or challenge

Legacy fields with no obvious use in a digital service:

- honorific titles (Mr/Mrs/Miss) and "married women: surname before marriage" – ask for "previous names" neutrally if names are needed at all
- telephone numbers for previous addresses or employers
- receipt serial numbers, cashier stamps, "paid" boxes – a payment platform gives a reference
- "Length of time employed there" when nothing in the form uses it
- signature dates that the system records anyway

A challenge is a question, not a decision. Say why, and tag who must agree – usually `[VERIFY WITH DEPARTMENT]`, plus `[VERIFY WITH POLICY]` when the form is in legislation.

## Conditional

Name the trigger by item number: "Conditional – only if 9 is Yes." "Conditional – only if 4 is not a citizen or permanent resident."

## Add-another

Use it for fixed-row tables and repeated blocks (firearms 1–4, referees 1–3, addresses). Give the fields in each item. If the paper fixes a number, flag it:

> Add-another (calibre, maker, type, serial number). Paper allows 4 rows – probably a paper limit `[VERIFY WITH DEPARTMENT]`

If the number is a real requirement ("3 referees"), keep it as a minimum and say where it comes from – the form, or unknown.

## Ask

Give the component: text, textarea, number, date, radios, checkboxes, select, upload, add-another. One thing per page. Suggest a component only – page design is `/xstack:build`'s job.
