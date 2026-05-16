'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ListeningExercise {
  id: string;
  language: string;
  text: string;
  translation: string;
  options: string[];
  correctAnswer: number;
  audioText: string;
}

const exercises: Record<string, ListeningExercise[]> = {
  en: [
    { id: '1', language: 'en', text: 'What did you hear?', translation: 'Bạn nghe được gì?', audioText: 'I would like a cup of coffee, please.', options: ['I would like a cup of coffee, please.', 'I would like a cup of tea, please.', 'I would like a glass of water, please.', 'I would like a piece of cake, please.'], correctAnswer: 0 },
    { id: '2', language: 'en', text: 'What did you hear?', translation: 'Bạn nghe được gì?', audioText: 'The train leaves at nine thirty.', options: ['The train leaves at nine thirty.', 'The train leaves at nine fifteen.', 'The bus leaves at nine thirty.', 'The train arrives at nine thirty.'], correctAnswer: 0 },
    { id: '3', language: 'en', text: 'What did you hear?', translation: 'Bạn nghe được gì?', audioText: 'Can you help me find the library?', options: ['Can you help me find the hospital?', 'Can you help me find the library?', 'Can you help me find the station?', 'Can you show me the library?'], correctAnswer: 1 },
    { id: '4', language: 'en', text: 'What did you hear?', translation: 'Bạn nghe được gì?', audioText: 'My sister works at a bank.', options: ['My sister works at a bank.', 'My brother works at a bank.', 'My sister works at a school.', 'My sister lives near a bank.'], correctAnswer: 0 },
  ],
  ja: [
    { id: '5', language: 'ja', text: '何を聞きましたか？', translation: 'Bạn nghe được gì?', audioText: 'すみません、駅はどこですか？', options: ['すみません、駅はどこですか？', 'すみません、学校はどこですか？', 'すみません、病院はどこですか？', 'すみません、銀行はどこですか？'], correctAnswer: 0 },
    { id: '6', language: 'ja', text: '何を聞きましたか？', translation: 'Bạn nghe được gì?', audioText: '明日は日曜日です。', options: ['明日は月曜日です。', '明日は日曜日です。', '今日は日曜日です。', '明日は土曜日です。'], correctAnswer: 1 },
  ],
  zh: [
    { id: '7', language: 'zh', text: '你听到了什么？', translation: 'Bạn nghe được gì?', audioText: '请问，洗手间在哪里？', options: ['请问，洗手间在哪里？', '请问，图书馆在哪里？', '请问，餐厅在哪里？', '请问，医院在哪里？'], correctAnswer: 0 },
    { id: '8', language: 'zh', text: '你听到了什么？', translation: 'Bạn nghe được gì?', audioText: '我想买一杯咖啡。', options: ['我想买一杯茶。', '我想喝一杯水。', '我想买一杯咖啡。', '我想吃一个面包。'], correctAnswer: 2 },
  ],
  ko: [
    { id: '9', language: 'ko', text: '무엇을 들었습니까?', translation: 'Bạn nghe được gì?', audioText: '화장실이 어디에 있어요?', options: ['화장실이 어디에 있어요?', '도서관이 어디에 있어요?', '식당이 어디에 있어요?', '병원이 어디에 있어요?'], correctAnswer: 0 },
    { id: '10', language: 'ko', text: '무엇을 들었습니까?', translation: 'Bạn nghe được gì?', audioText: '커피 한 잔 주세요.', options: ['물 한 잔 주세요.', '커피 한 잔 주세요.', '차 한 잔 주세요.', '맥주 한 잔 주세요.'], correctAnswer: 1 },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function ListeningPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  const currentExercises = exercises[selectedLang] || [];
  const currentExercise = currentExercises[currentIndex];

  const playAudio = () => {
    if (!currentExercise || !window.speechSynthesis) return;

    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(currentExercise.audioText);

    const langMap: Record<string, string> = { en: 'en-US', ja: 'ja-JP', zh: 'zh-CN', ko: 'ko-KR' };
    utterance.lang = langMap[selectedLang] || 'en-US';
    utterance.rate = 0.8;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const checkAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === currentExercise.correctAnswer) {
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setScore(prev => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const nextExercise = () => {
    if (currentIndex < currentExercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetExercises = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
  };

  if (!currentExercise) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🎧</div>
        <h3 className="text-lg font-semibold mb-2">Chưa có bài nghe</h3>
        <p className="text-gray-500">Chọn ngôn ngữ để bắt đầu luyện nghe.</p>
      </div>
    );
  }

  if (currentIndex >= currentExercises.length) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-4">Hoàn thành!</h2>
        <p className="text-lg mb-2">Điểm: {score.correct}/{score.total}</p>
        <p className="text-gray-500 mb-6">
          {score.correct === score.total ? 'Tuyệt vời! Bạn nghe rất tốt!' : 'Tiếp tục luyện tập nhé!'}
        </p>
        <Button onClick={resetExercises}>Làm lại</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Luyện nghe</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Nghe và chọn đáp án đúng</p>
      </div>

      {/* Language selector */}
      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => { setSelectedLang(lang.code); resetExercises(); }}
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
        <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${((currentIndex) / currentExercises.length) * 100}%` }} />
      </div>

      {/* Audio player */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center">
        <p className="text-sm text-gray-500 mb-4">{currentExercise.translation}</p>
        <button
          onClick={playAudio}
          disabled={isPlaying}
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all shadow-lg ${
            isPlaying
              ? 'bg-primary-400 animate-pulse'
              : 'bg-primary-500 hover:bg-primary-600'
          }`}
        >
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            {isPlaying ? (
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
        </button>
        <p className="text-sm text-gray-400 mt-3">
          {isPlaying ? 'Đang phát...' : 'Nhấn để nghe'}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {currentExercise.options.map((option, i) => {
          let styles = 'border-gray-200 dark:border-gray-700 hover:border-primary-300';
          if (showResult) {
            if (i === currentExercise.correctAnswer) {
              styles = 'border-green-500 bg-green-50 dark:bg-green-900/20';
            } else if (i === selectedAnswer && i !== currentExercise.correctAnswer) {
              styles = 'border-red-500 bg-red-50 dark:bg-red-900/20';
            }
          } else if (selectedAnswer === i) {
            styles = 'border-primary-500 bg-primary-50 dark:bg-primary-900/20';
          }

          return (
            <button
              key={i}
              onClick={() => checkAnswer(i)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${styles}`}
            >
              <span className="text-sm">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Next button */}
      {showResult && (
        <div className="flex justify-end">
          <Button onClick={nextExercise}>
            {currentIndex < currentExercises.length - 1 ? 'Câu tiếp →' : 'Xem kết quả'}
          </Button>
        </div>
      )}
    </div>
  );
}
