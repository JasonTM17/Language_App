# Project Rules - Nguyễn Sơn
# Bộ quy tắc chuẩn cho mọi dự án

## 1. Git & Contributor

- Tất cả commits phải là author: `Nguyễn Sơn <sonnguyenhoang17@gmail.com>`
- KHÔNG có Co-Authored-By, KHÔNG có AI attribution
- Commit convention: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`, `perf:`
- Commit message ngắn gọn, tiếng Anh, mô tả WHY không phải WHAT
- KHÔNG push trực tiếp lên main/master khi có team
- Force push chỉ khi rewrite history (xóa AI traces)

## 2. Repo Structure (Monorepo)

```
project/
├── .github/
│   ├── workflows/ci.yml        # CI/CD pipeline
│   ├── workflows/codeql.yml    # Security scanning
│   ├── dependabot.yml          # Auto dependency updates
│   ├── ISSUE_TEMPLATE/         # Bug report + Feature request
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS              # @JasonTM17
├── api/                        # Backend
├── web/                        # Frontend
├── docs/                       # Documentation
├── package.json                # Root with workspaces + scripts
├── .prettierrc                 # Code formatting
├── .nvmrc                      # Node version pin
├── .editorconfig               # Editor settings
├── .gitignore                  # Comprehensive
├── docker-compose.yml          # Local dev + production
├── README.md                   # Professional with badges, screenshots, GIFs
├── CONTRIBUTING.md             # Vietnamese, comprehensive
├── CHANGELOG.md                # Keep a Changelog format
├── CODE_OF_CONDUCT.md          # Contributor Covenant
├── SECURITY.md                 # Security policy
└── LICENSE                     # MIT
```

## 3. README.md Checklist

- [ ] Live CI badge (GitHub Actions)
- [ ] Tech stack badges (Node, framework, TypeScript, Docker)
- [ ] Deploy badge (Vercel/Render)
- [ ] PRs Welcome badge
- [ ] Screenshots (desktop + mobile)
- [ ] GIF demos (desktop + mobile)
- [ ] Feature table
- [ ] Architecture diagram/tree
- [ ] Tech stack section
- [ ] Quick start (one command)
- [ ] API reference table
- [ ] Testing section
- [ ] Deployment section
- [ ] Contributing link
- [ ] License

## 4. CI/CD Pipeline

```yaml
# Minimum CI requirements:
- Type check (tsc --noEmit)
- Lint (eslint)
- Unit tests with coverage
- Build verification
- Security scan (CodeQL)

# Environment setup:
- DATABASE_URL for test DB
- JWT_SECRET for auth tests
- prisma migrate/generate before tests
```

## 5. Testing

- API: Vitest + Supertest (unit + integration)
- Web: Playwright (E2E) + Vitest (unit)
- Coverage threshold: 80%+
- Tests PHẢI pass trước khi merge
- Fallback data cho mọi API call (app không trống khi API down)

## 6. Security

- KHÔNG commit secrets (.env, tokens, keys)
- .gitignore phải cover: .env*, *.db, coverage/, logs/
- Dependabot enabled
- CodeQL scanning weekly
- Rate limiting trên tất cả endpoints
- Helmet.js security headers
- Input validation (Zod)
- JWT với refresh tokens
- CORS configured properly

## 7. Code Quality

- TypeScript strict mode
- Prettier formatting (semi, singleQuote, tabWidth: 2)
- ESLint configured
- No `any` types (trừ khi thật sự cần)
- Functional components (React)
- Server Components by default (Next.js)
- Zod validation cho API input
- Error handling với proper HTTP status codes

## 8. Deployment

### Render (API):
- Runtime: Node.js (KHÔNG Docker cho free tier)
- Build: `npm ci && npx prisma generate && npm run build`
- Start: `npx prisma db push --accept-data-loss && node dist/index.js`
- KHÔNG set NODE_ENV=production trong env vars (Render tự set)
- KHÔNG set PORT (Render tự assign)
- Health check path: `/api/health`

### Vercel (Web):
- Framework: Next.js
- Set NEXT_PUBLIC_API_URL trỏ đến Render API
- output: 'standalone' cho Docker
- Redeploy sau khi thay đổi env vars

### Docker Hub:
- Multi-stage builds cho production
- Username: nguyenson1710
- Tag format: v1.0.0, latest

## 9. UI/UX Standards

- Responsive: mobile-first
- Dark mode support
- Animations: Framer Motion (subtle, purposeful)
- Design system: Tailwind CSS + Radix UI
- Fonts: Inter (body) + Plus Jakarta Sans (display)
- Glassmorphism, gradients, shadows for depth
- Loading skeletons (không blank screens)
- Fallback data khi API unavailable
- Empty states với illustrations
- Toast notifications cho user feedback
- Accessibility: ARIA labels, keyboard navigation
- Footer year: luôn cập nhật

## 10. Documentation

- README: Vietnamese + English mix (technical terms English)
- CONTRIBUTING: Vietnamese
- API docs: English
- Code comments: English, chỉ khi WHY không rõ ràng
- CHANGELOG: English, Keep a Changelog format

## 11. Package.json

```json
{
  "engines": { "node": ">=20.0.0", "npm": ">=10.0.0" },
  "author": "Nguyễn Sơn <sonnguyenhoang17@gmail.com>",
  "license": "MIT",
  "repository": { "type": "git", "url": "..." },
  "scripts": {
    "dev": "concurrently api + web",
    "build": "both",
    "test": "vitest",
    "lint": "eslint",
    "format": "prettier --write",
    "format:check": "prettier --check",
    "typecheck": "tsc --noEmit",
    "db:migrate": "prisma migrate dev",
    "db:seed": "seed script",
    "docker:up": "docker compose up -d"
  }
}
```

## 12. Quy trình làm dự án mới

1. Init repo + .gitignore + .nvmrc + .editorconfig
2. Setup monorepo (root package.json with workspaces)
3. Setup API (Express/Fastify + Prisma + TypeScript)
4. Setup Web (Next.js + Tailwind + TypeScript)
5. Add CI/CD (GitHub Actions)
6. Add security (CodeQL, Dependabot, SECURITY.md)
7. Add community files (CONTRIBUTING, CODE_OF_CONDUCT, templates)
8. Add Docker support
9. Deploy (Render API + Vercel Web)
10. Add README with badges, screenshots, GIFs
11. Push to Docker Hub
12. Create GitHub Release

## 13. Những lỗi cần tránh

- ❌ Hardcode port trong Docker HEALTHCHECK (Render assign port riêng)
- ❌ Set NODE_ENV=production trong Render env vars (skip devDeps khi build)
- ❌ Dùng Docker cho Render free tier (Node.js runtime đơn giản hơn)
- ❌ Quên fallback data (app trống khi API down)
- ❌ Commit .env hoặc tokens
- ❌ Để AI attribution trong commits
- ❌ Hardcode year trong footer
- ❌ Bỏ qua mobile responsive
- ❌ Không có loading states
- ❌ Dùng `prisma migrate deploy` trên SQLite production (dùng `db push`)
