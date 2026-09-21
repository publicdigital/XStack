# House style — page skeleton and CSS conventions

The fastest and safest route: **copy the `<style>` block and page skeleton from the
canonical file for your artifact type** (see SKILL.md), then adapt content.
This file documents the conventions so you can adapt confidently and rebuild if a
canonical file is ever lost.

## Design tokens

Colours come from the government's design system named in the country profile. Map
its colours onto the roles below: its primary brand colour for `--primary`, its
accent for `--accent`, and so on. Where the profile has no design system, use these
values, which follow the xstack neutral style in xstack's `references/house-style.md`:

```css
:root{
  --primary:#1D4F91;      /* headers, stage heads, lane accents */
  --primary-deep:#143A6B; /* card headings */
  --accent:#FFDD00;       /* eyebrow chip, header underline, panel accents */
  --page:#F3F2F1;         /* page background */
  --footer:#0B0C0C;       /* footer, labels */
  --ink:#0B0C0C;
  --card:#ffffff;
  --line:#B1B4B6;
  --red:#D4351C;          /* gaps / to-build */
  --green:#00703C;        /* works today / new */
  --purple:#6941C6;       /* shared / feelings lane */
}
```

Older canonical pages may use brand names for these roles (for example `--navy`,
`--gold`, `--offwhite`, `--charcoal` in the Barbados pages). Rename them to the roles
above when you copy a `<style>` block, so the palette can be swapped in one place.
Check that every text and background pair still meets WCAG 2.2 AA after swapping.

Font stack: the profile's design system font if it can be self-hosted or is already
on the device; otherwise `system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans",Arial,sans-serif`.
No external fonts, no frameworks — each page is one self-contained HTML file plus the
shared comments script.

## Page skeleton (top to bottom)

1. **`<header>`** — primary colour, accent bottom border. Contains:
   - `.eyebrow` — accent chip, uppercase, names the artifact type and scope
     (e.g. "Journey map · Applicant · After submitting a form")
   - `<h1>` with one `<span>` segment in the accent colour for the emphasis phrase
   - `.meta` paragraph — who × what, one-paragraph orientation, `<strong>` opener
2. **Optional strips** — e.g. the simplified blueprint's "The CMS includes:" strip
   (a pale tint of the accent as background) for source-board header notes.
3. **`.legend`** — sticky (`position:sticky;top:0;z-index:40`), white, swatches for
   lanes/actors + tag chips with one-line meanings.
4. **`.scroller > .blueprint|.journey`** — `overflow-x:auto` wrapper around a CSS
   grid. The page body must never scroll horizontally; only this container does.
5. **`.panels`** — 2–3 summary panels (`auto-fit,minmax(320px,1fr)`).
6. **`<footer>`** — footer colour. Companion links + source citation + date.
7. **Comments script tag** — always last (see delivery.md).

## The grid

```css
.blueprint{ display:grid;
  grid-template-columns:150px repeat(N, minmax(268px, 1fr));
  min-width: ~ (150 + N×280) px; }
```

- N = number of phases (5–7 works; 6 is typical).
- Row structure: one `.corner` + N `.stagehead` cells, then for each lane:
  one `.lanelabel` + N `.cell` divs. Grid auto-placement handles rows — keep the
  child count exact or the whole grid shears.
- `.lanelabel` is `position:sticky;left:0` so lane names survive horizontal scroll.
  Its `.inner` has a 5px left border in the lane's accent colour.
- Between lanes, insert blueprint lines as full-width rows:
  `.bline` with a sticky label — "Line of interaction", "Line of visibility",
  "Line of internal interaction" (blueprints only; journey maps have no lines).

## Stage heads

```html
<div class="stagehead"><div class="num">Stage 1</div><h2>Submit</h2><p>The form is sent</p></div>
```

Primary colour, rounded top corners. `.num` is accent-coloured uppercase ("Stage N" for blueprints,
"Phase N" for simplified). The `<p>` is a short editorial subtitle — write it as a
hook ("A status page with no front door"), not a repeat of the title.

## Cards

`.cardx` — white, 1px `--line` border, radius 8, small shadow. Contents: `<h4>`
(optional for single-fact cards), `<p>` or `<ul>`, then `.tags` with `.tagchip`s.

Variants by artifact:
- **Detailed blueprint:** `.cardx.evidence` (cream `#fffaf0`) for the physical
  evidence lane; `.cardx.support` (grey, dashed border) for the support lane;
  actor accents as 4px left borders (`.applicantline` primary, `.staffline` accent,
  `.bothline` purple). State outlines: `.isgap` (2px red), `.isopen` (2px blue
  `#1550b0`).
- **Simplified blueprint:** lane-tinted card backgrounds matching the Miro board —
  applicant `#ececec`, front `#e2f2f7`, back `#ffe9c4`, support `#ecdcf5`. To-build
  cards get `outline:2px solid var(--red)` with red heading and `#8a2018` body text.
- **Journey map:** `.cardx.touch` (cream) for touchpoints, `.cardx.pain`
  (`#fdf1f0`) with red headings, `.cardx.opp` (`#eefaf3`) with green headings, and
  `.feelcard` (`#f4f1fb`) for the feelings lane — emoji `.mood` at 26px, purple
  uppercase label, quoted thought, then an `<em>` insight line.

## Tag chips

`.tagchip` — 10.5px uppercase pills. The standard sets:

| Set | Chips |
|---|---|
| As-is | `tag-today` green "Works today" · `tag-gap` red "Gap" · `tag-open` blue "Open question" |
| Simplified | `tag-build` red "To build" (working cards carry no chip) |
| Future-state | `tag-new` green · `tag-changed` blue · `tag-same` grey · `tag-removed` red |
| Actor chips | `tag-applicant`/`tag-vendor` primary · `tag-staff`/`tag-org` accent · `tag-both` purple |

## Summary panels

2–3 `.panel` blocks with an underlined uppercase `h3` (accent underline by default;
green for "working today", red for gaps/to-build, blue for open questions). Bullets
carry `<strong>` lead-ins. These panels are what a minister or senior official actually reads —
write them as the executive summary of the grid.

## Print

Keep the `@media print` block: legend unsticks, scroller unclips, background goes
white. People print these for workshops.
