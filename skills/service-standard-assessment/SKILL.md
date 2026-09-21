---
name: service-standard-assessment
description: Self-assess a service against your government's service standard (from the country profile), or against the 14 xstack baseline themes when there is no profile. Use before any phase gate (discovery→alpha, alpha→beta, beta→live), at annual review in live, or any time the team wants an honest evidence-based view of where a service stands. Triggers on "service standard assessment", "standards check", "phase gate", "are we ready for beta", "are we ready for live", "honest assessment", "audit our service".
---

# Service Standard Assessment

This skill walks an agent (or a human reading the output) through the service standard with evidence. It produces a structured report that names what's working, what isn't, and what the team should do next.

**Before you start, find the country profile** (see `profiles/README.md`): `.xstack/profile.md` in the project, or a bundled profile named in the project's `CLAUDE.md` (e.g. `xstack profile: barbados`). Then work out which standard you are assessing against:

- **With a profile that has a service standard:** assess against the profile's own standard – every standard it lists, in its own order, using its own numbers and titles. Read the profile's full standard file (for example `.xstack/service-standards.md`) for the "How an agent checks" questions for each standard. Use the profile's mapping table to bring in the matching baseline theme's questions from `references/service-standard-baseline.md` wherever the profile's own questions are missing or thin. Any baseline theme the profile lists under "Not in our standard" (for example, Whole problem) goes under *Cross-cutting observations*, not as a rated standard.
- **Without a profile:** assess against the 14 themes in `references/service-standard-baseline.md`, in the order they appear there, using each theme's "How an agent checks" questions. Say once at the top of the report: "No country profile found, so this uses the xstack baseline. Run `/xstack:profile` to set one up."

Use the profile's terms throughout – what departments are called, who the platform team is, which shared platforms exist.

---

## When to use this skill

- **Before a phase gate** – discovery → alpha, alpha → beta, beta → live. This is the bar.
- **Annually in live** – services drift. Re-assess at least once a year.
- **After a major change** – a new owning department, a new vendor, a new policy, a back-office redesign.
- **When the team isn't sure** – an honest mid-sprint pulse-check.

Don't use it as a tick-box at the end. The assessment is for the team first, the panel second.

---

## How to run it

Work through every standard in the profile (or every baseline theme) in order. For each one, do three things:

1. **State the evidence** – not opinion, evidence. Numbers, screenshots, links, test reports, research transcripts, RAID-log entries.
2. **Rate it** – `Met`, `Partly met with a plan`, `Not met`.
3. **Name the next action** – what the team will do, by whom, by when.

A `Met` requires evidence. *"We have research with 18 citizens, three rounds of testing, transcripts in the team drive"* is evidence. *"The team has talked to users"* is not.

A `Partly met with a plan` requires a date and an owner. *"Measuring performance partly met. Analytics are wired for two of the four GDS baseline metrics. Owner: developer. Date: end of sprint 6."*

A `Not met` requires either a plan to meet it or a written reason it isn't applicable to this service.

Cite the profile's own standard by its number and title (e.g. "Standard 4 (Use simple and relatable language)"); without a profile, cite the baseline theme by name.

---

## Output template

Use this Markdown structure exactly. Don't decorate it – the panel will read many of these and consistency helps. There is one section per standard in the profile, or one per baseline theme.

```markdown
# Service Standard Assessment – [Service name]

**Phase being assessed for:** Discovery / Alpha / Beta / Live
**Date:** YYYY-MM-DD
**Assessed by:** [names of the team and the assessor]
**Department:** [the department that owns the service, in the profile's term]
**Assessed against:** [the profile's standard, by name – or "xstack baseline themes (no country profile found)"]

## Summary

[Three to five sentences. Where the service stands overall. The biggest strengths. The biggest risks. The recommendation.]

## Recommendation

Proceed / Proceed with conditions / Do not proceed

[If conditions: list them, with owners and dates.]

## At a glance

| Standard (or theme) | Baseline theme(s) | Rating |
|---|---|---|
| [Profile: "1 – [title]" / Baseline: "User needs"] | [from the profile's mapping; omit this column without a profile] | Met / Partly met with a plan / Not met |
| […one row per standard or theme…] | | |

---

## [Profile: Standard 1 – [title]] / [Baseline: User needs]

**Rating:** Met / Partly met with a plan / Not met

**Evidence:**
- [Bullet points of evidence]

**Next action:**
- [Specific next action, owner, date]

---

## [Profile: Standard 2 – [title]] / [Baseline: Whole problem]

[same shape]

---

[…through every standard in the profile, or all 14 themes…]

---

## Cross-cutting observations

[Things the standard doesn't quite capture but that matter – including any baseline theme the profile's standard doesn't cover. Risks the team is carrying. Decisions the owning department needs to take.]

## Appendix: research and testing log

[Links to research notes, testing reports, threat model, accessibility audit, performance test results, etc.]
```

