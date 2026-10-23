# Iteration 3 – Prototype 3 (Household-first)

**Profile:** Kestria (`profiles/kestria/`). Standard cited: Kestria Digital Service Standard, by point number and title.
**Round of feedback:** a constraint from the department, 2026-10-23. File: `feedback-round-2.md`. KDS has published the GovKestria design system, and the profile now names it.
**No user testing.** Nothing about users changes this round. No `[VERIFY WITH USERS]` assumption is resolved, and none is moved to "Resolved".
**Kind of change:** styling only, plus the helpline number. The pages, page ids, order, branching, validation rules (including date validation), JS state, DPI calls, personas and copy are as iteration 2, except the copy changes listed below. `index.html` has not been run in a browser or through `node --check` yet.

Feedback item numbers: **F1, F2** are "What didn't work" 1–2. **O1, O2** are "Observed but unresolved". **C** is "Constraints surfaced".

## Critical changes applied

1. **Styling-only switch from the xstack neutral style to the GovKestria design system.**
   - Feedback: F1, C.
   - `tokens.css`, then `kestria.css`, are inlined verbatim, each in its own `<style>`, after the Noto Sans links. All `--xs-*` service CSS is gone.
   - One more small `<style>` holds only: the page show and hide, the xstack tooling classes (`.xstack-banner`, `.xstack-assumptions`, `.verify-tag`, `.fake-data`), and stopgaps for design-system gaps. The stopgaps are named `stopgap-*`, so they are easy to find and delete. They use `var(--token)` values only and no new colours.
   - Chrome as `DESIGN.md`: skip link, `kg-banner` fictional notice, `kg-header` (wordmark, service name, language switcher), the alpha phase line from `design-system.md`, the xstack banner ("Iteration 3" and the assumptions toggle), `kg-width` > `main.kg-main#main`, then `kg-footer` repeating the fictional notice.
   - Components: `kg-field`, `kg-label`, `kg-hint`, `kg-input`, `kg-fieldset` with the question as `legend > h1.heading-l`, `kg-radio`, `kg-button` (and `--secondary`) in `kg-button-group`, `kg-tag`, `kg-link` on every link (including Back, Change and Remove), `kg-help`, and `kg-notice--success` on the confirmation page.
   - Errors: a `kg-notice--error` summary at the top of the page, each error a link to its field, and `kg-field--error` with `kg-error-message` and a visually hidden "Error:" on the field. The error box moved from inside each form to the top of the page, so the notice sits above the progress tag, as the page pattern says. `validate()` finds it through the page. The rules and the messages are the same.
   - JS that writes markup or classes was updated: `radioHtml`, `row`, `validate`, the change-detail form (select, date), the changes list, the household record, the payee and payout pages, the check-your-answers rows, and the confirmation. The household strip now gets an information icon from `show()`.
   - Standards: Point 3 (Make it work for everyone, in their language), Point 7 (Build on the national platforms), Point 11 (Keep it running, on any network).

