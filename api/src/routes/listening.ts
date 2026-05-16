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
  // English - Additional
  { id: 'en-l6', type: 'word_recognition', language: 'en', level: 'elementary', audio: '/audio/en/appointment.mp3', transcript: 'I have an appointment at three o\'clock.', transcriptVi: 'Tôi có cuộc hẹn lúc 3 giờ.', question: 'What time is the appointment?', questionVi: 'Cuộc hẹn lúc mấy giờ?', options: ['3 o\'clock', '2 o\'clock', '4 o\'clock', '1 o\'clock'], answer: '3 o\'clock' },
  { id: 'en-l7', type: 'comprehension', language: 'en', level: 'intermediate', audio: '/audio/en/travel.mp3', transcript: 'The flight to Tokyo departs at 8 AM from gate B12. Please arrive at least 2 hours before departure.', transcriptVi: 'Chuyến bay đến Tokyo khởi hành lúc 8 giờ sáng từ cổng B12.', question: 'Which gate should you go to?', questionVi: 'Bạn nên đến cổng nào?', options: ['Gate B12', 'Gate A12', 'Gate B21', 'Gate C12'], answer: 'Gate B12' },
  { id: 'en-l8', type: 'dictation', language: 'en', level: 'intermediate', audio: '/audio/en/meeting.mp3', transcript: 'The meeting has been rescheduled to Friday afternoon.', transcriptVi: 'Cuộc họp đã được dời sang chiều thứ Sáu.', answer: 'The meeting has been rescheduled to Friday afternoon.', hint: '8 từ, bắt đầu bằng "The meeting"' },
  { id: 'en-l9', type: 'fill_audio', language: 'en', level: 'intermediate', audio: '/audio/en/hobby.mp3', transcript: 'In my free time, I enjoy ___ books.', transcriptVi: 'Lúc rảnh, tôi thích ___ sách.', question: 'Fill in the blank:', questionVi: 'Điền vào chỗ trống:', options: ['reading', 'writing', 'buying', 'selling'], answer: 'reading' },
  { id: 'en-l10', type: 'comprehension', language: 'en', level: 'advanced', audio: '/audio/en/news.mp3', transcript: 'Scientists have discovered a new species of deep-sea fish that can produce its own light through bioluminescence.', transcriptVi: 'Các nhà khoa học phát hiện loài cá biển sâu mới có thể tự phát sáng.', question: 'What can the new fish species do?', questionVi: 'Loài cá mới có thể làm gì?', options: ['Produce its own light', 'Swim very fast', 'Live on land', 'Change color'], answer: 'Produce its own light' },
  // Japanese - Additional
  { id: 'ja-l4', type: 'dictation', language: 'ja', level: 'elementary', audio: '/audio/ja/denwa.mp3', transcript: '電話番号は何番ですか？', transcriptVi: 'Số điện thoại là bao nhiêu?', answer: '電話番号は何番ですか？', hint: 'Bắt đầu bằng 電話' },
  { id: 'ja-l5', type: 'comprehension', language: 'ja', level: 'elementary', audio: '/audio/ja/kaimono2.mp3', transcript: 'すみません、このTシャツのMサイズはありますか？', transcriptVi: 'Xin lỗi, áo T-shirt này có size M không?', question: '何を探していますか？', questionVi: 'Người này đang tìm gì?', options: ['Tシャツ', 'ズボン', '靴', '帽子'], answer: 'Tシャツ' },
  { id: 'ja-l6', type: 'word_recognition', language: 'ja', level: 'intermediate', audio: '/audio/ja/tenki2.mp3', transcript: '明日は雨が降るでしょう。傘を持って行ってください。', transcriptVi: 'Ngày mai có thể sẽ mưa. Hãy mang theo ô.', question: '明日の天気は？', questionVi: 'Thời tiết ngày mai thế nào?', options: ['雨', '晴れ', '雪', '曇り'], answer: '雨' },
  // Chinese - Additional
  { id: 'zh-l4', type: 'dictation', language: 'zh', level: 'elementary', audio: '/audio/zh/shijian.mp3', transcript: '现在几点了？', transcriptVi: 'Bây giờ mấy giờ rồi?', answer: '现在几点了？', hint: 'Bắt đầu bằng 现在' },
  { id: 'zh-l5', type: 'comprehension', language: 'zh', level: 'elementary', audio: '/audio/zh/diancan.mp3', transcript: '我要一碗牛肉面和一杯绿茶。', transcriptVi: 'Tôi muốn một tô mì bò và một ly trà xanh.', question: '他要喝什么？', questionVi: 'Anh ấy muốn uống gì?', options: ['绿茶', '咖啡', '可乐', '牛奶'], answer: '绿茶' },
  { id: 'zh-l6', type: 'fill_audio', language: 'zh', level: 'intermediate', audio: '/audio/zh/xuexiao.mp3', transcript: '我每天___去学校。', transcriptVi: 'Mỗi ngày tôi ___ đến trường.', question: '填空：', questionVi: 'Điền vào chỗ trống:', options: ['骑车', '开车', '走路', '坐飞机'], answer: '骑车' },
  // Korean - Additional
  { id: 'ko-l3', type: 'dictation', language: 'ko', level: 'elementary', audio: '/audio/ko/sigani.mp3', transcript: '지금 몇 시예요?', transcriptVi: 'Bây giờ mấy giờ?', answer: '지금 몇 시예요?', hint: 'Bắt đầu bằng 지금' },
  { id: 'ko-l4', type: 'fill_audio', language: 'ko', level: 'elementary', audio: '/audio/ko/eumsik.mp3', transcript: '저는 ___을 좋아해요.', transcriptVi: 'Tôi thích ___.', question: '빈칸을 채우세요:', questionVi: 'Điền vào chỗ trống:', options: ['김치', '초밥', '피자', '햄버거'], answer: '김치' },
  { id: 'ko-l5', type: 'comprehension', language: 'ko', level: 'intermediate', audio: '/audio/ko/gyotong.mp3', transcript: '이 버스는 서울역까지 가나요?', transcriptVi: 'Xe buýt này có đến ga Seoul không?', question: '어디에 가고 싶어요?', questionVi: 'Muốn đi đâu?', options: ['서울역', '부산역', '인천공항', '강남역'], answer: '서울역' },
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
  if (!exercise) return res.status(404).json(errorResponse('Bài nghe không tồn tại', 'NOT_FOUND'));

  const { answer, ...safe } = exercise;
  res.json({ exercise: safe });
});

router.post('/submit', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { exerciseId, answer, timeSpent } = submitSchema.parse(req.body);

    const exercise = LISTENING_EXERCISES.find(e => e.id === exerciseId);
    if (!exercise) return res.status(404).json(errorResponse('Bài nghe không tồn tại', 'NOT_FOUND'));

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
    if (error instanceof z.ZodError) return res.status(400).json(errorResponse('Dữ liệu không hợp lệ', 'VALIDATION_ERROR', error.errors));
    res.status(500).json(errorResponse('Lỗi khi xử lý bài nghe', 'INTERNAL_ERROR'));
  }
});

export default router;
