# UI Guidelines

Tài liệu mô tả hệ thống thiết kế của LinguaFlow, bao gồm design tokens, mẫu component, dark mode, accessibility, responsive và animation. Áp dụng cho mọi page mới và mọi PR thay đổi UI.

---

## 1. Nguyên tắc nền tảng

| Nguyên tắc | Ý nghĩa |
|------------|---------|
| Mobile-first | Layout viết trước cho 390px, sau đó scale lên tablet/desktop |
| Progressive disclosure | Hiển thị thông tin chính trước, chi tiết qua collapsible |
| Show, don't tell | Dùng visual feedback (XP popup, streak flame) thay vì chỉ text |
| Bilingual | Heading + label tiếng Việt, kèm tiếng nước ngoài khi học ngôn ngữ |
| Consistent | Một component pattern - dùng xuyên suốt, hạn chế biến thể |
| Accessibility | Mọi tương tác đều keyboard-friendly và đạt WCAG AA contrast |

---

## 2. Design tokens

### 2.1 Bảng màu

LinguaFlow dùng Tailwind 3 với các token màu mở rộng. Tham chiếu cụ thể trong `web/tailwind.config.ts`.

| Token | Light | Dark | Sử dụng |
|-------|-------|------|---------|
| `primary` | `#6366F1` (indigo-500) | `#818CF8` (indigo-400) | Action chính, brand |
| `primary-foreground` | `#FFFFFF` | `#FFFFFF` | Text trên background primary |
| `secondary` | `#F472B6` (pink-400) | `#F9A8D4` (pink-300) | Action phụ, highlight cảm xúc |
| `accent` | `#22D3EE` (cyan-400) | `#67E8F9` (cyan-300) | Streak, gem, focus |
| `success` | `#10B981` (emerald-500) | `#34D399` (emerald-400) | Quiz đúng, completion |
| `warning` | `#F59E0B` (amber-500) | `#FBBF24` (amber-400) | Hết hearts, sắp hết streak |
| `danger` | `#EF4444` (red-500) | `#F87171` (red-400) | Error, lose heart |
| `surface` | `#FFFFFF` | `#0F172A` (slate-900) | Card, modal, input |
| `surface-muted` | `#F8FAFC` (slate-50) | `#1E293B` (slate-800) | Section background |
| `border` | `#E2E8F0` (slate-200) | `#334155` (slate-700) | Đường viền nhẹ |
| `text-primary` | `#0F172A` | `#F1F5F9` | Body text |
| `text-muted` | `#64748B` (slate-500) | `#94A3B8` (slate-400) | Helper, caption |

### 2.2 Typography

| Cấp | Font family | Weight | Size desktop | Size mobile | Line-height |
|-----|-------------|--------|--------------|-------------|-------------|
| `display` | Plus Jakarta Sans | 800 | 48px | 36px | 1.1 |
| `h1` | Plus Jakarta Sans | 700 | 36px | 28px | 1.2 |
| `h2` | Plus Jakarta Sans | 700 | 28px | 22px | 1.3 |
| `h3` | Inter | 600 | 22px | 18px | 1.35 |
| `body` | Inter | 400 | 16px | 16px | 1.6 |
| `body-sm` | Inter | 400 | 14px | 14px | 1.55 |
| `caption` | Inter | 500 | 12px | 12px | 1.5 |
| `code` | JetBrains Mono | 500 | 14px | 13px | 1.55 |

Quy tắc:
- Heading luôn dùng `Plus Jakarta Sans` để tạo sự tương phản với body.
- Tiếng Việt cần kerning thoải mái: dùng `tracking-tight` chỉ cho display.
- Không vượt quá 4 cấp heading trên 1 page.

### 2.3 Spacing

| Token | px | Sử dụng |
|-------|----|---------|
| `space-1` | 4 | Gap giữa icon và text |
| `space-2` | 8 | Padding nhỏ |
| `space-3` | 12 | Padding trung bình |
| `space-4` | 16 | Card padding mặc định |
| `space-6` | 24 | Section spacing |
| `space-8` | 32 | Layout vertical |
| `space-12` | 48 | Section divider lớn |
| `space-16` | 64 | Hero padding |

### 2.4 Border radius

| Token | px | Áp dụng |
|-------|----|---------|
| `rounded-sm` | 4 | Tag, badge nhỏ |
| `rounded-md` | 8 | Input, button |
| `rounded-lg` | 12 | Card, modal |
| `rounded-xl` | 16 | Hero card, glassmorphism |
| `rounded-2xl` | 24 | Feature card lớn |
| `rounded-full` | 9999 | Avatar, pill |

