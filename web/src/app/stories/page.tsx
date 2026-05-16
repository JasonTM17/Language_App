'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface StoryChoice {
  text: string;
  correct: boolean;
  feedback: string;
}

interface StorySegment {
  text: string;
  translation: string;
  question?: string;
  choices?: StoryChoice[];
}

interface Story {
  id: string;
  title: string;
  titleVi: string;
  level: string;
  language: string;
  segments: StorySegment[];
}

const stories: Record<string, Story[]> = {
  en: [
    {
      id: '1', title: 'A Day at the Market', titleVi: 'Một ngày ở chợ', level: 'Beginner', language: 'en',
      segments: [
        { text: 'Sarah goes to the market every Saturday morning.', translation: 'Sarah đi chợ mỗi sáng thứ Bảy.' },
        { text: 'She needs to buy vegetables and fruit for the week.', translation: 'Cô ấy cần mua rau và trái cây cho tuần.' },
        {
          text: '"Good morning! How much are the tomatoes?" she asks.',
          translation: '"Chào buổi sáng! Cà chua bao nhiêu tiền?" cô ấy hỏi.',
          question: 'Sarah muốn mua gì?',
          choices: [
            { text: 'Tomatoes', correct: true, feedback: 'Đúng! Sarah hỏi giá cà chua.' },
            { text: 'Oranges', correct: false, feedback: 'Sai. Cô ấy hỏi về tomatoes (cà chua).' },
            { text: 'Bread', correct: false, feedback: 'Sai. Cô ấy hỏi về tomatoes (cà chua).' },
          ],
        },
        { text: '"Two dollars per kilogram," the seller replies.', translation: '"Hai đô la một ký," người bán trả lời.' },
        { text: '"I\'ll take two kilograms, please," Sarah says.', translation: '"Cho tôi hai ký nhé," Sarah nói.' },
        {
          text: 'She also buys apples, carrots, and a watermelon.',
          translation: 'Cô ấy cũng mua táo, cà rốt, và một quả dưa hấu.',
          question: 'Sarah mua bao nhiêu ký cà chua?',
          choices: [
            { text: 'One kilogram', correct: false, feedback: 'Sai. Cô ấy nói "two kilograms".' },
            { text: 'Two kilograms', correct: true, feedback: 'Đúng! "I\'ll take two kilograms."' },
            { text: 'Three kilograms', correct: false, feedback: 'Sai. Cô ấy nói "two kilograms".' },
          ],
        },
        { text: 'The total is fifteen dollars. Sarah pays and walks home happily.', translation: 'Tổng cộng là mười lăm đô la. Sarah trả tiền và vui vẻ đi về nhà.' },
      ],
    },
    {
      id: '2', title: 'The New Student', titleVi: 'Học sinh mới', level: 'Beginner', language: 'en',
      segments: [
        { text: 'Today is Tom\'s first day at a new school.', translation: 'Hôm nay là ngày đầu tiên của Tom ở trường mới.' },
        { text: 'He feels nervous but excited.', translation: 'Anh ấy cảm thấy hồi hộp nhưng phấn khích.' },
        {
          text: 'A girl walks up to him. "Hi! I\'m Lisa. Are you new here?"',
          translation: 'Một cô gái đi đến. "Chào! Mình là Lisa. Bạn mới đến à?"',
          question: 'Tom cảm thấy thế nào?',
          choices: [
            { text: 'Angry and sad', correct: false, feedback: 'Sai. Anh ấy "nervous but excited".' },
            { text: 'Nervous but excited', correct: true, feedback: 'Đúng! Hồi hộp nhưng phấn khích.' },
            { text: 'Bored and tired', correct: false, feedback: 'Sai. Anh ấy "nervous but excited".' },
          ],
        },
        { text: '"Yes, I just moved here from Vietnam," Tom replies with a smile.', translation: '"Vâng, mình vừa chuyển đến từ Việt Nam," Tom trả lời với nụ cười.' },
        { text: '"That\'s cool! Let me show you around," Lisa says.', translation: '"Tuyệt! Để mình dẫn bạn đi xem quanh," Lisa nói.' },
        {
          text: 'Lisa shows Tom the library, the cafeteria, and the playground.',
          translation: 'Lisa dẫn Tom xem thư viện, nhà ăn, và sân chơi.',
          question: 'Tom đến từ đâu?',
          choices: [
            { text: 'Japan', correct: false, feedback: 'Sai. Tom nói "from Vietnam".' },
            { text: 'Vietnam', correct: true, feedback: 'Đúng! "I just moved here from Vietnam."' },
            { text: 'Korea', correct: false, feedback: 'Sai. Tom nói "from Vietnam".' },
          ],
        },
        { text: '"Thank you, Lisa! You\'re very kind," Tom says. He feels happy to have a new friend.', translation: '"Cảm ơn Lisa! Bạn rất tốt bụng," Tom nói. Anh ấy vui vì có bạn mới.' },
      ],
    },
  ],
  ja: [
    {
      id: '3', title: 'コンビニで', titleVi: 'Ở cửa hàng tiện lợi', level: 'Beginner', language: 'ja',
      segments: [
        { text: '田中さんはコンビニに行きます。', translation: 'Anh Tanaka đi đến cửa hàng tiện lợi.' },
        { text: 'おにぎりとお茶を買いたいです。', translation: 'Anh ấy muốn mua onigiri và trà.' },
        {
          text: '「すみません、おにぎりはどこですか？」と聞きます。',
          translation: '"Xin lỗi, onigiri ở đâu?" anh ấy hỏi.',
          question: '田中さんは何を買いたいですか？',
          choices: [
            { text: 'おにぎりとお茶', correct: true, feedback: '正解！おにぎりとお茶を買いたいです。' },
            { text: 'パンと牛乳', correct: false, feedback: '違います。おにぎりとお茶です。' },
            { text: 'お弁当とジュース', correct: false, feedback: '違います。おにぎりとお茶です。' },
          ],
        },
        { text: '「あちらの棚にあります」と店員さんが言います。', translation: '"Ở kệ bên kia," nhân viên nói.' },
        { text: '田中さんは鮭のおにぎりを二つ選びます。', translation: 'Anh Tanaka chọn hai cái onigiri cá hồi.' },
        {
          text: '全部で350円です。「ありがとうございます！」',
          translation: 'Tổng cộng 350 yên. "Cảm ơn!"',
          question: 'おにぎりはいくつ買いましたか？',
          choices: [
            { text: '一つ', correct: false, feedback: '違います。二つ選びました。' },
            { text: '二つ', correct: true, feedback: '正解！二つ選びました。' },
            { text: '三つ', correct: false, feedback: '違います。二つ選びました。' },
          ],
        },
      ],
    },
  ],
  zh: [
    {
      id: '4', title: '在餐厅', titleVi: 'Ở nhà hàng', level: 'Beginner', language: 'zh',
      segments: [
        { text: '小明和朋友去餐厅吃饭。', translation: 'Tiểu Minh và bạn đi nhà hàng ăn cơm.' },
        { text: '他们看菜单，有很多好吃的菜。', translation: 'Họ xem thực đơn, có rất nhiều món ngon.' },
        {
          text: '「服务员，我要一碗米饭和一盘鱼。」小明说。',
          translation: '"Phục vụ ơi, tôi muốn một bát cơm và một đĩa cá." Tiểu Minh nói.',
          question: '小明点了什么？',
          choices: [
            { text: '米饭和鱼', correct: true, feedback: '对！一碗米饭和一盘鱼。' },
            { text: '面条和鸡肉', correct: false, feedback: '不对。他要米饭和鱼。' },
            { text: '饺子和汤', correct: false, feedback: '不对。他要米饭和鱼。' },
          ],
        },
        { text: '朋友点了炒面和可乐。', translation: 'Bạn anh ấy gọi mì xào và coca.' },
        { text: '菜很快就来了。「真好吃！」他们说。', translation: 'Món ăn đến rất nhanh. "Ngon thật!" họ nói.' },
        {
          text: '吃完以后，他们一共花了八十块钱。',
          translation: 'Ăn xong, họ tổng cộng tốn 80 tệ.',
          question: '朋友点了什么喝的？',
          choices: [
            { text: '茶', correct: false, feedback: '不对。朋友点了可乐。' },
            { text: '可乐', correct: true, feedback: '对！朋友点了可乐。' },
            { text: '果汁', correct: false, feedback: '不对。朋友点了可乐。' },
          ],
        },
      ],
    },
  ],
  ko: [
    {
      id: '5', title: '카페에서', titleVi: 'Ở quán cà phê', level: 'Beginner', language: 'ko',
      segments: [
        { text: '지민이는 카페에 갑니다.', translation: 'Jimin đi đến quán cà phê.' },
        { text: '오늘은 날씨가 추워서 따뜻한 음료를 마시고 싶습니다.', translation: 'Hôm nay trời lạnh nên muốn uống đồ uống nóng.' },
        {
          text: '「아메리카노 한 잔 주세요.」지민이가 말합니다.',
          translation: '"Cho tôi một ly americano." Jimin nói.',
          question: '왜 따뜻한 음료를 마시고 싶습니까?',
          choices: [
            { text: '날씨가 더워서', correct: false, feedback: '아닙니다. 날씨가 추워서입니다.' },
            { text: '날씨가 추워서', correct: true, feedback: '맞습니다! 날씨가 추워서 따뜻한 음료를 마시고 싶습니다.' },
            { text: '목이 말라서', correct: false, feedback: '아닙니다. 날씨가 추워서입니다.' },
          ],
        },
        { text: '「사이즈는요?」 직원이 물어봅니다.', translation: '"Size nào ạ?" nhân viên hỏi.' },
        { text: '「큰 사이즈로 주세요. 그리고 케이크도 하나 주세요.」', translation: '"Cho size lớn. Và cho thêm một cái bánh."' },
        {
          text: '지민이는 커피를 마시면서 책을 읽습니다. 행복한 오후입니다.',
          translation: 'Jimin vừa uống cà phê vừa đọc sách. Một buổi chiều hạnh phúc.',
          question: '지민이는 무엇을 주문했습니까?',
          choices: [
            { text: '아메리카노와 케이크', correct: true, feedback: '맞습니다! 아메리카노와 케이크를 주문했습니다.' },
            { text: '라떼와 쿠키', correct: false, feedback: '아닙니다. 아메리카노와 케이크입니다.' },
            { text: '녹차와 빵', correct: false, feedback: '아닙니다. 아메리카노와 케이크입니다.' },
          ],
        },
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

export default function StoriesPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, boolean>>({});
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const currentStories = stories[selectedLang] || [];

  const handleChoice = (choiceIndex: number, correct: boolean) => {
    setSelectedChoice(choiceIndex);
    if (correct && !answeredQuestions[currentSegment]) {
      setScore(prev => prev + 1);
    }
    setAnsweredQuestions(prev => ({ ...prev, [currentSegment]: true }));
  };

  const nextSegment = () => {
    if (selectedStory && currentSegment < selectedStory.segments.length - 1) {
      setCurrentSegment(prev => prev + 1);
      setSelectedChoice(null);
    }
  };

  const prevSegment = () => {
    if (currentSegment > 0) {
      setCurrentSegment(prev => prev - 1);
      setSelectedChoice(null);
    }
  };

  const startStory = (story: Story) => {
    setSelectedStory(story);
    setCurrentSegment(0);
    setAnsweredQuestions({});
    setSelectedChoice(null);
    setScore(0);
  };

  const backToList = () => {
    setSelectedStory(null);
  };

  if (!selectedStory) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display">Truyện đọc</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Đọc truyện ngắn và trả lời câu hỏi</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                selectedLang === lang.code
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-200'
              }`}
            >
              <span>{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {currentStories.map((story) => (
            <button
              key={story.id}
              onClick={() => startStory(story)}
              className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-left hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{story.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{story.titleVi}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium">
                  {story.level}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">{story.segments.length} đoạn</p>
            </button>
          ))}
        </div>

        {currentStories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📚</div>
            <p className="text-gray-500">Chưa có truyện cho ngôn ngữ này.</p>
          </div>
        )}
      </div>
    );
  }

  const segment = selectedStory.segments[currentSegment];
  const isLastSegment = currentSegment === selectedStory.segments.length - 1;
  const totalQuestions = selectedStory.segments.filter(s => s.question).length;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={backToList} className="text-sm text-primary-600 hover:underline">
          ← Quay lại
        </button>
        <span className="text-sm text-gray-500">{currentSegment + 1} / {selectedStory.segments.length}</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${((currentSegment + 1) / selectedStory.segments.length) * 100}%` }} />
      </div>

      {/* Story title */}
      <div className="text-center">
        <h2 className="text-xl font-bold">{selectedStory.title}</h2>
        <p className="text-sm text-gray-500">{selectedStory.titleVi}</p>
      </div>

      {/* Segment content */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-3">
        <p className="text-lg leading-relaxed">{segment.text}</p>
        <p className="text-sm text-gray-500 italic">{segment.translation}</p>
      </div>

      {/* Question */}
      {segment.question && segment.choices && (
        <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 space-y-3">
          <p className="font-medium text-blue-800 dark:text-blue-200">{segment.question}</p>
          <div className="space-y-2">
            {segment.choices.map((choice, i) => {
              let styles = 'border-gray-200 dark:border-gray-700 hover:border-blue-300';
              if (answeredQuestions[currentSegment]) {
                if (choice.correct) {
                  styles = 'border-green-500 bg-green-50 dark:bg-green-900/20';
                } else if (i === selectedChoice && !choice.correct) {
                  styles = 'border-red-500 bg-red-50 dark:bg-red-900/20';
                } else {
                  styles = 'border-gray-200 dark:border-gray-700 opacity-50';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => !answeredQuestions[currentSegment] && handleChoice(i, choice.correct)}
                  disabled={!!answeredQuestions[currentSegment]}
                  className={`w-full p-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${styles}`}
                >
                  {choice.text}
                  {answeredQuestions[currentSegment] && (i === selectedChoice || choice.correct) && (
                    <p className="text-xs font-normal text-gray-500 mt-1">{choice.feedback}</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={prevSegment} disabled={currentSegment === 0}>
          ← Trước
        </Button>
        {isLastSegment ? (
          <div className="text-center">
            <p className="text-sm text-gray-500">Điểm: {score}/{totalQuestions}</p>
            <Button onClick={backToList} className="mt-2">Hoàn thành</Button>
          </div>
        ) : (
          <Button onClick={nextSegment} disabled={!!segment.question && !answeredQuestions[currentSegment]}>
            Tiếp →
          </Button>
        )}
      </div>
    </div>
  );
}
