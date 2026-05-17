# LinguaFlow - Honest Scope

Tài liệu này mô tả thẳng thắn dự án LinguaFlow LÀ GÌ và KHÔNG PHẢI LÀ GÌ. Mục đích là giúp reviewer (recruiter, kỹ sư khác, hoặc chính bản thân tương lai) đánh giá đúng đắn mà không bị truyền thông marketing làm sai lệch kỳ vọng.

Lý do tách thành file riêng: README dễ bị "đẹp hoá" qua nhiều lần update, còn HONEST_SCOPE giữ một bản mô tả ổn định, được cập nhật mỗi release để phản ánh trạng thái thật.

Last reviewed: 2026-05-17 (v1.1.0)

---

## 1. Đây là gì

LinguaFlow là **dự án portfolio full-stack cá nhân** với kiến trúc và quy trình có hình dạng giống production: monorepo TypeScript, CI/CD trên GitHub Actions, Docker images publish lên Docker Hub, deploy tự động lên Vercel + Render, có test suite, có security scanning, có documentation.

Mục tiêu của dự án:

| Mục tiêu | Hiện trạng |
|----------|-----------|
| Demo kỹ năng full-stack TypeScript end-to-end | Đạt - 50+ trang Next.js + 38 API endpoint |
| Áp dụng SDLC chuẩn (CI/CD, code review, security) | Đạt - 3 workflow GitHub Actions, CodeQL, Dependabot |
| Tái hiện mô hình SaaS thực tế (auth, gamification, social) | Đạt một phần - thiếu billing, multi-tenancy |
| Dùng làm artifact cho hồ sơ ứng tuyển | Đạt - link sống, badge live, audit report |

Dự án có người dùng thật không? Không. Dự án có infrastructure live? Có (free-tier). Dự án phục vụ traffic thương mại? Không.

---

## 2. Đây không phải là gì

| Tuyên bố KHÔNG đưa ra | Lý do |
|------------------------|-------|
| SaaS thương mại đang chạy production | Free-tier hosting, không có SLA, không có người dùng trả phí |
| Đã được pen-test bởi bên thứ ba | Chỉ có CodeQL static analysis, chưa có pen-test thủ công |
| Đảm bảo HA hoặc multi-region | Single-region (Vercel auto + Render Singapore), không có failover |
| Real user analytics | Tính năng "Analytics" chỉ tính trên dữ liệu user của chính họ, không có aggregate analytics ngoài demo |
| Hệ thống thanh toán hoặc billing | Shop dùng "gems" in-game, không kết nối Stripe/payment gateway |
| Tuân thủ GDPR/HIPAA/SOC 2 | Chưa có DPIA, chưa có DPO, chưa có audit chính thức |
| Khả năng scale ngang | SQLite single-file, single-writer, không cluster-ready |
| Bảo đảm uptime 99.9%+ | Render free-tier có cold start ~30s sau idle |

---

## 3. Production-shaped: cái gì có

