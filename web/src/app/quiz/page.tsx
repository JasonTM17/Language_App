'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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

  useEffect(() => {
    api.quiz.getByLesson('all')
      .then((data) => {
        const parsed = data.quizzes.map((q: any) => ({
          ...q,
          options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
        }));
        setQuestions(parsed);
      })
      .catch(() => {
        setQuestions([
          { id: '1', question: 'What does "Hello" mean in Vietnamese?', type: 'multiple_choice', options: ['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi'], answer: 'Xin chào', explanation: '"Hello" is a common greeting meaning "Xin chào"' },
          { id: '2', question: 'Fill in: "_____, how are you?"', type: 'fill_blank', options: [], answer: 'Hello', explanation: 'We use "Hello" to greet someone' },
          { id: '3', question: 'Which is the correct greeting for morning?', type: 'multiple_choice', options: ['Good night', 'Good morning', 'Good evening', 'Goodbye'], answer: 'Good morning', explanation: '"Good morning" is used to greet in the morning' },
          { id: '4', question: 'What does こんにちは mean?', type: 'multiple_choice', options: ['Goodbye', 'Thank you', 'Hello (afternoon)', 'Sorry'], answer: 'Hello (afternoon)', explanation: 'こんにちは (konnichiwa) means hello/good afternoon' },
          { id: '5', question: 'Match: "谢谢" = ?', type: 'multiple_choice', options: ['Xin chào', 'Cảm ơn', 'Tạm biệt', 'Xin lỗi'], answer: 'Cảm ơn', explanation: '谢谢 (xiè xie) means "Thank you" / "Cảm ơn"' },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === currentQuestion.answer;
    if (isCorrect) setScore(prev => prev + 1);

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
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto animate-pulse space-y-6">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="text-6xl mb-4">{percentage >= 80 ? '🏆' : percentage >= 50 ? '👍' : '💪'}</div>
        <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">You scored {score} out of {questions.length}</p>
        <div className="w-32 h-32 mx-auto mb-6 relative">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="3" />
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" className="text-primary-500" strokeWidth="3" strokeDasharray={`${percentage}, 100`} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{percentage}%</span>
          </div>
        </div>
        <Button onClick={resetQuiz}>Try Again</Button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-display">Quiz</h1>
        <span className="text-sm text-gray-500 font-medium">{currentIndex + 1} / {questions.length}</span>
      </div>

      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
        <p className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase mb-2">{currentQuestion.type.replace('_', ' ')}</p>
        <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>

        {currentQuestion.type === 'fill_blank' ? (
          <div>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder="Type your answer..."
              onKeyDown={(e) => { if (e.key === 'Enter') handleAnswer((e.target as HTMLInputElement).value); }}
              disabled={showResult}
            />
            {!showResult && (
              <Button className="mt-3" onClick={() => {
                const input = document.querySelector('input') as HTMLInputElement;
                if (input?.value) handleAnswer(input.value);
              }}>Submit</Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {currentQuestion.options.map((option, i) => {
              let optionClass = 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700';
              if (showResult) {
                if (option === currentQuestion.answer) optionClass = 'border-green-500 bg-green-50 dark:bg-green-900/20';
                else if (option === selectedAnswer) optionClass = 'border-red-500 bg-red-50 dark:bg-red-900/20';
              } else if (option === selectedAnswer) {
                optionClass = 'border-primary-500 bg-primary-50 dark:bg-primary-900/20';
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${optionClass}`}
                >
                  <span className="font-medium">{option}</span>
                </button>
              );
            })}
          </div>
        )}

        {showResult && (
          <div className={`mt-6 p-4 rounded-xl ${selectedAnswer === currentQuestion.answer ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
            <p className="font-medium text-sm mb-1">
              {selectedAnswer === currentQuestion.answer ? '✓ Correct!' : `✗ Incorrect. Answer: ${currentQuestion.answer}`}
            </p>
            {currentQuestion.explanation && <p className="text-sm text-gray-600 dark:text-gray-400">{currentQuestion.explanation}</p>}
          </div>
        )}
      </div>

      {showResult && (
        <div className="flex justify-end">
          <Button onClick={nextQuestion}>
            {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results'}
          </Button>
        </div>
      )}
    </div>
  );
}
