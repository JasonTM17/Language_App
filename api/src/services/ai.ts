import dotenv from 'dotenv';
dotenv.config();

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  corrections: string[];
  suggestion: string;
  language: string;
}

type AIProvider = 'n8n' | 'openai' | 'mock';

function getProvider(): AIProvider {
  if (process.env.N8N_WEBHOOK_URL) return 'n8n';
  if (process.env.OPENAI_API_KEY) return 'openai';
  return 'mock';
}

function buildSystemPrompt(language: string, role: string): string {
  const langNames: Record<string, string> = { en: 'English', ja: 'Japanese', zh: 'Chinese', ko: 'Korean' };
  const langName = langNames[language] || 'English';

  const roleDescriptions: Record<string, string> = {
    teacher: `You are a friendly ${langName} teacher helping a Vietnamese student. Correct their mistakes gently, explain grammar, and encourage them.`,
    friend: `You are a casual friend chatting in ${langName}. Keep it natural and fun. Occasionally correct mistakes in a friendly way.`,
    interviewer: `You are conducting a job interview in ${langName}. Ask professional questions and give feedback on the student's responses.`,
    restaurant: `You are a waiter/waitress at a restaurant. Help the student practice ordering food in ${langName}.`,
    customer: `You are a customer service representative. Help the student practice ${langName} in a business context.`,
  };

  return `${roleDescriptions[role] || roleDescriptions.teacher}

Rules:
- Respond primarily in ${langName}
- After your response, add a Vietnamese translation in parentheses if the student is a beginner
- If the student makes a grammar or vocabulary mistake, point it out kindly
- Suggest a natural way to rephrase their sentence
- Keep responses concise (2-4 sentences max)
- Adapt difficulty to the student's level based on their messages`;
}

async function callN8N(messages: AIMessage[], language: string, role: string): Promise<string> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL!;

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages,
      language,
      role,
      systemPrompt: buildSystemPrompt(language, role),
    }),
  });

  if (!response.ok) throw new Error(`n8n webhook failed: ${response.status}`);
  const data = await response.json() as Record<string, string>;
  return data.output || data.response || data.text || JSON.stringify(data);
}

async function callOpenAI(messages: AIMessage[], language: string, role: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY!;
  const model = process.env.AI_MODEL || 'gpt-4o-mini';
  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';

  const systemMessage: AIMessage = { role: 'system', content: buildSystemPrompt(language, role) };

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [systemMessage, ...messages.slice(-10)],
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  if (!response.ok) throw new Error(`OpenAI API failed: ${response.status}`);
  const data = await response.json() as { choices: { message: { content: string } }[] };
  return data.choices[0].message.content;
}

