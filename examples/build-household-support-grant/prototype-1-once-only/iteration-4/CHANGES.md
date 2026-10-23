# Iteration 4 – Prototype 1 (Once-only, phone-first)

Round of feedback: `feedback-round-3.md`. This is a constraint from the profile, which now describes Kestrian (*kestrin*) in `profiles/kestria/kestrian.md`. **There was no user testing, and Kestrian is invented.** Nothing here is evidence about real people reading in their own language.

**Not changed:** the journey, page ids, validation, data, DPI calls and GovKestria styling are the same as iteration 3. The page's own scripts are byte-identical to iteration 3. Iteration 4 adds two scripts at the end of the page.

## Critical changes applied

1. **The language switcher works for Kestrian.** (Feedback item 1)
   - **The switch:** every screen, error message and page title switches between English and Kestrian. So do the simulated KestriaID, KesLink and GovPay screens.
   - **Switching back:** it restores exactly the English that was replaced.
   - **Language tag:** `lang` changes to `art-x-kestrin` (`art` is the ISO 639 code for artificial languages, and `x-kestrin` is a private-use tag).
   - **Focus:** it moves to the page heading, so the new language is read from the start.
   - **The links:** P1 had one "Kestrian" link next to Vell and Sora, and no English link. It now names the other language in that language: **Kestrin** on an English page and **English** on a Kestrian page (`DESIGN.md`, ServiceHeader).
   - Point 3 (Make it work for everyone, in their language)
   - Point 4 (Keep it simple and in plain words)

## Important changes applied

2. **One shared string list, inlined:**
   - `kestrin/strings.json` has 1,381 English → Kestrian entries. Some are patterns, where `<x>` marks a name, age, district, amount or heading that the page fills in at runtime.
   - `kestrin/kestrin.js` is the switcher.
   - Both are shared by all three prototypes, so the same English is always the same Kestrian.
   - Point 7 (Build on the national platforms), in the sense of reuse.
3. **Team-facing text stays in English.** The xstack banner, the assumptions panel and `.fake-data` values aren't translated, and neither are names, codes or brands.
4. **A note in the assumptions panel,** in a new "Iteration 4 – Kestrian" section. It says Kestrian is invented, explains how to find anything left in English (`xstackKestrin.missing()` in the browser console), and adds a `[VERIFY WITH USERS]` item about finding the switcher on a shared phone.

## Worth testing in the next round

- **Finding the switcher:** do people find it, and recognise **Kestrin**, the language named in itself?
- **Shared phones:** what happens when a shared phone is left in the other language for the next person?

## Deferred

- **Vell and Sora:** there's no description of either language yet.
- **Remembering the choice between visits:** prototypes are single pages, and `localStorage` doesn't work in every way people open them.
- **Starting in Kestrian:** opening with `#kestrin` on the address should start in Kestrian. It's untested, because the browser used for checks drops the `#` part.
- **Size:** the strings add about 145 KB to the page (about 40 KB gzipped), which is over the 100 KB page budget in `DESIGN.md`. A real service would load one language at a time.
- **Behaviour changes from earlier rounds:** mock v1.1 and acting-for, and the `DESIGN.md` departures listed in iteration 3.

## Rejected

- **Machine-translating from a real language.** Kestrian is defined by `profiles/kestria/kestrian.md` and its lexicon, and every string follows it.

## Checks

- `node --check` passes for every script.
- The page's own scripts are identical to iteration 3.
- `kestrin.js` is inlined verbatim.
- **In a browser, in Kestrian:**
  - Ines, Desa, Mirel and Talin, from start to confirmation, through the simulated KestriaID and KesLink screens
  - every one of the 24 pages shown
  - every question page submitted empty, to show its errors
  - each simulated platform screen opened

  Nothing was left in English apart from names, codes and brands.
- **Switching back to English** restored the original text, with no Kestrian left behind.
- **At 320px wide in Kestrian,** no page scrolls sideways.

**Not checked:** a screen reader, zoom, and the routes not listed above.

## Found, not fixed

- **Long sentences stay long.** On average, long Kestrian sentences are about the same length as the English. The language sheet now says so.
