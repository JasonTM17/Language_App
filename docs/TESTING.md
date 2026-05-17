# Testing Guide

LinguaFlow áp dụng test pyramid 3 tầng để đảm bảo chất lượng từ unit nhỏ nhất đến luồng người dùng đầu cuối.

```
       /\
      /E2E\         Playwright (luồng UI thật)
     /-----\
    /Integ. \      Vitest + Supertest (API + Prisma)
   /---------\
  /   Unit    \    Vitest (services, helpers)
 -------------
```

| Tầng | Tool | Tốc độ | Số lượng |
|------|------|--------|----------|
| Unit | Vitest | rất nhanh (ms) | tăng dần theo features |
| Integration | Vitest + Supertest + Prisma SQLite | nhanh (s) | 16 test suite cho 38 endpoint |
| E2E | Playwright | trung bình (10-30s/scenario) | luồng chính |

---

## 1. Test suite hiện có

Tất cả integration test API nằm tại [api/src/__tests__/](../api/src/__tests__/). Mỗi suite cover một router.

| File | Endpoint cover | Trọng tâm |
|------|----------------|-----------|
| [auth.test.ts](../api/src/__tests__/auth.test.ts) | `/auth/register`, `/auth/login` | Đăng ký, đăng nhập, mật khẩu sai, email trùng |
| [languages.test.ts](../api/src/__tests__/languages.test.ts) | `/languages`, `/languages/:code` | List, chi tiết, enroll |
| [lessons.test.ts](../api/src/__tests__/lessons.test.ts) | `/lessons`, `/lessons/:id`, `/lessons/:id/complete` | Lọc theo language/level, hoàn thành, XP |
| [vocabulary.test.ts](../api/src/__tests__/vocabulary.test.ts) | `/vocabulary`, `/vocabulary/:id/review` | Pagination, SM-2 update |
| [quiz.test.ts](../api/src/__tests__/quiz.test.ts) | `/quiz/lesson/:id`, `/quiz/practice`, `/quiz/:id/attempt` | Đáp án đúng/sai, XP cộng |
| [progress.test.ts](../api/src/__tests__/progress.test.ts) | `/progress/dashboard`, `/progress/streak` | Tổng hợp stats, streak reset |
| [achievements.test.ts](../api/src/__tests__/achievements.test.ts) | `/achievements`, `/achievements/me`, `/achievements/check` | Trao thành tựu, list |
| [skill-tree.test.ts](../api/src/__tests__/skill-tree.test.ts) | `/skill-tree/:lang`, `/skill-tree/:lang/recommendations` | Status, decay, recommendations |
| [stories.test.ts](../api/src/__tests__/stories.test.ts) | `/stories`, `/stories/:id`, `/stories/:id/complete` | Filter, accuracy XP |
| [listening.test.ts](../api/src/__tests__/listening.test.ts) | `/listening`, `/listening/submit` | Submit đúng/sai |
| [speaking.test.ts](../api/src/__tests__/speaking.test.ts) | `/speaking`, `/speaking/submit` | Audio score, feedback |
| [chat.test.ts](../api/src/__tests__/chat.test.ts) | `/chat/start`, `/chat/:id/message` | Provider chain mock |
| [daily-challenge.test.ts](../api/src/__tests__/daily-challenge.test.ts) | `/daily-challenge/today`, `/daily-challenge/claim` | Streak multiplier, claim |
| [shop.test.ts](../api/src/__tests__/shop.test.ts) | `/shop`, `/shop/purchase` | Đủ/thiếu gems, side-effect heart refill |
| [friends.test.ts](../api/src/__tests__/friends.test.ts) | `/friends/*` | Add/accept/reject/delete/search |
| [notifications.test.ts](../api/src/__tests__/notifications.test.ts) | `/notifications`, `/notifications/:id/read`, `/notifications/read-all` | Pagination, unreadCount |

