import { Router, Response } from 'express';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/dashboard', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: { xp: true, level: true, streak: true, lastActiveAt: true },
    });

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.userId!, isActive: true },
      include: { language: true, level: true },
    });

    const completedLessons = await prisma.lessonProgress.count({
      where: { userId: req.userId!, completed: true },
    });

    const totalQuizAttempts = await prisma.quizAttempt.count({
      where: { userId: req.userId! },
    });

    const correctQuizAttempts = await prisma.quizAttempt.count({
      where: { userId: req.userId!, correct: true },
    });

    const recentProgress = await prisma.lessonProgress.findMany({
      where: { userId: req.userId! },
      orderBy: { updatedAt: 'desc' },
      take: 10,
      include: { lesson: { include: { level: { include: { language: true } } } } },
    });

    res.json({
      stats: {
        xp: user?.xp || 0,
        level: user?.level || 1,
        streak: user?.streak || 0,
        completedLessons,
        quizAccuracy: totalQuizAttempts > 0 ? Math.round((correctQuizAttempts / totalQuizAttempts) * 100) : 0,
      },
      enrollments,
      recentProgress,
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch dashboard' });
  }
});

router.get('/streak', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId! } });
    const lastActive = user?.lastActiveAt ? new Date(user.lastActiveAt) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = user?.streak || 0;
    if (lastActive) {
      const lastActiveDay = new Date(lastActive);
      lastActiveDay.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((today.getTime() - lastActiveDay.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 1) streak = 0;
    }

    res.json({ streak });
  } catch {
    res.status(500).json({ error: 'Failed to fetch streak' });
  }
});

export default router;