function generateMockResponse(userMessage: string, language: string, role: string, history: AIMessage[]): string {
  const isFirstMessage = history.filter(m => m.role === 'user').length <= 1;
  const langNames: Record<string, string> = { en: 'English', ja: 'Japanese', zh: 'Chinese', ko: 'Korean' };

  const greetings: Record<string, Record<string, string>> = {
    teacher: {
      en: "Hello! I'm your English teacher. Let's practice together. How are you today?",
      ja: "こんにちは！私はあなたの日本語の先生です。一緒に練習しましょう。今日はどうですか？\n(Xin chào! Tôi là giáo viên tiếng Nhật của bạn. Hãy cùng luyện tập nhé. Hôm nay bạn thế nào?)",
      zh: "你好！我是你的中文老师。让我们一起练习吧。你今天怎么样？\n(Xin chào! Tôi là giáo viên tiếng Trung của bạn. Hãy cùng luyện tập nhé. Hôm nay bạn thế nào?)",
      ko: "안녕하세요! 저는 당신의 한국어 선생님입니다. 같이 연습합시다. 오늘 어떠세요?\n(Xin chào! Tôi là giáo viên tiếng Hàn của bạn. Hãy cùng luyện tập nhé. Hôm nay bạn thế nào?)",
    },
    friend: {
      en: "Hey! What's up? Let's just chat casually. Tell me something interesting!",
      ja: "やあ！元気？気軽に話そうよ。何か面白いことある？",
      zh: "嘿！最近怎么样？我们随便聊聊吧。有什么有趣的事吗？",
      ko: "안녕! 잘 지내? 편하게 얘기하자. 재미있는 거 있어?",
    },
    interviewer: {
      en: "Good morning. Thank you for coming in today. Please tell me about yourself and your experience.",
      ja: "おはようございます。本日はお越しいただきありがとうございます。自己紹介をお願いします。",
      zh: "早上好。感谢您今天来面试。请先自我介绍一下。",
      ko: "안녕하세요. 오늘 와주셔서 감사합니다. 자기소개를 부탁드립니다.",
    },
    restaurant: {
      en: "Welcome! Here's our menu. What would you like to order today?",
      ja: "いらっしゃいませ！メニューをどうぞ。今日は何になさいますか？",
      zh: "欢迎光临！这是我们的菜单。今天想吃点什么？",
      ko: "어서 오세요! 메뉴 여기 있습니다. 오늘 뭘 드시겠어요?",
    },
  };

  if (isFirstMessage) {
    const roleGreetings = greetings[role] || greetings.teacher;
    return roleGreetings[language] || roleGreetings.en;
  }

  const corrections: string[] = [];
  let correctionNote = '';

  if (language === 'en') {
    if (userMessage.charAt(0) !== userMessage.charAt(0).toUpperCase()) {
      corrections.push('Remember to capitalize the first letter of your sentence.');
      correctionNote = '\n\n📝 Tip: Start sentences with a capital letter.';
    }
    if (userMessage.length > 5 && !userMessage.match(/[.!?]$/)) {
      corrections.push('Don\'t forget punctuation at the end of your sentence.');
      correctionNote += '\n\n📝 Tip: End your sentence with a period (.), question mark (?), or exclamation mark (!).';
    }
  }

  const contextualResponses: Record<string, string[]> = {
    en: [
      `Great sentence! Here's a more natural way to say it: "${userMessage}" → You could also say it like a native speaker would.${correctionNote}`,
      `I understand what you mean! Let me help you sound more natural. Try: "..." instead.${correctionNote}`,
      `Good job! Your ${langNames[language]} is improving. Let's keep practicing. What else would you like to talk about?${correctionNote}`,
    ],
    ja: [
      `いい文ですね！もっと自然な言い方を教えますね。${correctionNote}\n(Câu tốt lắm! Để tôi dạy bạn cách nói tự nhiên hơn nhé.)`,
      `分かりました！もう少し自然に言うと...${correctionNote}\n(Tôi hiểu rồi! Nói tự nhiên hơn thì...)`,
      `上手ですね！練習を続けましょう。他に何か話したいことはありますか？${correctionNote}\n(Giỏi lắm! Hãy tiếp tục luyện tập. Bạn muốn nói về gì khác không?)`,
    ],
    zh: [
      `写得不错！更自然的说法是...${correctionNote}\n(Viết tốt lắm! Cách nói tự nhiên hơn là...)`,
      `我明白你的意思！试试这样说...${correctionNote}\n(Tôi hiểu ý bạn! Thử nói thế này...)`,
      `很好！你的中文在进步。我们继续聊吧。${correctionNote}\n(Rất tốt! Tiếng Trung của bạn đang tiến bộ. Chúng ta tiếp tục nói chuyện nhé.)`,
    ],
    ko: [
      `좋은 문장이에요! 더 자연스럽게 말하면...${correctionNote}\n(Câu tốt lắm! Nói tự nhiên hơn thì...)`,
      `이해했어요! 이렇게 말해 보세요...${correctionNote}\n(Tôi hiểu rồi! Thử nói thế này xem...)`,
      `잘 하고 있어요! 계속 연습합시다. 다른 이야기 해볼까요?${correctionNote}\n(Bạn đang làm tốt lắm! Tiếp tục luyện tập nhé. Nói chuyện khác nhé?)`,
    ],
  };

  const langResponses = contextualResponses[language] || contextualResponses.en;
  return langResponses[Math.floor(Math.random() * langResponses.length)];
}

function extractCorrections(aiContent: string): string[] {
  const corrections: string[] = [];
  const tipMatch = aiContent.match(/📝 Tip: (.+)/g);
  if (tipMatch) {
    tipMatch.forEach(t => corrections.push(t.replace('📝 Tip: ', '')));
  }
  return corrections;
}

export async function getAIResponse(
  userMessage: string,
  language: string,
  role: string,
  history: AIMessage[]
): Promise<AIResponse> {
  const provider = getProvider();
  const langNames: Record<string, string> = { en: 'English', ja: 'Japanese', zh: 'Chinese', ko: 'Korean' };

  let content: string;

  try {
    switch (provider) {
      case 'n8n':
        content = await callN8N(history, language, role);
        break;
      case 'openai':
        content = await callOpenAI(history, language, role);
        break;
      default:
        content = generateMockResponse(userMessage, language, role, history);
    }
  } catch (error) {
    console.error(`AI provider ${provider} failed, falling back to mock:`, error);
    content = generateMockResponse(userMessage, language, role, history);
  }

  const corrections = extractCorrections(content);
  const suggestions: Record<string, string[]> = {
    en: ['How was your weekend?', 'What do you do for work?', 'Tell me about your hobbies.', 'What did you eat today?'],
    ja: ['週末はどうでしたか？', 'お仕事は何ですか？', '趣味は何ですか？', '今日何を食べましたか？'],
    zh: ['周末过得怎么样？', '你做什么工作？', '你有什么爱好？', '你今天吃了什么？'],
    ko: ['주말 어떻게 보냈어요?', '무슨 일을 하세요?', '취미가 뭐예요?', '오늘 뭐 먹었어요?'],
  };

  const langSuggestions = suggestions[language] || suggestions.en;

  return {
    content,
    corrections,
    suggestion: langSuggestions[Math.floor(Math.random() * langSuggestions.length)],
    language: langNames[language] || 'English',
  };
}
