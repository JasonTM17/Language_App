'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AudioPlayer } from '@/components/ui/audio-player';
import { Celebration } from '@/components/ui/celebration';
import { XpPopup } from '@/components/ui/xp-popup';
import { Headphones } from 'lucide-react';
import type { SupportedLanguage } from '@/services/audio';

interface ListeningExercise {
  id: string;
  language: string;
  text: string;
  translation: string;
  options: string[];
  correctAnswer: number;
  audioText: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const exercises: Record<string, ListeningExercise[]> = {
  en: [
    { id: '1', language: 'en', text: 'What did you hear?', translation: 'Bạn nghe được gì?', audioText: 'I would like a cup of coffee, please.', options: ['I would like a cup of coffee, please.', 'I would like a cup of tea, please.', 'I would like a glass of water, please.', 'I would like a piece of cake, please.'], correctAnswer: 0, difficulty: 'easy' },
    { id: '2', language: 'en', text: 'What did you hear?', translation: 'Bạn nghe được gì?', audioText: 'The train leaves at nine thirty.', options: ['The train leaves at nine thirty.', 'The train leaves at nine fifteen.', 'The bus leaves at nine thirty.', 'The train arrives at nine thirty.'], correctAnswer: 0, difficulty: 'easy' },
    { id: '3', language: 'en', text: 'What did you hear?', translation: 'Bạn nghe được gì?', audioText: 'Can you help me find the library?', options: ['Can you help me find the hospital?', 'Can you help me find the library?', 'Can you help me find the station?', 'Can you show me the library?'], correctAnswer: 1, difficulty: 'easy' },
    { id: '4', language: 'en', text: 'What did you hear?', translation: 'Bạn nghe được gì?', audioText: 'My sister works at a bank downtown.', options: ['My sister works at a bank downtown.', 'My brother works at a bank downtown.', 'My sister works at a school downtown.', 'My sister lives near a bank downtown.'], correctAnswer: 0, difficulty: 'medium' },
    { id: '5', language: 'en', text: 'What did you hear?', translation: 'Bạn nghe được gì?', audioText: 'The meeting has been postponed until next week.', options: ['The meeting has been cancelled.', 'The meeting has been postponed until next week.', 'The meeting will start next week.', 'The meeting has been moved to today.'], correctAnswer: 1, difficulty: 'medium' },
    { id: '6', language: 'en', text: 'What did you hear?', translation: 'Bạn nghe được gì?', audioText: 'She graduated from university with honors last year.', options: ['She graduated from university with honors last year.', 'She graduated from college with honors last year.', 'She graduated from university last year.', 'She will graduate from university with honors.'], correctAnswer: 0, difficulty: 'hard' },
    { id: '25', language: 'en', text: 'What did you hear?', translation: 'Bạn nghe được gì?', audioText: 'The pharmacy is on the corner of Main Street.', options: ['The pharmacy is on the corner of Main Street.', 'The pharmacy is on the corner of Park Street.', 'The hospital is on the corner of Main Street.', 'The pharmacy is at the end of Main Street.'], correctAnswer: 0, difficulty: 'medium' },
    { id: '26', language: 'en', text: 'What did you hear?', translation: 'Bạn nghe được gì?', audioText: 'We need to finish this project by Friday afternoon.', options: ['We need to finish this project by Friday morning.', 'We need to start this project by Friday afternoon.', 'We need to finish this project by Friday afternoon.', 'We need to finish this report by Friday afternoon.'], correctAnswer: 2, difficulty: 'medium' },
    { id: '27', language: 'en', text: 'What did you hear?', translation: 'Bạn nghe được gì?', audioText: 'The children are playing in the park after school.', options: ['The children are playing in the park after school.', 'The children are studying in the park after school.', 'The children are playing in the garden after school.', 'The children are playing in the park before school.'], correctAnswer: 0, difficulty: 'easy' },
    { id: '28', language: 'en', text: 'What did you hear?', translation: 'Bạn nghe được gì?', audioText: 'I have been waiting for the bus for twenty minutes.', options: ['I have been waiting for the bus for thirty minutes.', 'I have been waiting for the train for twenty minutes.', 'I have been waiting for the bus for twenty minutes.', 'I have been looking for the bus for twenty minutes.'], correctAnswer: 2, difficulty: 'hard' },
  ],
  ja: [
    { id: '7', language: 'ja', text: '何を聞きましたか？', translation: 'Bạn nghe được gì?', audioText: 'すみません、駅はどこですか？', options: ['すみません、駅はどこですか？', 'すみません、学校はどこですか？', 'すみません、病院はどこですか？', 'すみません、銀行はどこですか？'], correctAnswer: 0, difficulty: 'easy' },
    { id: '8', language: 'ja', text: '何を聞きましたか？', translation: 'Bạn nghe được gì?', audioText: '明日は日曜日です。', options: ['明日は月曜日です。', '明日は日曜日です。', '今日は日曜日です。', '明日は土曜日です。'], correctAnswer: 1, difficulty: 'easy' },
    { id: '9', language: 'ja', text: '何を聞きましたか？', translation: 'Bạn nghe được gì?', audioText: '私は毎朝七時に起きます。', options: ['私は毎朝七時に起きます。', '私は毎朝六時に起きます。', '私は毎晩七時に寝ます。', '私は毎朝八時に起きます。'], correctAnswer: 0, difficulty: 'medium' },
    { id: '10', language: 'ja', text: '何を聞きましたか？', translation: 'Bạn nghe được gì?', audioText: '来週の月曜日に会議があります。', options: ['来週の火曜日に会議があります。', '今週の月曜日に会議があります。', '来週の月曜日に会議があります。', '来週の月曜日に授業があります。'], correctAnswer: 2, difficulty: 'medium' },
    { id: '19', language: 'ja', text: '何を聞きましたか？', translation: 'Bạn nghe được gì?', audioText: '彼女は三年間日本語を勉強しています。', options: ['彼女は三年間日本語を勉強しています。', '彼女は二年間日本語を勉強しています。', '彼は三年間日本語を勉強しています。', '彼女は三年間中国語を勉強しています。'], correctAnswer: 0, difficulty: 'hard' },
    { id: '20', language: 'ja', text: '何を聞きましたか？', translation: 'Bạn nghe được gì?', audioText: '空港までタクシーで四十分くらいかかります。', options: ['空港までバスで四十分くらいかかります。', '駅までタクシーで四十分くらいかかります。', '空港までタクシーで三十分くらいかかります。', '空港までタクシーで四十分くらいかかります。'], correctAnswer: 3, difficulty: 'hard' },
    { id: '29', language: 'ja', text: '何を聞きましたか？', translation: 'Bạn nghe được gì?', audioText: '週末に友達と映画を見に行きます。', options: ['週末に友達と映画を見に行きます。', '週末に家族と映画を見に行きます。', '週末に友達と買い物に行きます。', '来週に友達と映画を見に行きます。'], correctAnswer: 0, difficulty: 'easy' },
    { id: '30', language: 'ja', text: '何を聞きましたか？', translation: 'Bạn nghe được gì?', audioText: 'この料理はとてもおいしいですね。', options: ['この料理はとても辛いですね。', 'この料理はとてもおいしいですね。', 'あの料理はとてもおいしいですね。', 'この飲み物はとてもおいしいですね。'], correctAnswer: 1, difficulty: 'easy' },
    { id: '31', language: 'ja', text: '何を聞きましたか？', translation: 'Bạn nghe được gì?', audioText: '図書館は月曜日から金曜日まで開いています。', options: ['図書館は月曜日から土曜日まで開いています。', '図書館は火曜日から金曜日まで開いています。', '図書館は月曜日から金曜日まで開いています。', '美術館は月曜日から金曜日まで開いています。'], correctAnswer: 2, difficulty: 'medium' },
    { id: '32', language: 'ja', text: '何を聞きましたか？', translation: 'Bạn nghe được gì?', audioText: '昨日の夜、雨が降ったので道が濡れています。', options: ['昨日の朝、雨が降ったので道が濡れています。', '昨日の夜、雪が降ったので道が濡れています。', '昨日の夜、雨が降ったので道が濡れています。', '昨日の夜、雨が降ったので電車が止まりました。'], correctAnswer: 2, difficulty: 'hard' },
  ],
  zh: [
    { id: '11', language: 'zh', text: '你听到了什么？', translation: 'Bạn nghe được gì?', audioText: '请问，洗手间在哪里？', options: ['请问，洗手间在哪里？', '请问，图书馆在哪里？', '请问，餐厅在哪里？', '请问，医院在哪里？'], correctAnswer: 0, difficulty: 'easy' },
    { id: '12', language: 'zh', text: '你听到了什么？', translation: 'Bạn nghe được gì?', audioText: '我想买一杯咖啡。', options: ['我想买一杯茶。', '我想喝一杯水。', '我想买一杯咖啡。', '我想吃一个面包。'], correctAnswer: 2, difficulty: 'easy' },
    { id: '13', language: 'zh', text: '你听到了什么？', translation: 'Bạn nghe được gì?', audioText: '今天的天气非常好。', options: ['今天的天气非常好。', '昨天的天气非常好。', '今天的天气不太好。', '明天的天气非常好。'], correctAnswer: 0, difficulty: 'medium' },
    { id: '14', language: 'zh', text: '你听到了什么？', translation: 'Bạn nghe được gì?', audioText: '我每天早上六点半起床。', options: ['我每天早上七点起床。', '我每天早上六点半起床。', '我每天晚上六点半睡觉。', '我每天早上六点起床。'], correctAnswer: 1, difficulty: 'medium' },
    { id: '21', language: 'zh', text: '你听到了什么？', translation: 'Bạn nghe được gì?', audioText: '她在北京大学学了四年中文。', options: ['她在北京大学学了四年中文。', '她在北京大学学了三年中文。', '他在北京大学学了四年中文。', '她在上海大学学了四年中文。'], correctAnswer: 0, difficulty: 'hard' },
    { id: '22', language: 'zh', text: '你听到了什么？', translation: 'Bạn nghe được gì?', audioText: '从这里坐地铁到机场大概要一个小时。', options: ['从这里坐公交到机场大概要一个小时。', '从这里坐地铁到火车站大概要一个小时。', '从这里坐地铁到机场大概要半个小时。', '从这里坐地铁到机场大概要一个小时。'], correctAnswer: 3, difficulty: 'hard' },
    { id: '33', language: 'zh', text: '你听到了什么？', translation: 'Bạn nghe được gì?', audioText: '周末我和朋友去看电影。', options: ['周末我和朋友去看电影。', '周末我和家人去看电影。', '周末我和朋友去逛街。', '下周我和朋友去看电影。'], correctAnswer: 0, difficulty: 'easy' },
    { id: '34', language: 'zh', text: '你听到了什么？', translation: 'Bạn nghe được gì?', audioText: '这道菜非常好吃，你要不要尝一下？', options: ['这道菜非常辣，你要不要尝一下？', '这道菜非常好吃，你要不要尝一下？', '那道菜非常好吃，你要不要尝一下？', '这道菜非常好吃，你想不想试试？'], correctAnswer: 1, difficulty: 'medium' },
    { id: '35', language: 'zh', text: '你听到了什么？', translation: 'Bạn nghe được gì?', audioText: '图书馆从星期一到星期五开放。', options: ['图书馆从星期一到星期六开放。', '图书馆从星期二到星期五开放。', '图书馆从星期一到星期五开放。', '博物馆从星期一到星期五开放。'], correctAnswer: 2, difficulty: 'medium' },
    { id: '36', language: 'zh', text: '你听到了什么？', translation: 'Bạn nghe được gì?', audioText: '昨天晚上下雨了，所以路上很滑。', options: ['昨天早上下雨了，所以路上很滑。', '昨天晚上下雪了，所以路上很滑。', '昨天晚上下雨了，所以路上很滑。', '昨天晚上下雨了，所以电车停了。'], correctAnswer: 2, difficulty: 'hard' },
  ],
  ko: [
    { id: '15', language: 'ko', text: '무엇을 들었습니까?', translation: 'Bạn nghe được gì?', audioText: '화장실이 어디에 있어요?', options: ['화장실이 어디에 있어요?', '도서관이 어디에 있어요?', '식당이 어디에 있어요?', '병원이 어디에 있어요?'], correctAnswer: 0, difficulty: 'easy' },
    { id: '16', language: 'ko', text: '무엇을 들었습니까?', translation: 'Bạn nghe được gì?', audioText: '커피 한 잔 주세요.', options: ['물 한 잔 주세요.', '커피 한 잔 주세요.', '차 한 잔 주세요.', '맥주 한 잔 주세요.'], correctAnswer: 1, difficulty: 'easy' },
    { id: '17', language: 'ko', text: '무엇을 들었습니까?', translation: 'Bạn nghe được gì?', audioText: '저는 매일 아침 일곱 시에 일어나요.', options: ['저는 매일 아침 일곱 시에 일어나요.', '저는 매일 아침 여섯 시에 일어나요.', '저는 매일 저녁 일곱 시에 자요.', '저는 매일 아침 여덟 시에 일어나요.'], correctAnswer: 0, difficulty: 'medium' },
    { id: '18', language: 'ko', text: '무엇을 들었습니까?', translation: 'Bạn nghe được gì?', audioText: '다음 주 월요일에 회의가 있어요.', options: ['이번 주 월요일에 회의가 있어요.', '다음 주 화요일에 회의가 있어요.', '다음 주 월요일에 회의가 있어요.', '다음 주 월요일에 수업이 있어요.'], correctAnswer: 2, difficulty: 'medium' },
    { id: '23', language: 'ko', text: '무엇을 들었습니까?', translation: 'Bạn nghe được gì?', audioText: '그녀는 삼 년 동안 한국어를 공부하고 있어요.', options: ['그녀는 삼 년 동안 한국어를 공부하고 있어요.', '그녀는 이 년 동안 한국어를 공부하고 있어요.', '그는 삼 년 동안 한국어를 공부하고 있어요.', '그녀는 삼 년 동안 일본어를 공부하고 있어요.'], correctAnswer: 0, difficulty: 'hard' },
    { id: '24', language: 'ko', text: '무엇을 들었습니까?', translation: 'Bạn nghe được gì?', audioText: '여기서 지하철로 공항까지 한 시간쯤 걸려요.', options: ['여기서 버스로 공항까지 한 시간쯤 걸려요.', '여기서 지하철로 역까지 한 시간쯤 걸려요.', '여기서 지하철로 공항까지 삼십 분쯤 걸려요.', '여기서 지하철로 공항까지 한 시간쯤 걸려요.'], correctAnswer: 3, difficulty: 'hard' },
    { id: '37', language: 'ko', text: '무엇을 들었습니까?', translation: 'Bạn nghe được gì?', audioText: '주말에 친구와 영화를 보러 가요.', options: ['주말에 친구와 영화를 보러 가요.', '주말에 가족과 영화를 보러 가요.', '주말에 친구와 쇼핑을 하러 가요.', '다음 주에 친구와 영화를 보러 가요.'], correctAnswer: 0, difficulty: 'easy' },
    { id: '38', language: 'ko', text: '무엇을 들었습니까?', translation: 'Bạn nghe được gì?', audioText: '이 음식은 정말 맛있어요.', options: ['이 음식은 정말 매워요.', '이 음식은 정말 맛있어요.', '그 음식은 정말 맛있어요.', '이 음료는 정말 맛있어요.'], correctAnswer: 1, difficulty: 'easy' },
    { id: '39', language: 'ko', text: '무엇을 들었습니까?', translation: 'Bạn nghe được gì?', audioText: '도서관은 월요일부터 금요일까지 열어요.', options: ['도서관은 월요일부터 토요일까지 열어요.', '도서관은 화요일부터 금요일까지 열어요.', '도서관은 월요일부터 금요일까지 열어요.', '박물관은 월요일부터 금요일까지 열어요.'], correctAnswer: 2, difficulty: 'medium' },
    { id: '40', language: 'ko', text: '무엇을 들었습니까?', translation: 'Bạn nghe được gì?', audioText: '어젯밤에 비가 와서 길이 미끄러워요.', options: ['어제 아침에 비가 와서 길이 미끄러워요.', '어젯밤에 눈이 와서 길이 미끄러워요.', '어젯밤에 비가 와서 길이 미끄러워요.', '어젯밤에 비가 와서 전철이 멈췄어요.'], correctAnswer: 2, difficulty: 'hard' },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Tiếng Nhật', flag: '🇯🇵' },
  { code: 'zh', name: 'Tiếng Trung', flag: '🇨🇳' },
  { code: 'ko', name: 'Tiếng Hàn', flag: '🇰🇷' },
];

export default function ListeningPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showXp, setShowXp] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentExercises = exercises[selectedLang] || [];
  const currentExercise = currentExercises[currentIndex];

