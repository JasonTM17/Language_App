# Project Rules - Nguyễn Sơn
# Bộ quy tắc chuẩn cho mọi dự án — đúc kết từ kinh nghiệm thực tế

---

## 1. Git & Contributor

- Author: `Nguyễn Sơn <sonnguyenhoang17@gmail.com>` — KHÔNG ngoại lệ
- KHÔNG Co-Authored-By, KHÔNG AI attribution, KHÔNG "LinguaFlow Team"
- Commit convention: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`, `perf:`
- Commit message: tiếng Anh, ngắn gọn, mô tả WHY
- Sau khi hoàn thành: chạy `git log --format="%an" | sort | uniq` để verify
- Nếu phát hiện author sai: `git filter-branch --env-filter` rewrite toàn bộ

---

## 2. GitHub Repository Setup

### About Section (PHẢI điền đầy đủ):
- Description: 1 câu mô tả dự án
- Website: link deploy (Vercel/Render)
- Topics/Tags: 8-12 tags liên quan (framework, language, features)

### Repository Settings:
- Default branch: `master` hoặc `main`
- Branch protection: require PR reviews (khi có team)
- Enable Issues + Projects
- Enable Discussions (optional)

### GitHub Release (BẮT BUỘC sau v1.0.0):
```bash
# Tạo tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Tạo release với gh CLI
gh release create v1.0.0 \
  --title "v1.0.0 - Initial Release" \
  --notes-file RELEASE_NOTES.md \
  --latest
```

### Release Notes format:
```markdown
## What's New
- Feature 1
- Feature 2

## Tech Stack
- Frontend: Next.js 14, React 18, TypeScript
- Backend: Express, Prisma, SQLite
- Infrastructure: Docker, GitHub Actions

## Docker Images
- `nguyenson1710/project-api:v1.0.0`
- `nguyenson1710/project-web:v1.0.0`

