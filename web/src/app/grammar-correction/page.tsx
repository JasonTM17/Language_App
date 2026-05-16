'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface GrammarCorrectionExercise {
  id: string;
  sentence: string;
  corrected: string;
  error: string;
  explanation: string;
}

const exercises: Record<string, GrammarCorrectionExercise[]> = {
  en: [
    { id: '1', sentence: 'She go to school every day.', corrected: 'She goes to school every day.', error: 'go → goes', explanation: 'Ngôi thứ 3 số ít (she/he/it) cần thêm -s/-es vào động từ ở thì hiện tại đơn.' },
    { id: '2', sentence: 'I am agree with you.', corrected: 'I agree with you.', error: 'am agree → agree', explanation: '"Agree" là động từ thường, không dùng với "am/is/are".' },
    { id: '3', sentence: 'He don\'t like coffee.', corrected: 'He doesn\'t like coffee.', error: 'don\'t → doesn\'t', explanation: 'Ngôi thứ 3 số ít dùng "doesn\'t" thay vì "don\'t".' },
    { id: '4', sentence: 'I have went to Japan last year.', corrected: 'I went to Japan last year.', error: 'have went → went', explanation: '"Last year" là dấu hiệu quá khứ đơn, không dùng hiện tại hoàn thành.' },
    { id: '5', sentence: 'There is many people in the park.', corrected: 'There are many people in the park.', error: 'is → are', explanation: '"People" là danh từ số nhiều, dùng "are" thay vì "is".' },
    { id: '6', sentence: 'I am living here since 2020.', corrected: 'I have been living here since 2020.', error: 'am living → have been living', explanation: '"Since" đi với thì hiện tại hoàn thành (tiếp diễn).' },
    { id: '7', sentence: 'She is more taller than me.', corrected: 'She is taller than me.', error: 'more taller → taller', explanation: 'Tính từ ngắn dùng -er, không thêm "more" phía trước.' },
    { id: '8', sentence: 'I didn\'t went to the party.', corrected: 'I didn\'t go to the party.', error: 'went → go', explanation: 'Sau "didn\'t" dùng động từ nguyên mẫu (V1).' },
    { id: '9', sentence: 'He can speaks three languages.', corrected: 'He can speak three languages.', error: 'speaks → speak', explanation: 'Sau modal verb (can/could/will) dùng V nguyên mẫu, không chia.' },
    { id: '10', sentence: 'I am interesting in music.', corrected: 'I am interested in music.', error: 'interesting → interested', explanation: '"Interested" mô tả cảm xúc người, "interesting" mô tả vật gây hứng thú.' },
  ],
  ja: [
    { id: '11', sentence: '私は学生だです。', corrected: '私は学生です。', error: 'だです → です', explanation: '"だ" và "です" không dùng cùng nhau. Dùng "です" cho thể lịch sự.' },
    { id: '12', sentence: '東京を行きます。', corrected: '東京に行きます。', error: 'を → に', explanation: 'Trợ từ "に" chỉ hướng đến (destination), "を" chỉ tân ngữ trực tiếp.' },
    { id: '13', sentence: '私は寿司は好きです。', corrected: '私は寿司が好きです。', error: 'は → が', explanation: 'Với "好き" (thích), đối tượng được thích dùng trợ từ "が".' },
    { id: '14', sentence: '昨日、映画を見るました。', corrected: '昨日、映画を見ました。', error: '見るました → 見ました', explanation: 'Thể quá khứ lịch sự: 見る → 見ました (bỏ る, thêm ました).' },
    { id: '15', sentence: '日本語が上手ですね。いいえ、まだまだです。', corrected: '日本語がお上手ですね。いいえ、まだまだです。', error: '上手 → お上手', explanation: 'Khi khen người khác, thêm "お" trước "上手" để lịch sự hơn.' },
    { id: '26', sentence: '私は毎日学校で行きます。', corrected: '私は毎日学校に行きます。', error: 'で → に', explanation: '"で" chỉ nơi hành động xảy ra, "に" chỉ đích đến của chuyển động.' },
    { id: '27', sentence: '彼女は英語を話すことができるです。', corrected: '彼女は英語を話すことができます。', error: 'できるです → できます', explanation: '"できる" chia thể lịch sự thành "できます", không thêm "です" sau.' },
    { id: '28', sentence: '先生は学生に本を読むさせました。', corrected: '先生は学生に本を読ませました。', error: '読むさせました → 読ませました', explanation: 'Thể sai khiến của 読む: bỏ む, thêm ませる → 読ませる → 読ませました.' },
    { id: '29', sentence: 'この映画はとても面白いだった。', corrected: 'この映画はとても面白かった。', error: '面白いだった → 面白かった', explanation: 'Tính từ đuôi い chia quá khứ: bỏ い, thêm かった. Không dùng "だった".' },
    { id: '30', sentence: '明日雨が降ったら、家にいます。', corrected: '明日雨が降ったら、家にいます。', error: 'Câu đúng!', explanation: 'Câu này đúng ngữ pháp! ～たら là cấu trúc điều kiện "nếu... thì...".' },
  ],
  zh: [
    { id: '16', sentence: '我很是高兴。', corrected: '我很高兴。', error: '很是 → 很', explanation: '"很" và "是" không dùng cùng nhau trước tính từ. Dùng "很 + adj".' },
    { id: '17', sentence: '他在中国去了。', corrected: '他去了中国。', error: '在中国去了 → 去了中国', explanation: 'Cấu trúc đúng: S + V + 了 + địa điểm. "在" dùng cho vị trí hiện tại.' },
    { id: '18', sentence: '我不会说中文很好。', corrected: '我中文说得不太好。', error: 'Sai cấu trúc bổ ngữ', explanation: 'Cấu trúc bổ ngữ trình độ: S + V + 得 + adj. Phủ định: 说得不太好.' },
    { id: '19', sentence: '昨天我看了一个很好电影。', corrected: '昨天我看了一部很好的电影。', error: '一个 → 一部, thiếu 的', explanation: 'Phim dùng lượng từ "部". Tính từ trước danh từ cần "的": 很好的电影.' },
    { id: '20', sentence: '我比他更高了三厘米。', corrected: '我比他高三厘米。', error: '更高了 → 高', explanation: 'Cấu trúc so sánh cụ thể: A 比 B + adj + số lượng. Không thêm "更" hay "了".' },
    { id: '31', sentence: '我昨天在家里看了书两个小时。', corrected: '我昨天在家里看了两个小时的书。', error: 'Sai vị trí bổ ngữ thời lượng', explanation: 'Bổ ngữ thời lượng đặt sau động từ, trước tân ngữ: V + 了 + thời gian + 的 + tân ngữ.' },
    { id: '32', sentence: '她穿着一件很漂亮裙子。', corrected: '她穿着一件很漂亮的裙子。', error: 'thiếu 的', explanation: 'Tính từ đa âm tiết (很漂亮) trước danh từ cần "的": 很漂亮的裙子.' },
    { id: '33', sentence: '我把作业做完。', corrected: '我把作业做完了。', error: 'thiếu 了', explanation: 'Câu "把" diễn tả kết quả hoàn thành cần "了" ở cuối: 做完了.' },
    { id: '34', sentence: '虽然他很忙，他还是来了。', corrected: '虽然他很忙，但是他还是来了。', error: 'thiếu 但是', explanation: '"虽然...但是..." là cặp liên từ cố định (mặc dù...nhưng...). Không bỏ "但是".' },
    { id: '35', sentence: '我想去一下中国。', corrected: '我想去一趟中国。', error: '一下 → 一趟', explanation: '"一下" dùng cho hành động ngắn. Đi đến nơi nào dùng "一趟" (một chuyến).' },
  ],
  ko: [
    { id: '21', sentence: '저는 학생이입니다.', corrected: '저는 학생입니다.', error: '이입니다 → 입니다', explanation: '"학생" kết thúc bằng phụ âm nên dùng "입니다" trực tiếp (không thêm 이).' },
    { id: '22', sentence: '나는 한국에서 갔어요.', corrected: '나는 한국에 갔어요.', error: '에서 → 에', explanation: '"에" chỉ hướng đến (destination), "에서" chỉ nơi hành động xảy ra (location).' },
    { id: '23', sentence: '이 음식을 맛있어요.', corrected: '이 음식이 맛있어요.', error: '을 → 이', explanation: 'Với tính từ "맛있다", chủ ngữ dùng trợ từ "이/가" không phải "을/를".' },
    { id: '24', sentence: '어제 영화를 보다았어요.', corrected: '어제 영화를 봤어요.', error: '보다았어요 → 봤어요', explanation: 'Quá khứ của 보다: bỏ 다, thêm 았어요 → 보 + 았어요 = 봤어요 (rút gọn).' },
    { id: '25', sentence: '저는 커피를 마시고 좋아해요.', corrected: '저는 커피를 마시는 것을 좋아해요.', error: '마시고 → 마시는 것을', explanation: '"Thích làm gì" dùng cấu trúc: V + 는 것을 좋아하다.' },
    { id: '36', sentence: '내일 비가 오면은 집에 있을 거예요.', corrected: '내일 비가 오면 집에 있을 거예요.', error: '오면은 → 오면', explanation: '"~면" đã là liên từ điều kiện, không thêm "은" phía sau.' },
    { id: '37', sentence: '저는 한국어를 공부하는 중이에요.', corrected: '저는 한국어를 공부하고 있어요.', error: '공부하는 중이에요 → 공부하고 있어요', explanation: '"~고 있다" tự nhiên hơn cho hành động đang diễn ra. "~는 중" dùng khi nhấn mạnh "đang giữa chừng".' },
    { id: '38', sentence: '그 사람은 키가 크는 편이에요.', corrected: '그 사람은 키가 큰 편이에요.', error: '크는 → 큰', explanation: 'Tính từ trước "편" dùng dạng định ngữ: 크다 → 큰 (không phải 크는).' },
    { id: '39', sentence: '저는 서울에서 3년 동안 살았어요.', corrected: '저는 서울에서 3년 동안 살았어요.', error: 'Câu đúng!', explanation: 'Câu này đúng ngữ pháp! "에서" chỉ nơi hành động xảy ra, "동안" chỉ khoảng thời gian.' },
    { id: '40', sentence: '선생님께서 학생들한테 숙제를 내줬어요.', corrected: '선생님께서 학생들에게 숙제를 내주셨어요.', error: '한테 → 에게, 내줬어요 → 내주셨어요', explanation: 'Với chủ ngữ kính ngữ (께서), dùng "에게" thay "한테" và động từ kính ngữ "~셨어요".' },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function GrammarCorrectionPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const currentExercises = exercises[selectedLang] || [];
  const currentExercise = currentExercises[currentIndex];

  const checkAnswer = () => {
    if (!currentExercise) return;
    setShowResult(true);
    const normalize = (s: string) => s.toLowerCase().replace(/[.,!?]/g, '').trim();
    const isCorrect = normalize(userAnswer) === normalize(currentExercise.corrected);
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const nextExercise = () => {
    if (currentIndex < currentExercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setShowResult(false);
    }
  };

  const resetAll = () => {
    setCurrentIndex(0);
    setUserAnswer('');
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
  };

  if (!currentExercise) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">✏️</div>
        <h3 className="text-lg font-semibold mb-2">Chưa có bài sửa lỗi</h3>
        <p className="text-muted-foreground">Chọn ngôn ngữ để bắt đầu.</p>
      </div>
    );
  }

  if (currentIndex >= currentExercises.length) {
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
        <Button onClick={resetAll}>Làm lại</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Sửa lỗi ngữ pháp</h1>
        <p className="text-muted-foreground mt-1">Tìm và sửa lỗi sai trong câu</p>
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

      {/* Sentence with error */}
      <div className="p-6 rounded-2xl bg-card border border">
        <p className="text-xs text-red-500 font-medium mb-2">Câu có lỗi sai:</p>
        <p className="text-xl font-medium text-red-700 dark:text-red-300">{currentExercise.sentence}</p>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-medium">Viết lại câu đúng:</p>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !showResult && userAnswer.trim() && checkAnswer()}
          placeholder="Gõ câu đã sửa..."
          disabled={showResult}
          className="w-full p-4 rounded-xl border-2 border-border bg-card text-lg focus:border-primary focus:outline-none transition-all"
          autoComplete="off"
        />
      </div>

      {/* Result */}
      {showResult && (
        <div className={`p-4 rounded-xl space-y-2 ${
          userAnswer.toLowerCase().trim() === currentExercise.corrected.toLowerCase().trim()
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200'
            : 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200'
        }`}>
          <p className="font-medium text-sm">
            {userAnswer.toLowerCase().trim() === currentExercise.corrected.toLowerCase().trim()
              ? '✓ Chính xác!'
              : '✗ Chưa đúng'}
          </p>
          <p className="text-sm"><span className="font-medium">Đáp án:</span> {currentExercise.corrected}</p>
          <p className="text-sm text-red-600"><span className="font-medium">Lỗi:</span> {currentExercise.error}</p>
          <p className="text-xs text-muted-foreground mt-1">{currentExercise.explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        {!showResult ? (
          <Button onClick={checkAnswer} disabled={!userAnswer.trim()}>Kiểm tra</Button>
        ) : (
          <Button onClick={nextExercise}>
            {currentIndex < currentExercises.length - 1 ? 'Câu tiếp →' : 'Xem kết quả'}
          </Button>
        )}
      </div>
    </div>
  );
}
