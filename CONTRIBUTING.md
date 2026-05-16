# Contributing to LinguaFlow

## Development Workflow

### Branch Strategy
- `master` — Production-ready code
- `feature/*` — New features
- `fix/*` — Bug fixes
- `docs/*` — Documentation updates

### Commit Convention
Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add speaking exercises for Korean
fix: resolve SM-2 interval calculation overflow
docs: update API endpoint reference
refactor: extract quiz scoring into service layer
test: add integration tests for friend requests
chore: update dependencies
```

### Pull Request Process
1. Create a feature branch from `master`
2. Make focused, atomic commits
3. Ensure all type checks pass (`npx tsc --noEmit`)
4. Run tests (`npm test`)
5. Update documentation if adding new endpoints
6. Submit PR with clear description

## Project Architecture

### API Layer (api/)

Routes follow a consistent pattern:
```typescript
import { Router, Response } from 'express';
import { z } from 'zod';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Zod schema for request validation
const submitSchema = z.object({
  field: z.string(),
  score: z.number().min(0).max(100),
});

// Protected route with validation
router.post('/submit', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const data = submitSchema.parse(req.body);
    // Business logic...
    res.json({ result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Lỗi server' });
  }
});
```

Key conventions:
- All routes use `authenticate` middleware for protected endpoints
- Request bodies validated with Zod schemas
- Error messages in Vietnamese for user-facing responses
- `AuthRequest` type provides `req.userId`
- Prisma client imported as default: `import prisma from '../database/client'`

### Frontend Layer (web/)

Pages follow Next.js App Router conventions:
```
web/src/app/{feature}/page.tsx  — Page component
web/src/components/ui/          — Shared UI components
web/src/services/api.ts         — Typed API client
web/src/lib/store.ts            — Zustand state
web/src/locales/vi.json         — Vietnamese translations
```

Component conventions:
- `'use client'` directive for interactive pages
- Vietnamese labels for all user-facing text
- Tailwind CSS with dark mode support (`dark:` prefix)
- Responsive design (mobile-first)
- Loading/error/empty states using shared components

### Database

- ORM: Prisma with SQLite
- Schema: `api/prisma/schema.prisma`
- After schema changes: `npx prisma migrate dev` then `npx prisma generate`
- Seed data: `npx tsx src/database/seed.ts`

### AI Service

Three-tier fallback system:
1. n8n webhook (if `N8N_WEBHOOK_URL` set)
2. OpenAI-compatible API (if `OPENAI_API_KEY` set)
3. Built-in mock responses (always available)

## Adding a New Feature

### Backend Route
1. Create `api/src/routes/{feature}.ts`
2. Define interfaces and Zod schemas
3. Implement CRUD endpoints with authentication
4. Register in `api/src/index.ts`
5. Add endpoint constants to `web/src/config/endpoints.ts`
6. Type-check: `cd api && npx tsc --noEmit`

### Frontend Page
1. Create `web/src/app/{feature}/page.tsx`
2. Add Vietnamese translations to `web/src/locales/vi.json`
3. Add navigation entry in `web/src/components/layout/app-layout.tsx`
4. Add API methods to `web/src/services/api.ts` if needed
5. Type-check: `cd web && npx tsc --noEmit`

## Code Style

- TypeScript strict mode
- No `any` types (use proper interfaces)
- Functional components with hooks
- Named exports for components, default export for pages
- Tailwind utility classes (no custom CSS unless necessary)
- Vietnamese error messages in API responses
- English code comments only when explaining non-obvious logic

## Testing

```bash
cd api
npm test                    # Run all tests
npm test -- --watch         # Watch mode
npm test -- auth.test.ts    # Single file
```

Tests use Vitest + Supertest for API integration testing.
