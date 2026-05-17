# LinguaFlow - Reviewer Evidence Pack

Tài liệu này là quick reference cho reviewer muốn xác minh các tuyên bố production của LinguaFlow mà không cần phải tin vào nội dung README. Mọi mục bên dưới đều dẫn đến file thật trong repo, workflow CI có thể click vào, hoặc lệnh có thể chạy lại.

Mục đích: rút ngắn thời gian review từ "đọc README, hy vọng đúng" xuống "click vào URL, chạy 1 lệnh, xác minh trong 5 phút".

Last verified: 2026-05-17

---

## 1. CI/CD Evidence

| Workflow | Cấu hình | Latest run | Badge |
|----------|----------|-----------|-------|
| CI | [.github/workflows/ci.yml](../.github/workflows/ci.yml) | https://github.com/JasonTM17/Language_App/actions/workflows/ci.yml | ![CI](https://github.com/JasonTM17/Language_App/actions/workflows/ci.yml/badge.svg) |
| CodeQL | [.github/workflows/codeql.yml](../.github/workflows/codeql.yml) | https://github.com/JasonTM17/Language_App/actions/workflows/codeql.yml | ![CodeQL](https://github.com/JasonTM17/Language_App/actions/workflows/codeql.yml/badge.svg) |
| Release | [.github/workflows/release.yml](../.github/workflows/release.yml) | https://github.com/JasonTM17/Language_App/actions/workflows/release.yml | (chỉ chạy khi tag `v*`) |

### CI pipeline thực hiện gì

| Job | Steps | Verify thế nào |
|-----|-------|----------------|
| `api` | `npm ci` -> `prisma generate` -> `prisma db push` -> seed -> `tsc --noEmit` -> `vitest run` | Click vào CI run mới nhất, mở job "API - Build & Test", đọc log step "Run tests" |
| `web` | `npm ci` -> `tsc --noEmit` -> `next build` | Click vào CI run mới nhất, mở job "Web - Build & Lint", đọc log step "Build" |

### Release pipeline (khi push tag `v*`)

| Job | Output | Verify thế nào |
|-----|--------|----------------|
| `test` | API tests + typecheck (api + web) | Mở GitHub Actions tab tag mới |
| `docker` | Push 2 images lên Docker Hub với tags `latest` + `${tag}` | `docker pull nguyenson1710/linguaflow-api:v1.1.0` |
| `release` | GitHub Release tự động generate notes | https://github.com/JasonTM17/Language_App/releases |

---

## 2. Live Endpoints

| Service | URL | Health check | Verify command |
|---------|-----|--------------|----------------|
| Web | https://web-vert-phi-72.vercel.app | Trả 200 OK ở route `/` | `curl -I https://web-vert-phi-72.vercel.app` |
| API | https://linguaflow-api-ujjo.onrender.com | `/api/health` trả `{"status":"ok"}` | `curl https://linguaflow-api-ujjo.onrender.com/api/health` |

### Smoke test 30 giây

```bash
# 1. Health check API
curl -s https://linguaflow-api-ujjo.onrender.com/api/health | jq .

# 2. Public endpoint (languages list, không cần auth)
curl -s https://linguaflow-api-ujjo.onrender.com/api/languages | jq '. | length'

# 3. Web home page
curl -sI https://web-vert-phi-72.vercel.app | head -1
```

Kết quả mong đợi:
- API health: `{"status":"ok"}`
- Languages: số nguyên >= 4 (en, ja, zh, ko)
- Web home: `HTTP/2 200`

---

## 3. Test Evidence

| Hạng mục | Số liệu | Đường dẫn |
|----------|---------|-----------|
| Test suites | 16 file | [api/src/__tests__](../api/src/__tests__) |
| Tests passed | 129 tests | Last run: latest CI |
| Test framework | Vitest + Supertest | [api/package.json](../api/package.json) |

### 16 test suites

