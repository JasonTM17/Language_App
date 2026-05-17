# Deployment Guide

Tài liệu hướng dẫn triển khai LinguaFlow lên các môi trường:

| Môi trường | Nền tảng | URL hiện tại |
|------------|----------|--------------|
| Web (production) | Vercel | https://web-vert-phi-72.vercel.app |
| API (production) | Render Node.js | https://linguaflow-api-ujjo.onrender.com |
| Container | Docker Hub | `nguyenson1710/linguaflow-api`, `nguyenson1710/linguaflow-web` |
| CI/CD | GitHub Actions | [.github/workflows](../.github/workflows) |

---

## 1. Vercel - Web frontend

### 1.1 Cấu hình project

| Trường | Giá trị |
|--------|---------|
| Framework Preset | Next.js |
| Root Directory | `web` |
| Build Command | `npm run build` |
| Install Command | `npm install` |
| Output Directory | `.next` (Next.js standalone, Vercel tự nhận) |
| Node.js Version | 20.x |
| Region | `sin1` (Singapore) hoặc `hkg1` (Hong Kong) |

### 1.2 Environment variables

| Tên | Bắt buộc | Ví dụ giá trị | Mô tả |
|-----|:--------:|---------------|-------|
| `NEXT_PUBLIC_API_URL` | Có | `https://linguaflow-api-ujjo.onrender.com/api` | Endpoint backend |
| `NEXT_PUBLIC_SITE_URL` | Có | `https://web-vert-phi-72.vercel.app` | Dùng cho metadata, sitemap |
| `NEXT_PUBLIC_SITE_NAME` | Không | `LinguaFlow` | Tên hiển thị |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | Không | `vi` | Ngôn ngữ mặc định |

Sau khi thay đổi env vars, redeploy ở tab **Deployments** -> **Redeploy**.

### 1.3 Quy trình deploy

```bash
# Lần đầu
npm install -g vercel
cd web
vercel link
vercel env add NEXT_PUBLIC_API_URL production
vercel --prod

# Các lần sau (auto deploy khi merge vào master)
git push origin master
```

### 1.4 Tối ưu

- Bật **Edge Network Cache** mặc định cho static asset.
- Bật **Image Optimization** với `next/image`.
- Set **Production Branch = master**, các branch khác sẽ deploy preview.
- Bật **Speed Insights** + **Web Analytics** (free tier) để theo dõi LCP/CLS.

---

## 2. Render - API backend

### 2.1 Cấu hình service

| Trường | Giá trị |
|--------|---------|
| Service Type | Web Service |
| Runtime | Node |
| Root Directory | `api` |
| Build Command | `npm ci && npx prisma generate && npm run build` |
| Start Command | `npx prisma db push --accept-data-loss && node dist/index.js` |
| Health Check Path | `/api/health` |
| Auto-Deploy | Bật từ branch `master` |
| Region | Singapore |
| Plan | Free hoặc Starter (nâng cấp khi cần persistent disk) |

> **Quan trọng:** KHÔNG đặt `NODE_ENV` hoặc `PORT` trong env vars. Render tự gán; nếu set thủ công sẽ skip devDependencies khi build và xung đột port.

### 2.2 Environment variables

| Tên | Bắt buộc | Ví dụ | Mô tả |
|-----|:--------:|-------|-------|
| `DATABASE_URL` | Có | `file:/var/data/app.db` | Path SQLite trên persistent disk |
| `JWT_SECRET` | Có | `<random 32+ chars>` | Secret JWT, tạo bằng `openssl rand -hex 32` |
| `FRONTEND_URL` | Có | `https://web-vert-phi-72.vercel.app` | Cho CORS whitelist |
| `N8N_WEBHOOK_URL` | Không | `https://n8n.example.com/webhook/...` | Bật AI provider n8n |
| `OPENAI_API_KEY` | Không | `sk-...` | Bật AI provider OpenAI |
| `OPENAI_BASE_URL` | Không | `https://api.openai.com/v1` | Cho OpenAI-compatible endpoint khác |
| `AI_MODEL` | Không | `gpt-4o-mini` | Override model |
| `GOOGLE_CLIENT_ID` | Không | `...apps.googleusercontent.com` | OAuth |
| `GOOGLE_CLIENT_SECRET` | Không | `GOCSPX-...` | OAuth |

