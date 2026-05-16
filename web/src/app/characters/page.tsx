'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CharacterData {
  character: string;
  reading: string;
  meaning: string;
  strokes: number;
  radical?: string;
  examples: { word: string; reading: string; meaning: string }[];
}

const characters: Record<string, CharacterData[]> = {
  ja: [
    { character: 'あ', reading: 'a', meaning: 'Hiragana A', strokes: 3, examples: [{ word: 'あさ', reading: 'asa', meaning: 'buổi sáng' }, { word: 'あめ', reading: 'ame', meaning: 'mưa' }] },
    { character: 'い', reading: 'i', meaning: 'Hiragana I', strokes: 2, examples: [{ word: 'いぬ', reading: 'inu', meaning: 'con chó' }, { word: 'いえ', reading: 'ie', meaning: 'nhà' }] },
    { character: 'う', reading: 'u', meaning: 'Hiragana U', strokes: 2, examples: [{ word: 'うみ', reading: 'umi', meaning: 'biển' }, { word: 'うた', reading: 'uta', meaning: 'bài hát' }] },
    { character: 'え', reading: 'e', meaning: 'Hiragana E', strokes: 2, examples: [{ word: 'えき', reading: 'eki', meaning: 'nhà ga' }, { word: 'えん', reading: 'en', meaning: 'yên (tiền)' }] },
    { character: 'お', reading: 'o', meaning: 'Hiragana O', strokes: 3, examples: [{ word: 'おちゃ', reading: 'ocha', meaning: 'trà' }, { word: 'おかね', reading: 'okane', meaning: 'tiền' }] },
    { character: '日', reading: 'nichi / hi', meaning: 'ngày / mặt trời', strokes: 4, radical: '日', examples: [{ word: '日本', reading: 'nihon', meaning: 'Nhật Bản' }, { word: '今日', reading: 'kyou', meaning: 'hôm nay' }] },
    { character: '月', reading: 'getsu / tsuki', meaning: 'tháng / mặt trăng', strokes: 4, radical: '月', examples: [{ word: '月曜日', reading: 'getsuyoubi', meaning: 'thứ Hai' }, { word: '今月', reading: 'kongetsu', meaning: 'tháng này' }] },
    { character: '水', reading: 'sui / mizu', meaning: 'nước', strokes: 4, radical: '水', examples: [{ word: '水曜日', reading: 'suiyoubi', meaning: 'thứ Tư' }, { word: 'お水', reading: 'omizu', meaning: 'nước' }] },
    { character: '火', reading: 'ka / hi', meaning: 'lửa', strokes: 4, radical: '火', examples: [{ word: '火曜日', reading: 'kayoubi', meaning: 'thứ Ba' }, { word: '花火', reading: 'hanabi', meaning: 'pháo hoa' }] },
    { character: '人', reading: 'jin / hito', meaning: 'người', strokes: 2, radical: '人', examples: [{ word: '日本人', reading: 'nihonjin', meaning: 'người Nhật' }, { word: '一人', reading: 'hitori', meaning: 'một mình' }] },
    { character: '大', reading: 'dai / ookii', meaning: 'to / lớn', strokes: 3, radical: '大', examples: [{ word: '大学', reading: 'daigaku', meaning: 'đại học' }, { word: '大きい', reading: 'ookii', meaning: 'to' }] },
    { character: '学', reading: 'gaku / manabu', meaning: 'học', strokes: 8, radical: '子', examples: [{ word: '学生', reading: 'gakusei', meaning: 'sinh viên' }, { word: '学校', reading: 'gakkou', meaning: 'trường học' }] },
  ],
  zh: [
    { character: '一', reading: 'yī', meaning: 'một', strokes: 1, examples: [{ word: '一个', reading: 'yī gè', meaning: 'một cái' }, { word: '第一', reading: 'dì yī', meaning: 'thứ nhất' }] },
    { character: '二', reading: 'èr', meaning: 'hai', strokes: 2, examples: [{ word: '二月', reading: 'èr yuè', meaning: 'tháng 2' }, { word: '第二', reading: 'dì èr', meaning: 'thứ hai' }] },
    { character: '三', reading: 'sān', meaning: 'ba', strokes: 3, examples: [{ word: '三个', reading: 'sān gè', meaning: 'ba cái' }, { word: '三月', reading: 'sān yuè', meaning: 'tháng 3' }] },
    { character: '人', reading: 'rén', meaning: 'người', strokes: 2, radical: '人', examples: [{ word: '人们', reading: 'rén men', meaning: 'mọi người' }, { word: '中国人', reading: 'zhōng guó rén', meaning: 'người Trung Quốc' }] },
    { character: '大', reading: 'dà', meaning: 'to/lớn', strokes: 3, radical: '大', examples: [{ word: '大学', reading: 'dà xué', meaning: 'đại học' }, { word: '大家', reading: 'dà jiā', meaning: 'mọi người' }] },
    { character: '中', reading: 'zhōng', meaning: 'giữa/trung', strokes: 4, examples: [{ word: '中国', reading: 'zhōng guó', meaning: 'Trung Quốc' }, { word: '中文', reading: 'zhōng wén', meaning: 'tiếng Trung' }] },
    { character: '国', reading: 'guó', meaning: 'nước/quốc gia', strokes: 8, radical: '囗', examples: [{ word: '中国', reading: 'zhōng guó', meaning: 'Trung Quốc' }, { word: '国家', reading: 'guó jiā', meaning: 'quốc gia' }] },
    { character: '学', reading: 'xué', meaning: 'học', strokes: 8, radical: '子', examples: [{ word: '学生', reading: 'xué shēng', meaning: 'sinh viên' }, { word: '学校', reading: 'xué xiào', meaning: 'trường học' }] },
    { character: '好', reading: 'hǎo', meaning: 'tốt/đẹp', strokes: 6, radical: '女', examples: [{ word: '你好', reading: 'nǐ hǎo', meaning: 'xin chào' }, { word: '好吃', reading: 'hǎo chī', meaning: 'ngon' }] },
    { character: '我', reading: 'wǒ', meaning: 'tôi', strokes: 7, examples: [{ word: '我们', reading: 'wǒ men', meaning: 'chúng tôi' }, { word: '我的', reading: 'wǒ de', meaning: 'của tôi' }] },
    { character: '你', reading: 'nǐ', meaning: 'bạn', strokes: 7, radical: '亻', examples: [{ word: '你好', reading: 'nǐ hǎo', meaning: 'xin chào' }, { word: '你们', reading: 'nǐ men', meaning: 'các bạn' }] },
    { character: '是', reading: 'shì', meaning: 'là', strokes: 9, examples: [{ word: '是的', reading: 'shì de', meaning: 'đúng vậy' }, { word: '不是', reading: 'bú shì', meaning: 'không phải' }] },
  ],
  ko: [
    { character: 'ㄱ', reading: 'giyeok (g/k)', meaning: 'Phụ âm G/K', strokes: 2, examples: [{ word: '가', reading: 'ga', meaning: 'đi' }, { word: '고기', reading: 'gogi', meaning: 'thịt' }] },
    { character: 'ㄴ', reading: 'nieun (n)', meaning: 'Phụ âm N', strokes: 2, examples: [{ word: '나', reading: 'na', meaning: 'tôi' }, { word: '나라', reading: 'nara', meaning: 'đất nước' }] },
    { character: 'ㄷ', reading: 'digeut (d/t)', meaning: 'Phụ âm D/T', strokes: 3, examples: [{ word: '다', reading: 'da', meaning: 'tất cả' }, { word: '도시', reading: 'dosi', meaning: 'thành phố' }] },
    { character: 'ㄹ', reading: 'rieul (r/l)', meaning: 'Phụ âm R/L', strokes: 5, examples: [{ word: '라면', reading: 'ramyeon', meaning: 'mì ramen' }, { word: '나라', reading: 'nara', meaning: 'đất nước' }] },
    { character: 'ㅁ', reading: 'mieum (m)', meaning: 'Phụ âm M', strokes: 4, examples: [{ word: '마음', reading: 'maeum', meaning: 'trái tim' }, { word: '물', reading: 'mul', meaning: 'nước' }] },
    { character: 'ㅂ', reading: 'bieup (b/p)', meaning: 'Phụ âm B/P', strokes: 4, examples: [{ word: '밥', reading: 'bap', meaning: 'cơm' }, { word: '바다', reading: 'bada', meaning: 'biển' }] },
    { character: 'ㅅ', reading: 'siot (s)', meaning: 'Phụ âm S', strokes: 2, examples: [{ word: '사람', reading: 'saram', meaning: 'người' }, { word: '산', reading: 'san', meaning: 'núi' }] },
    { character: 'ㅇ', reading: 'ieung (ng/silent)', meaning: 'Phụ âm NG/câm', strokes: 1, examples: [{ word: '아이', reading: 'ai', meaning: 'trẻ em' }, { word: '우유', reading: 'uyu', meaning: 'sữa' }] },
    { character: 'ㅎ', reading: 'hieut (h)', meaning: 'Phụ âm H', strokes: 3, examples: [{ word: '하나', reading: 'hana', meaning: 'một' }, { word: '한국', reading: 'hanguk', meaning: 'Hàn Quốc' }] },
    { character: 'ㅏ', reading: 'a', meaning: 'Nguyên âm A', strokes: 2, examples: [{ word: '가', reading: 'ga', meaning: 'đi' }, { word: '나', reading: 'na', meaning: 'tôi' }] },
    { character: 'ㅓ', reading: 'eo', meaning: 'Nguyên âm EO', strokes: 2, examples: [{ word: '서울', reading: 'seoul', meaning: 'Seoul' }, { word: '어디', reading: 'eodi', meaning: 'ở đâu' }] },
    { character: 'ㅗ', reading: 'o', meaning: 'Nguyên âm O', strokes: 2, examples: [{ word: '오', reading: 'o', meaning: 'năm' }, { word: '고기', reading: 'gogi', meaning: 'thịt' }] },
  ],
};

