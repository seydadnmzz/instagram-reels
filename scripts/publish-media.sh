#!/usr/bin/env bash
# Günün videosunu yalnızca o dosyayı içeren "claude/media" dalına zorla gönderir
# ve Instagram'ın çekebileceği raw.githubusercontent.com adresini yazdırır.
# Kullanım: bash scripts/publish-media.sh 2026-10-28
set -euo pipefail

ID="$1"
VIDEO="out/${ID}.mp4"
BRANCH="claude/media"
[ -f "$VIDEO" ] || { echo "Video yok: $VIDEO" >&2; exit 1; }

REMOTE_URL="$(git remote get-url origin)"
# https://github.com/OWNER/REPO(.git) veya proxy adreslerinden OWNER/REPO çıkar
SLUG="$(echo "$REMOTE_URL" | sed -E 's#\.git$##' | grep -oE '[^/:]+/[^/]+$')"

TMP="$(mktemp -d)"
cp "$VIDEO" "$TMP/${ID}.mp4"
(
  cd "$TMP"
  git init -q -b "$BRANCH"
  git config user.name "${GIT_AUTHOR_NAME:-reels-bot}"
  git config user.email "${GIT_AUTHOR_EMAIL:-reels-bot@users.noreply.github.com}"
  git add "${ID}.mp4"
  git commit -q -m "Video ${ID}"
  git remote add origin "$REMOTE_URL"
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
