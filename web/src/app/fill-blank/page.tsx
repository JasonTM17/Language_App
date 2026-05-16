'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface FillExercise {
  id: string;
  language: string;
  sentence: string;
  blank: string;
  hint: string;
  translation: string;
  options: string[];
}

const exercises: Record<string, FillExercise[]> = {
  en: [
    { id: '1', language: 'en', sentence: 'I ___ to school every day.', blank: 'go', hint: 'đi', translation: 'Tôi đi học mỗi ngày.', options: ['go', 'goes', 'going', 'went'] },
    { id: '2', language: 'en', sentence: 'She ___ a doctor.', blank: 'is', hint: 'là', translation: 'Cô ấy là bác sĩ.', options: ['is', 'are', 'am', 'be'] },
    { id: '3', language: 'en', sentence: 'They ___ playing football now.', blank: 'are', hint: 'đang', translation: 'Họ đang chơi bóng đá.', options: ['are', 'is', 'was', 'were'] },
    { id: '4', language: 'en', sentence: 'I ___ never been to Japan.', blank: 'have', hint: 'đã từng', translation: 'Tôi chưa bao giờ đến Nhật.', options: ['have', 'has', 'had', 'having'] },
    { id: '5', language: 'en', sentence: 'He ___ his homework yesterday.', blank: 'did', hint: 'đã làm', translation: 'Anh ấy đã làm bài tập hôm qua.', options: ['did', 'does', 'do', 'done'] },
    { id: '6', language: 'en', sentence: 'We will ___ there at 5 PM.', blank: 'arrive', hint: 'đến', translation: 'Chúng tôi sẽ đến đó lúc 5 giờ chiều.', options: ['arrive', 'arrives', 'arrived', 'arriving'] },
    { id: '16', language: 'en', sentence: 'If it ___, I will stay home.', blank: 'rains', hint: 'mưa', translation: 'Nếu trời mưa, tôi sẽ ở nhà.', options: ['rains', 'rain', 'rained', 'raining'] },
    { id: '17', language: 'en', sentence: 'She ___ cooking when I arrived.', blank: 'was', hint: 'đang (quá khứ)', translation: 'Cô ấy đang nấu ăn khi tôi đến.', options: ['was', 'is', 'were', 'has been'] },
    { id: '18', language: 'en', sentence: 'You should ___ more water.', blank: 'drink', hint: 'uống', translation: 'Bạn nên uống nhiều nước hơn.', options: ['drink', 'drinks', 'drank', 'drinking'] },
    { id: '19', language: 'en', sentence: 'The book ___ written by a famous author.', blank: 'was', hint: 'bị động', translation: 'Cuốn sách được viết bởi tác giả nổi tiếng.', options: ['was', 'is', 'were', 'been'] },
  ],
  ja: [
    { id: '7', language: 'ja', sentence: '私は日本語___ 勉強しています。', blank: 'を', hint: 'trợ từ tân ngữ', translation: 'Tôi đang học tiếng Nhật.', options: ['を', 'が', 'は', 'に'] },
    { id: '8', language: 'ja', sentence: '東京___ 行きたいです。', blank: 'に', hint: 'trợ từ hướng', translation: 'Tôi muốn đi Tokyo.', options: ['に', 'を', 'で', 'が'] },
    { id: '9', language: 'ja', sentence: 'この本は___ 面白いです。', blank: 'とても', hint: 'rất', translation: 'Cuốn sách này rất thú vị.', options: ['とても', 'あまり', 'ちょっと', 'すこし'] },
    { id: '20', language: 'ja', sentence: '友達___ 映画を見ました。', blank: 'と', hint: 'cùng với', translation: 'Tôi đã xem phim cùng bạn.', options: ['と', 'を', 'が', 'で'] },
    { id: '21', language: 'ja', sentence: '毎朝コーヒー___ 飲みます。', blank: 'を', hint: 'trợ từ tân ngữ', translation: 'Mỗi sáng tôi uống cà phê.', options: ['を', 'が', 'は', 'に'] },
    { id: '22', language: 'ja', sentence: '電車___ 会社に行きます。', blank: 'で', hint: 'bằng (phương tiện)', translation: 'Tôi đi làm bằng tàu điện.', options: ['で', 'に', 'を', 'と'] },
  ],
  zh: [
    { id: '10', language: 'zh', sentence: '我___学生。', blank: '是', hint: 'là', translation: 'Tôi là sinh viên.', options: ['是', '有', '在', '做'] },
    { id: '11', language: 'zh', sentence: '他___三个孩子。', blank: '有', hint: 'có', translation: 'Anh ấy có 3 đứa con.', options: ['有', '是', '在', '要'] },
    { id: '12', language: 'zh', sentence: '我想___一杯咖啡。', blank: '喝', hint: 'uống', translation: 'Tôi muốn uống một ly cà phê.', options: ['喝', '吃', '买', '做'] },
    { id: '23', language: 'zh', sentence: '她___在图书馆看书。', blank: '正', hint: 'đang', translation: 'Cô ấy đang đọc sách ở thư viện.', options: ['正', '已', '就', '才'] },
    { id: '24', language: 'zh', sentence: '我___去过中国两次。', blank: '已经', hint: 'đã (rồi)', translation: 'Tôi đã đi Trung Quốc hai lần rồi.', options: ['已经', '正在', '将要', '刚才'] },
    { id: '25', language: 'zh', sentence: '这个菜___好吃了！', blank: '太', hint: 'quá', translation: 'Món này ngon quá!', options: ['太', '很', '最', '更'] },
  ],
  ko: [
    { id: '13', language: 'ko', sentence: '저는 학생___。', blank: '입니다', hint: 'là (kính ngữ)', translation: 'Tôi là sinh viên.', options: ['입니다', '있습니다', '합니다', '됩니다'] },
    { id: '14', language: 'ko', sentence: '한국어를 ___하고 있어요.', blank: '공부', hint: 'học', translation: 'Tôi đang học tiếng Hàn.', options: ['공부', '운동', '요리', '일'] },
    { id: '15', language: 'ko', sentence: '오늘 날씨가 ___。', blank: '좋아요', hint: 'tốt/đẹp', translation: 'Hôm nay thời tiết đẹp.', options: ['좋아요', '나빠요', '추워요', '더워요'] },
    { id: '26', language: 'ko', sentence: '저는 매일 아침 ___시에 일어나요.', blank: '일곱', hint: 'bảy', translation: 'Tôi dậy lúc 7 giờ mỗi sáng.', options: ['일곱', '여덟', '아홉', '열'] },
    { id: '27', language: 'ko', sentence: '주말에 친구___ 만나요.', blank: '를', hint: 'trợ từ tân ngữ', translation: 'Cuối tuần tôi gặp bạn.', options: ['를', '가', '에', '도'] },
    { id: '28', language: 'ko', sentence: '이 음식이 정말 ___。', blank: '맛있어요', hint: 'ngon', translation: 'Món ăn này thật sự ngon.', options: ['맛있어요', '맛없어요', '비싸요', '싸요'] },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function FillBlankPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const currentExercises = exercises[selectedLang] || [];
  const currentExercise = currentExercises[currentIndex];

  const checkAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === currentExercise.blank) {
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setScore(prev => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const nextExercise = () => {
    if (currentIndex < currentExercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetAll = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
  };

  if (currentIndex >= currentExercises.length) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-4">Hoàn thành!</h2>
        <p className="text-lg mb-2">Điểm: {score.correct}/{score.total}</p>
        <p className="text-muted-foreground mb-6">
          {score.correct === score.total ? 'Xuất sắc! Bạn nắm vững ngữ pháp!' : 'Tiếp tục luyện tập nhé!'}
        </p>
        <Button onClick={resetAll}>Làm lại</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Điền từ</h1>
        <p className="text-muted-foreground mt-1">Chọn từ đúng để hoàn thành câu</p>
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

      {/* Sentence with blank */}
      <div className="p-6 rounded-2xl bg-card border border text-center">
        <p className="text-xl font-medium leading-relaxed">
          {currentExercise.sentence.split('___').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className={`inline-block min-w-[80px] mx-1 px-3 py-1 rounded-lg border-2 border-dashed ${
                  showResult && selectedAnswer === currentExercise.blank
                    ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
                    : showResult
                    ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {selectedAnswer || '___'}
                </span>
              )}
            </span>
          ))}
        </p>
        <p className="text-sm text-muted-foreground mt-3">{currentExercise.translation}</p>
        <p className="text-xs text-muted-foreground mt-1">Gợi ý: {currentExercise.hint}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {currentExercise.options.map((option) => {
          let styles = 'border-border hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20';
          if (showResult) {
            if (option === currentExercise.blank) {
              styles = 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
            } else if (option === selectedAnswer) {
              styles = 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
            } else {
              styles = 'border-border opacity-50';
            }
          }

          return (
            <button
              key={option}
              onClick={() => checkAnswer(option)}
              disabled={showResult}
              className={`p-4 rounded-xl border-2 text-center font-medium transition-all ${styles}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Result & Next */}
      {showResult && (
        <div className="flex items-center justify-between">
          <p className={`text-sm font-medium ${selectedAnswer === currentExercise.blank ? 'text-green-600' : 'text-red-600'}`}>
            {selectedAnswer === currentExercise.blank ? '✓ Chính xác!' : `✗ Đáp án đúng: ${currentExercise.blank}`}
          </p>
          <Button onClick={nextExercise}>
            {currentIndex < currentExercises.length - 1 ? 'Câu tiếp →' : 'Xem kết quả'}
          </Button>
        </div>
      )}
    </div>
  );
}
