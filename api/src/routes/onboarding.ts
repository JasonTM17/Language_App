import { Router, Response } from 'express';
import { z } from 'zod';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

const onboardingSchema = z.object({
  languages: z.array(z.string()).min(1),
  dailyGoal: z.number().int().min(5).max(60),
  level: z.enum(['beginner', 'elementary', 'intermediate', 'advanced']),
  motivation: z.enum(['travel', 'work', 'study', 'culture', 'friends', 'other']).optional(),
});

const placementAnswerSchema = z.object({
  language: z.string(),
  answers: z.array(z.object({
    questionId: z.string(),
    answer: z.string(),
  })),
});

interface PlacementQuestion {
  id: string;
  question: string;
  questionVi: string;
  options: string[];
  correct: string;
  level: string;
}

const PLACEMENT_TESTS: Record<string, PlacementQuestion[]> = {
  en: [
    { id: 'en-pt-1', question: 'Choose the correct greeting:', questionVi: 'Chọn lời chào đúng:', options: ['Good morning', 'Good mourning', 'God morning', 'Goo morning'], correct: 'Good morning', level: 'beginner' },
    { id: 'en-pt-2', question: 'What is the past tense of "go"?', questionVi: '"go" ở thì quá khứ là gì?', options: ['goed', 'went', 'gone', 'going'], correct: 'went', level: 'beginner' },
    { id: 'en-pt-3', question: 'Complete: "She ___ to school every day."', questionVi: 'Điền: "She ___ to school every day."', options: ['go', 'goes', 'going', 'gone'], correct: 'goes', level: 'elementary' },
    { id: 'en-pt-4', question: 'Which sentence is correct?', questionVi: 'Câu nào đúng?', options: ['I have been to Japan last year.', 'I went to Japan last year.', 'I have went to Japan last year.', 'I go to Japan last year.'], correct: 'I went to Japan last year.', level: 'elementary' },
    { id: 'en-pt-5', question: 'Choose the correct word: "If I ___ rich, I would travel the world."', questionVi: 'Chọn từ đúng: "If I ___ rich, I would travel the world."', options: ['am', 'was', 'were', 'be'], correct: 'were', level: 'intermediate' },
    { id: 'en-pt-6', question: '"Despite ___ hard, he failed the exam."', questionVi: '"Despite ___ hard, he failed the exam."', options: ['study', 'studying', 'studied', 'to study'], correct: 'studying', level: 'intermediate' },
    { id: 'en-pt-7', question: 'The passive form of "They are building a new bridge" is:', questionVi: 'Dạng bị động của "They are building a new bridge" là:', options: ['A new bridge is being built.', 'A new bridge is built.', 'A new bridge was being built.', 'A new bridge has been built.'], correct: 'A new bridge is being built.', level: 'advanced' },
    { id: 'en-pt-8', question: '"Had I known about the meeting, I ___ attended."', questionVi: '"Had I known about the meeting, I ___ attended."', options: ['would have', 'will have', 'would', 'had'], correct: 'would have', level: 'advanced' },
  ],
  ja: [
    { id: 'ja-pt-1', question: '「おはよう」の意味は？', questionVi: '"おはよう" nghĩa là gì?', options: ['Chào buổi sáng', 'Tạm biệt', 'Cảm ơn', 'Xin lỗi'], correct: 'Chào buổi sáng', level: 'beginner' },
    { id: 'ja-pt-2', question: '「私は学生です」の意味は？', questionVi: '"私は学生です" nghĩa là gì?', options: ['Tôi là giáo viên', 'Tôi là học sinh', 'Tôi là bác sĩ', 'Tôi là nhân viên'], correct: 'Tôi là học sinh', level: 'beginner' },
    { id: 'ja-pt-3', question: '正しい助詞を選んでください：「東京＿行きます」', questionVi: 'Chọn trợ từ đúng: "東京＿行きます"', options: ['に', 'を', 'が', 'は'], correct: 'に', level: 'elementary' },
    { id: 'ja-pt-4', question: '「食べたことがある」の意味は？', questionVi: '"食べたことがある" nghĩa là gì?', options: ['Đang ăn', 'Đã từng ăn', 'Sẽ ăn', 'Muốn ăn'], correct: 'Đã từng ăn', level: 'intermediate' },
  ],
  zh: [
    { id: 'zh-pt-1', question: '"你好"的意思是什么？', questionVi: '"你好" nghĩa là gì?', options: ['Xin chào', 'Tạm biệt', 'Cảm ơn', 'Xin lỗi'], correct: 'Xin chào', level: 'beginner' },
    { id: 'zh-pt-2', question: '选择正确的量词："一___书"', questionVi: 'Chọn lượng từ đúng: "一___书"', options: ['本', '个', '只', '条'], correct: '本', level: 'elementary' },
    { id: 'zh-pt-3', question: '"我已经吃过了"的意思是？', questionVi: '"我已经吃过了" nghĩa là gì?', options: ['Tôi đang ăn', 'Tôi đã ăn rồi', 'Tôi muốn ăn', 'Tôi chưa ăn'], correct: 'Tôi đã ăn rồi', level: 'intermediate' },
    { id: 'zh-pt-4', question: '"虽然很贵，但是质量很好"用了什么语法？', questionVi: '"虽然很贵，但是质量很好" dùng ngữ pháp gì?', options: ['Nhượng bộ (mặc dù...nhưng)', 'Điều kiện (nếu...thì)', 'Nguyên nhân (vì...nên)', 'Mục đích (để...thì)'], correct: 'Nhượng bộ (mặc dù...nhưng)', level: 'advanced' },
  ],
  ko: [
    { id: 'ko-pt-1', question: '"안녕하세요"의 뜻은?', questionVi: '"안녕하세요" nghĩa là gì?', options: ['Xin chào', 'Tạm biệt', 'Cảm ơn', 'Xin lỗi'], correct: 'Xin chào', level: 'beginner' },
    { id: 'ko-pt-2', question: '올바른 조사를 고르세요: "학교___갑니다"', questionVi: 'Chọn trợ từ đúng: "학교___갑니다"', options: ['에', '을', '이', '는'], correct: '에', level: 'elementary' },
    { id: 'ko-pt-3', question: '"먹어 본 적이 있다"의 뜻은?', questionVi: '"먹어 본 적이 있다" nghĩa là gì?', options: ['Đang ăn', 'Đã từng ăn', 'Sẽ ăn', 'Muốn ăn'], correct: 'Đã từng ăn', level: 'intermediate' },
  ],
};

