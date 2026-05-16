import { Router, Request, Response } from 'express';
import prisma from '../database/client';
import { authenticate } from '../middleware/auth';
import { paginateQuery, errorResponse } from '../types/responses';

const router = Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const { skip, take } = paginateQuery(page, limit);

    const [bookmarks, total] = await Promise.all([
      prisma.flashcardProgress.findMany({
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
        skip,
        take,
      }),
      prisma.flashcardProgress.count({ where: { userId, bookmarked: true } }),
    ]);

    const data = bookmarks.map((b) => ({
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

    const totalPages = Math.ceil(total / limit);
    res.json({ data, pagination: { page, limit, total, totalPages } });
  } catch (error) {
    console.error('Bookmarks error:', error);
    res.status(500).json(errorResponse('Không thể tải danh sách đánh dấu', 'INTERNAL_ERROR'));
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
    res.status(500).json(errorResponse('Không thể cập nhật đánh dấu', 'INTERNAL_ERROR'));
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
    res.status(500).json(errorResponse('Không thể xóa đánh dấu', 'INTERNAL_ERROR'));
  }
});

export default router;
