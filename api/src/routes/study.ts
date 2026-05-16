import { Router } from 'express';
import { prisma } from '../database/client';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/word-of-the-day', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;

    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: { language: true },
    });

    const languageIds = enrollments.map(e => e.languageId);

    if (languageIds.length === 0) {
      return res.json({ words: [] });
    }

    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    const words = [];
    for (const enrollment of enrollments) {
      const vocabCount = await prisma.vocabulary.count({
        where: {
          lesson: {
            level: { languageId: enrollment.languageId },
          },
        },
      });

      if (vocabCount === 0) continue;

      const skip = seed % vocabCount;
      const word = await prisma.vocabulary.findFirst({
        where: {
          lesson: {
            level: { languageId: enrollment.languageId },
          },
        },
        skip,
        include: {
          lesson: {
            include: {
              level: {
                include: { language: true },
              },
            },
          },
        },
      });

      if (word) {
        words.push({
          id: word.id,
          word: word.word,
          reading: word.reading,
          meaning: word.meaning,
          example: word.example,
          exampleMeaning: word.exampleMeaning,
          language: {
            code: word.lesson.level.language.code,
            name: word.lesson.level.language.name,
            flag: word.lesson.level.language.flag,
          },
        });
      }
    }

    res.json({ words, date: today.toISOString().split('T')[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get word of the day' });
  }
});

router.get('/review-forecast', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;

    const progress = await prisma.flashcardProgress.findMany({
      where: { userId },
      include: {
        vocabulary: {
          include: {
            lesson: {
              include: {
                level: { include: { language: true } },
              },
            },
          },
        },
      },
    });

    const forecast: Record<string, number> = {};
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      forecast[dateStr] = 0;
    }

    progress.forEach((p) => {
      if (p.nextReview) {
        const reviewDate = new Date(p.nextReview).toISOString().split('T')[0];
        if (forecast[reviewDate] !== undefined) {
          forecast[reviewDate]++;
        }
      }
    });

    const dueToday = progress.filter(
      (p) => !p.nextReview || new Date(p.nextReview) <= today
    ).length;

    res.json({
      forecast,
      dueToday,
      totalCards: progress.length,
      masteredCards: progress.filter((p) => p.easeFactor >= 2.5 && p.reviewCount >= 3).length,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get review forecast' });
  }
});

router.post('/bookmarks/:vocabId', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const { vocabId } = req.params;

    const existing = await prisma.flashcardProgress.findFirst({
      where: { userId, vocabularyId: vocabId },
    });

    if (existing) {
      await prisma.flashcardProgress.update({
        where: { id: existing.id },
        data: { bookmarked: true },
      });
    } else {
      await prisma.flashcardProgress.create({
        data: {
          userId,
          vocabularyId: vocabId,
          bookmarked: true,
          easeFactor: 2.5,
          interval: 0,
          reviewCount: 0,
        },
      });
    }

    res.json({ success: true, bookmarked: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to bookmark word' });
  }
});

router.delete('/bookmarks/:vocabId', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const { vocabId } = req.params;

    await prisma.flashcardProgress.updateMany({
      where: { userId, vocabularyId: vocabId },
      data: { bookmarked: false },
    });

    res.json({ success: true, bookmarked: false });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove bookmark' });
  }
});

router.get('/bookmarks', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;

    const bookmarks = await prisma.flashcardProgress.findMany({
      where: { userId, bookmarked: true },
      include: {
        vocabulary: {
          include: {
            lesson: {
              include: {
                level: { include: { language: true } },
              },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    const words = bookmarks.map((b) => ({
      id: b.vocabulary.id,
      word: b.vocabulary.word,
      reading: b.vocabulary.reading,
      meaning: b.vocabulary.meaning,
      example: b.vocabulary.example,
      exampleMeaning: b.vocabulary.exampleMeaning,
      language: {
        code: b.vocabulary.lesson.level.language.code,
        name: b.vocabulary.lesson.level.language.name,
        flag: b.vocabulary.lesson.level.language.flag,
      },
    }));

    res.json({ bookmarks: words });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get bookmarks' });
  }
});

export default router;