### 2.5 Shadow & Glassmorphism

| Token | Giá trị |
|-------|---------|
| `shadow-sm` | `0 1px 2px rgba(15,23,42,0.08)` |
| `shadow-md` | `0 4px 12px rgba(15,23,42,0.10)` |
| `shadow-lg` | `0 12px 32px rgba(15,23,42,0.12)` |
| `glass` | `backdrop-blur-md bg-white/60 dark:bg-slate-900/40 border border-white/30` |
| `glass-strong` | `backdrop-blur-xl bg-white/80 dark:bg-slate-900/60 border border-white/40` |

---

## 3. Component patterns (shadcn/ui)

### 3.1 Button

| Variant | Use case | Class hint |
|---------|----------|------------|
| `default` | Action chính trên page | `bg-primary text-primary-foreground hover:bg-primary/90` |
| `secondary` | Action phụ | `bg-secondary text-secondary-foreground` |
| `outline` | Action ngang hàng | `border border-border bg-transparent` |
| `ghost` | Action trong toolbar | `hover:bg-muted` |
| `destructive` | Xóa, hủy | `bg-danger text-white` |
| `link` | Inline action | `text-primary underline-offset-4` |

| Size | Padding | Font |
|------|---------|------|
| `sm` | `h-8 px-3` | 14px |
| `md` (default) | `h-10 px-4` | 14px |
| `lg` | `h-12 px-6` | 16px |
| `icon` | `size-10` | - |

Quy tắc:
- Mỗi card chỉ có một button `default`.
- Disabled state phải có `opacity-50 cursor-not-allowed`.
- Loading state dùng `<Loader2 className="animate-spin" />` từ `lucide-react`.

### 3.2 Card

```tsx
<Card className="rounded-xl border bg-card shadow-md">
  <CardHeader>
    <CardTitle>Tên thẻ</CardTitle>
    <CardDescription>Mô tả ngắn</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>
```

| Biến thể | Khi dùng |
|----------|----------|
| Card mặc định | List item, dashboard widget |
| Glass card | Hero, landing, banner |
| Stat card | Hiển thị số (XP, streak), kèm icon `lucide-react` |
| Skill card | Trong skill tree, có status badge |

### 3.3 Input + Form

| Element | Token |
|---------|-------|
| Label | `text-sm font-medium text-text-primary` |
| Input | `h-10 rounded-md border bg-surface px-3 text-sm` |
| Helper | `text-xs text-muted-foreground` |
| Error | `text-xs text-danger flex items-center gap-1` |
| Focus | `ring-2 ring-primary/40 ring-offset-2` |

Validation theo `react-hook-form` + `zod`. Hiển thị lỗi ngay dưới input, không alert popup.

### 3.4 Badge / Tag

| Variant | Khi dùng |
|---------|----------|
| `default` | Trạng thái trung lập (Beginner, A1) |
| `success` | Mastered, Completed |
| `warning` | Decay, Streak warning |
| `danger` | Lost, Failed |
| `outline` | Filter chip |

### 3.5 Toast / Notification

- Vị trí: top-right desktop, top-center mobile.
- Time-out 4 giây cho info, 6 giây cho warning, persist cho error cần action.
- Không dùng quá 2 toast cùng lúc trên một page.

---

## 4. Dark mode

| Yêu cầu | Mô tả |
|---------|-------|
| Mặc định | Tự động theo OS qua `next-themes` |
| Toggle | Có nút toggle ở header và settings |
| Test | Mọi PR thay đổi UI phải kiểm cả light + dark |
| Contrast | Đảm bảo WCAG AA (>= 4.5:1 cho body, >= 3:1 cho large text) |
| Color tokens | Luôn dùng token (`bg-surface`), không hardcode hex |
| Image | Logo + minh họa cần version dark riêng nếu nền sáng/tối quá tương phản |

Quy tắc viết Tailwind:

```tsx
<div className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
```

Không nên trộn lẫn nhiều cấp nền (ví dụ `bg-slate-50` ở light cần map sang `dark:bg-slate-800` để duy trì hierarchy).

---

## 5. Accessibility (WCAG AA)

