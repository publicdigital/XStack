# Findings deck style (python-pptx)

The deck follows the **house style in the country profile** – its colours,
font and logo (see `profiles/README.md`; for example, the Barbados profile's
`house-style.md` gives the GovTech Barbados slide palette and Figtree). Map the
profile's colours onto the roles below. Without a profile, use the neutral
defaults in this file, which follow the xstack neutral style in
`references/house-style.md`, and use no logo.

If the team has an official template file, it usually keeps its text in "live
layouts", which makes editing its XML brittle. Build decks programmatically in
its visual system instead, following the spec below. If a previous study's `build_deck.py` /
`build_usability_deck.py` is available next to its raw data folder, copy its
helper functions rather than reinventing.

## Canvas

13.333" × 7.5" (`prs.slide_width = Inches(13.333)`), blank layout
(`prs.slide_layouts[6]`), full-bleed background rect per slide.

## Palette (neutral defaults – replace with the profile's colours)

| role | hex |
|---|---|
| PRIMARY (dark slides, titles) | 1D4F91 |
| PRIMARY_2 panel | 143A6B |
| ACCENT highlight | FFDD00 |
| INK text | 0B0C0C |
| MUTED grey | 505A5F |
| TAB section label | 2C2C2C |
| CORAL (problems) | D4351C (light CORALL F2B8AE) |
| GREEN (fixes/strengths) | 00703C |
| LIGHT off-white bg | F3F2F1 |
| PALE blue on primary | D2DDEB |

Check any profile colours you substitute for contrast (WCAG 2.2 AA) against
the backgrounds they sit on.

Font: the profile's font if it names one, otherwise **Arial** throughout. Titles 30–32pt bold, kicker tabs 12.5pt bold
uppercase, body 12.5–15pt, stat callouts 34–52pt.

## Motifs

- **Kicker tab**: dark (or accent-on-primary) rectangle top-left with an uppercase
  section label; bleeds off the left edge on full-width slides, non-bleed when
  it sits over a split-panel layout.
- **Cover**: solid LIGHT (or the profile's cover colour), PRIMARY type, thin
  PRIMARY rule, logo bottom-right if the profile supplies one.
- **Dark slides** (headline, sensitive findings, closing): solid PRIMARY,
  ACCENT highlights, quote cards in PRIMARY_2 with an accent or coral top/side bar.
- Cards: white on LIGHT bg (or LIGHT on white) with a coloured side/top bar —
  green for strengths/fixes, coral for problems. Soft shadow via `outerShdw`.
- Logo top-right on light content slides, white variant on PRIMARY – only
  when the profile supplies a logo (or the team gives you one). Page number
  bottom-right, ACCENT on dark, PRIMARY on light. The Barbados
  profile keeps its logos in `profiles/barbados/assets/logo_*.png`.

## QA (required)

No LibreOffice/soffice on this Mac. Render every slide with the bundled
renderer and LOOK at each image:

```bash
python3 <skill>/scripts/render_pptx_qa.py "<deck.pptx>" "<out-dir>"
```

- A **magenta outline** on a rendered slide = that text frame overflows its
  box. Fix the box or shorten the text and re-render.
- The renderer joins runs with visible gaps (e.g. "today ." for adjacent
  runs); that's a renderer artifact, not a deck bug — adjacent runs render
  correctly in PowerPoint.
- Also check: edge-crowding (<0.4" from slide edge), tab bars crossing panel
  boundaries, headers wrapping inside coloured bars, quote cards colliding
  with their attribution line.
