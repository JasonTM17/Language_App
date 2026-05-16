import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseTimeLessons: LessonData[] = [
  {
    title: 'Time & Schedule',
    titleVi: 'Thời gian & Lịch trình',
    description: 'Learn time-related vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về thời gian bằng tiếng Trung',
    topic: TOPICS.TIME,
    vocabulary: [
      { word: '早上 (zǎoshang)', meaning: 'buổi sáng', example: '早上好！', exampleMeaning: 'Chào buổi sáng!', difficulty: DIFFICULTY.EASY },
      { word: '中午 (zhōngwǔ)', meaning: 'buổi trưa', example: '中午吃饭。', exampleMeaning: 'Ăn trưa.', difficulty: DIFFICULTY.EASY },
      { word: '晚上 (wǎnshang)', meaning: 'buổi tối', example: '晚上看电视。', exampleMeaning: 'Buổi tối xem TV.', difficulty: DIFFICULTY.EASY },
      { word: '今天 (jīntiān)', meaning: 'hôm nay', example: '今天是星期一。', exampleMeaning: 'Hôm nay là thứ Hai.', difficulty: DIFFICULTY.EASY },
      { word: '明天 (míngtiān)', meaning: 'ngày mai', example: '明天休息。', exampleMeaning: 'Ngày mai nghỉ.', difficulty: DIFFICULTY.EASY },
      { word: '昨天 (zuótiān)', meaning: 'hôm qua', example: '昨天很忙。', exampleMeaning: 'Hôm qua rất bận.', difficulty: DIFFICULTY.EASY },
      { word: '周末 (zhōumò)', meaning: 'cuối tuần', example: '周末看电影。', exampleMeaning: 'Cuối tuần xem phim.', difficulty: DIFFICULTY.EASY },
      { word: '日程 (rìchéng)', meaning: 'lịch trình', example: '明天的日程是什么？', exampleMeaning: 'Lịch trình ngày mai là gì?', difficulty: DIFFICULTY.MEDIUM },
      { word: '约会 (yuēhuì)', meaning: 'cuộc hẹn', example: '我有约会。', exampleMeaning: 'Tôi có cuộc hẹn.', difficulty: DIFFICULTY.EASY },
      { word: '迟到 (chídào)', meaning: 'đến muộn', example: '对不起，我迟到了。', exampleMeaning: 'Xin lỗi, tôi đến muộn.', difficulty: DIFFICULTY.EASY },
      { word: '早 (zǎo)', meaning: 'sớm', example: '我起得很早。', exampleMeaning: 'Tôi dậy rất sớm.', difficulty: DIFFICULTY.EASY },
      { word: '时间 (shíjiān)', meaning: 'thời gian', example: '没有时间。', exampleMeaning: 'Không có thời gian.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"早上" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Buổi tối', 'Buổi sáng', 'Buổi chiều', 'Nửa đêm'], answer: 'Buổi sáng', explanationVi: '早上 (zǎoshang) = buổi sáng', difficulty: DIFFICULTY.EASY },
      { question: '"Ngày mai" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['昨天', '明天', '今天', '每天'], answer: '明天', explanationVi: '明天 (míngtiān) = ngày mai', difficulty: DIFFICULTY.EASY },
      { question: '"迟到" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sớm', 'Đến muộn', 'Đúng giờ', 'Nhanh'], answer: 'Đến muộn', explanationVi: '迟到 (chídào) = đến muộn', difficulty: DIFFICULTY.EASY },
      { question: '"Cuối tuần" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['工作日', '周末', '假日', '节日'], answer: '周末', explanationVi: '周末 (zhōumò) = cuối tuần', difficulty: DIFFICULTY.EASY },
      { question: '"时间" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tiền', 'Thời gian', 'Không gian', 'Cơ hội'], answer: 'Thời gian', explanationVi: '时间 (shíjiān) = thời gian', difficulty: DIFFICULTY.EASY },
    ],
  },
];
