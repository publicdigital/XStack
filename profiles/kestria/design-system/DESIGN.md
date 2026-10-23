# GovKestria design system

> **Kestria is a fictional country, used for demonstration.** Every page, prototype and slide built with this system must show that sentence where a viewer will see it. Use the banner in the `ServiceHeader` and repeat it in the footer.

This is the design system for public services on GovKestria, the government portal run by the Kestria Digital Service (KDS). Use it for every Kestria prototype and service that xstack builds. The facts about Kestria (regions, codes, laws, services, statistics) come from the Kestria world bible. This file covers only how services look, read and behave.

**Character: warm and conversational.** The state as a helpful neighbour, like a chat at a Citizen Service Centre. Lake Kerrow blue with a dry-season-sun accent, Noto Sans, rounded corners, icons that support words.

## Files in this package

| File | What it is | How to use it |
| --- | --- | --- |
| `DESIGN.md` | This file: rules, tokens and component markup | Read it before building any Kestria page |
| `tokens.css` | Every design token as a CSS custom property, plus type classes | Link it first on every page. Never hard-code a colour or size that has a token. |
| `tokens.json` | The same tokens as data | For tooling and checks. `tokens.css` and `tokens.json` must agree. |
| `kestria.css` | Component styles (`kg-` prefix) | Link it after `tokens.css` |
| `example.html` | A complete question page using every core component | Copy it as the starting template for a new page |

Load order for every page:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap">
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="kestria.css">
```

Put `class="kg-body"` on `<body>`. Wrap content in `.kg-width`, and wrap the main content in `<main class="kg-main" id="main">`.

## Rules for building Kestria services

1. **Show the fictional notice.** Use `.kg-banner` at the top and repeat the line in `.kg-footer`. Never remove or shorten it.
2. **No real flags, crests, emblems, or bank or telco logos.** The GovKestria wordmark is plain type. Don't draw a crest or coat of arms.
3. **Use only the reserved codes in content:**
   - phone numbers `+999 …`
   - web and email domains `kestria.test`
   - KUINs in the range `9900 000 000`–`9900 999 999`
   - money as `K` (currency code `XTS` only in data)
4. **One question per page, one primary button per page.**
5. **Mobile first, on a 2G connection.** Every page must work at 320px wide with no horizontal scroll. Keep each page under 100 KB before fonts, use no JavaScript frameworks for content pages, and don't use images that carry meaning without text.
6. **Show the assisted route.** End every service start page and question page with a `.kg-help` panel listing in-person help (Citizen Service Centre, district office) and a phone line.
7. **Accessible to WCAG 2.2 AA**, as required by the Accessibility Regulations 2024 under the Persons with Disabilities Act 2018. See the Accessibility section.

## Why it looks like this (design principles)

- **Words are not enough.** 26% of adults cannot read a simple sentence, and only 9% of adults in the Northern Plains read English comfortably. Pair every primary action and every status with an icon. Keep sentences under 15 words. Write every screen so that a Citizen Service Centre officer or a family member can read it aloud.
- **Assume the phone is shared.** 23% of phones are shared with someone else in the household. Don't show the previous person's data after sign-out. Confirmation messages name the service, not the person's details.
- **Kestrian first, English always, and Vell or Sora where the service reaches the north or the coast.** Layouts must hold text 30% longer than the English.
- **Warm, not decorative.** Rounded corners and the sun accent make the service feel approachable. No shadows, gradients, photos behind text or illustrations that carry meaning.

## Tokens

All tokens live in `tokens.css` as `var(--name)`. There is one theme, `light`.

### Colour

| Token | Value | Use |
| --- | --- | --- |
| `--surface` | `#ffffff` | Page background, form fields |
| `--surface-alt` | `#edf3f6` | Lake mist. Footer, help panel, secondary buttons, tags |
| `--ink` | `#0f1e26` | All body text and headings (17.0:1 on `surface`). Focus bar. Text on `accent` and `warning`. |
| `--ink-muted` | `#4a5a63` | Hint text, captions (7.2:1 on `surface`) |
| `--brand` | `#0b4f6c` | Lake Kerrow blue. Header band, primary buttons, selected radios |
| `--brand-strong` | `#073a50` | Hover and pressed state of `brand` |
| `--on-brand` | `#ffffff` | Text and icons on `brand`, `brand-strong`, `banner` (8.9:1 on `brand`) |
| `--accent` | `#f2b33d` | Dry-season sun. **Fill only, once per screen**: the header bar, step markers, one key figure |
| `--on-accent` | `#0f1e26` | Text on `accent` (9.2:1) |
| `--link` | `#0b5a85` | Links (7.5:1). Always underlined. |
| `--link-visited` | `#5b3a87` | Visited links |
| `--focus` | `#ffbf47` | Focus fill, always with a 3px `ink` bar |
| `--border` | `#687984` | Form control borders (4.5:1 on `surface`) |
| `--hairline` | `#d2dde3` | Decorative dividers only, never a control edge |
| `--success` | `#18693f` | Success text and border (6.7:1) |
| `--error` | `#b0261e` | Error text and border (6.7:1) |
| `--warning` | `#f2b33d` | Warning notice fill with `ink` text. Never text. |
| `--banner` | `#0f1e26` | Fictional-country banner background |

