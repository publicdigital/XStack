# GovKestria design system

**Fictional.** How xstack prototypes and services use the GovKestria design system. The design system itself is in `design-system/`, and `design-system/DESIGN.md` is its source of truth. Where this file and `DESIGN.md` disagree, `DESIGN.md` wins – fix this file.

## Source

- **Government Design Systems List entry:** none – Kestria is fictional, so there's no entry to look up with `/xstack:design-system`
- **Homepage:** `design-system/DESIGN.md` in this profile
- **Source code:** `design-system/tokens.css`, `design-system/tokens.json` (version 2), `design-system/kestria.css`, `design-system/example.html`
- **Date checked:** 2026-10-23. On that date:
  - `tokens.css` and `tokens.json` agree on all 30 tokens
  - every contrast ratio claimed in `DESIGN.md` checks out to within 0.1
- **Built on:** –

## How prototypes use it

- **Tier:** 2 (inline it), with exact CSS rather than an approximation. The stylesheets aren't published at a URL, so a single-file prototype can't link them. Inline them instead.
- **Package and version:** `tokens.json` version 2
- **Stylesheet:**
  - **Single-file prototype:** inline `tokens.css`, then `kestria.css`, each in its own `<style>` block, copied exactly.
  - **Multi-file service:** link them in that order.

  Either way, load Noto Sans first:

  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap">
  ```

  Offline, or on a connection that drops the font, the page falls back to Arial, so it still works. The font is the one download a Kestria page makes. Keep everything else under the 100 KB budget in `DESIGN.md` (Point 11).
- **Script and initialisation:** none
- **Body and container classes:**
  - `<body class="kg-body">`
  - content in `.kg-width`
  - main content in `<main class="kg-main" id="main">`
  - **Starting point:** copy `design-system/example.html` for new pages
- **Tokens only:** never hard-code a colour or size that has a token. If one is missing, add it to `tokens.json` and `tokens.css` first.

## Page chrome

Use the markup in `DESIGN.md` exactly.

- **Skip link:** `<a class="kg-link kg-skip-link" href="#main">Skip to main content</a>`
- **Official banner:** the fictional-country banner, `.kg-banner`: "Kestria is a fictional country, used for demonstration." Never remove it, shorten it, or let anything cover it.
- **Header:** the `ServiceHeader` (`.kg-header`) with:
  - the GovKestria wordmark (plain type, no crest)
  - the service name as a verb phrase
  - a language switcher that names the *other* language, in that language

  `DESIGN.md` shows one switcher link. Where a service offers Vell or Sora too, list them in the same style. `[KNOWN GAP]` – there's no multi-language switcher pattern yet.
- **Phase banner:** not in the design system. `[KNOWN GAP]` Until there is one, put this directly after the header, using existing classes and no new colours:

  ```html
  <div class="kg-width"><p class="body-s" style="margin:var(--space-2) 0 0"><span class="kg-tag" style="margin:0 var(--space-2) 0 0">Alpha</span>This is a prototype. Don't use it for real applications.</p></div>
  ```
- **Footer:** `.kg-footer`, repeating the fictional-country line, with privacy and accessibility links. Kestria's profile also asks for contact details and a CSC finder here.
- **xstack tooling:** the xstack banner and assumptions panel (`.xstack-banner`, `.xstack-assumptions`, `.verify-tag`, `.fake-data`) keep their own styles. They aren't part of the service, so the design system's rules don't apply to them. Put the xstack banner after the phase line.
- **Help panel:** `.kg-help` ends every start page and question page (`DESIGN.md`, rule 6). It lists the CSC, the district office and the phone line.

## Components

| xstack needs | GovKestria component | Classes or markup |
|---|---|---|
| Text input | Text input | `.kg-field` > `.kg-label`, `.kg-hint`, `.kg-input` (`.kg-input--width-10` for IDs and phone numbers) |
| Textarea | **None** `[KNOWN GAP]` | Use `<textarea class="kg-input" rows="5">`. It inherits the input's border, focus and spacing. |
| Radios | Radios | `.kg-fieldset` with `<legend><h1 class="heading-l">` and `.kg-radio`. Never preselect one. Use up to 6. |
| Checkboxes | **None** `[KNOWN GAP]` | No pattern yet. Prefer radios, or yes/no questions, until one is added. |
| Date input | **None** `[KNOWN GAP]` | Three `.kg-input` fields (day, month, year) in a `.kg-fieldset`. There are no narrow width classes yet, so add width tokens first rather than inline widths. |
| Select | **None** `[KNOWN GAP]` | Use radios for 6 options or fewer. For districts (38), a `.kg-input` styled `<select>` is the stopgap. |
| Button | Button | `.kg-button`, `.kg-button--secondary`, `.kg-button--warning` (only for stopping or deleting, on a confirmation page). One primary per page, in `.kg-button-group`. |
| Back link | Link | `<p><a class="kg-link" href="…">Back</a></p>` at the top of `main` |
| Error summary | Notice (error) | `.kg-notice.kg-notice--error` with `role="alert"`, the cross icon, "Error:" and a link to each field |
| Error message | Error message | `.kg-field--error` on the wrapper, and `.kg-error-message` with a visually hidden "Error:", linked by `aria-describedby` |
| Fieldset and legend | Fieldset | `.kg-fieldset`. On a one-question page the question is the legend, set as `heading-l`. |
| Hint text | Hint | `.kg-hint`, linked by `aria-describedby` |
| Summary list (Check your answers) | **None** `[KNOWN GAP]` | `DESIGN.md` describes the page, but there's no markup. Use a `<dl>` with `hairline` rules between rows, a "Change" `.kg-link` on each, and "From government records" in `.kg-hint`. Propose it back as a component. |
| Confirmation panel | Notice (success) | `.kg-notice.kg-notice--success` with `role="status"`, the tick icon and "Success", then the reference and what happens next |
| Progress | Tag | `.kg-tag`: "Question 3 of 6" |
| Assisted route | Help panel | `.kg-help` |
| Warning | Notice (warning) | `.kg-notice--warning` – `accent` fill with `ink` text |

Missing components are tagged `[KNOWN GAP]` in prototypes and proposed back as additions to `DESIGN.md` (see `skills/brief-to-prototypes`).

## Tokens

All in `design-system/tokens.css` and `tokens.json`. `DESIGN.md` has the table with each token's value and use. In brief:
- **Colour:** `--brand` `#0b4f6c`, `--accent` `#f2b33d` (once per screen, fill only), `--ink` `#0f1e26`, `--surface-alt` `#edf3f6`, `--focus` `#ffbf47` with a 3px `ink` bar
- **Type:** Noto Sans. `heading-xl` 34/42, `heading-l` 26/34, `heading-m` 20/28, `body` 18/28, `body-s` 16/24, `caption` 14/20.
- **Space:** 4, 8, 16, 24, 32 and 48px
- **Radius:** 6px, 12px and pill
- **Size:** 48px minimum target, 640px measure, 960px page

## Restrictions

- **Fonts:** Noto Sans only (Open Font License), falling back to Arial. No second typeface.
- **Crest, logo or brand assets:** none. The GovKestria wordmark is plain type. No real or invented flags, crests, or bank or telco logos. Invented provider names from `world.md` are allowed as text only.
- **Codes:** only the reserved codes in content: `+999` phone numbers, `kestria.test` domains, KUINs in `9900 000 000`–`9900 999 999`, and money as `K` (`XTS` only in data).
