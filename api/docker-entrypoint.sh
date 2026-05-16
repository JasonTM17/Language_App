#!/bin/sh
set -e

mkdir -p /app/data

npx prisma migrate deploy

if [ ! -f /app/data/.seeded ]; then
  node dist/database/seeds/index.js 2>/dev/null || true
  touch /app/data/.seeded
fi

exec node dist/index.js