Colour rules:

- Set all text in `ink` on `surface` or `surface-alt`. Use `ink-muted` only for hints and captions.
- Never set text in `accent` or `warning`, and never put white text on them.
- Use `accent` once per screen. The header bar counts.
- `success` and `error` have the same lightness. Always add a word ("Success", "Error:") and an icon.

### Typography

One family: **Noto Sans** (`--font-sans`, falling back to Arial). It covers Kestrian's diacritics (ä, ö, š). Use these classes or match their values:

| Class | Size / line height | Weight | Use |
| --- | --- | --- | --- |
| `.heading-xl` | 34 / 42px | 700 | Page title on start and confirmation pages. One per page. |
| `.heading-l` | 26 / 34px | 700 | Question page titles (usually inside the `<legend>` or `<label>`) |
| `.heading-m` | 20 / 28px | 600 | Section and panel headings |
| `.body` | 18 / 28px | 400 | All body copy, labels and buttons (the `kg-body` default) |
| `.body-s` | 16 / 24px | 400 | Hints and secondary text. The smallest size for anything people must read. |
| `.caption` | 14 / 20px | 400 | Banner, footer and legal lines only |

Keep body text within `--measure` (640px). Use sentence case everywhere.

### Spacing, radius and size

| Token | Value | Use |
| --- | --- | --- |
| `--space-1` | 4px | Icon-to-label gaps |
| `--space-2` | 8px | Label to hint |
| `--space-3` | 16px | Control padding, page gutter on phones |
| `--space-4` | 24px | Between questions, card padding |
| `--space-5` | 32px | Page gutter at 640px and above |
| `--space-6` | 48px | Between page sections |
| `--radius-sm` | 6px | Inputs, notices |
| `--radius-md` | 12px | Buttons, cards, help panel |
| `--radius-pill` | 999px | Tags and the language switcher only |
| `--target-min` | 48px | Minimum height of every tappable control |
| `--measure` | 640px | Maximum width of text |
| `--page-max` | 960px | Maximum width of the page |

No shadows. Separate things with space, `hairline` rules or `surface-alt`.

## Components

All class names use the `kg-` prefix. Copy this markup exactly; don't restyle components in page CSS.

### ServiceHeader (every page)

```html
<a class="kg-link kg-skip-link" href="#main">Skip to main content</a>
<div class="kg-banner"><div class="kg-width">Kestria is a fictional country, used for demonstration.</div></div>
<header class="kg-header">
  <div class="kg-width kg-header__inner">
    <a class="kg-header__mark" href="/">GovKestria</a>
    <a class="kg-header__service" href="/apply">Apply for the Household Support Grant</a>
    <a class="kg-header__lang" href="?lang=en">English</a>
  </div>
</header>
```

- The service name is a verb phrase in sentence case.
- The language switcher names the *other* language in that language.
- Don't add navigation menus. Services are linear.

### Button

```html
<button class="kg-button" type="submit">Continue</button>
<button class="kg-button kg-button--secondary" type="button">Save and come back later</button>
<button class="kg-button kg-button--warning" type="submit">Stop my payments</button>
```

- Labels start with a verb: "Continue", "Pay K 900", "Send application".
- Use one primary button per page. Group buttons in `.kg-button-group`.
- Use `--warning` only for actions that stop or delete something, and only on a confirmation page.
- Buttons go full width below 480px. Never use a button for navigation; use a link.
- An icon is optional. Put it inline as an SVG and never use it without the text label.

### Notice

```html
<div class="kg-notice kg-notice--success" role="status">
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>
  <div><span class="kg-notice__title">Success</span><p>Application sent. We will send you an SMS within 10 days.</p></div>
</div>

<div class="kg-notice kg-notice--error" role="alert">
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
  <div><span class="kg-notice__title">Error:</span><p><a href="#kuin">Enter your KUIN</a></p></div>
</div>

<div class="kg-notice kg-notice--warning">
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l10 18H2zM12 10v5M12 18v.5"/></svg>
  <div><span class="kg-notice__title">Warning</span><p>Giving false information on purpose can stop your payments.</p></div>
</div>
```

- Put an error notice at the top of `main` when a form fails. It lists each error as a link to its field.
- Error messages say what to do: "Enter your KUIN", not "Invalid input".
- Always keep the title word and the icon.

### Text input

```html
<div class="kg-field">
  <label class="kg-label" for="kuin">KestriaID number (KUIN)</label>
  <span class="kg-hint" id="kuin-hint">It has 10 numbers. It is on the front of your KestriaID card.</span>
  <input class="kg-input kg-input--width-10" id="kuin" name="kuin" inputmode="numeric" autocomplete="off" aria-describedby="kuin-hint">
</div>
```

For a field with an error, add `kg-field--error` to the wrapper and put a message before the input:

```html
<span class="kg-error-message" id="kuin-error"><span class="kg-visually-hidden">Error:</span> Enter your KUIN</span>
```

