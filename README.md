# LinguaFlow 🌍

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
- **Zod** - Validation
- **bcryptjs** - Password hashing

### Mobile (mobile/) - Coming soon
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
│   │   ├── database/     # Prisma client & seed
│   │   ├── middleware/   # Auth middleware
│   │   ├── routes/       # API routes
│   │   └── index.ts      # Server entry
│   └── .env.example
├── web/                  # Frontend Next.js app
│   ├── src/
│   │   ├── app/          # Pages (App Router)
│   │   ├── components/   # UI components
│   │   ├── lib/          # Utils & store
│   │   ├── services/     # API client
│   │   └── types/        # TypeScript types
│   └── .env.example
├── shared/               # Shared types
└── mobile/               # React Native app (planned)
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
| AI_API_KEY | AI service key (optional) | - |

### Web (.env.local)
| Variable | Description | Default |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API URL | http://localhost:3001/api |
| NEXT_PUBLIC_APP_NAME | App display name | LinguaFlow |

## License

MIT
