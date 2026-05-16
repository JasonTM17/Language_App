import { Router, Response } from 'express';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';
import { paginate, errorResponse } from '../types/responses';

const router = Router();

interface SkillNode {
  id: string;
  lessonId?: string;
  name: string;
  nameVi: string;
  icon: string;
  level: number;
  maxLevel: number;
  xpRequired: number;
  position: { row: number; col: number };
  dependencies: string[];
  status: 'locked' | 'available' | 'in_progress' | 'completed' | 'mastered';
  decayLevel?: number;
}

const SKILL_TREES: Record<string, Record<string, SkillNode[]>> = {
  en: {
    beginner: [
      { id: 'en-greetings', name: 'Greetings', nameVi: 'Chào hỏi', icon: '👋', level: 0, maxLevel: 5, xpRequired: 0, position: { row: 0, col: 1 }, dependencies: [], status: 'available' },
      { id: 'en-numbers', name: 'Numbers', nameVi: 'Số đếm', icon: '🔢', level: 0, maxLevel: 5, xpRequired: 25, position: { row: 1, col: 0 }, dependencies: ['en-greetings'], status: 'locked' },
      { id: 'en-colors', name: 'Colors', nameVi: 'Màu sắc', icon: '🎨', level: 0, maxLevel: 5, xpRequired: 25, position: { row: 1, col: 2 }, dependencies: ['en-greetings'], status: 'locked' },
      { id: 'en-family', name: 'Family', nameVi: 'Gia đình', icon: '👨‍👩‍👧', level: 0, maxLevel: 5, xpRequired: 50, position: { row: 2, col: 1 }, dependencies: ['en-numbers', 'en-colors'], status: 'locked' },
      { id: 'en-food', name: 'Food', nameVi: 'Thức ăn', icon: '🍜', level: 0, maxLevel: 5, xpRequired: 75, position: { row: 3, col: 0 }, dependencies: ['en-family'], status: 'locked' },
      { id: 'en-animals', name: 'Animals', nameVi: 'Động vật', icon: '🐕', level: 0, maxLevel: 5, xpRequired: 75, position: { row: 3, col: 2 }, dependencies: ['en-family'], status: 'locked' },
      { id: 'en-daily', name: 'Daily Life', nameVi: 'Sinh hoạt', icon: '🏠', level: 0, maxLevel: 5, xpRequired: 100, position: { row: 4, col: 1 }, dependencies: ['en-food', 'en-animals'], status: 'locked' },
      { id: 'en-travel', name: 'Travel', nameVi: 'Du lịch', icon: '✈️', level: 0, maxLevel: 5, xpRequired: 125, position: { row: 5, col: 0 }, dependencies: ['en-daily'], status: 'locked' },
      { id: 'en-shopping', name: 'Shopping', nameVi: 'Mua sắm', icon: '🛒', level: 0, maxLevel: 5, xpRequired: 125, position: { row: 5, col: 2 }, dependencies: ['en-daily'], status: 'locked' },
    ],
    elementary: [
      { id: 'en-weather', name: 'Weather', nameVi: 'Thời tiết', icon: '🌤️', level: 0, maxLevel: 5, xpRequired: 150, position: { row: 0, col: 1 }, dependencies: [], status: 'locked' },
      { id: 'en-hobbies', name: 'Hobbies', nameVi: 'Sở thích', icon: '🎮', level: 0, maxLevel: 5, xpRequired: 175, position: { row: 1, col: 0 }, dependencies: ['en-weather'], status: 'locked' },
      { id: 'en-health', name: 'Health', nameVi: 'Sức khỏe', icon: '🏥', level: 0, maxLevel: 5, xpRequired: 175, position: { row: 1, col: 2 }, dependencies: ['en-weather'], status: 'locked' },
      { id: 'en-work', name: 'Work', nameVi: 'Công việc', icon: '💼', level: 0, maxLevel: 5, xpRequired: 200, position: { row: 2, col: 1 }, dependencies: ['en-hobbies', 'en-health'], status: 'locked' },
      { id: 'en-emotions', name: 'Emotions', nameVi: 'Cảm xúc', icon: '😊', level: 0, maxLevel: 5, xpRequired: 225, position: { row: 3, col: 0 }, dependencies: ['en-work'], status: 'locked' },
      { id: 'en-technology', name: 'Technology', nameVi: 'Công nghệ', icon: '💻', level: 0, maxLevel: 5, xpRequired: 225, position: { row: 3, col: 2 }, dependencies: ['en-work'], status: 'locked' },
    ],
    intermediate: [
      { id: 'en-business', name: 'Business', nameVi: 'Kinh doanh', icon: '📊', level: 0, maxLevel: 5, xpRequired: 300, position: { row: 0, col: 1 }, dependencies: [], status: 'locked' },
      { id: 'en-culture', name: 'Culture', nameVi: 'Văn hóa', icon: '🎭', level: 0, maxLevel: 5, xpRequired: 325, position: { row: 1, col: 0 }, dependencies: ['en-business'], status: 'locked' },
      { id: 'en-environment', name: 'Environment', nameVi: 'Môi trường', icon: '🌍', level: 0, maxLevel: 5, xpRequired: 325, position: { row: 1, col: 2 }, dependencies: ['en-business'], status: 'locked' },
      { id: 'en-media', name: 'Media', nameVi: 'Truyền thông', icon: '📰', level: 0, maxLevel: 5, xpRequired: 350, position: { row: 2, col: 1 }, dependencies: ['en-culture', 'en-environment'], status: 'locked' },
    ],
  },
  ja: {
    beginner: [
      { id: 'ja-hiragana', name: 'Hiragana', nameVi: 'Hiragana', icon: 'あ', level: 0, maxLevel: 5, xpRequired: 0, position: { row: 0, col: 1 }, dependencies: [], status: 'available' },
      { id: 'ja-katakana', name: 'Katakana', nameVi: 'Katakana', icon: 'ア', level: 0, maxLevel: 5, xpRequired: 25, position: { row: 1, col: 0 }, dependencies: ['ja-hiragana'], status: 'locked' },
      { id: 'ja-greetings', name: 'Greetings', nameVi: 'Chào hỏi', icon: '🙇', level: 0, maxLevel: 5, xpRequired: 25, position: { row: 1, col: 2 }, dependencies: ['ja-hiragana'], status: 'locked' },
      { id: 'ja-numbers', name: 'Numbers', nameVi: 'Số đếm', icon: '🔢', level: 0, maxLevel: 5, xpRequired: 50, position: { row: 2, col: 1 }, dependencies: ['ja-katakana', 'ja-greetings'], status: 'locked' },
      { id: 'ja-food', name: 'Food', nameVi: 'Thức ăn', icon: '🍣', level: 0, maxLevel: 5, xpRequired: 75, position: { row: 3, col: 0 }, dependencies: ['ja-numbers'], status: 'locked' },
      { id: 'ja-family', name: 'Family', nameVi: 'Gia đình', icon: '👨‍👩‍👧', level: 0, maxLevel: 5, xpRequired: 75, position: { row: 3, col: 2 }, dependencies: ['ja-numbers'], status: 'locked' },
      { id: 'ja-daily', name: 'Daily Life', nameVi: 'Sinh hoạt', icon: '🏠', level: 0, maxLevel: 5, xpRequired: 100, position: { row: 4, col: 1 }, dependencies: ['ja-food', 'ja-family'], status: 'locked' },
    ],
  },
  zh: {
    beginner: [
      { id: 'zh-pinyin', name: 'Pinyin', nameVi: 'Bính âm', icon: '🔤', level: 0, maxLevel: 5, xpRequired: 0, position: { row: 0, col: 1 }, dependencies: [], status: 'available' },
      { id: 'zh-tones', name: 'Tones', nameVi: 'Thanh điệu', icon: '🎵', level: 0, maxLevel: 5, xpRequired: 25, position: { row: 1, col: 0 }, dependencies: ['zh-pinyin'], status: 'locked' },
      { id: 'zh-greetings', name: 'Greetings', nameVi: 'Chào hỏi', icon: '🙏', level: 0, maxLevel: 5, xpRequired: 25, position: { row: 1, col: 2 }, dependencies: ['zh-pinyin'], status: 'locked' },
      { id: 'zh-numbers', name: 'Numbers', nameVi: 'Số đếm', icon: '🔢', level: 0, maxLevel: 5, xpRequired: 50, position: { row: 2, col: 1 }, dependencies: ['zh-tones', 'zh-greetings'], status: 'locked' },
      { id: 'zh-food', name: 'Food', nameVi: 'Thức ăn', icon: '🥟', level: 0, maxLevel: 5, xpRequired: 75, position: { row: 3, col: 0 }, dependencies: ['zh-numbers'], status: 'locked' },
      { id: 'zh-family', name: 'Family', nameVi: 'Gia đình', icon: '👨‍👩‍👧', level: 0, maxLevel: 5, xpRequired: 75, position: { row: 3, col: 2 }, dependencies: ['zh-numbers'], status: 'locked' },
      { id: 'zh-daily', name: 'Daily Life', nameVi: 'Sinh hoạt', icon: '🏠', level: 0, maxLevel: 5, xpRequired: 100, position: { row: 4, col: 1 }, dependencies: ['zh-food', 'zh-family'], status: 'locked' },
    ],
  },
  ko: {
    beginner: [
      { id: 'ko-hangul', name: 'Hangul', nameVi: 'Bảng chữ Hangul', icon: '한', level: 0, maxLevel: 5, xpRequired: 0, position: { row: 0, col: 1 }, dependencies: [], status: 'available' },
      { id: 'ko-greetings', name: 'Greetings', nameVi: 'Chào hỏi', icon: '🙇', level: 0, maxLevel: 5, xpRequired: 25, position: { row: 1, col: 0 }, dependencies: ['ko-hangul'], status: 'locked' },
      { id: 'ko-numbers', name: 'Numbers', nameVi: 'Số đếm', icon: '🔢', level: 0, maxLevel: 5, xpRequired: 25, position: { row: 1, col: 2 }, dependencies: ['ko-hangul'], status: 'locked' },
      { id: 'ko-food', name: 'Food', nameVi: 'Thức ăn', icon: '🍲', level: 0, maxLevel: 5, xpRequired: 50, position: { row: 2, col: 1 }, dependencies: ['ko-greetings', 'ko-numbers'], status: 'locked' },
      { id: 'ko-family', name: 'Family', nameVi: 'Gia đình', icon: '👨‍👩‍👧', level: 0, maxLevel: 5, xpRequired: 75, position: { row: 3, col: 0 }, dependencies: ['ko-food'], status: 'locked' },
      { id: 'ko-daily', name: 'Daily Life', nameVi: 'Sinh hoạt', icon: '🏠', level: 0, maxLevel: 5, xpRequired: 75, position: { row: 3, col: 2 }, dependencies: ['ko-food'], status: 'locked' },
    ],
  },
};