const languageLabels: Record<string, { name: string; flag: string; charType: string }> = {
  ja: { name: 'Japanese', flag: '🇯🇵', charType: 'Hiragana & Kanji' },
  zh: { name: 'Chinese', flag: '🇨🇳', charType: 'Hán tự' },
  ko: { name: 'Korean', flag: '🇰🇷', charType: 'Hangul' },
};

export default function CharactersPage() {
  const [selectedLang, setSelectedLang] = useState<'ja' | 'zh' | 'ko'>('ja');
  const [selectedChar, setSelectedChar] = useState<CharacterData | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizResult, setQuizResult] = useState<boolean | null>(null);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });

  const currentChars = characters[selectedLang] || [];

  const startQuiz = () => {
    setQuizMode(true);
    setQuizIndex(0);
    setQuizAnswer('');
    setQuizResult(null);
    setQuizScore({ correct: 0, total: 0 });
  };

  const checkQuizAnswer = () => {
    const char = currentChars[quizIndex];
    const correct = quizAnswer.toLowerCase().trim() === char.reading.split(' ')[0].toLowerCase().trim() ||
                    quizAnswer.trim() === char.meaning.toLowerCase().trim();
    setQuizResult(correct);
    setQuizScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const nextQuizChar = () => {
    if (quizIndex < currentChars.length - 1) {
      setQuizIndex(prev => prev + 1);
      setQuizAnswer('');
      setQuizResult(null);
    } else {
      setQuizMode(false);
    }
  };

  if (quizMode) {
    const char = currentChars[quizIndex];
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={() => setQuizMode(false)} className="text-sm text-primary hover:underline">← Quay lại</button>
          <span className="text-sm text-muted-foreground">{quizIndex + 1}/{currentChars.length}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((quizIndex + 1) / currentChars.length) * 100}%` }} />
        </div>
        <div className="p-8 rounded-2xl bg-card border border text-center">
          <p className="text-8xl font-bold mb-4">{char.character}</p>
          <p className="text-sm text-muted-foreground">Nhập cách đọc hoặc nghĩa</p>
        </div>
        <input
          type="text"
          value={quizAnswer}
          onChange={(e) => setQuizAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !quizResult && quizAnswer && checkQuizAnswer()}
          placeholder="Nhập đáp án..."
          disabled={quizResult !== null}
          className="w-full p-4 rounded-xl border-2 border-border bg-card text-lg focus:border-primary focus:outline-none"
          autoFocus
        />
        {quizResult !== null && (
          <div className={`p-4 rounded-xl ${quizResult ? 'bg-green-50 dark:bg-green-900/20 border border-green-200' : 'bg-red-50 dark:bg-red-900/20 border border-red-200'}`}>
            <p className={`font-medium ${quizResult ? 'text-green-700' : 'text-red-700'}`}>
              {quizResult ? '✓ Chính xác!' : '✗ Chưa đúng'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Đọc: {char.reading} | Nghĩa: {char.meaning}</p>
          </div>
        )}
        <div className="flex justify-end">
          {quizResult === null ? (
            <Button onClick={checkQuizAnswer} disabled={!quizAnswer.trim()}>Kiểm tra</Button>
          ) : (
            <Button onClick={nextQuizChar}>
              {quizIndex < currentChars.length - 1 ? 'Tiếp →' : `Kết thúc (${quizScore.correct}/${quizScore.total})`}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Học chữ</h1>
        <p className="text-muted-foreground mt-1">Học bảng chữ cái và chữ Hán</p>
      </div>

      {/* Language selector */}
      <div className="flex gap-2 flex-wrap">
        {Object.entries(languageLabels).map(([code, info]) => (
          <button
            key={code}
            onClick={() => { setSelectedLang(code as any); setSelectedChar(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
              selectedLang === code
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary-200'
            }`}
          >
            <span>{info.flag}</span>
            <span className="text-sm font-medium">{info.name}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{languageLabels[selectedLang].charType} • {currentChars.length} ký tự</p>
        <Button variant="outline" onClick={startQuiz}>Kiểm tra</Button>
      </div>

      {/* Character grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
        {currentChars.map((char) => (
          <button
            key={char.character}
            onClick={() => setSelectedChar(selectedChar?.character === char.character ? null : char)}
            className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all hover:shadow-md ${
              selectedChar?.character === char.character
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:border-primary-300'
            }`}
          >
            <span className="text-3xl font-bold">{char.character}</span>
            <span className="text-xs text-muted-foreground mt-1">{char.reading.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Character detail */}
      {selectedChar && (
        <div className="p-6 rounded-2xl bg-card border border space-y-4">
          <div className="flex items-start gap-6">
            <div className="text-7xl font-bold">{selectedChar.character}</div>
            <div className="flex-1">
              <p className="text-lg font-semibold">{selectedChar.reading}</p>
              <p className="text-muted-foreground">{selectedChar.meaning}</p>
              <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                <span>Nét: {selectedChar.strokes}</span>
                {selectedChar.radical && <span>Bộ: {selectedChar.radical}</span>}
              </div>
            </div>
          </div>
          <div className="border-t border pt-4">
            <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Ví dụ từ vựng</p>
            <div className="space-y-2">
              {selectedChar.examples.map((ex, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <span className="text-lg font-bold">{ex.word}</span>
                  <span className="text-sm text-muted-foreground">({ex.reading})</span>
                  <span className="text-sm text-muted-foreground ml-auto">{ex.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