| File | Phạm vi |
|------|---------|
| `auth.test.ts` | Đăng ký, đăng nhập, JWT, cookie httpOnly, rate limit |
| `vocabulary.test.ts` | CRUD từ vựng, SM-2 review |
| `quiz.test.ts` | Quiz attempt, scoring, XP reward |
| `lessons.test.ts` | Lessons listing, language filter |
| `progress.test.ts` | Dashboard, stats, streak |
| `achievements.test.ts` | Unlock logic, rewards |
| `daily-challenge.test.ts` | Daily challenge generation, claim |
| `friends.test.ts` | Lời mời, leaderboard bạn bè |
| `languages.test.ts` | 4 ngôn ngữ supported |
| `listening.test.ts` | Bài nghe theo cấp độ |
| `notifications.test.ts` | Read/unread, filtering |
| `shop.test.ts` | Mua vật phẩm, deduct gems |
| `skill-tree.test.ts` | Unlock node, prerequisites |
| `speaking.test.ts` | Submit, scoring criteria |
| `stories.test.ts` | Truyện song ngữ, segments |
| `chat.test.ts` | AI chat history, persistence |

### Reproduce locally

```bash
cd api
npm ci
npx prisma generate
npx prisma db push --force-reset --accept-data-loss
npx tsx src/database/seeds/index.ts
npx vitest run

# Với coverage report
npx vitest run --coverage
```

---

## 4. UI Audit Evidence

| Báo cáo | File | Tóm tắt |
|---------|------|---------|
| UI Audit Report | [docs/UI_AUDIT_REPORT.md](UI_AUDIT_REPORT.md) | 50 trang audit, 0 P0/P1/P2 bugs |
| UI Guidelines | [docs/UI_GUIDELINES.md](UI_GUIDELINES.md) | Design tokens, dark mode, responsive |

### 21 screenshots evidence

| Loại | Số lượng | Đường dẫn |
|------|----------|-----------|
| Desktop (1280x720) | 11 ảnh | [docs/screenshots/desktop-*.png](screenshots/) |
| Mobile (390x844) | 10 ảnh | [docs/screenshots/mobile-*.png](screenshots/) |

### Screenshots theo trang

| Trang | Desktop | Mobile |
|-------|---------|--------|
| Landing | desktop-landing.png | mobile-landing.png |
| Dashboard | desktop-dashboard.png | mobile-dashboard.png |
| Vocabulary | desktop-vocabulary.png | mobile-vocabulary.png |
| Quiz | desktop-quiz.png | mobile-quiz.png |
| AI Tutor | desktop-ai-tutor.png | mobile-ai-tutor.png |
| Listening | desktop-listening.png | mobile-listening.png |
| Skill Tree | desktop-skill-tree.png | mobile-skill-tree.png |
| Leaderboard | desktop-leaderboard.png | mobile-leaderboard.png |
| Profile | desktop-profile.png | mobile-profile.png |
| Daily Challenge | desktop-daily-challenge.png | mobile-daily-challenge.png |
| Dark Mode | desktop-dark-mode.png | (toggled trên mọi mobile screen) |

---

## 5. Container Images Evidence

| Image | Registry | Tags | Source Dockerfile |
|-------|----------|------|-------------------|
| `nguyenson1710/linguaflow-api` | Docker Hub | `latest`, `v1.1.0` | [api/Dockerfile](../api/Dockerfile) |
| `nguyenson1710/linguaflow-web` | Docker Hub | `latest`, `v1.1.0` | [web/Dockerfile](../web/Dockerfile) |

### Verify image build

```bash
# Pull và inspect
docker pull nguyenson1710/linguaflow-api:v1.1.0
docker pull nguyenson1710/linguaflow-web:v1.1.0
docker inspect nguyenson1710/linguaflow-api:v1.1.0 | jq '.[0].Config'

# Run full stack
docker compose up -d
docker compose ps
docker compose logs -f api
```

Chi tiết đầy đủ: [docs/container-images.md](container-images.md).

---

## 6. Security Audit Evidence

| Lớp | Thực tế | File tham khảo |
|-----|---------|----------------|
| HTTP headers | `helmet()` default | [api/src/index.ts](../api/src/index.ts) |
| CORS | Whitelist `FRONTEND_URL`, credentials true | [api/src/index.ts](../api/src/index.ts) |
| Rate limit | 100 req/15 phut global, 10 req/15 phut auth | [api/src/index.ts](../api/src/index.ts) |
| Validation | Zod ở mọi route nhận body | `api/src/routes/*.ts` |
| Auth | JWT 7 ngày, bcrypt cost 12, cookie httpOnly + secure | [api/src/routes/auth.ts](../api/src/routes/auth.ts) |
| ORM | Prisma toàn bộ, không raw SQL | [api/prisma/schema.prisma](../api/prisma/schema.prisma) |
| Static analysis | CodeQL push/PR + weekly Monday 06:00 UTC | [.github/workflows/codeql.yml](../.github/workflows/codeql.yml) |
| Dependency | Dependabot weekly | `.github/dependabot.yml` |