| Hạng mục | Yêu cầu |
|----------|---------|
| Semantic HTML | Dùng `<button>`, `<nav>`, `<main>`, `<section>` đúng vai trò |
| Heading order | Theo tuần tự `h1 -> h2 -> h3`, không nhảy cóc |
| ARIA | Bổ sung `aria-label` khi nút chỉ có icon |
| Keyboard | Mọi tương tác phải bấm được bằng `Tab`/`Enter`/`Space` |
| Focus ring | Hiển thị rõ ràng, dùng `focus-visible:ring-2 ring-primary/60` |
| Color | Không dùng màu là cách duy nhất truyền tải thông tin (kèm icon, text) |
| Alt text | `<img>` luôn có `alt`; nếu trang trí dùng `alt=""` |
| Form | Mỗi input có `<label htmlFor>` hoặc `aria-label` |
| Live region | Toast và XP popup dùng `role="status"` hoặc `aria-live="polite"` |
| Skip link | Có "Bỏ qua tới nội dung chính" cho keyboard user |

Đánh giá đầy đủ WCAG yêu cầu test thủ công với screen reader (NVDA, VoiceOver) và đánh giá chuyên gia. Tài liệu này chỉ cover phần kỹ thuật cơ bản.

---

## 6. Responsive breakpoints

| Tên | Min width | Tailwind | Layout chính |
|-----|-----------|----------|--------------|
| Mobile | 390px | mặc định | 1 cột, bottom navigation |
| Mobile lớn | 480px | `sm:` | 1-2 cột, padding tăng |
| Tablet | 768px | `md:` | 2 cột, side menu thu gọn |
| Desktop | 1024px | `lg:` | 2-3 cột, side menu mở |
| Desktop wide | 1280px | `xl:` | 3-4 cột, hero full width |
| Desktop XL | 1536px | `2xl:` | Container max-w-screen-xl |

Container chuẩn: `max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8`.

Yêu cầu test:
- Không có horizontal scroll ở 390px.
- Touch target tối thiểu 44x44px ở mobile.
- Modal không vượt quá viewport, hỗ trợ scroll trong modal.

---

## 7. Animation guidelines

LinguaFlow dùng **Framer Motion** cho mọi animation phức tạp; CSS transition cho animation đơn giản.

| Loại | Duration | Easing | Áp dụng |
|------|----------|--------|---------|
| Hover/active | 150ms | `ease-out` | Button, link |
| Focus ring | 100ms | `ease` | Input |
| Page enter | 250ms | `[0.16, 1, 0.3, 1]` (custom) | Layout transitions |
| Stagger children | 80ms delay | `ease-out` | List card xuất hiện |
| Modal open | 200ms | `ease-out` + `scale 0.96 -> 1` | Dialog |
| XP popup | 600ms | `spring` (`stiffness: 300, damping: 24`) | Reward feedback |
| Skeleton pulse | 1.4s loop | `ease-in-out` | Loading state |

Quy tắc:
- Tổng thời gian animation không vượt quá 300ms cho UI thông thường (popup reward, transition page).
- Tôn trọng `prefers-reduced-motion`: bọc qua `useReducedMotion()` hoặc media query và set duration = 0.
- Không animate `width`/`height` trực tiếp; dùng `transform` (`scale`, `translate`).
- Luôn có entry và exit animation cho các thành phần dùng `AnimatePresence`.

Mẫu code:

```tsx
import { motion, useReducedMotion } from 'framer-motion';

const reduce = useReducedMotion();

<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 8 }}
  transition={{ duration: reduce ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
>
  ...
</motion.div>
```

---

## 8. Empty / loading / error state

| State | Yêu cầu |
|-------|---------|
| Loading | Skeleton screen (`bg-muted animate-pulse rounded-md`), không màn hình trắng |
| Empty | Có illustration + dòng tiếng Việt giải thích + nút action |
| Error | Hiển thị thông điệp tiếng Việt, nút retry, không leak stack trace |
| Offline | Banner thông báo khi PWA mất kết nối, chuyển sang fallback data |
| Fallback | Mọi API call đều có fallback data trong `web/src/services` |

---

## 9. Iconography

- Bộ icon mặc định: `lucide-react`. Không dùng emoji trong UI chính (giữ emoji trong nội dung học khi minh họa văn hóa).
- Kích thước chuẩn: 16px (inline), 20px (button), 24px (heading), 32px (illustration).
- Stroke width: 1.5 cho thân thiện, 2 cho icon nhỏ < 16px.

---

## 10. Checklist trước khi merge UI

```
□ Đã test responsive 390 / 768 / 1280 px
□ Đã test cả light và dark mode
□ Không có horizontal scroll ở mobile
□ Mọi button có aria-label hoặc text rõ ràng
□ Mọi input có label
□ Loading skeleton không bị blink
□ Empty state có message + action
□ Animation tôn trọng prefers-reduced-motion
□ Color contrast pass WCAG AA (qua DevTools hoặc axe)
□ Tiếng Việt có dấu, không lẫn tiếng Anh ở heading
□ Đã chạy npx playwright test (nếu sửa flow chính)
```
