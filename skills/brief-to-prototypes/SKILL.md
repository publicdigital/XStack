---
name: brief-to-prototypes
description: Turn a brief or a problem statement into multiple clickable HTML prototypes ready for user testing, in your government's design system (from the country profile) or the xstack neutral style, with assumptions surfaced inline. Use this when the team has a brief and wants to skip straight to testable artefacts instead of waiting weeks for the first prototype. Triggers on "build me a prototype", "turn this into a service", "give me something to test", "what could this look like", "/xstack:build", "alpha prototypes for", "candidate alphas", "multiple alphas".
---

# Brief → testable prototypes

This skill is the build engine in xstack. It takes a brief and produces **multiple** working HTML prototypes the team can put in front of citizens within hours, not weeks. Each prototype encodes a different design hypothesis. Each surfaces its assumptions so the team knows exactly what to validate in testing.

It supports the **User needs**, **Inclusion**, **Plain language**, **Works first time** and **Open platforms and standards** themes. It explicitly does **not** replace user research – it makes user research faster to feed back into.

For the larger workflow this sits inside, read `PLAYBOOK.md` – the *Rapid prototyping loop* section.

**Before you start, find the country profile** (see `profiles/README.md`): `.xstack/profile.md` in the project, or a bundled profile named in the project's `CLAUDE.md` (e.g. `xstack profile: barbados`). Use its standard, design system, platforms, terms and data formats. If there is no profile, use `references/service-standard-baseline.md` and `references/house-style.md`, and say so once at the top of the build's README.

---

## When to use

- The team has a problem statement (formal or informal) and wants to feel three candidate approaches
- The team has been talking about a service in the abstract and the conversation has stalled
- The department wants to see something concrete before the next meeting
- Discovery is ending and the team needs alphas to take into testing
- A senior decision-maker is asking "what would it look like?" and the team needs an honest answer

**Do not use this skill to skip discovery.** A prototype built without research is a guess made visible. The **User needs** theme still applies – the brief feeding into `/xstack:build` should be evidence-led even when the build is fast.

---

## What this skill produces

For every run, a folder containing:

| File | Purpose |
|---|---|
| `README.md` | Orientation – the brief, the three hypotheses, how to test them |
| `prototype-1-[name]/index.html` | Candidate 1 as a single clickable HTML file |
| `prototype-2-[name]/index.html` | Candidate 2 |
| `prototype-3-[name]/index.html` | Candidate 3 (when warranted; sometimes 2 is enough) |
| `assumptions.md` | Consolidated list of assumptions across prototypes, each tagged with severity and validation method |
| `test-plan.md` | User-testing plan for the three prototypes |

The prototypes are **self-contained single-file HTML**. They render in any browser. Their look comes from the profile's design system. If the profile has a `design-system.md` (written by `/xstack:design-system`), follow it exactly: its tier says whether to link the published stylesheet (tier 1), inline an approximation of its tokens (tier 2) or use the neutral style (tier 3), and it gives the page chrome and the component markup to use. Otherwise, when the profile names a published stylesheet that is reachable, link to it, or inline an approximation of its tokens from the profile's design-system files. When there is no profile, or the profile has no design system, use the **xstack neutral style** from `references/house-style.md` (the inline CSS below).

---

## Always produce more than one

The single most important rule of this skill: **never generate just one prototype**.

If a brief feels like it has one obvious answer, that's a sign the team hasn't questioned the brief hard enough. Generate at least two genuinely different design hypotheses. Three is better.

Examples of *genuinely different*:

- Phone-first end-to-end vs. assisted-digital primary
- Citizen-mediated vs. institution-mediated (e.g. doctor vs. hospital HR)
- Single-form vs. progressive disclosure across multiple sessions
- New service vs. better signposting to an existing one
- Build vs. integrate with a shared platform

