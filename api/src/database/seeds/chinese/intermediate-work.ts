import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseWorkLessons: LessonData[] = [
  {
    title: 'Work & Office',
    titleVi: 'Công việc & Văn phòng',
    description: 'Learn work-related vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về công việc bằng tiếng Trung',
    topic: TOPICS.WORK,
    vocabulary: [
      { word: '工作 (gōngzuò)', meaning: 'công việc', example: '你做什么工作？', exampleMeaning: 'Bạn làm nghề gì?', difficulty: DIFFICULTY.EASY },
      { word: '公司 (gōngsī)', meaning: 'công ty', example: '我去公司。', exampleMeaning: 'Tôi đi đến công ty.', difficulty: DIFFICULTY.EASY },
      { word: '开会 (kāihuì)', meaning: 'họp', example: '下午要开会。', exampleMeaning: 'Buổi chiều phải họp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '老板 (lǎobǎn)', meaning: 'sếp', example: '老板很好。', exampleMeaning: 'Sếp rất tốt.', difficulty: DIFFICULTY.EASY },
      { word: '同事 (tóngshì)', meaning: 'đồng nghiệp', example: '我和同事一起吃午饭。', exampleMeaning: 'Tôi ăn trưa với đồng nghiệp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '加班 (jiābān)', meaning: 'làm thêm giờ', example: '今天要加班。', exampleMeaning: 'Hôm nay phải làm thêm giờ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '工资 (gōngzī)', meaning: 'lương', example: '发工资的日子是25号。', exampleMeaning: 'Ngày lương là ngày 25.', difficulty: DIFFICULTY.MEDIUM },
      { word: '请假 (qǐngjià)', meaning: 'xin nghỉ phép', example: '我想请假一天。', exampleMeaning: 'Tôi muốn xin nghỉ một ngày.', difficulty: DIFFICULTY.MEDIUM },
      { word: '名片 (míngpiàn)', meaning: 'danh thiếp', example: '请给我你的名片。', exampleMeaning: 'Xin cho tôi danh thiếp của bạn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '出差 (chūchāi)', meaning: 'công tác', example: '下个月要出差。', exampleMeaning: 'Tháng sau phải đi công tác.', difficulty: DIFFICULTY.HARD },
      { word: '面试 (miànshì)', meaning: 'phỏng vấn', example: '明天有面试。', exampleMeaning: 'Ngày mai có buổi phỏng vấn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '截止日期 (jiézhǐ rìqī)', meaning: 'hạn chót', example: '截止日期是星期五。', exampleMeaning: 'Hạn chót là thứ Sáu.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"工作" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Trường học', 'Công việc', 'Nhà hàng', 'Bệnh viện'], answer: 'Công việc', explanationVi: '工作 (gōngzuò) = công việc', difficulty: DIFFICULTY.EASY },
      { question: '"Công ty" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['学校', '公司', '医院', '银行'], answer: '公司', explanationVi: '公司 (gōngsī) = công ty', difficulty: DIFFICULTY.EASY },
      { question: '"加班" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nghỉ phép', 'Làm thêm giờ', 'Họp', 'Công tác'], answer: 'Làm thêm giờ', explanationVi: '加班 (jiābān) = làm thêm giờ', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Đồng nghiệp" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['老板', '同事', '下属', '经理'], answer: '同事', explanationVi: '同事 (tóngshì) = đồng nghiệp', difficulty: DIFFICULTY.MEDIUM },
      { question: '"出差" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nghỉ phép', 'Phỏng vấn', 'Công tác', 'Lịch trình'], answer: 'Công tác', explanationVi: '出差 (chūchāi) = công tác', difficulty: DIFFICULTY.HARD },
    ],
  },
];
