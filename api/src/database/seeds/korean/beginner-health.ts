import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanHealthLessons: LessonData[] = [
  {
    title: 'Health & Body',
    titleVi: 'Sức khỏe & Cơ thể',
    description: 'Learn health vocabulary in Korean',
    descriptionVi: 'Học từ vựng về sức khỏe bằng tiếng Hàn',
    topic: TOPICS.HEALTH,
    vocabulary: [
      { word: '병원', meaning: 'bệnh viện', example: '병원에 가요.', exampleMeaning: 'Tôi đi bệnh viện.', difficulty: DIFFICULTY.EASY },
      { word: '의사', meaning: 'bác sĩ', example: '의사 선생님을 만나요.', exampleMeaning: 'Tôi gặp bác sĩ.', difficulty: DIFFICULTY.EASY },
      { word: '약', meaning: 'thuốc', example: '약을 먹어요.', exampleMeaning: 'Tôi uống thuốc.', difficulty: DIFFICULTY.EASY },
      { word: '머리', meaning: 'đầu', example: '머리가 아파요.', exampleMeaning: 'Tôi đau đầu.', difficulty: DIFFICULTY.EASY },
      { word: '배', meaning: 'bụng', example: '배가 아파요.', exampleMeaning: 'Tôi đau bụng.', difficulty: DIFFICULTY.EASY },
      { word: '열', meaning: 'sốt', example: '열이 나요.', exampleMeaning: 'Tôi bị sốt.', difficulty: DIFFICULTY.EASY },
      { word: '감기', meaning: 'cảm lạnh', example: '감기에 걸렸어요.', exampleMeaning: 'Tôi bị cảm lạnh.', difficulty: DIFFICULTY.EASY },
      { word: '기침', meaning: 'ho', example: '기침이 나요.', exampleMeaning: 'Tôi bị ho.', difficulty: DIFFICULTY.MEDIUM },
      { word: '눈', meaning: 'mắt', example: '눈이 피곤해요.', exampleMeaning: 'Mắt tôi mỏi.', difficulty: DIFFICULTY.EASY },
      { word: '이', meaning: 'răng', example: '이가 아파요.', exampleMeaning: 'Tôi đau răng.', difficulty: DIFFICULTY.EASY },
      { word: '알레르기', meaning: 'dị ứng', example: '꽃가루 알레르기가 있어요.', exampleMeaning: 'Tôi bị dị ứng phấn hoa.', difficulty: DIFFICULTY.MEDIUM },
      { word: '건강', meaning: 'sức khỏe', example: '건강이 중요해요.', exampleMeaning: 'Sức khỏe rất quan trọng.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"병원" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Trường học', 'Bệnh viện', 'Nhà hàng', 'Công ty'], answer: 'Bệnh viện', explanationVi: '병원 = bệnh viện', difficulty: DIFFICULTY.EASY },
      { question: '"Bác sĩ" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['선생님', '의사', '간호사', '약사'], answer: '의사', explanationVi: '의사 = bác sĩ', difficulty: DIFFICULTY.EASY },
      { question: '"열" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ho', 'Sốt', 'Đau', 'Mệt'], answer: 'Sốt', explanationVi: '열 = sốt', difficulty: DIFFICULTY.EASY },
      { question: '"Cảm lạnh" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['열', '감기', '기침', '아프다'], answer: '감기', explanationVi: '감기 = cảm lạnh', difficulty: DIFFICULTY.EASY },
      { question: '"건강" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bệnh tật', 'Sức khỏe', 'Thuốc', 'Bệnh viện'], answer: 'Sức khỏe', explanationVi: '건강 = sức khỏe', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