Examples of *not different enough* (don't do this):

- Three prototypes that vary only in copy
- Three prototypes that vary only in colour or layout
- Three prototypes that all assume the same back office

---

## The prototype anatomy

Every prototype has:

### 1. The chrome (always)

- The official government banner – the profile's wording, or "This is a prototype of a [Country] government service." in the neutral style
- The header – the design system's header, or in the neutral style a `--xs-primary` bar with the service name only (no crest or logo)
- The alpha phase banner ("alpha – this is a prototype, don't use it for real")
- A second xstack banner naming the prototype variant and offering a toggle for the assumptions panel
- The footer – the design system's footer, or a plain neutral footer with privacy, accessibility and contact links

If the profile names a design system, use its chrome and components. Don't redraw them. The chrome stays consistent across the three prototypes. That way the team is testing the journey, not the chrome.

### 2. The journey (varies by hypothesis)

The standard form flow: **Start → question pages → Check Your Answers → Confirmation**. Each prototype implements this skeleton with the variant's own twist. If the profile has service patterns (standard pages, field blocks), use them.

Each question page asks **one thing** unless the questions are tightly related (**Plain language** / GOV.UK Service Manual). Back links on every page except Start. Continue button at the bottom. Validation on submit, with the error-summary-at-top + inline-error pattern.

Pages live in the same HTML file, shown one at a time via JavaScript navigation. This makes the prototype a single shareable file the team can attach to a Slack message, an email, or a ministerial briefing.

### 3. The assumptions panel (always, toggleable)

Slide-out panel on the right, hidden by default so user testing sees a clean service, toggleable by a button in the xstack banner. Lists every assumption the prototype makes, tagged:

- `[VERIFY WITH USERS]` – needs a citizen to confirm in testing
- `[VERIFY WITH DEPARTMENT]` – needs a conversation with the department that owns the service to confirm
- `[VERIFY WITH PLATFORM]` – needs the platform team to confirm
- `[VERIFY WITH POLICY]` – needs a legal or policy check
- `[VERIFY WITH DATA]` – needs analytics or research data
- `[KNOWN GAP]` – the team knows this isn't right yet; placeholder for now

The assumptions panel is what makes these prototypes honest. A prototype without tagged assumptions is a confident lie.

### 4. The "this is fake" markers (always)

Mock data is clearly labelled mock. Mock buttons that "send" or "pay" go to fake confirmation pages. The identity lookup that "finds" a citizen shows an obviously made-up person, because no real citizen's data should ever be in an alpha prototype. Make mock names, ID numbers, addresses and regions locally realistic – use the formats in the profile's data formats section, and names that fit the country – so testers aren't thrown by foreign-looking data. Without a profile, use clearly placeholder formats and tag them `[VERIFY WITH DATA]`.

---

## The standard CSS / chrome

**With a profile that names a design system:** use it. If there's a `design-system.md`, use its stylesheet, chrome and component map rather than working them out again. Link its published stylesheet when the profile gives one and it is reachable, and use its class names and chrome. If the stylesheet isn't reachable, inline an approximation built from the profile's token values, and tag it `[KNOWN GAP]` so the team knows to swap in the real thing.

**Without one:** inline the xstack neutral style below, and mention once in the build's README that `/xstack:design-system` can switch the prototypes to the government's own design system. The tokens are the ones in `references/house-style.md`. It is plain, accessible and deliberately unbranded, so testing focuses on the journey. Keep the `.xstack-banner`, `.xstack-assumptions`, `.verify-tag` and `.fake-data` classes exactly as named – whichever design system you use – because audit scripts and `/xstack:productionise` look for them.

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --xs-text: #0B0C0C;
  --xs-text-secondary: #505A5F;
  --xs-background: #FFFFFF;
  --xs-surface: #F3F2F1;
  --xs-border: #B1B4B6;
  --xs-primary: #1D4F91;
  --xs-primary-hover: #143A6B;
  --xs-success: #00703C;
  --xs-error: #D4351C;
  --xs-focus: #FFDD00;
  --xs-font: system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", Arial, sans-serif;
}
body { font-family: var(--xs-font); background: var(--xs-background); color: var(--xs-text); line-height: 1.5; min-height: 100vh; display: flex; flex-direction: column; }
a:focus, button:focus, input:focus, select:focus, textarea:focus { outline: 3px solid var(--xs-focus); box-shadow: inset 0 0 0 2px var(--xs-text); }
.xs-official-banner { background: var(--xs-surface); color: var(--xs-text); font-size: 14px; padding: 8px 24px; }
.xs-header { background: var(--xs-primary); color: #FFFFFF; padding: 16px 24px; }
.xs-header__service { font-size: 20px; font-weight: 700; color: #FFFFFF; text-decoration: none; }
.xs-phase-banner { padding: 10px 24px; font-size: 15px; border-bottom: 1px solid var(--xs-border); }
.xs-phase-banner strong { background: var(--xs-primary); color: #FFFFFF; padding: 2px 8px; font-size: 13px; text-transform: uppercase; margin-right: 8px; }
.xstack-banner { background: var(--xs-text); color: #FFFFFF; padding: 10px 24px; font-size: 14px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.xstack-banner__variant { font-weight: 600; }
.xstack-banner button { background: var(--xs-focus); color: var(--xs-text); border: 0; padding: 6px 14px; font-weight: 700; font-size: 13px; cursor: pointer; font-family: inherit; }
main.xs-container { max-width: 720px; width: 100%; margin: 32px auto; padding: 0 24px; flex: 1; }
.xs-back-link { color: var(--xs-primary); text-decoration: underline; background: none; border: 0; padding: 0; font: inherit; cursor: pointer; margin-bottom: 24px; }
.xs-back-link::before { content: "← "; }
h1 { font-size: 36px; line-height: 1.2; margin-bottom: 20px; }
h2 { font-size: 24px; margin: 24px 0 12px; }
p { font-size: 19px; margin-bottom: 16px; }
.xs-label { display: block; font-size: 19px; font-weight: 700; margin-bottom: 6px; }
.xs-hint { display: block; color: var(--xs-text-secondary); margin-bottom: 10px; }
.xs-input { width: 100%; max-width: 480px; padding: 8px; font-size: 19px; border: 2px solid var(--xs-text); font-family: inherit; }
.xs-error-summary { border: 4px solid var(--xs-error); padding: 16px; margin-bottom: 24px; }
.xs-error-message { color: var(--xs-error); font-weight: 700; display: block; margin-bottom: 6px; }
.xs-input[aria-invalid="true"] { border-color: var(--xs-error); }
.xs-button { background: var(--xs-success); color: #FFFFFF; border: 0; padding: 10px 20px; font-size: 19px; font-weight: 600; cursor: pointer; font-family: inherit; box-shadow: 0 2px 0 #002D18; }
.xs-summary-list { border-top: 1px solid var(--xs-border); margin-bottom: 24px; }
.xs-summary-list__row { display: flex; border-bottom: 1px solid var(--xs-border); padding: 12px 0; }
.xs-footer { background: var(--xs-surface); border-top: 1px solid var(--xs-border); padding: 32px 24px; margin-top: 48px; font-size: 16px; }
.xs-footer a { color: var(--xs-primary); }
.xstack-assumptions { position: fixed; right: -440px; top: 0; width: 420px; height: 100vh; background: #FFFBEA; border-left: 3px solid var(--xs-text); padding: 24px; overflow-y: auto; transition: right 0.25s ease-out; z-index: 100; box-shadow: -2px 0 8px rgba(0,0,0,0.1); }
.xstack-assumptions--open { right: 0; }
.xstack-assumptions__close { position: absolute; top: 16px; right: 16px; background: var(--xs-text); color: #FFFFFF; border: 0; width: 32px; height: 32px; font-size: 18px; cursor: pointer; }
.xstack-assumptions h2 { font-size: 20px; margin: 0 0 12px; }
.xstack-assumptions ul { list-style: none; }
.xstack-assumptions li { margin-bottom: 14px; font-size: 14px; }
.verify-tag { display: inline-block; background: var(--xs-text); color: #FFFFFF; font-size: 11px; padding: 2px 6px; font-weight: 700; margin-right: 6px; text-transform: uppercase; }
.verify-tag--user { background: var(--xs-primary); }
.verify-tag--department { background: #6B3E26; }
.verify-tag--platform { background: #4A148C; }
.verify-tag--policy { background: var(--xs-error); }
.verify-tag--data { background: var(--xs-success); }
.verify-tag--gap { background: var(--xs-focus); color: var(--xs-text); }
.fake-data { display: inline-block; background: #FFF8DC; border: 1px dashed var(--xs-text-secondary); padding: 1px 4px; }
.page { display: none; }
.page--active { display: block; }
@media (max-width: 720px) {
  main.xs-container { padding: 0 16px; margin: 16px auto; }
  h1 { font-size: 28px; }
  .xstack-assumptions { width: 100vw; right: -100vw; }
  .xs-summary-list__row { flex-direction: column; }
}
```

For a full worked example built on a real design system, see `examples/build-renew-medical-licence/prototype-1-phone-first/index.html` – it uses the Barbados profile's GOV.BB approximation, but the structure (pages, xstack banner, assumptions panel, fake-data markers) is the canonical pattern whatever the design system.

---

## The identity, register and payment lookups

Mock them. The skill assumes every prototype will integrate with the national identity platform for personal details (**Open platforms and standards**), and with shared registers and lookups (vehicles, businesses) where the service needs them. The profile's shared platforms section names them – for example, Trident ID in Barbados. The mock looks like:

1. The citizen enters their national ID number (in the format from the profile)
2. The prototype shows "Looking up your details…" for ~1 second
3. The prototype displays a mock citizen card: name, national ID number, contact, address
4. The citizen confirms or asks to correct

Never ask for citizen identity details as separate manual fields when a lookup would provide them. That goes against the **Open platforms and standards** theme. If the profile doesn't name an identity platform, or there isn't one, still mock the lookup but tag it `[VERIFY WITH PLATFORM]`, and show the manual-entry fallback alongside it.

---

## How the skill works in practice

When invoked, the skill:

1. **Resolves the profile.** Standard, design system, platforms, terms, data formats – or the baseline and the neutral style.
2. **Reads the brief.** This can be a paragraph in the prompt, a link to a problem statement, or a discovery report.
3. **Identifies 2–3 design hypotheses.** Different enough that testing them produces real signal. Names them.
4. **Lists the assumptions** each hypothesis makes, tagged.
5. **Generates each prototype** as a complete HTML file with the standard chrome, the candidate journey, the assumptions panel, and the "this is fake" markers.
6. **Writes the consolidated assumptions list** across prototypes.
7. **Writes the test plan** – what to test with users, how many users per prototype, where, how to recruit, what good signal looks like.
8. **Writes the README** for the build folder.

The user then either:

- Tests the prototypes with users (see `test-plan.md`)
- Reviews them with the department before testing
- Asks the agent to refine one variant using `/xstack:iterate`

---

## What this skill does not do

- **It does not write production code.** These prototypes are throwaway. They look like production but they are not. **Sustainable and reliable** starts in beta, not in `/xstack:build`.
- **It does not invent the user need.** The brief must come from research or from a clear ask from the department. The skill flags every gap as `[VERIFY WITH USERS]` – it does not paper over them.
- **It does not skip the standards check.** Each prototype is generated with the **User needs**, **Inclusion**, **Plain language**, **Works first time** and **Open platforms and standards** themes baked in. If a hypothesis violates one of these (e.g. an inaccessible prototype), the skill says so and either refuses or explicitly flags it as a known violation to test against.
- **It does not lock in the design system gaps.** When the prototype reaches for a pattern the design system doesn't yet have, the skill marks it as `[KNOWN GAP]` and proposes the pattern back to the design system maintainers.

---

## Quick template

The prototype HTML has this skeleton. The class names shown are the neutral style's `xs-` classes; with a profile's design system, use its classes and chrome instead, and keep the `xstack-` elements as they are.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Service name] – [government website name]</title>
  <!-- With a profile design system: <link rel="stylesheet" href="[published stylesheet from the profile]"> -->
  <style>/* inline xstack neutral style, or the profile design system's approximation */</style>
</head>
<body>
  <div class="xs-official-banner">This is a prototype of a [Country] government service.</div>
  <header class="xs-header"><a class="xs-header__service" href="#">[Service name]</a></header>
  <div class="xs-phase-banner"><strong>alpha</strong> This is a prototype – don't use it for real applications</div>
  <div class="xstack-banner">
    <span class="xstack-banner__variant">xstack prototype: Variant 1 of 3 – Phone-first individual renewal</span>
    <button onclick="toggleAssumptions()">Show assumptions (12)</button>
  </div>
  <main class="xs-container">
    <section id="page-start" class="page page--active">…</section>
    <section id="page-id-lookup" class="page">…</section>
    <section id="page-practice" class="page">…</section>
    <section id="page-cpd" class="page">…</section>
    <section id="page-check" class="page">…</section>
    <section id="page-payment" class="page">…</section>
    <section id="page-confirmation" class="page">…</section>
  </main>
  <footer class="xs-footer">…</footer>
  <aside id="assumptions" class="xstack-assumptions">…</aside>
  <script>
    function goTo(pageId) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('page--active'));
      document.getElementById(pageId).classList.add('page--active');
      window.scrollTo(0, 0);
    }
    function toggleAssumptions() {
      document.getElementById('assumptions').classList.toggle('xstack-assumptions--open');
    }
  </script>
</body>
</html>
```

Set `lang` to the language of the service (from the profile). If the service needs to work in more than one language, say so in the assumptions panel and note how the prototype would switch.

---

## After generation

The team should:

1. Open each prototype in a browser. Click through it. Read the assumptions panel.
2. Walk the journey on a phone, on a slow connection. **Inclusion** begins here.
3. Run the test plan with citizens. The skill produces this in `test-plan.md`.
4. Bring feedback into `/xstack:iterate` for the next version.

The output of `/xstack:build` is not the alpha. The output is the **starting point** for the alpha. The alpha is what the team learns from testing.

---

## Citing standards

Every prototype carries an inline comment in its `<head>` block citing the standards it's anchored to. With a profile, cite the profile's own standard by its number and title (e.g. "Standard 4 (Use simple and relatable language)"); without a profile, cite the baseline theme by name:

```html
<!--
  xstack prototype – Variant N of M
  Anchored to [the profile's service standard, or the xstack baseline themes]:
    User needs
    Inclusion
    Plain language
    Works first time
    Open platforms and standards
  Anchored to GOV.UK Design Principles 1, 4, 6, 7
  Design system: [profile design system, or xstack neutral style]
  Assumptions surfaced in the right-hand panel.
-->
```

This is for the next team that reads the HTML – they should be able to see the xstack lineage without having to dig.
