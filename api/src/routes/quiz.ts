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
