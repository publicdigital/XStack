# form-to-spec evals

Five test forms, each run with the skill and without it (a plain agent given the same prompt).

| Eval | Form | Input type | Profile |
|---|---|---|---|
| 1 | Barbados firearm licence, Form A | Flat PDF | Barbados (`profiles/barbados/`) |
| 2 | HM Land Registry TR1 | Fillable PDF (28 AcroForm fields) | Minimal UK (`examples/form-to-spec-tr1-uk/.xstack/`) |
| 3 | Barbados police accident report request | Phone photo (`.jpg`, made from the PDF by skewing, blurring and adding noise) | None |
| 4 | Form A again | Flat PDF | Testland – a made-up country (`profiles/testland/`) |
| 5 | TR1, Welsh-language version | Fillable PDF | Minimal UK |

Evals 1 and 4 are the same form against two profiles. `uk-tr1.doc` is there for trying the Word-document route by hand.

## Files

- `evals.json` – prompts, expected output, and for each eval the allowed lookups and the country terms that must not appear
- `ground-truth.json` – every numbered item on each form, for the coverage check
- `grade.py` – the scripted checks: ten sections in order, coverage, unnumbered items, no invented amounts or durations, legal-status check, signature/oath check, fee unknown, lookups only from the profile, no country terms the profile didn't supply, and the "not the user need" caveat
- `files/` – the test forms (Crown copyright TR1 under the Open Government Licence; Barbados forms are public government forms). `*.transcript.txt` holds the true text of the photographed form
- `profiles/testland/` – the fictional profile

## Running them

Run each prompt in `evals.json` from the repo root, with and without the skill, saving `form-spec.md`. Then:

```bash
python3 skills/form-to-spec/evals/grade.py path/to/form-spec.md --eval-id 1
```

`grade.py` needs `pypdf` (`pip install pypdf pypdfium2`), or set `FORM_TO_SPEC_PY` to a Python that has it. Judgement checks – sensitive wording kept, no service design, ambiguity spotted, faithful transcription – need a grader agent or a person.

## Results – iteration 1 (2026-10-14)

| | With skill | Without skill |
|---|---|---|
| Scripted checks (55) | 55 / 55 | 27 / 55 |
| Judgement checks (51) | 51 / 51 | 25 / 51 |
| Overall pass rate | 100% | 49% |
| Mean time | 167 s | 145 s |
| Mean tokens | 104k | 88k |

Without the skill, agents invented facts (a minimum age of 18, "takes about 25 minutes", a placeholder fee, row caps, fee rules for TR1 from memory), reworded legal and health questions by default, named laws and agencies the profile didn't give, and designed page flows and error messages instead of a spec.
