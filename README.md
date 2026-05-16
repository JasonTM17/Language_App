# LinguaFlow

A comprehensive language learning platform designed for Vietnamese students learning English, Japanese, Chinese, and Korean. Features AI-powered tutoring, spaced repetition flashcards, interactive stories, gamification, and personalized learning paths.

## Tech Stack

### Frontend (web/)
- **Next.js 14** — React framework with App Router
- **TypeScript** — Full type safety across the codebase
- **Tailwind CSS** — Utility-first styling with dark mode
- **Zustand** — Lightweight state management
- **Framer Motion** — Smooth animations and transitions
- **Radix UI** — Accessible component primitives

### Backend (api/)
- **Express.js** — REST API with 38+ route modules
- **Prisma** — Type-safe ORM with SQLite
- **JWT** — Stateless authentication
- **Zod** — Runtime request validation
- **bcryptjs** — Secure password hashing
- **Vitest** — Unit and integration testing

### AI Service
- **n8n** — Workflow-based AI orchestration (webhook integration)
- **OpenAI-compatible** — GPT-4o-mini or any compatible API
- **Built-in fallback** — Mock responses when no AI provider configured

### Mobile (mobile/)
- **React Native / Expo** — Cross-platform mobile app

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Setup

```bash
# Clone and install
git clone https://github.com/JasonTM17/Language_App.git
cd Language_App
cd api && npm install
cd ../web && npm install

# Configure environment
cp api/.env.example api/.env
cp web/.env.example web/.env.local

# Setup database
cd api
npx prisma migrate dev
npx tsx src/database/seed.ts

# Start development
cd api && npm run dev    # Backend on port 3001
cd web && npm run dev    # Frontend on port 3000
```

Open http://localhost:3000

### Demo Accounts
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@linguaflow.app | admin123 |
| User | user@linguaflow.app | user123 |

## Features

### Core Learning
- 🌍 **4 Languages** — English, Japanese, Chinese, Korean with Vietnamese translations
- 📚 **Structured Lessons** — Progressive curriculum with vocabulary, grammar, and examples
- 🃏 **Smart Flashcards** — SM-2 spaced repetition algorithm (quality 0-5 scale)
- ❓ **Interactive Quizzes** — Multiple choice, fill-in-the-blank, matching, translation
- 🧠 **Weak Words** — Targeted review of difficult vocabulary
- 📖 **Grammar Tips** — Contextual grammar explanations per language

### Speaking & Listening
- 🎤 **Speaking Practice** — Repeat, respond, describe, read aloud, role play exercises
- 🎧 **Listening Exercises** — Dictation, comprehension, fill-audio, word recognition
- 🎙️ **Pronunciation** — Phoneme-level analysis with Vietnamese-specific error patterns
- ✏️ **Dictation** — Audio-to-text transcription practice

### Reading & Writing
- 📚 **Interactive Stories** — Narrative reading with inline comprehension questions
- ✍️ **Writing Practice** — Sentence construction and essay exercises
- 🧩 **Sentence Builder** — Drag-and-drop sentence construction
- 🌐 **Translation** — Bidirectional translation exercises
- 字 **Characters** — Kanji/Hanzi/Hangul character practice

### AI & Conversation
- 🤖 **AI Tutor** — Role-based conversation (teacher, friend, interviewer, doctor, travel guide)
- 💬 **Conversation Practice** — Contextual dialogue with corrections and vocabulary highlights
- 🔧 **Grammar Correction** — Real-time grammar feedback

### Gamification
- ⚔️ **Daily Challenge** — Timed competitive quiz with combo scoring
- 🎯 **Daily Goals** — Daily/weekly/challenge quests with XP and gem rewards
- 🔥 **Streak System** — Calendar tracking with streak freeze protection
- 💎 **Shop** — Gem economy with power-ups, cosmetics, and streak items
- ❤️ **Hearts** — Limited attempts system with refill mechanics
- 🏆 **Achievements** — Milestone badges and level progression
- 🥇 **Leaderboard** — Competitive ranking among learners
- 🌳 **Skill Tree** — Visual progression path per language with unlock dependencies

### Social
- 👥 **Friends** — Add friends, view activity, compare progress
- 📊 **Leaderboard** — Weekly/monthly/all-time rankings
- 🔔 **Notifications** — Streak reminders, achievements, friend activity

### Personalization
- 📅 **Study Plan** — Personalized daily learning schedule
- 📈 **Analytics** — Detailed learning statistics and trends
- ⚙️ **Settings** — Theme, language, notification preferences
- 🎓 **Onboarding** — Placement test with level determination

## Project Structure

