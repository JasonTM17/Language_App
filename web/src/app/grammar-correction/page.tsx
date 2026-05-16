'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface GrammarCorrectionExercise {
  id: string;
  sentence: string;
  corrected: string;
  error: string;
  explanation: string;
}

const exercises: Record<string, GrammarCorrectionExercise[]> = {
  en: [
    { id: '1', sentence: 'She go to school every day.', corrected: 'She goes to school every day.', error: 'go → goes', explanation: 'Ngôi thứ 3 số ít (she/he/it) cần thêm -s/-es vào động từ ở thì hiện tại đơn.' },
    { id: '2', sentence: 'I am agree with you.', corrected: 'I agree with you.', error: 'am agree → agree', explanation: '"Agree" là động từ thường, không dùng với "am/is/are".' },
    { id: '3', sentence: 'He don\'t like coffee.', corrected: 'He doesn\'t like coffee.', error: 'don\'t → doesn\'t', explanation: 'Ngôi thứ 3 số ít dùng "doesn\'t" thay vì "don\'t".' },
    { id: '4', sentence: 'I have went to Japan last year.', corrected: 'I went to Japan last year.', error: 'have went → went', explanation: '"Last year" là dấu hiệu quá khứ đơn, không dùng hiện tại hoàn thành.' },
    { id: '5', sentence: 'There is many people in the park.', corrected: 'There are many people in the park.', error: 'is → are', explanation: '"People" là danh từ số nhiều, dùng "are" thay vì "is".' },
    { id: '6', sentence: 'I am living here since 2020.', corrected: 'I have been living here since 2020.', error: 'am living → have been living', explanation: '"Since" đi với thì hiện tại hoàn thành (tiếp diễn).' },
    { id: '7', sentence: 'She is more taller than me.', corrected: 'She is taller than me.', error: 'more taller → taller', explanation: 'Tính từ ngắn dùng -er, không thêm "more" phía trước.' },
    { id: '8', sentence: 'I didn\'t went to the party.', corrected: 'I didn\'t go to the party.', error: 'went → go', explanation: 'Sau "didn\'t" dùng động từ nguyên mẫu (V1).' },
    { id: '9', sentence: 'He can speaks three languages.', corrected: 'He can speak three languages.', error: 'speaks → speak', explanation: 'Sau modal verb (can/could/will) dùng V nguyên mẫu, không chia.' },
    { id: '10', sentence: 'I am interesting in music.', corrected: 'I am interested in music.', error: 'interesting → interested', explanation: '"Interested" mô tả cảm xúc người, "interesting" mô tả vật gây hứng thú.' },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

export default function GrammarCorrectionPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const currentExercises = exercises[selectedLang] || [];
  const currentExercise = currentExercises[currentIndex];

  const checkAnswer = () => {
    if (!currentExercise) return;
    setShowResult(true);
    const normalize = (s: string) => s.toLowerCase().replace(/[.,!?]/g, '').trim();
    const isCorrect = normalize(userAnswer) === normalize(currentExercise.corrected);
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const nextExercise = () => {
    if (currentIndex < currentExercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setShowResult(false);
    }
  };

  const resetAll = () => {
    setCurrentIndex(0);
    setUserAnswer('');
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
  };

  if (!currentExercise) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">✏️</div>
        <h3 className="text-lg font-semibold mb-2">Chưa có bài sửa lỗi</h3>
        <p className="text-muted-foreground">Chọn ngôn ngữ để bắt đầu.</p>
      </div>
    );
  }

  if (currentIndex >= currentExercises.length) {
    const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-4">Hoàn thành!</h2>
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{score.correct}/{score.total}</p>
            <p className="text-sm text-muted-foreground">Đúng</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{pct}%</p>
            <p className="text-sm text-muted-foreground">Chính xác</p>
          </div>
        </div>
        <Button onClick={resetAll}>Làm lại</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Sửa lỗi ngữ pháp</h1>
        <p className="text-muted-foreground mt-1">Tìm và sửa lỗi sai trong câu</p>
      </div>

      {/* Language selector */}
      <div className="flex gap-2 flex-wrap">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => { setSelectedLang(lang.code); resetAll(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
              selectedLang === lang.code
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary-200'
            }`}
          >
            <span>{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Câu {currentIndex + 1} / {currentExercises.length}</span>
        <span className="font-medium text-green-600">{score.correct} đúng</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(currentIndex / currentExercises.length) * 100}%` }} />
      </div>

      {/* Sentence with error */}
      <div className="p-6 rounded-2xl bg-card border border">
        <p className="text-xs text-red-500 font-medium mb-2">Câu có lỗi sai:</p>
        <p className="text-xl font-medium text-red-700 dark:text-red-300">{currentExercise.sentence}</p>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-medium">Viết lại câu đúng:</p>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !showResult && userAnswer.trim() && checkAnswer()}
          placeholder="Gõ câu đã sửa..."
          disabled={showResult}
          className="w-full p-4 rounded-xl border-2 border-border bg-card text-lg focus:border-primary focus:outline-none transition-all"
          autoComplete="off"
        />
      </div>

      {/* Result */}
      {showResult && (
        <div className={`p-4 rounded-xl space-y-2 ${
          userAnswer.toLowerCase().trim() === currentExercise.corrected.toLowerCase().trim()
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200'
            : 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200'
        }`}>
          <p className="font-medium text-sm">
            {userAnswer.toLowerCase().trim() === currentExercise.corrected.toLowerCase().trim()
              ? '✓ Chính xác!'
              : '✗ Chưa đúng'}
          </p>
          <p className="text-sm"><span className="font-medium">Đáp án:</span> {currentExercise.corrected}</p>
          <p className="text-sm text-red-600"><span className="font-medium">Lỗi:</span> {currentExercise.error}</p>
          <p className="text-xs text-muted-foreground mt-1">{currentExercise.explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        {!showResult ? (
          <Button onClick={checkAnswer} disabled={!userAnswer.trim()}>Kiểm tra</Button>
        ) : (
          <Button onClick={nextExercise}>
            {currentIndex < currentExercises.length - 1 ? 'Câu tiếp →' : 'Xem kết quả'}
          </Button>
        )}
      </div>
    </div>
  );
}