## Links
- Live Demo: https://...
- API Docs: https://...
```

---

## 3. Repo Structure (BẮT BUỘC)

### Quy tắc cốt lõi:
> **Mọi repo PHẢI có backend và frontend TÁCH RIÊNG** — không ngoại lệ.
> Kể cả dự án nhỏ cũng phải tách `api/` và `web/` riêng biệt.
> Ngoài ra phải có đầy đủ các config files chuẩn.

### Cấu trúc tối thiểu (mọi dự án):
| Thành phần | Bắt buộc | Mô tả |
|-----------|----------|-------|
| `api/` | ✅ | Backend riêng: Express/Fastify/NestJS + Prisma |
| `web/` | ✅ | Frontend riêng: Next.js/React + Tailwind |
| `docker-compose.yml` | ✅ | Orchestration cả stack |
| `api/Dockerfile` | ✅ | Container cho backend |
| `web/Dockerfile` | ✅ | Container cho frontend |
| `.github/workflows/ci.yml` | ✅ | CI pipeline |
| `.github/workflows/codeql.yml` | ✅ | Security scanning |
| `.github/dependabot.yml` | ✅ | Auto dependency updates |
| `.github/CODEOWNERS` | ✅ | Code ownership |
| `.prettierrc` | ✅ | Code formatting |
| `.editorconfig` | ✅ | Editor settings |
| `.nvmrc` | ✅ | Node version pinning |
| `.gitignore` | ✅ | Comprehensive ignore rules |
| `.gitattributes` | ✅ | Line endings (LF cho scripts) |
| `README.md` | ✅ | Professional docs + badges |
| `CONTRIBUTING.md` | ✅ | Hướng dẫn đóng góp |
| `CHANGELOG.md` | ✅ | Lịch sử thay đổi |
| `CODE_OF_CONDUCT.md` | ✅ | Quy tắc ứng xử |
| `SECURITY.md` | ✅ | Security policy |
| `LICENSE` | ✅ | MIT |

### KHÔNG chấp nhận:
- ❌ Fullstack trong 1 folder (backend + frontend lẫn lộn)
- ❌ Repo chỉ có frontend mà không có backend
- ❌ Repo thiếu Dockerfile
- ❌ Repo thiếu CI/CD workflow
- ❌ Repo thiếu `.prettierrc`, `.nvmrc`, `.editorconfig`
- ❌ Repo thiếu community files (CONTRIBUTING, CODE_OF_CONDUCT, SECURITY)

### Monorepo layout chuẩn:

```
project/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # CI: lint, typecheck, test, build
│   │   ├── release.yml         # Auto release on tag push
│   │   └── codeql.yml          # Security scanning (weekly)
│   ├── dependabot.yml          # Auto dependency updates
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml      # Bug report form
│   │   └── feature_request.yml # Feature request form
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS              # @JasonTM17 owns everything
├── api/                        # Backend REST API
│   ├── src/
│   │   ├── routes/             # API endpoints
│   │   ├── middleware/         # Auth, validation, rate-limit
│   │   ├── database/           # Prisma client + seeds
│   │   └── types/              # TypeScript definitions
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── tests/                  # Unit + integration tests
│   ├── Dockerfile              # Production container
│   ├── package.json
│   └── tsconfig.json
├── web/                        # Frontend Next.js
│   ├── src/
│   │   ├── app/                # Pages (App Router)
│   │   ├── components/         # Reusable UI
│   │   ├── hooks/              # Custom hooks
│   │   ├── lib/                # Utilities
│   │   ├── services/           # API client
│   │   └── types/              # Shared types
│   ├── public/                 # Static assets + PWA
│   ├── e2e/                    # Playwright E2E tests
│   ├── Dockerfile              # Production container
│   ├── package.json
│   └── tailwind.config.ts
├── docs/                       # Documentation
│   ├── api.md                  # API reference
│   ├── architecture.md         # System design
│   └── screenshots/            # App screenshots + GIFs
├── package.json                # Root: workspaces + scripts
├── docker-compose.yml          # Full stack orchestration
├── .prettierrc                 # Code formatting
├── .editorconfig               # Editor settings
├── .nvmrc                      # Node version (20)
├── .gitignore                  # Comprehensive
├── .gitattributes              # Line endings (LF for scripts)
├── README.md                   # Professional documentation
├── CONTRIBUTING.md             # Vietnamese guide
├── CHANGELOG.md                # Keep a Changelog
├── CODE_OF_CONDUCT.md          # Contributor Covenant
├── SECURITY.md                 # Security policy + contact
├── LICENSE                     # MIT
└── PROJECT_RULES.md            # This file
```

---

## 4. README.md — Tiêu chuẩn chuyên nghiệp

### Badges (dòng đầu tiên):
```markdown
![CI](https://github.com/JasonTM17/Project/actions/workflows/ci.yml/badge.svg)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Docker](https://img.shields.io/badge/Docker_Hub-nguyenson1710-2496ED?logo=docker)](https://hub.docker.com/u/nguyenson1710)
[![Deploy](https://img.shields.io/badge/Vercel-Live-000?logo=vercel)](https://...)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
```

### Sections BẮT BUỘC:
1. **Header**: Logo + tên + mô tả ngắn + badges
2. **Screenshots**: Desktop + Mobile (table layout)
3. **GIF Demos**: Desktop + Mobile interactions
4. **Giới thiệu**: 2-3 câu + feature table
5. **Kiến trúc**: Folder tree + tech stack
6. **Cài đặt**: Prerequisites + one-command setup
7. **API Reference**: Table với method, endpoint, mô tả
8. **Testing**: Commands + coverage info
9. **Deployment**: Docker + cloud instructions
10. **Đóng góp**: Link CONTRIBUTING.md
11. **License**: MIT

### Screenshots requirements:
- Chụp bằng Playwright (automated, consistent)
- Desktop: 1280x720
- Mobile: 390x844 (iPhone 14)
- Có data thật (không trống)
- Có logo/branding
- Save: `docs/screenshots/`

---

## 5. Docker & Container Services

### Docker Hub (BẮT BUỘC cho mọi dự án):
- Username: `nguyenson1710`
- Naming: `nguyenson1710/{project}-api`, `nguyenson1710/{project}-web`
- Tags: `v1.0.0`, `latest`
- Push cả 2 services (BE + FE)

### API Dockerfile (production):
```dockerfile
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci && npx prisma generate

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY prisma ./prisma/
COPY package.json ./
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

### Web Dockerfile (production):
```dockerfile
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

### docker-compose.yml:
```yaml
services:
  api:
    build: ./api
    ports: ["3001:3001"]
    environment:
      - DATABASE_URL=file:./data/app.db
      - JWT_SECRET=${JWT_SECRET}
    volumes:
      - api-data:/app/data
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost:3001/api/health"]
      interval: 30s
      timeout: 10s
      start_period: 10s
    restart: unless-stopped

  web:
    build: ./web
    ports: ["3000:3000"]
    environment:
      - NEXT_PUBLIC_API_URL=http://api:3001/api
    depends_on:
      api:
        condition: service_healthy
    restart: unless-stopped

volumes:
  api-data:
```

### Docker Hub push workflow:
```bash
# Build
docker build -t nguyenson1710/project-api:v1.0.0 ./api
docker build -t nguyenson1710/project-web:v1.0.0 ./web

# Tag latest
docker tag nguyenson1710/project-api:v1.0.0 nguyenson1710/project-api:latest
docker tag nguyenson1710/project-web:v1.0.0 nguyenson1710/project-web:latest

# Push
docker push nguyenson1710/project-api:v1.0.0
docker push nguyenson1710/project-api:latest
docker push nguyenson1710/project-web:v1.0.0
docker push nguyenson1710/project-web:latest
```

---

## 6. Microservices & Multi-Container Architecture

### Khi nào dùng Microservices:
- Dự án có 3+ bounded contexts rõ ràng
- Cần scale từng service độc lập
- Team > 3 người, mỗi người own 1 service
- Monolith đã quá phức tạp (> 50 endpoints)

### Cấu trúc Microservices:
```
project/
├── services/
│   ├── auth-service/          # Authentication & authorization
│   │   ├── src/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── user-service/          # User management
│   │   ├── src/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── notification-service/  # Email, push, SMS
│   │   ├── src/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── media-service/         # File upload, image processing
│   │   ├── src/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── gateway/               # API Gateway / BFF
│       ├── src/
│       ├── Dockerfile
│       ├── package.json
│       └── tsconfig.json
├── web/                       # Frontend
│   └── Dockerfile
├── shared/                    # Shared types, utils, proto
│   ├── types/
│   └── package.json
├── docker-compose.yml         # Full stack orchestration
├── docker-compose.dev.yml     # Dev overrides (hot reload)
└── infrastructure/
    ├── nginx/                 # Reverse proxy config
    ├── redis/                 # Cache config
    └── monitoring/            # Prometheus + Grafana
```

### Docker Hub — PHẢI push TẤT CẢ services:
```bash
# Naming convention: nguyenson1710/{project}-{service}:{version}
# Ví dụ dự án "ecommerce" có 5 services:

docker build -t nguyenson1710/ecommerce-gateway:v1.0.0 ./services/gateway
docker build -t nguyenson1710/ecommerce-auth:v1.0.0 ./services/auth-service
docker build -t nguyenson1710/ecommerce-user:v1.0.0 ./services/user-service
docker build -t nguyenson1710/ecommerce-notification:v1.0.0 ./services/notification-service
docker build -t nguyenson1710/ecommerce-media:v1.0.0 ./services/media-service
docker build -t nguyenson1710/ecommerce-web:v1.0.0 ./web

# Tag latest cho tất cả
for svc in gateway auth user notification media web; do
  docker tag nguyenson1710/ecommerce-$svc:v1.0.0 nguyenson1710/ecommerce-$svc:latest
done

# Push TẤT CẢ (KHÔNG được bỏ sót service nào)
for svc in gateway auth user notification media web; do
  docker push nguyenson1710/ecommerce-$svc:v1.0.0
  docker push nguyenson1710/ecommerce-$svc:latest
done
```

### docker-compose.yml cho Microservices:
```yaml
services:
  gateway:
    build: ./services/gateway
    ports: ["8080:8080"]
    depends_on: [auth, user, notification]
    environment:
      - AUTH_SERVICE_URL=http://auth:3001
      - USER_SERVICE_URL=http://user:3002
      - NOTIFICATION_SERVICE_URL=http://notification:3003

  auth:
    build: ./services/auth-service
    ports: ["3001:3001"]
    environment:
      - DATABASE_URL=postgresql://postgres:password@auth-db:5432/auth
      - JWT_SECRET=${JWT_SECRET}
      - REDIS_URL=redis://redis:6379
    depends_on: [auth-db, redis]

  user:
    build: ./services/user-service
    ports: ["3002:3002"]
    environment:
      - DATABASE_URL=postgresql://postgres:password@user-db:5432/users
    depends_on: [user-db]

  notification:
    build: ./services/notification-service
    ports: ["3003:3003"]
    environment:
      - REDIS_URL=redis://redis:6379
      - SMTP_HOST=${SMTP_HOST}
    depends_on: [redis]

  media:
    build: ./services/media-service
    ports: ["3004:3004"]
    environment:
      - S3_BUCKET=${S3_BUCKET}
      - S3_REGION=${S3_REGION}
    volumes:
      - media-data:/app/uploads

  web:
    build: ./web
    ports: ["3000:3000"]
    environment:
      - NEXT_PUBLIC_API_URL=http://gateway:8080/api
    depends_on: [gateway]

  # Infrastructure
  auth-db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: auth
      POSTGRES_PASSWORD: password
    volumes: [auth-db-data:/var/lib/postgresql/data]

  user-db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: users
      POSTGRES_PASSWORD: password
    volumes: [user-db-data:/var/lib/postgresql/data]

  redis:
    image: redis:7-alpine
    volumes: [redis-data:/data]

volumes:
  auth-db-data:
  user-db-data:
  redis-data:
  media-data:
```

### CI/CD cho Microservices (release.yml):
```yaml
jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      services: ${{ steps.changes.outputs.services }}
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - id: changes
        run: |
          SERVICES=""
          for dir in services/*/; do
            svc=$(basename $dir)
            if git diff --name-only HEAD~1 | grep -q "^services/$svc/"; then
              SERVICES="$SERVICES $svc"
            fi
          done
          echo "services=$SERVICES" >> $GITHUB_OUTPUT

  build-push:
    needs: detect-changes
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: ${{ fromJson(needs.detect-changes.outputs.services) }}
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          username: nguyenson1710
          password: ${{ secrets.DOCKER_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          context: ./services/${{ matrix.service }}
          push: true
          tags: |
            nguyenson1710/${{ github.event.repository.name }}-${{ matrix.service }}:${{ github.ref_name }}
            nguyenson1710/${{ github.event.repository.name }}-${{ matrix.service }}:latest
```

### Quy tắc quan trọng:
1. **Mỗi service = 1 Dockerfile = 1 Docker Hub image** — KHÔNG gộp
2. **Push TẤT CẢ services** lên Docker Hub, kể cả infrastructure (nếu custom)
3. **Shared code** qua npm workspace hoặc copy vào mỗi service
4. **Inter-service communication**: HTTP REST hoặc gRPC (KHÔNG direct DB access)
5. **Mỗi service có DB riêng** — KHÔNG share database giữa services
6. **Health check endpoint** cho mỗi service: `GET /health`
7. **Centralized logging**: stdout → Docker logs → aggregator (ELK/Loki)
8. **Service discovery**: Docker Compose DNS (dev) / Kubernetes DNS (prod)
9. **Versioning**: Tất cả services cùng version tag khi release (v1.0.0)
10. **README phải list TẤT CẢ Docker images** với pull commands

### Monorepo vs Microservices — Khi nào chọn gì:
| Tiêu chí | Monorepo (api/ + web/) | Microservices |
|----------|------------------------|---------------|
| Team size | 1-3 người | 3+ người |
| Complexity | < 50 endpoints | > 50 endpoints |
| Scale needs | Uniform | Per-service |
| Deploy | Render + Vercel | Kubernetes / Docker Swarm |
| Docker images | 2 (api + web) | N services + web |
| Khi nào | Dự án cá nhân, MVP | Production scale |

---

## 7. CI/CD Pipeline

### ci.yml:
```yaml
name: CI
on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  api:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: api
    env:
      DATABASE_URL: "file:./test.db"
      JWT_SECRET: "ci-test-secret"
      NODE_ENV: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm, cache-dependency-path: api/package-lock.json }
      - run: npm ci
      - run: npx prisma generate && npx prisma migrate deploy
      - run: npx tsc --noEmit
      - run: npx vitest run

  web:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: web
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm, cache-dependency-path: web/package-lock.json }
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npm run build
```

### release.yml (on tag push):
```yaml
name: Release
on:
  push:
    tags: ['v*']

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          username: nguyenson1710
          password: ${{ secrets.DOCKER_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          context: ./api
          push: true
          tags: nguyenson1710/${{ github.event.repository.name }}-api:${{ github.ref_name }},nguyenson1710/${{ github.event.repository.name }}-api:latest
      - uses: docker/build-push-action@v5
        with:
          context: ./web
          push: true
          tags: nguyenson1710/${{ github.event.repository.name }}-web:${{ github.ref_name }},nguyenson1710/${{ github.event.repository.name }}-web:latest

  github-release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: softprops/action-gh-release@v2
        with:
          generate_release_notes: true
```

---

## 8. Deployment

### Render (API Backend):
- **Runtime**: Node.js (KHÔNG Docker cho free tier — Docker gây nhiều lỗi)
- **Build command**: `npm ci && npx prisma generate && npm run build`
- **Start command**: `npx prisma db push --accept-data-loss && node dist/index.js`
- **Health check**: `/api/health`
- **Env vars**: CHỈ set DATABASE_URL, JWT_SECRET, FRONTEND_URL
- **KHÔNG set**: NODE_ENV (Render tự set, nếu set sẽ skip devDeps khi build)
- **KHÔNG set**: PORT (Render tự assign, hardcode sẽ conflict)
- **Region**: Singapore (gần Việt Nam)

### Vercel (Web Frontend):
- **Framework**: Next.js (auto-detected)
- **Root directory**: `web/`
- **Env vars**: `NEXT_PUBLIC_API_URL=https://{api-name}.onrender.com/api`
- **Build**: `npm run build`
- **Output**: standalone (cho Docker compatibility)
- **Redeploy**: Sau mỗi lần thay đổi env vars

### Quy trình deploy hoàn chỉnh:
1. Push code lên GitHub
2. Tạo Render service (Node.js, auto-deploy from master)
3. Set env vars trên Render (KHÔNG NODE_ENV, KHÔNG PORT)
4. Chờ Render build + deploy thành công
5. Copy Render URL
6. Link Vercel project (`vercel link`)
7. Set NEXT_PUBLIC_API_URL trên Vercel
8. Deploy Vercel (`vercel --prod`)
9. Verify: API health check + Frontend loads data
10. Build Docker images + push Docker Hub
11. Create GitHub Release

---

## 9. Testing

- **API**: Vitest + Supertest (unit + integration)
- **Web**: Playwright (E2E) + Vitest (unit)
- **Coverage**: 80%+ target
- **CI**: Tests PHẢI pass trước khi merge
- **Fallback data**: Mọi page phải có fallback khi API down
- **Screenshots**: Playwright capture cho docs

### Test structure:
```
api/tests/
├── auth.test.ts
├── languages.test.ts
├── vocabulary.test.ts
└── ...

web/e2e/
├── app.spec.ts          # Core pages
├── screenshots.spec.ts  # Capture screenshots
└── record-gif.spec.ts   # Capture GIF frames
```

---

## 10. Security

- KHÔNG commit: `.env`, tokens, keys, `*.db`
- `.gitignore` cover: `.env*`, `*.db`, `coverage/`, `logs/`, `*.log`, `.claude/`, `.omc/`
- Dependabot: weekly updates cho npm + github-actions
- CodeQL: weekly scan
- Rate limiting: 100 req/15min general, 10 req/15min auth
- Helmet.js: security headers
- CORS: whitelist frontend URL only
- Input validation: Zod schemas
- Auth: JWT + refresh tokens + bcrypt passwords
- Quét trước khi push: `git log --format="%b" | grep -i "secret\|token\|key\|password"`

---

## 11. UI/UX Standards

- **Responsive**: mobile-first design
- **Dark mode**: next-themes + Tailwind `dark:` classes
- **Animations**: Framer Motion (entrance, hover, page transitions)
- **Design system**: Tailwind CSS + Radix UI primitives
- **Fonts**: Inter (body) + Plus Jakarta Sans (display)
- **Visual depth**: Glassmorphism, gradients, shadows, borders
- **Loading**: Skeleton screens (KHÔNG blank/white screens)
- **Fallback**: Static data khi API unavailable
- **Empty states**: Illustration + helpful message
- **Feedback**: Toast notifications, XP popups, celebrations
- **Accessibility**: ARIA labels, keyboard nav, focus indicators
- **Footer**: Dynamic year (`new Date().getFullYear()`)
- **PWA**: Service worker, manifest.json, offline support

---

## 12. Package.json Standards

### Root package.json:
```json
{
  "name": "project-name",
  "version": "1.0.0",
  "private": true,
  "description": "One-line description",
  "author": "Nguyễn Sơn <sonnguyenhoang17@gmail.com>",
  "license": "MIT",
  "repository": { "type": "git", "url": "https://github.com/JasonTM17/..." },
  "engines": { "node": ">=20.0.0", "npm": ">=10.0.0" },
  "scripts": {
    "dev": "concurrently \"npm run dev:api\" \"npm run dev:web\"",
    "dev:api": "cd api && npm run dev",
    "dev:web": "cd web && npm run dev",
    "build": "npm run build:api && npm run build:web",
    "test": "cd api && npm test",
    "test:e2e": "cd web && npx playwright test",
    "lint": "cd web && npm run lint",
    "typecheck": "cd api && npx tsc --noEmit && cd ../web && npx tsc --noEmit",
    "format": "prettier --write \"**/*.{ts,tsx,js,json,md}\"",
    "db:migrate": "cd api && npx prisma migrate dev",
    "db:seed": "cd api && npm run db:seed",
    "docker:up": "docker compose up -d",
    "docker:down": "docker compose down",
    "docker:build": "docker compose build"
  },
  "devDependencies": {
    "concurrently": "^8.2.0",
    "prettier": "^3.2.0"
  }
}
```

### Sub-package requirements:
- `engines` field
- `author` field
- `repository` field with `directory`
- `keywords` array (5-10 relevant terms)
- `description` field
- Proper `scripts` (dev, build, test, lint)

---

## 13. Quy trình làm dự án mới (Step by Step)

### Phase 1: Setup (Day 1)
1. `git init` + create GitHub repo
2. Fill GitHub About: description + website + topics
3. Add `.gitignore`, `.nvmrc`, `.editorconfig`, `.prettierrc`
4. Create root `package.json` with workspaces
5. Setup API: Express + TypeScript + Prisma
6. Setup Web: Next.js + Tailwind + TypeScript
7. First commit: "feat: initial project setup"

### Phase 2: Core Development
8. Build API endpoints (auth, CRUD, business logic)
9. Build Web pages (auth, dashboard, features)
10. Add seed data (đủ cho demo)
11. Add fallback data trong frontend
12. Commit regularly with proper convention

### Phase 3: Quality (Before v1.0.0)
13. Add tests: API unit/integration + Web E2E
14. Add CI/CD: `.github/workflows/ci.yml`
15. Add security: CodeQL, Dependabot, SECURITY.md
16. Add community: CONTRIBUTING, CODE_OF_CONDUCT, templates
17. Add CHANGELOG.md
18. Run `npx tsc --noEmit` — fix all type errors
19. Run `prettier --write .` — format all code

### Phase 4: Documentation
20. Write README.md (badges, screenshots, GIFs, full sections)
21. Capture screenshots with Playwright
22. Record GIF demos
23. Write API docs
24. Verify: so sánh với repos chuyên nghiệp (Supabase, Cal.com, Docusaurus)

### Phase 5: Deployment & Release
25. Deploy API → Render (Node.js runtime)
26. Deploy Web → Vercel
27. Verify live: API health + Frontend loads data
28. Build Docker images (api + web)
29. Push Docker Hub: `nguyenson1710/{project}-api:v1.0.0`
30. Create GitHub Release v1.0.0 with release notes
31. Update README deploy badges with live URLs

### Phase 6: Final Verification
32. Check GitHub About section filled
33. Check all badges are live (not hardcoded)
34. Check contributor = only Nguyễn Sơn
35. Check no secrets in code/history
36. Check app not empty (has data)
37. Check mobile responsive
38. Check dark mode works
39. Share link — done!

---

## 14. Những lỗi cần tránh (Đúc kết thực tế)

| Lỗi | Hậu quả | Cách tránh |
|------|----------|------------|
| Docker HEALTHCHECK hardcode port | Render fail (port khác) | Bỏ HEALTHCHECK, dùng Render health check |
| Set NODE_ENV=production trên Render | npm ci skip devDeps → build fail | KHÔNG set NODE_ENV |
| Set PORT trên Render | Conflict với Render assigned port | KHÔNG set PORT |
| Dùng Docker runtime trên Render free | Nhiều lỗi phức tạp | Dùng Node.js runtime |
| Quên fallback data | App trống trên production | Mọi API call có catch + fallback |
| AI attribution trong commits | Lộ dùng AI | filter-branch rewrite all |
| Hardcode year trong footer | Outdated mỗi năm | `new Date().getFullYear()` |
| prisma migrate deploy trên SQLite | Fail nếu chưa có DB | Dùng `prisma db push` |
| Không điền GitHub About | Repo trông amateur | Điền ngay khi tạo repo |
| Không tạo Release | Thiếu versioning | Tag + gh release create |
| Không push Docker Hub | Thiếu container images | Push cả api + web |
| CRLF line endings cho shell scripts | Script fail trên Linux | .gitattributes force LF |
| Quên screenshots/GIFs | README thiếu visual | Playwright automated capture |
| Badges hardcoded (không live) | Misleading | Dùng GitHub Actions badge URL |

---

## 15. Repos tham khảo (Professional Standards)

- **Supabase**: Monorepo, excellent docs, Docker, CI/CD
- **Cal.com**: Next.js + Prisma, great README, Docker
- **Docusaurus**: Community files, versioning, releases
- **Duolingo (open-source)**: Gamification patterns
- **Linear**: UI/UX inspiration (clean, fast, beautiful)
- **Vercel/Next.js**: README structure, badges, contributing guide

---

## 16. Checklist trước khi "Ship"

```
□ GitHub About filled (description + website + topics)
□ README có badges LIVE (CI, deploy, tech stack)
□ README có screenshots + GIFs
□ All tests passing (CI green)
□ No secrets in code/history
□ Contributor = only Nguyễn Sơn
□ Footer year = current year
□ App has data (not empty)
□ Mobile responsive works
□ Dark mode works
□ API deployed + healthy
□ Frontend deployed + loads data
□ Docker images on Docker Hub (api + web)
□ GitHub Release created (v1.0.0)
□ CHANGELOG.md updated
□ No TypeScript errors
□ Prettier formatted
```
