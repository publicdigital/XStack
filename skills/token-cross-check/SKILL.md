---
name: token-cross-check
description: Cross-check the whole of the government's design system (named in the country profile) across three surfaces – the published Figma library, the live Figma file, and the front-end code – and report what is missing, mismatched, or unpublished. Use when checking whether Figma and code agree, or whether the live design work has reached the people who consume it. Triggers on "cross-check", "does Figma match the code", "token drift", "compare Figma and CSS", "are the tokens in sync", "what's missing", "is the library up to date", "check the design system against the repo".
---

# Token Cross-check

This skill compares the government's design system across three surfaces and reports where they disagree – matches, mismatches, gaps, and drift. It reads and reports; it never edits any of them.

It anchors to the **Open platforms and standards** theme: the design system is a shared platform only if everyone builds from the same values. When the surfaces drift – which happens quietly – teams rebuild or regenerate from stale values without noticing. This skill is the audit layer that keeps the shared platform actually shared.

**Before you start, find the country profile** (see `profiles/README.md`): `.xstack/profile.md` in the project, or a bundled profile named in the project's `CLAUDE.md` (e.g. `xstack profile: barbados`). Its Design system section names the design system, its Figma library, its code repository, and its reference files.

The two reference files carry what you need before you start. The profile's **token file** (YAML) should hold the recorded cross-check findings, the code-to-Figma name mapping, and the scope guard. Its **design guide** holds the narrative. Read the recorded findings first, so you report new drift and do not re-open one that is already known. The Barbados profile's `design-tokens.yaml` (with its `cross_check_findings` section) and `design-guide.md` are the worked example.

If the profile has no token file, or there is no profile, ask the team for the design system's Figma library and code repository, and work from those. Every difference is then "new", because nothing is recorded – say so, and suggest the team starts a token file with the findings you report. Never invent a value or a mapping.

---

## The three surfaces you are comparing

Do not collapse these. A value can be right in one and wrong in another, and the gap between them is often the real finding.

