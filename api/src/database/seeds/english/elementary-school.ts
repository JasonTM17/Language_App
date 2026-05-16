import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishSchoolLessons: LessonData[] = [
  {
    title: 'School & Education',
    titleVi: 'Trường học & Giáo dục',
    description: 'Learn school and education vocabulary in English',
    descriptionVi: 'Học từ vựng về trường học và giáo dục bằng tiếng Anh',
    topic: TOPICS.SCHOOL,
    vocabulary: [
      { word: 'semester', meaning: 'học kỳ', example: 'The semester starts in September.', exampleMeaning: 'Học kỳ bắt đầu vào tháng 9.', difficulty: DIFFICULTY.EASY },
      { word: 'scholarship', meaning: 'học bổng', example: 'She received a scholarship.', exampleMeaning: 'Cô ấy nhận được học bổng.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'curriculum', meaning: 'chương trình giảng dạy', example: 'The curriculum was updated.', exampleMeaning: 'Chương trình giảng dạy đã được cập nhật.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'assignment', meaning: 'bài tập', example: 'Submit your assignment by Friday.', exampleMeaning: 'Nộp bài tập trước thứ Sáu.', difficulty: DIFFICULTY.EASY },
      { word: 'lecture', meaning: 'bài giảng', example: 'The lecture was interesting.', exampleMeaning: 'Bài giảng rất thú vị.', difficulty: DIFFICULTY.EASY },
      { word: 'tuition', meaning: 'học phí', example: 'Tuition fees are expensive.', exampleMeaning: 'Học phí rất đắt.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'dormitory', meaning: 'ký túc xá', example: 'I live in the dormitory.', exampleMeaning: 'Tôi sống trong ký túc xá.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'graduation', meaning: 'tốt nghiệp', example: 'Graduation is next month.', exampleMeaning: 'Lễ tốt nghiệp vào tháng sau.', difficulty: DIFFICULTY.EASY },
      { word: 'extracurricular', meaning: 'ngoại khóa', example: 'Join extracurricular activities.', exampleMeaning: 'Tham gia hoạt động ngoại khóa.', difficulty: DIFFICULTY.HARD },
      { word: 'dean', meaning: 'trưởng khoa', example: 'The dean approved the request.', exampleMeaning: 'Trưởng khoa đã phê duyệt yêu cầu.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'syllabus', meaning: 'đề cương', example: 'Check the syllabus for details.', exampleMeaning: 'Kiểm tra đề cương để biết chi tiết.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'enrollment', meaning: 'đăng ký nhập học', example: 'Enrollment opens next week.', exampleMeaning: 'Đăng ký nhập học mở vào tuần sau.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"scholarship" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Học phí', 'Học bổng', 'Bài tập', 'Bài giảng'], answer: 'Học bổng', explanationVi: 'scholarship = học bổng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Học kỳ" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['semester', 'syllabus', 'curriculum', 'lecture'], answer: 'semester', explanationVi: 'semester = học kỳ', difficulty: DIFFICULTY.EASY },
      { question: '"dormitory" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thư viện', 'Ký túc xá', 'Phòng thí nghiệm', 'Hội trường'], answer: 'Ký túc xá', explanationVi: 'dormitory = ký túc xá', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Tốt nghiệp" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['enrollment', 'graduation', 'assignment', 'tuition'], answer: 'graduation', explanationVi: 'graduation = tốt nghiệp', difficulty: DIFFICULTY.EASY },
      { question: '"extracurricular" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bắt buộc', 'Ngoại khóa', 'Chính khóa', 'Tự chọn'], answer: 'Ngoại khóa', explanationVi: 'extracurricular = ngoại khóa', difficulty: DIFFICULTY.HARD },
    ],
  },
];
