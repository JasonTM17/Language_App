'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Headphones, Volume2, PartyPopper } from 'lucide-react';

interface DictationExercise {
  id: string;
  language: string;
  sentence: string;
  translation: string;
  speed: 'slow' | 'normal';
}

const exercises: Record<string, DictationExercise[]> = {
  en: [
    { id: '1', language: 'en', sentence: 'I would like a glass of water please', translation: 'Tôi muốn một ly nước', speed: 'normal' },
    { id: '2', language: 'en', sentence: 'The weather is very nice today', translation: 'Hôm nay thời tiết rất đẹp', speed: 'normal' },
    { id: '3', language: 'en', sentence: 'Can you speak more slowly', translation: 'Bạn có thể nói chậm hơn không', speed: 'normal' },
    { id: '4', language: 'en', sentence: 'I am learning English every day', translation: 'Tôi đang học tiếng Anh mỗi ngày', speed: 'normal' },
    { id: '5', language: 'en', sentence: 'Where is the nearest hospital', translation: 'Bệnh viện gần nhất ở đâu', speed: 'normal' },
    { id: '6', language: 'en', sentence: 'She has been working here for five years', translation: 'Cô ấy đã làm việc ở đây 5 năm', speed: 'slow' },
    { id: '7', language: 'en', sentence: 'What time does the train leave', translation: 'Tàu khởi hành lúc mấy giờ', speed: 'normal' },
    { id: '8', language: 'en', sentence: 'I need to buy some groceries', translation: 'Tôi cần mua ít đồ tạp hóa', speed: 'normal' },
    { id: '23', language: 'en', sentence: 'Could you please repeat that', translation: 'Bạn có thể nhắc lại được không', speed: 'normal' },
    { id: '24', language: 'en', sentence: 'The restaurant is on the second floor', translation: 'Nhà hàng ở tầng hai', speed: 'normal' },
    { id: '25', language: 'en', sentence: 'I have an appointment at three o clock', translation: 'Tôi có cuộc hẹn lúc 3 giờ', speed: 'normal' },
    { id: '26', language: 'en', sentence: 'How much does this cost', translation: 'Cái này giá bao nhiêu', speed: 'normal' },
  ],
  ja: [
    { id: '9', language: 'ja', sentence: 'おはようございます', translation: 'Chào buổi sáng (lịch sự)', speed: 'slow' },
    { id: '10', language: 'ja', sentence: 'すみません、駅はどこですか', translation: 'Xin lỗi, nhà ga ở đâu?', speed: 'slow' },
    { id: '11', language: 'ja', sentence: '日本語を勉強しています', translation: 'Tôi đang học tiếng Nhật', speed: 'slow' },
    { id: '12', language: 'ja', sentence: 'これはいくらですか', translation: 'Cái này bao nhiêu tiền?', speed: 'slow' },
    { id: '13', language: 'ja', sentence: '明日は何をしますか', translation: 'Ngày mai bạn sẽ làm gì?', speed: 'slow' },
    { id: '27', language: 'ja', sentence: 'お水をください', translation: 'Cho tôi nước', speed: 'slow' },
    { id: '28', language: 'ja', sentence: '私はベトナム人です', translation: 'Tôi là người Việt Nam', speed: 'slow' },
    { id: '29', language: 'ja', sentence: '電車は何時に来ますか', translation: 'Tàu điện mấy giờ đến?', speed: 'slow' },
    { id: '37', language: 'ja', sentence: 'この料理はとてもおいしいです', translation: 'Món ăn này rất ngon', speed: 'slow' },
    { id: '38', language: 'ja', sentence: '趣味は音楽を聞くことです', translation: 'Sở thích của tôi là nghe nhạc', speed: 'slow' },
    { id: '39', language: 'ja', sentence: '週末に友達と映画を見ます', translation: 'Cuối tuần tôi xem phim với bạn', speed: 'slow' },
    { id: '40', language: 'ja', sentence: '日本の桜はとてもきれいです', translation: 'Hoa anh đào Nhật Bản rất đẹp', speed: 'slow' },
  ],
  zh: [
    { id: '14', language: 'zh', sentence: '你好，请问洗手间在哪里', translation: 'Xin chào, xin hỏi nhà vệ sinh ở đâu?', speed: 'slow' },
    { id: '15', language: 'zh', sentence: '我想学中文', translation: 'Tôi muốn học tiếng Trung', speed: 'slow' },
    { id: '16', language: 'zh', sentence: '今天天气很好', translation: 'Hôm nay thời tiết rất đẹp', speed: 'slow' },
    { id: '17', language: 'zh', sentence: '这个多少钱', translation: 'Cái này bao nhiêu tiền?', speed: 'slow' },
    { id: '18', language: 'zh', sentence: '我是越南人', translation: 'Tôi là người Việt Nam', speed: 'slow' },
    { id: '30', language: 'zh', sentence: '请给我一杯咖啡', translation: 'Cho tôi một ly cà phê', speed: 'slow' },
    { id: '31', language: 'zh', sentence: '我住在胡志明市', translation: 'Tôi sống ở TP Hồ Chí Minh', speed: 'slow' },
    { id: '32', language: 'zh', sentence: '明天见', translation: 'Hẹn gặp lại ngày mai', speed: 'slow' },
    { id: '41', language: 'zh', sentence: '这个菜非常好吃', translation: 'Món này rất ngon', speed: 'slow' },
    { id: '42', language: 'zh', sentence: '我的爱好是看电影', translation: 'Sở thích của tôi là xem phim', speed: 'slow' },
    { id: '43', language: 'zh', sentence: '周末我和朋友去逛街', translation: 'Cuối tuần tôi đi dạo phố với bạn', speed: 'slow' },
    { id: '44', language: 'zh', sentence: '中国的长城非常有名', translation: 'Vạn Lý Trường Thành rất nổi tiếng', speed: 'slow' },
  ],
  ko: [
    { id: '19', language: 'ko', sentence: '안녕하세요 만나서 반갑습니다', translation: 'Xin chào, rất vui được gặp bạn', speed: 'slow' },
    { id: '20', language: 'ko', sentence: '한국어를 공부하고 있어요', translation: 'Tôi đang học tiếng Hàn', speed: 'slow' },
    { id: '21', language: 'ko', sentence: '이것은 얼마예요', translation: 'Cái này bao nhiêu tiền?', speed: 'slow' },
    { id: '22', language: 'ko', sentence: '화장실이 어디에 있어요', translation: 'Nhà vệ sinh ở đâu?', speed: 'slow' },
    { id: '33', language: 'ko', sentence: '물 한 잔 주세요', translation: 'Cho tôi một ly nước', speed: 'slow' },
    { id: '34', language: 'ko', sentence: '저는 베트남 사람이에요', translation: 'Tôi là người Việt Nam', speed: 'slow' },
    { id: '35', language: 'ko', sentence: '내일 만나요', translation: 'Hẹn gặp lại ngày mai', speed: 'slow' },
    { id: '36', language: 'ko', sentence: '지하철역이 어디에 있어요', translation: 'Ga tàu điện ngầm ở đâu?', speed: 'slow' },
    { id: '45', language: 'ko', sentence: '이 음식 정말 맛있어요', translation: 'Món ăn này ngon thật', speed: 'slow' },
    { id: '46', language: 'ko', sentence: '취미는 음악 듣기예요', translation: 'Sở thích của tôi là nghe nhạc', speed: 'slow' },
    { id: '47', language: 'ko', sentence: '주말에 친구와 영화를 봐요', translation: 'Cuối tuần tôi xem phim với bạn', speed: 'slow' },
    { id: '48', language: 'ko', sentence: '서울의 경복궁은 아름다워요', translation: 'Cung điện Gyeongbok ở Seoul rất đẹp', speed: 'slow' },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧', speechLang: 'en-US' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', speechLang: 'ja-JP' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', speechLang: 'zh-CN' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', speechLang: 'ko-KR' },
];

