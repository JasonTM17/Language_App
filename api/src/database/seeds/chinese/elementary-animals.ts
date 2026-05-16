import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseAnimalsLessons: LessonData[] = [
  {
    title: 'Animals',
    titleVi: 'Động vật',
    description: 'Learn animal vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về động vật bằng tiếng Trung',
    topic: TOPICS.ANIMALS,
    vocabulary: [
      { word: '狗 (gǒu)', meaning: 'chó', example: '我喜欢狗。', exampleMeaning: 'Tôi thích chó.', difficulty: DIFFICULTY.EASY },
      { word: '猫 (māo)', meaning: 'mèo', example: '我养猫。', exampleMeaning: 'Tôi nuôi mèo.', difficulty: DIFFICULTY.EASY },
      { word: '鸟 (niǎo)', meaning: 'chim', example: '鸟在飞。', exampleMeaning: 'Chim đang bay.', difficulty: DIFFICULTY.EASY },
      { word: '鱼 (yú)', meaning: 'cá', example: '我吃鱼。', exampleMeaning: 'Tôi ăn cá.', difficulty: DIFFICULTY.EASY },
      { word: '马 (mǎ)', meaning: 'ngựa', example: '我骑马。', exampleMeaning: 'Tôi cưỡi ngựa.', difficulty: DIFFICULTY.EASY },
      { word: '牛 (niú)', meaning: 'bò', example: '牛在吃草。', exampleMeaning: 'Bò đang ăn cỏ.', difficulty: DIFFICULTY.EASY },
      { word: '兔子 (tùzi)', meaning: 'thỏ', example: '兔子很可爱。', exampleMeaning: 'Thỏ rất dễ thương.', difficulty: DIFFICULTY.EASY },
      { word: '大象 (dàxiàng)', meaning: 'voi', example: '大象很大。', exampleMeaning: 'Voi rất to.', difficulty: DIFFICULTY.EASY },
      { word: '狮子 (shīzi)', meaning: 'sư tử', example: '狮子很强。', exampleMeaning: 'Sư tử rất mạnh.', difficulty: DIFFICULTY.EASY },
      { word: '蛇 (shé)', meaning: 'rắn', example: '我怕蛇。', exampleMeaning: 'Tôi sợ rắn.', difficulty: DIFFICULTY.EASY },
      { word: '熊猫 (xióngmāo)', meaning: 'gấu trúc', example: '熊猫是中国的国宝。', exampleMeaning: 'Gấu trúc là quốc bảo Trung Quốc.', difficulty: DIFFICULTY.EASY },
      { word: '鸡 (jī)', meaning: 'gà', example: '我吃鸡肉。', exampleMeaning: 'Tôi ăn thịt gà.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"狗" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Mèo', 'Chó', 'Chim', 'Cá'], answer: 'Chó', explanationVi: '狗 (gǒu) = chó', difficulty: DIFFICULTY.EASY },
      { question: '"Mèo" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['狗', '猫', '鸟', '鱼'], answer: '猫', explanationVi: '猫 (māo) = mèo', difficulty: DIFFICULTY.EASY },
      { question: '"大象" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ngựa', 'Bò', 'Voi', 'Sư tử'], answer: 'Voi', explanationVi: '大象 (dàxiàng) = voi', difficulty: DIFFICULTY.EASY },
      { question: '"Cá" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['鸟', '鱼', '蛇', '鸡'], answer: '鱼', explanationVi: '鱼 (yú) = cá', difficulty: DIFFICULTY.EASY },
      { question: '"熊猫" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Gấu', 'Gấu trúc', 'Hổ', 'Khỉ'], answer: 'Gấu trúc', explanationVi: '熊猫 (xióngmāo) = gấu trúc', difficulty: DIFFICULTY.EASY },
    ],
  },
];
