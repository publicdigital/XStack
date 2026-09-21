#!/usr/bin/env python3
"""Look up government design systems in the Government Design Systems List.

The list is maintained by the community at
https://github.com/ctrimm/Government-Design-Systems-List as a Markdown README.
This script fetches it live (xstack doesn't bundle a copy), parses each entry
and prints what it finds as JSON.

Usage:
  lookup.py list [--level country|regional|local] [--query TEXT]
  lookup.py show NAME
  lookup.py ... --source PATH_OR_URL   (use a local copy or another URL)

Standard library only, so it runs anywhere Python 3.8+ does.
"""

import argparse
import json
import re
import sys
import unicodedata
import urllib.request

LIST_REPO = "https://github.com/ctrimm/Government-Design-Systems-List"
DEFAULT_SOURCE = (
    "https://raw.githubusercontent.com/ctrimm/Government-Design-Systems-List/main/README.md"
)

LEVELS = {
    "federal / country": "country",
    "state / regional": "regional",
    "local / municipal": "local",
}

STATUS = {"🟢": "yes", "🟡": "partial", "🔴": "no", "⚪": "unknown"}

# Row labels in the list, mapped to stable keys.
FEATURES = {
    "source code": "source_code",
    "no public source code found": "source_code",
    "underpinning technology": "technology",
    "web components": "components",
    "508 compliant": "accessibility",
    "storybook / figma": "design_files",
}

HEADING = re.compile(r"^(#{3,4})\s+(.*)$")
LINK = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")


def fetch(source):
    if re.match(r"^https?://", source):
        req = urllib.request.Request(source, headers={"User-Agent": "xstack-design-systems"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.read().decode("utf-8")
    with open(source, encoding="utf-8") as f:
        return f.read()


def cells(line):
    parts = [c.strip() for c in line.strip().strip("|").split("|")]
    return parts if len(parts) >= 3 else None


def status_of(text):
    for emoji, word in STATUS.items():
        if emoji in text:
            return word
    return None


def parse(markdown):
    entries = []
    level = None
    group = None  # e.g. "United States" heading above local entries
    current = None

    for line in markdown.splitlines():
        if line.startswith("## "):
            level = LEVELS.get(line[3:].strip().lower())
            group = None
            current = None
            continue
        if level is None:
            continue

        m = HEADING.match(line)
        if m:
            text = m.group(2).strip()
            link = LINK.search(text)
            if not link:
                # A grouping heading such as "### United States" under Local.
                group = text
                current = None
                continue
            name = link.group(1).strip()
            if level == "local" and group and not group.lower().startswith("other"):
                name = f"{group} - {name}"
            current = {
                "name": name,
                "level": level,
                "homepage": link.group(2).strip(),
                "pdf_only": "[PDF]" in text,
            }
            entries.append(current)
            continue

        if current is None or not line.startswith("|"):
            continue
        row = cells(line)
        if not row or row[0].startswith("**Feature") or set(row[0]) <= set(":- "):
            continue

        label_link = LINK.search(row[0])
        label = (label_link.group(1) if label_link else row[0]).strip().lower()
        key = FEATURES.get(label)
        if not key:
            continue
        field = {"status": row[1], "info": row[2] if len(row) > 2 else ""}
        state = status_of(row[1])
        if state:
            field["available"] = state
        if key == "source_code":
            field["url"] = label_link.group(2).strip() if label_link else None
        current[key] = field

    for e in entries:
        e["has_public_code"] = bool(e.get("source_code", {}).get("url"))
    return entries


def norm(text):
    # Fold accents so "quebec" finds "Québec" and "cordoba" finds "Córdoba".
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    return re.sub(r"[^a-z0-9]+", " ", text.lower()).strip()


def find(entries, name):
    q = norm(name)
    exact = [e for e in entries if norm(e["name"]) == q]
    if exact:
        return exact
    return [e for e in entries if q in norm(e["name"])]


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--source", default=DEFAULT_SOURCE, help="URL or local path of the list")
    sub = parser.add_subparsers(dest="command", required=True)

    p_list = sub.add_parser("list", help="list entries (names, levels, homepages)")
    p_list.add_argument("--level", choices=sorted(set(LEVELS.values())))
    p_list.add_argument("--query", help="only entries whose name contains this text")

    p_show = sub.add_parser("show", help="show full details for one entry")
    p_show.add_argument("name", nargs="+")

    args = parser.parse_args(argv)

    try:
        entries = parse(fetch(args.source))
    except Exception as exc:  # network down, moved file, etc.
        print(json.dumps({"error": f"Could not read the list: {exc}", "list": LIST_REPO}), file=sys.stderr)
        return 2
    if not entries:
        print(json.dumps({"error": "The list was read but no entries were found. Its format may have changed.", "list": LIST_REPO}), file=sys.stderr)
        return 2

    if args.command == "list":
        rows = entries
        if args.level:
            rows = [e for e in rows if e["level"] == args.level]
        if args.query:
            rows = [e for e in rows if norm(args.query) in norm(e["name"])]
        out = [
            {"name": e["name"], "level": e["level"], "homepage": e["homepage"], "has_public_code": e["has_public_code"]}
            for e in rows
        ]
        print(json.dumps({"list": LIST_REPO, "count": len(out), "entries": out}, ensure_ascii=False, indent=2))
        return 0

    name = " ".join(args.name)
    matches = find(entries, name)
    if len(matches) == 1:
        print(json.dumps({"list": LIST_REPO, "entry": matches[0]}, ensure_ascii=False, indent=2))
        return 0
    result = {
        "list": LIST_REPO,
        "error": "No entry matches that name." if not matches else "More than one entry matches. Pick one.",
        "candidates": [m["name"] for m in matches],
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 1


if __name__ == "__main__":
    sys.exit(main())
