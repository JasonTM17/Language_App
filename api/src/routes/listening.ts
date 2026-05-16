import { Router, Response } from 'express';
import { z } from 'zod';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';
import { paginate, errorResponse } from '../types/responses';

const router = Router();

interface ListeningExercise {
  id: string;
  type: 'dictation' | 'comprehension' | 'fill_audio' | 'word_recognition';
  language: string;
  level: string;
  audio: string;
  transcript: string;
  transcriptVi: string;
  question?: string;
  questionVi?: string;
  options?: string[];
  answer: string;
  hint?: string;
}

const LISTENING_EXERCISES: ListeningExercise[] = [
  // English - Beginner
  { id: 'en-l1', type: 'word_recognition', language: 'en', level: 'beginner', audio: '/audio/en/hello.mp3', transcript: 'Hello, how are you?', transcriptVi: 'Xin chào, bạn khỏe không?', question: 'What did you hear?', questionVi: 'Bạn nghe được gì?', options: ['Hello, how are you?', 'Hello, who are you?', 'Hello, where are you?', 'Hello, what are you?'], answer: 'Hello, how are you?' },
  { id: 'en-l2', type: 'dictation', language: 'en', level: 'beginner', audio: '/audio/en/my-name.mp3', transcript: 'My name is Anna.', transcriptVi: 'Tên tôi là Anna.', answer: 'My name is Anna.', hint: '4 từ, bắt đầu bằng "My"' },
  { id: 'en-l3', type: 'fill_audio', language: 'en', level: 'beginner', audio: '/audio/en/weather.mp3', transcript: 'The weather is ___ today.', transcriptVi: 'Thời tiết hôm nay ___.', question: 'Fill in the blank:', questionVi: 'Điền vào chỗ trống:', options: ['sunny', 'funny', 'money', 'honey'], answer: 'sunny' },
  { id: 'en-l4', type: 'comprehension', language: 'en', level: 'elementary', audio: '/audio/en/restaurant.mp3', transcript: 'I would like a cup of coffee and a sandwich, please.', transcriptVi: 'Tôi muốn một ly cà phê và một chiếc sandwich.', question: 'What does the person want?', questionVi: 'Người đó muốn gì?', options: ['Coffee and sandwich', 'Tea and cake', 'Water and bread', 'Juice and pizza'], answer: 'Coffee and sandwich' },
  { id: 'en-l5', type: 'dictation', language: 'en', level: 'elementary', audio: '/audio/en/directions.mp3', transcript: 'Turn left at the traffic light.', transcriptVi: 'Rẽ trái ở đèn giao thông.', answer: 'Turn left at the traffic light.', hint: '6 từ, bắt đầu bằng "Turn"' },
  // Japanese - Beginner
  { id: 'ja-l1', type: 'word_recognition', language: 'ja', level: 'beginner', audio: '/audio/ja/ohayou.mp3', transcript: 'おはようございます', transcriptVi: 'Chào buổi sáng', question: '何と言いましたか？', questionVi: 'Nghe được gì?', options: ['おはようございます', 'こんにちは', 'こんばんは', 'さようなら'], answer: 'おはようございます' },
  { id: 'ja-l2', type: 'comprehension', language: 'ja', level: 'beginner', audio: '/audio/ja/jikoshoukai.mp3', transcript: '私は田中です。日本人です。', transcriptVi: 'Tôi là Tanaka. Tôi là người Nhật.', question: 'この人は何人ですか？', questionVi: 'Người này là người nước nào?', options: ['日本人', '中国人', '韓国人', 'ベトナム人'], answer: '日本人' },
  { id: 'ja-l3', type: 'fill_audio', language: 'ja', level: 'elementary', audio: '/audio/ja/kaimono.mp3', transcript: 'これは___円です。', transcriptVi: 'Cái này giá ___ yên.', question: '空欄を埋めてください：', questionVi: 'Điền vào chỗ trống:', options: ['500', '1000', '200', '800'], answer: '500' },
  // Chinese - Beginner
  { id: 'zh-l1', type: 'word_recognition', language: 'zh', level: 'beginner', audio: '/audio/zh/nihao.mp3', transcript: '你好', transcriptVi: 'Xin chào', question: '你听到了什么？', questionVi: 'Bạn nghe được gì?', options: ['你好', '再见', '谢谢', '对不起'], answer: '你好' },
  { id: 'zh-l2', type: 'comprehension', language: 'zh', level: 'beginner', audio: '/audio/zh/jieshao.mp3', transcript: '我叫小明，我是学生。', transcriptVi: 'Tôi tên Tiểu Minh, tôi là học sinh.', question: '他是做什么的？', questionVi: 'Anh ấy làm gì?', options: ['学生', '老师', '医生', '工人'], answer: '学生' },
  { id: 'zh-l3', type: 'fill_audio', language: 'zh', level: 'elementary', audio: '/audio/zh/tianqi.mp3', transcript: '今天天气很___。', transcriptVi: 'Hôm nay thời tiết rất ___.', question: '填空：', questionVi: 'Điền vào chỗ trống:', options: ['好', '冷', '热', '坏'], answer: '好' },
  // Korean - Beginner
  { id: 'ko-l1', type: 'word_recognition', language: 'ko', level: 'beginner', audio: '/audio/ko/annyeong.mp3', transcript: '안녕하세요', transcriptVi: 'Xin chào', question: '무엇을 들었나요?', questionVi: 'Bạn nghe được gì?', options: ['안녕하세요', '감사합니다', '죄송합니다', '안녕히 가세요'], answer: '안녕하세요' },
  { id: 'ko-l2', type: 'comprehension', language: 'ko', level: 'beginner', audio: '/audio/ko/sogae.mp3', transcript: '저는 김민수입니다. 한국 사람입니다.', transcriptVi: 'Tôi là Kim Minsu. Tôi là người Hàn Quốc.', question: '이 사람은 어느 나라 사람입니까?', questionVi: 'Người này là người nước nào?', options: ['한국 사람', '일본 사람', '중국 사람', '베트남 사람'], answer: '한국 사람' },
];

