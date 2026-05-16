'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PartyPopper } from 'lucide-react';

interface WeakWord {
  id: string;
  word: string;
  meaning: string;
  example: string;
  language: string;
  accuracy: number;
  lastReviewed: string;
  reviewCount: number;
}

const mockWeakWords: WeakWord[] = [
  { id: '1', word: 'although', meaning: 'mặc dù', example: 'Although it was raining, we went out.', language: 'en', accuracy: 35, lastReviewed: '2 ngày trước', reviewCount: 4 },
  { id: '2', word: 'necessary', meaning: 'cần thiết', example: 'It is necessary to study every day.', language: 'en', accuracy: 40, lastReviewed: '1 ngày trước', reviewCount: 3 },
  { id: '3', word: 'environment', meaning: 'môi trường', example: 'We must protect the environment.', language: 'en', accuracy: 42, lastReviewed: '3 ngày trước', reviewCount: 5 },
  { id: '4', word: '出張 (しゅっちょう)', meaning: 'công tác', example: '来月出張があります。', language: 'ja', accuracy: 30, lastReviewed: '1 ngày trước', reviewCount: 6 },
  { id: '5', word: '締め切り (しめきり)', meaning: 'hạn chót', example: '締め切りは金曜日です。', language: 'ja', accuracy: 38, lastReviewed: '2 ngày trước', reviewCount: 4 },
  { id: '6', word: '截止日期', meaning: 'hạn chót', example: '截止日期是星期五。', language: 'zh', accuracy: 28, lastReviewed: '4 ngày trước', reviewCount: 7 },
  { id: '7', word: '惊讶 (jīngyà)', meaning: 'ngạc nhiên', example: '我很惊讶。', language: 'zh', accuracy: 45, lastReviewed: '1 ngày trước', reviewCount: 3 },
  { id: '8', word: '출장', meaning: 'công tác', example: '다음 달에 출장이 있어요.', language: 'ko', accuracy: 33, lastReviewed: '2 ngày trước', reviewCount: 5 },
  { id: '9', word: 'opportunity', meaning: 'cơ hội', example: 'This is a great opportunity.', language: 'en', accuracy: 48, lastReviewed: '1 ngày trước', reviewCount: 2 },
  { id: '10', word: '恥ずかしい', meaning: 'xấu hổ', example: '間違えて恥ずかしいです。', language: 'ja', accuracy: 25, lastReviewed: '3 ngày trước', reviewCount: 8 },
];

const languages = [
  { code: 'all', name: 'Tất cả', flag: '🌍' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

type ReviewMode = 'list' | 'flashcard';

export default function WeakWordsPage() {
  const [selectedLang, setSelectedLang] = useState('all');
  const [mode, setMode] = useState<ReviewMode>('list');
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewed, setReviewed] = useState<Set<string>>(new Set());

  const filteredWords = selectedLang === 'all'
    ? mockWeakWords
    : mockWeakWords.filter(w => w.language === selectedLang);

  const sortedWords = [...filteredWords].sort((a, b) => a.accuracy - b.accuracy);

  const handleKnow = () => {
    setReviewed(prev => new Set([...prev, sortedWords[currentCard].id]));
    if (currentCard < sortedWords.length - 1) {
      setCurrentCard(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const handleDontKnow = () => {
    if (currentCard < sortedWords.length - 1) {
      setCurrentCard(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const resetReview = () => {
    setCurrentCard(0);
    setShowAnswer(false);
    setReviewed(new Set());
  };

  if (mode === 'flashcard' && sortedWords.length > 0) {
    const card = sortedWords[currentCard];
    if (!card) {
      return (
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="flex justify-center mb-4">
            <PartyPopper className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Hoàn thành ôn tập!</h2>
          <p className="text-muted-foreground mb-4">Bạn đã ôn {reviewed.size} từ</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={resetReview}>Ôn lại</Button>
            <Button variant="outline" onClick={() => setMode('list')}>Xem danh sách</Button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold font-display">Ôn từ yếu</h1>
          <Button variant="outline" size="sm" onClick={() => setMode('list')}>Danh sách</Button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{currentCard + 1} / {sortedWords.length}</span>
          <span className="text-green-600 font-medium">{reviewed.size} đã nhớ</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((currentCard + 1) / sortedWords.length) * 100}%` }} />
        </div>

        <div
          onClick={() => setShowAnswer(true)}
          className="p-8 rounded-2xl bg-card border-2 border text-center cursor-pointer hover:border-primary-200 transition-all min-h-[200px] flex flex-col justify-center"
        >
          <p className="text-3xl font-bold mb-2">{card.word}</p>
          {showAnswer ? (
            <div className="space-y-2 mt-4">
              <p className="text-lg text-primary font-medium">{card.meaning}</p>
              <p className="text-sm text-muted-foreground italic">{card.example}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mt-2">Nhấn để xem nghĩa</p>
          )}
        </div>

        {showAnswer && (
          <div className="flex gap-3">
            <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={handleDontKnow}>
              Chưa nhớ
            </Button>
            <Button className="flex-1 bg-green-500 hover:bg-green-600" onClick={handleKnow}>
              Đã nhớ
            </Button>
          </div>
        )}

        <div className="text-center">
          <p className="text-xs text-muted-foreground">Độ chính xác: <span className="text-red-500 font-medium">{card.accuracy}%</span> | Đã ôn: {card.reviewCount} lần</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Từ cần ôn tập</h1>
          <p className="text-muted-foreground mt-1">Những từ bạn hay quên nhất</p>
        </div>
        <Button onClick={() => { setMode('flashcard'); resetReview(); }}>
          Ôn flashcard
        </Button>
      </div>

      {/* Language filter */}
      <div className="flex gap-2 flex-wrap">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 transition-all text-sm ${
              selectedLang === lang.code
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary-200'
            }`}
          >
            <span>{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 text-center">
          <p className="text-xl font-bold text-red-600">{sortedWords.filter(w => w.accuracy < 35).length}</p>
          <p className="text-xs text-muted-foreground">Rất yếu</p>
        </div>
        <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 text-center">
          <p className="text-xl font-bold text-orange-600">{sortedWords.filter(w => w.accuracy >= 35 && w.accuracy < 50).length}</p>
          <p className="text-xs text-muted-foreground">Cần ôn</p>
        </div>
        <div className="p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 text-center">
          <p className="text-xl font-bold text-yellow-600">{sortedWords.length}</p>
          <p className="text-xs text-muted-foreground">Tổng từ yếu</p>
        </div>
      </div>

      {/* Word list */}
      <div className="space-y-2">
        {sortedWords.map((word) => (
          <div key={word.id} className="p-4 rounded-xl bg-card border border flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{word.word}</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-muted-foreground">{word.language.toUpperCase()}</span>
              </div>
              <p className="text-sm text-muted-foreground">{word.meaning}</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium ${word.accuracy < 35 ? 'text-red-500' : word.accuracy < 50 ? 'text-orange-500' : 'text-yellow-600'}`}>
                {word.accuracy}%
              </p>
              <p className="text-xs text-muted-foreground">{word.lastReviewed}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
