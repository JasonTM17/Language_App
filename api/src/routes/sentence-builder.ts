import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

interface SentenceExercise {
  id: string;
  words: string[];
  correctOrder: string[];
  translation: string;
  hint: string;
  difficulty: string;
}

const exercises: Record<string, SentenceExercise[]> = {
  en: [
    { id: 'en-1', words: ['school', 'I', 'to', 'go', 'every', 'day'], correctOrder: ['I', 'go', 'to', 'school', 'every', 'day'], translation: 'Tôi đi học mỗi ngày.', hint: 'S + V + to + place + time', difficulty: 'easy' },
    { id: 'en-2', words: ['is', 'she', 'beautiful', 'very'], correctOrder: ['she', 'is', 'very', 'beautiful'], translation: 'Cô ấy rất đẹp.', hint: 'S + be + adv + adj', difficulty: 'easy' },
    { id: 'en-3', words: ['like', 'I', 'coffee', "don't"], correctOrder: ['I', "don't", 'like', 'coffee'], translation: 'Tôi không thích cà phê.', hint: 'S + do not + V + O', difficulty: 'easy' },
    { id: 'en-4', words: ['are', 'where', 'you', 'from', '?'], correctOrder: ['where', 'are', 'you', 'from', '?'], translation: 'Bạn đến từ đâu?', hint: 'Wh + be + S + prep?', difficulty: 'easy' },
    { id: 'en-5', words: ['been', 'have', 'I', 'to', 'Japan', 'never'], correctOrder: ['I', 'have', 'never', 'been', 'to', 'Japan'], translation: 'Tôi chưa bao giờ đến Nhật.', hint: 'S + have + adv + V3 + to + place', difficulty: 'medium' },
    { id: 'en-6', words: ['would', 'if', 'I', 'rich', 'were', 'travel', 'I', ','], correctOrder: ['if', 'I', 'were', 'rich', ',', 'I', 'would', 'travel'], translation: 'Nếu tôi giàu, tôi sẽ đi du lịch.', hint: 'If + S + were + adj, S + would + V', difficulty: 'hard' },
  ],
  ja: [
    { id: 'ja-1', words: ['です', '学生', '私は'], correctOrder: ['私は', '学生', 'です'], translation: 'Tôi là học sinh.', hint: 'S は N です', difficulty: 'easy' },
    { id: 'ja-2', words: ['食べます', 'を', 'ご飯', '毎日'], correctOrder: ['毎日', 'ご飯', 'を', '食べます'], translation: 'Mỗi ngày tôi ăn cơm.', hint: 'Time + O を V', difficulty: 'easy' },
    { id: 'ja-3', words: ['好きです', 'が', '日本語', '私は'], correctOrder: ['私は', '日本語', 'が', '好きです'], translation: 'Tôi thích tiếng Nhật.', hint: 'S は O が 好きです', difficulty: 'easy' },
    { id: 'ja-4', words: ['行きたい', 'に', '日本', 'です'], correctOrder: ['日本', 'に', '行きたい', 'です'], translation: 'Tôi muốn đi Nhật.', hint: 'Place に V-たい です', difficulty: 'medium' },
    { id: 'ja-5', words: ['思います', 'と', '面白い', 'この映画は'], correctOrder: ['この映画は', '面白い', 'と', '思います'], translation: 'Tôi nghĩ phim này hay.', hint: 'S は adj と 思います', difficulty: 'medium' },
  ],
  zh: [
    { id: 'zh-1', words: ['学生', '我', '是'], correctOrder: ['我', '是', '学生'], translation: 'Tôi là học sinh.', hint: 'S + 是 + N', difficulty: 'easy' },
    { id: 'zh-2', words: ['吃饭', '每天', '我'], correctOrder: ['我', '每天', '吃饭'], translation: 'Mỗi ngày tôi ăn cơm.', hint: 'S + Time + V', difficulty: 'easy' },
    { id: 'zh-3', words: ['中文', '喜欢', '我', '学'], correctOrder: ['我', '喜欢', '学', '中文'], translation: 'Tôi thích học tiếng Trung.', hint: 'S + 喜欢 + V + O', difficulty: 'easy' },
    { id: 'zh-4', words: ['去过', '日本', '没', '我'], correctOrder: ['我', '没', '去过', '日本'], translation: 'Tôi chưa đi Nhật.', hint: 'S + 没 + V过 + O', difficulty: 'medium' },
    { id: 'zh-5', words: ['比', '贵', '这个', '那个'], correctOrder: ['这个', '比', '那个', '贵'], translation: 'Cái này đắt hơn cái kia.', hint: 'A 比 B adj', difficulty: 'medium' },
  ],
  ko: [
    { id: 'ko-1', words: ['학생이에요', '저는'], correctOrder: ['저는', '학생이에요'], translation: 'Tôi là học sinh.', hint: 'S는 N이에요', difficulty: 'easy' },
    { id: 'ko-2', words: ['먹어요', '밥을', '매일'], correctOrder: ['매일', '밥을', '먹어요'], translation: 'Mỗi ngày tôi ăn cơm.', hint: 'Time + O를 V', difficulty: 'easy' },
    { id: 'ko-3', words: ['좋아해요', '한국어를', '저는'], correctOrder: ['저는', '한국어를', '좋아해요'], translation: 'Tôi thích tiếng Hàn.', hint: 'S는 O를 좋아해요', difficulty: 'easy' },
    { id: 'ko-4', words: ['가고', '일본에', '싶어요'], correctOrder: ['일본에', '가고', '싶어요'], translation: 'Tôi muốn đi Nhật.', hint: 'Place에 V고 싶어요', difficulty: 'medium' },
    { id: 'ko-5', words: ['있으면', '시간이', '만나요'], correctOrder: ['시간이', '있으면', '만나요'], translation: 'Nếu có thời gian thì gặp nhau.', hint: 'N이 있으면 V', difficulty: 'medium' },
  ],
};

router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const lang = (req.query.lang as string) || 'en';
    const difficulty = req.query.difficulty as string;

    let result = exercises[lang] || exercises['en'];

    if (difficulty) {
      result = result.filter((e) => e.difficulty === difficulty);
    }

    res.json(result);
  } catch (error) {
    console.error('Sentence exercises error:', error);
    res.status(500).json({ error: 'Failed to fetch sentence exercises' });
  }
});

router.post('/check', authenticate, async (req: Request, res: Response) => {
  try {
    const { exerciseId, answer, lang } = req.body;

    const langExercises = exercises[lang || 'en'] || exercises['en'];
    const exercise = langExercises.find((e) => e.id === exerciseId);

    if (!exercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }

    const isCorrect = JSON.stringify(answer) === JSON.stringify(exercise.correctOrder);

    res.json({
      correct: isCorrect,
      correctOrder: exercise.correctOrder,
      translation: exercise.translation,
    });
  } catch (error) {
    console.error('Check sentence error:', error);
    res.status(500).json({ error: 'Failed to check answer' });
  }
});

export default router;
