'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link2, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';

interface MatchPair {
  word: string;
  meaning: string;
}

interface MatchSet {
  language: string;
  topic: string;
  pairs: MatchPair[];
}

const matchSets: Record<string, MatchSet[]> = {
  en: [
    {
      language: 'en', topic: 'Food',
      pairs: [
        { word: 'rice', meaning: 'cơm' },
        { word: 'chicken', meaning: 'gà' },
        { word: 'water', meaning: 'nước' },
        { word: 'bread', meaning: 'bánh mì' },
        { word: 'coffee', meaning: 'cà phê' },
        { word: 'fish', meaning: 'cá' },
      ],
    },
    {
      language: 'en', topic: 'Family',
      pairs: [
        { word: 'mother', meaning: 'mẹ' },
        { word: 'father', meaning: 'bố' },
        { word: 'sister', meaning: 'chị/em gái' },
        { word: 'brother', meaning: 'anh/em trai' },
        { word: 'grandmother', meaning: 'bà' },
        { word: 'grandfather', meaning: 'ông' },
      ],
    },
    {
      language: 'en', topic: 'Colors',
      pairs: [
        { word: 'red', meaning: 'đỏ' },
        { word: 'blue', meaning: 'xanh dương' },
        { word: 'green', meaning: 'xanh lá' },
        { word: 'yellow', meaning: 'vàng' },
        { word: 'white', meaning: 'trắng' },
        { word: 'black', meaning: 'đen' },
      ],
    },
    {
      language: 'en', topic: 'Body Parts',
      pairs: [
        { word: 'head', meaning: 'đầu' },
        { word: 'hand', meaning: 'tay' },
        { word: 'eye', meaning: 'mắt' },
        { word: 'ear', meaning: 'tai' },
        { word: 'nose', meaning: 'mũi' },
        { word: 'mouth', meaning: 'miệng' },
      ],
    },
  ],
  ja: [
    {
      language: 'ja', topic: 'Greetings',
      pairs: [
        { word: 'おはよう', meaning: 'chào buổi sáng' },
        { word: 'こんにちは', meaning: 'xin chào' },
        { word: 'さようなら', meaning: 'tạm biệt' },
        { word: 'ありがとう', meaning: 'cảm ơn' },
        { word: 'すみません', meaning: 'xin lỗi' },
        { word: 'おやすみ', meaning: 'chúc ngủ ngon' },
      ],
    },
    {
      language: 'ja', topic: 'Animals',
      pairs: [
        { word: 'ねこ', meaning: 'mèo' },
        { word: 'いぬ', meaning: 'chó' },
        { word: 'さかな', meaning: 'cá' },
        { word: 'とり', meaning: 'chim' },
        { word: 'うさぎ', meaning: 'thỏ' },
        { word: 'うま', meaning: 'ngựa' },
      ],
    },
    {
      language: 'ja', topic: 'Food',
      pairs: [
        { word: 'ごはん', meaning: 'cơm' },
        { word: 'みず', meaning: 'nước' },
        { word: 'にく', meaning: 'thịt' },
        { word: 'やさい', meaning: 'rau' },
        { word: 'くだもの', meaning: 'trái cây' },
        { word: 'たまご', meaning: 'trứng' },
      ],
    },
    {
      language: 'ja', topic: 'Family',
      pairs: [
        { word: 'おかあさん', meaning: 'mẹ' },
        { word: 'おとうさん', meaning: 'bố' },
        { word: 'おねえさん', meaning: 'chị gái' },
        { word: 'おにいさん', meaning: 'anh trai' },
        { word: 'おばあさん', meaning: 'bà' },
        { word: 'おじいさん', meaning: 'ông' },
      ],
    },
    {
      language: 'ja', topic: 'Places',
      pairs: [
        { word: 'がっこう', meaning: 'trường học' },
        { word: 'びょういん', meaning: 'bệnh viện' },
        { word: 'えき', meaning: 'nhà ga' },
        { word: 'こうえん', meaning: 'công viên' },
        { word: 'としょかん', meaning: 'thư viện' },
        { word: 'スーパー', meaning: 'siêu thị' },
      ],
    },
  ],
  zh: [
    {
      language: 'zh', topic: 'Numbers',
      pairs: [
        { word: '一', meaning: 'một' },
        { word: '二', meaning: 'hai' },
        { word: '三', meaning: 'ba' },
        { word: '五', meaning: 'năm' },
        { word: '十', meaning: 'mười' },
        { word: '百', meaning: 'trăm' },
      ],
    },
    {
      language: 'zh', topic: 'Weather',
      pairs: [
        { word: '晴天', meaning: 'trời nắng' },
        { word: '下雨', meaning: 'mưa' },
        { word: '刮风', meaning: 'gió' },
        { word: '下雪', meaning: 'tuyết' },
        { word: '多云', meaning: 'nhiều mây' },
        { word: '热', meaning: 'nóng' },
      ],
    },
    {
      language: 'zh', topic: 'Family',
      pairs: [
        { word: '妈妈', meaning: 'mẹ' },
        { word: '爸爸', meaning: 'bố' },
        { word: '姐姐', meaning: 'chị gái' },
        { word: '哥哥', meaning: 'anh trai' },
        { word: '奶奶', meaning: 'bà nội' },
        { word: '爷爷', meaning: 'ông nội' },
      ],
    },
    {
      language: 'zh', topic: 'Food',
      pairs: [
        { word: '米饭', meaning: 'cơm' },
        { word: '面条', meaning: 'mì' },
        { word: '鸡肉', meaning: 'thịt gà' },
        { word: '蔬菜', meaning: 'rau' },
        { word: '水果', meaning: 'trái cây' },
        { word: '牛奶', meaning: 'sữa bò' },
      ],
    },
    {
      language: 'zh', topic: 'Places',
      pairs: [
        { word: '学校', meaning: 'trường học' },
        { word: '医院', meaning: 'bệnh viện' },
        { word: '银行', meaning: 'ngân hàng' },
        { word: '超市', meaning: 'siêu thị' },
        { word: '公园', meaning: 'công viên' },
        { word: '图书馆', meaning: 'thư viện' },
      ],
    },
  ],
  ko: [
    {
      language: 'ko', topic: 'Daily',
      pairs: [
        { word: '안녕하세요', meaning: 'xin chào' },
        { word: '감사합니다', meaning: 'cảm ơn' },
        { word: '미안합니다', meaning: 'xin lỗi' },
        { word: '네', meaning: 'vâng/dạ' },
        { word: '아니요', meaning: 'không' },
        { word: '잘 가요', meaning: 'tạm biệt' },
      ],
    },
    {
      language: 'ko', topic: 'Food',
      pairs: [
        { word: '밥', meaning: 'cơm' },
        { word: '김치', meaning: 'kim chi' },
        { word: '물', meaning: 'nước' },
        { word: '고기', meaning: 'thịt' },
        { word: '과일', meaning: 'trái cây' },
        { word: '빵', meaning: 'bánh mì' },
      ],
    },
    {
      language: 'ko', topic: 'Family',
      pairs: [
        { word: '어머니', meaning: 'mẹ' },
        { word: '아버지', meaning: 'bố' },
        { word: '언니/누나', meaning: 'chị gái' },
        { word: '오빠/형', meaning: 'anh trai' },
        { word: '할머니', meaning: 'bà' },
        { word: '할아버지', meaning: 'ông' },
      ],
    },
    {
      language: 'ko', topic: 'Places',
      pairs: [
        { word: '학교', meaning: 'trường học' },
        { word: '병원', meaning: 'bệnh viện' },
        { word: '은행', meaning: 'ngân hàng' },
        { word: '공원', meaning: 'công viên' },
        { word: '도서관', meaning: 'thư viện' },
        { word: '마트', meaning: 'siêu thị' },
      ],
    },
    {
      language: 'ko', topic: 'Body',
      pairs: [
        { word: '머리', meaning: 'đầu' },
        { word: '손', meaning: 'tay' },
        { word: '눈', meaning: 'mắt' },
        { word: '귀', meaning: 'tai' },
        { word: '코', meaning: 'mũi' },
        { word: '입', meaning: 'miệng' },
      ],
    },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function MatchingPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [setIndex, setSetIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ word: string; meaning: string } | null>(null);
  const [shuffledMeanings, setShuffledMeanings] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const currentSets = matchSets[selectedLang] || [];
  const currentSet = currentSets[setIndex];

  useEffect(() => {
    if (currentSet) {
      const meanings = currentSet.pairs.map(p => p.meaning).sort(() => Math.random() - 0.5);
      setShuffledMeanings(meanings);
      setMatched(new Set());
      setSelectedWord(null);
      setSelectedMeaning(null);
      setCompleted(false);
      setAttempts(0);
      setWrongPair(null);
    }
  }, [setIndex, selectedLang]);

  useEffect(() => {
    if (selectedWord && selectedMeaning && currentSet) {
      setAttempts(prev => prev + 1);
      const pair = currentSet.pairs.find(p => p.word === selectedWord);
      if (pair && pair.meaning === selectedMeaning) {
        setMatched(prev => new Set([...prev, selectedWord]));
        setSelectedWord(null);
        setSelectedMeaning(null);
        if (matched.size + 1 === currentSet.pairs.length) {
          setCompleted(true);
        }
      } else {
        setWrongPair({ word: selectedWord, meaning: selectedMeaning });
        setTimeout(() => {
          setSelectedWord(null);
          setSelectedMeaning(null);
          setWrongPair(null);
        }, 800);
      }
    }
  }, [selectedWord, selectedMeaning]);

  const resetGame = () => {
    setSetIndex(0);
    setMatched(new Set());
    setSelectedWord(null);
    setSelectedMeaning(null);
    setCompleted(false);
    setAttempts(0);
  };

  if (!currentSet) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-4">
          <Link2 className="w-12 h-12 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Chưa có bài ghép từ</h3>
        <p className="text-muted-foreground">Chọn ngôn ngữ để bắt đầu.</p>
      </div>
    );
  }

  if (completed) {
    const accuracy = Math.round((currentSet.pairs.length / attempts) * 100);
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="flex justify-center mb-4">
          <PartyPopper className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Hoàn thành!</h2>
        <p className="text-muted-foreground mb-4">Chủ đề: {currentSet.topic}</p>
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{currentSet.pairs.length}</p>
            <p className="text-sm text-muted-foreground">Cặp từ</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{accuracy}%</p>
            <p className="text-sm text-muted-foreground">Chính xác</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">{attempts}</p>
            <p className="text-sm text-muted-foreground">Lần thử</p>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          {setIndex < currentSets.length - 1 && (
            <Button onClick={() => setSetIndex(prev => prev + 1)}>Bộ tiếp theo</Button>
          )}
          <Button variant="outline" onClick={resetGame}>Chơi lại</Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div className="max-w-2xl mx-auto space-y-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div>
        <h1 className="text-2xl font-bold font-display">Ghép từ</h1>
        <p className="text-muted-foreground mt-1">Ghép từ với nghĩa tương ứng</p>
      </div>

      {/* Language selector */}
      <div className="flex gap-2 flex-wrap">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => { setSelectedLang(lang.code); setSetIndex(0); }}
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
        <span className="text-muted-foreground">Chủ đề: {currentSet.topic}</span>
        <span className="font-medium">{matched.size} / {currentSet.pairs.length} cặp</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${(matched.size / currentSet.pairs.length) * 100}%` }} />
      </div>

      {/* Matching grid */}
      <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5">
        {/* Words column */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Từ vựng</p>
          {currentSet.pairs.map((pair) => {
            const isMatched = matched.has(pair.word);
            const isSelected = selectedWord === pair.word;
            const isWrong = wrongPair?.word === pair.word;

            return (
              <button
                key={pair.word}
                onClick={() => !isMatched && setSelectedWord(pair.word)}
                disabled={isMatched}
                className={`w-full p-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                  isMatched
                    ? 'border-green-300 bg-green-50 dark:bg-green-900/20 text-green-600 opacity-60'
                    : isWrong
                    ? 'border-red-400 bg-red-50 dark:bg-red-900/20 animate-shake'
                    : isSelected
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border hover:border-primary-300'
                }`}
              >
                {isMatched ? '✓ ' : ''}{pair.word}
              </button>
            );
          })}
        </div>

        {/* Meanings column */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Nghĩa</p>
          {shuffledMeanings.map((meaning) => {
            const isMatched = currentSet.pairs.some(p => p.meaning === meaning && matched.has(p.word));
            const isSelected = selectedMeaning === meaning;
            const isWrong = wrongPair?.meaning === meaning;

            return (
              <button
                key={meaning}
                onClick={() => !isMatched && setSelectedMeaning(meaning)}
                disabled={isMatched}
                className={`w-full p-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                  isMatched
                    ? 'border-green-300 bg-green-50 dark:bg-green-900/20 text-green-600 opacity-60'
                    : isWrong
                    ? 'border-red-400 bg-red-50 dark:bg-red-900/20 animate-shake'
                    : isSelected
                    ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20 shadow-md'
                    : 'border-border hover:border-accent-300'
                }`}
              >
                {isMatched ? '✓ ' : ''}{meaning}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Chọn một từ bên trái, sau đó chọn nghĩa tương ứng bên phải
      </p>
    </motion.div>
  );
}
