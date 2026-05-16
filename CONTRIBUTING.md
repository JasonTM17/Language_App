# Contributing to LinguaFlow

Cảm ơn bạn quan tâm đến việc đóng góp cho LinguaFlow!

## Thiết lập môi trường phát triển

### Yêu cầu

- Node.js >= 20.0
- npm >= 10.0

### Khởi động nhanh

```bash
# Clone repository
git clone https://github.com/JasonTM17/Language_App.git
cd Language_App

# Cài đặt tất cả dependencies
cd api && npm install && cd ../web && npm install && cd ..

# Khởi tạo database
cd api && cp .env.example .env && npx prisma migrate dev && npm run db:seed && cd ..

# Chạy toàn bộ stack với một lệnh duy nhất
npm run dev
```

Lệnh `npm run dev` sẽ khởi động đồng thời API server (port 3001) và Web server (port 3000).

## Tổng quan kiến trúc

Dự án được chia thành hai phần chính:

```
Language_App/
├── api/                    # Backend REST API (Express.js + TypeScript)
│   ├── src/
│   │   ├── routes/         # Các API endpoint
│   │   ├── middleware/     # Auth, rate-limit, validation
│   │   ├── database/       # Prisma ORM + SQLite
│   │   └── types/          # TypeScript definitions
│   ├── prisma/             # Schema & migrations
│   └── tests/              # Unit & integration tests
└── web/                    # Frontend (Next.js 14 + TypeScript)
    ├── src/
    │   ├── app/            # Pages (App Router)
    │   ├── components/     # Reusable UI components
    │   ├── hooks/          # Custom React hooks
    │   ├── lib/            # Utilities & helpers
    │   └── types/          # Shared type definitions
    └── public/             # Static assets & PWA
```

**`api/`** chứa toàn bộ logic backend: xác thực JWT, xử lý dữ liệu qua Prisma ORM, và các REST endpoint được validate bằng Zod.

**`web/`** là ứng dụng Next.js sử dụng App Router, Server Components, và Tailwind CSS. Giao tiếp với API qua TanStack Query.

## Chất lượng code

Dự án áp dụng các tiêu chuẩn sau để đảm bảo chất lượng:

### Định dạng code

```bash
# Kiểm tra định dạng
npm run format:check

# Tự động sửa định dạng (Prettier)
npm run format
```

### Kiểm tra kiểu dữ liệu

```bash
# Type check toàn bộ dự án (api + web)
npm run typecheck
```

### Chạy tests

```bash
# Unit & integration tests (Vitest)
npm test

# E2E tests (Playwright)
npm run test:e2e

# Chạy với coverage report
cd api && npx vitest run --coverage
```

Mọi Pull Request cần đảm bảo `npm run typecheck` và `npm test` đều pass trước khi được merge.

## Development

```bash
# Chạy toàn bộ stack
npm run dev

# Chỉ API (port 3001)
npm run dev:api

# Chỉ Web (port 3000)
npm run dev:web

# Build production
npm run build
```

## Code Style

- TypeScript strict mode
- ESLint + Prettier formatting
- Functional components (React)
- Zod for validation
- Prisma for database queries

## Commit Convention

```
feat: tính năng mới
fix: sửa lỗi
docs: cập nhật tài liệu
style: format code (không thay đổi logic)
refactor: tái cấu trúc code
test: thêm/sửa test
chore: công việc maintenance
perf: cải thiện performance
```

## Pull Request Process

1. Đảm bảo tests pass: `npm test`
2. Type check: `npm run typecheck`
3. Kiểm tra định dạng: `npm run format:check`
4. Mô tả rõ ràng thay đổi trong PR description
5. Link issue liên quan (nếu có)
6. Đợi review từ maintainer

## Reporting Issues

- Sử dụng issue templates có sẵn
- Cung cấp đủ thông tin để tái tạo lỗi
- Đính kèm screenshots nếu liên quan đến UI

## License

Bằng việc đóng góp, bạn đồng ý rằng contributions sẽ được license dưới MIT License.