const DECAY_DAYS = 14;

function calculateDecay(lastPracticed: Date | null): number {
  if (!lastPracticed) return 0;
  const daysSince = Math.floor((Date.now() - lastPracticed.getTime()) / (1000 * 60 * 60 * 24));
  if (daysSince <= 3) return 0;
  if (daysSince <= 7) return 1;
  if (daysSince <= DECAY_DAYS) return 2;
  return 3;
}

router.get('/:lang', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { lang } = req.params;
    const { level = 'beginner' } = req.query;
    const levelStr = String(level);

    const tree = SKILL_TREES[lang]?.[levelStr];
    if (!tree) {
      return res.status(404).json(errorResponse('Cây kỹ năng không tồn tại cho ngôn ngữ này', 'NOT_FOUND'));
    }

    const userProgress = await prisma.lessonProgress.findMany({
      where: { userId: req.userId! },
      include: { lesson: { select: { topic: true } } },
    });

    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: { xp: true },
    });

    const completedTopics = new Set(
      userProgress.filter(p => p.completed && p.lesson.topic).map(p => p.lesson.topic!.toLowerCase())
    );

    const enrichedTree: SkillNode[] = tree.map(node => {
      const topicName = node.name.toLowerCase();
      const isCompleted = completedTopics.has(topicName);
      const hasEnoughXp = (user?.xp || 0) >= node.xpRequired;

      const depsCompleted = node.dependencies.every(depId => {
        const depNode = tree.find(n => n.id === depId);
        if (!depNode) return true;
        return completedTopics.has(depNode.name.toLowerCase());
      });

      let status: SkillNode['status'] = 'locked';
      if (isCompleted) {
        status = 'mastered';
      } else if (depsCompleted && hasEnoughXp) {
        status = 'available';
      } else if (depsCompleted && !hasEnoughXp) {
        status = 'locked';
      }

      const progress = userProgress.find(p => p.lesson.topic?.toLowerCase() === topicName);
      const decayLevel = progress?.updatedAt ? calculateDecay(progress.updatedAt) : undefined;

      return { ...node, status, decayLevel };
    });

    const totalNodes = enrichedTree.length;
    const completedNodes = enrichedTree.filter(n => n.status === 'mastered').length;
    const decayingNodes = enrichedTree.filter(n => (n.decayLevel || 0) > 0).length;

    res.json({
      tree: enrichedTree,
      language: lang,
      level: levelStr,
      progress: {
        completed: completedNodes,
        total: totalNodes,
        percentage: Math.round((completedNodes / totalNodes) * 100),
        decaying: decayingNodes,
      },
    });
  } catch {
    res.status(500).json(errorResponse('Lỗi khi tải cây kỹ năng', 'INTERNAL_ERROR'));
  }
});

