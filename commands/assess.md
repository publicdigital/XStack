---
description: Run a self-assessment against your government's service standard (from the country profile), or the xstack baseline themes if there is no profile. Hands off to the delivery-manager agent and the service-standard-assessment skill.
argument-hint: [service name and phase being assessed for]
---

You are about to run a service-standard self-assessment for a government service. Hand off to the **delivery-manager** agent, coordinated with the other xstack agents per standard, using the **xstack:service-standard-assessment** skill.

Before you start, gather these from the user if they haven't already provided them:

- Service name and the department that owns it
- The phase being assessed for (alpha, beta, live)
- Where the evidence lives – team drive, repos, research notes, analytics dashboards, threat model
- Who's already given input and who still needs to

If the user hasn't provided this context, ask for it briefly using the AskUserQuestion tool. Do not invent evidence.

First, find the country profile (see `profiles/README.md`). If there is one, assess against the profile's own service standard, in its own order, citing each standard by its number and title. If there isn't, assess against the 14 themes in `references/service-standard-baseline.md` and say so once at the top. Use the template in `skills/service-standard-assessment/SKILL.md`. For each standard (or theme):

1. State the evidence (specific, with sources)
2. Rate it: `Met`, `Partly met with a plan`, `Not met`
3. Name the next action (owner, date)

Defer to the right agent for each theme. With a profile, use its mapping table to find which theme each of its standards belongs to:

| Baseline themes | Primary agent |
|---|---|
| User needs, Whole problem, Works first time, Continuous improvement | service-designer |
| Inclusion, Plain language, Findable | content-designer |
| Multidisciplinary team, Sustainable and reliable, Working in the open, Measuring performance | delivery-manager |
| Works first time, Right technology, Open platforms and standards, Measuring performance | developer |
| Trust, security and privacy | cyber-engineer |

End with a clear recommendation: Proceed / Proceed with conditions / Do not proceed. List the conditions with owners and dates.

Save the assessment to the workspace folder as `standards-assessment-[service-slug]-YYYY-MM-DD.md` and share the file link with the user.
