import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseTransportLessons: LessonData[] = [
  {
    title: 'Transportation',
    titleVi: 'Giao thông',
    description: 'Learn transportation vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về giao thông bằng tiếng Nhật',
    topic: TOPICS.TRANSPORT,
    vocabulary: [
      { word: '電車 (でんしゃ)', meaning: 'tàu điện', example: '電車に乗ります。', exampleMeaning: 'Tôi đi tàu điện.', difficulty: DIFFICULTY.EASY },
      { word: 'バス', meaning: 'xe buýt', example: 'バスで行きます。', exampleMeaning: 'Tôi đi bằng xe buýt.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '飛行機 (ひこうき)', meaning: 'máy bay', example: '飛行機で旅行します。', exampleMeaning: 'Tôi du lịch bằng máy bay.', difficulty: DIFFICULTY.EASY },
      { word: '自転車 (じてんしゃ)', meaning: 'xe đạp', example: '自転車で学校に行きます。', exampleMeaning: 'Tôi đi xe đạp đến trường.', difficulty: DIFFICULTY.EASY },
      { word: '車 (くるま)', meaning: 'ô tô', example: '車を運転します。', exampleMeaning: 'Tôi lái ô tô.', difficulty: DIFFICULTY.EASY },
      { word: '駅 (えき)', meaning: 'ga tàu', example: '駅はどこですか？', exampleMeaning: 'Ga tàu ở đâu?', difficulty: DIFFICULTY.EASY },
      { word: '切符 (きっぷ)', meaning: 'vé', example: '切符を買います。', exampleMeaning: 'Tôi mua vé.', difficulty: DIFFICULTY.EASY },
      { word: 'タクシー', meaning: 'taxi', example: 'タクシーに乗ります。', exampleMeaning: 'Tôi đi taxi.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '地下鉄 (ちかてつ)', meaning: 'tàu điện ngầm', example: '地下鉄は便利です。', exampleMeaning: 'Tàu điện ngầm rất tiện.', difficulty: DIFFICULTY.MEDIUM },
      { word: '新幹線 (しんかんせん)', meaning: 'tàu cao tốc', example: '新幹線で東京に行きます。', exampleMeaning: 'Tôi đi Tokyo bằng tàu cao tốc.', difficulty: DIFFICULTY.MEDIUM },
      { word: '空港 (くうこう)', meaning: 'sân bay', example: '空港に着きました。', exampleMeaning: 'Tôi đã đến sân bay.', difficulty: DIFFICULTY.EASY },
      { word: '道 (みち)', meaning: 'đường', example: 'この道はまっすぐです。', exampleMeaning: 'Con đường này thẳng.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"電車" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Xe buýt', 'Tàu điện', 'Ô tô', 'Máy bay'], answer: 'Tàu điện', explanationVi: '電車 (でんしゃ) = tàu điện', difficulty: DIFFICULTY.EASY },
      { question: '"Xe đạp" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['自転車', '自動車', '電車', 'バス'], answer: '自転車', explanationVi: '自転車 (じてんしゃ) = xe đạp', difficulty: DIFFICULTY.EASY },
      { question: '"切符" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ga tàu', 'Vé', 'Đường', 'Sân bay'], answer: 'Vé', explanationVi: '切符 (きっぷ) = vé', difficulty: DIFFICULTY.EASY },
      { question: '"Sân bay" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['駅', '空港', '道', '港'], answer: '空港', explanationVi: '空港 (くうこう) = sân bay', difficulty: DIFFICULTY.EASY },
      { question: '"新幹線" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tàu điện', 'Xe buýt', 'Tàu cao tốc', 'Tàu điện ngầm'], answer: 'Tàu cao tốc', explanationVi: '新幹線 (しんかんせん) = tàu cao tốc Shinkansen', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
