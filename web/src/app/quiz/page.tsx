'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Celebration } from '@/components/ui/celebration';
import { XpPopup } from '@/components/ui/xp-popup';
import { api } from '@/services/api';

interface QuizQuestion {
  id: string;
  question: string;
  type: string;
  options: string[];
  answer: string;
  explanation?: string;
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showXp, setShowXp] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);

  const fallbackQuestions: QuizQuestion[] = [
    { id: '1', question: 'What does "Hello" mean in Vietnamese?', type: 'multiple_choice', options: ['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi'], answer: 'Xin chào', explanation: '"Hello" is a common greeting meaning "Xin chào"' },
    { id: '2', question: 'Which is the correct greeting for morning?', type: 'multiple_choice', options: ['Good night', 'Good morning', 'Good evening', 'Goodbye'], answer: 'Good morning', explanation: '"Good morning" is used to greet in the morning' },
    { id: '3', question: 'What does こんにちは mean?', type: 'multiple_choice', options: ['Goodbye', 'Thank you', 'Hello (afternoon)', 'Sorry'], answer: 'Hello (afternoon)', explanation: 'こんにちは (konnichiwa) means hello/good afternoon' },
    { id: '4', question: 'Match: "谢谢" = ?', type: 'multiple_choice', options: ['Xin chào', 'Cảm ơn', 'Tạm biệt', 'Xin lỗi'], answer: 'Cảm ơn', explanation: '谢谢 (xiè xie) means "Thank you" / "Cảm ơn"' },
    { id: '5', question: 'What does 감사합니다 mean?', type: 'multiple_choice', options: ['Hello', 'Sorry', 'Thank you', 'Goodbye'], answer: 'Thank you', explanation: '감사합니다 (gamsahamnida) means "Thank you"' },
    { id: '6', question: '"Tạm biệt" in English is...?', type: 'multiple_choice', options: ['Hello', 'Thank you', 'Sorry', 'Goodbye'], answer: 'Goodbye', explanation: '"Tạm biệt" means "Goodbye"' },
    { id: '7', question: 'How do you say "Xin lỗi" in Japanese?', type: 'multiple_choice', options: ['ありがとう', 'すみません', 'こんにちは', 'さようなら'], answer: 'すみません', explanation: 'すみません (sumimasen) = Xin lỗi / Sorry' },
    { id: '8', question: '"再见" (zài jiàn) means...?', type: 'multiple_choice', options: ['Xin chào', 'Cảm ơn', 'Tạm biệt', 'Xin lỗi'], answer: 'Tạm biệt', explanation: '再见 means goodbye (tái kiến = gặp lại)' },
    { id: '9', question: 'What is the past tense of "eat"?', type: 'multiple_choice', options: ['eated', 'ate', 'eaten', 'eating'], answer: 'ate', explanation: 'eat → ate (past simple), eaten (past participle)' },
    { id: '10', question: '"おいしい" (oishii) means...?', type: 'multiple_choice', options: ['Beautiful', 'Expensive', 'Delicious', 'Difficult'], answer: 'Delicious', explanation: 'おいしい means delicious/tasty (ngon)' },
    { id: '11', question: 'Choose the correct: "She ___ to school every day."', type: 'multiple_choice', options: ['go', 'goes', 'going', 'gone'], answer: 'goes', explanation: 'Third person singular (she/he/it) uses "goes" in present simple' },
    { id: '12', question: '"학생" (haksaeng) means...?', type: 'multiple_choice', options: ['Teacher', 'Student', 'Doctor', 'Driver'], answer: 'Student', explanation: '학생 means student (học sinh)' },
    { id: '13', question: 'What does "我很高兴" mean?', type: 'multiple_choice', options: ['I am sad', 'I am happy', 'I am tired', 'I am hungry'], answer: 'I am happy', explanation: '我很高兴 (wǒ hěn gāoxìng) = I am very happy' },
    { id: '14', question: '"Weather" in Vietnamese is...?', type: 'multiple_choice', options: ['Thời gian', 'Thời tiết', 'Thời trang', 'Thời đại'], answer: 'Thời tiết', explanation: 'Weather = Thời tiết' },
    { id: '15', question: 'What does "いただきます" mean?', type: 'multiple_choice', options: ['Goodbye', 'Thank you for the food', 'Good morning', 'Excuse me'], answer: 'Thank you for the food', explanation: 'いただきます is said before eating (cảm ơn vì bữa ăn)' },
    { id: '16', question: '"사랑" (sarang) means...?', type: 'multiple_choice', options: ['Friendship', 'Family', 'Love', 'Happiness'], answer: 'Love', explanation: '사랑 means love (tình yêu)' },
  ];

  useEffect(() => {
    api.quiz.practice()
      .then((data: any) => {
        const parsed = data.quizzes.map((q: any) => ({
          ...q,
          options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
        }));
        if (parsed.length > 0) {
          setQuestions(parsed);
        } else {
          setQuestions(fallbackQuestions);
        }
      })
      .catch(() => {
        setQuestions(fallbackQuestions);
      })
      .finally(() => setLoading(false));
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === currentQuestion.answer;
    if (isCorrect) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(prev => Math.max(prev, newCombo));
      setScore(prev => prev + 1);

      const baseXp = 10;
      const comboBonus = Math.min(newCombo * 3, 15);
      const earned = baseXp + comboBonus;
      setXpAmount(earned);
      setShowXp(true);

      if (newCombo >= 3 && newCombo % 3 === 0) {
        setShowCelebration(true);
      }
    } else {
      setCombo(0);
    }

    if (currentQuestion) {
      api.quiz.attempt(currentQuestion.id, { answer, timeSpent: 0 }).catch(() => {});
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
    setCombo(0);
    setMaxCombo(0);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto animate-pulse space-y-6">
        <div className="h-8 w-48 bg-muted rounded-lg" />
        <div className="h-40 bg-muted rounded-2xl" />
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-6">
        {percentage >= 80 && <Celebration type="confetti" duration={3000} />}
        <div className="text-6xl">{percentage >= 80 ? '🏆' : percentage >= 50 ? '🎉' : '💪'}</div>
        <h2 className="text-2xl font-bold">Hoàn thành bài kiểm tra!</h2>

        <div className="inline-flex items-center gap-6 p-6 rounded-2xl bg-card border">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{score}/{questions.length}</div>
            <div className="text-xs text-muted-foreground">Câu đúng</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">{percentage}%</div>
            <div className="text-xs text-muted-foreground">Chính xác</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500">{maxCombo}x</div>
            <div className="text-xs text-muted-foreground">Combo cao nhất</div>
          </div>
        </div>

        <div className="w-32 h-32 mx-auto relative">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
            <circle
              cx="50" cy="50" r="42" fill="none" strokeWidth="8"
              className="text-primary"
              stroke="currentColor"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.64} 264`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{percentage}%</span>
          </div>
        </div>

        <p className="text-muted-foreground">
          {percentage >= 90 ? 'Xuất sắc! Bạn nắm vững kiến thức rồi!' :
           percentage >= 70 ? 'Rất tốt! Tiếp tục ôn tập nhé!' :
           percentage >= 50 ? 'Khá tốt! Hãy ôn lại các phần chưa vững.' :
           'Cần luyện tập thêm. Đừng nản, hãy thử lại!'}
        </p>
        <Button onClick={resetQuiz} size="lg">Làm lại</Button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-8">
      {showCelebration && <Celebration type="stars" onComplete={() => setShowCelebration(false)} />}
      {showXp && <XpPopup amount={xpAmount} onComplete={() => setShowXp(false)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Kiểm tra</h1>
          <p className="text-muted-foreground text-sm">Trả lời đúng để tăng combo!</p>
        </div>
        <div className="flex items-center gap-3">
          {combo > 0 && (
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 animate-in zoom-in duration-200">
              <span className="text-sm font-bold">{combo}x</span>
              <span className="text-xs">combo</span>
            </div>
          )}
          <span className="text-sm text-muted-foreground font-medium">{currentIndex + 1}/{questions.length}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={questions.length}
          aria-label={`Câu hỏi ${currentIndex + 1} trên ${questions.length}`}
          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question card */}
      <div className="p-6 rounded-2xl bg-card border shadow-sm">
        <p className="text-xs font-medium text-primary uppercase mb-2 tracking-wide">{currentQuestion.type.replace('_', ' ')}</p>
        <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>

        {currentQuestion.type === 'fill_blank' ? (
          <div>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border bg-muted/50 focus:ring-2 focus:ring-primary outline-none"
              placeholder="Nhập câu trả lời..."
              onKeyDown={(e) => { if (e.key === 'Enter') handleAnswer((e.target as HTMLInputElement).value); }}
              disabled={showResult}
            />
            {!showResult && (
              <Button className="mt-3" onClick={() => {
                const input = document.querySelector('input') as HTMLInputElement;
                if (input?.value) handleAnswer(input.value);
              }}>Trả lời</Button>
            )}
          </div>
        ) : (
          <div className="space-y-3" role="group" aria-label="Các lựa chọn trả lời">
            {currentQuestion.options.map((option, i) => {
              let optionClass = 'border-border hover:border-primary/40 hover:bg-primary/5';
              let icon = '';

              if (showResult) {
                if (option === currentQuestion.answer) {
                  optionClass = 'border-green-500 bg-green-50 dark:bg-green-900/10';
                  icon = '✓';
                } else if (option === selectedAnswer) {
                  optionClass = 'border-red-500 bg-red-50 dark:bg-red-900/10';
                  icon = '✗';
                } else {
                  optionClass = 'border-border opacity-50';
                }
              } else if (option === selectedAnswer) {
                optionClass = 'border-primary bg-primary/5';
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleAnswer(option); } }}
                  disabled={showResult}
                  aria-pressed={selectedAnswer === option}
                  aria-label={`Lựa chọn ${i + 1}: ${option}`}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${optionClass}`}
                >
                  <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                    {icon || String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-medium">{option}</span>
                </button>
              );
            })}
          </div>
        )}

        {showResult && (
          <div className={`mt-6 p-4 rounded-xl border animate-in slide-in-from-bottom-2 duration-200 ${
            selectedAnswer === currentQuestion.answer
              ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
          }`}>
            <p className="font-medium text-sm mb-1">
              {selectedAnswer === currentQuestion.answer
                ? `🎉 Chính xác! ${combo > 1 ? `Combo ${combo}x!` : ''}`
                : `❌ Sai rồi. Đáp án: ${currentQuestion.answer}`}
            </p>
            {currentQuestion.explanation && <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>}
          </div>
        )}
      </div>

      {/* Next button */}
      {showResult && (
        <div className="flex justify-end">
          <Button onClick={nextQuestion} size="lg" className="gap-1">
            {currentIndex < questions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả'}
          </Button>
        </div>
      )}
    </div>
  );
}
