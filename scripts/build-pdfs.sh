#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/downloads"
SRC="$ROOT/pdf-src"
mkdir -p "$OUT"

if [ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]; then
  CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
elif command -v google-chrome >/dev/null 2>&1; then
  CHROME="$(command -v google-chrome)"
elif command -v chromium >/dev/null 2>&1; then
  CHROME="$(command -v chromium)"
else
  echo "Chrome/Chromium not found" >&2
  exit 1
fi

print_pdf() {
  local in="$1"
  local out="$2"
  "$CHROME" --headless --disable-gpu --no-sandbox --print-to-pdf="$OUT/$out" "file://$SRC/$in" >/dev/null 2>&1
  test -s "$OUT/$out"
  echo "wrote downloads/$out"
}

print_pdf facilitator-guide.html cloud-ai-summit-facilitator-guide.pdf
print_pdf attendee-handout.html cloud-ai-summit-attendee-handout.pdf
print_pdf rubric.html cloud-ai-summit-rubric.pdf
