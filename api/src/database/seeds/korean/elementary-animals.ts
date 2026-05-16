import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanAnimalsLessons: LessonData[] = [
  {
    title: 'Animals',
    titleVi: 'Động vật',
    description: 'Learn animal vocabulary in Korean',
    descriptionVi: 'Học từ vựng về động vật bằng tiếng Hàn',
    topic: TOPICS.ANIMALS,
    vocabulary: [
      { word: '개', meaning: 'chó', example: '개를 좋아해요.', exampleMeaning: 'Tôi thích chó.', difficulty: DIFFICULTY.EASY },
      { word: '고양이', meaning: 'mèo', example: '고양이를 키워요.', exampleMeaning: 'Tôi nuôi mèo.', difficulty: DIFFICULTY.EASY },
      { word: '새', meaning: 'chim', example: '새가 날아요.', exampleMeaning: 'Chim đang bay.', difficulty: DIFFICULTY.EASY },
      { word: '물고기', meaning: 'cá', example: '물고기를 먹어요.', exampleMeaning: 'Tôi ăn cá.', difficulty: DIFFICULTY.EASY },
      { word: '말', meaning: 'ngựa', example: '말을 타요.', exampleMeaning: 'Tôi cưỡi ngựa.', difficulty: DIFFICULTY.EASY },
      { word: '소', meaning: 'bò', example: '소가 풀을 먹어요.', exampleMeaning: 'Bò ăn cỏ.', difficulty: DIFFICULTY.EASY },
      { word: '토끼', meaning: 'thỏ', example: '토끼가 귀여워요.', exampleMeaning: 'Thỏ dễ thương.', difficulty: DIFFICULTY.EASY },
      { word: '코끼리', meaning: 'voi', example: '코끼리는 커요.', exampleMeaning: 'Voi to lớn.', difficulty: DIFFICULTY.EASY },
      { word: '사자', meaning: 'sư tử', example: '사자는 강해요.', exampleMeaning: 'Sư tử mạnh.', difficulty: DIFFICULTY.EASY },
      { word: '뱀', meaning: 'rắn', example: '뱀이 무서워요.', exampleMeaning: 'Tôi sợ rắn.', difficulty: DIFFICULTY.EASY },
      { word: '판다', meaning: 'gấu trúc', example: '판다를 좋아해요.', exampleMeaning: 'Tôi thích gấu trúc.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '닭', meaning: 'gà', example: '닭고기를 먹어요.', exampleMeaning: 'Tôi ăn thịt gà.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"개" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Mèo', 'Chó', 'Chim', 'Cá'], answer: 'Chó', explanationVi: '개 = chó', difficulty: DIFFICULTY.EASY },
      { question: '"Mèo" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['개', '고양이', '새', '물고기'], answer: '고양이', explanationVi: '고양이 = mèo', difficulty: DIFFICULTY.EASY },
      { question: '"코끼리" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ngựa', 'Bò', 'Voi', 'Sư tử'], answer: 'Voi', explanationVi: '코끼리 = voi', difficulty: DIFFICULTY.EASY },
      { question: '"Cá" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['새', '물고기', '뱀', '닭'], answer: '물고기', explanationVi: '물고기 = cá', difficulty: DIFFICULTY.EASY },
      { question: '"토끼" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thỏ', 'Gấu', 'Chuột', 'Mèo'], answer: 'Thỏ', explanationVi: '토끼 = thỏ', difficulty: DIFFICULTY.EASY },
    ],
  },
];
