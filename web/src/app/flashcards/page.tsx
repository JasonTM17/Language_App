'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';

interface VocabCard {
  id: string;
  word: string;
  reading?: string;
  meaning: string;
  example?: string;
  exampleMeaning?: string;
}

export default function FlashcardsPage() {
  const [cards, setCards] = useState<VocabCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ known: 0, unknown: 0 });

  const fallbackCards: VocabCard[] = [
    { id: '1', word: 'Hello', meaning: 'Xin chào', example: 'Hello, how are you?', exampleMeaning: 'Xin chào, bạn khỏe không?' },
    { id: '2', word: 'Thank you', meaning: 'Cảm ơn', example: 'Thank you for your help.', exampleMeaning: 'Cảm ơn bạn đã giúp đỡ.' },
    { id: '3', word: 'Goodbye', meaning: 'Tạm biệt', example: 'Goodbye, see you tomorrow!', exampleMeaning: 'Tạm biệt, hẹn gặp lại ngày mai!' },
    { id: '4', word: 'こんにちは', reading: 'konnichiwa', meaning: 'Xin chào (buổi chiều)', example: 'こんにちは、元気ですか？', exampleMeaning: 'Xin chào, bạn khỏe không?' },
    { id: '5', word: '你好', reading: 'nǐ hǎo', meaning: 'Xin chào', example: '你好，你叫什么名字？', exampleMeaning: 'Xin chào, bạn tên gì?' },
    { id: '6', word: '안녕하세요', reading: 'annyeonghaseyo', meaning: 'Xin chào', example: '안녕하세요, 잘 지내세요?', exampleMeaning: 'Xin chào, bạn khỏe không?' },
  ];

  useEffect(() => {
    api.vocabulary.list('', true)
      .then((data: any) => {
        if (data.vocabulary.length > 0) {
          setCards(data.vocabulary);
        } else {
          api.vocabulary.list()
            .then((allData: any) => setCards(allData.vocabulary.slice(0, 20)))
            .catch(() => setCards(fallbackCards));
        }
      })
      .catch(() => {
        setCards(fallbackCards);
      })
      .finally(() => setLoading(false));
  }, []);

  const currentCard = cards[currentIndex];

  const handleReview = (known: boolean) => {
    setStats(prev => ({
      known: prev.known + (known ? 1 : 0),
      unknown: prev.unknown + (known ? 0 : 1),
    }));

    if (currentCard) {
      api.vocabulary.review(currentCard.id, known).catch(() => {});
    }

    setFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex >= cards.length) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setFlipped(f => !f);
      } else if (e.key === 'ArrowRight' && flipped) {
        handleReview(true);
      } else if (e.key === 'ArrowLeft' && flipped) {
        handleReview(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flipped, currentIndex, cards.length]);

  const resetDeck = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setStats({ known: 0, unknown: 0 });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse w-80 h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🃏</div>
        <h3 className="text-lg font-semibold mb-2">Chưa có flashcard</h3>
        <p className="text-gray-500">Hoàn thành bài học để mở khóa flashcard từ vựng.</p>
      </div>
    );
  }

  if (currentIndex >= cards.length) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-4">Hoàn thành phiên ôn tập!</h2>
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{stats.known}</p>
            <p className="text-sm text-gray-500">Đã thuộc</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">{stats.unknown}</p>
            <p className="text-sm text-gray-500">Cần ôn lại</p>
          </div>
        </div>
        <Button onClick={resetDeck}>Ôn tập lại</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Flashcards</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Nhấn vào thẻ để lật</p>
        </div>
        <span className="text-sm text-gray-500">{currentIndex + 1} / {cards.length}</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-300" style={{ width: `${((currentIndex) / cards.length) * 100}%` }} />
      </div>

      {/* Card */}
      <div className="flex justify-center">
        <div
          onClick={() => setFlipped(!flipped)}
          className="w-full max-w-lg h-72 cursor-pointer perspective-1000"
        >
          <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
            {/* Front */}
            <div className="absolute inset-0 backface-hidden rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-xl flex flex-col items-center justify-center p-8">
              <p className="text-4xl font-bold mb-3">{currentCard.word}</p>
              {currentCard.reading && <p className="text-lg text-gray-500">{currentCard.reading}</p>}
              <p className="text-sm text-gray-400 mt-4">Nhấn để xem nghĩa</p>
            </div>
            {/* Back */}
            <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-3xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-2 border-primary-200 dark:border-primary-800 shadow-xl flex flex-col items-center justify-center p-8">
              <p className="text-2xl font-bold text-primary-700 dark:text-primary-300 mb-3">{currentCard.meaning}</p>
              {currentCard.example && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic">{currentCard.example}</p>
                  {currentCard.exampleMeaning && <p className="text-xs text-gray-500 mt-1">{currentCard.exampleMeaning}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" size="lg" onClick={() => handleReview(false)} className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20">
          ✗ Chưa thuộc
        </Button>
        <Button variant="success" size="lg" onClick={() => handleReview(true)}>
          ✓ Đã thuộc
        </Button>
      </div>

      {/* Keyboard hints */}
      <p className="text-center text-xs text-gray-400">
        Phím tắt: Space để lật • ← chưa thuộc • → đã thuộc
      </p>
    </div>
  );
}
