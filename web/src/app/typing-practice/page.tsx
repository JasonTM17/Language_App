'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface TypingExercise {
  id: string;
  text: string;
  translation: string;
  difficulty: string;
}

const exercises: Record<string, TypingExercise[]> = {
  en: [
    { id: 'en-1', text: 'The quick brown fox jumps over the lazy dog.', translation: 'Con cáo nâu nhanh nhẹn nhảy qua con chó lười.', difficulty: 'easy' },
    { id: 'en-2', text: 'Practice makes perfect.', translation: 'Luyện tập tạo nên sự hoàn hảo.', difficulty: 'easy' },
    { id: 'en-3', text: 'Learning a new language opens doors to new cultures.', translation: 'Học ngôn ngữ mới mở ra cánh cửa đến văn hóa mới.', difficulty: 'medium' },
    { id: 'en-4', text: 'She sells seashells by the seashore.', translation: 'Cô ấy bán vỏ sò bên bờ biển.', difficulty: 'medium' },
    { id: 'en-5', text: 'Knowledge is power, but enthusiasm pulls the switch.', translation: 'Kiến thức là sức mạnh, nhưng nhiệt huyết mới là công tắc.', difficulty: 'hard' },
  ],
  ja: [
    { id: 'ja-1', text: 'おはようございます。', translation: 'Chào buổi sáng.', difficulty: 'easy' },
    { id: 'ja-2', text: '日本語を勉強しています。', translation: 'Tôi đang học tiếng Nhật.', difficulty: 'easy' },
    { id: 'ja-3', text: '毎日少しずつ練習することが大切です。', translation: 'Luyện tập một chút mỗi ngày là quan trọng.', difficulty: 'medium' },
    { id: 'ja-4', text: '新しい言葉を覚えるのは楽しいです。', translation: 'Học từ mới rất vui.', difficulty: 'medium' },
    { id: 'ja-5', text: '日本の文化に興味があります。', translation: 'Tôi quan tâm đến văn hóa Nhật Bản.', difficulty: 'easy' },
  ],
  zh: [
    { id: 'zh-1', text: '你好，很高兴认识你。', translation: 'Xin chào, rất vui được gặp bạn.', difficulty: 'easy' },
    { id: 'zh-2', text: '我正在学习中文。', translation: 'Tôi đang học tiếng Trung.', difficulty: 'easy' },
    { id: 'zh-3', text: '每天练习一点很重要。', translation: 'Luyện tập một chút mỗi ngày rất quan trọng.', difficulty: 'medium' },
    { id: 'zh-4', text: '学习新词汇很有趣。', translation: 'Học từ vựng mới rất thú vị.', difficulty: 'easy' },
    { id: 'zh-5', text: '中国文化博大精深。', translation: 'Văn hóa Trung Quốc rộng lớn và sâu sắc.', difficulty: 'medium' },
  ],
  ko: [
    { id: 'ko-1', text: '안녕하세요, 만나서 반갑습니다.', translation: 'Xin chào, rất vui được gặp bạn.', difficulty: 'easy' },
    { id: 'ko-2', text: '한국어를 공부하고 있어요.', translation: 'Tôi đang học tiếng Hàn.', difficulty: 'easy' },
    { id: 'ko-3', text: '매일 조금씩 연습하는 것이 중요해요.', translation: 'Luyện tập một chút mỗi ngày là quan trọng.', difficulty: 'medium' },
    { id: 'ko-4', text: '새로운 단어를 배우는 것은 재미있어요.', translation: 'Học từ mới rất vui.', difficulty: 'easy' },
    { id: 'ko-5', text: '한국 문화에 관심이 있어요.', translation: 'Tôi quan tâm đến văn hóa Hàn Quốc.', difficulty: 'easy' },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

type GameState = 'idle' | 'playing' | 'finished';

export default function TypingPracticePage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [gameState, setGameState] = useState<GameState>('idle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [results, setResults] = useState<{ wpm: number; accuracy: number; time: number }[]>([]);
  const [charStates, setCharStates] = useState<('correct' | 'incorrect' | 'pending')[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentExercises = exercises[selectedLang] || exercises['en'];
  const currentExercise = currentExercises[currentIndex];

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, startTime]);

  const startPractice = () => {
    setGameState('playing');
    setCurrentIndex(0);
    setInput('');
    setResults([]);
    setCharStates(currentExercises[0].text.split('').map(() => 'pending'));
    setStartTime(Date.now());
    setElapsed(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInput = useCallback((value: string) => {
    setInput(value);
    const target = currentExercise.text;

    const states: ('correct' | 'incorrect' | 'pending')[] = target.split('').map((char, i) => {
      if (i >= value.length) return 'pending';
      return value[i] === char ? 'correct' : 'incorrect';
    });
    setCharStates(states);

    if (value === target) {
      const timeMs = Date.now() - startTime;
      const words = target.split(' ').length;
      const wpm = Math.round((words / (timeMs / 1000)) * 60);
      const correctChars = value.split('').filter((c, i) => c === target[i]).length;
      const accuracy = Math.round((correctChars / target.length) * 100);

      const result = { wpm, accuracy, time: timeMs / 1000 };
      const newResults = [...results, result];
      setResults(newResults);

      if (currentIndex < currentExercises.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setInput('');
        setStartTime(Date.now());
        const nextText = currentExercises[currentIndex + 1].text;
        setCharStates(nextText.split('').map(() => 'pending'));
        setTimeout(() => inputRef.current?.focus(), 50);
      } else {
        setGameState('finished');
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }
  }, [currentExercise, currentIndex, currentExercises, results, startTime]);

  const avgWpm = results.length > 0 ? Math.round(results.reduce((s, r) => s + r.wpm, 0) / results.length) : 0;
  const avgAccuracy = results.length > 0 ? Math.round(results.reduce((s, r) => s + r.accuracy, 0) / results.length) : 0;

  if (gameState === 'idle') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display">Luyện gõ phím</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Cải thiện tốc độ gõ trong ngôn ngữ bạn đang học</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                selectedLang === lang.code
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-200'
              }`}
            >
              <span>{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center space-y-4">
          <div className="text-5xl">⌨️</div>
          <h2 className="text-lg font-semibold">Sẵn sàng luyện tập?</h2>
          <p className="text-sm text-gray-500">
            Gõ lại {currentExercises.length} câu bằng {languages.find(l => l.code === selectedLang)?.name}.
            Tốc độ và độ chính xác sẽ được đo.
          </p>
          <Button onClick={startPractice} className="px-8">Bắt đầu</Button>
        </div>

        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Mẹo:</h3>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Tập trung vào độ chính xác trước, tốc độ sẽ đến sau</li>
            <li>• Nhìn vào văn bản gốc, không nhìn bàn phím</li>
            <li>• Luyện tập đều đặn mỗi ngày để cải thiện</li>
          </ul>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center py-6">
          <div className="text-5xl mb-3">
            {avgAccuracy >= 95 ? '🏆' : avgAccuracy >= 80 ? '⭐' : '💪'}
          </div>
          <h1 className="text-2xl font-bold font-display">Hoàn thành!</h1>
          <p className="text-gray-500 mt-1">Kết quả luyện gõ phím của bạn</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-center">
            <p className="text-3xl font-bold text-blue-600">{avgWpm}</p>
            <p className="text-xs text-gray-500 mt-1">WPM trung bình</p>
          </div>
          <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
            <p className="text-3xl font-bold text-green-600">{avgAccuracy}%</p>
            <p className="text-xs text-gray-500 mt-1">Chính xác</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 text-center">
            <p className="text-3xl font-bold text-purple-600">{results.length}</p>
            <p className="text-xs text-gray-500 mt-1">Câu hoàn thành</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold mb-3">Chi tiết từng câu:</h3>
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                <span className="text-sm text-gray-600 truncate flex-1">Câu {i + 1}</span>
                <div className="flex gap-4 text-xs">
                  <span className="text-blue-600 font-medium">{r.wpm} WPM</span>
                  <span className="text-green-600 font-medium">{r.accuracy}%</span>
                  <span className="text-gray-400">{r.time.toFixed(1)}s</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button onClick={startPractice}>Luyện lại</Button>
          <Button variant="outline" onClick={() => setGameState('idle')}>Đổi ngôn ngữ</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress header */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Câu {currentIndex + 1}/{currentExercises.length}</span>
        <span className="text-sm font-medium text-gray-600">{(elapsed / 1000).toFixed(1)}s</span>
      </div>

      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 rounded-full transition-all"
          style={{ width: `${((currentIndex) / currentExercises.length) * 100}%` }}
        />
      </div>

      {/* Translation hint */}
      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-300">💡 {currentExercise.translation}</p>
      </div>

      {/* Target text with character highlighting */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <p className="text-xl leading-relaxed font-mono tracking-wide">
          {currentExercise.text.split('').map((char, i) => (
            <span
              key={i}
              className={`${
                charStates[i] === 'correct' ? 'text-green-600 dark:text-green-400' :
                charStates[i] === 'incorrect' ? 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded' :
                i === input.length ? 'border-b-2 border-primary-500' :
                'text-gray-400'
              }`}
            >
              {char}
            </span>
          ))}
        </p>
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-lg font-mono focus:border-primary-500 focus:outline-none"
        placeholder="Gõ lại câu trên..."
        autoComplete="off"
        spellCheck={false}
      />

      {/* Live stats */}
      {input.length > 0 && (
        <div className="flex justify-center gap-6 text-sm text-gray-500">
          <span>{input.length}/{currentExercise.text.length} ký tự</span>
          <span>{charStates.filter(s => s === 'correct').length} đúng</span>
          <span>{charStates.filter(s => s === 'incorrect').length} sai</span>
        </div>
      )}
    </div>
  );
}
