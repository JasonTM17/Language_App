'use client';

import { useState } from 'react';

interface WritingPrompt {
  id: string;
  language: string;
  level: string;
  topic: string;
  prompt: string;
  promptVi: string;
  hints: string[];
}

const writingPrompts: WritingPrompt[] = [
  { id: 'en-1', language: 'en', level: 'beginner', topic: 'Self Introduction', prompt: 'Write a short paragraph introducing yourself (name, age, hometown, hobbies).', promptVi: 'Viết một đoạn ngắn giới thiệu bản thân (tên, tuổi, quê quán, sở thích).', hints: ['My name is...', 'I am ... years old', 'I come from...', 'I like...'] },
  { id: 'en-2', language: 'en', level: 'beginner', topic: 'Daily Routine', prompt: 'Describe your typical day from morning to evening.', promptVi: 'Mô tả một ngày bình thường của bạn từ sáng đến tối.', hints: ['I wake up at...', 'In the morning, I...', 'After lunch, I...', 'In the evening, I...'] },
  { id: 'en-3', language: 'en', level: 'beginner', topic: 'My Family', prompt: 'Write about your family members and what they do.', promptVi: 'Viết về các thành viên trong gia đình và công việc của họ.', hints: ['There are ... people in my family', 'My father is...', 'My mother works as...', 'I have ... siblings'] },
  { id: 'en-4', language: 'en', level: 'intermediate', topic: 'Favorite Place', prompt: 'Describe your favorite place to visit and explain why you like it.', promptVi: 'Mô tả nơi bạn thích đến nhất và giải thích tại sao.', hints: ['My favorite place is...', 'It is located in...', 'I like it because...', 'The atmosphere is...'] },
  { id: 'en-5', language: 'en', level: 'intermediate', topic: 'Future Plans', prompt: 'Write about your plans for the next 5 years.', promptVi: 'Viết về kế hoạch của bạn trong 5 năm tới.', hints: ['In the future, I want to...', 'First, I plan to...', 'After that, I hope to...', 'My dream is...'] },
  { id: 'ja-1', language: 'ja', level: 'beginner', topic: '自己紹介', prompt: '日本語で自己紹介を書いてください。', promptVi: 'Viết giới thiệu bản thân bằng tiếng Nhật.', hints: ['私は...です', '...から来ました', '趣味は...です', '...を勉強しています'] },
  { id: 'ja-2', language: 'ja', level: 'beginner', topic: '私の一日', prompt: '毎日の生活について書いてください。', promptVi: 'Viết về cuộc sống hàng ngày của bạn.', hints: ['毎朝...に起きます', '...を食べます', '...に行きます', '夜は...'] },
  { id: 'zh-1', language: 'zh', level: 'beginner', topic: '自我介绍', prompt: '用中文写一段自我介绍。', promptVi: 'Viết giới thiệu bản thân bằng tiếng Trung.', hints: ['我叫...', '我是...人', '我喜欢...', '我学习...'] },
  { id: 'ko-1', language: 'ko', level: 'beginner', topic: '자기소개', prompt: '한국어로 자기소개를 써 주세요.', promptVi: 'Viết giới thiệu bản thân bằng tiếng Hàn.', hints: ['저는...입니다', '...에서 왔어요', '취미는...이에요', '...를 공부해요'] },
];

const languageOptions = [
  { code: 'all', name: 'Tất cả', flag: '🌍' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function WritingPage() {
  const [selectedLang, setSelectedLang] = useState('all');
  const [selectedPrompt, setSelectedPrompt] = useState<WritingPrompt | null>(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const filteredPrompts = selectedLang === 'all'
    ? writingPrompts
    : writingPrompts.filter((p) => p.language === selectedLang);

  const handleSubmit = () => {
    if (text.trim().length < 10) return;
    setSubmitted(true);
    setFeedback('Bài viết của bạn đã được ghi nhận! Tính năng chấm điểm AI sẽ sớm được cập nhật. Hãy tiếp tục luyện tập mỗi ngày nhé!');
  };

  const handleReset = () => {
    setText('');
    setSubmitted(false);
    setFeedback(null);
    setSelectedPrompt(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display">Luyện viết</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Rèn luyện kỹ năng viết với các chủ đề đa dạng</p>
      </div>

      {!selectedPrompt ? (
        <>
          {/* Language filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedLang === lang.code
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                }`}
              >
                <span>{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>

          {/* Prompt cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredPrompts.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => setSelectedPrompt(prompt)}
                className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-left hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium">
                    {prompt.level}
                  </span>
                  <span className="text-xs text-gray-500">{prompt.topic}</span>
                </div>
                <p className="text-sm font-medium">{prompt.promptVi}</p>
                <p className="text-xs text-gray-500 mt-1 italic">{prompt.prompt}</p>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          {/* Back button */}
          <button onClick={handleReset} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Quay lại danh sách
          </button>

          {/* Prompt display */}
          <div className="p-5 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800">
            <p className="font-medium">{selectedPrompt.promptVi}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">{selectedPrompt.prompt}</p>
            {selectedPrompt.hints.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedPrompt.hints.map((hint, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                    {hint}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Writing area */}
          <div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={submitted}
              placeholder="Viết bài của bạn ở đây..."
              className="w-full h-48 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none resize-none disabled:opacity-60"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">{text.length} ký tự</span>
              {!submitted && (
                <button
                  onClick={handleSubmit}
                  disabled={text.trim().length < 10}
                  className="px-6 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Nộp bài
                </button>
              )}
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="p-5 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">Đã nộp bài!</p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">{feedback}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
