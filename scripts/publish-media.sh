#!/usr/bin/env bash
# Günün videosunu "claude/media" dalına ekler ve Instagram'ın çekebileceği
# raw.githubusercontent.com adresini yazdırır. Dal, geçmiş birikmesin diye her seferinde
# tek bir commit olarak yeniden yazılır; onay bekleyen videolar kaybolmasın diye
# son 3 günün videoları korunur.
# Kullanım: bash scripts/publish-media.sh 2026-10-29-sabah
set -euo pipefail

ID="$1"
VIDEO="out/${ID}.mp4"
BRANCH="claude/media"
KEEP_DAYS=3
[ -f "$VIDEO" ] || { echo "Video yok: $VIDEO" >&2; exit 1; }

REMOTE_URL="$(git remote get-url origin)"
# https://github.com/OWNER/REPO(.git) veya proxy adreslerinden OWNER/REPO çıkar
SLUG="$(echo "$REMOTE_URL" | sed -E 's#\.git$##' | grep -oE '[^/:]+/[^/]+$')"

TMP="$(mktemp -d)"
(
  cd "$TMP"
  git init -q -b "$BRANCH"
  git config user.name "${GIT_AUTHOR_NAME:-reels-bot}"
  git config user.email "${GIT_AUTHOR_EMAIL:-reels-bot@users.noreply.github.com}"
  git remote add origin "$REMOTE_URL"
  if git fetch -q --depth 1 origin "$BRANCH" 2>/dev/null; then
    git archive FETCH_HEAD | tar -x
  fi
  CUTOFF="$(date -u -d "-${KEEP_DAYS} days" +%F)"
  for f in *.mp4 *.jpg; do
    [ -e "$f" ] || continue
    if [[ "${f:0:10}" < "$CUTOFF" ]]; then rm -f "$f"; fi
  done
)
cp "$VIDEO" "$TMP/${ID}.mp4"
# Kapak (varsa): Instagram cover_url ve YouTube küçük resmi için
[ -f "out/${ID}.cover.jpg" ] && cp "out/${ID}.cover.jpg" "$TMP/${ID}.cover.jpg"
(
  cd "$TMP"
  git add -A
  git commit -q -m "Video ${ID}"
  git push -q -f origin "HEAD:refs/heads/${BRANCH}"
)
rm -rf "$TMP"

URL="https://raw.githubusercontent.com/${SLUG}/refs/heads/${BRANCH}/${ID}.mp4"
for i in 1 2 3 4 5 6; do
  CODE="$(curl -s -o /dev/null -w '%{http_code}' -I "$URL")"
  [ "$CODE" = "200" ] && { echo "$URL"; exit 0; }
  sleep 10
done
echo "Video adresine erişilemedi (HTTP $CODE): $URL" >&2
exit 1
