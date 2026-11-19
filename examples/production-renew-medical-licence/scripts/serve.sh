#!/usr/bin/env bash
#
# Serve the public/ directory on localhost:8080 for testing.
# Adds the security headers the production server would also set, so the
# tests/security/headers.sh script and the Playwright security tests pass
# against the local dev server.
#
# Falls back from Python 3 to busybox httpd if Python isn't available.

set -euo pipefail

PORT="${PORT:-8080}"
DIR="$(cd "$(dirname "$0")/.." && pwd)/public"

if command -v python3 >/dev/null 2>&1; then
  echo "Serving $DIR on http://localhost:$PORT (Python 3 + security headers)"
  cd "$DIR"
  exec python3 - "$PORT" <<'PY'
import sys, http.server, socket

PORT = int(sys.argv[1])

class SecureHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Content-Security-Policy",
            "default-src 'self'; "
            "script-src 'self'; "
            "style-src 'self' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com; "
            "img-src 'self' data:; "
            "connect-src 'self'; "
            "frame-ancestors 'none'; "
            "base-uri 'self'; "
            "form-action 'self'")
        self.send_header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("Permissions-Policy", "geolocation=(), camera=(), microphone=()")
        self.send_header("Server", "alpha.gov.bb")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass  # keep test output readable

    def do_POST(self):
        # Stand-in for the back end: read and discard the body, then
        # Post/Redirect/Get to the form's action. Nothing is stored.
        remaining = int(self.headers.get("Content-Length") or 0)
        while remaining > 0:
            chunk = self.rfile.read(min(remaining, 65536))
            if not chunk:
                break
            remaining -= len(chunk)
        self.send_response(303)
        self.send_header("Location", self.path)
        self.send_header("Content-Length", "0")
        self.end_headers()

class Server(http.server.ThreadingHTTPServer):
    # Threaded, with a deep accept queue: the test suite opens many
    # connections at once across five browser profiles.
    request_queue_size = 256
    daemon_threads = True
    allow_reuse_address = True

class DualStackServer(Server):
    # Listen on IPv4 and IPv6, so "localhost" works whichever it resolves to.
    address_family = socket.AF_INET6
    def server_bind(self):
        self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        return super().server_bind()

try:
    httpd = DualStackServer(("::", PORT), SecureHandler)
except OSError:
    httpd = Server(("", PORT), SecureHandler)
with httpd:
    httpd.serve_forever()
PY
else
  echo "Python 3 not found. Falling back to busybox httpd – security headers will NOT be set."
  echo "Install Python 3 to test the security headers locally."
  cd "$DIR"
  exec busybox httpd -f -p "$PORT" -h "$DIR"
fi
