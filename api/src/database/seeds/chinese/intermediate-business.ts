import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseBusinessLessons: LessonData[] = [
  {
    title: 'Business Chinese',
    titleVi: 'Tiếng Trung thương mại',
    description: 'Learn business vocabulary in Chinese',
    descriptionVi: 'Học từ vựng kinh doanh bằng tiếng Trung',
    topic: TOPICS.WORK,
    vocabulary: [
      { word: '会议 (huìyì)', meaning: 'cuộc họp', example: '会议三点开始。', exampleMeaning: 'Cuộc họp bắt đầu lúc 3 giờ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '名片 (míngpiàn)', meaning: 'danh thiếp', example: '交换名片。', exampleMeaning: 'Trao đổi danh thiếp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '截止日期 (jiézhǐ rìqī)', meaning: 'hạn chót', example: '截止日期是星期五。', exampleMeaning: 'Hạn chót là thứ Sáu.', difficulty: DIFFICULTY.MEDIUM },
      { word: '出差 (chūchāi)', meaning: 'công tác', example: '下周出差。', exampleMeaning: 'Tuần sau đi công tác.', difficulty: DIFFICULTY.MEDIUM },
      { word: '加班 (jiābān)', meaning: 'làm thêm giờ', example: '今天加班。', exampleMeaning: 'Hôm nay làm thêm giờ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '报告 (bàogào)', meaning: 'báo cáo', example: '我写报告。', exampleMeaning: 'Tôi viết báo cáo.', difficulty: DIFFICULTY.MEDIUM },
      { word: '客户 (kèhù)', meaning: 'khách hàng/đối tác', example: '和客户见面。', exampleMeaning: 'Gặp khách hàng.', difficulty: DIFFICULTY.MEDIUM },
      { word: '工资 (gōngzī)', meaning: 'lương', example: '工资日是25号。', exampleMeaning: 'Ngày lương là ngày 25.', difficulty: DIFFICULTY.MEDIUM },
      { word: '面试 (miànshì)', meaning: 'phỏng vấn', example: '面试是明天。', exampleMeaning: 'Phỏng vấn là ngày mai.', difficulty: DIFFICULTY.MEDIUM },
      { word: '老板 (lǎobǎn)', meaning: 'sếp/ông chủ', example: '老板很好。', exampleMeaning: 'Sếp rất tốt.', difficulty: DIFFICULTY.EASY },
      { word: '同事 (tóngshì)', meaning: 'đồng nghiệp', example: '同事很友好。', exampleMeaning: 'Đồng nghiệp rất thân thiện.', difficulty: DIFFICULTY.EASY },
      { word: '演讲 (yǎnjiǎng)', meaning: 'thuyết trình', example: '准备演讲。', exampleMeaning: 'Chuẩn bị thuyết trình.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"会议" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Công tác', 'Cuộc họp', 'Phỏng vấn', 'Thuyết trình'], answer: 'Cuộc họp', explanationVi: '会议 (huìyì) = cuộc họp', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Hạn chót" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['出差', '截止日期', '加班', '工资'], answer: '截止日期', explanationVi: '截止日期 (jiézhǐ rìqī) = hạn chót/deadline', difficulty: DIFFICULTY.MEDIUM },
      { question: '"加班" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nghỉ phép', 'Làm thêm giờ', 'Đi công tác', 'Họp'], answer: 'Làm thêm giờ', explanationVi: '加班 (jiābān) = làm thêm giờ/overtime', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Sếp" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['同事', '老板', '客户', '经理'], answer: '老板', explanationVi: '老板 (lǎobǎn) = sếp/ông chủ', difficulty: DIFFICULTY.EASY },
      { question: '"名片" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hợp đồng', 'Danh thiếp', 'Báo cáo', 'Lương'], answer: 'Danh thiếp', explanationVi: '名片 (míngpiàn) = danh thiếp/name card', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
