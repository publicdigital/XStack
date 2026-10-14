#!/usr/bin/env python3
"""Look up a country's Digital Public Infrastructure in the DPI Map dataset.

The DPI Map (https://dpimap.org) is run by the UCL Institute for Innovation and
Public Purpose. Its data is published at
https://github.com/olizilla/digital-public-infra-map as dated JSON snapshots,
one file each for digital ID, payment and data exchange systems.

This script reads the newest snapshot live (xstack doesn't bundle a copy: the
repository has no licence that would let us redistribute it), parses each
system and prints what it finds as JSON.

Usage:
  dpimap.py countries [--query TEXT]
  dpimap.py show COUNTRY [--pillar identity|payment|exchange]
  dpimap.py --source DIR ...          (offline: a folder with identity, payment and exchange .json or .csv)

Standard library only, so it runs anywhere Python 3.8+ does.
"""

import argparse
import csv
import io
import json
import re
import sys
import unicodedata
import urllib.request
from datetime import datetime

REPO = "https://github.com/olizilla/digital-public-infra-map"
API = "https://api.github.com/repos/olizilla/digital-public-infra-map/contents/public/data"
RAW = "https://raw.githubusercontent.com/olizilla/digital-public-infra-map/main/public/data"
CITATION = "DPI Map ({date}). Institute for Innovation and Public Purpose, UCL. https://dpimap.org/data"
PILLARS = ("identity", "payment", "exchange")

# Column names differ slightly between pillars (and carry stray spaces), so map them.
NAME = {"identity": "Digital ID name", "payment": "Payment system name", "exchange": "Data exchange system name"}
STATUS = {"identity": "Status of Implementation", "payment": "Status of Implementation", "exchange": "Status of implementation"}
OWNER = {"identity": "Governing entity", "payment": "Operator", "exchange": "Governing entity"}


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "xstack-dpi", "Accept": "application/vnd.github+json"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8-sig")


def parse_rows(text, name):
    if name.endswith(".json"):
        return json.loads(text)
    return list(csv.DictReader(io.StringIO(text)))


def load_remote():
    """Newest dated snapshot via the GitHub API; falls back to latest/*.csv."""
    try:
        dirs = [d["name"] for d in json.loads(fetch(API)) if d["type"] == "dir" and re.match(r"^\d{4}-\d{2}-\d{2}$", d["name"])]
        snapshot = max(dirs)
        files = [f["name"] for f in json.loads(fetch(f"{API}/{snapshot}")) if f["name"].endswith(".json")]
        data = {}
        for pillar in PILLARS:
            name = next(f for f in files if pillar in f)
            data[pillar] = parse_rows(fetch(f"{RAW}/{snapshot}/{name}"), name)
        return snapshot, data
    except Exception:
        # The API is rate-limited without a token. latest/ is kept current by the maintainers.
        data = {p: parse_rows(fetch(f"{RAW}/latest/{p}.csv"), f"{p}.csv") for p in PILLARS}
        return "latest", data


def load_local(folder):
    data = {}
    for pillar in PILLARS:
        for ext in (".json", ".csv"):
            try:
                with open(f"{folder}/{pillar}{ext}", encoding="utf-8-sig") as f:
                    data[pillar] = parse_rows(f.read(), ext)
                break
            except FileNotFoundError:
                continue
        else:
            raise FileNotFoundError(f"No {pillar}.json or {pillar}.csv in {folder}")
    return "local", data


def clean(value):
    if value is None:
        return None
    if isinstance(value, str):
        value = value.strip()
        if value in ("", "NA", "N/A", "Unknown"):
            return None
    return value


def iso_date(value):
    value = clean(value)
    if not value:
        return None
    for fmt in ("%d/%m/%y", "%d/%m/%Y"):
        try:
            return datetime.strptime(value, fmt).date().isoformat()
        except ValueError:
            pass
    return value


