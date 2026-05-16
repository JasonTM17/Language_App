'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';

interface TimedQuestion {
  question: string;
  options: string[];
  answer: string;
  language: string;
}

const questions: Record<string, TimedQuestion[]> = {
  en: [
    { question: '"apple" nghĩa là gì?', options: ['Quả táo', 'Quả cam', 'Quả chuối', 'Quả nho'], answer: 'Quả táo', language: 'en' },
    { question: '"book" nghĩa là gì?', options: ['Bút', 'Sách', 'Vở', 'Bàn'], answer: 'Sách', language: 'en' },
    { question: '"water" nghĩa là gì?', options: ['Lửa', 'Đất', 'Nước', 'Gió'], answer: 'Nước', language: 'en' },
    { question: '"happy" nghĩa là gì?', options: ['Buồn', 'Vui', 'Giận', 'Sợ'], answer: 'Vui', language: 'en' },
    { question: '"school" nghĩa là gì?', options: ['Nhà', 'Trường', 'Chợ', 'Công viên'], answer: 'Trường', language: 'en' },
    { question: '"mother" nghĩa là gì?', options: ['Bố', 'Mẹ', 'Chị', 'Em'], answer: 'Mẹ', language: 'en' },
    { question: '"big" nghĩa là gì?', options: ['Nhỏ', 'To', 'Dài', 'Ngắn'], answer: 'To', language: 'en' },
    { question: '"eat" nghĩa là gì?', options: ['Uống', 'Ăn', 'Ngủ', 'Chạy'], answer: 'Ăn', language: 'en' },
    { question: '"dog" nghĩa là gì?', options: ['Mèo', 'Chó', 'Chim', 'Cá'], answer: 'Chó', language: 'en' },
    { question: '"red" nghĩa là gì?', options: ['Xanh', 'Đỏ', 'Vàng', 'Trắng'], answer: 'Đỏ', language: 'en' },
    { question: '"run" nghĩa là gì?', options: ['Đi', 'Chạy', 'Bay', 'Bơi'], answer: 'Chạy', language: 'en' },
    { question: '"cold" nghĩa là gì?', options: ['Nóng', 'Lạnh', 'Ấm', 'Mát'], answer: 'Lạnh', language: 'en' },
    { question: '"friend" nghĩa là gì?', options: ['Bạn', 'Thầy', 'Sếp', 'Hàng xóm'], answer: 'Bạn', language: 'en' },
    { question: '"sleep" nghĩa là gì?', options: ['Ăn', 'Ngủ', 'Học', 'Làm'], answer: 'Ngủ', language: 'en' },
    { question: '"beautiful" nghĩa là gì?', options: ['Xấu', 'Đẹp', 'Cao', 'Thấp'], answer: 'Đẹp', language: 'en' },
  ],
  ja: [
    { question: '"食べる" nghĩa là gì?', options: ['Uống', 'Ăn', 'Ngủ', 'Đi'], answer: 'Ăn', language: 'ja' },
    { question: '"水" nghĩa là gì?', options: ['Lửa', 'Nước', 'Đất', 'Gió'], answer: 'Nước', language: 'ja' },
    { question: '"大きい" nghĩa là gì?', options: ['Nhỏ', 'To', 'Dài', 'Ngắn'], answer: 'To', language: 'ja' },
    { question: '"猫" nghĩa là gì?', options: ['Chó', 'Mèo', 'Chim', 'Cá'], answer: 'Mèo', language: 'ja' },
    { question: '"学校" nghĩa là gì?', options: ['Nhà', 'Trường', 'Chợ', 'Bệnh viện'], answer: 'Trường', language: 'ja' },
    { question: '"赤い" nghĩa là gì?', options: ['Xanh', 'Đỏ', 'Vàng', 'Đen'], answer: 'Đỏ', language: 'ja' },
    { question: '"友達" nghĩa là gì?', options: ['Gia đình', 'Bạn bè', 'Đồng nghiệp', 'Hàng xóm'], answer: 'Bạn bè', language: 'ja' },
    { question: '"寒い" nghĩa là gì?', options: ['Nóng', 'Lạnh', 'Ấm', 'Mát'], answer: 'Lạnh', language: 'ja' },
    { question: '"走る" nghĩa là gì?', options: ['Đi', 'Chạy', 'Bay', 'Bơi'], answer: 'Chạy', language: 'ja' },
    { question: '"本" nghĩa là gì?', options: ['Bút', 'Sách', 'Vở', 'Bàn'], answer: 'Sách', language: 'ja' },
  ],
  zh: [
    { question: '"吃" nghĩa là gì?', options: ['Uống', 'Ăn', 'Ngủ', 'Đi'], answer: 'Ăn', language: 'zh' },
    { question: '"大" nghĩa là gì?', options: ['Nhỏ', 'To', 'Dài', 'Ngắn'], answer: 'To', language: 'zh' },
    { question: '"红" nghĩa là gì?', options: ['Xanh', 'Đỏ', 'Vàng', 'Trắng'], answer: 'Đỏ', language: 'zh' },
    { question: '"学校" nghĩa là gì?', options: ['Nhà', 'Trường', 'Chợ', 'Công viên'], answer: 'Trường', language: 'zh' },
    { question: '"朋友" nghĩa là gì?', options: ['Gia đình', 'Bạn bè', 'Đồng nghiệp', 'Thầy giáo'], answer: 'Bạn bè', language: 'zh' },
    { question: '"冷" nghĩa là gì?', options: ['Nóng', 'Lạnh', 'Ấm', 'Mát'], answer: 'Lạnh', language: 'zh' },
    { question: '"跑" nghĩa là gì?', options: ['Đi', 'Chạy', 'Bay', 'Bơi'], answer: 'Chạy', language: 'zh' },
    { question: '"书" nghĩa là gì?', options: ['Bút', 'Sách', 'Vở', 'Bàn'], answer: 'Sách', language: 'zh' },
  ],
  ko: [
    { question: '"먹다" nghĩa là gì?', options: ['Uống', 'Ăn', 'Ngủ', 'Đi'], answer: 'Ăn', language: 'ko' },
    { question: '"물" nghĩa là gì?', options: ['Lửa', 'Nước', 'Đất', 'Gió'], answer: 'Nước', language: 'ko' },
    { question: '"크다" nghĩa là gì?', options: ['Nhỏ', 'To', 'Dài', 'Ngắn'], answer: 'To', language: 'ko' },
    { question: '"학교" nghĩa là gì?', options: ['Nhà', 'Trường', 'Chợ', 'Bệnh viện'], answer: 'Trường', language: 'ko' },
    { question: '"친구" nghĩa là gì?', options: ['Gia đình', 'Bạn bè', 'Đồng nghiệp', 'Hàng xóm'], answer: 'Bạn bè', language: 'ko' },
    { question: '"춥다" nghĩa là gì?', options: ['Nóng', 'Lạnh', 'Ấm', 'Mát'], answer: 'Lạnh', language: 'ko' },
    { question: '"달리다" nghĩa là gì?', options: ['Đi', 'Chạy', 'Bay', 'Bơi'], answer: 'Chạy', language: 'ko' },
    { question: '"책" nghĩa là gì?', options: ['Bút', 'Sách', 'Vở', 'Bàn'], answer: 'Sách', language: 'ko' },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

const TOTAL_TIME = 60;
const BONUS_TIME = 3;

export default function TimedChallengePage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<TimedQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = shuffledQuestions[currentIndex];

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timeLeft <= 0) {
      setGameState('finished');
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const startGame = () => {
    const qs = [...(questions[selectedLang] || [])].sort(() => Math.random() - 0.5);
    setShuffledQuestions(qs);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(TOTAL_TIME);
    setGameState('playing');
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const selectAnswer = useCallback((answer: string) => {
    if (showFeedback || gameState !== 'playing') return;
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const isCorrect = answer === currentQuestion.answer;
    if (isCorrect) {
      setScore(prev => prev + 10 + streak * 2);
      setStreak(prev => {
        const newStreak = prev + 1;
        setBestStreak(best => Math.max(best, newStreak));
        return newStreak;
      });
      setTimeLeft(prev => Math.min(prev + BONUS_TIME, TOTAL_TIME));
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentIndex < shuffledQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setGameState('finished');
      }
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 600);
  }, [showFeedback, gameState, currentQuestion, streak, currentIndex, shuffledQuestions.length]);

  if (gameState === 'idle') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display">Thử thách tốc độ</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Trả lời nhanh nhất có thể trong 60 giây!</p>
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

        <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center space-y-4">
          <div className="text-6xl">⚡</div>
          <h2 className="text-xl font-bold">Sẵn sàng?</h2>
          <p className="text-gray-500">Bạn có {TOTAL_TIME} giây để trả lời nhiều câu nhất có thể.</p>
          <p className="text-sm text-gray-400">Trả lời đúng +{BONUS_TIME}s | Combo streak tăng điểm</p>
          <Button onClick={startGame} className="mt-4 px-8 py-3 text-lg">
            Bắt đầu!
          </Button>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const xpEarned = Math.round(score / 5);
    return (
      <div className="max-w-2xl mx-auto text-center py-12 space-y-6">
        <div className="text-5xl mb-2">🏆</div>
        <h2 className="text-2xl font-bold">Hết giờ!</h2>
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <p className="text-3xl font-bold text-primary-600">{score}</p>
            <p className="text-xs text-gray-500">Điểm</p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <p className="text-3xl font-bold text-green-600">{currentIndex}</p>
            <p className="text-xs text-gray-500">Câu trả lời</p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <p className="text-3xl font-bold text-orange-600">{bestStreak}</p>
            <p className="text-xs text-gray-500">Combo cao nhất</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">+{xpEarned} XP kiếm được</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={startGame}>Chơi lại</Button>
          <Button variant="outline" onClick={() => setGameState('idle')}>Đổi ngôn ngữ</Button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    setGameState('finished');
    return null;
  }

  const timePercent = (timeLeft / TOTAL_TIME) * 100;
  const timeColor = timeLeft > 20 ? 'bg-green-500' : timeLeft > 10 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Timer bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">⚡ {streak > 0 && `Combo x${streak}`}</span>
          <span className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : ''}`}>
            {timeLeft}s
          </span>
          <span className="text-sm font-medium">Điểm: {score}</span>
        </div>
        <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className={`h-full ${timeColor} rounded-full transition-all duration-1000`} style={{ width: `${timePercent}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center">
        <p className="text-xs text-gray-400 mb-2">Câu {currentIndex + 1}</p>
        <p className="text-xl font-bold">{currentQuestion.question}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {currentQuestion.options.map((option) => {
          let styles = 'border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 active:scale-95';
          if (showFeedback) {
            if (option === currentQuestion.answer) {
              styles = 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 scale-105';
            } else if (option === selectedAnswer) {
              styles = 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
            } else {
              styles = 'border-gray-200 dark:border-gray-700 opacity-50';
            }
          }

          return (
            <button
              key={option}
              onClick={() => selectAnswer(option)}
              disabled={showFeedback}
              className={`p-4 rounded-xl border-2 text-center font-medium transition-all transform ${styles}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
