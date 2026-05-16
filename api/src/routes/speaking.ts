import { Router, Response } from 'express';
import { z } from 'zod';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';
import { paginate, errorResponse } from '../types/responses';

const router = Router();

interface SpeakingExercise {
  id: string;
  type: 'repeat' | 'respond' | 'describe' | 'read_aloud' | 'role_play';
  language: string;
  level: string;
  prompt: string;
  promptVi: string;
  expectedResponse?: string;
  context?: string;
  contextVi?: string;
  tips: string;
  scoring: string[];
}

const SPEAKING_EXERCISES: SpeakingExercise[] = [
  // English
  { id: 'en-s1', type: 'repeat', language: 'en', level: 'beginner', prompt: 'Hello, my name is...', promptVi: 'Lặp lại: "Hello, my name is..."', tips: 'Chú ý phát âm "Hello" với âm /h/ rõ ràng', scoring: ['pronunciation', 'fluency'] },
  { id: 'en-s2', type: 'respond', language: 'en', level: 'beginner', prompt: 'Someone asks: "How are you today?"', promptVi: 'Ai đó hỏi: "How are you today?" - Hãy trả lời', expectedResponse: "I'm fine, thank you. And you?", context: 'Casual greeting', contextVi: 'Chào hỏi thông thường', tips: 'Trả lời tự nhiên, có thể nói "I\'m good" hoặc "I\'m fine"', scoring: ['pronunciation', 'grammar', 'appropriateness'] },
  { id: 'en-s3', type: 'describe', language: 'en', level: 'elementary', prompt: 'Describe what you had for breakfast today.', promptVi: 'Mô tả bữa sáng hôm nay của bạn.', tips: 'Dùng thì quá khứ: "I had...", "I ate..."', scoring: ['pronunciation', 'grammar', 'vocabulary', 'fluency'] },
  { id: 'en-s4', type: 'read_aloud', language: 'en', level: 'elementary', prompt: 'The quick brown fox jumps over the lazy dog.', promptVi: 'Đọc to câu sau', tips: 'Chú ý trọng âm và nhịp điệu. Không đọc từng từ riêng lẻ.', scoring: ['pronunciation', 'fluency', 'intonation'] },
  { id: 'en-s5', type: 'role_play', language: 'en', level: 'intermediate', prompt: 'You are at a hotel. Ask the receptionist about check-in time and WiFi password.', promptVi: 'Bạn ở khách sạn. Hỏi lễ tân về giờ check-in và mật khẩu WiFi.', context: 'Hotel reception', contextVi: 'Quầy lễ tân khách sạn', tips: 'Dùng "Could you..." hoặc "Would you mind..." để lịch sự hơn', scoring: ['pronunciation', 'grammar', 'vocabulary', 'appropriateness', 'fluency'] },
  { id: 'en-s6', type: 'respond', language: 'en', level: 'intermediate', prompt: 'Your friend asks: "What do you think about learning languages online?"', promptVi: 'Bạn bè hỏi: "What do you think about learning languages online?" - Hãy trả lời', tips: 'Đưa ra ý kiến với "I think...", "In my opinion..."', scoring: ['pronunciation', 'grammar', 'vocabulary', 'coherence'] },
  // Japanese
  { id: 'ja-s1', type: 'repeat', language: 'ja', level: 'beginner', prompt: 'はじめまして、よろしくお願いします。', promptVi: 'Lặp lại: "Hajimemashite, yoroshiku onegaishimasu"', tips: 'Phát âm đều các âm tiết, không nhấn mạnh âm nào', scoring: ['pronunciation', 'fluency'] },
  { id: 'ja-s2', type: 'respond', language: 'ja', level: 'beginner', prompt: '「お名前は何ですか？」', promptVi: 'Ai đó hỏi tên bạn. Hãy trả lời.', expectedResponse: '私の名前は...です。', tips: 'Trả lời: "Watashi no namae wa [tên] desu"', scoring: ['pronunciation', 'grammar'] },
  { id: 'ja-s3', type: 'describe', language: 'ja', level: 'elementary', prompt: '今日の天気を説明してください。', promptVi: 'Mô tả thời tiết hôm nay.', tips: 'Dùng "今日は...です" (Kyou wa ... desu)', scoring: ['pronunciation', 'grammar', 'vocabulary'] },
  // Chinese
  { id: 'zh-s1', type: 'repeat', language: 'zh', level: 'beginner', prompt: '你好，我叫...，很高兴认识你。', promptVi: 'Lặp lại: "Nǐ hǎo, wǒ jiào..., hěn gāoxìng rènshi nǐ"', tips: 'Chú ý thanh điệu: nǐ (thanh 3), hǎo (thanh 3), wǒ (thanh 3)', scoring: ['pronunciation', 'tones'] },
  { id: 'zh-s2', type: 'respond', language: 'zh', level: 'beginner', prompt: '有人问你："你是哪国人？"', promptVi: 'Ai đó hỏi bạn là người nước nào. Hãy trả lời.', expectedResponse: '我是越南人。', tips: 'Trả lời: "Wǒ shì Yuènán rén"', scoring: ['pronunciation', 'tones', 'grammar'] },
  { id: 'zh-s3', type: 'read_aloud', language: 'zh', level: 'elementary', prompt: '今天天气很好，我想去公园散步。', promptVi: 'Đọc to: "Jīntiān tiānqì hěn hǎo, wǒ xiǎng qù gōngyuán sànbù"', tips: 'Chú ý thanh điệu từng từ và ngắt nhịp tự nhiên', scoring: ['pronunciation', 'tones', 'fluency'] },
  // Korean
  { id: 'ko-s1', type: 'repeat', language: 'ko', level: 'beginner', prompt: '안녕하세요, 만나서 반갑습니다.', promptVi: 'Lặp lại: "Annyeonghaseyo, mannaseo bangapseumnida"', tips: 'Phát âm rõ các âm cuối (받침)', scoring: ['pronunciation', 'fluency'] },
  { id: 'ko-s2', type: 'respond', language: 'ko', level: 'beginner', prompt: '누군가 물어봅니다: "이름이 뭐예요?"', promptVi: 'Ai đó hỏi tên bạn. Hãy trả lời.', expectedResponse: '제 이름은 ...입니다.', tips: 'Trả lời: "Je ireumeun [tên] imnida"', scoring: ['pronunciation', 'grammar'] },
  { id: 'ko-s3', type: 'describe', language: 'ko', level: 'elementary', prompt: '오늘 뭐 했지 말해 보세요.', promptVi: 'Kể về những gì bạn đã làm hôm nay.', tips: 'Dùng thì quá khứ: "...했어요" (...haesseoyo)', scoring: ['pronunciation', 'grammar', 'vocabulary'] },
];