1. **The published Figma library.** What linked files (the team's service or prototype files) and anyone reading the library actually consume. Read it with `search_design_system` – no node ID needed. It reflects the last time someone clicked Publish, so it can lag the live file, sometimes by a whole rename.
2. **The live Figma working file.** The current design work. Read it with `get_variable_defs` (and `get_metadata`) on a specific node. This needs a node URL or a node selected in the desktop app – see the node reality below.
3. **The code.** The token stylesheet and the component source in the design system's code repository (named in the profile). Read the files directly; this surface is fully enumerable.

The most valuable question this skill answers is often not "does Figma match code?" but "**has the live design work reached the library and the code at all, or is it stranded in the working file?**"

---

## Reading each surface – how to enumerate the whole system

All three surfaces can be read in full. Say in the report which surface each value came from.

- **The code** – read the repo files directly: the token stylesheet and every component folder. Fully enumerable.
- **The published library** – `search_design_system`, no node ID. It returns the published snapshot, so label its results as published. Search by group or hue to sweep – for example each hue name, "grey", each semantic group.
- **The live file** – read it by node, and you can reach the whole tree. Pass a page or container node ID to `get_metadata` and it returns that page's entire subtree – every component, variant, and node ID in one call. Then call `get_variable_defs` on each component node for its bindings. Walk the pages this way to cover the file.

One quirk to plan around: `get_metadata` with no node ID lists pages unreliably – it may return only the Cover page. Get the page node IDs another way: from a share URL (convert dashes to colons), or by reading a container you already know and walking from it. Do not conclude a page or component is absent because the no-arg listing did not show it – reach it by ID first.

A convenience tool, `list_file_components_for_code_connect`, returns the whole-file component graph without a node ID, but needs an Enterprise or Org Dev (Code Connect) seat. It is not required – page reads cover the same ground on any seat.

A thorough sweep, then: read the code and the published library in full, walk the live file page by page, and flag plainly what you could not read. Never let an unread surface look like an absence – "not published", "not read this pass", and "does not exist" are three different findings.

---

## Cross-check safely – these rules are not optional

1. **Apply the name mapping first.** The surfaces often name the same value differently – after a rename, for example, the code and the published library can sit on an old scale while the live file is on a new one. Compare by resolved hex and by role, never by name. If you compare names, every token looks like a mismatch. The mapping should be in the token file; if it is not, build it from resolved values and say so.
2. **Name the surface for every value.** Say whether a value came from the published library, the live file, or the code. A comparison that does not say which surface each side is from cannot be acted on.
3. **Reconcile against the recorded findings.** Findings recorded in the token file (`CC-01` and up in the worked example) carry a type and a status. Mark each difference as known (give its id and status) or new. Do not re-litigate a decided one.
4. **Report, never fix.** This skill edits nothing. Values the token file records as deliberately set, and its deferred accessibility issues, are decided values – flag them as expected, not as drift to fix. A difference is evidence for a person, not a defect to correct.
5. **Discover before scanning.** Enumerate what is on each surface first, then compare narrowly. A combined enumerate-and-compare pass truncates and reports a partial diff as whole.
6. **Convert node IDs.** Share URLs use dashes (`123-456`); the tools need colons (`123:456`). Convert before every call.

---

## What the skill compares – the whole system, and what is missing on each surface

Go layer by layer, and for each item ask three questions: is it present on all three surfaces, do the present ones agree in value, and if it is missing somewhere, is that a publish lag, a code gap, or a genuine absence.

- **Colour primitives** – the primitive colour collection against the CSS primitive properties, by the naming mapping.
- **Semantic tokens** – the semantic collection (Text, Surface, Border, Status, Focus, or whatever roles the system uses) against the matching CSS custom properties.
- **Component tokens** – each tokenised component (for example Button, Link, and the form controls) against its component CSS.
- **Components** – every component in the code package against the Figma component list, both published and live.
- **Spacing** – the spacing collection against the CSS spacing properties.
- **Typography** – the typography collection and its text styles against the CSS type scale.

Report the missing as clearly as the mismatched. A token in the live file but not the published library is stranded work. A component in the code but not in Figma is undocumented. A token in the code but not Figma is unscoped. Each needs a different person to act.

---

## Finding types

- **Match** – same resolved value across the surfaces that have it. No action; record it.
- **Naming only** – same value, different name (usually the old-versus-new scale). Awareness only.
- **Publish lag** – present and newer in the live file, but the published library (and often the code) still shows the old state. The live work has not been published. Flag for a publish, then a code update.
- **Missing in code** – in Figma but not the CSS or the React package. A scoping job for the developers.
- **Missing in Figma** – in the code but with no confirmed Figma presence. Check the scope guard before calling it missing; it may be unpublished rather than absent.
- **Gap** – scoped on neither side, or on one only, by design not yet done.
- **Intentional divergence** – a deliberate difference in technique (for example CSS `rgba` overlays where Figma flattens to solid hex). Document, do not flag as conflict.
- **Real conflict** – both sides set the same thing to genuinely different values. A person decides.
- **Suspected error** – a value that looks like a mistake on one side. Flag; do not assume which side is wrong.
- **Never-applied fix** – an agreed correction that never reached one side. Flag for correction.

---

## Output template

Write the report in the simplest words you can, for a reader who did not build the Figma file or the codebase – if it only makes sense to the person who named the tokens, it is not finished.

```markdown
# Token cross-check – [scope, for example whole system or Colour layer]

**Published library:** search_design_system on file [file key, from the profile]
**Live file:** get_variable_defs on [nodes read]
**Code:** [token stylesheet and component paths], [design system code repository]
**Read on:** YYYY-MM-DD

## Summary

[Two or three sentences. How aligned are the three surfaces, and the one or two things that most need a person. Lead with any publish lag – it is usually the biggest.]

## New findings

| # | Type | Item | Published library | Live file | Code | Recommended action | Owner |
|---|---|---|---|---|---|---|---|
| 1 | Publish lag | Colour rename | old scale (teal-00…) | new scale (teal-80…) | old scale | Publish the library, then update code | Design lead + dev |

## Known findings (already recorded)

| CC id | Type | Item | Status |
|---|---|---|---|

## Matches and intentional divergences

[So a later check does not re-open them.]

## What was not read

[Which surface, and why – a node not selected, an Enterprise-only tool, a file not fetched. Be explicit. An unread surface is not an absence.]
```

---

## A worked example – the colour rename

This example comes from the Barbados profile's design system, where a colour ramp was renamed in the live file. Reading all three surfaces for the teal ramp, with the name mapping applied.

- **Published library** (`search_design_system` for "teal"): `teal-00`, `teal-10`, `teal-40`, `teal-100` – the old four-stop scale.
- **Live file** (`get_variable_defs` on a node that uses teal): the new scale, `teal-80` and friends, and the semantic tokens that alias them.
- **Code** (`tokens.css`): `teal-00` … `teal-100` custom properties – the old scale.

By value, published and code agree; the live file is ahead. This is a **publish lag**: the rename lives only in the working file. The library that the service files consume, and the code, are both still pre-rename. The finding is not "teal is wrong" – it is "the rename has not been published, so nobody downstream has it yet." Recommended action: publish the library, then carry the rename into the code. Do not edit the live file to match the old names.

A second signal from the same reads: `search_design_system` for "text-primary" returns nothing, while the live file has the semantic `Tokens` collection bound on real components. That points to the whole semantic layer being unpublished. Flag it; confirm in Figma's publish view, since a search miss alone is not proof.

---

## What not to do

- **Don't compare by name.** Map the old scale to the new one first, then compare values. This is the most common way to report false drift.
- **Don't treat a search result as the live file.** `search_design_system` is the published surface. For what is true now, read the node.
- **Don't read an unpublished value as missing.** "Not in the published library" may mean "not published yet", not "does not exist". Check the live file before calling it a gap.
- **Don't fix any surface.** Report. Raise findings with a person. Never edit Figma or the code to resolve a difference.
- **Don't re-report a decided finding as new**, and don't treat a deliberate value (tokens the file records as deliberately set, the deferred issues) as an error.
- **Don't guess a node ID or a value you did not read.** A confident wrong comparison is worse than an honest "not read this session".

---

## When this skill isn't enough

- **Reading one component in depth.** To document what a single Figma component or token contains, use the `component-spec` skill. This skill compares surfaces.
- **Deciding what to do about the drift.** A cross-check reports the difference. Turning it into a plan – fix now, fix later, or confirm with the department – is the design review skill's job. This skill hands it the evidence.
- **Whole-file live enumeration.** You can cover the live file by walking its pages – `get_metadata` on each page node, then `get_variable_defs` per component – on any seat. Just be honest about which pages you actually read, and never report a partial walk as the whole file.
- **Generating the code.** Once a token is confirmed in sync, generating or updating the matching CSS or component is a build job – for `build-for-production`, not this skill.
