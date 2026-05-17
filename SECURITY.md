# Security Policy

LinguaFlow là dự án portfolio mã nguồn mở. Tài liệu này mô tả phạm vi bảo mật được hỗ trợ, cách báo cáo lỗ hổng có trách nhiệm và các thực tiễn bảo mật đang áp dụng trong codebase.

Liên hệ bảo mật: **Nguyễn Sơn** (`jasonbmt06@gmail.com`).

---

## 1. Phiên bản được hỗ trợ

| Version | Trạng thái | Hỗ trợ bảo mật | Ghi chú |
|---------|-----------|----------------|---------|
| 1.1.x | Active | Có | Phiên bản phát hành chính, nhận patch bảo mật trong vòng 30 ngày |
| 1.0.x | Maintenance | Có | Chỉ nhận patch cho lỗ hổng nghiêm trọng (CVSS >= 7.0) |
| < 1.0 | EOL | Không | Vui lòng nâng cấp lên 1.1.x |

---

## 2. Báo cáo lỗ hổng

> Vui lòng KHÔNG mở public GitHub issue cho các vấn đề bảo mật. Issue công khai có thể tiết lộ lỗ hổng cho kẻ tấn công trước khi có bản vá.

### Quy trình báo cáo

1. Gửi email tới `jasonbmt06@gmail.com` với tiêu đề bắt đầu bằng `[SECURITY]`.
2. Đính kèm các thông tin sau:
   - Mô tả ngắn gọn lỗ hổng và tác động tiềm tàng.
   - Bước tái hiện chi tiết, kèm request/response hoặc đoạn code minh họa.
   - Phiên bản, môi trường (OS, Node, browser) bạn quan sát thấy.
   - PoC nếu có (giới hạn ở mức demo, không khai thác lên production).
   - Đề xuất patch (nếu có).
3. Sau khi gửi, vui lòng giữ thông tin này riêng tư cho đến khi có bản vá public.

### Cam kết phản hồi

| Mốc thời gian | Hành động |
|---------------|-----------|
| Trong 48 giờ | Phản hồi xác nhận đã nhận báo cáo |
| Trong 5 ngày làm việc | Đánh giá sơ bộ mức độ và lên kế hoạch xử lý |
| Trong 30 ngày | Phát hành bản vá cho lỗ hổng nghiêm trọng (CVSS >= 7.0) |
| Trong 90 ngày | Coordinated disclosure công khai sau khi vá |

Người báo cáo có thiện chí sẽ được ghi nhận trong release notes nếu mong muốn.

---

## 3. Phạm vi đánh giá

### Trong phạm vi

| Nhóm | Mô tả |
|------|-------|
| API | Mã nguồn `api/` đã merge vào nhánh `master` |
| Web | Mã nguồn `web/` đã merge vào nhánh `master` |
| Docker images | `nguyenson1710/linguaflow-api`, `nguyenson1710/linguaflow-web` (latest, v*) |
| Infrastructure as Code | `docker-compose.yml`, GitHub Actions workflows |
| Live environments | API trên Render và Web trên Vercel với version current |

### Ngoài phạm vi

| Nhóm | Lý do |
|------|-------|
| Mã trong fork hoặc draft branch | Chưa được review và merge |
| DDoS, brute force tốc độ thấp | Đã có rate limit, vui lòng không stress test |
| Báo cáo từ scanner tự động không có PoC | Cần demo khai thác thực tế |
| Vấn đề ở dependency third-party | Báo trực tiếp với upstream, đồng thời thông báo nếu cần bump version |

---

## 4. Thực tiễn bảo mật trong codebase

| Lớp | Biện pháp | File tham khảo |
|-----|-----------|----------------|
| HTTP headers | `helmet()` mặc định: CSP, X-Frame-Options, X-Content-Type-Options, HSTS | [api/src/index.ts](api/src/index.ts) |
| CORS | Whitelist `FRONTEND_URL`, `credentials: true`, không dùng `*` | [api/src/index.ts](api/src/index.ts) |
| Rate limit | 100 req / 15 phút global; 10 req / 15 phút cho `/api/auth/login`, `/api/auth/register` | [api/src/index.ts](api/src/index.ts) |
| Validation | Mọi route nhận body kiểm tra bằng `zod`, lỗi trả 400 với chi tiết | `api/src/routes/*.ts` |
| Auth | JWT 7 ngày, cookie httpOnly + `secure` ở production, bcrypt cost 12 | [api/src/routes/auth.ts](api/src/routes/auth.ts) |
| ORM | Toàn bộ query qua Prisma, không nối chuỗi SQL trực tiếp | [api/prisma/schema.prisma](api/prisma/schema.prisma) |
| Error response | Production trả message generic, không leak stack trace | [api/src/index.ts](api/src/index.ts) |
| Static analysis | CodeQL chạy trên push/PR và schedule hàng tuần | [.github/workflows/codeql.yml](.github/workflows/codeql.yml) |
| Dependency updates | Dependabot weekly cho npm và github-actions | `.github/dependabot.yml` |
| Secrets | `.env` nằm trong `.gitignore`, scan trước khi push | [.gitignore](.gitignore) |
| Logs | Không log password, token, hoặc PII; `morgan('dev')` ở dev | [api/src/index.ts](api/src/index.ts) |

---

## 5. Hardening checklist trước release

| Bước | Mô tả |
|------|-------|
| 1 | `npx audit-ci --moderate` (hoặc `npm audit`) cho cả `api/` và `web/` |
| 2 | Cập nhật dependency theo Dependabot, đảm bảo CI pass |
| 3 | Quét CodeQL trên branch release, fix mọi alert High/Critical |
| 4 | Verify `.env.example` không chứa secret thật |
| 5 | Kiểm tra cookie flag (`httpOnly`, `secure`, `sameSite`) phù hợp môi trường |
| 6 | Confirm rate limit còn hiệu lực (response trả 429 khi vượt) |
| 7 | Review log production để chắc chắn không leak token |

---

## 6. Tài liệu liên quan

- [CONTRIBUTING.md](CONTRIBUTING.md) - quy trình đóng góp và yêu cầu test
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) - chuẩn mực ứng xử
- [.github/workflows/codeql.yml](.github/workflows/codeql.yml) - cấu hình CodeQL
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) - cấu hình triển khai và env vars
