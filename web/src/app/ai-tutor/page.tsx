'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';
import { GraduationCap, HandMetal, Briefcase, UtensilsCrossed, MessageSquare, type LucideIcon } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  corrections?: string[];
  suggestion?: string;
  timestamp?: string;
}

const roles: { id: string; label: string; icon: LucideIcon; desc: string }[] = [
  { id: 'teacher', label: 'Teacher', icon: GraduationCap, desc: 'Formal learning' },
  { id: 'friend', label: 'Friend', icon: HandMetal, desc: 'Casual chat' },
  { id: 'interviewer', label: 'Interviewer', icon: Briefcase, desc: 'Job practice' },
  { id: 'restaurant', label: 'Restaurant', icon: UtensilsCrossed, desc: 'Order food' },
];

const languageOptions = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function AITutorPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedRole, setSelectedRole] = useState('teacher');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startSession = async () => {
    setLoading(true);
    try {
      const data = await api.chat.start({ language: selectedLang, role: selectedRole });
      setSessionId(data.session.id);
      setMessages([{
        role: 'assistant',
        content: getWelcomeMessage(selectedLang, selectedRole),
      }]);
    } catch (err) {
      setMessages([{
        role: 'assistant',
        content: getWelcomeMessage(selectedLang, selectedRole),
      }]);
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      if (sessionId) {
        const data = await api.chat.sendMessage(sessionId, input.trim());
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.response.content,
          corrections: data.response.corrections,
          suggestion: data.response.suggestion,
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: getMockResponse(selectedLang, selectedRole),
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: getMockResponse(selectedLang, selectedRole),
      }]);
    }
    setLoading(false);
  };

  if (!sessionId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div>
          <h1 className="text-2xl font-bold font-display">AI Tutor</h1>
          <p className="text-muted-foreground mt-1">Luyện hội thoại với trợ lý AI</p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5">
          <h2 className="font-semibold mb-4">Chọn ngôn ngữ</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {languageOptions.map((lang, index) => (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.04, 0.4) }}
                onClick={() => setSelectedLang(lang.code)}
                className={`p-4 rounded-xl border-2 text-center transition-all hover:shadow-md hover:shadow-purple-500/5 ${
                  selectedLang === lang.code
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/20'
                }`}
              >
                <div className="text-2xl mb-1">{lang.flag}</div>
                <p className="text-sm font-medium">{lang.name}</p>
              </motion.button>
            ))}
          </div>

          <h2 className="font-semibold mb-4">Chọn tình huống</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {roles.map((role, index) => (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min((index + 4) * 0.04, 0.4) }}
                onClick={() => setSelectedRole(role.id)}
                className={`p-4 rounded-xl border-2 text-center transition-all hover:shadow-md hover:shadow-purple-500/5 ${
                  selectedRole === role.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/20'
                }`}
              >
                <div className="flex justify-center mb-1">
                  <role.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium">{role.label}</p>
                <p className="text-xs text-muted-foreground">{role.desc}</p>
              </motion.button>
            ))}
          </div>

          <Button onClick={startSession} loading={loading} className="w-full" size="lg">
            Bắt đầu hội thoại
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-8rem)]"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold font-display">AI Tutor</h1>
          <p className="text-sm text-muted-foreground">
            {languageOptions.find(l => l.code === selectedLang)?.flag} {languageOptions.find(l => l.code === selectedLang)?.name} • {roles.find(r => r.id === selectedRole)?.label}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => { setSessionId(null); setMessages([]); }}>
          New Session
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-br-md'
                  : 'bg-gray-100 dark:bg-gray-700 rounded-bl-md'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                {msg.corrections && msg.corrections.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-xs font-medium text-orange-600 dark:text-orange-400">Corrections:</p>
                    {msg.corrections.map((c, j) => <p key={j} className="text-xs mt-1">{c}</p>)}
                  </div>
                )}
                {msg.suggestion && (
                  <p className="text-xs mt-2 opacity-75 italic">{msg.suggestion}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex justify-start">
            <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-700 rounded-bl-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-4 py-3 rounded-xl border border-border/60 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 outline-none"
          disabled={loading}
        />
        <Button onClick={sendMessage} disabled={!input.trim() || loading}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        </Button>
      </div>
    </motion.div>
  );
}

function getWelcomeMessage(lang: string, role: string): string {
  const messages: Record<string, Record<string, string>> = {
    en: {
      teacher: "Hello! I'm your English teacher. Let's practice together. How are you today?",
      friend: "Hey! What's up? Let's chat in English. Tell me about your day!",
      interviewer: "Good morning. Thank you for coming in today. Please tell me about yourself.",
      restaurant: "Welcome to our restaurant! Here's the menu. What would you like to order?",
    },
    ja: {
      teacher: "こんにちは！私はあなた日本語の先生です。一緒に練習しましょう。今日はどうですか？",
      friend: "やあ！元気？日本語で話そう！今日は何してた？",
      interviewer: "おはようございます。本日はお越しいただきありがとうございます。自己紹介をお願いします。",
      restaurant: "いらっしゃいませ！メニューをどうぞ。何になさいますか？",
    },
    zh: {
      teacher: "你好！我是你的中文老师。让我们一起练习吧。你今天怎么样？",
      friend: "嗨！最近怎么样？我们用中文聊天吧！",
      interviewer: "早上好。感谢您今天来面试。请做一下自我介绍。",
      restaurant: "欢迎光临！这是菜单。您想点什么？",
    },
    ko: {
      teacher: "안녕하세요! 저는 당신의 한국어 선생님입니다. 같이 연습합시다. 오늘 어떠세요?",
      friend: "안녕! 잘 지내? 한국어로 이야기하자! 오늘 뭐 했어?",
      interviewer: "안녕하세요. 오늘 와주셔서 감사합니다. 자기소개를 해주세요.",
      restaurant: "어서오세요! 메뉴판입니다. 무엇을 주문하시겠어요?",
    },
  };
  return messages[lang]?.[role] || messages.en.teacher;
}

function getMockResponse(lang: string, _role: string): string {
  const responses: Record<string, string[]> = {
    en: ["That's great! Let me help you improve that sentence.", "Good effort! Here's a more natural way to say it.", "Nice! Let's continue our conversation."],
    ja: ["いいですね！その文を改善しましょう。", "よく頑張りました！もっと自然な言い方があります。", "素晴らしい！会話を続けましょう。"],
    zh: ["很好！让我帮你改进这个句子。", "不错的尝试！这是更自然的说法。", "太棒了！让我们继续对话。"],
    ko: ["좋아요! 그 문장을 개선해 봅시다.", "잘 했어요! 더 자연스러운 표현이 있어요.", "훌륭해요! 대화를 계속합시다."],
  };
  const langResponses = responses[lang] || responses.en;
  return langResponses[Math.floor(Math.random() * langResponses.length)];
}
