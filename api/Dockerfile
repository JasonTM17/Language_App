FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci && npx prisma generate

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY src ./src/
RUN npm run build

FROM base AS production-deps
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci --omit=dev && npx prisma generate

FROM base AS runner
ENV NODE_ENV=production
RUN mkdir -p /app/data && chown -R node:node /app
COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=production-deps /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=deps /app/node_modules/.bin/prisma ./node_modules/.bin/prisma
COPY --from=deps /app/node_modules/prisma ./node_modules/prisma
COPY --from=build /app/dist ./dist
COPY prisma ./prisma/
COPY package.json ./
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh
USER node
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1
CMD ["./docker-entrypoint.sh"]
