# The six checks

Run all six on every form. Each one leaves a trace in the spec, even when it finds nothing – the coverage check ends with a "Checks run" line.

---

## 1. Legal status

**Look for:** an Act, ordinance, decree or code; a schedule ("First Schedule", "Schedule 3"); a section, regulation, rule or article number; a statutory instrument number; "prescribed form"; "made under". Look at the header and footer as well as the body. The inventory script's `legal_citation` hints are a starting point. They're English-only and miss things.

**When you find one:**

- Put the citation in section 1 exactly as printed.
- Add the **Legal status** callout to section 1: the wording may be fixed in law, and rewording or restructuring needs `[VERIFY WITH POLICY]`.
- Tag every row where you suggest dropping, merging, rewording or reordering with `[VERIFY WITH POLICY]`.
- Put "Is the form's wording fixed by [citation]? Can the questions be asked in a different order or form online?" in the questions for the department.

**Be precise about what you know.** A form that sits in a schedule to an Act is almost certainly prescribed. A form that only *mentions* an Act in its guidance notes may not be. Say which it is. Don't claim a form is prescribed under legislation the form doesn't cite.

## 2. Signatures, oaths, witnesses and notarisation

**Look for:** signature lines; "declare", "swear", "affirm", "solemnly"; "sworn before me"; witness name and address; justice of the peace, notary, commissioner for oaths, magistrate, police officer, "countersignatory"; "executed as a deed"; seals and stamps; "in the presence of".

**When you find one:**

- List each in section 5, with what the paper requires: who signs, who witnesses, in whose presence, with what evidence.
- Call it out as **the likely blocker to a fully digital service**. A sworn oath or a witnessed deed usually can't be replaced by a tick box without a change in law or a ruling.
- Note whether the profile's law and policy section names an e-signature or electronic transactions law. If it does, cite it as something to check, not as an answer. If it doesn't, don't name one.
- The digital treatment is a question, not a design: "Declaration page – but whether this satisfies the oath is `[VERIFY WITH POLICY]`".

## 3. Fees

**Look for:** "fee", "prescribed fee", "amount paid", currency symbols, "receipt", "stamp", "revenue stamp", "cash office".

- If the amount is printed, record it exactly, with the currency as printed.
- If it isn't – including "Prescribed Fee ____" – write **"Amount not on the form – unknown"** and flag `[VERIFY WITH DEPARTMENT]`. Don't fill it in from memory, from a similar form, or from another country.
- Receipt numbers, cashier stamps and "paid" boxes are evidence of a manual payment process. Treat them as **Drop or challenge** (if the profile has a payment platform, it gives a reference) or **Back office**.
- The same rule applies to processing times, validity periods, renewal periods, age limits, row limits and lists of accepted reasons. If the form doesn't say it, it is unknown.

## 4. Sensitive questions

**Look for:** physical or mental health, disability, addiction or "intoxication", criminal convictions, cautions or charges, immigration status, nationality, finances and debts, sex, gender, ethnicity, religion, sexuality, marital status, pregnancy.

- Keep the legal meaning. The **Paper asks** column holds the original wording.
- Note stigmatising or outdated language ("unsound mind", "alcoholic", "lunatic", "illegitimate") in the Flag column.
- Any plain-language rewrite is a **suggestion** in the treatment column, tagged `[VERIFY WITH POLICY]` – changing the words can change what the law is asking.
- Note when the question is wider than it may need to be ("ever", "any offence", "anywhere") – that's a question for the department, not something to narrow yourself.
- Recommend `/xstack:threat-model` in the hand-off, and say which items drive it.

## 5. Ambiguity a citizen would hit

Look for places where a careful citizen would hesitate or answer inconsistently:

- two questions that look the same to a citizen but mean different things in law (for example "any form of mental disorder" and "certified as being of unsound mind")
- terms of art without explanation ("transferor", "consideration", "address for service", "permanent resident")
- options that overlap or leave gaps
- a question whose answer depends on another person (a spouse's details, an employer's phone number)
- "details" with no indication of what details
- dates or periods with no start point ("during the last 5 years" – up to when?)

Flag each with `[VERIFY WITH USERS]`, plus `[VERIFY WITH DEPARTMENT]` where the department must say what it means.

## 6. Language

- Note the form's language. Compare it with the team's working language and the languages the profile lists.
- If the country is multilingual or the form exists in more than one language, say so, and note whether the versions might differ. Don't assume they match.
- Terms of art drift in translation: "address for service" is not "address for correspondence". If a version in the team's language exists, compare the legal terms against it rather than translating them yourself, and flag any term you had to render on your own `[VERIFY WITH POLICY]`.
- Never translate legal wording silently. Keep the original in **Paper asks**. If you add a translation, put it in brackets and mark it as yours: "(our translation)".
- The inventory script's hints only work in English. For other languages, read the form yourself for citations, fees and signatures.
