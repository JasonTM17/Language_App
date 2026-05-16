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
    teacher: `You are a friendly, patient ${langName} teacher helping a Vietnamese student learn ${langName}. Your teaching style:
- Correct mistakes gently with explanations in Vietnamese (tiếng Việt)
- After each response, provide: 1) Your reply in ${langName}, 2) Key vocabulary with Vietnamese meaning, 3) Grammar note if relevant
- Adapt difficulty based on the student's level
- Use 📝 prefix for tips and corrections
- Encourage the student and celebrate progress`,
    friend: `You are a fun, casual friend chatting in ${langName} with a Vietnamese learner. Your style:
- Keep conversations natural and engaging
- Use slang and colloquial expressions (explain them in Vietnamese)
- Gently correct mistakes without being formal
- Share cultural context when relevant
- Ask follow-up questions to keep the conversation flowing`,
    interviewer: `You are a professional interviewer conducting a job interview in ${langName}. Your approach:
- Ask realistic interview questions progressively (easy → hard)
- Give constructive feedback on answers
- Suggest better ways to phrase responses
- Cover: self-introduction, experience, strengths, situational questions
- Provide Vietnamese translations for key professional vocabulary`,
    restaurant: `You are a friendly waiter/waitress at a restaurant helping a Vietnamese student practice ordering in ${langName}. Your approach:
- Present a realistic menu with items in ${langName}
- Guide through: greeting, ordering drinks, food, asking about dishes, paying
- Teach food-related vocabulary with Vietnamese meanings
- Include cultural dining etiquette for the target language's country`,
    customer: `You are a customer service representative helping a Vietnamese student practice ${langName} in business contexts. Scenarios include:
- Making complaints and getting resolutions
- Asking about products/services
- Scheduling appointments
- Handling returns/exchanges
- Teach polite business phrases with Vietnamese translations`,
    doctor: `You are a doctor at a clinic helping a Vietnamese student practice medical ${langName}. Your approach:
- Ask about symptoms and health concerns
- Explain diagnoses in simple ${langName}
- Teach body parts and medical vocabulary with Vietnamese meanings
- Practice making appointments and describing pain levels`,
    travel: `You are a helpful local guide assisting a Vietnamese tourist in ${langName}. Scenarios:
- Asking for directions
- Booking hotels and transportation
- Buying tickets and souvenirs
- Handling emergencies abroad
- Teach travel-essential phrases with Vietnamese translations`,
  };

  return `${roleDescriptions[role] || roleDescriptions.teacher}

Rules:
- Respond primarily in ${langName}
- After your main response, add a Vietnamese translation in parentheses for key phrases
- If the student makes a grammar or vocabulary mistake, mark it with 📝 and explain the correction
- Suggest a more natural way to rephrase their sentence
- Keep responses concise (3-5 sentences for the main reply)
- Adapt difficulty to the student's level based on their messages
- Include 1-2 new vocabulary words per response with Vietnamese meaning
- Use **bold** for new vocabulary words
- End with a follow-up question to keep the conversation going
- If the student writes in Vietnamese, gently encourage them to try in ${langName}`;
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
      en: "Hello! I'm your English teacher. Let's practice together. How are you today?\n\n**Vocabulary:** practice (luyện tập), together (cùng nhau)\n\nHow would you like to start? Tell me about your day!",
      ja: "こんにちは！私はあなたの日本語の先生です。一緒に練習しましょう。\n\n**語彙:** 練習 (れんしゅう - luyện tập), 一緒に (いっしょに - cùng nhau)\n\n(Xin chào! Tôi là giáo viên tiếng Nhật của bạn. Hãy cùng luyện tập nhé.)\n\n今日は何をしましたか？(Hôm nay bạn đã làm gì?)",
      zh: "你好！我是你的中文老师。让我们一起练习吧。\n\n**词汇:** 练习 (liànxí - luyện tập), 一起 (yìqǐ - cùng nhau)\n\n(Xin chào! Tôi là giáo viên tiếng Trung của bạn. Hãy cùng luyện tập nhé.)\n\n你今天过得怎么样？(Hôm nay bạn thế nào?)",
      ko: "안녕하세요! 저는 당신의 한국어 선생님입니다. 같이 연습합시다.\n\n**어휘:** 연습 (yeonseup - luyện tập), 같이 (gachi - cùng nhau)\n\n(Xin chào! Tôi là giáo viên tiếng Hàn của bạn. Hãy cùng luyện tập nhé.)\n\n오늘 뭐 했어요? (Hôm nay bạn đã làm gì?)",
    },
    friend: {
      en: "Hey! What's up? I'm so bored today. Let's just chat about anything! What have you been up to lately?",
      ja: "やあ！元気？今日暇だから話そうよ。最近何してた？\n(Hey! Khỏe không? Hôm nay rảnh nên nói chuyện đi. Gần đây làm gì vậy?)",
      zh: "嘿！最近怎么样？今天好无聊啊，我们聊聊天吧。你最近在忙什么？\n(Hey! Gần đây thế nào? Hôm nay chán quá, mình nói chuyện đi. Gần đây bạn bận gì?)",
      ko: "안녕! 잘 지내? 오늘 너무 심심해서 얘기하자. 요즘 뭐 하고 있어?\n(Hey! Khỏe không? Hôm nay chán quá nên nói chuyện đi. Dạo này đang làm gì?)",
    },
    interviewer: {
      en: "Good morning. Thank you for coming in today. I'm the hiring manager for this position. Before we begin, could you please introduce yourself briefly?",
      ja: "おはようございます。本日はお越しいただきありがとうございます。私はこのポジションの採用担当です。まず、簡単に自己紹介をお願いできますか？\n(Xin chào. Cảm ơn bạn đã đến hôm nay. Tôi là người phụ trách tuyển dụng. Trước tiên, bạn có thể tự giới thiệu ngắn gọn được không?)",
      zh: "早上好。感谢您今天来面试。我是这个职位的招聘经理。在开始之前，请您先简单地自我介绍一下好吗？\n(Xin chào. Cảm ơn bạn đã đến phỏng vấn hôm nay. Tôi là quản lý tuyển dụng. Trước khi bắt đầu, bạn có thể tự giới thiệu ngắn gọn không?)",
      ko: "안녕하세요. 오늘 와주셔서 감사합니다. 저는 이 포지션의 채용 담당자입니다. 시작하기 전에 간단히 자기소개를 해주시겠어요?\n(Xin chào. Cảm ơn bạn đã đến hôm nay. Tôi là người phụ trách tuyển dụng. Trước khi bắt đầu, bạn có thể tự giới thiệu không?)",
    },
    restaurant: {
      en: "Welcome to The Golden Spoon! Here's our menu today:\n\n🥗 Starters: Caesar Salad ($8), Soup of the Day ($6)\n🍝 Mains: Grilled Salmon ($18), Pasta Carbonara ($14), Steak ($22)\n🍰 Desserts: Tiramisu ($7), Ice Cream ($5)\n\nWhat can I get for you?",
      ja: "いらっしゃいませ！「和食亭」へようこそ。本日のメニューです：\n\n🍣 前菜: 枝豆 (¥300), 味噌汁 (¥200)\n🍱 メイン: 寿司セット (¥1500), 天ぷら定食 (¥1200), 焼き魚 (¥900)\n🍵 デザート: 抹茶アイス (¥400)\n\nご注文はお決まりですか？\n(Xin chào! Chào mừng đến nhà hàng. Bạn muốn gọi gì?)",
      zh: "欢迎光临「好味道」！这是我们今天的菜单：\n\n🥟 前菜: 凉拌黄瓜 (¥15), 酸辣汤 (¥20)\n🍜 主菜: 宫保鸡丁 (¥38), 红烧肉 (¥45), 麻婆豆腐 (¥28)\n🍵 甜点: 芒果布丁 (¥18)\n\n请问您想吃点什么？\n(Chào mừng! Đây là menu. Bạn muốn ăn gì?)",
      ko: "어서 오세요! '맛있는 집'에 오신 것을 환영합니다. 오늘의 메뉴입니다:\n\n🥗 전채: 김치 (₩5,000), 된장찌개 (₩7,000)\n🍖 메인: 불고기 (₩15,000), 비빔밥 (₩10,000), 삼겹살 (₩13,000)\n🍨 디저트: 팥빙수 (₩6,000)\n\n뭘 드시겠어요?\n(Chào mừng! Đây là menu. Bạn muốn gọi gì?)",
    },
    doctor: {
      en: "Good morning! I'm Dr. Smith. Please have a seat. What brings you in today? Are you experiencing any symptoms?\n\n**Vocabulary:** symptoms (triệu chứng), appointment (cuộc hẹn)",
      ja: "おはようございます。田中医師です。どうぞお座りください。今日はどうされましたか？何か症状はありますか？\n\n**語彙:** 症状 (しょうじょう - triệu chứng), 診察 (しんさつ - khám bệnh)\n(Xin chào. Tôi là bác sĩ Tanaka. Hôm nay bạn đến vì lý do gì? Có triệu chứng gì không?)",
      zh: "早上好！我是李医生。请坐。今天来看什么问题？有什么不舒服的地方吗？\n\n**词汇:** 症状 (zhèngzhuàng - triệu chứng), 看病 (kànbìng - khám bệnh)\n(Xin chào! Tôi là bác sĩ Lý. Hôm nay bạn đến khám vì lý do gì?)",
      ko: "안녕하세요! 김 의사입니다. 앉으세요. 오늘 어떻게 오셨어요? 어디가 불편하세요?\n\n**어휘:** 증상 (jeungsang - triệu chứng), 진찰 (jinchal - khám bệnh)\n(Xin chào! Tôi là bác sĩ Kim. Hôm nay bạn đến vì lý do gì?)",
    },
    travel: {
      en: "Welcome to our city! I'm a local guide. Are you looking for directions, recommendations, or help with transportation? Where would you like to go today?\n\n**Vocabulary:** directions (chỉ đường), transportation (phương tiện giao thông)",
      ja: "東京へようこそ！地元のガイドです。道案内、おすすめの場所、交通機関のことなど、何でも聞いてください。今日はどこに行きたいですか？\n\n**語彙:** 道案内 (みちあんない - chỉ đường), 交通 (こうつう - giao thông)\n(Chào mừng đến Tokyo! Tôi là hướng dẫn viên. Hôm nay bạn muốn đi đâu?)",
      zh: "欢迎来到北京！我是当地的导游。需要问路、推荐景点，还是交通方面的帮助？今天想去哪里？\n\n**词汇:** 问路 (wènlù - hỏi đường), 交通 (jiāotōng - giao thông)\n(Chào mừng đến Bắc Kinh! Tôi là hướng dẫn viên. Hôm nay bạn muốn đi đâu?)",
      ko: "서울에 오신 것을 환영합니다! 저는 현지 가이드예요. 길 안내, 추천 장소, 교통편 중에 뭐가 필요하세요? 오늘 어디 가고 싶으세요?\n\n**어휘:** 길 안내 (gil annae - chỉ đường), 교통 (gyotong - giao thông)\n(Chào mừng đến Seoul! Tôi là hướng dẫn viên. Hôm nay bạn muốn đi đâu?)",
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