export default function DictationPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [playCount, setPlayCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentExercises = exercises[selectedLang] || [];
  const currentExercise = currentExercises[currentIndex];
  const langConfig = languages.find(l => l.code === selectedLang)!;

  const speak = (slow = false) => {
    if (!currentExercise || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentExercise.sentence);
    utterance.lang = langConfig.speechLang;
    utterance.rate = slow ? 0.6 : (currentExercise.speed === 'slow' ? 0.75 : 0.9);
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
    setPlayCount(prev => prev + 1);
  };

  useEffect(() => {
    setPlayCount(0);
    setUserInput('');
    setShowResult(false);
  }, [currentIndex, selectedLang]);

  const checkAnswer = () => {
    if (!currentExercise) return;
    setShowResult(true);
    const normalize = (s: string) => s.toLowerCase().replace(/[.,!?;:'"]/g, '').trim();
    const isCorrect = normalize(userInput) === normalize(currentExercise.sentence);
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const getAccuracy = () => {
    if (!currentExercise) return 0;
    const normalize = (s: string) => s.toLowerCase().replace(/[.,!?;:'"]/g, '').trim();
    const target = normalize(currentExercise.sentence).split(' ');
    const input = normalize(userInput).split(' ');
    let matches = 0;
    target.forEach((word, i) => {
      if (input[i] === word) matches++;
    });
    return Math.round((matches / target.length) * 100);
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
    setUserInput('');
    setPlayCount(0);
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
          <Headphones className="w-12 h-12 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Chưa có bài nghe chép</h3>
        <p className="text-muted-foreground">Chọn ngôn ngữ để bắt đầu.</p>
      </motion.div>
    );
  }

  if (currentIndex >= currentExercises.length) {
    const pct = Math.round((score.correct / score.total) * 100);
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
        <h1 className="text-2xl font-bold font-display">Nghe chép</h1>
        <p className="text-muted-foreground mt-1">Nghe và gõ lại câu bạn nghe được</p>
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

      {/* Audio controls */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 text-center space-y-4">
        <div className="flex justify-center mb-2">
          {isPlaying ? <Volume2 className="w-10 h-10 text-primary" /> : <Headphones className="w-10 h-10 text-muted-foreground" />}
        </div>
        <p className="text-sm text-muted-foreground">Nhấn nút để nghe câu ({playCount} lần đã nghe)</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => speak(false)} disabled={isPlaying} variant="outline">
            ▶ Nghe bình thường
          </Button>
          <Button onClick={() => speak(true)} disabled={isPlaying} variant="outline">
            🐢 Nghe chậm
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Gợi ý: {currentExercise.translation}</p>
      </div>

      {/* Input */}
      <div className="space-y-3">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !showResult && userInput.trim() && checkAnswer()}
          placeholder="Gõ lại câu bạn nghe được..."
          disabled={showResult}
          className="w-full p-4 rounded-xl border-2 border-border bg-card text-lg focus:border-primary focus:outline-none transition-all"
          autoComplete="off"
        />
      </div>

      {/* Result */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`p-4 rounded-xl ${
            getAccuracy() === 100
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <p className={`font-medium ${getAccuracy() === 100 ? 'text-green-700 dark:text-green-300' : 'text-orange-700 dark:text-orange-300'}`}>
              {getAccuracy() === 100 ? '✓ Hoàn hảo!' : `Chính xác: ${getAccuracy()}%`}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Đáp án:</span> {currentExercise.sentence}
          </p>
          {getAccuracy() < 100 && (
            <p className="text-sm text-muted-foreground mt-1">
              <span className="font-medium">Bạn gõ:</span> {userInput}
            </p>
          )}
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