const submitSchema = z.object({
  exerciseId: z.string(),
  audioScore: z.number().min(0).max(100).optional(),
  duration: z.number().optional(),
  transcript: z.string().optional(),
});

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  const { lang = 'en', level, type } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  let filtered = SPEAKING_EXERCISES.filter(e => e.language === String(lang));
  if (level) filtered = filtered.filter(e => e.level === String(level));
  if (type) filtered = filtered.filter(e => e.type === String(type));

  const result = paginate(filtered, page, limit);
  res.json({ ...result, language: lang });
});

router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  const exercise = SPEAKING_EXERCISES.find(e => e.id === req.params.id);
  if (!exercise) return res.status(404).json(errorResponse('Bài nói không tồn tại', 'NOT_FOUND'));
  res.json({ exercise });
});

router.post('/submit', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { exerciseId, audioScore, duration, transcript } = submitSchema.parse(req.body);

    const exercise = SPEAKING_EXERCISES.find(e => e.id === exerciseId);
    if (!exercise) return res.status(404).json(errorResponse('Bài nói không tồn tại', 'NOT_FOUND'));

    const score = audioScore || 0;
    const passed = score >= 60;
    const xpEarned = passed ? 15 : 5;

    await prisma.user.update({
      where: { id: req.userId! },
      data: { xp: { increment: xpEarned } },
    });

    let feedback: string;
    if (score >= 90) feedback = 'Xuất sắc! Phát âm rất tự nhiên và lưu loát.';
    else if (score >= 75) feedback = 'Rất tốt! Chỉ cần cải thiện một chút nữa.';
    else if (score >= 60) feedback = `Khá tốt! Mẹo: ${exercise.tips}`;
    else feedback = `Cần luyện thêm. ${exercise.tips}`;

    res.json({
      result: {
        exerciseId,
        score,
        passed,
        feedback,
        xpEarned,
        duration: duration || 0,
        scoringCriteria: exercise.scoring,
        expectedResponse: exercise.expectedResponse,
        userTranscript: transcript,
        nextStep: passed ? 'Chuyển sang bài tiếp theo!' : `Thử lại: ${exercise.tips}`,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json(errorResponse('Dữ liệu không hợp lệ', 'VALIDATION_ERROR', error.errors));
    res.status(500).json(errorResponse('Lỗi khi xử lý bài nói', 'INTERNAL_ERROR'));
  }
});

export default router;
