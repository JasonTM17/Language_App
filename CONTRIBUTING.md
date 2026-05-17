# Hướng dẫn đóng góp cho LinguaFlow

Cảm ơn bạn đã quan tâm tới LinguaFlow. Tài liệu này tổng hợp toàn bộ quy trình đóng góp, quy ước commit, chuẩn code và yêu cầu kiểm thử để đảm bảo mỗi pull request được review nhanh và merge an toàn.

Tác giả dự án: **Nguyễn Sơn** (`jasonbmt06@gmail.com`).

---

## 1. Tổng quan quy trình

| Bước | Hành động | Lệnh tham khảo |
|------|-----------|----------------|
| 1 | Fork repository về tài khoản cá nhân | (qua GitHub UI) |
| 2 | Clone fork về máy | `git clone https://github.com/<user>/Language_App.git` |
| 3 | Thêm remote upstream | `git remote add upstream https://github.com/JasonTM17/Language_App.git` |
| 4 | Đồng bộ master mới nhất | `git fetch upstream && git rebase upstream/master` |
| 5 | Tạo branch theo quy ước | `git checkout -b feat/ten-tinh-nang` |
| 6 | Code, viết test, chạy lint, type check | `npm run typecheck && npm test` |
| 7 | Commit theo Conventional Commits | `git commit -m "feat: ..."` |
| 8 | Push lên fork | `git push -u origin feat/ten-tinh-nang` |
| 9 | Mở pull request về `master` | (qua GitHub UI) |
| 10 | Theo dõi CI và phản hồi review | Sửa cho đến khi CI xanh |

---

## 2. Quy ước đặt tên branch

Sử dụng tiền tố ngắn gọn, sau đó là mô tả viết bằng `kebab-case`. Tránh dùng tiếng Việt có dấu trong tên branch.

| Tiền tố | Mục đích | Ví dụ |
|---------|----------|-------|
| `feat/` | Thêm tính năng mới | `feat/quiz-timer` |
| `fix/` | Sửa lỗi | `fix/login-redirect-loop` |
| `docs/` | Cập nhật tài liệu | `docs/api-reference` |
| `style/` | Định dạng code, CSS | `style/dark-mode-tokens` |
| `refactor/` | Tái cấu trúc, không đổi hành vi | `refactor/auth-middleware` |
| `test/` | Thêm hoặc sửa test | `test/vocabulary-srs` |
| `chore/` | Bảo trì, dependencies | `chore/bump-prisma` |
| `perf/` | Tối ưu hiệu năng | `perf/leaderboard-query` |
| `ci/` | Cấu hình CI/CD | `ci/release-workflow` |
| `release/` | Chuẩn bị release | `release/v1.2.0` |

---

## 3. Quy ước commit (Conventional Commits)

Mọi commit phải dùng tiếng Anh, viết ở thì hiện tại (imperative), tóm tắt thay đổi ở dòng đầu trong giới hạn 72 ký tự, mô tả "tại sao" ở phần body khi cần thiết.

| Prefix | Khi dùng | Ví dụ |
|--------|----------|-------|
| `feat` | Tính năng mới cho người dùng | `feat: add daily quest reward popup` |
| `fix` | Sửa lỗi đã có trong production | `fix: prevent crash when streak resets` |
| `docs` | Chỉ thay đổi documentation | `docs: expand API authentication section` |
| `style` | Format, khoảng trắng, dấu chấm phẩy | `style: align tailwind class order` |
| `refactor` | Tái cấu trúc không đổi hành vi | `refactor: extract reward calculator` |
| `test` | Thêm/sửa test, không đổi production code | `test: cover SM-2 edge cases` |
| `chore` | Cập nhật build, công cụ, dependencies | `chore: bump vitest to 1.6` |
| `perf` | Cải thiện hiệu năng | `perf: cache leaderboard query for 60s` |
| `ci` | Thay đổi pipeline CI/CD | `ci: split api and web jobs` |
| `build` | Thay đổi hệ thống build, Dockerfile | `build: enable next standalone output` |
| `revert` | Quay lại commit trước | `revert: feat: add daily quest popup` |

Khi PR có nhiều commit, không cần ép mỗi commit là một dòng tiếng Anh hoàn hảo, nhưng commit cuối khi merge phải tuân theo định dạng trên.

### Footer chuẩn

Không thêm `Co-Authored-By` hay bất kỳ attribution AI nào. Footer chỉ dùng khi cần liên kết issue:

```
fix: prevent crash when streak resets

Closes #142
```

---

## 4. Pull request template

Body của PR phải đủ các mục sau, trình bày bằng tiếng Việt hoặc tiếng Anh nhất quán cho cả PR:

```markdown
## Tóm tắt
- 1-3 gạch đầu dòng nêu thay đổi chính

## Lý do
- Vấn đề đang giải quyết
- Liên kết issue (nếu có)

## Cách kiểm thử
- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run lint`
- [ ] Kiểm tra UI thủ công (nêu rõ trang)

