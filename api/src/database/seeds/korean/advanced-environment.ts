import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanEnvironmentLessons: LessonData[] = [
  {
    title: 'Environment & Nature',
    titleVi: 'Môi trường & Thiên nhiên',
    description: 'Learn environment vocabulary in Korean',
    descriptionVi: 'Học từ vựng về môi trường bằng tiếng Hàn',
    topic: TOPICS.TECHNOLOGY,
    vocabulary: [
      { word: '환경', meaning: 'môi trường', example: '환경을 보호해요.', exampleMeaning: 'Bảo vệ môi trường.', difficulty: DIFFICULTY.MEDIUM },
      { word: '자연', meaning: 'thiên nhiên', example: '자연이 아름다워요.', exampleMeaning: 'Thiên nhiên đẹp.', difficulty: DIFFICULTY.EASY },
      { word: '지구', meaning: 'trái đất', example: '지구를 소중히 해요.', exampleMeaning: 'Hãy trân trọng trái đất.', difficulty: DIFFICULTY.MEDIUM },
      { word: '재활용', meaning: 'tái chế', example: '재활용은 중요해요.', exampleMeaning: 'Tái chế rất quan trọng.', difficulty: DIFFICULTY.EASY },
      { word: '오염', meaning: 'ô nhiễm', example: '공기 오염이 문제예요.', exampleMeaning: 'Ô nhiễm không khí là vấn đề.', difficulty: DIFFICULTY.HARD },
      { word: '숲', meaning: 'rừng', example: '숲을 보호해요.', exampleMeaning: 'Bảo vệ rừng.', difficulty: DIFFICULTY.EASY },
      { word: '온난화', meaning: 'nóng lên toàn cầu', example: '지구 온난화가 걱정이에요.', exampleMeaning: 'Lo ngại về nóng lên toàn cầu.', difficulty: DIFFICULTY.HARD },
      { word: '에너지 절약', meaning: 'tiết kiệm năng lượng', example: '에너지 절약을 해요.', exampleMeaning: 'Tôi tiết kiệm năng lượng.', difficulty: DIFFICULTY.MEDIUM },
      { word: '쓰레기', meaning: 'rác', example: '쓰레기를 분리해요.', exampleMeaning: 'Tôi phân loại rác.', difficulty: DIFFICULTY.EASY },
      { word: '태양열', meaning: 'năng lượng mặt trời', example: '태양열 에너지를 사용해요.', exampleMeaning: 'Sử dụng năng lượng mặt trời.', difficulty: DIFFICULTY.HARD },
      { word: '바다', meaning: 'biển', example: '바다를 깨끗하게 해요.', exampleMeaning: 'Hãy giữ biển sạch.', difficulty: DIFFICULTY.EASY },
      { word: '동물 보호', meaning: 'bảo vệ động vật', example: '동물 보호가 중요해요.', exampleMeaning: 'Bảo vệ động vật rất quan trọng.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"환경" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thiên nhiên', 'Môi trường', 'Trái đất', 'Rừng'], answer: 'Môi trường', explanationVi: '환경 = môi trường', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Tái chế" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['쓰레기', '재활용', '에너지', '오염'], answer: '재활용', explanationVi: '재활용 = tái chế', difficulty: DIFFICULTY.EASY },
      { question: '"오염" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sạch sẽ', 'Ô nhiễm', 'Tái chế', 'Bảo vệ'], answer: 'Ô nhiễm', explanationVi: '오염 = ô nhiễm', difficulty: DIFFICULTY.HARD },
      { question: '"Rừng" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['바다', '숲', '산', '강'], answer: '숲', explanationVi: '숲 = rừng', difficulty: DIFFICULTY.EASY },
      { question: '"지구" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Mặt trời', 'Mặt trăng', 'Trái đất', 'Ngôi sao'], answer: 'Trái đất', explanationVi: '지구 = trái đất', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
