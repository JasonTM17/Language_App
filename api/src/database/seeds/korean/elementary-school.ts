import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanSchoolLessons: LessonData[] = [
  {
    title: 'School & Education',
    titleVi: 'Trường học & Giáo dục',
    description: 'Learn school vocabulary in Korean',
    descriptionVi: 'Học từ vựng về trường học bằng tiếng Hàn',
    topic: TOPICS.SCHOOL,
    vocabulary: [
      { word: '학교', meaning: 'trường học', example: '학교에 가요.', exampleMeaning: 'Tôi đi đến trường.', difficulty: DIFFICULTY.EASY },
      { word: '선생님', meaning: 'giáo viên', example: '선생님이 좋아요.', exampleMeaning: 'Giáo viên tốt.', difficulty: DIFFICULTY.EASY },
      { word: '학생', meaning: 'học sinh', example: '저는 학생이에요.', exampleMeaning: 'Tôi là học sinh.', difficulty: DIFFICULTY.EASY },
      { word: '교실', meaning: 'phòng học', example: '교실이 넓어요.', exampleMeaning: 'Phòng học rộng.', difficulty: DIFFICULTY.EASY },
      { word: '숙제', meaning: 'bài tập về nhà', example: '숙제를 해요.', exampleMeaning: 'Tôi làm bài tập.', difficulty: DIFFICULTY.EASY },
      { word: '시험', meaning: 'bài thi', example: '내일 시험이 있어요.', exampleMeaning: 'Ngày mai có bài thi.', difficulty: DIFFICULTY.EASY },
      { word: '책', meaning: 'sách', example: '책을 읽어요.', exampleMeaning: 'Tôi đọc sách.', difficulty: DIFFICULTY.EASY },
      { word: '공부', meaning: 'học tập', example: '열심히 공부해요.', exampleMeaning: 'Tôi học chăm chỉ.', difficulty: DIFFICULTY.EASY },
      { word: '수업', meaning: 'tiết học', example: '수업이 시작해요.', exampleMeaning: 'Tiết học bắt đầu.', difficulty: DIFFICULTY.EASY },
      { word: '도서관', meaning: 'thư viện', example: '도서관에서 공부해요.', exampleMeaning: 'Tôi học ở thư viện.', difficulty: DIFFICULTY.EASY },
      { word: '연필', meaning: 'bút chì', example: '연필로 써요.', exampleMeaning: 'Tôi viết bằng bút chì.', difficulty: DIFFICULTY.EASY },
      { word: '대학교', meaning: 'đại học', example: '대학교에 다녀요.', exampleMeaning: 'Tôi học đại học.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"학교" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bệnh viện', 'Trường học', 'Công ty', 'Nhà hàng'], answer: 'Trường học', explanationVi: '학교 = trường học', difficulty: DIFFICULTY.EASY },
      { question: '"Giáo viên" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['학생', '선생님', '친구', '부모'], answer: '선생님', explanationVi: '선생님 = giáo viên', difficulty: DIFFICULTY.EASY },
      { question: '"숙제" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bài thi', 'Bài tập về nhà', 'Tiết học', 'Sách'], answer: 'Bài tập về nhà', explanationVi: '숙제 = bài tập về nhà', difficulty: DIFFICULTY.EASY },
      { question: '"Thư viện" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['교실', '도서관', '학교', '대학교'], answer: '도서관', explanationVi: '도서관 = thư viện', difficulty: DIFFICULTY.EASY },
      { question: '"시험" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bài tập', 'Bài thi', 'Tiết học', 'Sách giáo khoa'], answer: 'Bài thi', explanationVi: '시험 = bài thi', difficulty: DIFFICULTY.EASY },
    ],
  },
];