Tổng cộng: **16 test suite**, hơn 129 test case theo lần chạy CI gần nhất.

---

## 2. Lệnh chạy

| Lệnh | Áp dụng | Ghi chú |
|------|---------|---------|
| `cd api && npx vitest run` | Toàn bộ test API | Chạy 1 lần, không watch |
| `cd api && npx vitest` | Watch mode | Re-run khi sửa file |
| `cd api && npx vitest run --coverage` | Có coverage report | Cần plugin `@vitest/coverage-v8` |
| `cd api && npx vitest run __tests__/auth.test.ts` | Một file cụ thể | Tăng tốc khi debug |
| `cd web && npx playwright test` | Toàn bộ E2E | Cần build hoặc dev server |
| `cd web && npx playwright test --headed` | Mở trình duyệt | Debug visual |
| `cd web && npx playwright test screenshots.spec.ts` | Chụp ảnh tài liệu | Lưu vào `docs/screenshots/` |
| `cd web && npx playwright test record-gif.spec.ts` | Quay GIF | Cần ffmpeg ngoài |
| `npm run typecheck` | TypeScript noEmit cho cả 2 dự án | Bắt buộc trước khi push |
| `npm run lint` | ESLint web | Bắt buộc trước khi push |

---

## 3. Viết test API mới (Vitest)

### 3.1 Quy ước tên file

| Loại | Vị trí | Tên |
|------|--------|-----|
| Integration route | `api/src/__tests__/` | `<route>.test.ts` |
| Unit service | `api/src/__tests__/` hoặc cạnh service | `<service>.unit.test.ts` |
| Helper/utils | `api/src/__tests__/` | `<utility>.test.ts` |

### 3.2 Mẫu test

```ts
import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('GET /api/skill-tree/:lang', () => {
  let token: string;

  beforeAll(async () => {
    const reg = await request(app)
      .post('/api/auth/register')
      .send({ email: `tree_${Date.now()}@test.com`, password: 'pass1234', name: 'Tester' });
    token = reg.body.token;
  });

  it('returns the beginner tree by default', async () => {
    const res = await request(app)
      .get('/api/skill-tree/en')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.tree.length).toBeGreaterThan(0);
    expect(res.body.progress.percentage).toBeGreaterThanOrEqual(0);
  });

  it('rejects unknown language', async () => {
    const res = await request(app)
      .get('/api/skill-tree/xx')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body.code).toBe('NOT_FOUND');
  });
});
```

### 3.3 Quy tắc

| Quy tắc | Ghi chú |
|---------|---------|
| Không chia sẻ data giữa các suite | Tạo user mới hoặc reset DB ở `beforeAll` |
| Dùng email random | `test_${Date.now()}@example.com` để tránh collision |
| Không mock Prisma (trừ unit test) | Test thật trên SQLite tạm |
| Cover happy path + ít nhất 1 lỗi | 400 (validation), 401 (auth), 404 (not found), 500 (server) |
| Đọc test cũ trước | Để theo cùng pattern, tránh tự chế cấu trúc khác |

---

## 4. Viết test E2E mới (Playwright)

### 4.1 Cấu trúc thư mục

```
web/e2e/
├── app.spec.ts           # Smoke test trang chính
├── screenshots.spec.ts   # Tự động chụp tài liệu
└── record-gif.spec.ts    # Quay GIF demo
```

### 4.2 Mẫu test

```ts
import { test, expect } from '@playwright/test';

const BASE = process.env.BASE_URL || 'http://localhost:3000';

test('Trang dashboard hiển thị đầy đủ thông tin', async ({ page }) => {
  await page.goto(`${BASE}/login`);
  await page.fill('input[name=email]', 'user@linguaflow.app');
  await page.fill('input[name=password]', 'user123');
  await page.click('button[type=submit]');

  await page.waitForURL(/dashboard/);
  await expect(page.getByRole('heading', { name: /Bảng điều khiển|Dashboard/i })).toBeVisible();
  await expect(page.getByText(/XP/)).toBeVisible();
  await expect(page.getByText(/Streak/i)).toBeVisible();
});
```

