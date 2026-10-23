# Iteration 3 – Prototype 1 (Once-only, phone-first)

Round of feedback: round 2, a department constraint. KDS has published the GovKestria design system, and the Kestria profile now names it. **No user testing. No user evidence.** Nothing about users changes, so no `[VERIFY WITH USERS]` assumption is resolved. See `../feedback-round-2.md`.

This is a **styling-only** change. The pages, page ids, order, branching, validation logic, JS state, DPI calls, persona data and `dpi-mock.js` (byte-identical to iteration 2) are as in iteration 2. Iteration 2 is untouched.

## Critical changes applied

1. **Switched from the xstack neutral style to the GovKestria design system.**
   - Feedback: round 2, item 1. `profiles/kestria/profile.md` says every Kestria page uses GovKestria.
   - Head order: Noto Sans links, `tokens.css` inlined verbatim, `kestria.css` inlined verbatim, then one small `<style>`.
   - The small `<style>` holds only the page show/hide rule, the xstack tooling (`.xstack-banner`, `.xstack-assumptions`, `.verify-tag`, `.fake-data`, all class names kept) and stopgaps for design-system gaps. Stopgaps use tokens only.
   - All `--xs-*` neutral-style service CSS is removed.
   - Kestria Digital Service Standard: Point 3 (Make it work for everyone, in their language), Point 4 (Keep it simple and in plain words), Point 11 (Keep it running, on any network).
2. **Chrome is now the design system's.** Skip link, `.kg-banner` fictional notice, `.kg-header` (GovKestria wordmark, service name, Kestrian / Vell / Sora links in the same style), the alpha phase line from `design-system.md`, the xstack banner (now says "Iteration 3"), `.kg-width` > `main.kg-main`, and `.kg-footer` with the fictional notice, privacy, accessibility, contact and the CSC finder.
3. **Every form element and pattern now uses a `kg-` component.** `kg-field`, `kg-label`, `kg-hint`, `kg-input`, `kg-fieldset` with the question as a `heading-l` legend, `kg-radio`, `kg-button` (and `--secondary`) in `kg-button-group`, `kg-tag`, `kg-link` for every link.
   - Error summary is `kg-notice--error` with the cross icon, "Error:" and a link to each field. Each field gets `kg-field--error` and a `kg-error-message` with a visually hidden "Error:".
   - Confirmation uses `kg-notice--success` with the tick icon and "Success".
   - The JS that writes markup (error summary, error wrappers, Check your answers rows, outcome, household and details lists, rainy-season note) now writes the new classes.
4. **Helpline.** Every `0800 400 400` is replaced by the GovKestria helpline, `+999 77 100 2000` (feedback item 2; DESIGN.md rule 3). Places: no-KestriaID page, sign-in failed page, already-supported page, not-likely outcome, footer, and the new help panel. Point 3 (Make it work for everyone, in their language).
5. **DESIGN.md rules applied.**
   - One primary button per page.
   - A `.kg-help` panel (CSC, district office, helpline) at the end of the start page and every question page. It is one element, shown by `show()` on pages marked `data-help`.
   - An inline SVG icon on every primary action (arrow, or tick on "Send application") and every status.
   - `heading-xl` only on the start and confirmation pages.
   - Back is a link, not a button. Navigation actions that were buttons or link-styled buttons are now `kg-link`s (CSC finder, "Finish", "Apply without KestriaID", and similar).

## Important changes applied

