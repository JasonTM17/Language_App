FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src/
RUN npm run build

RUN mkdir -p /app/data

ENV NODE_ENV=production
ENV DATABASE_URL=file:./data/linguaflow.db
EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

CMD sh -c "npx prisma migrate deploy 2>/dev/null || npx prisma db push --accept-data-loss; node dist/index.js"
