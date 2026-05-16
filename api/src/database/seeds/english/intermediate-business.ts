import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishBusinessLessons: LessonData[] = [
  {
    title: 'Business English',
    titleVi: 'Tiếng Anh thương mại',
    description: 'Learn business vocabulary in English',
    descriptionVi: 'Học từ vựng kinh doanh bằng tiếng Anh',
    topic: TOPICS.WORK,
    vocabulary: [
      { word: 'meeting', meaning: 'cuộc họp', example: 'The meeting starts at 3 PM.', exampleMeaning: 'Cuộc họp bắt đầu lúc 3 giờ chiều.', difficulty: DIFFICULTY.EASY },
      { word: 'deadline', meaning: 'hạn chót', example: 'The deadline is Friday.', exampleMeaning: 'Hạn chót là thứ Sáu.', difficulty: DIFFICULTY.EASY },
      { word: 'presentation', meaning: 'bài thuyết trình', example: 'I have a presentation tomorrow.', exampleMeaning: 'Tôi có bài thuyết trình ngày mai.', difficulty: DIFFICULTY.EASY },
      { word: 'negotiate', meaning: 'đàm phán', example: 'We need to negotiate the contract.', exampleMeaning: 'Chúng ta cần đàm phán hợp đồng.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'revenue', meaning: 'doanh thu', example: 'Revenue increased by 20%.', exampleMeaning: 'Doanh thu tăng 20%.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'stakeholder', meaning: 'bên liên quan', example: 'We need stakeholder approval.', exampleMeaning: 'Chúng ta cần sự chấp thuận của bên liên quan.', difficulty: DIFFICULTY.HARD },
      { word: 'quarterly report', meaning: 'báo cáo quý', example: 'The quarterly report is due next week.', exampleMeaning: 'Báo cáo quý phải nộp tuần sau.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'budget', meaning: 'ngân sách', example: 'We are over budget.', exampleMeaning: 'Chúng ta vượt ngân sách.', difficulty: DIFFICULTY.EASY },
      { word: 'collaborate', meaning: 'hợp tác', example: 'Let us collaborate on this project.', exampleMeaning: 'Hãy hợp tác trong dự án này.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'feedback', meaning: 'phản hồi', example: 'I appreciate your feedback.', exampleMeaning: 'Tôi đánh giá cao phản hồi của bạn.', difficulty: DIFFICULTY.EASY },
      { word: 'KPI', meaning: 'chỉ số hiệu suất', example: 'We met all our KPIs this quarter.', exampleMeaning: 'Chúng ta đạt tất cả KPI quý này.', difficulty: DIFFICULTY.HARD },
      { word: 'outsource', meaning: 'thuê ngoài', example: 'We outsource our IT support.', exampleMeaning: 'Chúng tôi thuê ngoài hỗ trợ IT.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"deadline" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Cuộc họp', 'Hạn chót', 'Ngân sách', 'Doanh thu'], answer: 'Hạn chót', explanationVi: 'deadline = hạn chót', difficulty: DIFFICULTY.EASY },
      { question: '"Đàm phán" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['negotiate', 'collaborate', 'outsource', 'present'], answer: 'negotiate', explanationVi: 'negotiate = đàm phán', difficulty: DIFFICULTY.MEDIUM },
      { question: '"revenue" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Chi phí', 'Doanh thu', 'Lợi nhuận', 'Ngân sách'], answer: 'Doanh thu', explanationVi: 'revenue = doanh thu', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Hợp tác" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['compete', 'collaborate', 'complain', 'complete'], answer: 'collaborate', explanationVi: 'collaborate = hợp tác', difficulty: DIFFICULTY.MEDIUM },
      { question: '"stakeholder" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nhân viên', 'Bên liên quan', 'Khách hàng', 'Đối thủ'], answer: 'Bên liên quan', explanationVi: 'stakeholder = bên liên quan/các bên có lợi ích', difficulty: DIFFICULTY.HARD },
    ],
  },
];