2. **The GovKestria helpline replaces SPA's free line.**
   - Feedback: F2.
   - Every "0800 400 400" is now **+999 77 100 2000**, and "the free line" is now "the GovKestria helpline". Five places: the start page, the CSC page, the "probably can't" page, the confirmation page and the footer. It is also in every help panel.
   - The `*999#` short code stays. It is a USSD code, not a phone number, and it is in the service sheet. Tagged `[VERIFY WITH DEPARTMENT]`.
   - Standards: Point 4 (Keep it simple and in plain words), Point 6 (Protect people's data and earn their trust). `DESIGN.md` rule 3 allows only `+999` numbers.

## Important changes applied

3. **Help panel on the start page and on every question page.**
   - Feedback: C (the assisted route, `DESIGN.md` rule 6).
   - Question pages: your KestriaID, find your household, household size, is this your household, has anything changed, what has changed, tell us about the change, changes list, who receives the money, where we would pay, contact, declaration. 13 pages with the start page.
   - Not added to the explanation and outcome pages (sign-in cancelled and failed, CSC, notice, refused, not found, missing, already gets support, "probably can't", "if this is not right", check your answers, confirmation). They are not question pages, and several already point to a CSC or the helpline.
   - On the start page the panel replaces the "Prefer to talk to someone?" paragraph and keeps that heading.
   - Standards: Point 2 (Solve the whole problem, across every channel), Point 3.

4. **An icon on every primary action and status.**
   - Feedback: C.
   - An arrow on every primary button, a tick on "Send to SPA" and the success notice, a cross on the error notice, and an information icon on the "You're telling us about household …" strip and the translation notice. All are inline SVG, `aria-hidden`, `stroke="currentColor"`.
   - Standards: Point 3.

## Worth testing in the next round

5. **Progress tag, "Part N of 4".**
   - The design system's question page has a progress tag. A "Question 3 of 6" count would be wrong here, because the journey branches. So the tag names the part instead: 1 your household, 2 what changed, 3 payment, 4 contact and declaration.
   - The four parts are our own grouping. Tagged `[VERIFY WITH USERS]`.
   - Standards: Point 4.

## Copy changes

Every copy change, so nothing is silent.

| Where | Iteration 2 | Iteration 3 | Why |
|---|---|---|---|
| Phone line, 5 places | "the free line on 0800 400 400" (and "the free line, 0800 400 400") | "the GovKestria helpline on +999 77 100 2000" | F2, `DESIGN.md` rule 3 |
| Start page help | "Prefer to talk to someone? Call the free line on 0800 400 400, dial *999#, or go to a CSC. They can fill this in with you." | Same heading. "Visit any Citizen Service Centre (CSC) or your district office. Staff can fill this in with you." and "Call the GovKestria helpline on +999 77 100 2000, or dial *999#." | The panel lists CSC, district office and phone (rule 6) |
| 12 question pages | – | New panel: "Get help", the CSC and district office line, and "Call the GovKestria helpline on +999 77 100 2000. You can speak Kestrian, English, Vell or Sora." | Rule 6. The languages line is from the `DESIGN.md` example. |
| Error summary heading | "There is a problem" | Title "Error:" (then a link per error) | `DESIGN.md`, Notice |
| Progress | – | "Part 1 of 4" to "Part 4 of 4" on question pages | See item 5 |
| Confirmation | Reference in a green panel with the page title | "Details sent" (title), then a success notice with the title word "Success" and "Your reference is …" | `DESIGN.md`, Notice and Confirmation page |
| Banner | "Kestria is a fictional country, used for demonstration. This is a prototype of a Kestria government service." | "Kestria is a fictional country, used for demonstration." | `DESIGN.md` rule 1 gives the exact line. The phase line says "prototype". |
| Phase line | "alpha This is a prototype. Don’t use it for real applications." | "Alpha This is a prototype. Don't use it for real applications." | `design-system.md`, verbatim (capital A, straight apostrophe) |
| Footer | "Contact SPA: dial *999#, or call the free line 0800 400 400 (fictional)" and "Kestria is fictional" | "Kestria is a fictional country, used for demonstration.", "Run by the Kestria Digital Service.", and "Contact SPA: dial *999#, or call the GovKestria helpline on +999 77 100 2000." | `DESIGN.md`, Footer. "(fictional)" dropped because the notice is there. |
| Footer links | "Privacy notice", "Accessibility statement", "Find your nearest Citizen Service Centre" | Same words, on one line, with `kg-link` | – |

No other words changed. Money was already "K 1,500", dates were already "14 March 2026" (the date is built as day, month name and year), and there were no emoji or exclamation marks.

## Deferred

- **Mock v1.1 and acting for someone (O2).** `dpi-mock.js` is inlined as in iteration 2, byte for byte, and `KESTRIA_PERSONAS` is as it was. Mina Vorlek acting for Anaïs is a behaviour change, so it is the next round's work.
- **Sentences over 15 words.** `DESIGN.md` asks for under 15. A lot of the copy is longer, and the declaration is SPA's approved wording, which can't be shortened without SPA. Rewriting is a copy change, not a styling one. Needs a plain-language review (`xstack:plain-language-check`).
- **One question per page.** Four pages still ask two things (find your household, who receives the money, contact, and the change detail page). Changing that alters the journey.
- **Checkbox on the declaration.** `design-system.md` says to prefer radios. A radio would change the validation and the page, so the checkbox stays with a stopgap.
- **Help panel on the explanation and outcome pages.** See item 3. Decide with the service designer.
- **Page weight.** The file is over 100 KB because it holds the design system, the mock, all the pages and the panel. A built service would split these.
- **A real browser check:** focus, 48px targets and 320px. See the checklist.

## Design-system gaps found

All of these are in the assumptions panel as `[KNOWN GAP]`, and should be proposed back to `DESIGN.md`.

- From `design-system.md`: checkboxes, date input, select, summary list, phase banner, a switcher for more than one language.
- **Language switcher height.** The design system's `.kg-header__lang` is 40px high, below the 48px minimum. Iteration 2's buttons were 44px. The stopgap sets 48px.
- **Context strip and plain notes.** No pattern for "You're telling us about household …", the PIN reminder or the privacy notes. The warning notice isn't used, because its fill is the accent, which the header already uses once per screen.
- **Progress for a branching journey.** The tag takes a count, with nothing for a journey that changes length.
- **Lists.** No list styles, bulleted or numbered.
- **Link targets.** A link on its own line is under 48px. A stopgap adds the height.
- **`.kg-radio span::before`.** The selector matches every `span` inside a radio label, so a `fake-data` span gets a radio circle. The tooling style switches that off. Hints inside a radio need `<small>`, not `<span>`.

## DESIGN.md checklist

Not run in a browser. "By construction" means the CSS or markup does it, and it still needs a look.

| Item | Result |
|---|---|
| The fictional notice is in the banner and the footer | **Pass** |
| Loads `tokens.css` then `kestria.css`, with no hard-coded colours | **Pass** for the service. The xstack panel, tags and mock overlay keep their own colours, as allowed. |
| One question and one primary button | **Partial.** One primary button on every page: pass. One question: four pages ask two things, carried over from iteration 2. |
| A help panel with the assisted route | **Pass** on the start page and the 12 question pages |
| Money, dates, phone numbers and IDs use Kestria formats and reserved ranges | **Pass.** `+999` numbers only, `K 1,500`, "14 March 2026". No KUIN is shown. `*999#` is a USSD code. |
| Focus is visible on every control, and every target is 48px or more | **Pass by construction.** Design-system focus styles are untouched. Inputs, radios, buttons, header links, summary links and standalone links are 48px. The xstack banner button (36px) and the panel close button (44px) are tooling. |
| It works at 320px wide with no horizontal scroll | **Pass by construction** (wrapping header, date fields, summary rows). Needs a browser check. |
| Copy is in sentence case, uses short sentences and has no emoji | **Fail on short sentences.** Sentence case and no emoji or exclamation marks: pass. See Deferred. |

## Resolved assumptions

None this round. There was no testing.

## New assumptions

- "Part N of 4" helps people know how far they have got on a journey that changes length. `[VERIFY WITH USERS]`
- The arrow, cross, tick and information icons help low-literacy users with this service. `[VERIFY WITH USERS]`
- The GovKestria helpline can answer questions about a household, as SPA's free line could. `[VERIFY WITH DEPARTMENT]`
- The language names in the switcher: the profile has no names for Kestrian, Vell and Sora in those languages. `[KNOWN GAP]`
