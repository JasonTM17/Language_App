import { Router, Response } from 'express';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';
import { getAIResponse, AIMessage } from '../services/ai';

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

    const history: AIMessage[] = messages
      .filter((m: any) => m.role === 'user' || m.role === 'assistant')
      .map((m: any) => ({ role: m.role, content: m.content }));

    const aiResponse = await getAIResponse(message, session.language, session.role, history);
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

export default router;
