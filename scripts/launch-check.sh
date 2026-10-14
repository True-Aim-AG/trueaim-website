#!/usr/bin/env bash
# Launch checks from Firon's checklist that a script can prove, run against a
# live host. Read-only: it only sends GET and HEAD requests.
#
#   scripts/launch-check.sh                         # production, https://trueaim.ai
#   scripts/launch-check.sh https://staging.trueaim.ai --staging
#
# Production expects no X-Robots-Tag, a server-side www to apex 301 and an
# HTTP to HTTPS 301. Staging expects the noindex header instead. Every row of
# redirects/redirects.csv (old_url,new_url,status,note), when the file
# exists, must answer its status in one hop. Exits 1 if any check fails.
set -u

BASE="${1:-https://trueaim.ai}"
BASE="${BASE%/}"
MODE="production"
[ "${2:-}" = "--staging" ] && MODE="staging"
HOST="${BASE#https://}"
FAILURES=0

pass() { printf 'PASS  %s\n' "$1"; }
fail() { printf 'FAIL  %s\n' "$1"; FAILURES=$((FAILURES + 1)); }

# status and Location of one request, never following redirects
probe() { curl -s -o /dev/null -w '%{http_code} %{redirect_url}' --max-time 20 "$1"; }

expect_status() { # url status
  local got
  got="$(probe "$1")"
  if [ "${got%% *}" = "$2" ]; then pass "$1 answers $2"; else fail "$1 answers ${got%% *}, expected $2"; fi
}

expect_redirect() { # url target status
  local got code location
  got="$(probe "$1")"
  code="${got%% *}"
  location="${got#* }"
  if [ "$code" != "$3" ] || [ "$location" != "$2" ]; then
    fail "$1 answers $code to '$location', expected $3 to $2"
    return
  fi
  local final
  final="$(probe "$2")"
  if [ "${final%% *}" = "200" ] || [ "$3" = "404" ] || [ "$3" = "410" ]; then
    pass "$1 answers $3 to $2 in one hop"
  else
    fail "$1 redirects to $2, which answers ${final%% *} (not one hop to a page)"
  fi
}

echo "Launch check: $BASE ($MODE)"

# Host, scheme and trailing-slash rules
expect_redirect "$BASE/" "$BASE/en/" 301
expect_status "$BASE/en/" 200
expect_redirect "$BASE/en/technology" "$BASE/en/technology/" 301
expect_redirect "$BASE/technology" "$BASE/en/technology/" 301
expect_status "$BASE/en/this-page-does-not-exist/" 404
if [ "$MODE" = "production" ]; then
  expect_redirect "http://$HOST/en/" "https://$HOST/en/" 301
  expect_redirect "https://www.$HOST/en/" "$BASE/en/" 301
fi

# Files keep their URL (trailingSlash: auto), with the right type
for path in /robots.txt /sitemap.xml /favicon.ico /llms.txt; do
  expect_status "$BASE$path" 200
done
chunk="$(curl -s --max-time 20 "$BASE/en/" | grep -oE '/_next/static/[^"]+\.js' | head -1)"
if [ -n "$chunk" ]; then expect_status "$BASE$chunk" 200; else fail "no /_next/static script found on $BASE/en/"; fi

# Indexing
robots_header="$(curl -sI --max-time 20 "$BASE/en/" | tr -d '\r' | grep -i '^x-robots-tag:' || true)"
if [ "$MODE" = "staging" ]; then
  if printf '%s' "$robots_header" | grep -qi noindex; then pass "staging sends X-Robots-Tag noindex"; else fail "staging does not send X-Robots-Tag noindex"; fi
else
  if [ -z "$robots_header" ]; then pass "production sends no X-Robots-Tag"; else fail "production sends '$robots_header'"; fi
fi

robots="$(curl -s --max-time 20 "$BASE/robots.txt")"
for agent in GPTBot OAI-SearchBot ChatGPT-User ClaudeBot Claude-User PerplexityBot Google-Extended Applebot-Extended; do
  if printf '%s\n' "$robots" | grep -qx "User-agent: $agent"; then pass "robots.txt names $agent"; else fail "robots.txt does not name $agent"; fi
done
if printf '%s\n' "$robots" | grep -qx "Sitemap: https://trueaim.ai/sitemap.xml"; then pass "robots.txt links the sitemap"; else fail "robots.txt does not link the sitemap"; fi
if printf '%s\n' "$robots" | grep -A2 -x "User-agent: \*" | grep -qx "Disallow: /"; then fail "robots.txt disallows everything"; fi

sitemap="$(curl -s --max-time 20 "$BASE/sitemap.xml")"
if printf '%s' "$sitemap" | grep -q "<loc>https://trueaim.ai/en/</loc>"; then pass "sitemap lists the English home"; else fail "sitemap does not list https://trueaim.ai/en/"; fi

# Redirect map, one hop per row
MAP="$(dirname "$0")/../redirects/redirects.csv"
if [ -f "$MAP" ]; then
  map_output="$(tail -n +2 "$MAP" | while IFS=, read -r old new status _; do
    [ -z "$old" ] && continue
    case "$new" in http*) target="$new" ;; *) target="$BASE$new" ;; esac
    if [ "$status" = "404" ] || [ "$status" = "410" ]; then expect_status "$BASE$old" "$status"; else expect_redirect "$BASE$old" "$target" "$status"; fi
  done)"
  printf '%s\n' "$map_output"
  FAILURES=$((FAILURES + $(printf '%s\n' "$map_output" | grep -c '^FAIL' || true)))
fi

echo
if [ "$FAILURES" -eq 0 ]; then echo "All checks passed."; else echo "$FAILURES check(s) failed."; exit 1; fi
