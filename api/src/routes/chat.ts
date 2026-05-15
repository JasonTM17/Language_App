import { Router, Response } from 'express';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/start', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { language, role } = req.body;
    const session = await prisma.chatSession.create({
      data: {
        userId: req.userId!,
        language: language || 'en',
        role: role || 'teacher',
        messages: JSON.stringify([]),
      },
    });
    res.json({ session: { id: session.id, language: session.language, role: session.role, messages: [] } });
  } catch {
    res.status(500).json({ error: 'Failed to start chat session' });
  }
});

router.post('/:sessionId/message', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { message } = req.body;
    const session = await prisma.chatSession.findUnique({ where: { id: req.params.sessionId } });
    if (!session || session.userId !== req.userId!) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const messages = JSON.parse(session.messages);
    messages.push({ role: 'user', content: message, timestamp: new Date().toISOString() });

    const aiResponse = generateAIResponse(message, session.language, session.role, messages);
    messages.push({ role: 'assistant', content: aiResponse.content, corrections: aiResponse.corrections, timestamp: new Date().toISOString() });

    await prisma.chatSession.update({
      where: { id: session.id },
      data: { messages: JSON.stringify(messages) },
    });

    res.json({ response: aiResponse, messages });
  } catch {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

router.get('/sessions', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const sessions = await prisma.chatSession.findMany({
      where: { userId: req.userId! },
      orderBy: { updatedAt: 'desc' },
      take: 20,
    });
    res.json({ sessions: sessions.map(s => ({ ...s, messages: JSON.parse(s.messages) })) });
  } catch {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

function generateAIResponse(userMessage: string, language: string, role: string, _history: any[]) {
  const rolePrompts: Record<string, string> = {
    teacher: 'I am your language teacher.',
    friend: 'Hey! Let\'s chat casually.',
    interviewer: 'Let\'s practice an interview scenario.',
    restaurant: 'Welcome! What would you like to order?',
  };

  const corrections: string[] = [];
  const langNames: Record<string, string> = { en: 'English', ja: 'Japanese', zh: 'Chinese', ko: 'Korean' };

  if (userMessage.length < 3) {
    corrections.push('Try writing a longer sentence for better practice.');
  }

  const responses: Record<string, string[]> = {
    en: [
      'That\'s a great sentence! Let me suggest a more natural way to say it.',
      'Good effort! Here\'s how a native speaker might phrase that.',
      'Nice! Let\'s continue our conversation. What do you think about...?',
    ],
    ja: [
      'いい文ですね！もう少し自然な言い方を提案します。',
      'よく頑張りましたね！ネイティブならこう言うかもしれません。',
      '素晴らしい！会話を続けましょう。',
    ],
    zh: [
      '写得不错！让我建议一个更自然的表达方式。',
      '很好的尝试！母语者可能会这样说。',
      '太棒了！让我们继续对话吧。',
    ],
    ko: [
      '좋은 문장이에요! 더 자연스러운 표현을 제안해 드릴게요.',
      '잘 했어요! 원어민은 이렇게 말할 수도 있어요.',
      '훌륭해요! 대화를 계속해 봅시다.',
    ],
  };

  const langResponses = responses[language] || responses.en;
  const content = `${rolePrompts[role] || rolePrompts.teacher} ${langResponses[Math.floor(Math.random() * langResponses.length)]}`;

  return {
    content,
    corrections,
    suggestion: `Try practicing with: "${getSuggestion(language)}"`,
    language: langNames[language] || 'English',
  };
}

function getSuggestion(language: string): string {
  const suggestions: Record<string, string[]> = {
    en: ['How was your day?', 'What do you do for work?', 'Tell me about your hobbies.'],
    ja: ['今日はどうでしたか？', 'お仕事は何ですか？', '趣味は何ですか？'],
    zh: ['你今天过得怎么样？', '你做什么工作？', '你有什么爱好？'],
    ko: ['오늘 하루 어땠어요?', '무슨 일을 하세요?', '취미가 뭐예요?'],
  };
  const langSuggestions = suggestions[language] || suggestions.en;
  return langSuggestions[Math.floor(Math.random() * langSuggestions.length)];
}

export default router;
