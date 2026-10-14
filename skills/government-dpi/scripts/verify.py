#!/usr/bin/env python3
"""Check facts about a DPI platform before xstack records them.

Nothing gets into dpi.md on trust. This script checks what can be checked from
the outside, and says plainly when something can't be.

Usage:
  verify.py url URL [URL ...]      does each link resolve? (status, final URL)
  verify.py oidc ISSUER            read an identity platform's OpenID Connect discovery document:
                                   the claims, scopes and assurance levels it really supports
  verify.py openapi URL            list the operations in a published OpenAPI (JSON) spec

Every result carries the date it was checked. Exit codes: 0 all good, 1 something
didn't check out, 2 couldn't run at all.

Standard library only, so it runs anywhere Python 3.8+ does.
"""

import argparse
import json
import sys
import urllib.error
import urllib.request
from datetime import date

UA = {"User-Agent": "xstack-dpi-verify", "Accept": "application/json, */*"}


def request(url, method="GET"):
    req = urllib.request.Request(url, headers=UA, method=method)
    return urllib.request.urlopen(req, timeout=20)


def check_url(url):
    for method in ("HEAD", "GET"):  # some servers refuse HEAD
        try:
            with request(url, method) as resp:
                return {"url": url, "ok": True, "status": resp.status, "final_url": resp.geturl()}
        except urllib.error.HTTPError as exc:
            if method == "HEAD" and exc.code in (403, 405, 501):
                continue
            return {"url": url, "ok": False, "status": exc.code}
        except Exception as exc:
            return {"url": url, "ok": False, "error": str(exc)}
    return {"url": url, "ok": False, "error": "no response"}


def get_json(url):
    with request(url) as resp:
        return json.loads(resp.read().decode("utf-8-sig"))


def oidc(issuer):
    url = issuer if ".well-known/" in issuer else issuer.rstrip("/") + "/.well-known/openid-configuration"
    try:
        doc = get_json(url)
    except Exception as exc:
        return {"discovery_url": url, "ok": False, "error": f"No discovery document: {exc}"}
    keep = [
        "issuer", "authorization_endpoint", "token_endpoint", "userinfo_endpoint", "jwks_uri",
        "claims_supported", "scopes_supported", "acr_values_supported", "response_types_supported",
        "grant_types_supported", "token_endpoint_auth_methods_supported", "ui_locales_supported",
        "claims_locales_supported", "code_challenge_methods_supported",
    ]
    out = {"discovery_url": url, "ok": True}
    out.update({k: doc[k] for k in keep if k in doc})
    if "claims_supported" not in doc:
        out["note"] = "The platform doesn't publish claims_supported. Ask the platform team which claims it returns."
    return out


def openapi(url):
    try:
        with request(url) as resp:
            text = resp.read().decode("utf-8-sig")
    except Exception as exc:
        return {"url": url, "ok": False, "error": str(exc)}
    try:
        spec = json.loads(text)
    except ValueError:
        return {"url": url, "ok": False, "error": "Not JSON. YAML specs can't be parsed without extra libraries – read it directly, or look for a .json version."}
    ops = []
    for path, item in (spec.get("paths") or {}).items():
        for method, op in item.items():
            if method.lower() in ("get", "post", "put", "patch", "delete"):
                ops.append({"method": method.upper(), "path": path, "summary": (op or {}).get("summary") or (op or {}).get("operationId")})
    info = spec.get("info") or {}
    return {
        "url": url, "ok": bool(ops),
        "spec": spec.get("openapi") or spec.get("swagger"),
        "title": info.get("title"), "version": info.get("version"),
        "servers": [s.get("url") for s in spec.get("servers") or []] or spec.get("host"),
        "operations": ops,
    }


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("url").add_argument("urls", nargs="+")
    sub.add_parser("oidc").add_argument("issuer")
    sub.add_parser("openapi").add_argument("url")
    args = parser.parse_args(argv)

    if args.command == "url":
        results = [check_url(u) for u in args.urls]
        ok = all(r["ok"] for r in results)
        out = {"checked": date.today().isoformat(), "results": results}
    elif args.command == "oidc":
        out = oidc(args.issuer)
        ok = out["ok"]
        out = {"checked": date.today().isoformat(), **out}
    else:
        out = openapi(args.url)
        ok = out["ok"]
        out = {"checked": date.today().isoformat(), **out}
    print(json.dumps(out, ensure_ascii=False, indent=2))
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
