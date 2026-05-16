import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

const typingExercises: Record<string, any[]> = {
  en: [
    { id: 'en-1', text: 'The quick brown fox jumps over the lazy dog.', translation: 'Con cáo nâu nhanh nhẹn nhảy qua con chó lười.', difficulty: 'easy' },
    { id: 'en-2', text: 'Practice makes perfect.', translation: 'Luyện tập tạo nên sự hoàn hảo.', difficulty: 'easy' },
    { id: 'en-3', text: 'Learning a new language opens doors to new cultures.', translation: 'Học ngôn ngữ mới mở ra cánh cửa đến văn hóa mới.', difficulty: 'medium' },
    { id: 'en-4', text: 'She sells seashells by the seashore.', translation: 'Cô ấy bán vỏ sò bên bờ biển.', difficulty: 'medium' },
    { id: 'en-5', text: 'The more you practice, the better you become.', translation: 'Bạn càng luyện tập, bạn càng giỏi hơn.', difficulty: 'easy' },
  ],
  ja: [
    { id: 'ja-1', text: 'おはようございます。', translation: 'Chào buổi sáng.', difficulty: 'easy' },
    { id: 'ja-2', text: '日本語を勉強しています。', translation: 'Tôi đang học tiếng Nhật.', difficulty: 'easy' },
    { id: 'ja-3', text: '毎日少しずつ練習することが大切です。', translation: 'Luyện tập một chút mỗi ngày là quan trọng.', difficulty: 'medium' },
    { id: 'ja-4', text: '新しい言葉を覚えるのは楽しいです。', translation: 'Học từ mới rất vui.', difficulty: 'medium' },
    { id: 'ja-5', text: '日本の文化に興味があります。', translation: 'Tôi quan tâm đến văn hóa Nhật Bản.', difficulty: 'easy' },
  ],
  zh: [
    { id: 'zh-1', text: '你好，很高兴认识你。', translation: 'Xin chào, rất vui được gặp bạn.', difficulty: 'easy' },
    { id: 'zh-2', text: '我正在学习中文。', translation: 'Tôi đang học tiếng Trung.', difficulty: 'easy' },
    { id: 'zh-3', text: '每天练习一点很重要。', translation: 'Luyện tập một chút mỗi ngày rất quan trọng.', difficulty: 'medium' },
    { id: 'zh-4', text: '学习新词汇很有趣。', translation: 'Học từ vựng mới rất thú vị.', difficulty: 'easy' },
    { id: 'zh-5', text: '中国文化博大精深。', translation: 'Văn hóa Trung Quốc rộng lớn và sâu sắc.', difficulty: 'medium' },
  ],
  ko: [
    { id: 'ko-1', text: '안녕하세요, 만나서 반갑습니다.', translation: 'Xin chào, rất vui được gặp bạn.', difficulty: 'easy' },
    { id: 'ko-2', text: '한국어를 공부하고 있어요.', translation: 'Tôi đang học tiếng Hàn.', difficulty: 'easy' },
    { id: 'ko-3', text: '매일 조금씩 연습하는 것이 중요해요.', translation: 'Luyện tập một chút mỗi ngày là quan trọng.', difficulty: 'medium' },
    { id: 'ko-4', text: '새로운 단어를 배우는 것은 재미있어요.', translation: 'Học từ mới rất vui.', difficulty: 'easy' },
    { id: 'ko-5', text: '한국 문화에 관심이 있어요.', translation: 'Tôi quan tâm đến văn hóa Hàn Quốc.', difficulty: 'easy' },
  ],
};

router.get('/', authenticate, async (req, res) => {
  const { lang = 'en', difficulty } = req.query;
  const langCode = String(lang);

  let exercises = typingExercises[langCode] || typingExercises['en'];

  if (difficulty && typeof difficulty === 'string') {
    exercises = exercises.filter(e => e.difficulty === difficulty);
  }

  res.json({ exercises, language: langCode });
});

router.post('/result', authenticate, async (req, res) => {
  const { exerciseId, wpm, accuracy, timeSpent } = req.body;

  res.json({
    result: {
      exerciseId,
      wpm: wpm || 0,
      accuracy: accuracy || 0,
      timeSpent: timeSpent || 0,
      xpEarned: Math.round((wpm || 0) * (accuracy || 0) / 100),
    },
  });
});

export default router;