| Thành phần | Hiện trạng | Tham khảo |
|------------|-----------|-----------|
| Monorepo TypeScript | Có - api/, web/, mobile/, shared/ | [package.json](../package.json) |
| CI/CD pipeline | Có - 3 workflows (ci, codeql, release) | [.github/workflows](../.github/workflows) |
| Multi-stage Docker builds | Có - web standalone, api compiled | [api/Dockerfile](../api/Dockerfile), [web/Dockerfile](../web/Dockerfile) |
| Container registry | Có - Docker Hub `nguyenson1710/*` | [docs/container-images.md](container-images.md) |
| Auto deploy | Có - Vercel (web), Render (api) | [docs/DEPLOYMENT.md](DEPLOYMENT.md) |
| Healthcheck endpoints | Có - `/api/health`, web `/` | [docker-compose.yml](../docker-compose.yml) |
| Test suite | Có - 16 suites, 129 integration tests | [api/src/__tests__](../api/src/__tests__) |
| Security headers | Có - helmet defaults | [api/src/index.ts](../api/src/index.ts) |
| Rate limiting | Có - 100 req/15p global, 10 req/15p auth | [api/src/index.ts](../api/src/index.ts) |
| Auth + JWT + bcrypt | Có - cookie httpOnly, secure ở prod | [api/src/routes/auth.ts](../api/src/routes/auth.ts) |
| Input validation | Có - Zod schema cho mọi route body | api/src/routes/*.ts |
| ORM (no raw SQL) | Có - Prisma toàn bộ | [api/prisma/schema.prisma](../api/prisma/schema.prisma) |
| Static analysis | Có - CodeQL push/PR + weekly | [.github/workflows/codeql.yml](../.github/workflows/codeql.yml) |
| Dependency updates | Có - Dependabot weekly | `.github/dependabot.yml` |
| Security policy | Có - SECURITY.md với quy trình báo cáo | [SECURITY.md](../SECURITY.md) |
| Changelog | Có - Keep a Changelog format | [CHANGELOG.md](../CHANGELOG.md) |
| Documentation | Có - 10+ tài liệu chi tiết | [docs/](.) |

---

## 4. KHÔNG có (và không claim có)

| Thành phần | Lý do bỏ qua | Cần khi nào |
|------------|--------------|-------------|
| Penetration testing | Không có ngân sách hire pen-tester | Khi có user trả phí và lưu PII nhạy cảm |
| Multi-region deployment | Free-tier không hỗ trợ | Khi user > 10k và phân bố toàn cầu |
| HA database (PostgreSQL replica) | SQLite đủ cho demo | Khi vượt write throughput SQLite (~1000 wps) |
| Distributed tracing (OpenTelemetry) | Quy mô nhỏ, log đủ debug | Khi có > 5 microservices |
| APM (DataDog, New Relic) | Free-tier hosting đã có log | Khi cần SLA-grade observability |
| Load testing (k6, Artillery) | Chưa có target SLA cụ thể | Trước khi launch thương mại |
| Chaos engineering | Chỉ 2 service, blast radius nhỏ | Khi vận hành multi-service |
| Real user monitoring (RUM) | Free Vercel analytics đã đủ | Khi tối ưu Core Web Vitals theo cohort |
| Feature flag platform (LaunchDarkly) | Phát hành theo tag git | Khi cần gradual rollout |
| Blue-green hoặc canary deploy | Vercel/Render auto-deploy 100% | Khi traffic không cho phép downtime |
| Compliance audit (SOC 2, ISO 27001) | Không lưu PII commercial | Khi bán B2B enterprise |
| Disaster recovery drill | Backup SQLite tự thân container | Khi mất dữ liệu = mất tiền |

---

## 5. Giới hạn kỹ thuật cố ý

Một số quyết định trade-off được đưa ra có chủ đích để dự án **đơn giản và self-contained** hơn là production-grade triệt để:

| Quyết định | Trade-off | Lý do |
|------------|-----------|-------|
| SQLite thay vì PostgreSQL | Single-writer, không scale ngang | Demo chạy được trên Render free, không cần managed DB |
| JWT 7 ngày, không refresh token | Phải đăng nhập lại sau 7 ngày | Đơn giản hoá auth flow |
| AI Tutor có mock fallback | Demo chạy được không cần API key | Reviewer không phải mua key OpenAI |
| Email verification optional | Có thể đăng ký email giả | Phù hợp với portfolio, không phải production |
| Không có account recovery flow | User mất password phải tạo lại | Tránh phải tích hợp SMTP cho demo |
| Single-tenant | Không có org/workspace concept | Không nằm trong phạm vi học tập |
| Không có audit log | Không track user actions cho compliance | SQLite WAL đủ cho debug demo |
| Hearts/gems dùng nội bộ | Không có in-app purchase | Không phải mục tiêu commerce |
| Không có CDN cho static assets | Phụ thuộc Vercel/Render edge | Free-tier đã đủ |

Tất cả các điểm trên có thể được nâng cấp khi dự án được "promote" sang sản phẩm thật. Hiện tại chúng là giới hạn được lựa chọn.

---

## 6. Chất lượng code

| Tiêu chí | Hiện trạng |
|----------|-----------|
| TypeScript strict | Có ở api/ và web/ |
| Lint | ESLint config riêng cho web/ |
| Format | Prettier toàn repo |
| Test coverage | 129 integration tests cho api, e2e Playwright cho web |
| Test coverage % | Chưa đo cụ thể, có thể chạy `vitest run --coverage` |
| Public API typed | Có - Zod schemas validate runtime, TS validate compile-time |
| Migration history | Có - Prisma migration files |
| Documented endpoints | 38/38 trong [docs/api.md](api.md) |

Chất lượng code không tự nó là claim "production-ready", nhưng đảm bảo dự án có thể được review và mở rộng mà không cần tái cấu trúc lớn.

---

## 7. Reviewer expectations

Khi review LinguaFlow, vui lòng kỳ vọng:

| Có thể đánh giá | Không nên đánh giá |
|-----------------|---------------------|
| Cấu trúc code, tách layer | Ổn định khi 1000 user đồng thời |
| Quyết định kiến trúc, lý do chọn tool | Khả năng phục vụ business critical |
| Quy trình SDLC, CI/CD | Compliance pháp lý |
| Khả năng implement domain phức tạp (SM-2, gamification, AI chain) | Real ROI, retention metrics |
| Quy mô documentation, cách viết test | SLA, RTO, RPO của hệ thống |
| Cleanliness, maintainability | Hiệu năng dưới tải sản xuất |

---

## 8. Tham khảo

| Tài liệu | Mô tả |
|----------|-------|
| [README.md](../README.md) | Overview |
| [docs/REVIEW_EVIDENCE.md](REVIEW_EVIDENCE.md) | Reviewer evidence pack |
| [docs/ARCHITECTURE.md](ARCHITECTURE.md) | Kiến trúc và quyết định kỹ thuật |
| [docs/container-images.md](container-images.md) | Docker images |
| [SECURITY.md](../SECURITY.md) | Security policy |
| [CHANGELOG.md](../CHANGELOG.md) | Lịch sử phiên bản |

---

## 9. Cập nhật tài liệu này

Mỗi major/minor release nên review lại 3 mục:
1. **Section 3** - cập nhật những gì đã thêm vào "production-shaped"
2. **Section 4** - đánh dấu những gì đã chuyển từ "không có" sang "có"
3. **Section 5** - rà soát lại trade-off còn phù hợp không

Mục tiêu: HONEST_SCOPE phải luôn phản ánh trạng thái hiện tại, không phải trạng thái mong muốn.

---

Maintainer: **Nguyễn Sơn** - jasonbmt06@gmail.com - [GitHub](https://github.com/JasonTM17)
