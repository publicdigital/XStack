---
name: form-to-spec
description: Turn an existing paper or PDF government form into a structured form specification – every numbered item kept, sorted into ask, lookup, conditional, add-another, government already holds this, drop or challenge, and back office – that /xstack:build takes as its brief. Reads fillable PDFs, flat PDFs, scans, photos and Word documents. Uses the country profile for lookups, standards and verification owners, and assumes nothing about any country. Flags legal status, signatures and oaths, fees, sensitive questions and language. Use whenever a team has a paper form, a PDF form, a "download this form" page or a scanned application and wants to digitise it, prototype it, understand what it asks or work out what government already knows. Triggers on "/xstack:form-to-spec", "form to spec", "digitise this form", "turn this PDF into a service", "spec this form", "what does this form ask", "paper form", "fillable PDF", "form inventory".
---

# Form → spec

This skill turns a government form into a **form spec**: a faithful, item-by-item account of what the department asks today, and how each item could be handled in a digital service. The spec is the brief for `xstack:brief-to-prototypes`. It is the **form → spec → build** entry point.

It supports the **Whole problem**, **Plain language**, **Works first time**, **Open platforms and standards** and **Trust, security and privacy** themes.

A spec describes what the department asks, **not what users need**. A paper form is decades of policy, workarounds and paper constraints set in print. Say so at the top of every spec, and don't let anyone treat the spec as evidence of a user need. That still comes from research (**User needs**).

---

## Before you start

**Find the country profile** (see `profiles/README.md`): `.xstack/profile.md` in the project, a bundled profile named in the project's `CLAUDE.md` or `AGENTS.md`, or one the user names. Read:

- `profile.md` – terms, service standard, design system, data formats, law and policy, **verification owners**
- `dpi.md` if it exists – the platforms and the **data catalogue**. The catalogue is the list of lookups the spec may use. The Shared platforms table in `profile.md` counts too.

If there is no profile, say once at the top of the spec: "No country profile found, so this spec uses the xstack baseline and assumes no lookups. Run `/xstack:profile` to set one up." Then every item government might already hold becomes a **lookup opportunity**, never a lookup.

**Gather the inputs:**

- The form: PDF (fillable or flat), scan or photo, or Word document. Required.
- The department's web page about the service. Optional. It may give the fee, processing time or eligibility – cite it if you use it.
- The language the team works in, if it isn't obvious from the profile.

**Everything country-specific comes from the profile or the form.** The names of platforms, agencies, registers, standards, ID numbers and laws appear in the spec only if the profile or the form itself names them. If you know something about a country from memory, it still doesn't go in – mark the gap for verification instead. That is what makes a spec trustworthy in any country.

---

## Step 1 – Inventory the file

