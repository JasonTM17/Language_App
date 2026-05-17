# Container Images

LinguaFlow phát hành 2 container images chính thức trên Docker Hub: `linguaflow-api` (Express + Prisma + SQLite) và `linguaflow-web` (Next.js 14 standalone). Cả hai image được build tự động qua workflow [release.yml](../.github/workflows/release.yml) mỗi khi push tag `v*`.

Tài liệu này mô tả các image, tag, biến môi trường, healthcheck và lệnh chạy nhanh.

---

## 1. Tổng quan images

| Registry | Image | Tags hiện có | Dockerfile |
|----------|-------|--------------|------------|
| Docker Hub | `nguyenson1710/linguaflow-api` | `latest`, `v1.1.0`, `v1.0.0` | [api/Dockerfile](../api/Dockerfile) |
| Docker Hub | `nguyenson1710/linguaflow-web` | `latest`, `v1.1.0`, `v1.0.0` | [web/Dockerfile](../web/Dockerfile) |

Tag `latest` luôn trỏ tới release ổn định mới nhất. Production deployment nên pin theo tag phiên bản (`v1.1.0`) để build được reproducible.

---

## 2. Quick Pull

```bash
# Pull cả 2 images
docker pull nguyenson1710/linguaflow-api:v1.1.0
docker pull nguyenson1710/linguaflow-web:v1.1.0

# Hoặc latest
docker pull nguyenson1710/linguaflow-api:latest
docker pull nguyenson1710/linguaflow-web:latest
```

---

## 3. Quick Run với Docker Compose

Cách khuyến nghị: dùng [docker-compose.yml](../docker-compose.yml) sẵn có ở root repo.

```bash
git clone https://github.com/JasonTM17/Language_App.git
cd Language_App

# Cấu hình JWT_SECRET trong .env
echo "JWT_SECRET=$(openssl rand -hex 32)" > .env

# Khởi động full stack
docker compose up -d

# Theo dõi log
docker compose logs -f
```

Truy cập:

| Service | URL |
|---------|-----|
| Web | http://localhost:3000 |
| API | http://localhost:3001/api |
| Health | http://localhost:3001/api/health |

---

## 4. Image: linguaflow-api

### Cấu hình build

| Hạng mục | Giá trị |
|----------|---------|
| Base image | `node:20-alpine` |
| Build strategy | Single stage, build TypeScript -> `dist/` |
| Default port | `3001` |
| Database | SQLite tại `/app/data/linguaflow.db` |
| Entry command | `node dist/index.js` (sau khi `prisma db push`) |

### Biến môi trường

| Biến | Bắt buộc | Mặc định | Mô tả |
|------|:--------:|----------|-------|
| `DATABASE_URL` | Có | `file:./data/linguaflow.db` | Connection string SQLite |
| `JWT_SECRET` | Có | (none) | Secret ký JWT, >= 32 ký tự |
| `PORT` | Không | `3001` | Port lắng nghe |
| `NODE_ENV` | Không | `production` | `production` hoặc `development` |
| `FRONTEND_URL` | Không | `http://localhost:3000` | Origin được phép qua CORS |
| `OPENAI_API_KEY` | Không | (none) | AI Tutor sẽ fallback nếu không có |
| `OPENAI_BASE_URL` | Không | (none) | Base URL OpenAI-compatible |
| `AI_MODEL` | Không | (none) | Model name AI |
| `N8N_WEBHOOK_URL` | Không | (none) | Webhook n8n cho AI |
| `GOOGLE_CLIENT_ID` | Không | (none) | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | Không | (none) | Google OAuth |

AI provider chọn tự động: n8n -> OpenAI -> mock fallback. Container chạy ngay không cần cấu hình AI.

### Healthcheck

Healthcheck được khai báo trong [docker-compose.yml](../docker-compose.yml):

```yaml
healthcheck:
  test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3001/api/health"]
  interval: 30s
  timeout: 10s
  start_period: 10s
  retries: 3
```

Endpoint `/api/health` trả `{"status":"ok"}` khi process up.

### Volume

| Volume | Mount point | Mục đích |
|--------|-------------|----------|
| `api-data` | `/app/data` | Lưu file SQLite, giữ dữ liệu khi container restart |

### Run standalone

```bash
docker run -d \
  --name linguaflow-api \
  -p 3001:3001 \
  -e JWT_SECRET="$(openssl rand -hex 32)" \
  -e DATABASE_URL="file:./data/linguaflow.db" \
  -v linguaflow-api-data:/app/data \
  nguyenson1710/linguaflow-api:v1.1.0

# Verify
curl http://localhost:3001/api/health
```

---

## 5. Image: linguaflow-web

### Cấu hình build

| Hạng mục | Giá trị |
|----------|---------|
| Base image | `node:20-alpine` |
| Build strategy | Multi-stage (deps -> build -> runner) |
| Output mode | Next.js standalone |
| Default port | `3000` |
| User | `nextjs:nodejs` (non-root, uid 1001) |
| Entry command | `node server.js` |

### Biến môi trường

