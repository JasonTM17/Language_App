import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanSelfIntroLessons: LessonData[] = [
  {
    title: 'Self Introduction',
    titleVi: 'Tự giới thiệu',
    description: 'Learn self-introduction phrases in Korean',
    descriptionVi: 'Học cách tự giới thiệu bằng tiếng Hàn',
    topic: TOPICS.SELF_INTRO,
    vocabulary: [
      { word: '이름', meaning: 'tên', example: '이름은 민수예요.', exampleMeaning: 'Tên tôi là Minsu.', difficulty: DIFFICULTY.EASY },
      { word: '나라', meaning: 'đất nước', example: '베트남에서 왔어요.', exampleMeaning: 'Tôi đến từ Việt Nam.', difficulty: DIFFICULTY.EASY },
      { word: '직업', meaning: 'nghề nghiệp', example: '직업은 선생님이에요.', exampleMeaning: 'Nghề của tôi là giáo viên.', difficulty: DIFFICULTY.EASY },
      { word: '나이', meaning: 'tuổi', example: '스물다섯 살이에요.', exampleMeaning: 'Tôi 25 tuổi.', difficulty: DIFFICULTY.EASY },
      { word: '취미', meaning: 'sở thích', example: '취미는 독서예요.', exampleMeaning: 'Sở thích là đọc sách.', difficulty: DIFFICULTY.EASY },
      { word: '가족', meaning: 'gia đình', example: '가족은 4명이에요.', exampleMeaning: 'Gia đình tôi có 4 người.', difficulty: DIFFICULTY.EASY },
      { word: '살다', meaning: 'sống/ở', example: '서울에 살아요.', exampleMeaning: 'Tôi sống ở Seoul.', difficulty: DIFFICULTY.EASY },
      { word: '학생', meaning: 'sinh viên', example: '대학생이에요.', exampleMeaning: 'Tôi là sinh viên đại học.', difficulty: DIFFICULTY.EASY },
      { word: '회사원', meaning: 'nhân viên công ty', example: '회사원이에요.', exampleMeaning: 'Tôi là nhân viên công ty.', difficulty: DIFFICULTY.EASY },
      { word: '만나서 반갑습니다', meaning: 'rất vui được gặp bạn', example: '처음 뵙겠습니다. 만나서 반갑습니다.', exampleMeaning: 'Lần đầu gặp mặt. Rất vui được gặp bạn.', difficulty: DIFFICULTY.EASY },
      { word: '고향', meaning: 'quê hương', example: '고향은 하노이예요.', exampleMeaning: 'Quê tôi là Hà Nội.', difficulty: DIFFICULTY.EASY },
      { word: '한국어', meaning: 'tiếng Hàn', example: '한국어를 공부해요.', exampleMeaning: 'Tôi học tiếng Hàn.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"이름" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tuổi', 'Tên', 'Quê', 'Nghề'], answer: 'Tên', explanationVi: '이름 = tên', difficulty: DIFFICULTY.EASY },
      { question: '"Nghề nghiệp" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['취미', '직업', '가족', '이름'], answer: '직업', explanationVi: '직업 = nghề nghiệp', difficulty: DIFFICULTY.EASY },
      { question: '"나라" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Đất nước', 'Tuổi', 'Tên', 'Sở thích'], answer: 'Đất nước', explanationVi: '나라 = đất nước', difficulty: DIFFICULTY.EASY },
      { question: '"Gia đình" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['직업', '취미', '가족', '친구'], answer: '가족', explanationVi: '가족 = gia đình', difficulty: DIFFICULTY.EASY },
      { question: '"만나서 반갑습니다" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tạm biệt', 'Xin lỗi', 'Rất vui được gặp', 'Cảm ơn'], answer: 'Rất vui được gặp', explanationVi: '만나서 반갑습니다 = rất vui được gặp bạn', difficulty: DIFFICULTY.EASY },
    ],
  },
];