  const checkAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === currentExercise.correctAnswer;
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));

      const baseXp = currentExercise.difficulty === 'hard' ? 15 : currentExercise.difficulty === 'medium' ? 10 : 5;
      const streakBonus = Math.min(newStreak * 2, 10);
      const earned = baseXp + streakBonus;
      setXpAmount(earned);
      setShowXp(true);

      if (newStreak >= 3 && newStreak % 3 === 0) {
        setShowCelebration(true);
      }
    } else {
      setStreak(0);
      setScore(prev => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const nextExercise = () => {
    if (currentIndex < currentExercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsCompleted(true);
    }
  };

  const resetExercises = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto text-center py-16 space-y-6"
      >
        {percentage >= 80 && <Celebration type="stars" duration={3000} />}
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" /></svg>
        </div>
        <h2 className="text-2xl font-bold">Hoàn thành!</h2>
        <div className="inline-flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{score.correct}/{score.total}</div>
            <div className="text-xs text-muted-foreground">Câu đúng</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">{percentage}%</div>
            <div className="text-xs text-muted-foreground">Chính xác</div>
          </div>
        </div>
        <p className="text-muted-foreground">
          {percentage >= 90 ? 'Tuyệt vời! Khả năng nghe của bạn rất tốt!' :
           percentage >= 70 ? 'Rất tốt! Tiếp tục luyện tập nhé!' :
           'Hãy nghe lại nhiều lần để cải thiện!'}
        </p>
        <Button onClick={resetExercises} size="lg">Làm lại</Button>
      </motion.div>
    );
  }

  if (!currentExercise) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto text-center py-16"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
          <Headphones className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Chưa có bài nghe</h3>
        <p className="text-muted-foreground">Chọn ngôn ngữ để bắt đầu luyện nghe.</p>
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
      {showCelebration && <Celebration type="sparkles" onComplete={() => setShowCelebration(false)} />}
      {showXp && <XpPopup amount={xpAmount} onComplete={() => setShowXp(false)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Luyện nghe</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Nghe và chọn đáp án đúng</p>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
            <span className="text-sm">🔥</span>
            <span className="text-sm font-bold">{streak}</span>
          </div>
        )}
      </div>

      {/* Language selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => { setSelectedLang(lang.code); resetExercises(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all whitespace-nowrap ${
              selectedLang === lang.code
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border hover:border-primary/30'
            }`}
          >
            <span>{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
            style={{ width: `${currentExercises.length > 0 ? Math.min(((currentIndex + 1) / currentExercises.length) * 100, 100) : 0}%` }}
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{currentIndex + 1}/{currentExercises.length}</span>
          <span className="text-green-500 font-medium">{score.correct} đúng</span>
        </div>
      </div>

      {/* Audio player card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 text-center space-y-4"
      >
        <p className="text-sm text-muted-foreground">{currentExercise.translation}</p>

        <div className="flex justify-center">
          <AudioPlayer
            text={currentExercise.audioText}
            language={selectedLang as SupportedLanguage}
            size="lg"
            showSlowButton={true}
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            currentExercise.difficulty === 'hard' ? 'bg-red-100 dark:bg-red-900/20 text-red-600' :
            currentExercise.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600' :
            'bg-green-100 dark:bg-green-900/20 text-green-600'
          }`}>
            {currentExercise.difficulty === 'hard' ? 'Khó' : currentExercise.difficulty === 'medium' ? 'Trung bình' : 'Dễ'}
          </span>
        </div>
      </motion.div>

      {/* Options */}
      <div className="space-y-3">
        {currentExercise.options.map((option, i) => {
          let styles = 'border-border hover:border-primary/40 hover:bg-primary/5';
          let icon = '';

          if (showResult) {
            if (i === currentExercise.correctAnswer) {
              styles = 'border-green-500 bg-green-50 dark:bg-green-900/10';
              icon = '✓';
            } else if (i === selectedAnswer && i !== currentExercise.correctAnswer) {
              styles = 'border-red-500 bg-red-50 dark:bg-red-900/10';
              icon = '✗';
            } else {
              styles = 'border-border opacity-50';
            }
          } else if (selectedAnswer === i) {
            styles = 'border-primary bg-primary/5';
          }

          return (
            <button
              key={i}
              onClick={() => checkAnswer(i)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${styles}`}
            >
              <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                {icon || String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback & Next */}
      {showResult && (
        <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
          <div className={`p-4 rounded-xl border ${
            selectedAnswer === currentExercise.correctAnswer
              ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
          }`}>
            <p className="text-sm font-medium">
              {selectedAnswer === currentExercise.correctAnswer
                ? '🎉 Chính xác! Tuyệt vời!'
                : `❌ Sai rồi. Đáp án đúng là: "${currentExercise.options[currentExercise.correctAnswer]}"`
              }
            </p>
          </div>

          <div className="flex justify-end">
            <Button onClick={nextExercise} size="lg" className="gap-1">
              {currentIndex < currentExercises.length - 1 ? 'Câu tiếp →' : 'Xem kết quả'}
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
