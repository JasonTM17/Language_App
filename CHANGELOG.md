# Changelog

Tài liệu này ghi lại mọi thay đổi đáng chú ý của LinguaFlow.

Định dạng tuân theo [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) và dự án áp dụng [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Chưa có thay đổi chờ phát hành.

## [1.1.0] - 2026-05-17

### Added

| Hạng mục | Mô tả |
|----------|-------|
| PWA | Manifest tiếng Việt, shortcut, favicon SVG, metadataBase chuẩn cho production |
| Sitemap | Dynamic sitemap (`web/src/app/sitemap.ts`) cùng `robots.txt` cập nhật cho SEO |
| Site config | `web/src/lib/site-config.ts` tập trung metadata, từ khóa SEO tiếng Việt |
| Daily quests | Hệ thống nhiệm vụ ngày, 10 quest mẫu, thưởng XP và bonus khi hoàn thành đủ 3 |
| Pronunciation | Trang luyện phát âm với speech recognition, mẹo theo từng ngôn ngữ |
| Word of the Day | Từ vựng nổi bật theo 4 ngôn ngữ, lịch sử 30 ngày |
| Loading page | Global `loading.tsx` với spinner animation đồng bộ design system |
| Glassmorphism UI | Đồng bộ thẻ kính mờ, gradient border, blur cho 57 trang |
| Framer Motion | Entrance animation, stagger transitions trên toàn bộ trang |
| Skill Tree mở rộng | Thêm cấp Elementary cho ja, zh, ko |
| Listening | Mở rộng lên 10 bài mỗi ngôn ngữ, thêm cấp intermediate/advanced |
| Stories | Bổ sung truyện cho ja, zh, ko |
| Sentence Builder | Mở rộng số lượng bài tập trên cả 4 ngôn ngữ |
| API constants | `web/src/lib/api-endpoints.ts` cho tham chiếu route an toàn kiểu |
| Custom hooks | `useDebounce`, `useLocalStorage` |
| Vietnamese helpers | Tiện ích định dạng số, ngày, UI tiếng Việt |
| TypeScript types | Type cho vocabulary, quiz, progress, notifications |

### Changed

| Hạng mục | Mô tả |
|----------|-------|
| Dashboard | Refactor sang glassmorphism, gradient cards, animation |
| Dark mode | Chuẩn hóa contrast ratio, kiểm tra trên mọi page |
| Heading | Thống nhất tiếng Việt cho mọi `h1`/`h2` toàn ứng dụng |
| ESLint | Bổ sung config riêng, sửa lỗi const, ưu tiên auto-fix |
| Lucide icons | Thay emoji bằng `lucide-react` ở 20+ trang để nhất quán |

### Fixed

| Hạng mục | Mô tả |
|----------|-------|
| Quests API | Sửa middleware auth, dùng `req.userId` thay cho `req.user.id` |
| Playwright | Hỗ trợ `BASE_URL` env để chạy trên môi trường staging |
| CI database | Dùng `prisma db push` thay `migrate deploy` cho SQLite ổn định |
| Robots/Sitemap | Đồng bộ URL chính xác cho domain Vercel |
| Metadata base | Thiết lập `metadataBase` để PWA và share preview hoạt động |

### Security

| Hạng mục | Mô tả |
|----------|-------|
| ESLint | Bổ sung quy tắc bắt const-prefer, tránh let dư thừa |
| CodeQL | Tiếp tục quét hàng tuần, không phát sinh alert mới |

## [1.0.0] - 2026-05-16

### Added

| Hạng mục | Mô tả |
|----------|-------|
| Core platform | Full-stack Next.js 14 + Express + Prisma + SQLite |
| Đa ngôn ngữ | Hỗ trợ học Tiếng Anh, Nhật, Trung, Hàn |
| Auth | JWT 7 ngày, cookie httpOnly, bcrypt 12 rounds |
| AI Tutor | Provider chain n8n > OpenAI > mock fallback, 7 vai chat |
| Vocabulary | Spaced repetition theo SM-2 (ease factor, interval, quality) |
| Skill Tree | Lộ trình học theo cây, mở khóa theo XP và bài học hoàn thành |
| Quiz | 38 endpoint cover quiz, listening, speaking, reading, writing |
| Gamification | XP, level, streak, hearts, gems, leaderboard, achievements |
| Stories | Truyện song ngữ, segment dialogue, câu hỏi cài trong câu chuyện |
| Daily challenge | 14 challenge mẫu, streak multiplier, weekly challenge |
| Shop | 6 item: heart refill, streak freeze, double XP, unlimited hearts, hint pack, skip review |
| Friends | Gửi/nhận lời mời, danh sách bạn, xếp hạng bạn bè |
| Listening | Bài nghe theo cấp độ và 4 loại tương tác |
| Speaking | Bài nói với scoring criteria, role play, repeat, describe |
| Pronunciation | Speech recognition + mẹo theo ngôn ngữ |
| Sentence Builder | Sắp xếp từ thành câu với ghi chú ngữ pháp |
| Grammar Tips | Mẹo ngữ pháp tổng hợp cho 4 ngôn ngữ |
| Notifications | Thông báo achievement, streak, reminder, content mới |
| Search | Tìm kiếm tổng hợp từ vựng, bài học, nội dung |
| Bookmarks | Đánh dấu từ vựng yêu thích |
| Analytics | Tổng quan, theo ngôn ngữ, hoạt động 30 ngày |
| Onboarding | Placement test 4 cấp, lựa chọn ngôn ngữ, motivation |
| Dark mode | next-themes với toggle thủ công và auto theo OS |
| Responsive | Mobile, tablet, desktop với layout tối ưu |
| Docker | Multi-stage Dockerfile cho api và web, docker-compose.yml |
| CI/CD | GitHub Actions: ci.yml, codeql.yml, release.yml |
| Tests | 16 test suite, hơn 129 tests cho API |

### Security

| Hạng mục | Mô tả |
|----------|-------|
| Helmet | Security headers mặc định |
| CORS | Whitelist `FRONTEND_URL`, credentials true |
| Rate limit | 100 req/15 phút global, 10 req/15 phút cho `/auth/login` và `/auth/register` |
| Validation | Zod schemas cho mọi route nhận body |
| Bcrypt | Hash mật khẩu cost 12 |
| JWT | Access token 7 ngày, cookie httpOnly + secure ở production |
| CodeQL | Quét javascript-typescript hàng tuần |
| Dependabot | Cập nhật npm + github-actions hàng tuần |

[Unreleased]: https://github.com/JasonTM17/Language_App/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/JasonTM17/Language_App/releases/tag/v1.1.0
[1.0.0]: https://github.com/JasonTM17/Language_App/releases/tag/v1.0.0
