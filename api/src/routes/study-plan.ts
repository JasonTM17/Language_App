import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        language: true,
        level: true,
      },
    });

    const plans = await Promise.all(
      enrollments.map(async (enrollment) => {
        const totalLessons = await prisma.lesson.count({
          where: { levelId: enrollment.levelId },
        });

        const completedLessons = await prisma.lessonProgress.count({
          where: {
            userId,
            lesson: { levelId: enrollment.levelId },
            completed: true,
          },
        });

        const dueCards = await prisma.flashcardProgress.count({
          where: {
            userId,
            vocabulary: { lesson: { levelId: enrollment.levelId } },
            nextReview: { lte: new Date() },
          },
        });

        const weakWords = await prisma.flashcardProgress.count({
          where: {
            userId,
            vocabulary: { lesson: { levelId: enrollment.levelId } },
            known: false,
          },
        });

        const nextLesson = await prisma.lesson.findFirst({
          where: {
            levelId: enrollment.levelId,
            NOT: {
              progress: { some: { userId, completed: true } },
            },
          },
          orderBy: { order: 'asc' },
        });

        return {
          languageCode: enrollment.language.code,
          languageName: enrollment.language.name,
          levelName: enrollment.level.name,
          goal: enrollment.goal,
          progress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
          totalLessons,
          completedLessons,
          dueCards,
          weakWords,
          nextLesson: nextLesson ? { id: nextLesson.id, title: nextLesson.title } : null,
          recommendations: generateRecommendations(completedLessons, totalLessons, dueCards, weakWords),
        };
      })
    );

    res.json(plans);
  } catch (error) {
    console.error('Study plan error:', error);
    res.status(500).json({ error: 'Failed to generate study plan' });
  }
});

function generateRecommendations(completed: number, total: number, dueCards: number, weakWords: number): string[] {
  const recs: string[] = [];

  if (dueCards > 0) {
    recs.push(`Ôn tập ${dueCards} thẻ flashcard đến hạn`);
  }

  if (weakWords > 5) {
    recs.push(`Luyện tập ${weakWords} từ yếu cần cải thiện`);
  }

  if (completed < total) {
    recs.push('Hoàn thành bài học tiếp theo');
  }

  if (completed > 0 && completed % 5 === 0) {
    recs.push('Làm bài quiz tổng hợp để củng cố kiến thức');
  }

  if (recs.length === 0) {
    recs.push('Tuyệt vời! Bạn đã hoàn thành tất cả bài học ở cấp độ này');
  }

  return recs;
}

export default router;