| Biến | Bắt buộc | Mặc định | Mô tả |
|------|:--------:|----------|-------|
| `NEXT_PUBLIC_API_URL` | Có | `http://api:3001/api` | URL API backend, **build-time** + runtime |
| `NODE_ENV` | Không | `production` | Next.js mode |
| `PORT` | Không | `3000` | Port lắng nghe |
| `HOSTNAME` | Không | `0.0.0.0` | Bind host |
| `NEXT_TELEMETRY_DISABLED` | Không | `1` | Tắt telemetry Next.js |

`NEXT_PUBLIC_*` là biến client-side, được inline vào bundle khi build. Nếu thay đổi giá trị, phải rebuild image.

### Healthcheck

Healthcheck nội bộ Dockerfile:

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1
```

### Run standalone

```bash
docker run -d \
  --name linguaflow-web \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:3001/api \
  nguyenson1710/linguaflow-web:v1.1.0

# Verify
curl -I http://localhost:3000
```

Lưu ý: nếu API không chạy ở `localhost:3001`, app vẫn render shell nhưng các call tới API sẽ fail. Khuyến nghị dùng docker-compose để 2 service nói chuyện qua mạng `linguaflow`.

---

## 6. Network Layout (docker-compose)

| Network | Driver | Services |
|---------|--------|----------|
| `linguaflow` | bridge | api, web |

Trong network `linguaflow`, web gọi API qua `http://api:3001/api`. Bên ngoài host, expose qua port mapping `3000:3000` và `3001:3001`.

```
Browser
   |
   +--> localhost:3000 ----> [linguaflow-web container] ----> http://api:3001 ----> [linguaflow-api container]
   |
   +--> localhost:3001/api -> [linguaflow-api container]
```

---

## 7. Image Sizes & Build Time

| Image | Size (compressed) | Build time CI |
|-------|-------------------|---------------|
| `linguaflow-api` | ~120 MB | ~2 phút |
| `linguaflow-web` | ~140 MB | ~3 phút |

Multi-stage build cho web giúp loại trừ devDependencies + build cache, output cuối là standalone Next.js (không cần `node_modules` runtime).

CI dùng buildx cache (`type=gha`) để rút ngắn build subsequent.

---

## 8. Pin theo digest (production hardening)

Pin theo digest đảm bảo image không bị thay thế dù tag bị overwrite.

```bash
# Lấy digest
docker pull nguyenson1710/linguaflow-api:v1.1.0
docker inspect nguyenson1710/linguaflow-api:v1.1.0 \
  --format='{{index .RepoDigests 0}}'

# Dùng digest trong compose
# image: nguyenson1710/linguaflow-api@sha256:abc123...
```

---

## 9. Verify image authenticity

```bash
# Image labels
docker inspect nguyenson1710/linguaflow-api:v1.1.0 | jq '.[0].Config.Labels'

# Layer history
docker history nguyenson1710/linguaflow-api:v1.1.0

# Scan vulnerabilities (yêu cầu Docker Scout hoặc Trivy)
docker scout cves nguyenson1710/linguaflow-api:v1.1.0
trivy image nguyenson1710/linguaflow-api:v1.1.0
```

---

## 10. Update strategy

| Tình huống | Hành động |
|------------|-----------|
| Patch bảo mật | Bump tag patch (`v1.1.0` -> `v1.1.1`), push tag, release.yml tự build |
| Feature mới | Bump minor (`v1.1.0` -> `v1.2.0`) |
| Breaking change | Bump major (`v1.x` -> `v2.0.0`) |
| Hotfix `latest` | Re-run release workflow trên cùng tag |

Container deployment nên track theo minor (`v1.1.x`) để nhận patch bảo mật mà không phá compat.

---

## 11. Troubleshooting

| Vấn đề | Nguyên nhân | Fix |
|--------|-------------|-----|
| `JWT_SECRET environment variable is required` | Quên set env | `docker compose --env-file .env up` |
| API container restart loop | Volume permission | `docker volume rm linguaflow_api-data && docker compose up -d` |
| Web không gọi được API | `NEXT_PUBLIC_API_URL` sai khi build | Rebuild với `--build-arg NEXT_PUBLIC_API_URL=...` |
| Healthcheck fail | API chưa boot xong | Tăng `start_period` lên 30s |
| Database lock | SQLite single-writer | Không scale horizontal cho api, chỉ 1 instance |

---

## 12. Local image build (không cần Docker Hub)

```bash
# Build từ source
docker compose build

# Hoặc per-service
docker build -t linguaflow-api:dev ./api
docker build -t linguaflow-web:dev ./web

# Run with overrides
NEXT_PUBLIC_API_URL=http://localhost:3001/api docker compose up
```

---

## 13. Tài liệu liên quan

| Tài liệu | Mô tả |
|----------|-------|
| [docs/DEPLOYMENT.md](DEPLOYMENT.md) | Triển khai Vercel, Render, Docker chi tiết |
| [docs/REVIEW_EVIDENCE.md](REVIEW_EVIDENCE.md) | Reviewer evidence pack |
| [.github/workflows/release.yml](../.github/workflows/release.yml) | Workflow build và push images |
| [docker-compose.yml](../docker-compose.yml) | Compose file chuẩn |
| [SECURITY.md](../SECURITY.md) | Phạm vi bảo mật cho images |

---

Maintainer: **Nguyễn Sơn** - jasonbmt06@gmail.com - [GitHub](https://github.com/JasonTM17)
