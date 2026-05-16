import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishDailyLifeLessons: LessonData[] = [
  {
    title: 'Daily Life & Routines',
    titleVi: 'Cuộc sống hàng ngày',
    description: 'Learn daily routine vocabulary in English',
    descriptionVi: 'Học từ vựng về sinh hoạt hàng ngày bằng tiếng Anh',
    topic: TOPICS.DAILY_LIFE,
    vocabulary: [
      { word: 'wake up', meaning: 'thức dậy', example: 'I wake up at 6 AM.', exampleMeaning: 'Tôi thức dậy lúc 6 giờ sáng.', difficulty: DIFFICULTY.EASY },
      { word: 'brush teeth', meaning: 'đánh răng', example: 'I brush my teeth every morning.', exampleMeaning: 'Tôi đánh răng mỗi sáng.', difficulty: DIFFICULTY.EASY },
      { word: 'take a shower', meaning: 'tắm', example: 'I take a shower before work.', exampleMeaning: 'Tôi tắm trước khi đi làm.', difficulty: DIFFICULTY.EASY },
      { word: 'get dressed', meaning: 'mặc quần áo', example: 'I get dressed quickly.', exampleMeaning: 'Tôi mặc quần áo nhanh.', difficulty: DIFFICULTY.EASY },
      { word: 'have breakfast', meaning: 'ăn sáng', example: 'I have breakfast at 7 AM.', exampleMeaning: 'Tôi ăn sáng lúc 7 giờ.', difficulty: DIFFICULTY.EASY },
      { word: 'commute', meaning: 'đi làm/đi lại', example: 'I commute by bus.', exampleMeaning: 'Tôi đi làm bằng xe buýt.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'do housework', meaning: 'làm việc nhà', example: 'I do housework on weekends.', exampleMeaning: 'Tôi làm việc nhà vào cuối tuần.', difficulty: DIFFICULTY.EASY },
      { word: 'do laundry', meaning: 'giặt đồ', example: 'I do laundry twice a week.', exampleMeaning: 'Tôi giặt đồ hai lần một tuần.', difficulty: DIFFICULTY.EASY },
      { word: 'go to bed', meaning: 'đi ngủ', example: 'I go to bed at 11 PM.', exampleMeaning: 'Tôi đi ngủ lúc 11 giờ tối.', difficulty: DIFFICULTY.EASY },
      { word: 'take a nap', meaning: 'ngủ trưa', example: 'I take a nap after lunch.', exampleMeaning: 'Tôi ngủ trưa sau bữa trưa.', difficulty: DIFFICULTY.EASY },
      { word: 'grocery shopping', meaning: 'đi chợ/mua thực phẩm', example: 'I go grocery shopping on Sundays.', exampleMeaning: 'Tôi đi chợ vào chủ nhật.', difficulty: DIFFICULTY.EASY },
      { word: 'relax', meaning: 'thư giãn', example: 'I relax by watching TV.', exampleMeaning: 'Tôi thư giãn bằng cách xem TV.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"wake up" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Đi ngủ', 'Thức dậy', 'Nghỉ ngơi', 'Tắm'], answer: 'Thức dậy', explanationVi: 'wake up = thức dậy', difficulty: DIFFICULTY.EASY },
      { question: '"Giặt đồ" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['do housework', 'do laundry', 'get dressed', 'take a shower'], answer: 'do laundry', explanationVi: 'do laundry = giặt đồ', difficulty: DIFFICULTY.EASY },
      { question: '"commute" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nấu ăn', 'Đi làm/đi lại', 'Mua sắm', 'Tập thể dục'], answer: 'Đi làm/đi lại', explanationVi: 'commute = đi làm/đi lại hàng ngày', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Đi ngủ" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['wake up', 'take a nap', 'go to bed', 'relax'], answer: 'go to bed', explanationVi: 'go to bed = đi ngủ', difficulty: DIFFICULTY.EASY },
      { question: '"take a nap" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tắm', 'Ngủ trưa', 'Ăn trưa', 'Đi dạo'], answer: 'Ngủ trưa', explanationVi: 'take a nap = ngủ trưa/ngủ ngắn', difficulty: DIFFICULTY.EASY },
    ],
  },
];
