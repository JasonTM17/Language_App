import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import languageRoutes from './routes/languages';
import lessonRoutes from './routes/lessons';
import vocabularyRoutes from './routes/vocabulary';
import quizRoutes from './routes/quiz';
import progressRoutes from './routes/progress';
import chatRoutes from './routes/chat';
import adminRoutes from './routes/admin';
import achievementRoutes from './routes/achievements';
import leaderboardRoutes from './routes/leaderboard';
import onboardingRoutes from './routes/onboarding';
import goalsRoutes from './routes/goals';
import healthRoutes from './routes/health';
import studyRoutes from './routes/study';
import questsRoutes from './routes/quests';
import heartsRoutes from './routes/hearts';
import dailyGoalsRoutes from './routes/daily-goals';
import flashcardReviewRoutes from './routes/flashcard-review';
import studyPlanRoutes from './routes/study-plan';
import bookmarksRoutes from './routes/bookmarks';
import wordOfDayRoutes from './routes/word-of-day';
import analyticsRoutes from './routes/analytics';
import grammarTipsRoutes from './routes/grammar-tips';
import sentenceBuilderRoutes from './routes/sentence-builder';
import searchRoutes from './routes/search';
import notificationsRoutes from './routes/notifications';
import settingsRoutes from './routes/settings';
import profileRoutes from './routes/profile';
import reviewHistoryRoutes from './routes/review-history';
import learningProgressRoutes from './routes/learning-progress';
import typingPracticeRoutes from './routes/typing-practice';
import pronunciationRoutes from './routes/pronunciation';
import shopRoutes from './routes/shop';
import friendsRoutes from './routes/friends';
import skillTreeRoutes from './routes/skill-tree';
import storiesRoutes from './routes/stories';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts, please try again later' },
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/study', studyRoutes);
app.use('/api/quests', questsRoutes);
app.use('/api/hearts', heartsRoutes);
app.use('/api/daily-goals', dailyGoalsRoutes);
app.use('/api/flashcard-review', flashcardReviewRoutes);
app.use('/api/study-plan', studyPlanRoutes);
app.use('/api/bookmarks', bookmarksRoutes);
app.use('/api/word-of-day', wordOfDayRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/grammar-tips', grammarTipsRoutes);
app.use('/api/sentence-builder', sentenceBuilderRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/review-history', reviewHistoryRoutes);
app.use('/api/learning-progress', learningProgressRoutes);
app.use('/api/typing-practice', typingPracticeRoutes);
app.use('/api/pronunciation', pronunciationRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/skill-tree', skillTreeRoutes);
app.use('/api/stories', storiesRoutes);
app.use('/api', healthRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`LinguaFlow API running on port ${PORT}`);
  });
}

export default app;
