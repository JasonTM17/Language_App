![CI](https://github.com/JasonTM17/Language_App/actions/workflows/ci.yml/badge.svg) [![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)](https://nodejs.org) [![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript)](https://www.typescriptlang.org) [![Docker](https://img.shields.io/badge/Docker_Hub-nguyenson1710-2496ED?logo=docker)](https://hub.docker.com/u/nguyenson1710) [![Deploy](https://img.shields.io/badge/Render-Live-46E3B7?logo=render)](https://linguaflow-api-ujjo.onrender.com) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

# LinguaFlow

Nền tảng học ngôn ngữ thông minh dành cho người Việt — học Tiếng Anh, Nhật, Trung, Hàn với spaced repetition, gamification và lộ trình cá nhân hóa.

---

## Screenshots

| Screenshot | Mô tả |
|---|---|
| ![Dashboard](docs/screenshots/desktop-dashboard.png) | **Trang chủ** — Hiển thị tiến độ học, streak hàng ngày, và từ vựng gần đây |
| ![Vocabulary](docs/screenshots/desktop-vocabulary.png) | **Từ vựng** — Danh sách từ với phát âm, ví dụ, và flashcard tương tác |
| ![Quiz](docs/screenshots/desktop-quiz.png) | **Quiz** — Bài kiểm tra trắc nghiệm với timer và điểm XP |
| ![Dark Mode](docs/screenshots/desktop-dark-mode.png) | **Dark Mode** — Giao diện tối, dễ nhìn ban đêm |

---

## Demo

| GIF | Mô tả | Thời lượng |
|---|---|---|
| ![Full Flow](docs/gifs/demo-full-flow.gif) | **Luồng chính** — Dashboard → Học từ → Quiz → Kết quả | ~15s |
| ![Quiz](docs/gifs/demo-quiz-interaction.gif) | **Quiz tương tác** — Chọn đáp án, animation đúng/sai, XP popup | ~8s |

---

## Giới thiệu

LinguaFlow là nền tảng học ngôn ngữ toàn diện được xây dựng cho người Việt Nam. Hỗ trợ 4 ngôn ngữ — Tiếng Anh, Nhật, Trung, Hàn — với thuật toán spaced repetition SM-2, hệ thống gamification (XP, streak, leaderboard), và lộ trình học từ Beginner đến Advanced. Giao diện responsive, hỗ trợ dark mode, và tối ưu cho mọi thiết bị.

| Tính năng | Mô tả |
|---|---|
| Vocabulary | Flashcard, spaced repetition, phát âm |
| Quiz | Trắc nghiệm, điền từ, nghe hiểu |
| Progress | Streak, XP, thống kê chi tiết |
| Dark Mode | Giao diện tối/sáng tự động |
| Responsive | Tối ưu cho mọi thiết bị |
| Animations | Framer Motion, micro-interactions |

---

## Kiến trúc

### Tech Stack

| Lớp | Công nghệ |
|---|---|
| Frontend | Next.js 14 (App Router), React 18, TypeScript 5.4 |
| Styling | Tailwind CSS 3.4, Radix UI, Framer Motion |
| State | Zustand, TanStack Query |
| Backend | Express.js, TypeScript, Prisma ORM, SQLite |
| Auth | JWT, bcryptjs |
| Validation | Zod |
| Security | Helmet, CORS, Rate Limiting |
| Infrastructure | Docker, GitHub Actions CI/CD |

### Cấu trúc thư mục

```
linguaflow/
├── api/                    # Backend REST API
│   ├── src/
│   │   ├── routes/         # 38+ API endpoints
│   │   ├── middleware/     # Auth, rate-limit, validation
│   │   ├── database/       # Prisma ORM + SQLite
│   │   ├── services/       # Business logic (gamification, v.v.)
│   │   └── types/          # TypeScript definitions
│   ├── prisma/             # Schema & migrations
│   └── tests/              # Unit & integration tests
├── web/                    # Frontend Next.js
│   ├── src/
│   │   ├── app/            # Pages (App Router)
│   │   ├── components/     # UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities & helpers
│   │   └── types/          # Type definitions
│   └── public/             # Static assets
├── shared/                 # Shared types & utilities
├── docker-compose.yml      # Container orchestration
└── docs/                   # Documentation & screenshots
```

---

## Cài đặt

### Yêu cầu

- Node.js >= 20.0
- npm >= 10.0

### Các bước cài đặt

```bash
# Clone repository
git clone https://github.com/JasonTM17/Language_App.git
cd Language_App

# Cài đặt dependencies
cd api && npm install
cd ../web && npm install
cd ..

# Cấu hình biến môi trường
cd api
cp .env.example .env

# Khởi tạo database và seed dữ liệu
npx prisma migrate dev
npm run db:seed

# Chạy development servers

# Terminal 1 — API (port 3001)
cd api && npm run dev

# Terminal 2 — Web (port 3000)
cd web && npm run dev
```

### Biến môi trường

```env
# api/.env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-change-in-production"
PORT=3001
NODE_ENV=development
```

---

## API Reference

Base URL: `http://localhost:3001/api`

### Health

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/health` | Kiểm tra trạng thái server |
| GET | `/ready` | Kiểm tra kết nối database |

### Authentication

| Method | Endpoint | Mô tả |
|---|---|---|
| POST | `/auth/register` | Đăng ký tài khoản mới |
| POST | `/auth/login` | Đăng nhập, trả về JWT token |
| GET | `/auth/me` | Lấy thông tin người dùng hiện tại |
| POST | `/auth/logout` | Đăng xuất, xóa cookie |

### Từ vựng

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/vocabulary` | Danh sách từ vựng (phân trang, lọc theo bài học, lọc từ đến hạn ôn) |
| POST | `/vocabulary/:id/review` | Ghi nhận kết quả ôn tập (thuật toán SM-2) |

### Quiz

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/quiz/lesson/:lessonId` | Lấy câu hỏi quiz theo bài học |
| GET | `/quiz/practice` | Lấy câu hỏi luyện tập ngẫu nhiên |
| POST | `/quiz/:id/attempt` | Nộp đáp án, nhận XP nếu trả lời đúng |

### Tiến độ

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/progress/dashboard` | Thống kê tổng quan (XP, level, streak, hoạt động 7 ngày) |
| GET | `/progress/streak` | Streak hiện tại |

[Xem đầy đủ API docs →](docs/api.md)

---

## Testing

```bash
# Chạy unit & integration tests (Vitest)
cd api && npm test

# Chạy với coverage report
cd api && npx vitest run --coverage

# Kiểm tra TypeScript
cd api && npx tsc --noEmit
cd web && npx tsc --noEmit

# Chạy E2E tests (Playwright)
cd web && npx playwright test

# Xem báo cáo E2E
cd web && npx playwright show-report
```

---

## Deployment

### Render (API)

API được deploy trên Render tại [https://linguaflow-api-ujjo.onrender.com](https://linguaflow-api-ujjo.onrender.com).

- Runtime: Node.js
- Database: SQLite (persistent disk)

### Vercel (Web)

Frontend được deploy trên Vercel.

### Docker

Images có sẵn trên [Docker Hub](https://hub.docker.com/u/nguyenson1710):

```bash
# Pull từ Docker Hub
docker pull nguyenson1710/linguaflow-api
docker pull nguyenson1710/linguaflow-web

# Chạy toàn bộ stack với Docker Compose
docker compose up -d
```

---

## Đóng góp

Xem hướng dẫn đóng góp chi tiết tại [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Giấy phép

Dự án được phân phối dưới giấy phép [MIT](LICENSE).

---

## Disclaimer

Đây là dự án học tập nhằm mục đích rèn luyện kỹ năng phát triển phần mềm fullstack. Mọi ý kiến đóng góp, phản hồi đều được hoan nghênh.

---

## Tác giả

**Nguyễn Sơn** — [jasonbmt06@gmail.com](mailto:jasonbmt06@gmail.com)

Mọi góp ý, phản hồi xin gửi về email trên.
