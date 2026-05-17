'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Puzzle, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';

interface SentenceExercise {
  id: string;
  language: string;
  targetSentence: string;
  translation: string;
  words: string[];
}

const exercises: Record<string, SentenceExercise[]> = {
  en: [
    { id: '1', language: 'en', targetSentence: 'I would like a cup of coffee', translation: 'Tôi muốn một ly cà phê', words: ['I', 'would', 'like', 'a', 'cup', 'of', 'coffee'] },
    { id: '2', language: 'en', targetSentence: 'Where is the train station', translation: 'Nhà ga ở đâu', words: ['Where', 'is', 'the', 'train', 'station'] },
    { id: '3', language: 'en', targetSentence: 'She goes to school every day', translation: 'Cô ấy đi học mỗi ngày', words: ['She', 'goes', 'to', 'school', 'every', 'day'] },
    { id: '4', language: 'en', targetSentence: 'Can you help me please', translation: 'Bạn có thể giúp tôi không', words: ['Can', 'you', 'help', 'me', 'please'] },
    { id: '5', language: 'en', targetSentence: 'I have been studying English for two years', translation: 'Tôi đã học tiếng Anh được hai năm', words: ['I', 'have', 'been', 'studying', 'English', 'for', 'two', 'years'] },
    { id: '15', language: 'en', targetSentence: 'The weather is very nice today', translation: 'Hôm nay thời tiết rất đẹp', words: ['The', 'weather', 'is', 'very', 'nice', 'today'] },
    { id: '16', language: 'en', targetSentence: 'My brother works at a hospital', translation: 'Anh trai tôi làm việc ở bệnh viện', words: ['My', 'brother', 'works', 'at', 'a', 'hospital'] },
    { id: '17', language: 'en', targetSentence: 'We should leave before it rains', translation: 'Chúng ta nên đi trước khi trời mưa', words: ['We', 'should', 'leave', 'before', 'it', 'rains'] },
    { id: '18', language: 'en', targetSentence: 'They have never been to Vietnam', translation: 'Họ chưa bao giờ đến Việt Nam', words: ['They', 'have', 'never', 'been', 'to', 'Vietnam'] },
    { id: '19', language: 'en', targetSentence: 'Could you speak more slowly please', translation: 'Bạn có thể nói chậm hơn không', words: ['Could', 'you', 'speak', 'more', 'slowly', 'please'] },
  ],
  ja: [
    { id: '6', language: 'ja', targetSentence: '私は学生です', translation: 'Tôi là sinh viên', words: ['私は', '学生', 'です'] },
    { id: '7', language: 'ja', targetSentence: '明日東京に行きます', translation: 'Ngày mai tôi đi Tokyo', words: ['明日', '東京に', '行きます'] },
    { id: '8', language: 'ja', targetSentence: 'この本はとても面白いです', translation: 'Cuốn sách này rất thú vị', words: ['この', '本は', 'とても', '面白い', 'です'] },
    { id: '20', language: 'ja', targetSentence: '毎朝コーヒーを飲みます', translation: 'Mỗi sáng tôi uống cà phê', words: ['毎朝', 'コーヒーを', '飲みます'] },
    { id: '21', language: 'ja', targetSentence: '駅まで歩いて十分です', translation: 'Đi bộ đến ga mất 10 phút', words: ['駅まで', '歩いて', '十分', 'です'] },
    { id: '22', language: 'ja', targetSentence: '日本語の勉強は楽しいです', translation: 'Học tiếng Nhật rất vui', words: ['日本語の', '勉強は', '楽しい', 'です'] },
    { id: '23', language: 'ja', targetSentence: '友達と映画を見ました', translation: 'Tôi đã xem phim với bạn', words: ['友達と', '映画を', '見ました'] },
    { id: '24', language: 'ja', targetSentence: '来週の月曜日に会議があります', translation: 'Thứ Hai tuần sau có cuộc họp', words: ['来週の', '月曜日に', '会議が', 'あります'] },
  ],
  zh: [
    { id: '9', language: 'zh', targetSentence: '我是越南人', translation: 'Tôi là người Việt Nam', words: ['我', '是', '越南人'] },
    { id: '10', language: 'zh', targetSentence: '今天天气很好', translation: 'Hôm nay thời tiết rất đẹp', words: ['今天', '天气', '很', '好'] },
    { id: '11', language: 'zh', targetSentence: '我想学中文', translation: 'Tôi muốn học tiếng Trung', words: ['我', '想', '学', '中文'] },
    { id: '25', language: 'zh', targetSentence: '请问洗手间在哪里', translation: 'Xin hỏi nhà vệ sinh ở đâu', words: ['请问', '洗手间', '在', '哪里'] },
    { id: '26', language: 'zh', targetSentence: '我每天坐地铁上班', translation: 'Mỗi ngày tôi đi tàu điện ngầm đi làm', words: ['我', '每天', '坐', '地铁', '上班'] },
    { id: '27', language: 'zh', targetSentence: '她在图书馆看书', translation: 'Cô ấy đọc sách ở thư viện', words: ['她', '在', '图书馆', '看书'] },
    { id: '28', language: 'zh', targetSentence: '这个菜太好吃了', translation: 'Món này ngon quá', words: ['这个', '菜', '太', '好吃', '了'] },
    { id: '29', language: 'zh', targetSentence: '我已经学了三年中文', translation: 'Tôi đã học tiếng Trung 3 năm rồi', words: ['我', '已经', '学了', '三年', '中文'] },
  ],
  ko: [
    { id: '12', language: 'ko', targetSentence: '저는 베트남 사람입니다', translation: 'Tôi là người Việt Nam', words: ['저는', '베트남', '사람입니다'] },
    { id: '13', language: 'ko', targetSentence: '한국어를 공부하고 있어요', translation: 'Tôi đang học tiếng Hàn', words: ['한국어를', '공부하고', '있어요'] },
    { id: '14', language: 'ko', targetSentence: '오늘 날씨가 좋아요', translation: 'Hôm nay thời tiết đẹp', words: ['오늘', '날씨가', '좋아요'] },
    { id: '30', language: 'ko', targetSentence: '커피 한 잔 주세요', translation: 'Cho tôi một ly cà phê', words: ['커피', '한 잔', '주세요'] },
    { id: '31', language: 'ko', targetSentence: '지하철역이 어디에 있어요', translation: 'Ga tàu điện ngầm ở đâu', words: ['지하철역이', '어디에', '있어요'] },
    { id: '32', language: 'ko', targetSentence: '매일 아침 운동을 해요', translation: 'Mỗi sáng tôi tập thể dục', words: ['매일', '아침', '운동을', '해요'] },
    { id: '33', language: 'ko', targetSentence: '주말에 친구를 만날 거예요', translation: 'Cuối tuần tôi sẽ gặp bạn', words: ['주말에', '친구를', '만날', '거예요'] },
    { id: '34', language: 'ko', targetSentence: '이 음식이 정말 맛있어요', translation: 'Món ăn này thật sự ngon', words: ['이', '음식이', '정말', '맛있어요'] },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function SentencePage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const currentExercises = exercises[selectedLang] || [];
  const currentExercise = currentExercises[currentIndex];

  useEffect(() => {
    if (currentExercise) {
      const shuffled = [...currentExercise.words].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setSelectedWords([]);
      setShowResult(false);
    }
  }, [currentIndex, selectedLang]);

  const selectWord = (word: string, index: number) => {
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
  };

  const removeWord = (word: string, index: number) => {
    setAvailableWords(prev => [...prev, word]);
    setSelectedWords(prev => prev.filter((_, i) => i !== index));
  };

  const checkAnswer = () => {
    const userSentence = selectedWords.join(' ');
    const correct = userSentence === currentExercise.targetSentence;
    setIsCorrect(correct);
    setShowResult(true);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
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
    setShowResult(false);
    setSelectedWords([]);
  };

  if (!currentExercise) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-4">
          <Puzzle className="w-12 h-12 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Chưa có bài tập</h3>
        <p className="text-muted-foreground">Chọn ngôn ngữ để bắt đầu.</p>
      </div>
    );
  }

  if (currentIndex >= currentExercises.length) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="flex justify-center mb-4">
          <PartyPopper className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Hoàn thành!</h2>
        <p className="text-lg mb-6">Điểm: {score.correct}/{score.total}</p>
        <Button onClick={resetAll}>Làm lại</Button>
      </div>
    );
  }

  return (
    <motion.div className="max-w-2xl mx-auto space-y-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div>
        <h1 className="text-2xl font-bold font-display">Sắp xếp câu</h1>
        <p className="text-muted-foreground mt-1">Sắp xếp các từ thành câu hoàn chỉnh</p>
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
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(currentIndex / currentExercises.length) * 100}%` }} />
      </div>

      {/* Translation prompt */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5">
        <p className="text-sm text-muted-foreground mb-1">Dịch câu sau:</p>
        <p className="text-lg font-medium">{currentExercise.translation}</p>
      </div>

      {/* Selected words (answer area) */}
      <div className="min-h-[60px] p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-muted/50 flex flex-wrap gap-2 items-center">
        {selectedWords.length === 0 && (
          <p className="text-sm text-muted-foreground">Nhấn vào các từ bên dưới để sắp xếp câu</p>
        )}
        {selectedWords.map((word, i) => (
          <button
            key={`selected-${i}`}
            onClick={() => !showResult && removeWord(word, i)}
            disabled={showResult}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              showResult
                ? isCorrect
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300'
                : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-300 hover:bg-primary-200'
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Available words */}
      <div className="flex flex-wrap gap-2 justify-center">
        {availableWords.map((word, i) => (
          <button
            key={`available-${i}`}
            onClick={() => !showResult && selectWord(word, i)}
            disabled={showResult}
            className="px-4 py-2 rounded-lg bg-card border-2 border-border text-sm font-medium hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Result feedback */}
      {showResult && (
        <div className={`p-4 rounded-xl ${
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
            : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
        }`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {isCorrect ? '✓ Chính xác!' : '✗ Chưa đúng'}
          </p>
          {!isCorrect && (
            <p className="text-sm text-muted-foreground mt-1">
              Đáp án: {currentExercise.targetSentence}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        {!showResult ? (
          <Button
            onClick={checkAnswer}
            disabled={selectedWords.length === 0}
            className="ml-auto"
          >
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