6. **Checkboxes, summary list, select, reveal, inset and status line use stopgaps** from `design-system.md`. Each is a `[KNOWN GAP]` in the assumptions panel (see Deferred).
7. **Section tags added** ("About you", "Your household", "How you get paid", "Check and send") on the question pages. DESIGN.md wants "Question N of M", but the journey branches, so the count is not knowable. This is new, untested copy.
8. **Language switcher** is now three links (Kestrian, Vell, Sora). It no longer has an English button or `aria-pressed`. Choosing one shows the "Translation not available" line, as before. There is no way to mark or undo it, because English is the only working language.
9. **Reveal panels, insets and sub-questions restyled:** conditional fields sit in a `surface-alt` panel (no coloured left borders, per DESIGN.md Don'ts). Sub-questions on a page ("Is the place where you live correct?") are `heading-m` legends.

## Copy changes (all of them)

- Fictional banner is now exactly "Kestria is a fictional country, used for demonstration." The extra sentence "This is a prototype of a Kestria government service." is gone. The alpha line carries "This is a prototype."
- Phase tag "alpha" is now "Alpha".
- Header is "GovKestria" plus "Apply for the Household Support Grant" (was "GovKestria – Apply for…" in one link).
- Error summary title "There is a problem" is now "Error:" (DESIGN.md Notice).
- Inline error messages start with a visually hidden "Error:". Visible wording is unchanged.
- Confirmation: the green panel is now an h1 plus a success notice ("Success", "Your reference is …"). Wording unchanged.
- Footer: "Privacy notice" is now "Privacy", "Accessibility statement" is now "Accessibility". "Contact SPA: dial *999#, or call the free line 0800 400 400" is now "Contact SPA: call the GovKestria helpline on +999 77 100 2000, or dial *999#". The "fictional" span and the "Kestria is fictional." line are replaced by the full notice.
- Helpline wording: "Call the free line 0800 400 400" is now "Call the GovKestria helpline on +999 77 100 2000", in each place listed under change 4.
- Help panel text is new, from DESIGN.md.
- Sentences moved into a status line (same words): on the sign-in cancelled, sign-in failed, refused, not-found, already-supported and outcome pages, the first or key sentence now sits in an icon line. On the outcome page "This is not a final decision…" (and, for a visit, "This is a normal next step…We have not made a decision.") now comes first, and the duplicate later in the body is removed. This is the only word-order change.
- Button labels gained an icon only. The "Carry on" / "Continue" wording is unchanged.
- Declaration text is word for word as before.

## Worth testing

- None this round. Nothing here was tested with users. The section tags (change 7) and the status line (change 6) are new patterns and carry `[VERIFY WITH USERS]` in the panel.

## Deferred

- **`dpi-mock.js` v1.1 and acting for someone** (publicdigital/XStack#8, Mina Vorlek #9). A behaviour change. The mock stays v1, byte-identical.
- **Upgrading the mock's simulated screens to GovKestria.** They keep their purple, own styling. Out of scope.
- **Design-system gaps to propose back to `DESIGN.md`:**
  - checkbox, summary list, select, narrow input widths, conditional reveal, inset text, neutral (information) notice, multi-language switcher, phase banner
  - the language switcher is 40px high in `kestria.css` (`min-height: 40px`), under the 48px target. The brief said 44px, but the file says 40px.
  - "Never preselect a radio" conflicts with the service sheet's default of "Me" on "Who should receive the money?". Kept for an identical journey. Needs a decision.
- **Date input:** not needed. The service asks for no date.
- **Plain-language pass:** some sentences are over 15 words (including the verbatim declaration). The journey and copy were kept as they were. Pass to the content designer.
- **Real-phone and page-weight test** on 3G. I could not run a browser.

## Checklist before you finish a page (DESIGN.md)

Checked by reading the code. Not run in a browser.

| Item | Result |
|---|---|
| Fictional notice in the banner and the footer | Pass |
| Loads `tokens.css` then `kestria.css`, no hard-coded colours | Pass for service styling. Tooling and the mock's simulated screens use their own colours, as allowed. |
| One question and one primary button | Partial. One primary button on every page. "Check your details" and "How we will use…" ask more than one question or none, as the journey did. |
| Help panel with the assisted route | Pass on the start page and all 12 question pages. |
| Kestria formats and reserved ranges | Pass: K 1,500, `+999`, `kestria.test`, KUINs in range. `*999#` is kept and flagged to the department. No date shown. |
| Focus visible and 48px targets | Mostly. Focus uses the design system's rules plus stopgap rules for checkboxes and the h1. The language switcher is 40px (design-system file). Inline links inside paragraphs are not enlarged. |
| Works at 320px, no horizontal scroll | Not run. Layout is built for it (wrapping flex, `overflow-wrap`, full-width buttons under 480px). Needs a browser check. |
| Sentence case, short sentences, no emoji | Partial. Sentence case, no emoji and no exclamation marks. Some sentences are over 15 words (see Deferred). |

## Resolved assumptions

- "No Kestria design system" (a known gap) is now resolved by the department's constraint, not by user evidence.
- The free line `0800 400 400` is replaced (see change 4).

## New assumptions (all in the panel)

- Section tags help people see where they are. `[VERIFY WITH USERS]`
- An icon and a line of text is enough for a status without a coloured notice. `[VERIFY WITH USERS]`
- `*999#` is allowed alongside `+999` numbers. `[VERIFY WITH DEPARTMENT]`
- The page stays under 100 KB before fonts and works at 320px. `[VERIFY WITH DATA]`
- Eleven design-system `[KNOWN GAP]`s, listed in `assumptions.md`.

## Standards cited

Kestria Digital Service Standard: Point 3 (Make it work for everyone, in their language), Point 4 (Keep it simple and in plain words), Point 7 (Build on the national platforms), Point 11 (Keep it running, on any network).
