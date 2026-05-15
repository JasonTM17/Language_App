# LinguaFlow

Modern language learning platform for Vietnamese students. Learn English, Japanese, Chinese, and Korean with AI-powered tutoring, smart flashcards, and personalized learning paths.

## Tech Stack

### Frontend (web/)
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management
- **Framer Motion** - Animations
- **Radix UI** - Accessible primitives

### Backend (api/)
- **Express.js** - REST API server
- **Prisma** - ORM with SQLite
- **JWT** - Authentication
- **Zod** - Request validation
- **bcryptjs** - Password hashing
- **Vitest** - Unit testing

### AI Service
- **n8n** - Workflow-based AI (webhook integration)
- **OpenAI** - GPT-4o-mini compatible API
- **Mock** - Built-in fallback (no config needed)

### Mobile (mobile/)
- **React Native / Expo**

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Setup

1. Clone the repository:
```bash
git clone <repo-url>
cd Language_App
```

2. Install dependencies:
```bash
cd api && npm install
cd ../web && npm install
```

3. Configure environment:
```bash
# API
cp api/.env.example api/.env

# Web
cp web/.env.example web/.env.local
```

4. Setup database:
```bash
cd api
npx prisma migrate dev
npx tsx src/database/seed.ts
```

5. Start development servers:

**Backend (port 3001):**
```bash
cd api && npm run dev
```

**Frontend (port 3000):**
```bash
cd web && npm run dev
```

6. Open http://localhost:3000

### Demo Accounts
- **Admin:** admin@linguaflow.app / admin123
- **User:** user@linguaflow.app / user123

## Features

- 🌍 **4 Languages** - English, Japanese, Chinese, Korean
- 📚 **Structured Lessons** - Vocabulary, grammar, examples
- 🃏 **Smart Flashcards** - Spaced repetition system
- ❓ **Interactive Quiz** - Multiple choice, fill-in, matching
- 🤖 **AI Tutor** - Conversation practice with corrections
- 🎙️ **Pronunciation** - Speech practice (architecture ready)
- 📊 **Progress Tracking** - XP, streaks, levels
- 🎨 **Modern UI** - Dark mode, responsive, animations
- 👑 **Admin Dashboard** - Manage content and users

## Project Structure

```
├── api/                  # Backend Express API
│   ├── prisma/           # Database schema & migrations
│   ├── src/
│   │   ├── __tests__/    # API tests (Vitest + Supertest)
│   │   ├── database/     # Prisma client & seed
│   │   ├── middleware/   # Auth middleware
│   │   ├── routes/       # API routes
│   │   └── services/     # AI service layer
│   ├── n8n/              # Workflow templates & setup guide
│   ├── API.md            # Endpoint documentation
│   └── .env.example
├── web/                  # Frontend Next.js app
│   ├── src/
│   │   ├── app/          # Pages (App Router)
│   │   ├── components/   # UI components
│   │   ├── lib/          # Utils & store
│   │   └── services/     # Typed API client
│   └── .env.example
├── shared/               # Shared types
└── mobile/               # React Native app
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user |
| GET | /api/languages | List languages |
| GET | /api/languages/:code | Get language details |
| POST | /api/languages/:code/enroll | Enroll in language |
| GET | /api/lessons | List lessons |
| GET | /api/lessons/:id | Get lesson detail |
| POST | /api/lessons/:id/complete | Complete lesson |
| GET | /api/vocabulary | List vocabulary |
| POST | /api/vocabulary/:id/review | Review flashcard |
| GET | /api/quiz/lesson/:id | Get quiz questions |
| POST | /api/quiz/:id/attempt | Submit answer |
| GET | /api/progress/dashboard | Get dashboard stats |
| POST | /api/chat/start | Start AI chat |
| POST | /api/chat/:id/message | Send message |
| GET | /api/admin/stats | Admin statistics |

## Scripts

```bash
# Web
npm run dev:web      # Start frontend dev server
npm run build:web    # Build for production

# API
npm run dev:api      # Start backend dev server
npm run build:api    # Compile TypeScript

# Database
cd api
npx prisma migrate dev    # Run migrations
npx prisma studio         # Open DB browser
npx tsx src/database/seed.ts  # Seed sample data
```

## Environment Variables

### API (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | SQLite file path | file:./dev.db |
| JWT_SECRET | JWT signing secret | dev-secret |
| PORT | API port | 3001 |
| FRONTEND_URL | CORS origin | http://localhost:3000 |
| N8N_WEBHOOK_URL | n8n AI webhook (optional) | - |
| OPENAI_API_KEY | OpenAI API key (optional) | - |
| OPENAI_BASE_URL | OpenAI-compatible base URL | https://api.openai.com/v1 |
| AI_MODEL | AI model name | gpt-4o-mini |

### Web (.env.local)
| Variable | Description | Default |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API URL | http://localhost:3001/api |
| NEXT_PUBLIC_APP_NAME | App display name | LinguaFlow |

## Testing

```bash
cd api
npm test              # Run all 33 tests
npm test -- --watch   # Watch mode
```

Tests cover auth, languages, lessons, quiz, chat, and progress routes.

## AI Chatbot

The AI tutor auto-detects which provider to use based on environment variables:

1. **n8n** — Set `N8N_WEBHOOK_URL` (see [api/n8n/SETUP.md](api/n8n/SETUP.md))
2. **OpenAI** — Set `OPENAI_API_KEY` (supports any OpenAI-compatible API)
3. **Mock** — Default fallback, no configuration needed

## API Documentation

See [api/API.md](api/API.md) for the complete endpoint reference.

## License

MIT
