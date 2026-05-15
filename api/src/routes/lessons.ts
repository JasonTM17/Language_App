import { Router, Request, Response } from 'express';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { languageCode, levelId } = req.query;
    const where: any = {};

    if (levelId) {
      where.levelId = levelId;
    } else if (languageCode) {
      const language = await prisma.language.findUnique({
        where: { code: languageCode as string },
        include: { levels: true },
      });
      if (language) {
        where.levelId = { in: language.levels.map(l => l.id) };
      }
    }

    const lessons = await prisma.lesson.findMany({
      where,
      orderBy: { order: 'asc' },
      include: {
        level: { include: { language: true } },
        progress: { where: { userId: req.userId! } },
      },
    });
    res.json({ lessons });
  } catch {
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.id },
      include: {
        vocabulary: true,
        quizzes: true,
        level: { include: { language: true } },
        progress: { where: { userId: req.userId! } },
      },
    });
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json({ lesson });
  } catch {
    res.status(500).json({ error: 'Failed to fetch lesson' });
  }
});

router.post('/:id/complete', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { score, timeSpent } = req.body;
    const lesson = await prisma.lesson.findUnique({ where: { id: req.params.id } });
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: req.userId!, lessonId: lesson.id } },
      update: { completed: true, score, timeSpent, completedAt: new Date() },
      create: { userId: req.userId!, lessonId: lesson.id, completed: true, score, timeSpent, completedAt: new Date() },
    });

    await prisma.user.update({
      where: { id: req.userId! },
      data: { xp: { increment: lesson.xpReward } },
    });

    res.json({ progress });
  } catch {
    res.status(500).json({ error: 'Failed to complete lesson' });
  }
});

export default router;