```
Language_App/
├── api/                      # Backend Express API
│   ├── prisma/               # Database schema & migrations
│   │   └── schema.prisma     # Data models (User, Lesson, Vocabulary, etc.)
│   ├── src/
│   │   ├── __tests__/        # API tests (Vitest + Supertest)
│   │   ├── database/         # Prisma client & seed data
│   │   ├── middleware/       # Auth, rate limiting
│   │   ├── routes/           # 38+ API route modules
│   │   │   ├── auth.ts       # Registration, login, JWT
│   │   │   ├── lessons.ts    # Lesson CRUD & completion
│   │   │   ├── vocabulary.ts # SM-2 spaced repetition
│   │   │   ├── quiz.ts       # Quiz generation & scoring
│   │   │   ├── chat.ts       # AI conversation
│   │   │   ├── speaking.ts   # Speaking exercises
│   │   │   ├── listening.ts  # Listening exercises
│   │   │   ├── stories.ts    # Interactive stories
│   │   │   ├── friends.ts    # Social features
│   │   │   ├── shop.ts       # Gem economy
│   │   │   └── ...           # 28+ more route files
│   │   └── services/         # AI service layer
│   ├── n8n/                  # Workflow templates & setup guide
│   ├── API.md               # Endpoint documentation
│   └── .env.example
├── web/                      # Frontend Next.js app
│   ├── src/
│   │   ├── app/              # 50+ pages (App Router)
│   │   ├── components/       # Reusable UI components
│   │   │   ├── layout/       # App shell, navigation
│   │   │   └── ui/           # Button, states, calendar, etc.
│   │   ├── config/           # Endpoints, site config
│   │   ├── hooks/            # useDebounce, useLocalStorage
│   │   ├── lib/              # Store, i18n, utils
│   │   ├── locales/          # Vietnamese translations (vi.json)
│   │   ├── services/         # Typed API client
│   │   └── types/            # Shared TypeScript types
│   └── .env.example
├── shared/                   # Shared type definitions
└── mobile/                   # React Native / Expo app
```

## API Overview

38+ REST endpoints organized by domain:

| Domain | Endpoints | Description |
|--------|-----------|-------------|
| Auth | 4 | Register, login, refresh, profile |
| Languages | 3 | List, details, enrollment |
| Lessons | 4 | CRUD, completion, progress |
| Vocabulary | 3 | List, SM-2 review, stats |
| Quiz | 3 | Generate, submit, history |
| Chat | 3 | Start, message, history |
| Speaking | 3 | List, detail, submit with scoring |
| Listening | 3 | List, detail, submit |
| Stories | 3 | List, read, submit answers |
| Pronunciation | 3 | Exercises, submit, feedback |
| Friends | 5 | List, add, accept, reject, unfriend |
| Shop | 3 | List items, purchase, inventory |
| Skill Tree | 3 | Tree, progress, recommendations |
| Daily Challenge | 3 | Today's challenge, submit, history |
| Progress | 4 | Dashboard, streaks, XP, levels |
| Achievements | 2 | List, unlock |
| Leaderboard | 2 | Rankings, friends |
| Admin | 4 | Stats, users, content management |

Full documentation: [api/API.md](api/API.md)

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

## AI Chatbot

The AI tutor supports multiple providers with automatic fallback:

1. **n8n** — Set `N8N_WEBHOOK_URL` (see [api/n8n/SETUP.md](api/n8n/SETUP.md))
2. **OpenAI-compatible** — Set `OPENAI_API_KEY` (works with any OpenAI-compatible API)
3. **Mock** — Built-in fallback with contextual responses per role

Conversation roles: Teacher, Friend, Interviewer, Doctor, Travel Guide — each with Vietnamese-learner-specific system prompts.

## Testing

```bash
cd api
npm test              # Run all tests
npm test -- --watch   # Watch mode
```

## Scripts

```bash
# Development
cd api && npm run dev          # Start API server (port 3001)
cd web && npm run dev          # Start web app (port 3000)

# Build
cd api && npm run build        # Compile TypeScript
cd web && npm run build        # Production build

# Database
cd api
npx prisma migrate dev         # Run migrations
npx prisma studio              # Visual DB browser
npx prisma generate            # Regenerate client after schema changes
npx tsx src/database/seed.ts   # Seed sample data

# Type checking
cd api && npx tsc --noEmit     # Check API types
cd web && npx tsc --noEmit     # Check web types
```

## Design Principles

- **Vietnamese-first UX** — All UI labels, error messages, and learning content include Vietnamese translations
- **Gamification** — XP, gems, hearts, streaks, and leaderboards drive engagement
- **Spaced Repetition** — SM-2 algorithm ensures optimal review intervals
- **Progressive Difficulty** — Placement tests and skill trees adapt to learner level
- **Offline-ready Architecture** — API responses designed for client-side caching
- **Accessibility** — Semantic HTML, keyboard navigation, screen reader support

## License

MIT
