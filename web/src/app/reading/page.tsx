'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ReadingPassage {
  id: string;
  title: string;
  titleVi: string;
  level: string;
  language: string;
  text: string;
  translation: string;
  questions: { question: string; options: string[]; answer: string; explanation: string }[];
}

const passages: Record<string, ReadingPassage[]> = {
  en: [
    {
      id: '1', title: 'My Daily Routine', titleVi: 'Thói quen hàng ngày', level: 'Beginner', language: 'en',
      text: 'I wake up at 6:30 every morning. First, I brush my teeth and take a shower. Then I have breakfast with my family. I usually eat bread and drink milk. After breakfast, I go to work by bus. It takes about 30 minutes. I work from 8:00 to 5:00. After work, I go to the gym for one hour. I come home at 7:00 and have dinner. Before bed, I read a book for 30 minutes. I go to sleep at 10:30.',
      translation: 'Tôi thức dậy lúc 6:30 mỗi sáng. Đầu tiên, tôi đánh răng và tắm. Sau đó tôi ăn sáng với gia đình. Tôi thường ăn bánh mì và uống sữa. Sau bữa sáng, tôi đi làm bằng xe buýt. Mất khoảng 30 phút. Tôi làm việc từ 8:00 đến 5:00. Sau giờ làm, tôi đi tập gym 1 tiếng. Tôi về nhà lúc 7:00 và ăn tối. Trước khi ngủ, tôi đọc sách 30 phút. Tôi đi ngủ lúc 10:30.',
      questions: [
        { question: 'What time does the person wake up?', options: ['6:00', '6:30', '7:00', '7:30'], answer: '6:30', explanation: '"I wake up at 6:30 every morning."' },
        { question: 'How does the person go to work?', options: ['By car', 'By bus', 'By train', 'On foot'], answer: 'By bus', explanation: '"I go to work by bus."' },
        { question: 'What does the person do before bed?', options: ['Watch TV', 'Exercise', 'Read a book', 'Listen to music'], answer: 'Read a book', explanation: '"Before bed, I read a book for 30 minutes."' },
        { question: 'How long does the person work each day?', options: ['7 hours', '8 hours', '9 hours', '10 hours'], answer: '9 hours', explanation: '"I work from 8:00 to 5:00" = 9 hours.' },
      ],
    },
    {
      id: '2', title: 'The Weather Report', titleVi: 'Bản tin thời tiết', level: 'Elementary', language: 'en',
      text: 'Good morning! Here is today\'s weather report for Ho Chi Minh City. This morning will be sunny with temperatures around 28 degrees. In the afternoon, expect some clouds and the temperature will rise to 34 degrees. There is a 40% chance of rain in the evening, so please bring an umbrella if you go out tonight. Tomorrow will be cooler with temperatures between 25 and 30 degrees. The weekend looks sunny and perfect for outdoor activities. Have a great day!',
      translation: 'Chào buổi sáng! Đây là bản tin thời tiết hôm nay cho TP.HCM. Sáng nay trời nắng với nhiệt độ khoảng 28 độ. Buổi chiều sẽ có mây và nhiệt độ tăng lên 34 độ. Có 40% khả năng mưa vào buổi tối, nên hãy mang ô nếu bạn ra ngoài tối nay. Ngày mai sẽ mát hơn với nhiệt độ từ 25 đến 30 độ. Cuối tuần trời nắng và hoàn hảo cho hoạt động ngoài trời.',
      questions: [
        { question: 'What is the morning temperature?', options: ['25°C', '28°C', '30°C', '34°C'], answer: '28°C', explanation: '"temperatures around 28 degrees"' },
        { question: 'What should you bring in the evening?', options: ['A jacket', 'An umbrella', 'Sunglasses', 'A hat'], answer: 'An umbrella', explanation: '"please bring an umbrella if you go out tonight"' },
        { question: 'What will the weekend be like?', options: ['Rainy', 'Cloudy', 'Sunny', 'Windy'], answer: 'Sunny', explanation: '"The weekend looks sunny and perfect for outdoor activities."' },
        { question: 'What is the chance of rain in the evening?', options: ['20%', '30%', '40%', '50%'], answer: '40%', explanation: '"There is a 40% chance of rain in the evening"' },
      ],
    },
  ],
  ja: [
    {
      id: '3', title: '私の趣味', titleVi: 'Sở thích của tôi', level: 'Beginner', language: 'ja',
      text: '私の趣味は料理です。毎週末、新しいレシピを試します。日本料理が一番好きです。特にお寿司と天ぷらが好きです。先週、初めてラーメンを作りました。とてもおいしかったです。来週はカレーを作る予定です。料理は楽しいし、家族も喜びます。',
      translation: 'Sở thích của tôi là nấu ăn. Mỗi cuối tuần, tôi thử công thức mới. Tôi thích ẩm thực Nhật nhất. Đặc biệt tôi thích sushi và tempura. Tuần trước, lần đầu tiên tôi nấu ramen. Rất ngon. Tuần tới tôi dự định nấu cà ri. Nấu ăn vui và gia đình cũng vui.',
      questions: [
        { question: '趣味は何ですか？', options: ['読書', '料理', '旅行', '音楽'], answer: '料理', explanation: '"私の趣味は料理です。"' },
        { question: '先週何を作りましたか？', options: ['カレー', 'お寿司', 'ラーメン', '天ぷら'], answer: 'ラーメン', explanation: '"先週、初めてラーメンを作りました。"' },
        { question: '来週何を作る予定ですか？', options: ['ラーメン', 'お寿司', 'カレー', '天ぷら'], answer: 'カレー', explanation: '"来週はカレーを作る予定です。"' },
      ],
    },
  ],
  zh: [
    {
      id: '4', title: '我的学校', titleVi: 'Trường học của tôi', level: 'Beginner', language: 'zh',
      text: '我的学校很大。学校里有图书馆、食堂和运动场。我每天早上七点半到学校。上午有四节课，下午有两节课。我最喜欢的科目是数学和英语。午饭在食堂吃，食堂的菜很好吃。放学后，我和朋友一起打篮球。',
      translation: 'Trường tôi rất lớn. Trong trường có thư viện, nhà ăn và sân vận động. Tôi đến trường lúc 7:30 mỗi sáng. Buổi sáng có 4 tiết, buổi chiều có 2 tiết. Môn tôi thích nhất là toán và tiếng Anh. Ăn trưa ở nhà ăn, đồ ăn ở nhà ăn rất ngon. Sau giờ học, tôi chơi bóng rổ với bạn.',
      questions: [
        { question: '学校里有什么？', options: ['游泳池', '图书馆', '电影院', '公园'], answer: '图书馆', explanation: '"学校里有图书馆、食堂和运动场。"' },
        { question: '最喜欢的科目是什么？', options: ['语文和历史', '数学和英语', '体育和音乐', '科学和地理'], answer: '数学和英语', explanation: '"我最喜欢的科目是数学和英语。"' },
        { question: '放学后做什么？', options: ['看书', '打篮球', '游泳', '画画'], answer: '打篮球', explanation: '"放学后，我和朋友一起打篮球。"' },
      ],
    },
  ],
  ko: [
    {
      id: '5', title: '나의 하루', titleVi: 'Một ngày của tôi', level: 'Beginner', language: 'ko',
      text: '저는 매일 아침 7시에 일어납니다. 아침을 먹고 8시에 학교에 갑니다. 학교에서 한국어와 수학을 공부합니다. 점심은 학교 식당에서 먹습니다. 오후 3시에 수업이 끝납니다. 방과 후에 친구와 카페에 갑니다. 저녁에는 집에서 드라마를 봅니다. 11시에 잡니다.',
      translation: 'Tôi dậy lúc 7 giờ mỗi sáng. Ăn sáng xong đi học lúc 8 giờ. Ở trường tôi học tiếng Hàn và toán. Ăn trưa ở nhà ăn trường. 3 giờ chiều hết giờ học. Sau giờ học đi cà phê với bạn. Buổi tối xem phim truyền hình ở nhà. 11 giờ đi ngủ.',
      questions: [
        { question: '몇 시에 일어납니까?', options: ['6시', '7시', '8시', '9시'], answer: '7시', explanation: '"매일 아침 7시에 일어납니다."' },
        { question: '방과 후에 무엇을 합니까?', options: ['운동', '카페에 감', '공부', '쇼핑'], answer: '카페에 감', explanation: '"방과 후에 친구와 카페에 갑니다."' },
        { question: '저녁에 무엇을 합니까?', options: ['공부', '운동', '드라마를 봄', '요리'], answer: '드라마를 봄', explanation: '"저녁에는 집에서 드라마를 봅니다."' },
      ],
    },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function ReadingPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedPassage, setSelectedPassage] = useState<ReadingPassage | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const currentPassages = passages[selectedLang] || [];

  const selectAnswer = (qIndex: number, answer: string) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qIndex]: answer }));
  };

  const checkAnswers = () => setShowResults(true);

  const getScore = () => {
    if (!selectedPassage) return 0;
    let correct = 0;
    selectedPassage.questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    return correct;
  };

  const resetPassage = () => {
    setAnswers({});
    setShowResults(false);
    setShowTranslation(false);
  };

  if (!selectedPassage) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display">Đọc hiểu</h1>
          <p className="text-muted-foreground mt-1">Đọc bài văn và trả lời câu hỏi</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
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

        <div className="grid gap-4">
          {currentPassages.map((passage) => (
            <button
              key={passage.id}
              onClick={() => { setSelectedPassage(passage); resetPassage(); }}
              className="p-5 rounded-2xl bg-card border border text-left hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{passage.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{passage.titleVi}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium">
                  {passage.level}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{passage.questions.length} câu hỏi</p>
            </button>
          ))}
        </div>

        {currentPassages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📖</div>
            <p className="text-muted-foreground">Chưa có bài đọc cho ngôn ngữ này.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => setSelectedPassage(null)} className="text-sm text-primary hover:underline">← Quay lại</button>
        <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700 font-medium">{selectedPassage.level}</span>
      </div>

      {/* Passage */}
      <div className="p-6 rounded-2xl bg-card border border">
        <h2 className="font-bold text-lg mb-3">{selectedPassage.title}</h2>
        <p className="text-base leading-relaxed whitespace-pre-line">{selectedPassage.text}</p>
        {showTranslation && (
          <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border italic">
            {selectedPassage.translation}
          </p>
        )}
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="text-xs text-primary hover:underline mt-3"
        >
          {showTranslation ? 'Ẩn bản dịch' : 'Xem bản dịch'}
        </button>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        <h3 className="font-semibold">Câu hỏi:</h3>
        {selectedPassage.questions.map((q, qIndex) => (
          <div key={qIndex} className="p-4 rounded-xl bg-card border border">
            <p className="font-medium text-sm mb-3">{qIndex + 1}. {q.question}</p>
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((option) => {
                let styles = 'border-border hover:border-primary-300';
                if (showResults) {
                  if (option === q.answer) {
                    styles = 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700';
                  } else if (option === answers[qIndex] && option !== q.answer) {
                    styles = 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700';
                  } else {
                    styles = 'border-border opacity-50';
                  }
                } else if (answers[qIndex] === option) {
                  styles = 'border-primary bg-primary/5';
                }

                return (
                  <button
                    key={option}
                    onClick={() => selectAnswer(qIndex, option)}
                    disabled={showResults}
                    className={`p-3 rounded-lg border-2 text-sm text-left transition-all ${styles}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {showResults && answers[qIndex] !== q.answer && (
              <p className="text-xs text-muted-foreground mt-2 italic">{q.explanation}</p>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      {!showResults ? (
        <Button
          onClick={checkAnswers}
          disabled={Object.keys(answers).length < selectedPassage.questions.length}
          className="w-full"
        >
          Kiểm tra ({Object.keys(answers).length}/{selectedPassage.questions.length} đã trả lời)
        </Button>
      ) : (
        <div className="p-4 rounded-xl bg-card border border text-center">
          <p className="text-lg font-bold">
            Kết quả: {getScore()}/{selectedPassage.questions.length}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {getScore() === selectedPassage.questions.length ? 'Hoàn hảo!' : 'Hãy đọc lại bài và thử lại!'}
          </p>
          <div className="flex gap-3 justify-center mt-3">
            <Button variant="outline" onClick={resetPassage}>Thử lại</Button>
            <Button onClick={() => setSelectedPassage(null)}>Bài khác</Button>
          </div>
        </div>
      )}
    </div>
  );
}