def implementation(value):
    # Mirrors the DPI Map site's normaliseImplementationStatus.
    value = clean(value) or ""
    if re.search(r"implemented|active", value, re.I):
        return "active"
    if re.search(r"plan|pilot|rollout", value, re.I):
        return "planned or pilot"
    return "unknown"


def url_of(value):
    value = clean(value)
    if not value:
        return None
    return value if re.match(r"^https?://", value) else f"https://{value}"


def system(pillar, row):
    impl = implementation(row.get(STATUS[pillar]))
    counts = str(row.get("Count for DPI")).strip() == "1"
    details = {k.strip(): clean(v) for k, v in row.items()}
    for k in ("Country / Region", "Last updated", "Count for DPI", "URL", NAME[pillar], STATUS[pillar], OWNER[pillar]):
        details.pop(k.strip(), None)
    out = {
        "pillar": pillar,
        "name": clean(row.get(NAME[pillar])),
        "url": url_of(row.get("URL")),
        "implementation": impl,
        # The DPI Map's own verdict: meets its DPI criteria, work in progress, or neither.
        "dpi_map_status": "DPI" if counts else ("in progress" if impl in ("active", "planned or pilot") else "not assessed as DPI"),
        "owner": clean(row.get(OWNER[pillar])),
        "last_updated": iso_date(row.get("Last updated")),
    }
    if pillar == "exchange":
        # e.g. "X-Road" – tells the skill which platform family to read up on.
        out["technical_base"] = clean(row.get("Base technical architecture"))
        details.pop("Base technical architecture", None)
    out["details"] = {k: v for k, v in details.items() if v is not None}
    return out


def norm(text):
    text = unicodedata.normalize("NFKD", text or "").encode("ascii", "ignore").decode("ascii")
    return re.sub(r"[^a-z0-9]+", " ", text.lower()).strip()


def countries(data):
    names = {}
    for pillar in PILLARS:
        for row in data[pillar]:
            c = (row.get("Country / Region") or "").strip()
            if c:
                names.setdefault(norm(c), c)
    return sorted(names.values())


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--source", help="a local folder with identity/payment/exchange .json or .csv files")
    sub = parser.add_subparsers(dest="command", required=True)
    p_list = sub.add_parser("countries", help="list countries and regions in the dataset")
    p_list.add_argument("--query", help="only names containing this text")
    p_show = sub.add_parser("show", help="every system the DPI Map records for one country")
    p_show.add_argument("country", nargs="+")
    p_show.add_argument("--pillar", choices=PILLARS)
    args = parser.parse_args(argv)

    try:
        snapshot, data = load_local(args.source) if args.source else load_remote()
    except Exception as exc:
        print(json.dumps({"error": f"Could not read the DPI Map data: {exc}", "repo": REPO}), file=sys.stderr)
        return 2
    if not all(data.get(p) for p in PILLARS):
        print(json.dumps({"error": "The DPI Map data was read but a pillar is empty. Its format may have changed.", "repo": REPO}), file=sys.stderr)
        return 2

    source = {"repo": REPO, "snapshot": snapshot, "citation": CITATION.format(date=snapshot)}
    names = countries(data)

    if args.command == "countries":
        rows = [n for n in names if not args.query or norm(args.query) in norm(n)]
        print(json.dumps({"source": source, "count": len(rows), "countries": rows}, ensure_ascii=False, indent=2))
        return 0

    q = norm(" ".join(args.country))
    matches = [n for n in names if norm(n) == q] or [n for n in names if q in norm(n)]
    if len(matches) != 1:
        print(json.dumps({
            "source": source,
            "error": "No country matches that name." if not matches else "More than one country matches. Pick one.",
            "candidates": matches,
        }, ensure_ascii=False, indent=2))
        return 1

    country = matches[0]
    result = {"source": source, "country": country}
    for pillar in ([args.pillar] if args.pillar else PILLARS):
        result[pillar] = [system(pillar, r) for r in data[pillar] if norm(r.get("Country / Region")) == norm(country)]
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
