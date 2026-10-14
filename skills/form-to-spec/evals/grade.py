#!/usr/bin/env python3
"""Scripted checks for form-to-spec eval runs.

Usage:
  grade.py SPEC.md --eval-id N [--out grading.json]

Reads evals.json and ground-truth.json next to this script. Checks the
pass criteria that a script can check reliably:

  1. all ten sections, in order
  2. coverage – every numbered item on the form has a row in section 10
  3. unnumbered items (declarations, signatures, official use) are in the spec
  4. no invented money amounts
  5. no invented durations (processing times, validity periods)
  6. legal-status check fires when the form cites legislation, and doesn't claim
     legislation when it doesn't
  7. signature / oath check fires, and calls it a blocker
  8. fee recorded as unknown when the form gives no amount
  9. lookups only from the profile
 10. no country-specific platform, agency or standard the profile didn't supply
 11. says the spec is not the user need

Writes grading.json in the skill-creator format: {expectations: [{text, passed, evidence}], summary}.
Judgement checks (sensitive wording, ambiguity, language handling) are for the grader agent.
"""

import argparse
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", ".."))

SECTION_WORDS = [
    "source", "profile", "how to read", "items|section", "declaration|signature",
    "back office", "before you start", "questions", "lookup opportunit", "coverage",
]

MONEY = re.compile(r"(?:BDS\$|US\$|[$£€]|\b(?:BBD|GBP|USD|TLM|KES)\s?)\s?\d[\d,]*(?:\.\d+)?|\b\d[\d,]*(?:\.\d+)?\s?(?:BBD|GBP|USD|TLM|pounds|dollars)\b", re.I)
WORDNUM = r"(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|twelve|fourteen|twenty|thirty|sixty|ninety)"
DURATION = re.compile(rf"\b{WORDNUM}(?:\s*[-–]\s*{WORDNUM})?\s+(?:working\s+|business\s+|calendar\s+)?(?:day|week|month|year)s?\b", re.I)


def norm_id(s):
    s = s.lower().strip()
    s = re.sub(r"\*|`", "", s)
    s = re.sub(r"^(?:q|item|panel|question|no\.?|rhif|panel)\s*", "", s)
    # "5 [Owner A]", "1 Full name" and "4(a) (field 6)" are rows for items 5, 1 and 4(a).
    m = re.match(r"^(\d+\s*[a-z]?(?:\s*\([a-z0-9]+\))?)(?:\s|$|\[)", s + " ")
    if m:
        s = m.group(1)
    return re.sub(r"[\s().\[\]]", "", s)


def form_text(form):
    path = os.path.join(HERE, "files", form)
    side = os.path.splitext(path)[0] + ".transcript.txt"
    if os.path.exists(side):
        return open(side, encoding="utf-8").read()
    py = os.environ.get("FORM_TO_SPEC_PY", sys.executable)
    r = subprocess.run([py, os.path.join(HERE, "..", "scripts", "inventory.py"), path], capture_output=True, text=True)
    try:
        return "\n".join(p["text"] for p in json.loads(r.stdout)["text"])
    except Exception:
        return ""


def profile_text(profile_dir):
    if not profile_dir:
        return ""
    out = []
    d = os.path.join(REPO, profile_dir)
    for f in ("profile.md", "dpi.md"):
        p = os.path.join(d, f)
        if os.path.exists(p):
            out.append(open(p, encoding="utf-8").read())
    return "\n".join(out)


def split_sections(md):
    """Return [(number, title, body)] for '## N. Title' headings."""
    parts = re.split(r"^##\s+(\d+)\.?\s+(.*)$", md, flags=re.M)
    out = []
    for i in range(1, len(parts), 3):
        out.append((int(parts[i]), parts[i + 1].strip(), parts[i + 2]))
    return out


def table_rows(body):
    rows = []
    for line in body.splitlines():
        line = line.strip()
        if line.startswith("|") and not re.match(r"^\|[\s:|-]+\|?$", line):
            cells = [c.strip() for c in line.strip("|").split("|")]
            rows.append(cells)
    return rows


