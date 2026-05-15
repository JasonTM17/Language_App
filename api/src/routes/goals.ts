import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

const goalsSchema = z.object({
  targetMinutes: z.number().int().min(5).max(120).optional(),
  lessonsTarget: z.number().int().min(1).max(20).optional(),
  cardsTarget: z.number().int().min(5).max(100).optional(),
});

// Get today's goal
router.get('/today', authenticate, async (req: AuthRequest, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let goal = await prisma.dailyGoal.findUnique({
      where: { userId_date: { userId: req.userId!, date: today } },
    });

    if (!goal) {
      const user = await prisma.user.findUnique({ where: { id: req.userId! } });
      goal = await prisma.dailyGoal.create({
        data: {
          userId: req.userId!,
          date: today,
          targetMinutes: user?.dailyGoal || 10,
          lessonsTarget: 3,
          cardsTarget: 10,
        },
      });
    }

    res.json({ goal });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch daily goal' });
  }
});

// Update today's goal progress
router.post('/update', authenticate, async (req: AuthRequest, res) => {
  try {
    const { targetMinutes, lessonsTarget, cardsTarget } = goalsSchema.parse(req.body);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const goal = await prisma.dailyGoal.upsert({
      where: { userId_date: { userId: req.userId!, date: today } },
      update: {
        ...(targetMinutes !== undefined && { targetMinutes }),
        ...(lessonsTarget !== undefined && { lessonsTarget }),
        ...(cardsTarget !== undefined && { cardsTarget }),
      },
      create: {
        userId: req.userId!,
        date: today,
        targetMinutes: targetMinutes || 10,
        lessonsTarget: lessonsTarget || 3,
        cardsTarget: cardsTarget || 10,
      },
    });

    res.json({ goal });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to update daily goal' });
  }
});

// Get goal history (last 30 days)
router.get('/history', authenticate, async (req: AuthRequest, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const goals = await prisma.dailyGoal.findMany({
      where: {
        userId: req.userId!,
        date: { gte: thirtyDaysAgo },
      },
      orderBy: { date: 'desc' },
    });

    const completedDays = goals.filter((g) => g.completed).length;
    const totalDays = goals.length;

    res.json({ goals, completedDays, totalDays });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch goal history' });
  }
});

export default router;
