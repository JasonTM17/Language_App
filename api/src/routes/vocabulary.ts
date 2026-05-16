import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

const reviewSchema = z.object({
  known: z.boolean().optional(),
  quality: z.number().min(0).max(5).optional(),
});

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { lessonId, due } = req.query;
    const where: any = {};
    if (lessonId) where.lessonId = lessonId;

    const vocabulary = await prisma.vocabulary.findMany({
      where,
      include: {
        flashcardProgress: { where: { userId: req.userId! } },
      },
    });

    if (due === 'true') {
      const now = new Date();
      const dueCards = vocabulary.filter((v: any) => {
        const progress = v.flashcardProgress[0];
        if (!progress) return true;
        return new Date(progress.nextReview) <= now;
      });
      return res.json({ vocabulary: dueCards, total: vocabulary.length, due: dueCards.length });
    }

    res.json({ vocabulary });
  } catch {
    res.status(500).json({ error: 'Failed to fetch vocabulary' });
  }
});

router.post('/:id/review', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { known, quality } = reviewSchema.parse(req.body);
    const vocab = await prisma.vocabulary.findUnique({ where: { id: req.params.id } });
    if (!vocab) return res.status(404).json({ error: 'Vocabulary not found' });

    const existing = await prisma.flashcardProgress.findUnique({
      where: { userId_vocabularyId: { userId: req.userId!, vocabularyId: vocab.id } },
    });

    const q = quality !== undefined ? quality : (known ? 4 : 1);
    const now = new Date();

    let easeFactor = existing?.easeFactor || 2.5;
    let interval = existing?.interval || 1;
    const reviewCount = (existing?.reviewCount || 0) + 1;

    easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    easeFactor = Math.max(1.3, easeFactor);

    if (q < 3) {
      interval = 1;
    } else if (reviewCount === 1) {
      interval = 1;
    } else if (reviewCount === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }

    const nextReview = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);
    const isKnown = q >= 4 && reviewCount >= 3;

    const progress = await prisma.flashcardProgress.upsert({
      where: { userId_vocabularyId: { userId: req.userId!, vocabularyId: vocab.id } },
      update: { known: isKnown, reviewCount, nextReview, easeFactor, interval },
      create: { userId: req.userId!, vocabularyId: vocab.id, known: isKnown, nextReview, easeFactor, interval },
    });

    res.json({ progress, nextReview, interval, easeFactor, quality: q });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to update review' });
  }
});

export default router;
