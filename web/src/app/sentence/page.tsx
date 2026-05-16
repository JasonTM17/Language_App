'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface SentenceExercise {
  id: string;
  language: string;
  targetSentence: string;
  translation: string;
  words: string[];
}

const exercises: Record<string, SentenceExercise[]> = {
  en: [
    { id: '1', language: 'en', targetSentence: 'I would like a cup of coffee', translation: 'Tôi muốn một ly cà phê', words: ['I', 'would', 'like', 'a', 'cup', 'of', 'coffee'] },
    { id: '2', language: 'en', targetSentence: 'Where is the train station', translation: 'Nhà ga ở đâu', words: ['Where', 'is', 'the', 'train', 'station'] },
    { id: '3', language: 'en', targetSentence: 'She goes to school every day', translation: 'Cô ấy đi học mỗi ngày', words: ['She', 'goes', 'to', 'school', 'every', 'day'] },
    { id: '4', language: 'en', targetSentence: 'Can you help me please', translation: 'Bạn có thể giúp tôi không', words: ['Can', 'you', 'help', 'me', 'please'] },
    { id: '5', language: 'en', targetSentence: 'I have been studying English for two years', translation: 'Tôi đã học tiếng Anh được hai năm', words: ['I', 'have', 'been', 'studying', 'English', 'for', 'two', 'years'] },
  ],
  ja: [
    { id: '6', language: 'ja', targetSentence: '私は学生です', translation: 'Tôi là sinh viên', words: ['私は', '学生', 'です'] },
    { id: '7', language: 'ja', targetSentence: '明日東京に行きます', translation: 'Ngày mai tôi đi Tokyo', words: ['明日', '東京に', '行きます'] },
    { id: '8', language: 'ja', targetSentence: 'この本はとても面白いです', translation: 'Cuốn sách này rất thú vị', words: ['この', '本は', 'とても', '面白い', 'です'] },
  ],
  zh: [
    { id: '9', language: 'zh', targetSentence: '我是越南人', translation: 'Tôi là người Việt Nam', words: ['我', '是', '越南人'] },
    { id: '10', language: 'zh', targetSentence: '今天天气很好', translation: 'Hôm nay thời tiết rất đẹp', words: ['今天', '天气', '很', '好'] },
    { id: '11', language: 'zh', targetSentence: '我想学中文', translation: 'Tôi muốn học tiếng Trung', words: ['我', '想', '学', '中文'] },
  ],
  ko: [
    { id: '12', language: 'ko', targetSentence: '저는 베트남 사람입니다', translation: 'Tôi là người Việt Nam', words: ['저는', '베트남', '사람입니다'] },
    { id: '13', language: 'ko', targetSentence: '한국어를 공부하고 있어요', translation: 'Tôi đang học tiếng Hàn', words: ['한국어를', '공부하고', '있어요'] },
    { id: '14', language: 'ko', targetSentence: '오늘 날씨가 좋아요', translation: 'Hôm nay thời tiết đẹp', words: ['오늘', '날씨가', '좋아요'] },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function SentencePage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const currentExercises = exercises[selectedLang] || [];
  const currentExercise = currentExercises[currentIndex];

  useEffect(() => {
    if (currentExercise) {
      const shuffled = [...currentExercise.words].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setSelectedWords([]);
      setShowResult(false);
    }
  }, [currentIndex, selectedLang]);

  const selectWord = (word: string, index: number) => {
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
  };

  const removeWord = (word: string, index: number) => {
    setAvailableWords(prev => [...prev, word]);
    setSelectedWords(prev => prev.filter((_, i) => i !== index));
  };

  const checkAnswer = () => {
    const userSentence = selectedWords.join(' ');
    const correct = userSentence === currentExercise.targetSentence;
    setIsCorrect(correct);
    setShowResult(true);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const nextExercise = () => {
    if (currentIndex < currentExercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const resetAll = () => {
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setShowResult(false);
    setSelectedWords([]);
  };

  if (!currentExercise) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🧩</div>
        <h3 className="text-lg font-semibold mb-2">Chưa có bài tập</h3>
        <p className="text-gray-500">Chọn ngôn ngữ để bắt đầu.</p>
      </div>
    );
  }

  if (currentIndex >= currentExercises.length) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-4">Hoàn thành!</h2>
        <p className="text-lg mb-6">Điểm: {score.correct}/{score.total}</p>
        <Button onClick={resetAll}>Làm lại</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Sắp xếp câu</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Sắp xếp các từ thành câu hoàn chỉnh</p>
      </div>

      {/* Language selector */}
      <div className="flex gap-2 flex-wrap">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => { setSelectedLang(lang.code); resetAll(); }}
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

      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Câu {currentIndex + 1} / {currentExercises.length}</span>
        <span className="font-medium text-green-600">{score.correct} đúng</span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${(currentIndex / currentExercises.length) * 100}%` }} />
      </div>

      {/* Translation prompt */}
      <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <p className="text-sm text-gray-500 mb-1">Dịch câu sau:</p>
        <p className="text-lg font-medium">{currentExercise.translation}</p>
      </div>

      {/* Selected words (answer area) */}
      <div className="min-h-[60px] p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 flex flex-wrap gap-2 items-center">
        {selectedWords.length === 0 && (
          <p className="text-sm text-gray-400">Nhấn vào các từ bên dưới để sắp xếp câu</p>
        )}
        {selectedWords.map((word, i) => (
          <button
            key={`selected-${i}`}
            onClick={() => !showResult && removeWord(word, i)}
            disabled={showResult}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              showResult
                ? isCorrect
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300'
                : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-300 hover:bg-primary-200'
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Available words */}
      <div className="flex flex-wrap gap-2 justify-center">
        {availableWords.map((word, i) => (
          <button
            key={`available-${i}`}
            onClick={() => !showResult && selectWord(word, i)}
            disabled={showResult}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-sm font-medium hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Result feedback */}
      {showResult && (
        <div className={`p-4 rounded-xl ${
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
            : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
        }`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {isCorrect ? '✓ Chính xác!' : '✗ Chưa đúng'}
          </p>
          {!isCorrect && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Đáp án: {currentExercise.targetSentence}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        {!showResult ? (
          <Button
            onClick={checkAnswer}
            disabled={selectedWords.length === 0}
            className="ml-auto"
          >
            Kiểm tra
          </Button>
        ) : (
          <Button onClick={nextExercise} className="ml-auto">
            {currentIndex < currentExercises.length - 1 ? 'Câu tiếp →' : 'Xem kết quả'}
          </Button>
        )}
      </div>
    </div>
  );
}
