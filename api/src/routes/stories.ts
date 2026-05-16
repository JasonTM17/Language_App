import { Router, Response } from 'express';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';
import { paginate, errorResponse } from '../types/responses';

const router = Router();

interface StorySegment {
  type: 'narration' | 'dialogue' | 'question';
  speaker?: string;
  text: string;
  translation: string;
  audio?: string;
  question?: {
    prompt: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

interface Story {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  language: string;
  level: string;
  category: string;
  xpReward: number;
  estimatedMinutes: number;
  segments: StorySegment[];
}

const STORIES: Story[] = [
  {
    id: 'en-story-cafe',
    title: 'A Morning at the Café',
    titleVi: 'Buổi sáng ở quán cà phê',
    description: 'Order your first coffee in English',
    language: 'en',
    level: 'beginner',
    category: 'daily_life',
    xpReward: 30,
    estimatedMinutes: 5,
    segments: [
      { type: 'narration', text: 'You walk into a cozy café on a rainy morning.', translation: 'Bạn bước vào một quán cà phê ấm cúng vào buổi sáng mưa.' },
      { type: 'dialogue', speaker: 'Barista', text: 'Good morning! Welcome to Bean & Brew. What can I get for you?', translation: 'Chào buổi sáng! Chào mừng đến Bean & Brew. Bạn muốn gọi gì?' },
      { type: 'question', text: '', translation: '', question: { prompt: 'How do you order a coffee?', options: ['I want coffee give me.', 'Can I have a latte, please?', 'Coffee. Now.', 'Give coffee to me please.'], correct: 1, explanation: '"Can I have..., please?" là cách lịch sự nhất để gọi đồ uống.' } },
      { type: 'dialogue', speaker: 'You', text: 'Can I have a latte, please?', translation: 'Cho tôi một ly latte được không?' },
      { type: 'dialogue', speaker: 'Barista', text: 'Sure! What size would you like? Small, medium, or large?', translation: 'Được! Bạn muốn cỡ nào? Nhỏ, vừa, hay lớn?' },
      { type: 'question', text: '', translation: '', question: { prompt: 'You want a medium. What do you say?', options: ['Medium one.', 'I\'d like a medium, please.', 'The middle size.', 'Not big not small.'], correct: 1, explanation: '"I\'d like..." là cách nói lịch sự hơn "I want..."' } },
      { type: 'dialogue', speaker: 'You', text: 'I\'d like a medium, please.', translation: 'Cho tôi cỡ vừa.' },
      { type: 'dialogue', speaker: 'Barista', text: 'That\'ll be $4.50. Would you like anything else?', translation: 'Tổng cộng $4.50. Bạn muốn gọi thêm gì không?' },
      { type: 'dialogue', speaker: 'You', text: 'No, that\'s all. Thank you!', translation: 'Không, vậy thôi. Cảm ơn!' },
      { type: 'narration', text: 'The barista smiles and starts making your latte. You did great!', translation: 'Nhân viên mỉm cười và bắt đầu pha latte cho bạn. Bạn làm tốt lắm!' },
    ],
  },
  {
    id: 'en-story-lost',
    title: 'Lost in the City',
    titleVi: 'Lạc đường trong thành phố',
    description: 'Ask for directions when you are lost',
    language: 'en',
    level: 'beginner',
    category: 'travel',
    xpReward: 35,
    estimatedMinutes: 6,
    segments: [
      { type: 'narration', text: 'You are looking for the train station but you can\'t find it.', translation: 'Bạn đang tìm ga tàu nhưng không tìm thấy.' },
      { type: 'dialogue', speaker: 'You', text: 'Excuse me, could you help me?', translation: 'Xin lỗi, bạn có thể giúp tôi không?' },
      { type: 'dialogue', speaker: 'Stranger', text: 'Of course! What do you need?', translation: 'Tất nhiên! Bạn cần gì?' },
      { type: 'question', text: '', translation: '', question: { prompt: 'How do you ask for directions politely?', options: ['Where is train station?', 'Could you tell me how to get to the train station?', 'Train station where?', 'I need train station.'], correct: 1, explanation: '"Could you tell me how to get to...?" là cách hỏi đường lịch sự.' } },
      { type: 'dialogue', speaker: 'Stranger', text: 'Go straight for two blocks, then turn left. You\'ll see it on your right.', translation: 'Đi thẳng 2 block, rồi rẽ trái. Bạn sẽ thấy nó bên phải.' },
      { type: 'question', text: '', translation: '', question: { prompt: 'What does "turn left" mean?', options: ['Rẽ phải', 'Rẽ trái', 'Đi thẳng', 'Quay lại'], correct: 1, explanation: 'Turn left = rẽ trái. Turn right = rẽ phải.' } },
      { type: 'dialogue', speaker: 'You', text: 'Thank you so much! Have a nice day!', translation: 'Cảm ơn rất nhiều! Chúc bạn một ngày tốt lành!' },
      { type: 'narration', text: 'You follow the directions and find the station. Well done!', translation: 'Bạn đi theo hướng dẫn và tìm thấy ga tàu. Giỏi lắm!' },
    ],
  },
  {
    id: 'ja-story-konbini',
    title: 'コンビニで',
    titleVi: 'Ở cửa hàng tiện lợi',
    description: 'Mua đồ ở konbini Nhật Bản',
    language: 'ja',
    level: 'beginner',
    category: 'daily_life',
    xpReward: 30,
    estimatedMinutes: 5,
    segments: [
      { type: 'narration', text: 'あなたはコンビニに入ります。', translation: 'Bạn bước vào cửa hàng tiện lợi.' },
      { type: 'dialogue', speaker: '店員', text: 'いらっしゃいませ！', translation: 'Xin chào quý khách!' },
      { type: 'narration', text: 'おにぎりとお茶を選びます。', translation: 'Bạn chọn onigiri và trà.' },
      { type: 'dialogue', speaker: '店員', text: 'お会計は350円です。袋はいりますか？', translation: 'Tổng cộng 350 yên. Bạn cần túi không?' },
      { type: 'question', text: '', translation: '', question: { prompt: '「袋はいりますか」の意味は？', options: ['Bạn có thẻ thành viên không?', 'Bạn cần túi không?', 'Bạn trả bằng tiền mặt?', 'Bạn muốn hâm nóng không?'], correct: 1, explanation: '袋 (ふくろ) = túi. いりますか = cần không?' } },
      { type: 'dialogue', speaker: 'あなた', text: 'いいえ、大丈夫です。', translation: 'Không, không cần đâu.' },
      { type: 'dialogue', speaker: '店員', text: 'ありがとうございました！', translation: 'Cảm ơn quý khách!' },
    ],
  },
  {
    id: 'zh-story-taxi',
    title: '坐出租车',
    titleVi: 'Đi taxi',
    description: 'Gọi taxi và nói địa chỉ bằng tiếng Trung',
    language: 'zh',
    level: 'beginner',
    category: 'travel',
    xpReward: 30,
    estimatedMinutes: 5,
    segments: [
      { type: 'narration', text: '你在路边叫了一辆出租车。', translation: 'Bạn vẫy một chiếc taxi bên đường.' },
      { type: 'dialogue', speaker: '司机', text: '你好！去哪里？', translation: 'Xin chào! Đi đâu?' },
      { type: 'question', text: '', translation: '', question: { prompt: 'Bạn muốn đến khách sạn. Nói thế nào?', options: ['我要去酒店。', '酒店在哪里？', '这是酒店吗？', '我住酒店。'], correct: 0, explanation: '我要去... = Tôi muốn đến... 酒店 (jiǔdiàn) = khách sạn' } },
      { type: 'dialogue', speaker: '你', text: '我要去和平酒店。', translation: 'Tôi muốn đến khách sạn Hòa Bình.' },
      { type: 'dialogue', speaker: '司机', text: '好的，大概二十分钟。', translation: 'Được, khoảng 20 phút.' },
      { type: 'dialogue', speaker: '司机', text: '到了！一共四十五块。', translation: 'Đến rồi! Tổng cộng 45 tệ.' },
      { type: 'question', text: '', translation: '', question: { prompt: '四十五块 là bao nhiêu?', options: ['35 tệ', '45 tệ', '54 tệ', '40 tệ'], correct: 1, explanation: '四十五 = 45. 块 (kuài) = đơn vị tiền tệ (tệ/nhân dân tệ)' } },
      { type: 'dialogue', speaker: '你', text: '谢谢！再见！', translation: 'Cảm ơn! Tạm biệt!' },
    ],
  },
  {
    id: 'ko-story-restaurant',
    title: '식당에서',
    titleVi: 'Ở nhà hàng',
    description: 'Gọi món ăn tại nhà hàng Hàn Quốc',
    language: 'ko',
    level: 'beginner',
    category: 'daily_life',
    xpReward: 30,
    estimatedMinutes: 5,
    segments: [
      { type: 'narration', text: '한국 식당에 들어갑니다.', translation: 'Bạn bước vào nhà hàng Hàn Quốc.' },
      { type: 'dialogue', speaker: '직원', text: '어서 오세요! 몇 분이세요?', translation: 'Chào mừng! Mấy người ạ?' },
      { type: 'question', text: '', translation: '', question: { prompt: '몇 분이세요? nghĩa là gì?', options: ['Bạn đặt bàn chưa?', 'Mấy người?', 'Ngồi đâu?', 'Gọi gì?'], correct: 1, explanation: '몇 분 = mấy người (lịch sự). 분 là cách đếm người trang trọng.' } },
      { type: 'dialogue', speaker: '당신', text: '두 명이요.', translation: 'Hai người ạ.' },
      { type: 'dialogue', speaker: '직원', text: '이쪽으로 오세요. 메뉴 여기 있습니다.', translation: 'Mời đi lối này. Menu ở đây ạ.' },
      { type: 'dialogue', speaker: '당신', text: '비빔밥 하나하고 김치찌개 하나 주세요.', translation: 'Cho một bibimbap và một canh kimchi.' },
      { type: 'dialogue', speaker: '직원', text: '네, 알겠습니다. 음료는요?', translation: 'Vâng. Đồ uống thì sao ạ?' },
      { type: 'dialogue', speaker: '당신', text: '물 주세요.', translation: 'Cho nước lọc.' },
      { type: 'narration', text: '음식이 나왔습니다. 맛있게 드세요!', translation: 'Đồ ăn đã ra. Ăn ngon miệng nhé!' },
    ],
  },
];

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  const { lang, level, category } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  let filtered = STORIES;
  if (lang) filtered = filtered.filter(s => s.language === String(lang));
  if (level) filtered = filtered.filter(s => s.level === String(level));
  if (category) filtered = filtered.filter(s => s.category === String(category));

  const summaries = filtered.map(({ segments, ...rest }) => ({
    ...rest,
    segmentCount: segments.length,
    questionCount: segments.filter(s => s.type === 'question').length,
  }));

  res.json(paginate(summaries, page, limit));
});

router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  const story = STORIES.find(s => s.id === req.params.id);
  if (!story) return res.status(404).json(errorResponse('Câu chuyện không tồn tại', 'NOT_FOUND'));
  res.json({ story });
});

router.post('/:id/complete', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const story = STORIES.find(s => s.id === req.params.id);
    if (!story) return res.status(404).json(errorResponse('Câu chuyện không tồn tại', 'NOT_FOUND'));

    const { correctAnswers = 0, totalQuestions = 0 } = req.body;
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 100;
    const xpEarned = Math.round(story.xpReward * (accuracy / 100));

    await prisma.user.update({
      where: { id: req.userId! },
      data: { xp: { increment: xpEarned } },
    });

    res.json({
      completed: true,
      xpEarned,
      accuracy,
      message: accuracy >= 80 ? 'Tuyệt vời! Bạn hiểu câu chuyện rất tốt!' : 'Khá tốt! Hãy đọc lại để hiểu rõ hơn nhé.',
    });
  } catch {
    res.status(500).json(errorResponse('Lỗi khi hoàn thành câu chuyện', 'INTERNAL_ERROR'));
  }
});

export default router;