Add `kuin-error` to `aria-describedby`. Size inputs to the expected answer (`kg-input--width-10` for IDs and phone numbers).

### Radios

```html
<fieldset class="kg-fieldset">
  <legend><h1 class="heading-l">Who looks after the money in your household?</h1></legend>
  <span class="kg-hint">We will pay the grant into this person's mobile money or bank account.</span>
  <label class="kg-radio"><input type="radio" name="money" value="me"><span>Me</span></label>
  <label class="kg-radio"><input type="radio" name="money" value="other"><span>Someone else in my household</span></label>
</fieldset>
```

- On a one-question page, the question is the `<legend>`, set as `heading-l`.
- Use radios for up to 6 options. Never preselect one.

### Tag

```html
<span class="kg-tag">Question 3 of 6</span>
```

Use it for status and progress labels. Keep it short and never make it interactive.

### Help panel (assisted route)

```html
<div class="kg-help">
  <h2 class="heading-m">Get help</h2>
  <p>Visit any Citizen Service Centre or your district office. Staff can apply for you.</p>
  <p>Call the helpline on +999 … in Kestrian, English, Vell or Sora.</p>
</div>
```

### Footer

```html
<footer class="kg-footer">
  <div class="kg-width">
    <p>Kestria is a fictional country, used for demonstration.</p>
    <p>Run by the Kestria Digital Service. <a class="kg-link" href="#">Privacy</a> · <a class="kg-link" href="#">Accessibility</a></p>
  </div>
</footer>
```

### Links

Use `<a class="kg-link">` for every link in content. Links are always underlined and never open new windows without saying so.

## Page patterns

- **Start page:** `heading-xl` title, what you need, how long it takes, the fees (e.g. "It costs K 900"), a primary "Start now" button, then the help panel.
- **Question page:** Back link, error notice if any, a progress tag, one question as `heading-l`, Continue, then the help panel. Use `example.html` as the template.
- **Check your answers:** a list of each answer with a "Change" link, then "Send application".
- **Confirmation page:** a success notice, a reference number, what happens next (usually "We will send you an SMS"), and how to get help.

## Writing content

- Address people as "you". The service is "we".
- Use sentence case for headings, buttons and labels.
- Write money as **K 1,500**: capital K, a space, comma thousands, and no cents unless they are not zero. Never show "XTS" on screen.
- Write dates as **14 March 2026** and phone numbers as **+999 77 123 4567**.
- Keep sentences under 15 words and use common words. No emoji, no exclamation marks, and don't say "please" before every instruction.
- Name a law only when people need it: "Under the Data Protection Act 2022, you can see the data we hold about you."
- Every national service must work in Kestrian and English (Digital Government Act 2023, s.14). Plan layouts and string lengths for both.

Real example: *"You can get K 1,500 a month if your household is in the National Social Registry. Only one person in the household can apply."*

## Iconography

- No icon set is bundled. Use simple 24px line icons with a 2–2.5px stroke, drawn inline as SVG with `stroke="currentColor"`. Copy the paths from the Notice examples (tick, cross, warning) for consistency.
- Icons always sit beside visible text and carry `aria-hidden="true"`.
- Give every primary action and every status an icon, for Vell-first and low-literacy users.

## Accessibility (WCAG 2.2 AA)

- Every text and background pair above meets 4.5:1. Control borders and focus indicators meet 3:1.
- **Focus:** every interactive element shows the `focus` yellow fill with a 3px `ink` bar (already in `kestria.css`). Never set `outline: none` without this replacement.
- Every tappable control is at least `--target-min` (48px) high.
- Every input has a `<label>`. Hints and errors are linked with `aria-describedby`.
- Group related radios in a `<fieldset>` with a `<legend>`.
- Use `role="alert"` on error notices and `role="status"` on success notices.
- Don't convey information by colour alone.
- Pages must work at 200% zoom and at 320px wide, and with JavaScript turned off for basic journeys.
- Set `lang` on `<html>` (`en` for English).

## Don'ts

- Don't add new colours, fonts, shadows, gradients or radii. If something is missing, add it to `tokens.json` and `tokens.css` first.
- Don't use Inter, Roboto or any second typeface.
- Don't use real government, bank or telco names or logos. The invented ones in the world bible are fine (for example Lumo Money, Kora Wallet, Aranport Commercial Bank) – as text only, never with a logo.
- Don't build cards with coloured left borders, emoji, or hero images.
- Don't hide the fictional-country notice, and don't let a cookie banner or modal cover it.

## Checklist before you finish a page

- [ ] The fictional notice is in the banner and the footer
- [ ] It loads `tokens.css` then `kestria.css`, with no hard-coded colours
- [ ] One question and one primary button
- [ ] There's a help panel with the assisted route
- [ ] Money, dates, phone numbers and IDs use the Kestria formats and reserved ranges
- [ ] Focus is visible on every control, and every target is 48px or more
- [ ] It works at 320px wide with no horizontal scroll
- [ ] Copy is in sentence case, uses short sentences and has no emoji
