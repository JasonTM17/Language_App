import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req, res) => {
  const { q, lang } = req.query;

  if (!q || typeof q !== 'string' || q.trim().length < 2) {
    return res.json({ results: [], query: q || '' });
  }

  const query = q.toLowerCase().trim();
  const prisma = req.app.locals.prisma;

  const vocabulary = await prisma.vocabulary.findMany({
    where: {
      OR: [
        { word: { contains: query } },
        { meaning: { contains: query } },
      ],
      ...(lang && typeof lang === 'string' ? {
        lesson: {
          level: {
            language: { code: lang }
          }
        }
      } : {}),
    },
    include: {
      lesson: {
        include: {
          level: {
            include: { language: true }
          }
        }
      }
    },
    take: 20,
  });

  const results = vocabulary.map((v: any) => ({
    id: v.id,
    word: v.word,
    meaning: v.meaning,
    example: v.example,
    exampleMeaning: v.exampleMeaning,
    language: v.lesson?.level?.language?.name || 'Unknown',
    languageCode: v.lesson?.level?.language?.code || '',
    level: v.lesson?.level?.name || '',
    lesson: v.lesson?.title || '',
  }));

  res.json({ results, query: q, total: results.length });
});

export default router;
