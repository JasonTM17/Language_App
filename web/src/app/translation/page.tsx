'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Globe, PartyPopper } from 'lucide-react';

interface TranslationExercise {
  id: string;
  language: string;
  sourceText: string;
  targetText: string;
  direction: 'to-foreign' | 'to-vietnamese';
  hints: string[];
}

const exercises: Record<string, TranslationExercise[]> = {
  en: [
    { id: '1', language: 'en', sourceText: 'Tôi rất vui được gặp bạn', targetText: 'I am very happy to meet you', direction: 'to-foreign', hints: ['happy', 'meet'] },
    { id: '2', language: 'en', sourceText: 'I go to school every morning', targetText: 'Tôi đi học mỗi sáng', direction: 'to-vietnamese', hints: ['đi học', 'mỗi sáng'] },
    { id: '3', language: 'en', sourceText: 'Bạn có thể giúp tôi không?', targetText: 'Can you help me?', direction: 'to-foreign', hints: ['can', 'help'] },
    { id: '4', language: 'en', sourceText: 'The food here is delicious', targetText: 'Đồ ăn ở đây rất ngon', direction: 'to-vietnamese', hints: ['đồ ăn', 'ngon'] },
    { id: '5', language: 'en', sourceText: 'Tôi đang học tiếng Anh', targetText: 'I am learning English', direction: 'to-foreign', hints: ['learning', 'English'] },
    { id: '6', language: 'en', sourceText: 'Where do you live?', targetText: 'Bạn sống ở đâu?', direction: 'to-vietnamese', hints: ['sống', 'ở đâu'] },
    { id: '7', language: 'en', sourceText: 'Hôm nay thời tiết rất đẹp', targetText: 'Today the weather is very nice', direction: 'to-foreign', hints: ['weather', 'nice'] },
    { id: '8', language: 'en', sourceText: 'I have two brothers and one sister', targetText: 'Tôi có hai anh trai và một chị gái', direction: 'to-vietnamese', hints: ['anh trai', 'chị gái'] },
  ],
  ja: [
    { id: '9', language: 'ja', sourceText: 'Tôi là sinh viên', targetText: '私は学生です', direction: 'to-foreign', hints: ['私は', '学生'] },
    { id: '10', language: 'ja', sourceText: '日本語を勉強しています', targetText: 'Tôi đang học tiếng Nhật', direction: 'to-vietnamese', hints: ['học', 'tiếng Nhật'] },
    { id: '11', language: 'ja', sourceText: 'Cái này bao nhiêu tiền?', targetText: 'これはいくらですか', direction: 'to-foreign', hints: ['これは', 'いくら'] },
    { id: '12', language: 'ja', sourceText: '明日東京に行きます', targetText: 'Ngày mai tôi đi Tokyo', direction: 'to-vietnamese', hints: ['ngày mai', 'đi'] },
    { id: '21', language: 'ja', sourceText: 'Nhà ga ở đâu?', targetText: '駅はどこですか', direction: 'to-foreign', hints: ['駅', 'どこ'] },
    { id: '22', language: 'ja', sourceText: 'この料理はとてもおいしいです', targetText: 'Món ăn này rất ngon', direction: 'to-vietnamese', hints: ['món ăn', 'ngon'] },
    { id: '23', language: 'ja', sourceText: 'Tôi thích đọc sách', targetText: '私は本を読むのが好きです', direction: 'to-foreign', hints: ['本', '好き'] },
    { id: '24', language: 'ja', sourceText: '毎日三十分運動しています', targetText: 'Tôi tập thể dục 30 phút mỗi ngày', direction: 'to-vietnamese', hints: ['tập thể dục', 'mỗi ngày'] },
  ],
  zh: [
    { id: '13', language: 'zh', sourceText: 'Tôi là người Việt Nam', targetText: '我是越南人', direction: 'to-foreign', hints: ['我', '越南人'] },
    { id: '14', language: 'zh', sourceText: '你好，你叫什么名字', targetText: 'Xin chào, bạn tên gì?', direction: 'to-vietnamese', hints: ['xin chào', 'tên'] },
    { id: '15', language: 'zh', sourceText: 'Tôi muốn uống cà phê', targetText: '我想喝咖啡', direction: 'to-foreign', hints: ['想', '咖啡'] },
    { id: '16', language: 'zh', sourceText: '今天天气很好', targetText: 'Hôm nay thời tiết rất đẹp', direction: 'to-vietnamese', hints: ['thời tiết', 'đẹp'] },
    { id: '25', language: 'zh', sourceText: 'Nhà vệ sinh ở đâu?', targetText: '洗手间在哪里', direction: 'to-foreign', hints: ['洗手间', '哪里'] },
    { id: '26', language: 'zh', sourceText: '我在学校学了三年中文', targetText: 'Tôi học tiếng Trung ở trường 3 năm', direction: 'to-vietnamese', hints: ['học', 'tiếng Trung'] },
    { id: '27', language: 'zh', sourceText: 'Tôi rất thích ẩm thực Trung Quốc', targetText: '我很喜欢中国菜', direction: 'to-foreign', hints: ['喜欢', '中国菜'] },
    { id: '28', language: 'zh', sourceText: '请问这个多少钱', targetText: 'Xin hỏi cái này bao nhiêu tiền?', direction: 'to-vietnamese', hints: ['bao nhiêu', 'tiền'] },
  ],
  ko: [
    { id: '17', language: 'ko', sourceText: 'Tôi là người Việt Nam', targetText: '저는 베트남 사람입니다', direction: 'to-foreign', hints: ['저는', '사람입니다'] },
    { id: '18', language: 'ko', sourceText: '한국어를 공부하고 있어요', targetText: 'Tôi đang học tiếng Hàn', direction: 'to-vietnamese', hints: ['học', 'tiếng Hàn'] },
    { id: '19', language: 'ko', sourceText: 'Hôm nay thời tiết đẹp', targetText: '오늘 날씨가 좋아요', direction: 'to-foreign', hints: ['오늘', '좋아요'] },
    { id: '20', language: 'ko', sourceText: '이것은 얼마예요', targetText: 'Cái này bao nhiêu tiền?', direction: 'to-vietnamese', hints: ['bao nhiêu', 'tiền'] },
    { id: '29', language: 'ko', sourceText: 'Tôi thích ẩm thực Hàn Quốc', targetText: '저는 한국 음식을 좋아해요', direction: 'to-foreign', hints: ['한국 음식', '좋아해요'] },
    { id: '30', language: 'ko', sourceText: '지하철역이 어디에 있어요', targetText: 'Ga tàu điện ngầm ở đâu?', direction: 'to-vietnamese', hints: ['ga tàu điện ngầm', 'ở đâu'] },
    { id: '31', language: 'ko', sourceText: 'Cho tôi một ly cà phê', targetText: '커피 한 잔 주세요', direction: 'to-foreign', hints: ['커피', '주세요'] },
    { id: '32', language: 'ko', sourceText: '매일 삼십 분 운동해요', targetText: 'Tôi tập thể dục 30 phút mỗi ngày', direction: 'to-vietnamese', hints: ['tập thể dục', 'mỗi ngày'] },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function TranslationPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const currentExercises = exercises[selectedLang] || [];
  const currentExercise = currentExercises[currentIndex];

  const normalize = (s: string) => s.toLowerCase().replace(/[.,!?;:'"。？！、]/g, '').trim();

  const checkAnswer = () => {
    if (!currentExercise) return;
    setShowResult(true);
    const isCorrect = normalize(userInput) === normalize(currentExercise.targetText);
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const getSimilarity = () => {
    if (!currentExercise) return 0;
    const target = normalize(currentExercise.targetText).split(/\s+/);
    const input = normalize(userInput).split(/\s+/);
    let matches = 0;
    target.forEach(word => {
      if (input.includes(word)) matches++;
    });
    return Math.round((matches / target.length) * 100);
  };

  const nextExercise = () => {
    if (currentIndex < currentExercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
      setShowResult(false);
      setShowHint(false);
    }
  };

  const resetAll = () => {
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setShowResult(false);
    setUserInput('');
    setShowHint(false);
  };

  if (!currentExercise) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center py-16"
      >
        <div className="flex justify-center mb-4">
          <Globe className="w-12 h-12 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Chưa có bài dịch</h3>
        <p className="text-muted-foreground">Chọn ngôn ngữ để bắt đầu.</p>
      </motion.div>
    );
  }

  if (currentIndex >= currentExercises.length) {
    const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
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
        <h1 className="text-2xl font-bold font-display">Dịch câu</h1>
        <p className="text-muted-foreground mt-1">Dịch câu sang ngôn ngữ đích</p>
      </div>

      {/* Language selector */}
      <div className="flex gap-2 flex-wrap">
        {languages.map((lang, index) => (
          <motion.button
            key={lang.code}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index * 0.05, 0.3) }}
            onClick={() => { setSelectedLang(lang.code); resetAll(); }}
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

      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Câu {currentIndex + 1} / {currentExercises.length}</span>
        <span className="font-medium text-green-600">{score.correct} đúng</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(currentIndex / currentExercises.length) * 100}%` }} />
      </div>

      {/* Source sentence */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
            {currentExercise.direction === 'to-foreign' ? 'Việt → Ngoại ngữ' : 'Ngoại ngữ → Việt'}
          </span>
        </div>
        <p className="text-xl font-medium">{currentExercise.sourceText}</p>
        {showHint && (
          <p className="text-sm text-muted-foreground mt-3">
            Gợi ý: {currentExercise.hints.join(', ')}
          </p>
        )}
      </div>

      {/* Input */}
      <div className="space-y-2">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={currentExercise.direction === 'to-foreign' ? 'Gõ bản dịch ngoại ngữ...' : 'Gõ bản dịch tiếng Việt...'}
          disabled={showResult}
          rows={3}
          className="w-full p-4 rounded-xl border-2 border-border bg-card text-lg focus:border-primary focus:outline-none transition-all resize-none"
        />
        {!showResult && !showHint && (
          <button onClick={() => setShowHint(true)} className="text-xs text-primary hover:underline">
            Xem gợi ý
          </button>
        )}
      </div>

      {/* Result */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`p-4 rounded-xl ${
            normalize(userInput) === normalize(currentExercise.targetText)
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'
          }`}
        >
          <p className={`font-medium ${
            normalize(userInput) === normalize(currentExercise.targetText)
              ? 'text-green-700 dark:text-green-300'
              : 'text-orange-700 dark:text-orange-300'
          }`}>
            {normalize(userInput) === normalize(currentExercise.targetText)
              ? '✓ Chính xác!'
              : `Tương đồng: ${getSimilarity()}%`}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            <span className="font-medium">Đáp án:</span> {currentExercise.targetText}
          </p>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        {!showResult ? (
          <Button onClick={checkAnswer} disabled={!userInput.trim()} className="ml-auto">
            Kiểm tra
          </Button>
        ) : (
          <Button onClick={nextExercise} className="ml-auto">
            {currentIndex < currentExercises.length - 1 ? 'Câu tiếp →' : 'Xem kết quả'}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
