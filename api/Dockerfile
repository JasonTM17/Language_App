FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src/
RUN npm run build

ENV NODE_ENV=production

CMD sh -c "mkdir -p data && npx prisma db push --accept-data-loss 2>&1 && node dist/index.js"
