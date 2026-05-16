import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const bookmarks = await prisma.flashcardProgress.findMany({
      where: { userId, bookmarked: true },
      include: {
        vocabulary: {
          include: {
            lesson: {
              include: { level: { include: { language: true } } },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    const result = bookmarks.map((b) => ({
      id: b.id,
      word: b.vocabulary.word,
      meaning: b.vocabulary.meaning,
      example: b.vocabulary.example,
      exampleMeaning: b.vocabulary.exampleMeaning,
      language: b.vocabulary.lesson.level.language.name,
      languageCode: b.vocabulary.lesson.level.language.code,
      lessonTitle: b.vocabulary.lesson.title,
      known: b.known,
      reviewCount: b.reviewCount,
    }));

    res.json(result);
  } catch (error) {
    console.error('Bookmarks error:', error);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
});

router.post('/:vocabularyId', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { vocabularyId } = req.params;

    const existing = await prisma.flashcardProgress.findUnique({
      where: { userId_vocabularyId: { userId, vocabularyId } },
    });

    if (existing) {
      const updated = await prisma.flashcardProgress.update({
        where: { id: existing.id },
        data: { bookmarked: !existing.bookmarked },
      });
      res.json({ bookmarked: updated.bookmarked });
    } else {
      await prisma.flashcardProgress.create({
        data: {
          userId,
          vocabularyId,
          bookmarked: true,
          known: false,
          reviewCount: 0,
          easeFactor: 2.5,
          interval: 0,
          nextReview: new Date(),
        },
      });
      res.json({ bookmarked: true });
    }
  } catch (error) {
    console.error('Toggle bookmark error:', error);
    res.status(500).json({ error: 'Failed to toggle bookmark' });
  }
});

router.delete('/:vocabularyId', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { vocabularyId } = req.params;

    await prisma.flashcardProgress.updateMany({
      where: { userId, vocabularyId },
      data: { bookmarked: false },
    });

    res.json({ bookmarked: false });
  } catch (error) {
    console.error('Remove bookmark error:', error);
    res.status(500).json({ error: 'Failed to remove bookmark' });
  }
});

export default router;