router.get('/:lang/recommendations', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { lang } = req.params;
    const tree = SKILL_TREES[lang]?.['beginner'] || [];

    const userProgress = await prisma.lessonProgress.findMany({
      where: { userId: req.userId! },
      include: { lesson: { select: { topic: true } } },
    });

    const completedTopics = new Set(
      userProgress.filter(p => p.completed && p.lesson.topic).map(p => p.lesson.topic!.toLowerCase())
    );

    const available = tree.filter(node => {
      if (completedTopics.has(node.name.toLowerCase())) return false;
      return node.dependencies.every(depId => {
        const dep = tree.find(n => n.id === depId);
        return dep ? completedTopics.has(dep.name.toLowerCase()) : true;
      });
    });

    const decaying = tree.filter(node => {
      if (!completedTopics.has(node.name.toLowerCase())) return false;
      const progress = userProgress.find(p => p.lesson.topic?.toLowerCase() === node.name.toLowerCase());
      return progress?.updatedAt ? calculateDecay(progress.updatedAt) > 0 : false;
    });

    res.json({
      nextSkills: available.slice(0, 3).map(n => ({ id: n.id, name: n.name, nameVi: n.nameVi, icon: n.icon })),
      reviewSkills: decaying.slice(0, 3).map(n => ({ id: n.id, name: n.name, nameVi: n.nameVi, icon: n.icon, reason: 'Kỹ năng đang suy giảm, cần ôn tập!' })),
    });
  } catch {
    res.status(500).json(errorResponse('Lỗi khi tải đề xuất', 'INTERNAL_ERROR'));
  }
});

export default router;
