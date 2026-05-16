# Contributing to LinguaFlow

Cảm ơn bạn quan tâm đến việc đóng góp cho LinguaFlow!

## Getting Started

1. Fork repository
2. Clone fork: `git clone https://github.com/<your-username>/Language_App.git`
3. Cài đặt dependencies: `cd api && npm install && cd ../web && npm install`
4. Tạo branch: `git checkout -b feature/ten-tinh-nang`

## Development

```bash
# API (port 3001)
cd api && npm run dev

# Web (port 3000)
cd web && npm run dev

# Run tests
cd api && npm test
cd web && npx playwright test
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
2. Type check: `npx tsc --noEmit`
3. Mô tả rõ ràng thay đổi trong PR description
4. Link issue liên quan (nếu có)
5. Đợi review từ maintainer

## Project Structure

```
api/          → Express REST API
web/          → Next.js frontend
docs/         → Documentation
```

## Reporting Issues

- Sử dụng issue templates có sẵn
- Cung cấp đủ thông tin để tái tạo lỗi
- Đính kèm screenshots nếu liên quan đến UI

## License

Bằng việc đóng góp, bạn đồng ý rằng contributions sẽ được license dưới MIT License.
