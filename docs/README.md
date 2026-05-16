# Screenshots & GIF Demos

Tài liệu hình ảnh cho dự án LinguaFlow.

## Screenshots

### Desktop (1280x720)

| File | Mô tả |
|------|--------|
| `screenshots/desktop-dashboard.png` | **Trang chủ** — Hiển thị tiến độ học, streak hàng ngày, XP, và mục tiêu |
| `screenshots/desktop-vocabulary.png` | **Từ vựng** — Danh sách từ với phát âm, ví dụ, và flashcard tương tác |
| `screenshots/desktop-quiz.png` | **Quiz** — Bài kiểm tra trắc nghiệm với timer và điểm XP |
| `screenshots/desktop-dark-mode.png` | **Dark Mode** — Giao diện tối, dễ nhìn ban đêm |
| `screenshots/desktop-vocabulary-detail.png` | **Chi tiết từ** — Phát âm, nghĩa, ví dụ, và ghi chú |
| `screenshots/desktop-profile.png` | **Hồ sơ** — Thống kê cá nhân, thành tích, cấp độ |

### Mobile (390x844)

| File | Mô tả |
|------|--------|
| `screenshots/mobile-dashboard.png` | **Trang chủ mobile** — Responsive layout, bottom navigation |
| `screenshots/mobile-vocabulary.png` | **Từ vựng mobile** — Swipe cards, compact view |
| `screenshots/mobile-quiz.png` | **Quiz mobile** — Touch-friendly buttons, full-screen mode |

## GIF Demos

| File | Mô tả | Thời lượng |
|------|--------|-----------|
| `gifs/demo-full-flow.gif` | **Luồng chính** — Dashboard → Học từ → Quiz → Kết quả | ~15s |
| `gifs/demo-quiz-interaction.gif` | **Quiz tương tác** — Chọn đáp án, animation đúng/sai, XP popup | ~8s |
| `gifs/demo-dark-mode-toggle.gif` | **Toggle Dark Mode** — Chuyển đổi theme mượt mà | ~5s |
| `gifs/demo-vocabulary-flashcard.gif` | **Flashcard** — Lật thẻ, swipe, spaced repetition | ~10s |

## Cách chụp

Chạy Playwright screenshot spec:

```bash
cd web
npx playwright test e2e/screenshots.spec.ts
```

Screenshots sẽ được lưu tự động vào `docs/screenshots/`.

## Quy tắc

1. Mỗi ảnh/GIF **PHẢI** có chú thích tiếng Việt
2. Screenshots phải có data thật (không trống)
3. Desktop: 1280x720, Mobile: 390x844
4. GIF: max 15 giây, loop, chất lượng tốt
5. Chụp lại mỗi khi UI thay đổi đáng kể
