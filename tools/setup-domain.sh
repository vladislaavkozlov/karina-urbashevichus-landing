#!/bin/bash
# Подключение своего домена к сайту на GitHub Pages.
# Использование: bash tools/setup-domain.sh example.ru
set -e
DOMAIN="$1"
REPO="vladislaavkozlov/karina-urbashevichus-landing"
[ -z "$DOMAIN" ] && { echo "Укажите домен: bash tools/setup-domain.sh example.ru"; exit 1; }

echo "$DOMAIN" > CNAME
git add CNAME
git commit -q -m "Подключение домена $DOMAIN" || true
git push -q origin main

gh api -X PUT "/repos/$REPO/pages" -f cname="$DOMAIN" >/dev/null
echo "Домен $DOMAIN прописан в настройках Pages"

echo "Ждём выпуск сертификата HTTPS..."
until [ "$(gh api "/repos/$REPO/pages" --jq '.https_certificate.state' 2>/dev/null)" = "approved" ]; do sleep 20; done
gh api -X PUT "/repos/$REPO/pages" -F https_enforced=true >/dev/null
echo "HTTPS включён. Проверка:"
curl -sI "https://$DOMAIN" | head -3