function determinePlacementLevel(language: string, answers: { questionId: string; answer: string }[]): string {
  const questions = PLACEMENT_TESTS[language] || [];
  let correctByLevel: Record<string, number> = { beginner: 0, elementary: 0, intermediate: 0, advanced: 0 };
  let totalByLevel: Record<string, number> = { beginner: 0, elementary: 0, intermediate: 0, advanced: 0 };

  for (const ans of answers) {
    const q = questions.find(qq => qq.id === ans.questionId);
    if (!q) continue;
    totalByLevel[q.level]++;
    if (ans.answer === q.correct) correctByLevel[q.level]++;
  }

  if (totalByLevel.advanced > 0 && correctByLevel.advanced / totalByLevel.advanced >= 0.5) return 'advanced';
  if (totalByLevel.intermediate > 0 && correctByLevel.intermediate / totalByLevel.intermediate >= 0.5) return 'intermediate';
  if (totalByLevel.elementary > 0 && correctByLevel.elementary / totalByLevel.elementary >= 0.5) return 'elementary';
  return 'beginner';
}

router.post('/complete', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { languages, dailyGoal, level, motivation } = onboardingSchema.parse(req.body);

    await prisma.user.update({
      where: { id: req.userId! },
      data: { onboardingCompleted: true, dailyGoal },
    });

    for (const langCode of languages) {
      const language = await prisma.language.findUnique({ where: { code: langCode } });
      if (!language) continue;

      const levelRecord = await prisma.level.findFirst({
        where: { languageId: language.id, slug: level },
      });
      if (!levelRecord) continue;

      await prisma.enrollment.upsert({
        where: { userId_languageId: { userId: req.userId!, languageId: language.id } },
        update: { levelId: levelRecord.id },
        create: { userId: req.userId!, languageId: language.id, levelId: levelRecord.id },
      });
    }

    res.json({
      success: true,
      message: 'Chào mừng bạn đến với LinguaFlow! Hãy bắt đầu hành trình học ngôn ngữ.',
      nextStep: 'dashboard',
      xpBonus: 10,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Lỗi khi hoàn thành đăng ký' });
  }
});

router.get('/status', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: { onboardingCompleted: true, dailyGoal: true },
    });
    res.json({ completed: user?.onboardingCompleted || false, dailyGoal: user?.dailyGoal });
  } catch {
    res.status(500).json({ error: 'Lỗi khi kiểm tra trạng thái' });
  }
});

router.get('/placement-test/:lang', authenticate, async (req: AuthRequest, res: Response) => {
  const { lang } = req.params;
  const questions = PLACEMENT_TESTS[lang];
  if (!questions) {
    return res.status(404).json({ error: 'Không có bài kiểm tra cho ngôn ngữ này' });
  }

  const safeQuestions = questions.map(({ correct, ...rest }) => rest);
  res.json({ questions: safeQuestions, language: lang, totalQuestions: safeQuestions.length });
});

router.post('/placement-test/submit', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { language, answers } = placementAnswerSchema.parse(req.body);
    const level = determinePlacementLevel(language, answers);

    const questions = PLACEMENT_TESTS[language] || [];
    const correctCount = answers.filter(a => {
      const q = questions.find(qq => qq.id === a.questionId);
      return q && a.answer === q.correct;
    }).length;

    res.json({
      level,
      score: correctCount,
      total: answers.length,
      accuracy: Math.round((correctCount / answers.length) * 100),
      message: `Trình độ của bạn: ${level === 'beginner' ? 'Sơ cấp' : level === 'elementary' ? 'Cơ bản' : level === 'intermediate' ? 'Trung cấp' : 'Nâng cao'}`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
    res.status(500).json({ error: 'Lỗi khi xử lý bài kiểm tra' });
  }
});

router.get('/motivations', authenticate, async (_req: AuthRequest, res: Response) => {
  res.json({
    motivations: [
      { id: 'travel', label: 'Du lịch', icon: '✈️', description: 'Giao tiếp khi đi du lịch nước ngoài' },
      { id: 'work', label: 'Công việc', icon: '💼', description: 'Nâng cao cơ hội nghề nghiệp' },
      { id: 'study', label: 'Học tập', icon: '📚', description: 'Chuẩn bị cho kỳ thi hoặc du học' },
      { id: 'culture', label: 'Văn hóa', icon: '🎭', description: 'Hiểu phim, nhạc, manga, K-drama' },
      { id: 'friends', label: 'Bạn bè', icon: '👥', description: 'Giao tiếp với bạn bè quốc tế' },
      { id: 'other', label: 'Khác', icon: '🌟', description: 'Lý do khác' },
    ],
  });
});

export default router;
