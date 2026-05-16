import { Router, Request, Response } from 'express';
import { prisma } from '../database/seeds/utils';
import { authenticate } from '../middleware/auth';

const router = Router();

const HEART_REFILL_MINUTES = 30;
const MAX_HEARTS = 5;

router.get('/', authenticate, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { hearts: true, heartsMax: true, heartsRefilledAt: true, gems: true },
  });

  if (!user) return res.status(404).json({ error: 'User not found' });

  const now = new Date();
  const lastRefill = new Date(user.heartsRefilledAt);
  const minutesPassed = Math.floor((now.getTime() - lastRefill.getTime()) / 60000);
  const heartsToAdd = Math.floor(minutesPassed / HEART_REFILL_MINUTES);

  let currentHearts = user.hearts;
  if (heartsToAdd > 0 && currentHearts < user.heartsMax) {
    currentHearts = Math.min(user.heartsMax, currentHearts + heartsToAdd);
    await prisma.user.update({
      where: { id: userId },
      data: { hearts: currentHearts, heartsRefilledAt: now },
    });
  }

  const nextRefillIn = currentHearts >= user.heartsMax
    ? null
    : HEART_REFILL_MINUTES - (minutesPassed % HEART_REFILL_MINUTES);

  res.json({
    hearts: currentHearts,
    maxHearts: user.heartsMax,
    gems: user.gems,
    nextRefillInMinutes: nextRefillIn,
  });
});

router.post('/lose', authenticate, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (user.hearts <= 0) {
    return res.status(400).json({ error: 'No hearts remaining', hearts: 0 });
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { hearts: user.hearts - 1 },
  });

  res.json({ hearts: updated.hearts, maxHearts: updated.heartsMax });
});

router.post('/refill', authenticate, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const REFILL_COST = 50;
  if (user.gems < REFILL_COST) {
    return res.status(400).json({ error: 'Not enough gems', required: REFILL_COST, current: user.gems });
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      hearts: user.heartsMax,
      gems: user.gems - REFILL_COST,
      heartsRefilledAt: new Date(),
    },
  });

  res.json({ hearts: updated.hearts, gems: updated.gems });
});

router.post('/earn-gems', authenticate, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { amount, reason } = req.body;

  if (!amount || amount <= 0 || amount > 100) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { gems: { increment: amount } },
  });

  res.json({ gems: updated.gems, earned: amount, reason });
});

export default router;
