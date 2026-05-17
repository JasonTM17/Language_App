# Changelog

Tài liệu này ghi lại mọi thay đổi đáng chú ý của LinguaFlow.

Định dạng tuân theo [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) và dự án áp dụng [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
| Hạng mục | Mô tả |
|----------|-------|
| Logo system | 5 SVG mới (favicon, icon-192, icon-512, logo-mark, logo-wordmark) với speech bubble + L-wave + 4 language badges (A/あ/中/한) |
| GIF demos | 4 demo GIFs trong `docs/gifs/` (full-flow, quiz-interaction, dark-toggle, vocabulary-flashcard) record bằng Playwright + ffmpeg |
| EmptyState component | Reusable `web/src/components/ui/empty-state.tsx` với CTA buttons cho vocabulary/weak-words/flashcards/bookmarks |
| Auth-guard hydration fix | `hasHydrated` flag trong Zustand persist + onRehydrateStorage callback |
| UI audit script | `web/scripts/audit-ui.ts` quét 50 pages × 2 viewports với severity P0/P1/P2 |
| Screenshots script | `web/scripts/take-screenshots.ts` với addInitScript inject auth state |
| GIF recording script | `web/scripts/record-gifs.ts` với palettegen 2-pass cho chất lượng cao |
| docs/REVIEW_EVIDENCE.md | Reviewer evidence pack (251 dòng) — verifiable links cho mọi production claim |
| docs/HONEST_SCOPE.md | Đây là gì / không phải gì, trade-offs, limitations (162 dòng) |
| docs/container-images.md | Docker images, tags, env vars, healthchecks, security verify (297 dòng) |
| docs/ARCHITECTURE.md | System architecture với mermaid diagrams (320 dòng) |
| docs/UI_GUIDELINES.md | Design tokens, components, dark mode, a11y, responsive (303 dòng) |
| docs/DEPLOYMENT.md | Vercel + Render + Docker + CI/CD setup (322 dòng) |
| docs/TESTING.md | Test strategy, 16 test suites, Vitest + Playwright (257 dòng) |
| docs/RELEASE_NOTES_v1.1.0.md | Public-facing release notes (158 dòng) |
| docs/UI_AUDIT_REPORT.md | UI audit report — P0=0, P1=0, P2=0 |
| docs/README.en.md | English README với bilingual switcher |
| GHCR registry | Push images lên `ghcr.io/jasontm17/linguaflow-{api,web}` (public) qua workflow CD |
| OCI labels | Docker images có `org.opencontainers.image.source/description/licenses` |
| .prettierignore | Bỏ qua node_modules, screenshots, gifs, SVGs khỏi format |

### Changed
| Hạng mục | Mô tả |
|----------|-------|
| Sidebar | Group 47 nav items thành 5 sections (Tổng quan, Học tập, Luyện tập, Gamification, Xã hội) với overflow-y-auto, mobile drawer auto-close |
| Activity chart | Empty days hiển thị soft gray bars thay vì để trống |
| Docker Hub namespace | Đổi từ `jasontm17/...` → `nguyenson1710/linguaflow-{api,web}` (đúng namespace) |
| package.json version | Sync root từ 1.0.0 → 1.1.0 (đồng bộ với api/web) |
| GitHub About | Tiếng Việt CÓ DẤU đầy đủ (trước là "Nen tang hoc ngon ngu" không dấu) |
| README | Thêm reviewer brief table, demo GIFs section, doc index, bilingual switcher EN/VI, logo-mark.svg |
| Vitest | Upgrade lên latest (4.x) — fix 4 moderate CVEs từ vite-node transitive |
| vitest.config.ts | Include `src/**/*.test.ts` only, exclude `dist/**` (vitest 4 auto-discovers built tests) |
| release.yml CI | Test job thêm DB setup + env vars (DATABASE_URL, JWT_SECRET, NODE_ENV, PORT) |

### Fixed
| Hạng mục | Mô tả |
|----------|-------|
| Dashboard NaN% bug | Daily goal progress hiển thị "NaN%" khi target=0 — thêm `safeRatio` guard |
| Activity chart empty days | Render đủ 7 days với value=0 thay vì gap |
| 30+ division/percentage NaN renders | 25 files với pattern `den > 0 ? Math.min((num/den)*100, 100) : 0` |
| /vocabulary syntax error | Fix regex Unicode codepoint với explicit comments |
| /achievements undefined.map crash | `Array.isArray(data?.achievements) ? data.achievements : []` guard |
| /streak-calendar hydration mismatch | useState(null) + useEffect cho `Math.random()` và `new Date()` |
| Auth-guard race condition | `hasHydrated` flag — fix 16 P1 auth-redirect flashes trên 8 protected pages |
| Token rotation | Verified API service đúng (no refresh-token endpoint, current behavior correct) |
| Git history | Drop stash chứa 5 dangling commits "LinguaFlow Team" + GC để clean |

### Security
| Hạng mục | Mô tả |
|----------|-------|
| API CVEs | 0 (was 4 moderate trong vitest dev-deps) |
| Web CVEs | postcss transitive trong Next.js 14 — documented trong SECURITY.md, sẽ fix khi upgrade Next.js 16 (v2.0.0) |
| MCP GitHub server | Setup với PAT scopes `project, repo, workflow, write:packages` cho automated GHCR/issues/releases management |
| GitHub Actions secrets | DOCKERHUB_USERNAME + DOCKERHUB_TOKEN configured |
| Live deploy headers | Web có HSTS, X-Frame DENY, X-Content-Type, Referrer, Permissions-Policy; API có HSTS + X-Frame + X-Content-Type |
| 7-step security audit | All passed: secrets clean (0 findings), git history clean, .env protected, deps OK, headers configured, CORS whitelist, no hardcoded tokens |

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
