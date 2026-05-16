'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';

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
      }
    }, 1000);
  }, [showFeedback, currentQuestion, combo]);

  const xpEarned = score + (timeLeft > 0 ? Math.floor(timeLeft / 2) : 0);
  const accuracy = answers.length > 0 ? Math.round((answers.filter(Boolean).length / answers.length) * 100) : 0;

  if (state === 'intro') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">⚔️</div>
          <h1 className="text-2xl font-bold font-display">Thử thách hàng ngày</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Trả lời 10 câu hỏi trong 60 giây. Combo liên tiếp để nhận thêm điểm!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 text-center">
            <p className="text-2xl font-bold text-orange-600">🔥 {streak}</p>
            <p className="text-xs text-gray-500 mt-1">Ngày liên tiếp</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 text-center">
            <p className="text-2xl font-bold text-purple-600">60s</p>
            <p className="text-xs text-gray-500 mt-1">Thời gian</p>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-center">
            <p className="text-2xl font-bold text-blue-600">10</p>
            <p className="text-xs text-gray-500 mt-1">Câu hỏi</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold mb-3">Luật chơi:</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2"><span>✅</span> Trả lời đúng: +10 điểm</li>
            <li className="flex items-start gap-2"><span>🔥</span> Combo liên tiếp: +2 điểm mỗi combo (tối đa +10)</li>
            <li className="flex items-start gap-2"><span>⏰</span> Thời gian còn lại: +0.5 XP mỗi giây</li>
            <li className="flex items-start gap-2"><span>❌</span> Trả lời sai: mất combo</li>
          </ul>
        </div>

        <div className="text-center">
          <Button onClick={startChallenge} className="px-8 py-3 text-lg">
            Bắt đầu thử thách
          </Button>
        </div>
      </div>
    );
  }

  if (state === 'result') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center py-6">
          <div className="text-5xl mb-3">
            {accuracy >= 80 ? '🏆' : accuracy >= 60 ? '⭐' : accuracy >= 40 ? '💪' : '📚'}
          </div>
          <h1 className="text-2xl font-bold font-display">
            {accuracy >= 80 ? 'Xuất sắc!' : accuracy >= 60 ? 'Tốt lắm!' : accuracy >= 40 ? 'Khá tốt!' : 'Cần luyện thêm!'}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-center">
            <p className="text-3xl font-bold text-yellow-600">{xpEarned}</p>
            <p className="text-xs text-gray-500 mt-1">XP kiếm được</p>
          </div>
          <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
            <p className="text-3xl font-bold text-green-600">{accuracy}%</p>
            <p className="text-xs text-gray-500 mt-1">Chính xác</p>
          </div>
          <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 text-center">
            <p className="text-3xl font-bold text-orange-600">{maxCombo}x</p>
            <p className="text-xs text-gray-500 mt-1">Combo cao nhất</p>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-center">
            <p className="text-3xl font-bold text-blue-600">{timeLeft}s</p>
            <p className="text-xs text-gray-500 mt-1">Thời gian còn</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold mb-3">Chi tiết câu trả lời:</h3>
          <div className="grid grid-cols-10 gap-1">
            {answers.map((correct, i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold ${
                  correct
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700'
                }`}
              >
                {correct ? '✓' : '✗'}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button onClick={startChallenge}>Chơi lại</Button>
          <Button variant="outline" onClick={() => setState('intro')}>Quay lại</Button>
        </div>
      </div>
    );
  }

  const question = challengeQuestions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Timer and progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-gray-700 dark:text-gray-300'}`}>
            ⏰ {timeLeft}s
          </span>
        </div>
        <div className="flex items-center gap-2">
          {combo > 0 && (
            <span className="px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold animate-bounce">
              🔥 {combo}x combo
            </span>
          )}
          <span className="text-sm font-medium text-gray-500">{currentQuestion + 1}/10</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / challengeQuestions.length) * 100}%` }}
        />
      </div>

      {/* Score */}
      <div className="text-center">
        <span className="text-2xl font-bold text-primary-600">{score}</span>
        <span className="text-sm text-gray-500 ml-1">điểm</span>
      </div>

      {/* Question */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-medium">
          {question.category}
        </span>
        <h2 className="text-lg font-semibold mt-3">{question.question}</h2>
        <p className="text-sm text-gray-500 mt-1">{question.questionVi}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option, i) => {
          let styles = 'border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/10';
          if (showFeedback) {
            if (i === question.correctIndex) {
              styles = 'border-green-500 bg-green-50 dark:bg-green-900/20';
            } else if (i === selectedAnswer && i !== question.correctIndex) {
              styles = 'border-red-500 bg-red-50 dark:bg-red-900/20';
            } else {
              styles = 'border-gray-200 dark:border-gray-700 opacity-50';
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={showFeedback}
              className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${styles}`}
            >
              <span className="text-gray-400 mr-2">{String.fromCharCode(65 + i)}.</span>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
