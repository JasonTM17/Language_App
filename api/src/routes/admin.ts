import { Router, Response } from 'express';
import prisma from '../database/client';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.use(requireAdmin);

router.get('/stats', async (_req: AuthRequest, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalLessons = await prisma.lesson.count();
    const totalVocabulary = await prisma.vocabulary.count();
    const totalQuizzes = await prisma.quiz.count();
    const totalEnrollments = await prisma.enrollment.count();

    res.json({ stats: { totalUsers, totalLessons, totalVocabulary, totalQuizzes, totalEnrollments } });
  } catch {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

router.get('/users', async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const users = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: { id: true, email: true, name: true, role: true, xp: true, level: true, streak: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
    const total = await prisma.user.count();
    res.json({ users, total, page, limit });
  } catch {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/lessons', async (req: AuthRequest, res: Response) => {
  try {
    const lessons = await prisma.lesson.findMany({
      include: { level: { include: { language: true } }, vocabulary: { select: { id: true } }, quizzes: { select: { id: true } } },
      orderBy: { order: 'asc' },
    });
    res.json({ lessons });
  } catch {
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

router.post('/lessons', async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, order, levelId, type, content, duration, xpReward } = req.body;
    const lesson = await prisma.lesson.create({
      data: { title, description, order, levelId, type, content: JSON.stringify(content), duration, xpReward },
    });
    res.status(201).json({ lesson });
  } catch {
    res.status(500).json({ error: 'Failed to create lesson' });
  }
});

router.put('/lessons/:id', async (req: AuthRequest, res: Response) => {
  try {
    const lesson = await prisma.lesson.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ lesson });
  } catch {
    res.status(500).json({ error: 'Failed to update lesson' });
  }
});

router.delete('/lessons/:id', async (req: AuthRequest, res: Response) => {
  try {
    await prisma.lesson.delete({ where: { id: req.params.id } });
    res.json({ message: 'Lesson deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete lesson' });
  }
});

export default router;
