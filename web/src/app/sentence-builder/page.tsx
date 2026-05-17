'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Blocks, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';

interface SentenceExercise {
  id: string;
  words: string[];
  correctOrder: string[];
  translation: string;
  language: string;
}

const exercises: Record<string, SentenceExercise[]> = {
  en: [
    { id: '1', words: ['school', 'I', 'to', 'go', 'every', 'day'], correctOrder: ['I', 'go', 'to', 'school', 'every', 'day'], translation: 'Tôi đi học mỗi ngày.', language: 'en' },
    { id: '2', words: ['is', 'she', 'beautiful', 'very'], correctOrder: ['she', 'is', 'very', 'beautiful'], translation: 'Cô ấy rất đẹp.', language: 'en' },
    { id: '3', words: ['like', 'I', 'coffee', 'don\'t'], correctOrder: ['I', 'don\'t', 'like', 'coffee'], translation: 'Tôi không thích cà phê.', language: 'en' },
    { id: '4', words: ['are', 'where', 'you', 'from', '?'], correctOrder: ['where', 'are', 'you', 'from', '?'], translation: 'Bạn đến từ đâu?', language: 'en' },
    { id: '5', words: ['yesterday', 'went', 'I', 'the', 'to', 'park'], correctOrder: ['I', 'went', 'to', 'the', 'park', 'yesterday'], translation: 'Hôm qua tôi đã đi công viên.', language: 'en' },
    { id: '6', words: ['can', 'you', 'speak', 'English', '?'], correctOrder: ['can', 'you', 'speak', 'English', '?'], translation: 'Bạn có thể nói tiếng Anh không?', language: 'en' },
    { id: '7', words: ['reading', 'she', 'is', 'a', 'book'], correctOrder: ['she', 'is', 'reading', 'a', 'book'], translation: 'Cô ấy đang đọc sách.', language: 'en' },
    { id: '8', words: ['have', 'I', 'two', 'brothers'], correctOrder: ['I', 'have', 'two', 'brothers'], translation: 'Tôi có hai anh em trai.', language: 'en' },
    { id: '9', words: ['will', 'we', 'tomorrow', 'meet'], correctOrder: ['we', 'will', 'meet', 'tomorrow'], translation: 'Chúng ta sẽ gặp nhau ngày mai.', language: 'en' },
    { id: '10', words: ['been', 'has', 'he', 'to', 'Japan'], correctOrder: ['he', 'has', 'been', 'to', 'Japan'], translation: 'Anh ấy đã từng đến Nhật.', language: 'en' },
    { id: '11', words: ['should', 'you', 'more', 'study'], correctOrder: ['you', 'should', 'study', 'more'], translation: 'Bạn nên học nhiều hơn.', language: 'en' },
    { id: '12', words: ['raining', 'it', 'is', 'outside'], correctOrder: ['it', 'is', 'raining', 'outside'], translation: 'Trời đang mưa bên ngoài.', language: 'en' },
  ],
  ja: [
    { id: '1', words: ['です', '学生', '私は'], correctOrder: ['私は', '学生', 'です'], translation: 'Tôi là học sinh.', language: 'ja' },
    { id: '2', words: ['食べます', 'を', 'ご飯', '毎日'], correctOrder: ['毎日', 'ご飯', 'を', '食べます'], translation: 'Mỗi ngày tôi ăn cơm.', language: 'ja' },
    { id: '3', words: ['行きます', 'に', '学校', '私は'], correctOrder: ['私は', '学校', 'に', '行きます'], translation: 'Tôi đi đến trường.', language: 'ja' },
    { id: '4', words: ['好きです', 'が', '日本語', '私は'], correctOrder: ['私は', '日本語', 'が', '好きです'], translation: 'Tôi thích tiếng Nhật.', language: 'ja' },
    { id: '5', words: ['か', 'です', '何', 'これは'], correctOrder: ['これは', '何', 'です', 'か'], translation: 'Đây là cái gì?', language: 'ja' },
    { id: '6', words: ['飲みます', 'を', 'コーヒー', '朝'], correctOrder: ['朝', 'コーヒー', 'を', '飲みます'], translation: 'Buổi sáng tôi uống cà phê.', language: 'ja' },
    { id: '7', words: ['います', 'に', '猫が', '部屋'], correctOrder: ['部屋', 'に', '猫が', 'います'], translation: 'Trong phòng có con mèo.', language: 'ja' },
    { id: '8', words: ['買いたい', 'を', '本', 'この'], correctOrder: ['この', '本', 'を', '買いたい'], translation: 'Tôi muốn mua cuốn sách này.', language: 'ja' },
    { id: '9', words: ['見ました', 'を', '映画', '昨日'], correctOrder: ['昨日', '映画', 'を', '見ました'], translation: 'Hôm qua tôi đã xem phim.', language: 'ja' },
    { id: '10', words: ['高い', 'は', 'この', 'です', 'ビル'], correctOrder: ['この', 'ビル', 'は', '高い', 'です'], translation: 'Tòa nhà này cao.', language: 'ja' },
    { id: '11', words: ['住んでいます', 'に', '東京', '私は'], correctOrder: ['私は', '東京', 'に', '住んでいます'], translation: 'Tôi sống ở Tokyo.', language: 'ja' },
    { id: '12', words: ['来ます', 'から', '友達が', '明日'], correctOrder: ['明日', '友達が', '来ます'], translation: 'Ngày mai bạn tôi sẽ đến.', language: 'ja' },
  ],
  zh: [
    { id: '1', words: ['学生', '我', '是'], correctOrder: ['我', '是', '学生'], translation: 'Tôi là học sinh.', language: 'zh' },
    { id: '2', words: ['吃饭', '每天', '我'], correctOrder: ['我', '每天', '吃饭'], translation: 'Mỗi ngày tôi ăn cơm.', language: 'zh' },
    { id: '3', words: ['去', '学校', '我'], correctOrder: ['我', '去', '学校'], translation: 'Tôi đi đến trường.', language: 'zh' },
    { id: '4', words: ['中文', '喜欢', '我', '学'], correctOrder: ['我', '喜欢', '学', '中文'], translation: 'Tôi thích học tiếng Trung.', language: 'zh' },
    { id: '5', words: ['什么', '是', '这', '？'], correctOrder: ['这', '是', '什么', '？'], translation: 'Đây là cái gì?', language: 'zh' },
    { id: '6', words: ['咖啡', '想', '喝', '我'], correctOrder: ['我', '想', '喝', '咖啡'], translation: 'Tôi muốn uống cà phê.', language: 'zh' },
    { id: '7', words: ['很', '今天', '冷', '天气'], correctOrder: ['今天', '天气', '很', '冷'], translation: 'Hôm nay thời tiết rất lạnh.', language: 'zh' },
    { id: '8', words: ['在', '他', '看书', '图书馆'], correctOrder: ['他', '在', '图书馆', '看书'], translation: 'Anh ấy đọc sách ở thư viện.', language: 'zh' },
    { id: '9', words: ['买', '想', '我', '手机', '新'], correctOrder: ['我', '想', '买', '新', '手机'], translation: 'Tôi muốn mua điện thoại mới.', language: 'zh' },
    { id: '10', words: ['漂亮', '很', '她', '长得'], correctOrder: ['她', '长得', '很', '漂亮'], translation: 'Cô ấy rất đẹp.', language: 'zh' },
    { id: '11', words: ['坐', '地铁', '上班', '我'], correctOrder: ['我', '坐', '地铁', '上班'], translation: 'Tôi đi tàu điện ngầm đi làm.', language: 'zh' },
    { id: '12', words: ['了', '吃', '我', '早饭', '已经'], correctOrder: ['我', '已经', '吃', '了', '早饭'], translation: 'Tôi đã ăn sáng rồi.', language: 'zh' },
  ],
  ko: [
    { id: '1', words: ['학생이에요', '저는'], correctOrder: ['저는', '학생이에요'], translation: 'Tôi là học sinh.', language: 'ko' },
    { id: '2', words: ['먹어요', '밥을', '매일'], correctOrder: ['매일', '밥을', '먹어요'], translation: 'Mỗi ngày tôi ăn cơm.', language: 'ko' },
    { id: '3', words: ['가요', '학교에', '저는'], correctOrder: ['저는', '학교에', '가요'], translation: 'Tôi đi đến trường.', language: 'ko' },
    { id: '4', words: ['좋아해요', '한국어를', '저는'], correctOrder: ['저는', '한국어를', '좋아해요'], translation: 'Tôi thích tiếng Hàn.', language: 'ko' },
    { id: '5', words: ['뭐예요', '이것은', '?'], correctOrder: ['이것은', '뭐예요', '?'], translation: 'Đây là cái gì?', language: 'ko' },
    { id: '6', words: ['마셔요', '커피를', '아침에'], correctOrder: ['아침에', '커피를', '마셔요'], translation: 'Buổi sáng tôi uống cà phê.', language: 'ko' },
    { id: '7', words: ['있어요', '고양이가', '방에'], correctOrder: ['방에', '고양이가', '있어요'], translation: 'Trong phòng có con mèo.', language: 'ko' },
    { id: '8', words: ['사고', '이', '싶어요', '책을'], correctOrder: ['이', '책을', '사고', '싶어요'], translation: 'Tôi muốn mua cuốn sách này.', language: 'ko' },
    { id: '9', words: ['봤어요', '어제', '영화를'], correctOrder: ['어제', '영화를', '봤어요'], translation: 'Hôm qua tôi đã xem phim.', language: 'ko' },
    { id: '10', words: ['살아요', '서울에', '저는'], correctOrder: ['저는', '서울에', '살아요'], translation: 'Tôi sống ở Seoul.', language: 'ko' },
    { id: '11', words: ['타요', '지하철을', '출근할 때'], correctOrder: ['출근할 때', '지하철을', '타요'], translation: 'Khi đi làm tôi đi tàu điện ngầm.', language: 'ko' },
    { id: '12', words: ['와요', '내일', '친구가'], correctOrder: ['내일', '친구가', '와요'], translation: 'Ngày mai bạn tôi sẽ đến.', language: 'ko' },
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

export default function SentenceBuilderPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const currentExercises = exercises[selectedLang] || [];
  const currentExercise = currentExercises[currentIndex];

  useEffect(() => {
    if (currentExercise) {
      setAvailableWords(shuffle(currentExercise.words));
      setSelectedWords([]);
      setShowResult(false);
    }
  }, [currentIndex, selectedLang]);

  const selectWord = (word: string, idx: number) => {
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== idx));
  };

  const removeWord = (idx: number) => {
    const word = selectedWords[idx];
    setSelectedWords(prev => prev.filter((_, i) => i !== idx));
    setAvailableWords(prev => [...prev, word]);
  };

  const checkAnswer = () => {
    if (!currentExercise) return;
    setShowResult(true);
    const isCorrect = selectedWords.join(' ') === currentExercise.correctOrder.join(' ');
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
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
  };

  if (!currentExercise) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-4">
          <Blocks className="w-12 h-12 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Chưa có bài tập</h3>
        <p className="text-muted-foreground">Chọn ngôn ngữ để bắt đầu.</p>
      </div>
    );
  }

  if (currentIndex >= currentExercises.length) {
    const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="flex justify-center mb-4">
          <PartyPopper className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Hoàn thành!</h2>
        <p className="text-3xl font-bold text-primary mb-2">{pct}%</p>
        <p className="text-muted-foreground mb-6">{score.correct}/{score.total} câu đúng</p>
        <Button onClick={resetAll}>Làm lại</Button>
      </div>
    );
  }

  const isCorrect = selectedWords.join(' ') === currentExercise.correctOrder.join(' ');

  return (
    <motion.div className="max-w-2xl mx-auto space-y-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div>
        <h1 className="text-2xl font-bold font-display">Xây dựng câu</h1>
        <p className="text-muted-foreground mt-1">Sắp xếp từ thành câu hoàn chỉnh</p>
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
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${currentExercises.length > 0 ? Math.min((currentIndex / currentExercises.length) * 100, 100) : 0}%` }} />
      </div>

      {/* Translation hint */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <span className="font-medium">Dịch:</span> {currentExercise.translation}
        </p>
      </div>

      {/* Selected words (answer area) */}
      <div className="min-h-[60px] p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-wrap gap-2">
        {selectedWords.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nhấn vào từ bên dưới để xây dựng câu...</p>
        ) : (
          selectedWords.map((word, idx) => (
            <button
              key={idx}
              onClick={() => !showResult && removeWord(idx)}
              disabled={showResult}
              className="px-3 py-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium border border-primary/20 hover:bg-primary-200 transition-all"
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Available words */}
      <div className="flex flex-wrap gap-2 justify-center">
        {availableWords.map((word, idx) => (
          <button
            key={idx}
            onClick={() => !showResult && selectWord(word, idx)}
            disabled={showResult}
            className="px-4 py-2 rounded-lg bg-card border-2 border-border text-sm font-medium hover:border-primary-300 hover:bg-primary-50 transition-all"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Result */}
      {showResult && (
        <div className={`p-4 rounded-xl text-center ${
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200'
            : 'bg-red-50 dark:bg-red-900/20 border border-red-200'
        }`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? '✓ Chính xác!' : '✗ Chưa đúng'}
          </p>
          {!isCorrect && (
            <p className="text-sm text-muted-foreground mt-1">Đáp án: {currentExercise.correctOrder.join(' ')}</p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        {!showResult ? (
          <Button onClick={checkAnswer} disabled={selectedWords.length === 0}>Kiểm tra</Button>
        ) : (
          <Button onClick={nextExercise}>
            {currentIndex < currentExercises.length - 1 ? 'Câu tiếp →' : 'Xem kết quả'}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
