import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

const pronunciationExercises: Record<string, any[]> = {
  en: [
    { id: 'en-p1', word: 'pronunciation', phonetic: '/prəˌnʌnsiˈeɪʃən/', meaning: 'phát âm', difficulty: 'hard' },
    { id: 'en-p2', word: 'comfortable', phonetic: '/ˈkʌmftəbəl/', meaning: 'thoải mái', difficulty: 'medium' },
    { id: 'en-p3', word: 'schedule', phonetic: '/ˈʃedjuːl/', meaning: 'lịch trình', difficulty: 'medium' },
    { id: 'en-p4', word: 'vocabulary', phonetic: '/vəˈkæbjʊləri/', meaning: 'từ vựng', difficulty: 'medium' },
    { id: 'en-p5', word: 'environment', phonetic: '/ɪnˈvaɪrənmənt/', meaning: 'môi trường', difficulty: 'medium' },
  ],
  ja: [
    { id: 'ja-p1', word: 'ありがとうございます', phonetic: 'arigatou gozaimasu', meaning: 'cảm ơn', difficulty: 'easy' },
    { id: 'ja-p2', word: 'すみません', phonetic: 'sumimasen', meaning: 'xin lỗi', difficulty: 'easy' },
    { id: 'ja-p3', word: '図書館', phonetic: 'toshokan', meaning: 'thư viện', difficulty: 'medium' },
    { id: 'ja-p4', word: '経済', phonetic: 'keizai', meaning: 'kinh tế', difficulty: 'hard' },
    { id: 'ja-p5', word: '大学', phonetic: 'daigaku', meaning: 'đại học', difficulty: 'easy' },
  ],
  zh: [
    { id: 'zh-p1', word: '谢谢', phonetic: 'xièxie', meaning: 'cảm ơn', difficulty: 'easy' },
    { id: 'zh-p2', word: '对不起', phonetic: 'duìbuqǐ', meaning: 'xin lỗi', difficulty: 'easy' },
    { id: 'zh-p3', word: '图书馆', phonetic: 'túshūguǎn', meaning: 'thư viện', difficulty: 'medium' },
    { id: 'zh-p4', word: '经济', phonetic: 'jīngjì', meaning: 'kinh tế', difficulty: 'medium' },
    { id: 'zh-p5', word: '大学', phonetic: 'dàxué', meaning: 'đại học', difficulty: 'easy' },
  ],
  ko: [
    { id: 'ko-p1', word: '감사합니다', phonetic: 'gamsahamnida', meaning: 'cảm ơn', difficulty: 'easy' },
    { id: 'ko-p2', word: '죄송합니다', phonetic: 'joesonghamnida', meaning: 'xin lỗi', difficulty: 'medium' },
    { id: 'ko-p3', word: '도서관', phonetic: 'doseogwan', meaning: 'thư viện', difficulty: 'easy' },
    { id: 'ko-p4', word: '경제', phonetic: 'gyeongje', meaning: 'kinh tế', difficulty: 'medium' },
    { id: 'ko-p5', word: '대학교', phonetic: 'daehakgyo', meaning: 'đại học', difficulty: 'easy' },
  ],
};

router.get('/', authenticate, async (req, res) => {
  const { lang = 'en', difficulty } = req.query;
  const langCode = String(lang);

  let exercises = pronunciationExercises[langCode] || pronunciationExercises['en'];

  if (difficulty && typeof difficulty === 'string') {
    exercises = exercises.filter(e => e.difficulty === difficulty);
  }

  res.json({ exercises, language: langCode });
});

router.post('/attempt', authenticate, async (req, res) => {
  const { exerciseId, score } = req.body;

  res.json({
    result: {
      exerciseId,
      score: score || 0,
      feedback: score >= 80 ? 'Tuyệt vời! Phát âm rất tốt.' : score >= 50 ? 'Khá tốt! Hãy tiếp tục luyện tập.' : 'Cần luyện tập thêm. Hãy nghe lại và thử lại.',
      xpEarned: Math.round((score || 0) / 10),
    },
  });
});

export default router;
