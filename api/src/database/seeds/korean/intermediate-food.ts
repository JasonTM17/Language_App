import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanFoodIntermediateLessons: LessonData[] = [
  {
    title: 'Cooking & Cuisine',
    titleVi: 'Nấu ăn & Ẩm thực',
    description: 'Learn cooking and cuisine vocabulary in Korean',
    descriptionVi: 'Học từ vựng về nấu ăn và ẩm thực bằng tiếng Hàn',
    topic: TOPICS.FOOD,
    vocabulary: [
      { word: '재료', meaning: 'nguyên liệu', example: '재료가 뭐가 필요해요?', exampleMeaning: 'Cần nguyên liệu gì?', difficulty: DIFFICULTY.MEDIUM },
      { word: '레시피', meaning: 'công thức nấu ăn', example: '레시피대로 만들어요.', exampleMeaning: 'Làm theo công thức.', difficulty: DIFFICULTY.EASY },
      { word: '재우다', meaning: 'ướp', example: '닭고기를 하룻밤 재워요.', exampleMeaning: 'Ướp gà qua đêm.', difficulty: DIFFICULTY.MEDIUM },
      { word: '끓이다', meaning: 'ninh/đun sôi', example: '국을 30분 끓여요.', exampleMeaning: 'Ninh canh 30 phút.', difficulty: DIFFICULTY.MEDIUM },
      { word: '양념', meaning: 'gia vị', example: '양념을 넣어요.', exampleMeaning: 'Thêm gia vị.', difficulty: DIFFICULTY.EASY },
      { word: '전채', meaning: 'món khai vị', example: '전채를 주문했어요.', exampleMeaning: 'Đã gọi món khai vị.', difficulty: DIFFICULTY.MEDIUM },
      { word: '요리', meaning: 'ẩm thực/nấu ăn', example: '한국 요리를 좋아해요.', exampleMeaning: 'Tôi thích ẩm thực Hàn.', difficulty: DIFFICULTY.EASY },
      { word: '플레이팅', meaning: 'trang trí/bày biện', example: '플레이팅이 예뻐요.', exampleMeaning: 'Cách bày biện rất đẹp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '발효', meaning: 'lên men', example: '김치는 발효 식품이에요.', exampleMeaning: 'Kim chi là thực phẩm lên men.', difficulty: DIFFICULTY.MEDIUM },
      { word: '유기농', meaning: 'hữu cơ', example: '유기농 채소를 사요.', exampleMeaning: 'Tôi mua rau hữu cơ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '식이제한', meaning: 'hạn chế chế độ ăn', example: '식이제한이 있으세요?', exampleMeaning: 'Bạn có hạn chế chế độ ăn không?', difficulty: DIFFICULTY.HARD },
      { word: '육수', meaning: 'nước dùng', example: '육수를 내요.', exampleMeaning: 'Nấu nước dùng.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"재료" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Công thức', 'Nguyên liệu', 'Gia vị', 'Khẩu phần'], answer: 'Nguyên liệu', explanationVi: '재료 = nguyên liệu', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Ướp" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['끓이다', '재우다', '양념', '요리'], answer: '재우다', explanationVi: '재우다 = ướp', difficulty: DIFFICULTY.MEDIUM },
      { question: '"양념" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nguyên liệu', 'Gia vị', 'Nước dùng', 'Công thức'], answer: 'Gia vị', explanationVi: '양념 = gia vị', difficulty: DIFFICULTY.EASY },
      { question: '"Lên men" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['유기농', '발효', '식이제한', '양념'], answer: '발효', explanationVi: '발효 = lên men', difficulty: DIFFICULTY.MEDIUM },
      { question: '"육수" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Gia vị', 'Nước dùng', 'Nguyên liệu', 'Công thức'], answer: 'Nước dùng', explanationVi: '육수 = nước dùng', difficulty: DIFFICULTY.EASY },
    ],
  },
];
