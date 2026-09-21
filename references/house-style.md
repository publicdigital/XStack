# xstack house style

The conventions every xstack agent follows, whatever the country. They cover voice, plain language, service patterns and accessibility. For your government's visual identity, design system and data formats, read the country profile (see `profiles/README.md`). **Where the profile and this file disagree, the profile wins.**

---

## Voice

- **Plain language always.** Write for a 9-year-old reading on a phone.
- **You and we.** Address the user as "you" and the government as "we". Never "the applicant" or "the Ministry".
- **Active voice.** "Send us your form", not "Your form should be submitted".
- **Short sentences.** Under 20 words. Break long ones in two.
- **The user's own words.** If a local turn of phrase makes something clearer, use it. The profile says which languages and registers people use.
- **Write in the languages people speak.** If a significant part of the population is more comfortable in another language, the service needs to work in it too. Translation is not an afterthought.

### The word-swap list

| Don't write | Write instead |
|---|---|
| provide | tell us, give us |
| submit | send |
| verify, validate | check |
| select | choose |
| proceed | continue |
| commence | start |
| reside | live |
| prior to | before |
| in respect of | about, for |
| mandatory | required, you must |
| utilise | use |
| ensure | make sure |
| apply for | get, claim, register |
| in receipt of | getting |
| at this present time | now |
| as a matter of urgency | urgently |
| with regard to | about |

For languages other than English, build the equivalent list with the content designer and front-line staff. Official register exists in every language.

---

## Service patterns

**Forms.** One thing per page. The flow is always: Start → Question pages → Check your answers → Confirmation. Every page has a Back link except Start. Every confirmation page gives a reference number, the next step and the timing.

**Validation.** Client-side, on submit (not on blur). When it fails, do two things together:

- An **error summary** at the top of the page, linking to each invalid field
- An **inline error message** next to each invalid field, with `aria-invalid="true"` and `aria-describedby` linking the input to the error

The page title starts with "Error: …" so screen readers announce the failure.

**Content pages.** Lead with what the user can do (the verb). Then: steps, eligibility, what you need, how long it takes, cost, what happens next, contact.

**Lookups, not retyping.** If the government already holds the information (identity, address, vehicle, business), look it up through a shared platform rather than asking for it again. The profile names the platforms.

**Dates.** Day, month and year in three separate inputs, unless the profile says otherwise.

**Phone numbers.** Accept any format. Don't enforce a pattern.

**Names.** One "full name" field is safer than first name and last name, because naming conventions vary. Never assume a surname.

---

## Page chrome

Every page of a government service has:

- **An official banner** – a thin bar saying this is an official government service
- **A header** – the government's identity and the service name
- **A phase banner** – "alpha" or "beta", with a link to give feedback
- **A footer** – supporting links, including privacy, accessibility and contact

If the profile names a design system, use its chrome and components. Don't redraw them. Don't introduce one-off colours.

---

## Prototypes without a design system

When there is no profile, or the profile has no design system, prototypes use the **xstack neutral style**. It is plain, accessible and deliberately unbranded, so testing focuses on the journey, not the look. Replace it with the government's own design system as soon as one is available.

```css
:root {
  --xs-text: #0B0C0C;
  --xs-text-secondary: #505A5F;
  --xs-background: #FFFFFF;
  --xs-surface: #F3F2F1;
  --xs-border: #B1B4B6;
  --xs-primary: #1D4F91;       /* header, links, primary buttons */
  --xs-primary-hover: #143A6B;
  --xs-success: #00703C;
  --xs-error: #D4351C;
  --xs-focus: #FFDD00;         /* focus ring: yellow with a dark outline */
  --xs-font: system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", Arial, sans-serif;
}
```

- **Fonts:** the system font stack above. No web font to download, and Noto Sans covers most scripts.
- **Official banner text:** "This is a prototype of a [Country] government service." Use the country from the profile, or "[Country]" as a visible placeholder.
- **Header:** `--xs-primary` background with white text. Service name only, no crest or logo.
- **Focus:** a 3px `--xs-focus` outline with a dark inner outline, so it shows on any background.
- **Contrast:** every text and background pair above meets WCAG 2.2 AA.

---

## Accessibility

- Meet WCAG 2.2 AA, or the level the profile says your law requires.
- Everything works with a keyboard alone, in a logical order, with a visible focus.
- Every input has a visible label. Placeholder text is not a label.
- Don't rely on colour alone to carry meaning.
- Test with a screen reader and at 200% and 400% zoom.

---

## Designing for the conditions users are in

Many users are on low-cost phones, prepaid data and slow or intermittent connections. So:

- Keep pages light. No large images, videos or heavy JavaScript frameworks for simple forms.
- Make it work at 320px wide.
- Save progress where a form is long, so a dropped connection doesn't lose it.
- Offer an assisted-digital or offline route, and signpost it.

---

## Quick checklist for any new output

- [ ] Plain language: official register swapped out, sentences under 20 words, active voice
- [ ] "You" and "we"
- [ ] Reading age friendly to a 9-year-old
- [ ] Works in the languages users speak
- [ ] Profile's design system used, or the xstack neutral style if there isn't one
- [ ] Official banner, header, phase banner and footer on every page
- [ ] Data formats match the profile
- [ ] Lookups used instead of asking for information the government already holds
- [ ] One thing per page (forms)
- [ ] Back link on every page except Start
- [ ] Confirmation page gives reference, next step, timing
- [ ] Accessible: error summary + inline error pattern, `aria-invalid`, `aria-describedby`
- [ ] Works on a phone-sized viewport and a slow connection
- [ ] Keyboard reachable end to end
