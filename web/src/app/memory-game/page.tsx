'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PartyPopper } from 'lucide-react';

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
    { word: 'comfortable', meaning: 'thoải mái' },
    { word: 'interesting', meaning: 'thú vị' },
    { word: 'necessary', meaning: 'cần thiết' },
    { word: 'successful', meaning: 'thành công' },
  ],
  ja: [
    { word: '美しい', meaning: 'đẹp' },
    { word: '大切', meaning: 'quan trọng' },
    { word: '難しい', meaning: 'khó' },
    { word: '危ない', meaning: 'nguy hiểm' },
    { word: '美味しい', meaning: 'ngon' },
    { word: '高い', meaning: 'đắt' },
    { word: '楽しい', meaning: 'vui' },
    { word: '優しい', meaning: 'hiền lành' },
    { word: '嬉しい', meaning: 'vui mừng' },
    { word: '寂しい', meaning: 'cô đơn' },
  ],
  zh: [
    { word: '美丽', meaning: 'đẹp' },
    { word: '重要', meaning: 'quan trọng' },
    { word: '困难', meaning: 'khó' },
    { word: '危险', meaning: 'nguy hiểm' },
    { word: '好吃', meaning: 'ngon' },
    { word: '贵', meaning: 'đắt' },
    { word: '有趣', meaning: 'thú vị' },
    { word: '舒服', meaning: 'thoải mái' },
    { word: '开心', meaning: 'vui vẻ' },
    { word: '聪明', meaning: 'thông minh' },
  ],
  ko: [
    { word: '아름답다', meaning: 'đẹp' },
    { word: '중요하다', meaning: 'quan trọng' },
    { word: '어렵다', meaning: 'khó' },
    { word: '위험하다', meaning: 'nguy hiểm' },
    { word: '맛있다', meaning: 'ngon' },
    { word: '비싸다', meaning: 'đắt' },
    { word: '재미있다', meaning: 'thú vị' },
    { word: '편하다', meaning: 'thoải mái' },
    { word: '행복하다', meaning: 'hạnh phúc' },
    { word: '똑똑하다', meaning: 'thông minh' },
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
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto text-center py-16"
      >
        <div className="flex justify-center mb-4">
          <PartyPopper className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Hoàn thành!</h2>
        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className={`text-3xl ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
          ))}
        </div>
        <div className="flex justify-center gap-6 mb-6 text-sm text-muted-foreground">
          <span>⏱️ {formatTime(timer)}</span>
          <span>🔄 {moves} lượt</span>
          <span>✅ {totalPairs} cặp</span>
        </div>
        <Button onClick={initGame}>Chơi lại</Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold font-display">Trò chơi ghi nhớ</h1>
        <p className="text-muted-foreground mt-1">Lật thẻ và nối từ với nghĩa</p>
      </div>

      {/* Language selector */}
      <div className="flex gap-2 flex-wrap">
        {languages.map((lang, index) => (
          <motion.button
            key={lang.code}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index * 0.05, 0.3) }}
            onClick={() => setSelectedLang(lang.code)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
              selectedLang === lang.code
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary-200'
            }`}
          >
            <span>{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">⏱️ {formatTime(timer)}</span>
        <span className="text-muted-foreground">🔄 {moves} lượt</span>
        <span className="text-green-600 font-medium">✅ {matchedPairs}/{totalPairs}</span>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {cards.map((card, index) => (
          <motion.button
            key={card.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: Math.min(index * 0.03, 0.3) }}
            onClick={() => handleCardClick(card.id)}
            disabled={card.flipped || card.matched}
            className={`aspect-square rounded-xl border-2 flex items-center justify-center p-2 text-center transition-all ${
              card.matched
                ? 'border-green-300 bg-green-50 dark:bg-green-900/10'
                : card.flipped
                  ? 'border-primary-400 bg-primary/5'
                  : 'border-border bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 backdrop-blur-sm hover:border-primary-200 hover:scale-105'
            }`}
          >
            {card.flipped || card.matched ? (
              <span className={`text-sm font-medium ${card.type === 'word' ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>
                {card.content}
              </span>
            ) : (
              <span className="text-2xl text-gray-300">?</span>
            )}
          </motion.button>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" size="sm" onClick={initGame}>Chơi lại</Button>
      </div>
    </motion.div>
  );
}