def check(spec, ev, gt):
    md = open(spec, encoding="utf-8").read()
    low = md.lower()
    g = ev["grade"]
    truth = gt["forms"][g["form"]]
    ftext = form_text(g["form"])
    ptext = profile_text(g["profile_dir"])
    results = []

    def add(text, passed, evidence):
        results.append({"text": text, "passed": bool(passed), "evidence": evidence})

    # 1 sections
    secs = split_sections(md)
    nums = [n for n, _, _ in secs]
    titles_ok = all(
        any(re.search(w, t.lower()) for w in SECTION_WORDS[n - 1].split("|"))
        for n, t, _ in secs if 1 <= n <= 10
    )
    add("Has all ten sections in order (Source … Coverage check)",
        nums[:10] == list(range(1, 11)) and titles_ok,
        f"section numbers found: {nums}; titles: {[t for _, t, _ in secs]}")

    # 2 coverage
    cov = next((b for n, _, b in secs if n == 10), "")
    ids = set()
    for cells in table_rows(cov):
        for piece in re.split(r",|;|/|&|\band\b", cells[0]):
            ids.add(norm_id(piece))
    missing = [i for i in truth["numbered"] if norm_id(i) not in ids]
    add(f"Coverage: all {len(truth['numbered'])} numbered items have a row in the coverage check",
        not missing, f"missing: {missing}" if missing else "all present")

    # 3 unnumbered
    miss_un = [alts[0] for alts in truth["unnumbered"] if not any(a in low for a in alts)]
    add("Unnumbered items (declaration, signature, witness, official use) appear in the spec",
        not miss_un, f"missing: {miss_un}" if miss_un else "all present")

    # 4 money
    allowed = (ftext + "\n" + ptext).lower().replace(" ", "")
    money = sorted({m.group(0).strip() for m in MONEY.finditer(md)})
    invented = [m for m in money if m.lower().replace(" ", "") not in allowed]
    add("No invented money amounts (every amount appears on the form or in the profile)",
        not invented, f"amounts not on the form: {invented}" if invented else f"amounts found: {money or 'none'}")

    # 5 durations
    fl = " ".join(ftext.lower().split())
    # Ignore the first cell of table rows: it holds item numbers ("16 Year and results").
    body_only = "\n".join(re.sub(r"^\|[^|]*\|", "|", l) for l in md.splitlines())
    durs = sorted({" ".join(m.group(0).lower().split()) for m in DURATION.finditer(body_only)})
    inv_d = [d for d in durs if d not in fl and d.replace("-", "–") not in fl
             and not any(d == " ".join(f.lower().split()) for f in truth["form_text_facts"])]
    add("No invented durations, processing times or validity periods",
        not inv_d, f"durations not on the form: {inv_d}" if inv_d else f"durations found: {durs or 'none'}")

    # 6 legal status
    s1 = next((b for n, _, b in secs if n == 1), "").lower()
    if truth["has_legal_citation"]:
        ok = "legal status" in s1 and "[verify with policy]" in s1
        add("Legal-status check fires: section 1 has a legal status callout with [VERIFY WITH POLICY]",
            ok, "callout found" if ok else "no 'Legal status' + [VERIFY WITH POLICY] in section 1")
    else:
        claims = re.search(r"(set out in|prescribed (?:by|under|in)|made under) (?:the )?[a-z ]*(act|regulations|rules|schedule)", s1)
        says_none = re.search(r"(no legislation|cites no|no legal citation|none on the form|not cite|no legislative)", s1)
        add("Legal-status check runs and finds no citation (doesn't claim legislation the form doesn't cite)",
            bool(says_none) and not claims,
            f"says none: {bool(says_none)}; claims legislation: {claims.group(0) if claims else 'no'}")

    # 7 signature
    s5 = next((b for n, _, b in secs if n == 5), "").lower()
    sig_words = any(w in s5 for w in ("sign", "oath", "swear", "sworn", "witness", "declar", "execut"))
    add("Signature / oath check fires and names it as the likely blocker",
        sig_words and "blocker" in s5,
        f"signature words: {sig_words}; 'blocker' in section 5: {'blocker' in s5}")

    # 8 fee unknown
    if not truth["fee_amount_on_form"]:
        fee_unknown = re.search(r"(fee|amount)[^\n]{0,120}(unknown|not on the form|not stated|not given|isn't on the form|not printed)", low) \
            or re.search(r"(unknown|not on the form|not stated)[^\n]{0,80}fee", low)
        add("Fee recorded as unknown (the form gives no amount)", bool(fee_unknown),
            fee_unknown.group(0)[:160] if fee_unknown else "no 'fee … unknown' statement found")

    # 9 lookups only from profile
    bad = []
    lookups = 0
    for n, _, body in secs:
        if n not in (4, 5):
            continue
        for cells in table_rows(body):
            if len(cells) < 3:
                continue
            t = cells[2]
            if re.match(r"^\W*lookup\b(?!\s*opportunit)", t, re.I):
                lookups += 1
                if not any(a.lower() in t.lower() for a in g["allowed_lookups"]):
                    bad.append(f"{cells[0]}: {t[:90]}")
    if not g["allowed_lookups"]:
        add("No lookups used (no profile) – government-held data is a lookup opportunity", lookups == 0,
            f"lookup rows: {lookups}")
    else:
        add("Every Lookup row names a lookup the profile provides", not bad,
            f"{lookups} lookup rows; not from profile: {bad}" if bad else f"{lookups} lookup rows, all from profile")

    # 10 banned terms
    hits = [t for t in g["banned_terms"] if re.search(r"(?<![A-Za-z])" + re.escape(t) + r"(?![A-Za-z])", md, re.I)
            and t.lower() not in ftext.lower()]
    add("No country-specific platform, agency or standard that the profile didn't supply",
        not hits, f"found: {hits}" if hits else "none found")

    # 11 caveat
    cav = re.search(r"not (?:a statement of |the )?(?:what )?users? needs?|not what users need|not.{0,30}user need", low)
    add("Says the spec describes what the department asks, not the user need", bool(cav),
        cav.group(0) if cav else "no caveat found")

    passed = sum(r["passed"] for r in results)
    return {"expectations": results,
            "summary": {"passed": passed, "failed": len(results) - passed, "total": len(results),
                        "pass_rate": round(passed / len(results), 3)}}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("spec")
    ap.add_argument("--eval-id", type=int, required=True)
    ap.add_argument("--out")
    a = ap.parse_args()
    evals = {e["id"]: e for e in json.load(open(os.path.join(HERE, "evals.json")))["evals"]}
    gt = json.load(open(os.path.join(HERE, "ground-truth.json")))
    res = check(a.spec, evals[a.eval_id], gt)
    s = json.dumps(res, indent=2, ensure_ascii=False)
    if a.out:
        open(a.out, "w", encoding="utf-8").write(s)
    print(s)


if __name__ == "__main__":
    main()
