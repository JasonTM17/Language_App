'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { XpPopup } from '@/components/ui/xp-popup';
import { Trophy, Star, Dumbbell } from 'lucide-react';
import { Celebration } from '@/components/ui/celebration';

interface TypingExercise {
  id: string;
  text: string;
  translation: string;
  difficulty: string;
}

const exercises: Record<string, TypingExercise[]> = {
  en: [
    { id: 'en-1', text: 'The quick brown fox jumps over the lazy dog.', translation: 'Con cáo nâu nhanh nhẹn nhảy qua con chó lười.', difficulty: 'easy' },
    { id: 'en-2', text: 'Practice makes perfect.', translation: 'Luyện tập tạo nên sự hoàn hảo.', difficulty: 'easy' },
    { id: 'en-3', text: 'Learning a new language opens doors to new cultures.', translation: 'Học ngôn ngữ mới mở ra cánh cửa đến văn hóa mới.', difficulty: 'medium' },
    { id: 'en-4', text: 'She sells seashells by the seashore.', translation: 'Cô ấy bán vỏ sò bên bờ biển.', difficulty: 'medium' },
    { id: 'en-5', text: 'Knowledge is power, but enthusiasm pulls the switch.', translation: 'Kiến thức là sức mạnh, nhưng nhiệt huyết mới là công tắc.', difficulty: 'hard' },
    { id: 'en-6', text: 'Every journey begins with a single step.', translation: 'Mọi hành trình đều bắt đầu bằng một bước chân.', difficulty: 'easy' },
    { id: 'en-7', text: 'The best time to plant a tree was twenty years ago.', translation: 'Thời điểm tốt nhất để trồng cây là hai mươi năm trước.', difficulty: 'medium' },
    { id: 'en-8', text: 'Success is not final, failure is not fatal.', translation: 'Thành công không phải là cuối cùng, thất bại không phải là chết người.', difficulty: 'medium' },
  ],
  ja: [
    { id: 'ja-1', text: 'おはようございます。', translation: 'Chào buổi sáng.', difficulty: 'easy' },
    { id: 'ja-2', text: '日本語を勉強しています。', translation: 'Tôi đang học tiếng Nhật.', difficulty: 'easy' },
    { id: 'ja-3', text: '毎日少しずつ練習することが大切です。', translation: 'Luyện tập một chút mỗi ngày là quan trọng.', difficulty: 'medium' },
    { id: 'ja-4', text: '新しい言葉を覚えるのは楽しいです。', translation: 'Học từ mới rất vui.', difficulty: 'medium' },
    { id: 'ja-5', text: '日本の文化に興味があります。', translation: 'Tôi quan tâm đến văn hóa Nhật Bản.', difficulty: 'easy' },
    { id: 'ja-6', text: '来週の月曜日に会議があります。', translation: 'Thứ Hai tuần sau có cuộc họp.', difficulty: 'medium' },
    { id: 'ja-7', text: '東京は世界で最も人口が多い都市です。', translation: 'Tokyo là thành phố đông dân nhất thế giới.', difficulty: 'hard' },
    { id: 'ja-8', text: '日本料理は健康的で美味しいです。', translation: 'Ẩm thực Nhật Bản vừa tốt cho sức khỏe vừa ngon.', difficulty: 'medium' },
  ],
  zh: [
    { id: 'zh-1', text: '你好，很高兴认识你。', translation: 'Xin chào, rất vui được gặp bạn.', difficulty: 'easy' },
    { id: 'zh-2', text: '我正在学习中文。', translation: 'Tôi đang học tiếng Trung.', difficulty: 'easy' },
    { id: 'zh-3', text: '每天练习一点很重要。', translation: 'Luyện tập một chút mỗi ngày rất quan trọng.', difficulty: 'medium' },
    { id: 'zh-4', text: '学习新词汇很有趣。', translation: 'Học từ vựng mới rất thú vị.', difficulty: 'easy' },
    { id: 'zh-5', text: '中国文化博大精深。', translation: 'Văn hóa Trung Quốc rộng lớn và sâu sắc.', difficulty: 'medium' },
    { id: 'zh-6', text: '我喜欢在周末去公园散步。', translation: 'Tôi thích đi dạo ở công viên vào cuối tuần.', difficulty: 'medium' },
    { id: 'zh-7', text: '学好一门外语需要时间和耐心。', translation: 'Học giỏi một ngoại ngữ cần thời gian và kiên nhẫn.', difficulty: 'hard' },
    { id: 'zh-8', text: '今天天气很好，适合出去玩。', translation: 'Hôm nay thời tiết đẹp, thích hợp đi chơi.', difficulty: 'easy' },
  ],
  ko: [
    { id: 'ko-1', text: '안녕하세요, 만나서 반갑습니다.', translation: 'Xin chào, rất vui được gặp bạn.', difficulty: 'easy' },
    { id: 'ko-2', text: '한국어를 공부하고 있어요.', translation: 'Tôi đang học tiếng Hàn.', difficulty: 'easy' },
    { id: 'ko-3', text: '매일 조금씩 연습하는 것이 중요해요.', translation: 'Luyện tập một chút mỗi ngày là quan trọng.', difficulty: 'medium' },
    { id: 'ko-4', text: '새로운 단어를 배우는 것은 재미있어요.', translation: 'Học từ mới rất vui.', difficulty: 'easy' },
    { id: 'ko-5', text: '한국 문화에 관심이 있어요.', translation: 'Tôi quan tâm đến văn hóa Hàn Quốc.', difficulty: 'easy' },
    { id: 'ko-6', text: '주말에 친구들과 영화를 보러 갈 거예요.', translation: 'Cuối tuần tôi sẽ đi xem phim với bạn bè.', difficulty: 'medium' },
    { id: 'ko-7', text: '서울은 현대적이면서도 전통적인 도시입니다.', translation: 'Seoul là thành phố vừa hiện đại vừa truyền thống.', difficulty: 'hard' },
    { id: 'ko-8', text: '한국 음식은 맵지만 정말 맛있어요.', translation: 'Đồ ăn Hàn Quốc cay nhưng rất ngon.', difficulty: 'medium' },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

type GameState = 'idle' | 'playing' | 'finished';

export default function TypingPracticePage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [gameState, setGameState] = useState<GameState>('idle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [results, setResults] = useState<{ wpm: number; accuracy: number; time: number }[]>([]);
  const [charStates, setCharStates] = useState<('correct' | 'incorrect' | 'pending')[]>([]);
  const [showXp, setShowXp] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentExercises = exercises[selectedLang] || exercises['en'];
  const currentExercise = currentExercises[currentIndex];

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, startTime]);

  const startPractice = () => {
    setGameState('playing');
    setCurrentIndex(0);
    setInput('');
    setResults([]);
    setCharStates(currentExercises[0].text.split('').map(() => 'pending'));
    setStartTime(Date.now());
    setElapsed(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInput = useCallback((value: string) => {
    setInput(value);
    const target = currentExercise.text;

    const states: ('correct' | 'incorrect' | 'pending')[] = target.split('').map((char, i) => {
      if (i >= value.length) return 'pending';
      return value[i] === char ? 'correct' : 'incorrect';
    });
    setCharStates(states);

    if (value === target) {
      const timeMs = Math.max(Date.now() - startTime, 1);
      const words = target.split(' ').filter(Boolean).length;
      const wpm = Math.round((words / (timeMs / 1000)) * 60);
      const correctChars = value.split('').filter((c, i) => c === target[i]).length;
      const accuracy = target.length > 0 ? Math.round((correctChars / target.length) * 100) : 0;

      const result = { wpm, accuracy, time: timeMs / 1000 };
      const newResults = [...results, result];
      setResults(newResults);

      const baseXp = accuracy >= 95 ? 15 : accuracy >= 80 ? 10 : 5;
      setXpAmount(baseXp);
      setShowXp(true);

      if (currentIndex < currentExercises.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setInput('');
        setStartTime(Date.now());
        const nextText = currentExercises[currentIndex + 1].text;
        setCharStates(nextText.split('').map(() => 'pending'));
        setTimeout(() => inputRef.current?.focus(), 50);
      } else {
        setGameState('finished');
        if (timerRef.current) clearInterval(timerRef.current);
        if (accuracy >= 90) setShowCelebration(true);
      }
    }
  }, [currentExercise, currentIndex, currentExercises, results, startTime]);

  const avgWpm = results.length > 0 ? Math.round(results.reduce((s, r) => s + r.wpm, 0) / results.length) : 0;
  const avgAccuracy = results.length > 0 ? Math.round(results.reduce((s, r) => s + r.accuracy, 0) / results.length) : 0;

  if (gameState === 'idle') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto space-y-6 pb-8"
      >
        <div>
          <h1 className="text-2xl font-bold font-display">Luyện gõ phím</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Cải thiện tốc độ gõ trong ngôn ngữ bạn đang học</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {languages.map((lang, index) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              onClick={() => setSelectedLang(lang.code)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                selectedLang === lang.code
                  ? 'border-primary bg-primary/5 text-primary font-medium'
                  : 'border-border text-muted-foreground hover:border-primary/30'
              }`}
            >
              <span>{lang.flag}</span>
              <span className="text-sm">{lang.name}</span>
            </motion.button>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 text-center space-y-4">
          <div className="text-5xl">⌨️</div>
          <h2 className="text-lg font-semibold">Sẵn sàng luyện tập?</h2>
          <p className="text-sm text-muted-foreground">
            Gõ lại {currentExercises.length} câu bằng {languages.find(l => l.code === selectedLang)?.name}.
            Tốc độ và độ chính xác sẽ được đo.
          </p>
          <Button onClick={startPractice} className="px-8">Bắt đầu</Button>
        </div>

        <div className="p-4 rounded-xl bg-muted/50 border">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Mẹo:</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Tập trung vào độ chính xác trước, tốc độ sẽ đến sau</li>
            <li>• Nhìn vào văn bản gốc, không nhìn bàn phím</li>
            <li>• Luyện tập đều đặn mỗi ngày để cải thiện</li>
          </ul>
        </div>
      </motion.div>
    );
  }

  if (gameState === 'finished') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto space-y-6 pb-8"
      >
        {showCelebration && <Celebration type="confetti" duration={3000} />}
        <div className="text-center py-6">
          <div className="flex justify-center mb-3">
            {avgAccuracy >= 95 ? <Trophy className="w-12 h-12 text-yellow-500" /> : avgAccuracy >= 80 ? <Star className="w-12 h-12 text-yellow-400" /> : <Dumbbell className="w-12 h-12 text-blue-500" />}
          </div>
          <h1 className="text-2xl font-bold font-display">Hoàn thành!</h1>
          <p className="text-muted-foreground mt-1">Kết quả luyện gõ phím của bạn</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { value: avgWpm, label: 'WPM trung bình', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
            { value: `${avgAccuracy}%`, label: 'Chính xác', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
            { value: results.length, label: 'Câu hoàn thành', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              className={`p-4 rounded-2xl border text-center ${stat.bg}`}
            >
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5">
          <h3 className="font-semibold mb-3">Chi tiết từng câu:</h3>
          <div className="space-y-2">
            {results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.3) }}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
              >
                <span className="text-sm text-muted-foreground truncate flex-1">Câu {i + 1}</span>
                <div className="flex gap-4 text-xs">
                  <span className="text-blue-600 font-medium">{r.wpm} WPM</span>
                  <span className="text-green-600 font-medium">{r.accuracy}%</span>
                  <span className="text-muted-foreground">{r.time.toFixed(1)}s</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button onClick={startPractice}>Luyện lại</Button>
          <Button variant="outline" onClick={() => setGameState('idle')}>Đổi ngôn ngữ</Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto space-y-6 pb-8"
    >
      {showXp && <XpPopup amount={xpAmount} onComplete={() => setShowXp(false)} />}

      {/* Progress header */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Câu {currentIndex + 1}/{currentExercises.length}</span>
        <span className="text-sm font-medium text-muted-foreground">{(elapsed / 1000).toFixed(1)}s</span>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all"
          style={{ width: `${currentExercises.length > 0 ? Math.min((currentIndex / currentExercises.length) * 100, 100) : 0}%` }}
        />
      </div>

      {/* Translation hint */}
      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-300">💡 {currentExercise.translation}</p>
      </div>

      {/* Target text with character highlighting */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5">
        <p className="text-xl leading-relaxed font-mono tracking-wide">
          {currentExercise.text.split('').map((char, i) => (
            <span
              key={i}
              className={`${
                charStates[i] === 'correct' ? 'text-green-600 dark:text-green-400' :
                charStates[i] === 'incorrect' ? 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded' :
                i === input.length ? 'border-b-2 border-primary' :
                'text-muted-foreground'
              }`}
            >
              {char}
            </span>
          ))}
        </p>
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        className="w-full p-4 rounded-xl border-2 border-border bg-card text-lg font-mono focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
        placeholder="Gõ lại câu trên..."
        autoComplete="off"
        spellCheck={false}
      />

      {/* Live stats */}
      {input.length > 0 && (
        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <span>{input.length}/{currentExercise.text.length} ký tự</span>
          <span className="text-green-600">{charStates.filter(s => s === 'correct').length} đúng</span>
          <span className="text-red-500">{charStates.filter(s => s === 'incorrect').length} sai</span>
        </div>
      )}
    </motion.div>
  );
}
