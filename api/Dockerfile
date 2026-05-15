FROM node:20-alpine AS base

# API build
FROM base AS api-deps
WORKDIR /app
COPY api/package*.json ./
RUN npm ci --omit=dev

FROM base AS api-build
WORKDIR /app
COPY api/package*.json ./
RUN npm ci
COPY api/ .
RUN npx prisma generate
RUN npm run build

FROM base AS api
WORKDIR /app
COPY --from=api-deps /app/node_modules ./node_modules
COPY --from=api-build /app/dist ./dist
COPY --from=api-build /app/node_modules/.prisma ./node_modules/.prisma
COPY api/prisma ./prisma
COPY api/package.json .
ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "dist/index.js"]