Run the inventory script (it needs `pypdf`, and `pypdfium2` to render pages; without them it says what it couldn't do):

```bash
python3 scripts/inventory.py <form> --render <work-dir>/pages --text-out <work-dir>/form.txt
```

It reports: page count, title, producer and language metadata, any **fillable (AcroForm) fields** with their names, types and pages, the text of each page with its layout, whether the PDF looks scanned, and **hints** – possible legal citations, fees, signature and oath wording, "official use" sections and form numbers. Hints are English-language patterns for you to check against the form. They are never facts.

Then decide how to read it:

- **Fillable PDF:** the field list is a checklist, not the spec. Field names are often meaningless ("Text1", "13"). Match each field to the printed label and number.
- **Flat PDF with a good text layer:** read the text, then **look at the rendered pages** wherever layout carries meaning – tables, tick boxes, Yes/No columns, signature blocks, boxes for official use. Text extraction loses these.
- **Scan or photo:** read every page visually. Where something is illegible, write `[illegible]` in the row and flag it `[KNOWN GAP]`. Never guess a word.
- **Word document:** read the text, and say in the spec that Word exports lose tick boxes and signature lines. Ask for the PDF if layout matters.

Record for section 1 of the spec: title, form number, any legal citation (Act, schedule, section, regulation, rule, statutory instrument), language, page count, producer, and the owning authority **only if the form states it** or a source the form cites confirms it.

## Step 2 – Extract every item faithfully

Go through the form in order and list **every item a person or an official writes, ticks, signs or attaches**, with the form's own numbering (1, 1a, 5(c), Panel 8, Part B Q3). Where the form doesn't number something – a declaration, a signature, a witness block, a receipt box – give it a label in brackets that says where it is: `[Decl]`, `[Sig]`, `[Witness]`, `[Office 1]`.

Capture:

- sub-questions and "if yes, give details" follow-ups as their own rows
- fixed-row tables – note how many rows the paper allows
- tick boxes and Yes/No pairs – the options exactly as printed
- signatures, declarations, oaths, affirmations, witnesses, notaries, justices of the peace, commissioners for oaths, countersignatories
- fees, "fee paid", receipt numbers and stamps
- "for official use", "report of the officer", approval and back-office sections – even when they are empty boxes
- guidance notes that change what someone must do (for example "attach Form 7 if…") – as a note on the row they affect

Ignore page furniture: repeated "continued" headers, page numbers, footers, copyright lines. Mention in the coverage check that you ignored them.

Keep the form's wording in the **Paper asks** column, shortened only with `…`. Never paraphrase legal wording there.

## Step 3 – Group into sections a citizen would recognise

Group the items into sections such as "About you", "Where you live", "Your health", "The firearm", "Referees", "Paying", "Declaration". Keep the form's numbering on every row, so the original order can always be rebuilt. Moving an item to a different section is fine. Losing it is not.

## Step 4 – Classify each item's digital treatment

Give each row one main treatment, plus any that also apply (for example "Conditional · Add-another"). Read `references/treatments.md` for how to choose, with examples.

| Treatment | Means |
|---|---|
| **Ask** | The citizen answers it. One thing per page. Give the component: text, textarea, radios, checkboxes, date, number, add-another, upload, select |
| **Lookup** | A lookup **listed in the profile** provides it. Name the lookup exactly as the profile does. Never manual fields for data a lookup provides – show a confirm step instead |
| **Lookup opportunity** | Government plausibly holds it (identity, company, vehicle, property, licence, tax), but the profile has no lookup for it. Ask it for now, and list it in section 9 |
| **Conditional** | Shown only after an earlier answer. Say which answer, by item number |
| **Add-another** | Replaces fixed rows. If the paper limits the rows, flag the limit as probably a paper constraint `[VERIFY WITH DEPARTMENT]` |
| **Government already holds this** | The owning department or another part of government probably has the answer – for example a previous licence it issued. Not a lookup until someone confirms a route |
| **Drop or challenge** | Legacy or unjustified: honorific titles, marital surname rules, phone numbers for old addresses, receipt serial numbers, "Telephone number" for an employer. Say why, and who must agree |
| **Back office** | Filled in by officials. Not shown to citizens. Goes in section 6 |

**Never assume a lookup exists.** If it isn't in the profile's data catalogue or shared platforms table, it is an opportunity, however obvious it seems.

## Step 5 – Flag everything uncertain

Every row that rests on an assumption gets a tag in the **Flag** column, using xstack's tags:

- `[VERIFY WITH USERS]` – only citizens can tell us
- `[VERIFY WITH DEPARTMENT]` – the department that owns the form
- `[VERIFY WITH PLATFORM]` – the team that owns a shared platform or lookup
- `[VERIFY WITH POLICY]` – a legal or policy check
- `[VERIFY WITH DATA]` – analytics, volumes or research data
- `[KNOWN GAP]` – we know it isn't right yet

If the profile has a **verification owners** table, add the owner it names after the tag, for example `[VERIFY WITH PLATFORM] (national digital agency)`. If it doesn't, use the tag alone. Don't name an agency the profile doesn't name. Say in a few words what needs checking: "Is 4 a legal limit or a paper one?"

## Step 6 – Run the checks, every time

Read `references/checks.md` and run all six. Each produces something in the spec, even if it's "Checked – none found".

1. **Legal status.** If the form cites legislation (a schedule, regulations, a section, a statutory instrument), say so **prominently in section 1**. Its wording and structure may be fixed in law, so any rewording, reordering, dropping or merging needs `[VERIFY WITH POLICY]`. Don't claim the form is prescribed unless the form says so – "cites the X Act, Schedule 1, so it may be prescribed" is the honest version.
2. **Signatures, oaths, witnesses, notarisation.** Call these out in section 5 as the likely blocker to a fully digital service. Name what the paper requires (sworn before a justice of the peace, witnessed, executed as a deed). Never assume the profile's e-signature law allows a digital equivalent unless the profile says so.
3. **Fees.** If the form doesn't state the amount, write "Amount not on the form – unknown" and flag it. Never invent a fee, processing time, row limit, eligibility rule, validity period or accepted reason. If the department's page gives one, cite the page.
4. **Sensitive questions** – health, mental health, addiction, convictions, immigration, finances, protected characteristics. Keep the legal meaning. Note stigmatising wording ("unsound mind", "alcoholic"). Any plain-language rewrite goes in the row as a *suggestion* with `[VERIFY WITH POLICY]`. Mention the threat model in the hand-off.
5. **Ambiguity a citizen would hit.** Two questions that look the same ("mental disorder" and "certified as of unsound mind"), terms of art, overlapping options, a question whose answer depends on who is filling it in. Say what the citizen would struggle with.
6. **Language.** If the form isn't in the team's working language, or the country is multilingual, say so. Don't translate legal wording silently – keep the original in **Paper asks** and give any translation in brackets, marked as yours.

## Step 7 – Questions for the owning department

Write the **five or so** questions whose answers would unblock the most assumptions. Rank them. Each one says what it unblocks: "Is the wording of Form A fixed by the Act's schedule? (unblocks rewording in sections 2–6, rows 9–13, the oath)". Ask about what is legally required, not about design preferences.

## Step 8 – Write the spec and hand off

Write `form-spec.md` using `references/spec-template.md`, with its ten sections in order. Use British English and en dashes (–) for xstack's own text, unless the profile sets another locale. Keep the form's own spelling in **Paper asks**.

Then do the **coverage check** (section 10) properly: list every numbered item on the form and the row it maps to. If an item has no row, the spec isn't finished. Start each row with the item's number as the form prints it ("5(a)", "Panel 8"), then a short label.

Count the same way every time, so two specs of the same form agree: **numbered items** are every number and lettered sub-item the form prints (Form X's 1–27 plus 5(a)–(d) is 31), **rows** are those items after splitting follow-ups and sub-lines, and **unnumbered items** are the bracketed ones. Write it as "31 numbered items, 42 rows, plus 6 unnumbered – all mapped".

End your reply to the user with:

- where the spec is, and the coverage count
- the biggest blockers (usually the legal status and the signature or oath)
- the next step: `/xstack:build` with the spec as its brief. Prototypes built from a form spec carry a coverage table showing how every form item is asked, looked up or deferred.
- if the form collects sensitive data, suggest `/xstack:threat-model`. If it has a significant back office (an officer's report, an approval chain, a referee check), suggest a service blueprint (`xstack:service-blueprint`).

---

## What this skill does not do

- **It doesn't design the service.** No prototype variants, page flows or hypotheses – that's `/xstack:build`. Treatments and component types are as far as it goes.
- **It doesn't treat the form as the user need.** The spec says what the department asks.
- **It doesn't fill gaps from memory.** No fees, times, limits, rules, agencies, platforms or legal facts unless the form, the department's page or the profile states them.
- **It doesn't assume any country's platforms, standards or laws.** Those come from the profile.
- **It doesn't drop anything silently.** Every item is in the coverage check, including the ones marked drop or back office.
