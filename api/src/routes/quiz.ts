import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';
import { awardXP } from '../services/gamification';

const router = Router();

const attemptSchema = z.object({
  answer: z.string().min(1),
  timeSpent: z.number().int().min(0).optional(),
});

router.get('/lesson/:lessonId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      where: { lessonId: req.params.lessonId },
    });
    res.json({ quizzes });
  } catch {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

router.get('/practice', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { language, limit } = req.query;
    const take = Math.min(Number(limit) || 10, 20);

    const where: any = {};
    if (language) {
      const lang = await prisma.language.findUnique({
        where: { code: language as string },
        include: { levels: { include: { lessons: { select: { id: true } } } } },
      });
      if (lang) {
        const lessonIds = lang.levels.flatMap(l => l.lessons.map(les => les.id));
        where.lessonId = { in: lessonIds };
      }
    }

    const totalCount = await prisma.quiz.count({ where });
    const skip = Math.max(0, Math.floor(Math.random() * (totalCount - take)));

    const quizzes = await prisma.quiz.findMany({
      where,
      skip,
      take,
    });

    res.json({ quizzes, total: totalCount });
  } catch {
    res.status(500).json({ error: 'Failed to fetch practice quizzes' });
  }
});

router.post('/:id/attempt', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { answer, timeSpent } = attemptSchema.parse(req.body);
    const quiz = await prisma.quiz.findUnique({ where: { id: req.params.id } });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const correct = quiz.answer === answer;
    const attempt = await prisma.quizAttempt.create({
      data: { userId: req.userId!, quizId: quiz.id, answer, correct, timeSpent: timeSpent || 0 },
    });

    if (correct) {
      await awardXP(req.userId!, 5);
    }

    res.json({ attempt, correct, explanation: quiz.explanation });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to submit answer' });
  }
});

export default router;
