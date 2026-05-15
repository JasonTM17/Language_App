'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function PronunciationPage() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  ];

  const samplePhrases: Record<string, string[]> = {
    en: ['Hello, how are you?', 'Nice to meet you.', 'What is your name?', 'Thank you very much.'],
    ja: ['こんにちは、元気ですか？', 'はじめまして。', 'お名前は何ですか？', 'ありがとうございます。'],
    zh: ['你好，你好吗？', '认识你很高兴。', '你叫什么名字？', '非常感谢。'],
    ko: ['안녕하세요, 잘 지내세요?', '만나서 반갑습니다.', '이름이 뭐예요?', '감사합니다.'],
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      setTimeout(() => {
        setFeedback('Good attempt! Your pronunciation is clear. Try to focus on the intonation of the last syllable for a more natural sound.');
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleTextPractice = () => {
    if (!text.trim()) return;
    setFeedback(`Analyzing "${text}"...\n\nYour text looks good! Here are some tips:\n• Pay attention to stress patterns\n• Practice the rhythm of the sentence\n• Try speaking slowly first, then speed up`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display">Pronunciation Practice</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Improve your speaking skills</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <h2 className="font-semibold mb-4">Select Language</h2>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { setLanguage(lang.code); setFeedback(null); }}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                language === lang.code ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="text-xl">{lang.flag}</div>
              <p className="text-xs font-medium mt-1">{lang.name}</p>
            </button>
          ))}
        </div>

        <h2 className="font-semibold mb-3">Sample Phrases</h2>
        <div className="space-y-2 mb-6">
          {samplePhrases[language]?.map((phrase, i) => (
            <button
              key={i}
              onClick={() => setText(phrase)}
              className="w-full text-left p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors text-sm"
            >
              {phrase}
            </button>
          ))}
        </div>

        <h2 className="font-semibold mb-3">Or Type Your Own</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a sentence to practice..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none resize-none h-24"
        />

        <div className="flex gap-3 mt-4">
          <Button
            onClick={handleRecord}
            variant={isRecording ? 'destructive' : 'default'}
            className="flex-1"
          >
            {isRecording ? '⏹ Stop Recording' : '🎙️ Record Voice'}
          </Button>
          <Button onClick={handleTextPractice} variant="outline" className="flex-1">
            📝 Analyze Text
          </Button>
        </div>

        {isRecording && (
          <div className="mt-4 flex items-center justify-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-red-700 dark:text-red-300">Recording... Speak now</span>
          </div>
        )}
      </div>

      {feedback && (
        <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Feedback</h3>
          <p className="text-sm text-green-700 dark:text-green-400 whitespace-pre-line">{feedback}</p>
        </div>
      )}

      <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800">
        <p className="text-sm text-yellow-800 dark:text-yellow-300">
          💡 <strong>Note:</strong> Full speech-to-text integration coming soon. Currently using simulated feedback for practice flow.
        </p>
      </div>
    </div>
  );
}
