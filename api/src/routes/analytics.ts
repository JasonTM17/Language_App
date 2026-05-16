import { Router, Request, Response } from 'express';
import prisma from '../database/client';
import { authenticate } from '../middleware/auth';
import { paginate, errorResponse } from '../types/responses';

const router = Router();

router.get('/overview', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const enrollments = await prisma.enrollment.count({ where: { userId } });
    const completedLessons = await prisma.lessonProgress.count({ where: { userId, completed: true } });
    const totalVocabLearned = await prisma.flashcardProgress.count({ where: { userId, known: true } });
    const totalQuizAttempts = await prisma.quizAttempt.count({ where: { userId } });
    const correctQuizAttempts = await prisma.quizAttempt.count({ where: { userId, correct: true } });

    const quizAccuracy = totalQuizAttempts > 0 ? Math.round((correctQuizAttempts / totalQuizAttempts) * 100) : 0;

    res.json({
      xp: user?.xp || 0,
      level: user?.level || 1,
      streak: user?.streak || 0,
      enrolledLanguages: enrollments,
      completedLessons,
      totalVocabLearned,
      totalQuizAttempts,
      quizAccuracy,
    });
  } catch (error) {
    console.error('Analytics overview error:', error);
    res.status(500).json(errorResponse('Không thể tải tổng quan phân tích', 'INTERNAL_ERROR'));
  }
});

router.get('/languages', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: { language: true, level: true },
    });

    const languageStats = await Promise.all(
      enrollments.map(async (enrollment) => {
        const totalLessons = await prisma.lesson.count({
          where: { levelId: enrollment.levelId },
        });
        const completedLessons = await prisma.lessonProgress.count({
          where: { userId, lesson: { levelId: enrollment.levelId }, completed: true },
        });
        const vocabLearned = await prisma.flashcardProgress.count({
          where: { userId, known: true, vocabulary: { lesson: { levelId: enrollment.levelId } } },
        });
        const totalVocab = await prisma.vocabulary.count({
          where: { lesson: { levelId: enrollment.levelId } },
        });

        return {
          languageCode: enrollment.language.code,
          languageName: enrollment.language.name,
          levelName: enrollment.level.name,
          progress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
          completedLessons,
          totalLessons,
          vocabLearned,
          totalVocab,
        };
      })
    );

    res.json(paginate(languageStats, page, limit));
  } catch (error) {
    console.error('Language analytics error:', error);
    res.status(500).json(errorResponse('Không thể tải phân tích ngôn ngữ', 'INTERNAL_ERROR'));
  }
});

router.get('/activity', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const days = parseInt(req.query.days as string) || 30;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const lessonActivity = await prisma.lessonProgress.findMany({
      where: { userId, updatedAt: { gte: startDate } },
      select: { updatedAt: true, completed: true },
      orderBy: { updatedAt: 'asc' },
    });

    const quizActivity = await prisma.quizAttempt.findMany({
      where: { userId, createdAt: { gte: startDate } },
      select: { createdAt: true, correct: true },
      orderBy: { createdAt: 'asc' },
    });

    const dailyActivity: Record<string, { lessons: number; quizzes: number; correct: number }> = {};

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split('T')[0];
      dailyActivity[key] = { lessons: 0, quizzes: 0, correct: 0 };
    }

    lessonActivity.forEach((lp) => {
      const key = lp.updatedAt.toISOString().split('T')[0];
      if (dailyActivity[key] && lp.completed) {
        dailyActivity[key].lessons++;
      }
    });

    quizActivity.forEach((qa) => {
      const key = qa.createdAt.toISOString().split('T')[0];
      if (dailyActivity[key]) {
        dailyActivity[key].quizzes++;
        if (qa.correct) dailyActivity[key].correct++;
      }
    });

    const result = Object.entries(dailyActivity)
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date));

    res.json(paginate(result, page, limit));
  } catch (error) {
    console.error('Activity analytics error:', error);
    res.status(500).json(errorResponse('Không thể tải dữ liệu hoạt động', 'INTERNAL_ERROR'));
  }
});

export default router;
