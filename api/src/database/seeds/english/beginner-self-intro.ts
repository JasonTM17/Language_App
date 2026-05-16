import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishSelfIntroLessons: LessonData[] = [
  {
    title: 'Self Introduction',
    titleVi: 'Tự giới thiệu',
    description: 'Learn self-introduction phrases in English',
    descriptionVi: 'Học cách tự giới thiệu bằng tiếng Anh',
    topic: TOPICS.SELF_INTRO,
    vocabulary: [
      { word: 'My name is...', meaning: 'Tên tôi là...', example: 'My name is An.', exampleMeaning: 'Tên tôi là An.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'I am from...', meaning: 'Tôi đến từ...', example: 'I am from Vietnam.', exampleMeaning: 'Tôi đến từ Việt Nam.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'Nice to meet you', meaning: 'Rất vui được gặp bạn', example: 'Hi! Nice to meet you.', exampleMeaning: 'Xin chào! Rất vui được gặp bạn.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'occupation', meaning: 'nghề nghiệp', example: 'What is your occupation?', exampleMeaning: 'Nghề nghiệp của bạn là gì?', difficulty: DIFFICULTY.EASY },
      { word: 'hobby', meaning: 'sở thích', example: 'My hobby is reading.', exampleMeaning: 'Sở thích của tôi là đọc sách.', difficulty: DIFFICULTY.EASY },
      { word: 'introduce', meaning: 'giới thiệu', example: 'Let me introduce myself.', exampleMeaning: 'Để tôi tự giới thiệu.', difficulty: DIFFICULTY.EASY },
      { word: 'nationality', meaning: 'quốc tịch', example: 'My nationality is Vietnamese.', exampleMeaning: 'Quốc tịch của tôi là Việt Nam.', difficulty: DIFFICULTY.EASY },
      { word: 'age', meaning: 'tuổi', example: 'I am 25 years old.', exampleMeaning: 'Tôi 25 tuổi.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'hometown', meaning: 'quê hương', example: 'My hometown is Hanoi.', exampleMeaning: 'Quê tôi là Hà Nội.', difficulty: DIFFICULTY.EASY },
      { word: 'major', meaning: 'chuyên ngành', example: 'My major is Computer Science.', exampleMeaning: 'Chuyên ngành của tôi là Khoa học Máy tính.', difficulty: DIFFICULTY.EASY },
      { word: 'pleasure', meaning: 'niềm vui', example: 'It is a pleasure to meet you.', exampleMeaning: 'Thật vui được gặp bạn.', difficulty: DIFFICULTY.EASY },
      { word: 'background', meaning: 'lý lịch/nền tảng', example: 'Tell me about your background.', exampleMeaning: 'Hãy kể về lý lịch của bạn.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"Nice to meet you" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tạm biệt', 'Rất vui được gặp bạn', 'Xin lỗi', 'Cảm ơn'], answer: 'Rất vui được gặp bạn', explanationVi: 'Nice to meet you = Rất vui được gặp bạn', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"Nghề nghiệp" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['hobby', 'occupation', 'nationality', 'age'], answer: 'occupation', explanationVi: 'occupation = nghề nghiệp', difficulty: DIFFICULTY.EASY },
      { question: '"hometown" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thành phố', 'Quê hương', 'Đất nước', 'Nhà'], answer: 'Quê hương', explanationVi: 'hometown = quê hương', difficulty: DIFFICULTY.EASY },
      { question: '"Giới thiệu" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['introduce', 'include', 'improve', 'increase'], answer: 'introduce', explanationVi: 'introduce = giới thiệu', difficulty: DIFFICULTY.EASY },
      { question: '"major" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Lớn', 'Chuyên ngành', 'Quan trọng', 'Chính'], answer: 'Chuyên ngành', explanationVi: 'major = chuyên ngành (trong ngữ cảnh học tập)', difficulty: DIFFICULTY.EASY },
    ],
  },
];
