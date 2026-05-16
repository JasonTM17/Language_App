import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseEnvironmentLessons: LessonData[] = [
  {
    title: 'Environment & Nature',
    titleVi: 'Môi trường & Thiên nhiên',
    description: 'Learn environment vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về môi trường bằng tiếng Nhật',
    topic: TOPICS.TECHNOLOGY,
    vocabulary: [
      { word: '環境 (かんきょう)', meaning: 'môi trường', example: '環境を守りましょう。', exampleMeaning: 'Hãy bảo vệ môi trường.', difficulty: DIFFICULTY.MEDIUM },
      { word: '自然 (しぜん)', meaning: 'thiên nhiên', example: '自然が美しいです。', exampleMeaning: 'Thiên nhiên đẹp.', difficulty: DIFFICULTY.EASY },
      { word: '地球 (ちきゅう)', meaning: 'trái đất', example: '地球を大切にしましょう。', exampleMeaning: 'Hãy trân trọng trái đất.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'リサイクル', meaning: 'tái chế', example: 'リサイクルは大切です。', exampleMeaning: 'Tái chế rất quan trọng.', difficulty: DIFFICULTY.EASY },
      { word: '汚染 (おせん)', meaning: 'ô nhiễm', example: '空気汚染が問題です。', exampleMeaning: 'Ô nhiễm không khí là vấn đề.', difficulty: DIFFICULTY.HARD },
      { word: '森林 (しんりん)', meaning: 'rừng', example: '森林を守ります。', exampleMeaning: 'Bảo vệ rừng.', difficulty: DIFFICULTY.MEDIUM },
      { word: '温暖化 (おんだんか)', meaning: 'nóng lên toàn cầu', example: '地球温暖化が心配です。', exampleMeaning: 'Lo ngại về nóng lên toàn cầu.', difficulty: DIFFICULTY.HARD },
      { word: '省エネ (しょうエネ)', meaning: 'tiết kiệm năng lượng', example: '省エネを心がけます。', exampleMeaning: 'Tôi chú ý tiết kiệm năng lượng.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'ゴミ', meaning: 'rác', example: 'ゴミを分別します。', exampleMeaning: 'Tôi phân loại rác.', difficulty: DIFFICULTY.EASY },
      { word: '太陽光 (たいようこう)', meaning: 'năng lượng mặt trời', example: '太陽光発電を使います。', exampleMeaning: 'Sử dụng điện mặt trời.', difficulty: DIFFICULTY.HARD },
      { word: '海 (うみ)', meaning: 'biển', example: '海をきれいにしましょう。', exampleMeaning: 'Hãy giữ biển sạch.', difficulty: DIFFICULTY.EASY },
      { word: '動物保護 (どうぶつほご)', meaning: 'bảo vệ động vật', example: '動物保護は重要です。', exampleMeaning: 'Bảo vệ động vật rất quan trọng.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"環境" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thiên nhiên', 'Môi trường', 'Trái đất', 'Rừng'], answer: 'Môi trường', explanationVi: '環境 (かんきょう) = môi trường', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Tái chế" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['ゴミ', 'リサイクル', '省エネ', '汚染'], answer: 'リサイクル', explanationVi: 'リサイクル = tái chế (recycle)', difficulty: DIFFICULTY.EASY },
      { question: '"汚染" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sạch sẽ', 'Ô nhiễm', 'Tái chế', 'Bảo vệ'], answer: 'Ô nhiễm', explanationVi: '汚染 (おせん) = ô nhiễm', difficulty: DIFFICULTY.HARD },
      { question: '"Rừng" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['海', '森林', '山', '川'], answer: '森林', explanationVi: '森林 (しんりん) = rừng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"地球" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Mặt trời', 'Mặt trăng', 'Trái đất', 'Ngôi sao'], answer: 'Trái đất', explanationVi: '地球 (ちきゅう) = trái đất', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
