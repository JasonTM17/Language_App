'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';

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
    { question: '"電車" nghĩa là gì?', options: ['Xe buýt', 'Tàu điện', 'Máy bay', 'Xe đạp'], answer: 'Tàu điện', language: 'ja' },
    { question: '"美味しい" nghĩa là gì?', options: ['Ngon', 'Dở', 'Cay', 'Mặn'], answer: 'Ngon', language: 'ja' },
    { question: '"病院" nghĩa là gì?', options: ['Trường học', 'Bệnh viện', 'Nhà hàng', 'Khách sạn'], answer: 'Bệnh viện', language: 'ja' },
    { question: '"新しい" nghĩa là gì?', options: ['Cũ', 'Mới', 'Đẹp', 'Xấu'], answer: 'Mới', language: 'ja' },
    { question: '"買う" nghĩa là gì?', options: ['Bán', 'Mua', 'Cho', 'Lấy'], answer: 'Mua', language: 'ja' },
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
    { question: '"医院" nghĩa là gì?', options: ['Trường học', 'Bệnh viện', 'Nhà hàng', 'Siêu thị'], answer: 'Bệnh viện', language: 'zh' },
    { question: '"好吃" nghĩa là gì?', options: ['Ngon', 'Dở', 'Cay', 'Chua'], answer: 'Ngon', language: 'zh' },
    { question: '"新" nghĩa là gì?', options: ['Cũ', 'Mới', 'Đẹp', 'Xấu'], answer: 'Mới', language: 'zh' },
    { question: '"买" nghĩa là gì?', options: ['Bán', 'Mua', 'Cho', 'Đổi'], answer: 'Mua', language: 'zh' },
    { question: '"飞机" nghĩa là gì?', options: ['Xe buýt', 'Tàu hỏa', 'Máy bay', 'Xe đạp'], answer: 'Máy bay', language: 'zh' },
    { question: '"高兴" nghĩa là gì?', options: ['Buồn', 'Vui', 'Giận', 'Sợ'], answer: 'Vui', language: 'zh' },
    { question: '"工作" nghĩa là gì?', options: ['Học', 'Làm việc', 'Chơi', 'Nghỉ'], answer: 'Làm việc', language: 'zh' },
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
    { question: '"병원" nghĩa là gì?', options: ['Trường học', 'Bệnh viện', 'Nhà hàng', 'Khách sạn'], answer: 'Bệnh viện', language: 'ko' },
    { question: '"맛있다" nghĩa là gì?', options: ['Ngon', 'Dở', 'Cay', 'Mặn'], answer: 'Ngon', language: 'ko' },
    { question: '"새롭다" nghĩa là gì?', options: ['Cũ', 'Mới', 'Đẹp', 'Xấu'], answer: 'Mới', language: 'ko' },
    { question: '"사다" nghĩa là gì?', options: ['Bán', 'Mua', 'Cho', 'Lấy'], answer: 'Mua', language: 'ko' },
    { question: '"비행기" nghĩa là gì?', options: ['Xe buýt', 'Tàu hỏa', 'Máy bay', 'Tàu thủy'], answer: 'Máy bay', language: 'ko' },
    { question: '"기쁘다" nghĩa là gì?', options: ['Buồn', 'Vui', 'Giận', 'Sợ'], answer: 'Vui', language: 'ko' },
    { question: '"일하다" nghĩa là gì?', options: ['Học', 'Làm việc', 'Chơi', 'Nghỉ'], answer: 'Làm việc', language: 'ko' },
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
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-2xl font-bold font-display">Thử thách tốc độ</h1>
          <p className="text-muted-foreground mt-1">Trả lời nhanh nhất có thể trong 60 giây!</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {languages.map((lang, index) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              onClick={() => setSelectedLang(lang.code)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                selectedLang === lang.code
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary-200'
              }`}
            >
              <span>{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </motion.button>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 text-center space-y-4">
          <div className="text-6xl">⚡</div>
          <h2 className="text-xl font-bold">Sẵn sàng?</h2>
          <p className="text-muted-foreground">Bạn có {TOTAL_TIME} giây để trả lời nhiều câu nhất có thể.</p>
          <p className="text-sm text-muted-foreground">Trả lời đúng +{BONUS_TIME}s | Combo streak tăng điểm</p>
          <Button onClick={startGame} className="mt-4 px-8 py-3 text-lg">
            Bắt đầu!
          </Button>
        </div>
      </motion.div>
    );
  }

  if (gameState === 'finished') {
    const xpEarned = Math.round(score / 5);
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto text-center py-12 space-y-6"
      >
        <div className="flex justify-center mb-2">
          <Trophy className="w-12 h-12 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold">Hết giờ!</h2>
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {[
            { value: score, label: 'Điểm', color: 'text-primary' },
            { value: currentIndex, label: 'Câu trả lời', color: 'text-green-600' },
            { value: bestStreak, label: 'Combo cao nhất', color: 'text-orange-600' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              className="p-4 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5"
            >
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">+{xpEarned} XP kiếm được</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={startGame}>Chơi lại</Button>
          <Button variant="outline" onClick={() => setGameState('idle')}>Đổi ngôn ngữ</Button>
        </div>
      </motion.div>
    );
  }

  if (!currentQuestion) {
    setGameState('finished');
    return null;
  }

  const timePercent = TOTAL_TIME > 0 ? Math.max(Math.min((timeLeft / TOTAL_TIME) * 100, 100), 0) : 0;
  const timeColor = timeLeft > 20 ? 'bg-green-500' : timeLeft > 10 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Timer bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">⚡ {streak > 0 && `Combo x${streak}`}</span>
          <span className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : ''}`}>
            {timeLeft}s
          </span>
          <span className="text-sm font-medium">Điểm: {score}</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div className={`h-full ${timeColor} rounded-full transition-all duration-1000`} style={{ width: `${timePercent}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 text-center">
        <p className="text-xs text-muted-foreground mb-2">Câu {currentIndex + 1}</p>
        <p className="text-xl font-bold">{currentQuestion.question}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {currentQuestion.options.map((option, index) => {
          let styles = 'border-border hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 active:scale-95';
          if (showFeedback) {
            if (option === currentQuestion.answer) {
              styles = 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 scale-105';
            } else if (option === selectedAnswer) {
              styles = 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
            } else {
              styles = 'border-border opacity-50';
            }
          }

          return (
            <motion.button
              key={option}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              onClick={() => selectAnswer(option)}
              disabled={showFeedback}
              className={`p-4 rounded-xl border-2 text-center font-medium transition-all transform ${styles}`}
            >
              {option}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
