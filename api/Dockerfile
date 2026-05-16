FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci --omit=dev && npx prisma generate

FROM base AS build
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci && npx prisma generate
COPY tsconfig.json ./
COPY src ./src/
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 appuser
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/dist ./dist
COPY prisma ./prisma/
COPY package.json ./
USER appuser
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1
CMD ["node", "dist/index.js"]
