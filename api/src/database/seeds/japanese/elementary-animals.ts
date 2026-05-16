import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseAnimalsLessons: LessonData[] = [
  {
    title: 'Animals',
    titleVi: 'Động vật',
    description: 'Learn animal vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về động vật bằng tiếng Nhật',
    topic: TOPICS.ANIMALS,
    vocabulary: [
      { word: '犬 (いぬ)', meaning: 'chó', example: '犬が好きです。', exampleMeaning: 'Tôi thích chó.', difficulty: DIFFICULTY.EASY },
      { word: '猫 (ねこ)', meaning: 'mèo', example: '猫を飼っています。', exampleMeaning: 'Tôi nuôi mèo.', difficulty: DIFFICULTY.EASY },
      { word: '鳥 (とり)', meaning: 'chim', example: '鳥が飛んでいます。', exampleMeaning: 'Chim đang bay.', difficulty: DIFFICULTY.EASY },
      { word: '魚 (さかな)', meaning: 'cá', example: '魚を食べます。', exampleMeaning: 'Tôi ăn cá.', difficulty: DIFFICULTY.EASY },
      { word: '馬 (うま)', meaning: 'ngựa', example: '馬に乗ります。', exampleMeaning: 'Tôi cưỡi ngựa.', difficulty: DIFFICULTY.EASY },
      { word: '牛 (うし)', meaning: 'bò', example: '牛がいます。', exampleMeaning: 'Có con bò.', difficulty: DIFFICULTY.EASY },
      { word: 'うさぎ', meaning: 'thỏ', example: 'うさぎはかわいいです。', exampleMeaning: 'Thỏ dễ thương.', difficulty: DIFFICULTY.EASY },
      { word: '象 (ぞう)', meaning: 'voi', example: '象は大きいです。', exampleMeaning: 'Voi to lớn.', difficulty: DIFFICULTY.EASY },
      { word: 'ライオン', meaning: 'sư tử', example: 'ライオンは強いです。', exampleMeaning: 'Sư tử mạnh.', difficulty: DIFFICULTY.EASY },
      { word: '蛇 (へび)', meaning: 'rắn', example: '蛇が怖いです。', exampleMeaning: 'Tôi sợ rắn.', difficulty: DIFFICULTY.EASY },
      { word: 'パンダ', meaning: 'gấu trúc', example: 'パンダが好きです。', exampleMeaning: 'Tôi thích gấu trúc.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '虫 (むし)', meaning: 'côn trùng', example: '虫がいます。', exampleMeaning: 'Có côn trùng.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"犬" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Mèo', 'Chó', 'Chim', 'Cá'], answer: 'Chó', explanationVi: '犬 (いぬ) = chó', difficulty: DIFFICULTY.EASY },
      { question: '"Mèo" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['犬', '猫', '鳥', '魚'], answer: '猫', explanationVi: '猫 (ねこ) = mèo', difficulty: DIFFICULTY.EASY },
      { question: '"象" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ngựa', 'Bò', 'Voi', 'Sư tử'], answer: 'Voi', explanationVi: '象 (ぞう) = voi', difficulty: DIFFICULTY.EASY },
      { question: '"Cá" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['鳥', '魚', '虫', '蛇'], answer: '魚', explanationVi: '魚 (さかな) = cá', difficulty: DIFFICULTY.EASY },
      { question: '"うさぎ" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thỏ', 'Gấu', 'Chuột', 'Mèo'], answer: 'Thỏ', explanationVi: 'うさぎ = thỏ', difficulty: DIFFICULTY.EASY },
    ],
  },
];
