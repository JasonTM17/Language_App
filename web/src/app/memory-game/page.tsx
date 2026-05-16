'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Card {
  id: string;
  content: string;
  type: 'word' | 'meaning';
  pairId: string;
  flipped: boolean;
  matched: boolean;
}

interface WordPair {
  word: string;
  meaning: string;
}

const wordSets: Record<string, WordPair[]> = {
  en: [
    { word: 'beautiful', meaning: 'đẹp' },
    { word: 'important', meaning: 'quan trọng' },
    { word: 'difficult', meaning: 'khó' },
    { word: 'dangerous', meaning: 'nguy hiểm' },
    { word: 'delicious', meaning: 'ngon' },
    { word: 'expensive', meaning: 'đắt' },
  ],
  ja: [
    { word: '美しい', meaning: 'đẹp' },
    { word: '大切', meaning: 'quan trọng' },
    { word: '難しい', meaning: 'khó' },
    { word: '危ない', meaning: 'nguy hiểm' },
    { word: '美味しい', meaning: 'ngon' },
    { word: '高い', meaning: 'đắt' },
  ],
  zh: [
    { word: '美丽', meaning: 'đẹp' },
    { word: '重要', meaning: 'quan trọng' },
    { word: '困难', meaning: 'khó' },
    { word: '危险', meaning: 'nguy hiểm' },
    { word: '好吃', meaning: 'ngon' },
    { word: '贵', meaning: 'đắt' },
  ],
  ko: [
    { word: '아름답다', meaning: 'đẹp' },
    { word: '중요하다', meaning: 'quan trọng' },
    { word: '어렵다', meaning: 'khó' },
    { word: '위험하다', meaning: 'nguy hiểm' },
    { word: '맛있다', meaning: 'ngon' },
    { word: '비싸다', meaning: 'đắt' },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryGamePage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalPairs = wordSets[selectedLang]?.length || 0;

  const initGame = () => {
    const pairs = wordSets[selectedLang] || [];
    const cardList: Card[] = [];
    pairs.forEach((pair, idx) => {
      cardList.push({ id: `w-${idx}`, content: pair.word, type: 'word', pairId: `pair-${idx}`, flipped: false, matched: false });
      cardList.push({ id: `m-${idx}`, content: pair.meaning, type: 'meaning', pairId: `pair-${idx}`, flipped: false, matched: false });
    });
    setCards(shuffle(cardList));
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setGameComplete(false);
    setTimer(0);
    setIsPlaying(true);
  };

  useEffect(() => { initGame(); }, [selectedLang]);

  useEffect(() => {
    if (!isPlaying || gameComplete) return;
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isPlaying, gameComplete]);

  const handleCardClick = (cardId: string) => {
    if (flippedCards.length >= 2) return;
    const card = cards.find(c => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, flipped: true } : c));

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped.map(id => cards.find(c => c.id === id)!);
      const firstCard = cardId === first.id ? card : first;
      const secondCard = cardId === second.id ? card : second;

      if (firstCard.pairId === secondCard.pairId) {
        setTimeout(() => {
          setCards(prev => prev.map(c => c.pairId === firstCard.pairId ? { ...c, matched: true } : c));
          setFlippedCards([]);
          setMatchedPairs(m => {
            const newCount = m + 1;
            if (newCount === totalPairs) setGameComplete(true);
            return newCount;
          });
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, flipped: false } : c));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (gameComplete) {
    const stars = moves <= totalPairs + 2 ? 3 : moves <= totalPairs + 5 ? 2 : 1;
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2">Hoàn thành!</h2>
        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className={`text-3xl ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
          ))}
        </div>
        <div className="flex justify-center gap-6 mb-6 text-sm text-gray-500">
          <span>⏱️ {formatTime(timer)}</span>
          <span>🔄 {moves} lượt</span>
          <span>✅ {totalPairs} cặp</span>
        </div>
        <Button onClick={initGame}>Chơi lại</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Trò chơi ghi nhớ</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Lật thẻ và nối từ với nghĩa</p>
      </div>

      {/* Language selector */}
      <div className="flex gap-2 flex-wrap">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
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

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">⏱️ {formatTime(timer)}</span>
        <span className="text-gray-500">🔄 {moves} lượt</span>
        <span className="text-green-600 font-medium">✅ {matchedPairs}/{totalPairs}</span>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.flipped || card.matched}
            className={`aspect-square rounded-xl border-2 flex items-center justify-center p-2 text-center transition-all ${
              card.matched
                ? 'border-green-300 bg-green-50 dark:bg-green-900/10'
                : card.flipped
                  ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-200 hover:scale-105'
            }`}
          >
            {card.flipped || card.matched ? (
              <span className={`text-sm font-medium ${card.type === 'word' ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>
                {card.content}
              </span>
            ) : (
              <span className="text-2xl text-gray-300">?</span>
            )}
          </button>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" size="sm" onClick={initGame}>Chơi lại</Button>
      </div>
    </div>
  );
}
