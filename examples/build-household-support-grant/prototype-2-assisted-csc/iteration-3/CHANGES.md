# Iteration 3 – Prototype 2 (Assisted at a Citizen Service Centre)

**Profile:** Kestria (`profiles/kestria/`). Standards are cited from the Kestria Digital Service Standard by point number and title.

**Round of feedback:** `feedback-round-2.md`, Path B (structured feedback). A constraint from the department, 2026-10-23: KDS has published the GovKestria design system, and the Kestria profile now names it.

**Evidence:** none from users. There was no user testing. Nothing about users changed, so no `[VERIFY WITH USERS]` assumption was resolved, and none was added or removed.

**This is a styling-only change.** The journey is identical to iteration 2: the same pages and page ids, order, branching, validation rules, JS state, DPI calls (including the second mock that signs Aru in after a fingerprint match), test people and copy. The exceptions are in "Copy changes" below. `iteration-2/` is untouched.

Feedback items are numbered as in `feedback-round-2.md`: "What didn't work" 1 and 2.

## Critical changes applied

1. **The prototype now uses the GovKestria design system instead of the xstack neutral style.**
   - Feedback: 1. Constraint: use GovKestria for everything the citizen or officer sees.
   - The head loads Noto Sans, then `tokens.css` inlined exactly in one `<style>`, then `kestria.css` inlined exactly in another. A third, small `<style>` holds only:
     - the page show and hide rule
     - the xstack tooling (`.xstack-banner`, `.xstack-assumptions`, `.verify-tag`, `.fake-data`, which keep their own colours)
     - stopgaps for design-system gaps, and the variant blocks (officer strip, read-aloud box, officer note, simulated-screen box, slip, audit log), built from tokens only
   - All `--xs-*` neutral-style CSS and every `xs-` class are gone. Service markup uses `kg-` classes and `var(--token)` values.
   - `<body class="kg-body">`. Chrome in the order from `design-system.md`: skip link, fictional-country banner, `kg-header` (GovKestria wordmark, service name, language switcher), the alpha phase line, the xstack banner ("Iteration 3" and the assumptions toggle), the officer strip, then `kg-width` > `main.kg-main#main`, then `kg-footer` repeating the fictional notice.
   - Every element is mapped to the components in `design-system.md`: text inputs, radios in `kg-fieldset` with the question as the `heading-l` legend, buttons (one primary per page) in `kg-button-group`, error summary as `kg-notice--error`, `kg-field--error` with `kg-error-message` and a hidden "Error:", success notice on both confirmation pages, warning notices for warnings, and `kg-link` for every link.
   - The "Fingerprint matches (simulate)" and "does not match (simulate)" controls stay buttons. Only the first is primary.
   - The JS that writes markup now writes the same classes (outcome, receiver, route, check answers, confirmation, error summary).
   - Point 7 (Build on the national platforms), Point 3 (Make it work for everyone, in their language).

2. **The phone line is now the GovKestria helpline, `+999 77 100 2000`.**
   - Feedback: 2. Every `0800 400 400` is replaced (not-likely message, "nothing more today" pages, change text message, slip, champion slip, footer, panel). The wording of the change text message matches `profiles/kestria/dpi.md`.
   - "The call is free" is removed in four places. The profile does not say the helpline is free (`[VERIFY WITH DEPARTMENT]`, panel item 34).
   - Point 4 (Keep it simple and in plain words), Point 3.

## Important changes applied

3. **The help panel (`kg-help`) ends the start page and every question page.**
   - `DESIGN.md`, rule 6. It is one panel at the end of `main`, shown by `show()` on pages marked `data-help`, so it is not copied onto 22 pages. Question pages are the start page and the pages that ask the officer something (including the outcome page, which can ask about a switch).
   - For the officer it says where to refer the citizen: the district office or another CSC, then the helpline.

4. **Icons on every primary action and every status.** Inline 24px line SVG, `aria-hidden`, `stroke="currentColor"`, beside visible text: arrow, tick, print, warning, cross, and a speaker on every "Read aloud" label.

5. **Layout and targets.**
   - `heading-xl` only on the start page and the two confirmation pages. Every other page title is `heading-l`.
   - Every target is 48px. This needed stopgaps for the language links (40px in `kestria.css`), standalone links, the Back link, footer links and the "Change" links.
   - Money is "K 1,500", dates are "14 March 2026", phone numbers are `+999 …`. No emoji, no exclamation marks.

6. **Components the system lacks use the stopgaps in `design-system.md`**, each logged as `[KNOWN GAP]` in the panel (items 35 to 44): checkbox, select and district list, summary list, phase line, multi-language switcher, and the variant blocks.

## Copy changes

Everything not listed here is word for word as in iteration 2.

