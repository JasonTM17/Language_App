# Changelog

All notable changes to LinguaFlow will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-05-17

### Added

- **UI/UX Overhaul**
  - Glassmorphism design system across all 57 pages
  - Framer Motion animations with staggered transitions
  - Consistent card styling with backdrop blur and gradient borders

- **New Features**
  - Daily quests system with XP rewards
  - Word of the Day with multi-language support
  - Pronunciation practice with speech recognition
  - Site configuration with SEO metadata

- **Developer Experience**
  - API endpoint constants for type-safe route references
  - Custom hooks: useDebounce, useLocalStorage
  - Vietnamese helper utilities (formatting, dates, UI)
  - TypeScript type definitions for vocabulary, quiz, progress, notifications

### Fixed

- Quests API returning 500 due to incorrect auth middleware access pattern
- Playwright E2E config now supports BASE_URL environment variable
- Vietnamese localization consistency across all page headings

### Changed

- Upgraded all page components to use motion.div with entrance animations
- Standardized dark mode styling with proper contrast ratios

## [1.0.0] - 2026-05-16

### Added

- **Core Platform**
  - Full-stack language learning application (Next.js 14 + Express)
  - Support for 4 languages: English, Japanese, Chinese, Korean
  - JWT authentication with secure session management
  - Responsive design with dark mode support

- **Learning Features**
  - AI Tutor with personalized learning assistance
  - Spaced Repetition System (SM-2 algorithm) for vocabulary
  - Skill tree progression from Beginner to Advanced
  - Daily challenges with XP rewards
  - Gamification: streaks, leaderboard, achievements

- **Practice Modules**
  - Listening comprehension (10 exercises per language)
  - Speaking practice with pronunciation feedback
  - Reading comprehension exercises
  - Writing practice with grammar correction
  - Typing practice for character-based languages
  - Sentence ordering exercises
  - Grammar correction challenges
  - Fill-in-the-blank exercises

- **Technical**
  - 38 REST API endpoints with Zod validation
  - 129 passing tests (unit + integration)
  - PWA with offline support and service worker
  - Docker containerization (multi-stage builds)
  - Rate limiting, CORS, Helmet security headers
  - Prisma ORM with SQLite database
  - Full TypeScript coverage (API + Web)

### Security

- Helmet.js security headers
- Rate limiting on all endpoints
- JWT token rotation
- Input validation with Zod schemas
- CORS configuration
- Content Security Policy headers

[1.1.0]: https://github.com/JasonTM17/Language_App/releases/tag/v1.1.0
[1.0.0]: https://github.com/JasonTM17/Language_App/releases/tag/v1.0.0
