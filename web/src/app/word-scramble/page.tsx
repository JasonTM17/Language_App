'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ScrambleWord {
  word: string;
  meaning: string;
  hint: string;
}

const wordSets: Record<string, ScrambleWord[]> = {
  en: [
    { word: 'HELLO', meaning: 'xin chào', hint: 'Lời chào phổ biến nhất' },
    { word: 'WATER', meaning: 'nước', hint: 'Chất lỏng uống hàng ngày' },
    { word: 'SCHOOL', meaning: 'trường học', hint: 'Nơi học sinh đến mỗi ngày' },
    { word: 'FRIEND', meaning: 'bạn bè', hint: 'Người thân thiết với bạn' },
    { word: 'FAMILY', meaning: 'gia đình', hint: 'Bố mẹ và con cái' },
    { word: 'HAPPY', meaning: 'vui vẻ', hint: 'Cảm xúc tích cực' },
    { word: 'TRAVEL', meaning: 'du lịch', hint: 'Đi đến nơi mới' },
    { word: 'MORNING', meaning: 'buổi sáng', hint: 'Thời gian đầu ngày' },
    { word: 'DINNER', meaning: 'bữa tối', hint: 'Bữa ăn cuối ngày' },
    { word: 'BEAUTIFUL', meaning: 'đẹp', hint: 'Tính từ khen ngợi ngoại hình' },
    { word: 'TEACHER', meaning: 'giáo viên', hint: 'Người dạy học' },
    { word: 'HOSPITAL', meaning: 'bệnh viện', hint: 'Nơi chữa bệnh' },
    { word: 'LIBRARY', meaning: 'thư viện', hint: 'Nơi mượn sách' },
    { word: 'WEATHER', meaning: 'thời tiết', hint: 'Nắng, mưa, gió...' },
    { word: 'KITCHEN', meaning: 'nhà bếp', hint: 'Nơi nấu ăn trong nhà' },
    { word: 'AIRPORT', meaning: 'sân bay', hint: 'Nơi máy bay cất cánh' },
    { word: 'BIRTHDAY', meaning: 'sinh nhật', hint: 'Ngày bạn được sinh ra' },
    { word: 'COMPUTER', meaning: 'máy tính', hint: 'Thiết bị điện tử để làm việc' },
    { word: 'LANGUAGE', meaning: 'ngôn ngữ', hint: 'Tiếng Anh, tiếng Việt...' },
    { word: 'EXERCISE', meaning: 'tập thể dục', hint: 'Hoạt động rèn luyện sức khỏe' },
  ],
  ja: [
    { word: 'さくら', meaning: 'hoa anh đào', hint: 'Hoa biểu tượng Nhật Bản' },
    { word: 'ともだち', meaning: 'bạn bè', hint: 'Người thân thiết' },
    { word: 'がっこう', meaning: 'trường học', hint: 'Nơi học tập' },
    { word: 'せんせい', meaning: 'giáo viên', hint: 'Người dạy học' },
    { word: 'おはよう', meaning: 'chào buổi sáng', hint: 'Lời chào buổi sáng' },
    { word: 'ありがとう', meaning: 'cảm ơn', hint: 'Lời cảm ơn' },
    { word: 'たべもの', meaning: 'đồ ăn', hint: 'Thứ để ăn' },
    { word: 'でんしゃ', meaning: 'tàu điện', hint: 'Phương tiện giao thông' },
    { word: 'びょういん', meaning: 'bệnh viện', hint: 'Nơi chữa bệnh' },
    { word: 'としょかん', meaning: 'thư viện', hint: 'Nơi mượn sách' },
    { word: 'しんぶん', meaning: 'báo', hint: 'Đọc tin tức hàng ngày' },
    { word: 'くうこう', meaning: 'sân bay', hint: 'Nơi máy bay cất cánh' },
    { word: 'えいが', meaning: 'phim', hint: 'Xem ở rạp' },
    { word: 'おんがく', meaning: 'âm nhạc', hint: 'Nghe bằng tai' },
    { word: 'りょこう', meaning: 'du lịch', hint: 'Đi đến nơi mới' },
    { word: 'かぞく', meaning: 'gia đình', hint: 'Bố mẹ và con cái' },
    { word: 'しごと', meaning: 'công việc', hint: 'Làm mỗi ngày để kiếm tiền' },
    { word: 'たんじょうび', meaning: 'sinh nhật', hint: 'Ngày bạn được sinh ra' },
    { word: 'うんどう', meaning: 'tập thể dục', hint: 'Hoạt động rèn luyện sức khỏe' },
    { word: 'コンピューター', meaning: 'máy tính', hint: 'Thiết bị điện tử' },
  ],
  zh: [
    { word: '你好', meaning: 'xin chào', hint: 'Lời chào cơ bản' },
    { word: '谢谢', meaning: 'cảm ơn', hint: 'Lời cảm ơn' },
    { word: '学校', meaning: 'trường học', hint: 'Nơi học tập' },
    { word: '朋友', meaning: 'bạn bè', hint: 'Người thân thiết' },
    { word: '家人', meaning: 'gia đình', hint: 'Người thân' },
    { word: '老师', meaning: 'giáo viên', hint: 'Người dạy học' },
    { word: '医院', meaning: 'bệnh viện', hint: 'Nơi chữa bệnh' },
    { word: '电影', meaning: 'phim', hint: 'Xem ở rạp' },
    { word: '图书馆', meaning: 'thư viện', hint: 'Nơi mượn sách' },
    { word: '超市', meaning: 'siêu thị', hint: 'Nơi mua sắm hàng ngày' },
    { word: '天气', meaning: 'thời tiết', hint: 'Nắng, mưa, gió...' },
    { word: '飞机', meaning: 'máy bay', hint: 'Phương tiện bay trên trời' },
    { word: '音乐', meaning: 'âm nhạc', hint: 'Nghe bằng tai' },
    { word: '旅行', meaning: 'du lịch', hint: 'Đi đến nơi mới' },
    { word: '电脑', meaning: 'máy tính', hint: 'Thiết bị điện tử' },
    { word: '生日', meaning: 'sinh nhật', hint: 'Ngày bạn được sinh ra' },
    { word: '工作', meaning: 'công việc', hint: 'Làm mỗi ngày để kiếm tiền' },
    { word: '运动', meaning: 'tập thể dục', hint: 'Hoạt động rèn luyện sức khỏe' },
    { word: '地铁', meaning: 'tàu điện ngầm', hint: 'Phương tiện dưới đất' },
    { word: '市场', meaning: 'chợ', hint: 'Nơi mua bán' },
  ],
  ko: [
    { word: '안녕', meaning: 'xin chào', hint: 'Lời chào cơ bản' },
    { word: '감사', meaning: 'cảm ơn', hint: 'Lời cảm ơn' },
    { word: '학교', meaning: 'trường học', hint: 'Nơi học tập' },
    { word: '친구', meaning: 'bạn bè', hint: 'Người thân thiết' },
    { word: '가족', meaning: 'gia đình', hint: 'Người thân' },
    { word: '선생님', meaning: 'giáo viên', hint: 'Người dạy học' },
    { word: '병원', meaning: 'bệnh viện', hint: 'Nơi chữa bệnh' },
    { word: '음식', meaning: 'đồ ăn', hint: 'Thứ để ăn' },
    { word: '도서관', meaning: 'thư viện', hint: 'Nơi mượn sách' },
    { word: '공항', meaning: 'sân bay', hint: 'Nơi máy bay cất cánh' },
    { word: '날씨', meaning: 'thời tiết', hint: 'Nắng, mưa, gió...' },
    { word: '생일', meaning: 'sinh nhật', hint: 'Ngày bạn được sinh ra' },
    { word: '지하철', meaning: 'tàu điện ngầm', hint: 'Phương tiện dưới đất' },
    { word: '컴퓨터', meaning: 'máy tính', hint: 'Thiết bị điện tử' },
    { word: '사랑', meaning: 'tình yêu', hint: 'Cảm xúc mạnh mẽ nhất' },
    { word: '여행', meaning: 'du lịch', hint: 'Đi đến nơi mới' },
    { word: '영화', meaning: 'phim', hint: 'Xem ở rạp' },
    { word: '노래', meaning: 'bài hát', hint: 'Nghe bằng tai' },
    { word: '시장', meaning: 'chợ', hint: 'Nơi mua bán' },
    { word: '운동', meaning: 'tập thể dục', hint: 'Hoạt động rèn luyện sức khỏe' },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

function scrambleWord(word: string): string {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const result = arr.join('');
  return result === word ? scrambleWord(word) : result;
}

export default function WordScramblePage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambled, setScrambled] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const currentWords = wordSets[selectedLang] || [];
  const currentWord = currentWords[currentIndex];

  useEffect(() => {
    if (currentWord) {
      setScrambled(scrambleWord(currentWord.word));
      setUserAnswer('');
      setShowResult(false);
      setShowHint(false);
    }
  }, [currentIndex, selectedLang]);

  const checkAnswer = () => {
    if (!currentWord) return;
    setShowResult(true);
    const isCorrect = userAnswer.toLowerCase().trim() === currentWord.word.toLowerCase();
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const nextWord = () => {
    if (currentIndex < currentWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const resetAll = () => {
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setShowResult(false);
    setUserAnswer('');
    setShowHint(false);
  };

  if (!currentWord) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🔤</div>
        <h3 className="text-lg font-semibold mb-2">Chưa có bài xáo chữ</h3>
        <p className="text-muted-foreground">Chọn ngôn ngữ để bắt đầu.</p>
      </div>
    );
  }

  if (currentIndex >= currentWords.length) {
    const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="text-5xl mb-4">🎉</div>
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
        <Button onClick={resetAll}>Chơi lại</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Xáo chữ</h1>
        <p className="text-muted-foreground mt-1">Sắp xếp lại các chữ cái thành từ đúng</p>
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
        <span className="text-muted-foreground">Từ {currentIndex + 1} / {currentWords.length}</span>
        <span className="font-medium text-green-600">{score.correct} đúng</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(currentIndex / currentWords.length) * 100}%` }} />
      </div>

      {/* Scrambled word */}
      <div className="p-8 rounded-2xl bg-card border border text-center space-y-3">
        <div className="flex justify-center gap-2 flex-wrap">
          {scrambled.split('').map((char, i) => (
            <span
              key={i}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-bold text-lg border-2 border-primary/20"
            >
              {char}
            </span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-3">Nghĩa: <span className="font-medium">{currentWord.meaning}</span></p>
        {showHint && (
          <p className="text-xs text-muted-foreground">Gợi ý: {currentWord.hint}</p>
        )}
        {!showHint && !showResult && (
          <button onClick={() => setShowHint(true)} className="text-xs text-primary hover:underline">
            Xem gợi ý
          </button>
        )}
      </div>

      {/* Input */}
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && !showResult && userAnswer.trim() && checkAnswer()}
        placeholder="Gõ từ đúng..."
        disabled={showResult}
        className="w-full p-4 rounded-xl border-2 border-border bg-card text-lg text-center focus:border-primary focus:outline-none transition-all"
        autoComplete="off"
      />

      {/* Result */}
      {showResult && (
        <div className={`p-4 rounded-xl text-center ${
          userAnswer.toLowerCase().trim() === currentWord.word.toLowerCase()
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200'
            : 'bg-red-50 dark:bg-red-900/20 border border-red-200'
        }`}>
          <p className={`font-medium ${
            userAnswer.toLowerCase().trim() === currentWord.word.toLowerCase()
              ? 'text-green-700' : 'text-red-700'
          }`}>
            {userAnswer.toLowerCase().trim() === currentWord.word.toLowerCase()
              ? '✓ Chính xác!' : `✗ Đáp án: ${currentWord.word}`}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        {!showResult ? (
          <Button onClick={checkAnswer} disabled={!userAnswer.trim()}>Kiểm tra</Button>
        ) : (
          <Button onClick={nextWord}>
            {currentIndex < currentWords.length - 1 ? 'Từ tiếp →' : 'Xem kết quả'}
          </Button>
        )}
      </div>
    </div>
  );
}