### 2.3 Persistent disk cho SQLite

| Trường | Giá trị |
|--------|---------|
| Mount path | `/var/data` |
| Size | 1 GB (đủ cho dữ liệu portfolio) |
| `DATABASE_URL` | `file:/var/data/app.db` |

Sau khi mount disk, lần deploy đầu tiên sẽ chạy `prisma db push` và seed nếu cần.

### 2.4 Triển khai thủ công

```bash
# 1. Tạo Web Service trên Render UI, chỉ định Root Directory = api
# 2. Set env vars (KHÔNG NODE_ENV / PORT)
# 3. Mount persistent disk /var/data, kích thước 1GB
# 4. Build & start command như mục 2.1
# 5. Render auto-deploy khi push master
```

Logs có thể xem qua tab **Logs** trên Render UI hoặc CLI:

```bash
render logs --service linguaflow-api --tail
```

---

## 3. Docker self-host

### 3.1 docker-compose.yml

LinguaFlow đi kèm [docker-compose.yml](../docker-compose.yml) chuẩn cho local hoặc VPS.

| Service | Port | Image |
|---------|------|-------|
| api | 3001 | build từ `./api/Dockerfile` hoặc pull `nguyenson1710/linguaflow-api:v1.1.0` |
| web | 3000 | build từ `./web/Dockerfile` hoặc pull `nguyenson1710/linguaflow-web:v1.1.0` |

### 3.2 File `.env` cho Docker

Tạo file `.env` cùng cấp `docker-compose.yml`:

```env
JWT_SECRET=<random>
FRONTEND_URL=http://localhost:3000
N8N_WEBHOOK_URL=
OPENAI_API_KEY=
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 3.3 Khởi chạy

```bash
# Build từ source
docker compose up --build -d

# Pull image từ Docker Hub
docker pull nguyenson1710/linguaflow-api:v1.1.0
docker pull nguyenson1710/linguaflow-web:v1.1.0
docker compose up -d

# Theo dõi log
docker compose logs -f api
docker compose logs -f web

# Tắt
docker compose down

# Tắt và xóa volume (mất dữ liệu SQLite)
docker compose down -v
```

### 3.4 Kiểm tra healthcheck

```bash
curl http://localhost:3001/api/health
# {"status":"ok","timestamp":"..."}

curl http://localhost:3001/api/ready
# {"status":"ready","database":"connected"}