### 4.3 Cấu hình BASE_URL

`web/playwright.config.ts` đã hỗ trợ env `BASE_URL`. Khi chạy trên staging:

```bash
BASE_URL=https://staging.linguaflow.app npx playwright test
```

### 4.4 Responsive testing

```ts
const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 720 },
];

for (const vp of viewports) {
  test(`/vocabulary - ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/vocabulary');
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(vp.width);
  });
}
```

---

## 5. CI workflow chạy test

[.github/workflows/ci.yml](../.github/workflows/ci.yml) chạy 2 job song song:

| Job | Bước chính | Mục tiêu |
|-----|------------|----------|
| `api` | `npm ci` -> `prisma db push --force-reset` -> seed -> `tsc --noEmit` -> `vitest run` | Pass cả 16 test suite |
| `web` | `npm ci` -> `tsc --noEmit` -> `npm run build` | Build Next.js không lỗi |

PR chỉ được merge khi cả 2 job xanh. Nếu CI fail vì lỗi flaky, vui lòng tái hiện local trước khi rerun để tránh che giấu bug.

---

## 6. Coverage và chất lượng

| Mục tiêu | Ngưỡng | Cách kiểm |
|----------|--------|-----------|
| Branch coverage API | >= 70% | `npx vitest run --coverage` |
| Endpoint cover integration | 100% | Mỗi route có ít nhất 1 happy path test |
| Validation cover | Mỗi schema có 1 case lỗi | Negative test trong cùng suite |
| Auth cover | 401 cho mọi endpoint cần token | Test gọi không kèm header |
| Performance | p95 < 500ms ở môi trường dev | Đo trong test có timer |

Coverage report nằm trong `api/coverage/` (đã ignore). Có thể upload lên Codecov nếu cần (chưa bật).

---

## 7. Test data isolation

| Cách tiếp cận | Áp dụng | Ưu điểm |
|---------------|---------|---------|
| Tạo user mới mỗi suite | Mặc định | Đơn giản, tránh phụ thuộc |
| `beforeEach` reset DB | Khi cần state cụ thể | Loại bỏ leak giữa case |
| Dùng transaction rollback | Chưa áp dụng (Prisma SQLite limit) | (cân nhắc khi chuyển PostgreSQL) |
| Seed dữ liệu cố định | Trong CI sau `db push` | Cung cấp content (lessons, vocab) |

Lưu ý: tránh delete user khác trong test, vì có thể ảnh hưởng test chạy parallel.

---

## 8. Khi nào cần test mới

| Tình huống | Test bắt buộc |
|------------|---------------|
| Thêm route API mới | Integration test cho route đó |
| Sửa logic SM-2 hoặc XP/Streak | Unit test các nhánh quality 0-5, streak 0/+1/reset |
| Thêm achievement | Test `checkAndAwardAchievements` cho điều kiện mới |
| Thêm trang UI flow chính | E2E test happy path |
| Hot fix production | Test tái hiện bug trước khi fix |
| Thay đổi validation | Test cả input hợp lệ và không hợp lệ |
| Sửa rate limit | Test 429 sau N request |

---

## 9. Quy trình QA trước release

```
□ npm run typecheck (api + web)
□ cd api && npx vitest run
□ cd web && npx playwright test
□ cd web && npm run lint
□ cd web && npm run build
□ Verify dark mode trên các page chính
□ Test responsive 390/768/1280 px
□ Test rate limit /auth/login (429 sau 10 lần)
□ Test fallback API: tắt API, web vẫn render skeleton + thông báo
□ Smoke test image Docker mới (docker compose up)
□ Verify URL deploy: API health, Web load data
□ Cập nhật CHANGELOG.md
□ Tag release v1.x.x
```
