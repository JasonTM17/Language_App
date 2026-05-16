import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanDailyLifeLessons: LessonData[] = [
  {
    title: 'Daily Life',
    titleVi: 'Cuộc sống hàng ngày',
    description: 'Learn daily life vocabulary in Korean',
    descriptionVi: 'Học từ vựng về cuộc sống hàng ngày bằng tiếng Hàn',
    topic: TOPICS.DAILY_LIFE,
    vocabulary: [
      { word: '아침밥', meaning: 'bữa sáng', example: '아침밥을 먹어요.', exampleMeaning: 'Tôi ăn sáng.', difficulty: DIFFICULTY.EASY },
      { word: '점심', meaning: 'bữa trưa', example: '점심 뭐 먹어요?', exampleMeaning: 'Bữa trưa ăn gì?', difficulty: DIFFICULTY.EASY },
      { word: '저녁밥', meaning: 'bữa tối', example: '저녁밥을 만들어요.', exampleMeaning: 'Tôi nấu bữa tối.', difficulty: DIFFICULTY.EASY },
      { word: '일어나다', meaning: 'thức dậy', example: '매일 6시에 일어나요.', exampleMeaning: 'Mỗi ngày tôi dậy lúc 6 giờ.', difficulty: DIFFICULTY.EASY },
      { word: '자다', meaning: 'ngủ', example: '11시에 자요.', exampleMeaning: 'Tôi ngủ lúc 11 giờ.', difficulty: DIFFICULTY.EASY },
      { word: '샤워', meaning: 'tắm vòi sen', example: '샤워를 해요.', exampleMeaning: 'Tôi tắm vòi sen.', difficulty: DIFFICULTY.EASY },
      { word: '양치', meaning: 'đánh răng', example: '매일 양치해요.', exampleMeaning: 'Mỗi ngày tôi đánh răng.', difficulty: DIFFICULTY.EASY },
      { word: '옷을 갈아입다', meaning: 'thay đồ', example: '옷을 갈아입어요.', exampleMeaning: 'Tôi thay đồ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '청소', meaning: 'dọn dẹp', example: '방을 청소해요.', exampleMeaning: 'Tôi dọn phòng.', difficulty: DIFFICULTY.EASY },
      { word: '빨래', meaning: 'giặt đồ', example: '빨래를 해요.', exampleMeaning: 'Tôi giặt đồ.', difficulty: DIFFICULTY.EASY },
      { word: '쇼핑', meaning: 'mua sắm', example: '쇼핑하러 가요.', exampleMeaning: 'Tôi đi mua sắm.', difficulty: DIFFICULTY.EASY },
      { word: '쉬다', meaning: 'nghỉ ngơi', example: '일요일에 쉬어요.', exampleMeaning: 'Tôi nghỉ ngày chủ nhật.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"아침밥" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bữa trưa', 'Bữa sáng', 'Bữa tối', 'Ăn vặt'], answer: 'Bữa sáng', explanationVi: '아침밥 = bữa sáng', difficulty: DIFFICULTY.EASY },
      { question: '"Ngủ" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['일어나다', '자다', '쉬다', '먹다'], answer: '자다', explanationVi: '자다 = ngủ', difficulty: DIFFICULTY.EASY },
      { question: '"청소" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Giặt đồ', 'Dọn dẹp', 'Nấu ăn', 'Mua sắm'], answer: 'Dọn dẹp', explanationVi: '청소 = dọn dẹp', difficulty: DIFFICULTY.EASY },
      { question: '"Mua sắm" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['빨래', '청소', '쇼핑', '요리'], answer: '쇼핑', explanationVi: '쇼핑 = mua sắm', difficulty: DIFFICULTY.EASY },
      { question: '"일어나다" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ngủ', 'Thức dậy', 'Nghỉ ngơi', 'Ăn'], answer: 'Thức dậy', explanationVi: '일어나다 = thức dậy', difficulty: DIFFICULTY.EASY },
    ],
  },
];
