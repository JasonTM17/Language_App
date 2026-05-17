'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  { id: 'en-6', language: 'en', level: 'intermediate', topic: 'A Memorable Trip', prompt: 'Write about a trip you took that you will never forget.', promptVi: 'Viết về một chuyến đi mà bạn không bao giờ quên.', hints: ['Last year, I went to...', 'The most memorable thing was...', 'I felt...', 'I would love to go back because...'] },
  { id: 'ja-1', language: 'ja', level: 'beginner', topic: '自己紹介', prompt: '日本語で自己紹介を書いてください。', promptVi: 'Viết giới thiệu bản thân bằng tiếng Nhật.', hints: ['私は...です', '...から来ました', '趣味は...です', '...を勉強しています'] },
  { id: 'ja-2', language: 'ja', level: 'beginner', topic: '私の一日', prompt: '毎日の生活について書いてください。', promptVi: 'Viết về cuộc sống hàng ngày của bạn.', hints: ['毎朝...に起きます', '...を食べます', '...に行きます', '夜は...'] },
  { id: 'ja-3', language: 'ja', level: 'intermediate', topic: '好きな食べ物', prompt: '好きな食べ物について書いてください。なぜ好きですか？', promptVi: 'Viết về món ăn yêu thích. Tại sao bạn thích?', hints: ['一番好きな食べ物は...', '...の味が好きです', '...と一緒に食べます', '...で食べられます'] },
  { id: 'ja-4', language: 'ja', level: 'intermediate', topic: '週末の予定', prompt: '次の週末に何をする予定ですか？', promptVi: 'Cuối tuần tới bạn dự định làm gì?', hints: ['土曜日に...', '友達と...', '...に行く予定です', '日曜日は...'] },
  { id: 'zh-1', language: 'zh', level: 'beginner', topic: '自我介绍', prompt: '用中文写一段自我介绍。', promptVi: 'Viết giới thiệu bản thân bằng tiếng Trung.', hints: ['我叫...', '我是...人', '我喜欢...', '我学习...'] },
  { id: 'zh-2', language: 'zh', level: 'beginner', topic: '我的家', prompt: '介绍一下你的家和家人。', promptVi: 'Giới thiệu về nhà và gia đình bạn.', hints: ['我家有...口人', '我爸爸是...', '我妈妈...', '我们住在...'] },
  { id: 'zh-3', language: 'zh', level: 'intermediate', topic: '我的爱好', prompt: '写一写你的爱好，为什么喜欢？', promptVi: 'Viết về sở thích của bạn, tại sao thích?', hints: ['我的爱好是...', '因为...', '每个星期...', '让我感到...'] },
  { id: 'zh-4', language: 'zh', level: 'intermediate', topic: '我的城市', prompt: '介绍一下你住的城市。', promptVi: 'Giới thiệu về thành phố bạn sống.', hints: ['我住在...', '这个城市有...', '最有名的是...', '我喜欢这里因为...'] },
  { id: 'ko-1', language: 'ko', level: 'beginner', topic: '자기소개', prompt: '한국어로 자기소개를 써 주세요.', promptVi: 'Viết giới thiệu bản thân bằng tiếng Hàn.', hints: ['저는...입니다', '...에서 왔어요', '취미는...이에요', '...를 공부해요'] },
  { id: 'ko-2', language: 'ko', level: 'beginner', topic: '나의 가족', prompt: '가족에 대해 써 주세요.', promptVi: 'Viết về gia đình bạn.', hints: ['우리 가족은...명이에요', '아버지는...', '어머니는...', '형/언니는...'] },
  { id: 'ko-3', language: 'ko', level: 'intermediate', topic: '좋아하는 음식', prompt: '좋아하는 음식에 대해 써 주세요. 왜 좋아해요?', promptVi: 'Viết về món ăn yêu thích. Tại sao thích?', hints: ['제가 제일 좋아하는 음식은...', '...맛이 좋아요', '...에서 먹을 수 있어요', '...와 같이 먹어요'] },
  { id: 'ko-4', language: 'ko', level: 'intermediate', topic: '주말 계획', prompt: '다음 주말에 뭐 할 거예요?', promptVi: 'Cuối tuần tới bạn sẽ làm gì?', hints: ['토요일에...', '친구와 같이...', '...에 갈 거예요', '일요일에는...'] },
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
    <motion.div className="space-y-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div>
        <h1 className="text-2xl font-bold font-display">Luyện viết</h1>
        <p className="text-muted-foreground mt-1">Rèn luyện kỹ năng viết với các chủ đề đa dạng</p>
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
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:bg-gray-200'
                }`}
              >
                <span>{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>

          {/* Prompt cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredPrompts.map((prompt, index) => (
              <motion.button
                key={prompt.id}
                onClick={() => setSelectedPrompt(prompt)}
                className="p-5 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 text-left hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium">
                    {prompt.level}
                  </span>
                  <span className="text-xs text-muted-foreground">{prompt.topic}</span>
                </div>
                <p className="text-sm font-medium">{prompt.promptVi}</p>
                <p className="text-xs text-muted-foreground mt-1 italic">{prompt.prompt}</p>
              </motion.button>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          {/* Back button */}
          <button onClick={handleReset} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gray-700 dark:hover:text-gray-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Quay lại danh sách
          </button>

          {/* Prompt display */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5">
            <p className="font-medium">{selectedPrompt.promptVi}</p>
            <p className="text-sm text-muted-foreground mt-1 italic">{selectedPrompt.prompt}</p>
            {selectedPrompt.hints.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedPrompt.hints.map((hint, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-lg bg-card text-muted-foreground border border-border">
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
              className="w-full h-48 p-4 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary-500 outline-none resize-none disabled:opacity-60"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">{text.length} ký tự</span>
              {!submitted && (
                <button
                  onClick={handleSubmit}
                  disabled={text.trim().length < 10}
                  className="px-6 py-2 rounded-xl bg-primary hover:bg-primary-600 text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
    </motion.div>
  );
}