- **Official banner:** now exactly "Kestria is a fictional country, used for demonstration." The words "This is a prototype of a Kestria government service" moved to the phase line: "This is a prototype. Don't use it for real applications." (unchanged from iteration 2). `DESIGN.md`, rule 1.
- **Header:** "GovKestria – Apply for the Household Support Grant" is split into the wordmark and the service name.
- **Footer:** the fictional notice is the full line. "Privacy notice" and "Accessibility statement" are now "Privacy" and "Accessibility". The contact line now gives the helpline (see change 2).
- **"Blue boxes":** the start page says "Read the boxes marked "Read aloud" out loud". The language hint says "read every box marked "Read aloud" out loud". The boxes are not filled blue any more, so the old words would be wrong. The same change is in assumptions item 26.
- **Error summary title:** "There is a problem" is now "Error:", the pattern in `DESIGN.md`.
- **Warnings:** each former warning line (actor, card check, champion, receiver, "Say this out loud only") now sits under the title "Warning", as `DESIGN.md` requires a title word.
- **Success:** the green confirmation panel is now an h1 ("Application sent", "Survey visit requested" or "Visit booked") and a success notice titled "Success". The reference sentence is unchanged.
- **Simulated labels:** "SIMULATED – no fingerprint is read, kept or sent" and "SIMULATED KestriaID" are now sentence case ("Simulated …"). The "alpha" label is "Alpha".
- **Back:** the "←" before "Back" is gone.
- **Helpline sentences:**
  - not-likely message: "For other help, call SPA on 0800 400 400. The call is free." is now "For other help, call the GovKestria helpline on +999 77 100 2000." This line sits in a read-aloud box that follows the service sheet's messages. It needs checking against the sheet (`[VERIFY WITH DEPARTMENT]`).
  - "already" and "nothing more today" pages, the slip, the champion slip, the read-aloud on the confirmation page ("or call the free line" is now "or call the GovKestria helpline"), the change text message (as in `dpi.md`), the footer.
- **New text:** the help panel (change 3). The panel's assumptions also changed in places (items 18, 26, 30, 34 to 44).

## Deferred

7. **Upgrading to `dpi-mock.js` v1.1 and acting-for** (publicdigital/XStack#8, and Mina Vorlek, #9). That is a behaviour change. `references/dpi-mock.js` stays as inlined in iteration 2, and `KESTRIA_PERSONAS` is unchanged.
8. **A plain-language pass.** Many sentences are over 15 words. The service sheet fixes some of the wording (declaration, messages), so this needs the department. `[KNOWN GAP]`, item 44.
9. **A progress tag ("Question 3 of 6").** The path length changes by branch, so a count would be wrong. Nothing in iteration 2 showed progress.
10. **Radios for "How are they related?".** It has 6 options, so the system prefers radios. It stays a select, so the validation is unchanged.
11. **Real Kestrian, Vell and Sora text.** The switcher still only works in English.
12. **Proposing the gaps back to `DESIGN.md`** (checkbox, summary list, phase banner, multi-language switcher, read-aloud and officer blocks, a warning notice that does not use the accent twice).

## DESIGN.md checklist

I have no shell and no browser here, so these are checked against the code, not in a browser. Run them in the browser check.

| Item | Result |
|---|---|
| Fictional notice in the banner and the footer | Pass |
| Loads `tokens.css` then `kestria.css`, no hard-coded colours | Pass for the service. The xstack tooling classes and the DPI mock's own overlay keep their own colours (allowed) |
| One question and one primary button | One primary button per page: pass. One question per page: not met on pages carried over from iteration 2 that ask for several fields (acting for, name, survey details, champion, contact) |
| Help panel with the assisted route | Pass on the start page and every question page |
| Money, dates, phone numbers and IDs in Kestria formats | Pass. Champion booking dates keep a weekday ("Saturday 14 November 2026") |
| Focus visible and targets 48px or more | Pass by construction (the design system's focus styles, plus stopgaps). Confirm in the browser |
| Works at 320px with no horizontal scroll | Not tested. Built to wrap (flex-wrap, `overflow-wrap`, full-width buttons under 480px). Confirm in the browser |
| Sentence case, short sentences, no emoji | Sentence case and no emoji: pass. Short sentences: not met (Deferred 8) |

Also not met: `DESIGN.md` rule 5 asks for each page under 100 KB before fonts. This single file carries the DPI mock, the personas and the assumptions panel, so it is well over. It is not measured. A real service build would not ship them.

## Resolved assumptions

None. Round 2 had no user evidence.

## New assumptions

- The helpline replaces SPA's free line, and its cost is unknown (`[VERIFY WITH DEPARTMENT]`).
- Ten design-system gaps (`[KNOWN GAP]`): checkbox, select and date, summary list, phase banner, language switcher (including its 40px height), variant blocks, warning accent, error notice with several errors and option help, link targets, and sentence length.