### Security policy đầy đủ

[SECURITY.md](../SECURITY.md) - quy trình báo cáo, phạm vi, hardening checklist.

---

## 7. Quality Gates

Mọi gate đều có thể chạy local trên cùng commit ở master.

| Gate | Lệnh | Expected |
|------|------|----------|
| API typecheck | `cd api && npx tsc --noEmit` | Exit 0, không có lỗi |
| Web typecheck | `cd web && npx tsc --noEmit` | Exit 0, không có lỗi |
| API tests | `cd api && npx vitest run` | 129/129 passed |
| Web build | `cd web && npm run build` | Build thành công, exit 0 |
| Web lint | `cd web && npm run lint` | Không lỗi |
| Format check | `npx prettier --check "**/*.{ts,tsx,md}"` | Đã format |
| Docker build | `docker compose build` | 2 images built thành công |

---

## 8. Repository Stats

| Hạng mục | Số liệu | Verify |
|----------|---------|--------|
| API endpoints | 38 routes | Đếm trong `api/src/routes/` |
| Web pages | 50+ trang | Liệt kê trong `web/src/app/` |
| Test suites | 16 files | `ls api/src/__tests__/` |
| Total tests | 129 tests | `cd api && npx vitest run --reporter=verbose` |
| Screenshots | 21 ảnh | `ls docs/screenshots/` |
| Languages supported | 4 (en, ja, zh, ko) | `curl https://linguaflow-api-ujjo.onrender.com/api/languages` |
| GitHub workflows | 3 (ci, codeql, release) | `ls .github/workflows/` |

---

## 9. Documentation Reference

| Tài liệu | Mục đích |
|----------|----------|
| [README.md](../README.md) | Overview, quick start |
| [docs/ARCHITECTURE.md](ARCHITECTURE.md) | Kiến trúc, data flow, SM-2 algorithm |
| [docs/api.md](api.md) | API reference đầy đủ 38 endpoints |
| [docs/DEPLOYMENT.md](DEPLOYMENT.md) | Hướng dẫn deploy Vercel, Render, Docker |
| [docs/TESTING.md](TESTING.md) | Test strategy, Vitest patterns |
| [docs/UI_GUIDELINES.md](UI_GUIDELINES.md) | Design system, dark mode |
| [docs/UI_AUDIT_REPORT.md](UI_AUDIT_REPORT.md) | Audit 50 trang, 0 bugs |
| [docs/RELEASE_NOTES_v1.1.0.md](RELEASE_NOTES_v1.1.0.md) | Public release notes |
| [docs/container-images.md](container-images.md) | Docker images, tags, healthchecks |
| [docs/HONEST_SCOPE.md](HONEST_SCOPE.md) | Đây là gì, không phải là gì |
| [SECURITY.md](../SECURITY.md) | Báo cáo lỗ hổng, hardening |
| [CHANGELOG.md](../CHANGELOG.md) | Lịch sử phiên bản |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Quy trình đóng góp |

---

## 10. Reviewer Checklist

Reviewer có thể tick từng mục để xác minh:

- [ ] CI badge ở README chạy live, click vào dẫn đến GitHub Actions
- [ ] CodeQL workflow chạy lần cuối < 7 ngày trước (cron weekly)
- [ ] Web URL trả 200, hiển thị landing page
- [ ] API `/api/health` trả `{"status":"ok"}`
- [ ] `cd api && npx vitest run` pass 129/129 trên máy local
- [ ] `docker compose up -d` khởi động cả 2 service và pass healthcheck
- [ ] 21 screenshots tồn tại trong `docs/screenshots/`
- [ ] `SECURITY.md` mô tả đầy đủ phạm vi và quy trình báo cáo
- [ ] `CHANGELOG.md` cập nhật cho phiên bản hiện tại (1.1.0)
- [ ] [docs/HONEST_SCOPE.md](HONEST_SCOPE.md) nói rõ giới hạn của dự án

---

Maintainer: **Nguyễn Sơn** - jasonbmt06@gmail.com - [GitHub](https://github.com/JasonTM17)