## Ảnh chụp (nếu liên quan UI)
| Trước | Sau |
|-------|-----|
| ![](url) | ![](url) |

## Rủi ro / Lưu ý
- Migration database
- Breaking change API
- Cần cập nhật env vars

## Checklist
- [ ] Tests pass tại local
- [ ] Cập nhật CHANGELOG nếu cần
- [ ] Cập nhật docs nếu cần
```

Tiêu đề PR giới hạn dưới 70 ký tự, theo đúng prefix Conventional Commits.

---

## 5. Code standards

### TypeScript

| Yêu cầu | Mô tả |
|---------|-------|
| Strict mode | Bật `strict: true` ở cả `api/tsconfig.json` và `web/tsconfig.json` |
| `any` | Hạn chế tối đa, ưu tiên `unknown` rồi narrow |
| Tên biến/hàm | `camelCase`, tên component React `PascalCase` |
| File component | `kebab-case.tsx`, một component chính mỗi file |
| Import order | Built-in, third-party, internal aliases, relative |

### Frontend (Next.js + Tailwind)

| Hạng mục | Yêu cầu |
|----------|---------|
| Routing | App Router, server components mặc định, client components có `"use client"` |
| Style | Tailwind utility, không viết CSS module trừ khi đặc biệt |
| State | TanStack Query cho server state, Zustand cho client state |
| Form | `react-hook-form` + `zod` |
| Dark mode | Mọi screen phải test cả light và dark |
| Responsive | Mobile-first, breakpoint 390/768/1280 px |

### Backend (Express + Prisma)

| Hạng mục | Yêu cầu |
|----------|---------|
| Validation | Mọi route nhận body đều dùng Zod schema |
| Auth | Dùng middleware `authenticate`, không tự đọc cookie |
| Error | Trả `{ error, code, details? }`, không leak stack trace |
| Database | Truy cập qua `prisma`, không viết raw SQL trừ trường hợp tối ưu |
| Logging | `morgan` cho HTTP, `console.error` cho lỗi không mong muốn |

### Định dạng và lint

| Lệnh | Tác dụng |
|------|----------|
| `npm run format` | Chạy Prettier toàn repo |
| `npm run format:check` | Kiểm tra Prettier không thay đổi gì |
| `npm run lint` | Chạy ESLint cho `web/` |
| `npm run typecheck` | TypeScript noEmit cho cả `api/` và `web/` |

---

## 6. Yêu cầu kiểm thử

Mỗi PR phải đảm bảo các quality gate sau pass tại local trước khi yêu cầu review.

| Gate | Lệnh | Yêu cầu |
|------|------|---------|
| Type check API | `cd api && npx tsc --noEmit` | Không lỗi |
| Type check Web | `cd web && npx tsc --noEmit` | Không lỗi |
| Lint Web | `cd web && npm run lint` | Không warning |
| Unit + Integration | `cd api && npx vitest run` | Tất cả pass |
| E2E (khi sửa UI) | `cd web && npx playwright test` | Tất cả pass |
| Build Web | `cd web && npm run build` | Build thành công |

### Khi nào phi viết test mới

| Loại thay đổi | Test bắt buộc |
|----------------|---------------|
| Thêm route API | Integration test bằng Vitest + Supertest |
| Sửa logic gamification (XP, streak, hearts) | Unit test cho service tương ứng |
| Sửa SM-2 hoặc thuật toán SRS | Unit test cover các quality 0-5 |
| Thêm trang UI quan trọng | E2E Playwright kiểm tra render và navigation |
| Hot fix production | Test tái hiện lỗi trước khi fix |

### Cấu trúc test API

```
api/src/__tests__/
├── auth.test.ts
├── vocabulary.test.ts
├── quiz.test.ts
└── <route>.test.ts
```

Sử dụng `import app from '../index'` và `supertest` để test, không cần khởi động server thật.

---

## 7. Báo cáo lỗi và đề xuất

| Trường hợp | Kênh | Lưu ý |
|------------|------|-------|
| Lỗi bảo mật | Email `jasonbmt06@gmail.com` | KHÔNG mở public issue |
| Bug thông thường | GitHub Issues | Dùng template `bug_report` |
| Đề xuất tính năng | GitHub Issues | Dùng template `feature_request` |
| Câu hỏi sử dụng | GitHub Discussions | Tag phù hợp |

Khi báo bug, vui lòng kèm: bước tái hiện, kết quả mong đợi, kết quả thực tế, môi trường (OS, browser, Node version) và screenshot nếu liên quan UI.

---

## 8. Giấy phép

Mọi đóng góp được phát hành dưới [MIT License](LICENSE). Khi gửi pull request, bạn xác nhận đã đọc và đồng ý với điều khoản này.
