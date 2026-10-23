#!/usr/bin/env bash
# Runs MOSIP eSignet locally with its mock identity system, for the Kestria sandbox.
#
#   sandbox/esignet/esignet.sh up       fetch eSignet's compose files, start it, seed the personas
#   sandbox/esignet/esignet.sh seed     seed the personas and the xstack client again
#   sandbox/esignet/esignet.sh status   what's running, and whether eSignet answers
#   sandbox/esignet/esignet.sh logs     follow the logs (Ctrl+C to stop following)
#   sandbox/esignet/esignet.sh down     stop it, keeping the data
#   sandbox/esignet/esignet.sh reset    stop it and delete everything: identities, client, keys
#
# Nothing from eSignet is copied into this repo. 'up' downloads eSignet's own compose files at a
# pinned release into .upstream/ (git ignores it) and applies compose.override.yaml on top.
set -euo pipefail

ESIGNET_REF="${ESIGNET_REF:-v2.0.0}"          # a tag of github.com/mosip/esignet
ESIGNET_IMAGE="mosipid/esignet:${ESIGNET_REF#v}"
RAW="https://raw.githubusercontent.com/mosip/esignet/${ESIGNET_REF}/docker-compose"
export ESIGNET_HOSTNAME="${ESIGNET_HOSTNAME:-localhost}"

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UP="$HERE/.upstream"
PROJECT=kestria-esignet
compose() { docker compose -p "$PROJECT" -f "$UP/docker-compose.yaml" -f "$HERE/compose.override.yaml" "$@"; }

need() { command -v "$1" >/dev/null 2>&1 || { echo "Needs $1. $2" >&2; exit 1; }; }

fetch() {
  mkdir -p "$UP"
  if [[ "$(cat "$UP/.ref" 2>/dev/null)" != "$ESIGNET_REF" ]]; then
    echo "Fetching eSignet $ESIGNET_REF compose files"
    for f in docker-compose.yaml init.sql nginx.conf; do curl -fsSL "$RAW/$f" -o "$UP/$f"; done
    echo "$ESIGNET_REF" > "$UP/.ref"
    rm -f "$UP/flow-esignet.nocaptcha.yaml"
  fi
  if [[ ! -s "$UP/flow-esignet.nocaptcha.yaml" ]]; then
    echo "Making a copy of eSignet's sign-in flow without the CAPTCHA"
    docker image inspect "$ESIGNET_IMAGE" >/dev/null 2>&1 || docker pull -q "$ESIGNET_IMAGE" >/dev/null
    docker run --rm --entrypoint cat "$ESIGNET_IMAGE" /home/mosip/data/flows/flow-esignet.yaml \
      | node "$HERE/no-captcha.mjs" > "$UP/flow-esignet.nocaptcha.yaml"
  fi
}

wait_for() {  # url, name, seconds
  local i
  for ((i = 0; i < $3; i += 3)); do
    curl -fsS -m 3 "$1" >/dev/null 2>&1 && { echo "  $2 is up"; return 0; }
    sleep 3
  done
  echo "  $2 didn't come up in $3s. Try: $0 logs" >&2; return 1
}

check_ports() {
  local busy=""
  for p in 3000 5455 8080 8082; do
    if lsof -nP -iTCP:"$p" -sTCP:LISTEN >/dev/null 2>&1 && ! compose ps --format '{{.Ports}}' 2>/dev/null | grep -q ":$p->"; then busy+=" $p"; fi
  done
  [[ -z "$busy" ]] || { echo "These ports are in use by something else:$busy. eSignet needs 3000, 5455, 8080 and 8082." >&2; exit 1; }
}

case "${1:-}" in
  up)
    need docker "Install Docker Desktop: https://docs.docker.com/get-docker/"
    need node "Install Node 20 or later: https://nodejs.org"
    docker info >/dev/null 2>&1 || { echo "Docker isn't running. Start Docker Desktop and try again." >&2; exit 1; }
    fetch
    check_ports
    echo "Starting eSignet $ESIGNET_REF (first run downloads about 2 GB of images)"
    # The mock identity system's container can't be restarted, only recreated: its entrypoint
    # unzips into a folder that's already there and exits. So recreate the app containers every
    # time. Everything they keep is in the database, which is left alone.
    compose rm -fsv mock-identity-system esignet esignet-ui >/dev/null 2>&1 || true
    compose up -d --wait --wait-timeout 300
    wait_for "http://localhost:8082/v1/mock-identity-system/actuator/health" "Mock identity system" 120
    wait_for "http://localhost:8080/.well-known/openid-configuration" "eSignet" 120
    wait_for "http://localhost:3000/" "eSignet sign-in screens" 60
    node "$HERE/seed.mjs"
    echo
    echo "eSignet is running: issuer http://$ESIGNET_HOSTNAME:8080, sign-in screens http://$ESIGNET_HOSTNAME:3000"
    echo "Next: node sandbox/adapter/server.mjs, then open http://localhost:4400"
    ;;
  seed)   node "$HERE/seed.mjs" ;;
  status)
    compose ps
    curl -fsS -m 3 "http://localhost:8080/.well-known/openid-configuration" >/dev/null && echo "eSignet answers." || echo "eSignet isn't answering."
    ;;
  logs)   compose logs -f --tail 50 ;;
  down)   compose down ;;
  reset)
    compose down -v
    rm -f "$HERE/../.secrets/xstack-client.json"
    echo "Deleted the sandbox's identities, client and key. Run '$0 up' to start again."
    ;;
  *) sed -n '2,12p' "$0" | sed 's/^# \{0,1\}//'; exit 1 ;;
esac