curl -I http://localhost:3000/
# HTTP/1.1 200 OK
```

### 3.5 Reverse proxy (Nginx)

| Tuyến | Backend |
|-------|---------|
| `/` | `web:3000` |
| `/api` | `api:3001` |
| `/_next/static` | cache 1 năm |
| `/health` | proxy `api:3001/api/health` cho healthcheck nội bộ |

Mẫu config tham khảo: dùng Caddy/Traefik với auto HTTPS Let's Encrypt cho production.

---

## 4. CI/CD - GitHub Actions

### 4.1 Workflow tổng quan

| Workflow | File | Trigger | Hành động |
|----------|------|---------|-----------|
| CI | [.github/workflows/ci.yml](../.github/workflows/ci.yml) | Push, PR vào `main`/`master` | Lint, typecheck, test, build cho API + Web song song |
| Release | [.github/workflows/release.yml](../.github/workflows/release.yml) | Push tag `v*` | Test -> build & push Docker images -> tạo GitHub Release |
| CodeQL | [.github/workflows/codeql.yml](../.github/workflows/codeql.yml) | Push, PR + cron `0 6 * * 1` | Security scan JS/TS |

### 4.2 CI workflow chi tiết

```yaml
jobs:
  api:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: api } }
    env:
      DATABASE_URL: "file:./test.db"
      JWT_SECRET: "ci-test-secret-key-do-not-use-in-production"
      NODE_ENV: test
      PORT: 3001
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: api/package-lock.json
      - run: npm ci
      - run: npx prisma generate
      - run: npx prisma db push --force-reset --accept-data-loss
      - run: npx tsx src/database/seeds/index.ts
      - run: npx tsc --noEmit
      - run: npx vitest run

  web:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: web } }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm, cache-dependency-path: web/package-lock.json }
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npm run build
```

| Bước | Lý do |
|------|-------|
| `prisma db push --force-reset` | Đảm bảo DB sạch cho mỗi run, tránh lỗi migration trên SQLite |
| `tsx src/database/seeds/index.ts` | Seed dữ liệu mẫu để integration test có data |
| `tsc --noEmit` | Bảo đảm TypeScript pass strict mode |
| `vitest run` | Chạy 16 test suite cho API |

### 4.3 Release workflow

Khi push tag `v1.x.x`:

1. **Test job** chạy lại unit test + typecheck cả `api/` và `web/`.
2. **Docker job** build và push 2 image (`api`, `web`) theo matrix với tag `latest` và `v1.x.x`.
3. **Release job** tạo GitHub Release tự động với release notes generated, kèm hướng dẫn `docker pull`.

```bash
# Phát hành version mới
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0
# Workflow tự chạy
```

### 4.4 CodeQL workflow

| Trường | Giá trị |
|--------|---------|
| Languages | `javascript-typescript` |
| Trigger | push, pull_request, weekly cron |
| Output | Security alerts ở tab **Security** của repo |

### 4.5 Secrets cần thiết

| Tên | Workflow dùng | Mục đích |
|-----|---------------|----------|
| `DOCKERHUB_USERNAME` | release.yml | Login Docker Hub |
| `DOCKERHUB_TOKEN` | release.yml | Token push image |

Cấu hình tại **Settings -> Secrets and variables -> Actions**.

---

## 5. Quy trình deploy hoàn chỉnh

| # | Bước | Tool |
|---|------|------|
| 1 | Push code feature lên `master` qua PR | GitHub |
| 2 | CI xanh (api + web) | GitHub Actions |
| 3 | Render auto-deploy API | Render |
| 4 | Vercel auto-deploy Web | Vercel |
| 5 | Verify health check, frontend load data | Browser/curl |
| 6 | Cập nhật `CHANGELOG.md` cho version mới | Editor |
| 7 | Tag release `git tag -a v1.x.x` | Git |
| 8 | Push tag, release workflow build Docker | GitHub Actions |
| 9 | GitHub Release auto-generated | GitHub |
| 10 | Smoke test image Docker `docker pull && docker compose up` | Docker |

---

## 6. Rollback

| Nền tảng | Cách rollback |
|----------|---------------|
| Vercel | Vào Deployments -> chọn deployment trước -> Promote to Production |
| Render | Tab Deploys -> chọn build trước -> Rollback |
| Docker | `docker compose down && docker compose up -d` với image version cũ (`v1.0.0`) |
| Database | Restore từ snapshot persistent disk (Render) hoặc backup `*.db` thủ công |

> Trước khi rollback DB, luôn export dữ liệu hiện tại để tránh mất bản ghi mới.

---

## 7. Troubleshooting

| Triệu chứng | Nguyên nhân | Giải pháp |
|-------------|-------------|-----------|
| Render build fail "missing typescript" | Set `NODE_ENV=production` -> npm ci skip devDeps | Bỏ env `NODE_ENV` |
| Render boot fail port conflict | Set `PORT` thủ công | Bỏ env `PORT`, dùng `process.env.PORT` |
| Vercel preview gọi API CORS error | Frontend URL chưa nằm trong whitelist | Bổ sung domain Vercel preview vào `FRONTEND_URL` (hoặc cấu hình regex CORS) |
| Vercel build "metadataBase warning" | Thiếu `NEXT_PUBLIC_SITE_URL` | Set env trước khi deploy |
| `prisma db push` fail trong container | Persistent disk chưa mount | Mount `/var/data` và set `DATABASE_URL=file:/var/data/app.db` |
| AI Tutor không phản hồi | Provider key sai | Để trống `OPENAI_API_KEY` để fallback mock |
| 429 trên `/auth/login` | Quá rate limit auth | Giảm tần suất hoặc tăng `max` trong `authLimiter` |