---

## What "met" looks like per theme

A pocket version, by baseline theme. With a profile, use its mapping table to find the theme for each of its standards, then read the profile's full standard for the per-standard guidance. Without one, read `references/service-standard-baseline.md`.

| Theme | Met looks like |
|---|---|
| User needs | At least 5 user interviews per major round of work, transcripts, named user needs, evidence of iteration based on them |
| Whole problem | The journey before and after the team's part is mapped; other departments involved have been spoken to; offline and assisted channels give the same outcome |
| Inclusion | WCAG 2.2 AA (or the level the law requires) tested, assisted-digital path designed, low-data tested, under-represented users researched with, available in the languages users speak |
| Plain language | Reading-age check passed, swap list applied, plain-language testing with citizens documented |
| Works first time | Usability testing with a meaningful number of unaided completions, one-thing-per-page, clear errors and confirmation |
| Multidisciplinary team | Service designer, content/interaction designer, researcher, developer, delivery manager, subject-matter expert all named and reachable (or an xstack agent openly standing in); senior decision-maker engaged |
| Continuous improvement | Live user research scheduled, capacity for substantive change, retired-features process |
| Trust, security and privacy | Threat model, DPIA where warranted, pen test, secure-by-design implementation, plain-language privacy notice meeting the country's data protection law |
| Measuring performance | Four GDS baseline metrics tracked, published, used to prioritise; qualitative feedback triangulated |
| Right technology | Technology choice justified against cost / scale / accessibility / openness, platform team consulted, no single-vendor lock-in |
| Open platforms and standards | Shared platforms (identity, registers and lookups, payments) used where applicable, the government design system in use, common components reused |
| Working in the open | Public repo, weeknotes published, regular show-and-tells with attendance from outside the team |
| Sustainable and reliable | Named live team, rolling budget, documented codebase, monitoring and support in place, no single-vendor dependency |
| Findable | Verb-based service name, SEO checked, signposting from related services and offline channels |

---

## A worked example fragment

Without a profile, the heading is the theme name. With a profile, it is the profile's standard – for example "Standard 4 – Use simple and relatable language" with the Barbados profile.

```markdown
## Plain language

**Rating:** Partly met with a plan

**Evidence:**
- Content audit applied the swap list across all 14 pages – complete
- Reading-age check (Flesch–Kincaid) currently averages grade 8; target is grade 5 by end of sprint 7
- Plain-language testing with 6 citizens completed; 4 understood every page first time, 2 stuck on the eligibility page
- Eligibility page rewritten and retested with 3 further citizens; 3/3 understood first time
- Confirmation page rewritten in plain language, tested with 5 citizens, 5/5 understood next steps

**Outstanding:**
- The legal text supplied by the department's lawyers on the consent screen still reads at grade 12
- Two error messages still use "verify"; one uses "submit"

**Next action:**
- Content & interaction designer to redraft the consent screen with the department's legal team
- Content & interaction designer to fix the three remaining swap-list violations
- Both complete by sprint 7 close, evidence in the next assessment

**Theme:** Plain language. Also supports **Principle 4** (do the hard work to make it simple).
```

---

## Common failure modes

- **Opinion as evidence.** "Users like it." How many? Where's the recording?
- **Plan without a date.** "We'll do that next sprint." Which sprint? Who owns it?
- **Hidden non-mets.** Pretending Trust, security and privacy is met because nobody has audited it yet. If you haven't checked, it isn't met.
- **All-met assessments.** If every standard is `Met` for an alpha or early beta, the assessment isn't being honest.
- **Cargo-culted research.** "We interviewed 5 users" without saying who, where, what they were asked, or what we learned.
- **Skipping standards that don't map neatly.** Every standard in the profile gets a section, even if its mapping to the baseline is loose.

---

## What to do with the assessment

1. Read it with the team. Disagreements are useful – they reveal what the team is carrying that the assessor missed.
2. Share it with the owning department. The department owns the service; they need to see the evidence.
3. Publish it (where the security context allows). **Working in the open**.
4. Track the next actions in the RAID log.
5. Re-assess at the next phase gate or at least annually.

A self-assessment isn't a panel assessment. The panel will be tougher. That's the point.