const submitSchema = z.object({
  exerciseId: z.string(),
  answer: z.string(),
  timeSpent: z.number().optional(),
});

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  const { lang = 'en', level, type } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  let filtered = LISTENING_EXERCISES.filter(e => e.language === String(lang));
  if (level) filtered = filtered.filter(e => e.level === String(level));
  if (type) filtered = filtered.filter(e => e.type === String(type));

  const safe = filtered.map(({ answer, transcript, ...rest }) => ({
    ...rest,
    hasTranscript: true,
  }));

  const result = paginate(safe, page, limit);

  res.json({ ...result, language: lang });
});

router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  const exercise = LISTENING_EXERCISES.find(e => e.id === req.params.id);
  if (!exercise) return res.status(404).json({ error: 'Bài nghe không tồn tại' });

  const { answer, ...safe } = exercise;
  res.json({ exercise: safe });
});

router.post('/submit', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { exerciseId, answer, timeSpent } = submitSchema.parse(req.body);

    const exercise = LISTENING_EXERCISES.find(e => e.id === exerciseId);
    if (!exercise) return res.status(404).json({ error: 'Bài nghe không tồn tại' });

    const isCorrect = answer.trim().toLowerCase() === exercise.answer.trim().toLowerCase();
    const xpEarned = isCorrect ? 10 : 2;

    await prisma.user.update({
      where: { id: req.userId! },
      data: { xp: { increment: xpEarned } },
    });

    res.json({
      correct: isCorrect,
      correctAnswer: exercise.answer,
      transcript: exercise.transcript,
      transcriptVi: exercise.transcriptVi,
      xpEarned,
      feedback: isCorrect
        ? 'Chính xác! Tai nghe của bạn rất tốt.'
        : `Chưa đúng. Đáp án là: "${exercise.answer}"`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
    res.status(500).json({ error: 'Lỗi khi xử lý bài nghe' });
  }
});

export default router;
