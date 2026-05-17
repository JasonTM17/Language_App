'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Celebration } from '@/components/ui/celebration';
import { Trophy, Star, Dumbbell, BookOpen, Swords, Clock, Flame, HelpCircle } from 'lucide-react';
import { XpPopup } from '@/components/ui/xp-popup';

interface ChallengeQuestion {
  id: string;
  question: string;
  questionVi: string;
  options: string[];
  correctIndex: number;
  category: string;
}

const challengeQuestions: ChallengeQuestion[] = [
  { id: '1', question: 'What is the past tense of "go"?', questionVi: 'Quá khứ của "go" là gì?', options: ['goed', 'went', 'gone', 'going'], correctIndex: 1, category: 'Grammar' },
  { id: '2', question: 'Which word means "beautiful" in Japanese?', questionVi: 'Từ nào nghĩa là "đẹp" trong tiếng Nhật?', options: ['きれい', 'おいしい', 'たかい', 'やすい'], correctIndex: 0, category: 'Vocabulary' },
  { id: '3', question: '"谢谢" means...', questionVi: '"谢谢" có nghĩa là...', options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'], correctIndex: 2, category: 'Vocabulary' },
  { id: '4', question: 'Choose the correct sentence:', questionVi: 'Chọn câu đúng:', options: ['She don\'t like coffee', 'She doesn\'t likes coffee', 'She doesn\'t like coffee', 'She not like coffee'], correctIndex: 2, category: 'Grammar' },
  { id: '5', question: '"감사합니다" is used to say...', questionVi: '"감사합니다" dùng để nói...', options: ['I\'m sorry', 'Thank you', 'Hello', 'Goodbye'], correctIndex: 1, category: 'Vocabulary' },
  { id: '6', question: 'What does "おはようございます" mean?', questionVi: '"おはようございます" nghĩa là gì?', options: ['Good night', 'Good morning', 'Good afternoon', 'Goodbye'], correctIndex: 1, category: 'Vocabulary' },
  { id: '7', question: 'Fill in: "I ___ to school every day."', questionVi: 'Điền vào: "I ___ to school every day."', options: ['go', 'goes', 'going', 'went'], correctIndex: 0, category: 'Grammar' },
  { id: '8', question: '"你好" is pronounced as...', questionVi: '"你好" được phát âm là...', options: ['Nǐ hǎo', 'Nǐ hào', 'Ní hǎo', 'Nì hǎo'], correctIndex: 0, category: 'Pronunciation' },
  { id: '9', question: 'Which is NOT a color in English?', questionVi: 'Từ nào KHÔNG phải màu sắc?', options: ['Purple', 'Orange', 'Silver', 'Dinner'], correctIndex: 3, category: 'Vocabulary' },
  { id: '10', question: '"사랑해요" means...', questionVi: '"사랑해요" có nghĩa là...', options: ['I miss you', 'I love you', 'I like you', 'I need you'], correctIndex: 1, category: 'Vocabulary' },
  { id: '11', question: 'What is the plural of "child"?', questionVi: 'Số nhiều của "child" là gì?', options: ['childs', 'childrens', 'children', 'childes'], correctIndex: 2, category: 'Grammar' },
  { id: '12', question: '"食べる" (taberu) means...', questionVi: '"食べる" (taberu) có nghĩa là...', options: ['to drink', 'to eat', 'to sleep', 'to run'], correctIndex: 1, category: 'Vocabulary' },
  { id: '13', question: 'Which particle marks the topic in Japanese?', questionVi: 'Trợ từ nào đánh dấu chủ đề trong tiếng Nhật?', options: ['を', 'に', 'は', 'で'], correctIndex: 2, category: 'Grammar' },
  { id: '14', question: '"我很高兴认识你" means...', questionVi: '"我很高兴认识你" có nghĩa là...', options: ['How are you?', 'Nice to meet you', 'See you later', 'What is your name?'], correctIndex: 1, category: 'Vocabulary' },
  { id: '15', question: 'Choose the correct form: "He ___ here since 2020."', questionVi: 'Chọn dạng đúng: "He ___ here since 2020."', options: ['lives', 'lived', 'has lived', 'is living'], correctIndex: 2, category: 'Grammar' },
  { id: '16', question: '"학교" (hakgyo) means...', questionVi: '"학교" (hakgyo) có nghĩa là...', options: ['hospital', 'school', 'library', 'office'], correctIndex: 1, category: 'Vocabulary' },
  { id: '17', question: 'What does "すみません" express?', questionVi: '"すみません" thể hiện điều gì?', options: ['Happiness', 'Apology/Excuse me', 'Anger', 'Surprise'], correctIndex: 1, category: 'Vocabulary' },
  { id: '18', question: '"多少钱" is used to ask about...', questionVi: '"多少钱" dùng để hỏi về...', options: ['time', 'direction', 'price', 'age'], correctIndex: 2, category: 'Vocabulary' },
  { id: '19', question: 'Which is correct? "If it rains, I ___ stay home."', questionVi: 'Câu nào đúng? "If it rains, I ___ stay home."', options: ['would', 'will', 'am', 'have'], correctIndex: 1, category: 'Grammar' },
  { id: '20', question: '"맛있어요" describes something that is...', questionVi: '"맛있어요" mô tả thứ gì đó...', options: ['expensive', 'delicious', 'beautiful', 'difficult'], correctIndex: 1, category: 'Vocabulary' },
];

type ChallengeState = 'intro' | 'playing' | 'result';

export default function DailyChallengePage() {
  const [state, setState] = useState<ChallengeState>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [streak, setStreak] = useState(3);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showXp, setShowXp] = useState(false);

  useEffect(() => {
    if (state !== 'playing' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setState('result');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [state, timeLeft]);

  const startChallenge = () => {
    setState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(60);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCombo(0);
    setMaxCombo(0);
    setAnswers([]);
  };

  const handleAnswer = useCallback((index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);

    const correct = index === challengeQuestions[currentQuestion].correctIndex;
    setAnswers(prev => [...prev, correct]);

    if (correct) {
      const comboBonus = Math.min(combo, 5);
      setScore(prev => prev + 10 + comboBonus * 2);
      setCombo(prev => {
        const newCombo = prev + 1;
        setMaxCombo(m => Math.max(m, newCombo));
        return newCombo;
      });
    } else {
      setCombo(0);
    }

    setTimeout(() => {
      if (currentQuestion < challengeQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setState('result');
        setShowXp(true);
      }
    }, 1000);
  }, [showFeedback, currentQuestion, combo]);

  const xpEarned = score + (timeLeft > 0 ? Math.floor(timeLeft / 2) : 0);
  const accuracy = answers.length > 0 ? Math.round((answers.filter(Boolean).length / answers.length) * 100) : 0;

  if (state === 'intro') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto space-y-6 pb-8"
      >
        <div className="text-center py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mx-auto mb-4"
          >
            <Swords className="w-10 h-10 text-orange-500" />
          </motion.div>
          <h1 className="text-2xl font-bold font-display">Thử thách hàng ngày</h1>
          <p className="text-muted-foreground mt-2">
            Trả lời 10 câu hỏi trong 60 giây. Combo liên tiếp để nhận thêm điểm!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/10 border border-orange-200/60 dark:border-orange-800/40 backdrop-blur-sm text-center shadow-lg shadow-orange-500/5"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mx-auto mb-1">
              <Flame className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{streak}</p>
            <p className="text-xs text-muted-foreground mt-1">Ngày liên tiếp</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 border border-purple-200/60 dark:border-purple-800/40 backdrop-blur-sm text-center shadow-lg shadow-purple-500/5"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-1">
              <Clock className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">60s</p>
            <p className="text-xs text-muted-foreground mt-1">Thời gian</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200/60 dark:border-blue-800/40 backdrop-blur-sm text-center shadow-lg shadow-blue-500/5"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-1">
              <HelpCircle className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">10</p>
            <p className="text-xs text-muted-foreground mt-1">Câu hỏi</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5"
        >
          <h3 className="font-semibold mb-3">Luật chơi:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><span className="text-green-500">&#10003;</span> Trả lời đúng: +10 điểm</li>
            <li className="flex items-start gap-2"><span className="text-orange-500">&#9733;</span> Combo liên tiếp: +2 điểm mỗi combo (tối đa +10)</li>
            <li className="flex items-start gap-2"><span className="text-blue-500">&#9201;</span> Thời gian còn lại: +0.5 XP mỗi giây</li>
            <li className="flex items-start gap-2"><span className="text-red-500">&#10007;</span> Trả lời sai: mất combo</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Button onClick={startChallenge} className="px-8 py-3 text-lg">
            Bắt đầu thử thách
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  if (state === 'result') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto space-y-6 pb-8"
      >
        {accuracy >= 80 && <Celebration type="confetti" duration={3000} />}
        {showXp && <XpPopup amount={xpEarned} onComplete={() => setShowXp(false)} />}
        <div className="text-center py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="flex justify-center mb-3"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
              {accuracy >= 80 ? <Trophy className="w-8 h-8 text-yellow-500" /> : accuracy >= 60 ? <Star className="w-8 h-8 text-yellow-400" /> : accuracy >= 40 ? <Dumbbell className="w-8 h-8 text-blue-500" /> : <BookOpen className="w-8 h-8 text-primary" />}
            </div>
          </motion.div>
          <h1 className="text-2xl font-bold font-display">
            {accuracy >= 80 ? 'Xuất sắc!' : accuracy >= 60 ? 'Tốt lắm!' : accuracy >= 40 ? 'Khá tốt!' : 'Cần luyện thêm!'}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { value: xpEarned, label: 'XP kiếm được', color: 'yellow' },
            { value: `${accuracy}%`, label: 'Chính xác', color: 'green' },
            { value: `${maxCombo}x`, label: 'Combo cao nhất', color: 'orange' },
            { value: `${timeLeft}s`, label: 'Thời gian còn', color: 'blue' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`p-4 rounded-2xl bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100/50 dark:from-${stat.color}-900/20 dark:to-${stat.color}-800/10 border border-${stat.color}-200/60 dark:border-${stat.color}-800/40 backdrop-blur-sm text-center shadow-lg shadow-${stat.color}-500/5`}
            >
              <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5"
        >
          <h3 className="font-semibold mb-3">Chi tiết câu trả lời:</h3>
          <div className="grid grid-cols-10 gap-1">
            {answers.map((correct, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.03 }}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold ${
                  correct
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700'
                }`}
              >
                {correct ? '✓' : '✗'}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 justify-center"
        >
          <Button onClick={startChallenge}>Chơi lại</Button>
          <Button variant="outline" onClick={() => setState('intro')}>Quay lại</Button>
        </motion.div>
      </motion.div>
    );
  }

  const question = challengeQuestions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto space-y-6 pb-8"
    >
      {/* Timer and progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-foreground'}`}>
            <Clock className="w-4 h-4 inline mr-1" />{timeLeft}s
          </span>
        </div>
        <div className="flex items-center gap-2">
          <AnimatePresence>
            {combo > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold"
              >
                <Flame className="w-3 h-3 inline mr-0.5" />{combo}x combo
              </motion.span>
            )}
          </AnimatePresence>
          <span className="text-sm font-medium text-muted-foreground">{currentQuestion + 1}/10</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
          animate={{ width: `${challengeQuestions.length > 0 ? Math.min(((currentQuestion + 1) / challengeQuestions.length) * 100, 100) : 0}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Score */}
      <div className="text-center">
        <span className="text-2xl font-bold text-primary">{score}</span>
        <span className="text-sm text-muted-foreground ml-1">điểm</span>
      </div>

      {/* Question */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5"
      >
        <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">
          {question.category}
        </span>
        <h2 className="text-lg font-semibold mt-3">{question.question}</h2>
        <p className="text-sm text-muted-foreground mt-1">{question.questionVi}</p>
      </motion.div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option, i) => {
          let styles = 'border-border/60 hover:border-primary/40 hover:bg-primary/5 backdrop-blur-sm';
          if (showFeedback) {
            if (i === question.correctIndex) {
              styles = 'border-green-500 bg-green-50 dark:bg-green-900/20 backdrop-blur-sm';
            } else if (i === selectedAnswer && i !== question.correctIndex) {
              styles = 'border-red-500 bg-red-50 dark:bg-red-900/20 backdrop-blur-sm';
            } else {
              styles = 'border-border/60 opacity-50 backdrop-blur-sm';
            }
          }

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
              onClick={() => handleAnswer(i)}
              disabled={showFeedback}
              className={`p-4 rounded-xl border-2 text-left font-medium transition-all hover:shadow-md hover:shadow-purple-500/5 ${styles}`}
            >
              <span className="text-muted-foreground mr-2">{String.fromCharCode(65 + i)}.</span>
              {option}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
