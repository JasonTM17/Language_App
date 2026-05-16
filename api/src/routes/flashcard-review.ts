import { Router } from 'express';
import { prisma } from '../database/client';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/weak', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const limit = parseInt(req.query.limit as string) || 20;

    const weakWords = await prisma.flashcardProgress.findMany({
      where: {
        userId,
        known: false,
        reviewCount: { gt: 0 },
      },
      include: {
        vocabulary: true,
      },
      orderBy: [
        { easeFactor: 'asc' },
        { nextReview: 'asc' },
      ],
      take: limit,
    });

    res.json(weakWords);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weak words' });
  }
});

router.get('/due', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const now = new Date();

    const dueCards = await prisma.flashcardProgress.findMany({
      where: {
        userId,
        nextReview: { lte: now },
      },
      include: {
        vocabulary: true,
      },
      orderBy: { nextReview: 'asc' },
      take: 30,
    });

    res.json(dueCards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch due cards' });
  }
});

router.post('/review', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const { vocabularyId, quality } = req.body;

    if (!vocabularyId || quality === undefined) {
      return res.status(400).json({ error: 'vocabularyId and quality (0-5) are required' });
    }

    const existing = await prisma.flashcardProgress.findFirst({
      where: { userId, vocabularyId },
    });

    const q = Math.max(0, Math.min(5, quality));
    const now = new Date();

    if (existing) {
      let newEase = existing.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
      newEase = Math.max(1.3, newEase);

      let newInterval = existing.interval;
      if (q < 3) {
        newInterval = 1;
      } else if (existing.reviewCount === 0) {
        newInterval = 1;
      } else if (existing.reviewCount === 1) {
        newInterval = 6;
      } else {
        newInterval = Math.round(existing.interval * newEase);
      }

      const nextReview = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000);

      const updated = await prisma.flashcardProgress.update({
        where: { id: existing.id },
        data: {
          reviewCount: { increment: 1 },
          easeFactor: newEase,
          interval: newInterval,
          nextReview,
          known: q >= 4 && existing.reviewCount >= 3,
        },
      });
      res.json(updated);
    } else {
      const nextReview = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const created = await prisma.flashcardProgress.create({
        data: {
          userId,
          vocabularyId,
          reviewCount: 1,
          easeFactor: 2.5,
          interval: 1,
          nextReview,
          known: false,
        },
      });
      res.json(created);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to record review' });
  }
});

router.get('/stats', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;

    const total = await prisma.flashcardProgress.count({ where: { userId } });
    const mastered = await prisma.flashcardProgress.count({ where: { userId, known: true } });
    const learning = await prisma.flashcardProgress.count({ where: { userId, known: false, reviewCount: { gt: 0 } } });

    const now = new Date();
    const dueCount = await prisma.flashcardProgress.count({
      where: { userId, nextReview: { lte: now } },
    });

    res.json({ total, mastered, learning, dueCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
