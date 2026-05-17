# LinguaFlow v1.1.0 - Release Notes

Phát hành ngày **2026-05-17**.

LinguaFlow 1.1.0 là bản phát hành tập trung vào trải nghiệm thị giác (glassmorphism, animation Framer Motion), mở rộng nội dung học cho cả 4 ngôn ngữ và bổ sung hạ tầng SEO/PWA. Phiên bản này được khuyến nghị cho mọi người dùng đang chạy 1.0.x.

| Mục | Giá trị |
|-----|---------|
| Tag | [`v1.1.0`](https://github.com/JasonTM17/Language_App/releases/tag/v1.1.0) |
| So với bản trước | [v1.0.0...v1.1.0](https://github.com/JasonTM17/Language_App/compare/v1.0.0...v1.1.0) |
| Web (Vercel) | https://web-vert-phi-72.vercel.app |
| API (Render) | https://linguaflow-api-ujjo.onrender.com |
| Docker images | `nguyenson1710/linguaflow-api:v1.1.0`, `nguyenson1710/linguaflow-web:v1.1.0` |

---

## 1. Tóm tắt

LinguaFlow 1.1.0 mang tới giao diện đồng nhất với hiệu ứng kính mờ (glassmorphism), hệ thống nhiệm vụ ngày (Daily Quests), trang luyện phát âm với speech recognition, mở rộng nội dung học cho tiếng Nhật, Trung, Hàn, đồng thời siết lại hạ tầng cho SEO và PWA. Bản phát hành cũng giải quyết một số bug quan trọng ở quests API, CI và đồng bộ tiếng Việt cho heading toàn ứng dụng.

---

## 2. Tính năng mới

| Tính năng | Mô tả | Đường dẫn |
|-----------|-------|-----------|
| Glassmorphism UI | Đồng bộ thẻ kính mờ, gradient border, blur backdrop trên 57 trang | `web/src/app/**/*` |
| Framer Motion animations | Entrance + stagger transitions cho mọi trang chính | `web/src/components` |
| Daily Quests | 3 quest random theo ngày + bonus 30 XP khi hoàn thành cả 3 | [api/src/routes/quests.ts](../api/src/routes/quests.ts) |
| Pronunciation practice | Speech recognition + mẹo theo từng ngôn ngữ | [api/src/routes/pronunciation.ts](../api/src/routes/pronunciation.ts) |
| Word of the Day | Từ vựng nổi bật theo 4 ngôn ngữ, lịch sử 30 ngày | [api/src/routes/word-of-day.ts](../api/src/routes/word-of-day.ts) |
| PWA hoàn thiện | Manifest tiếng Việt, shortcut, favicon SVG, metadataBase chuẩn | `web/public/manifest.json` |
| Dynamic sitemap | `web/src/app/sitemap.ts` + `robots.txt` cập nhật | `web/src/app/sitemap.ts` |
| Site config | Tập trung metadata, từ khóa SEO tiếng Việt | `web/src/lib/site-config.ts` |
| Loading page | Spinner toàn cục đồng bộ design system | `web/src/app/loading.tsx` |
| Skill Tree mở rộng | Thêm cấp Elementary cho ja, zh, ko | [api/src/routes/skill-tree.ts](../api/src/routes/skill-tree.ts) |
| Listening +25 bài | Tổng 10 bài/ngôn ngữ, có cấp intermediate/advanced | [api/src/routes/listening.ts](../api/src/routes/listening.ts) |
| Stories ja/zh/ko | Bổ sung truyện song ngữ cho 3 ngôn ngữ Á | [api/src/routes/stories.ts](../api/src/routes/stories.ts) |
| Sentence Builder | Mở rộng số lượng bài tập trên cả 4 ngôn ngữ | [api/src/routes/sentence-builder.ts](../api/src/routes/sentence-builder.ts) |

---

## 3. Cải thiện

| Hạng mục | Mô tả |
|----------|-------|
| Dashboard | Refactor sang glassmorphism, gradient cards, animation entrance |
| Dark mode | Chuẩn hóa contrast ratio cho mọi page, đáp ứng WCAG AA |
| Heading | Thống nhất tiếng Việt cho mọi `h1`/`h2` toàn ứng dụng |
| Lucide icons | Thay emoji bằng `lucide-react` ở 20+ trang để nhất quán visual |
| API endpoint constants | Type-safe tham chiếu route cho frontend (`web/src/lib/api-endpoints.ts`) |
| Custom hooks | `useDebounce`, `useLocalStorage` |
| Vietnamese helpers | Định dạng số, ngày, UI tiếng Việt (`web/src/lib/vi-utils.ts`) |
| TypeScript types | Type cho vocabulary, quiz, progress, notifications |
| ESLint | Thêm config riêng, sửa lỗi const-prefer, format đồng nhất |

---

## 4. Bug fixes

| Bug | Hậu quả trước | Phiên bản này |
|-----|---------------|---------------|
| Quests API | 500 do `req.user.id` (auth middleware không cung cấp) | Dùng `req.userId`, route trả 200 đúng |
| Playwright config | Chỉ chạy trên localhost | Hỗ trợ env `BASE_URL` cho staging |
| CI database | `migrate deploy` thỉnh thoảng fail trên SQLite | Dùng `prisma db push --force-reset` ổn định |
| Robots/Sitemap | URL không khớp domain Vercel | Đồng bộ qua `NEXT_PUBLIC_SITE_URL` |
| Metadata base | Cảnh báo "metadataBase missing" | Set `metadataBase` qua site-config |
| Vietnamese heading | Một số trang vẫn còn tiếng Anh | Đã chuẩn hóa toàn bộ |
| Const-prefer ESLint | Một số `let` không cần thiết | Auto-fix toàn dự án |

---

## 5. Bảo mật

| Hạng mục | Mô tả |
|----------|-------|
| CodeQL | Tiếp tục quét hàng tuần, không phát sinh alert mới |
| Dependabot | Cập nhật dependencies, chưa có lỗ hổng nghiêm trọng nào |
| Helmet, CORS, Rate limit | Không thay đổi cấu hình, vẫn bảo vệ mọi endpoint |
| Validation | Thêm Zod schema cho các route mới (quests, pronunciation, word-of-day) |

---

## 6. Hướng dẫn nâng cấp

### 6.1 Chạy local từ source

```bash
git fetch --tags
git checkout v1.1.0

# API
cd api
npm ci
npx prisma generate
npx prisma db push
npx tsx src/database/seeds/index.ts
npm run dev

# Web (terminal khác)
cd web
npm ci
npm run dev
```

### 6.2 Docker

```bash
docker pull nguyenson1710/linguaflow-api:v1.1.0
docker pull nguyenson1710/linguaflow-web:v1.1.0
docker compose up -d
```

### 6.3 Production (Render + Vercel)

| Bước | Hành động |
|------|-----------|
| 1 | Push tag `v1.1.0` (release workflow tự build Docker images) |
| 2 | Render auto-deploy từ branch `master` |
| 3 | Vercel auto-deploy frontend |
| 4 | Verify `/api/health`, `/api/ready`, dashboard load đầy đủ |

---

## 7. Migration notes

| Mục | Cần làm? | Mô tả |
|-----|:--------:|-------|
| Database schema | Không | Không thay đổi schema giữa 1.0.0 và 1.1.0; chỉ cần `prisma db push` (idempotent) |
| Env vars Web | Có | Bổ sung `NEXT_PUBLIC_SITE_URL` để metadataBase và sitemap chính xác |
| Env vars API | Không | Giữ nguyên các biến đã có |
| Cookies | Không | JWT secret và TTL không đổi |
| Breaking change | Không | Toàn bộ thay đổi backward compatible |

> Người dùng chạy 1.0.x có thể nâng cấp trực tiếp lên 1.1.0 mà không cần migration thủ công. Sau khi triển khai, khuyến nghị clear cache browser/PWA để nhận giao diện mới.

---

## 8. Cảm ơn

Cảm ơn mọi người đã trải nghiệm LinguaFlow và gửi feedback. Mọi góp ý, báo lỗi xin gửi về:

- Email: `jasonbmt06@gmail.com`
- GitHub Issues: https://github.com/JasonTM17/Language_App/issues
- GitHub Discussions: https://github.com/JasonTM17/Language_App/discussions

Tác giả: **Nguyễn Sơn**

---

## 9. Liên kết liên quan

- [CHANGELOG.md](../CHANGELOG.md)
- [API Reference](api.md)
- [Architecture](ARCHITECTURE.md)
- [UI Guidelines](UI_GUIDELINES.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Testing Guide](TESTING.md)
