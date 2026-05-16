import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseTravelLessons: LessonData[] = [
  {
    title: '旅行 (Travel)',
    titleVi: 'Du lịch',
    description: 'Learn travel vocabulary in Chinese',
    descriptionVi: 'Học từ vựng du lịch tiếng Trung',
    topic: TOPICS.TRAVEL,
    vocabulary: [
      { word: '机场', reading: 'jī chǎng', meaning: 'sân bay', example: '我们去机场。', exampleMeaning: 'Chúng tôi đi sân bay.', difficulty: DIFFICULTY.EASY },
      { word: '火车站', reading: 'huǒ chē zhàn', meaning: 'nhà ga', example: '火车站在哪里？', exampleMeaning: 'Nhà ga ở đâu?', difficulty: DIFFICULTY.EASY },
      { word: '酒店', reading: 'jiǔ diàn', meaning: 'khách sạn', example: '我订了酒店。', exampleMeaning: 'Tôi đã đặt khách sạn.', difficulty: DIFFICULTY.EASY },
      { word: '护照', reading: 'hù zhào', meaning: 'hộ chiếu', example: '请出示护照。', exampleMeaning: 'Xin xuất trình hộ chiếu.', difficulty: DIFFICULTY.EASY },
      { word: '签证', reading: 'qiān zhèng', meaning: 'visa', example: '我需要签证。', exampleMeaning: 'Tôi cần visa.', difficulty: DIFFICULTY.MEDIUM },
      { word: '行李', reading: 'xíng li', meaning: 'hành lý', example: '我的行李很重。', exampleMeaning: 'Hành lý của tôi rất nặng.', difficulty: DIFFICULTY.EASY },
      { word: '地铁', reading: 'dì tiě', meaning: 'tàu điện ngầm', example: '坐地铁去。', exampleMeaning: 'Đi bằng tàu điện ngầm.', difficulty: DIFFICULTY.EASY },
      { word: '出租车', reading: 'chū zū chē', meaning: 'taxi', example: '叫一辆出租车。', exampleMeaning: 'Gọi một chiếc taxi.', difficulty: DIFFICULTY.EASY },
      { word: '地图', reading: 'dì tú', meaning: 'bản đồ', example: '给我看地图。', exampleMeaning: 'Cho tôi xem bản đồ.', difficulty: DIFFICULTY.EASY },
      { word: '景点', reading: 'jǐng diǎn', meaning: 'điểm tham quan', example: '这个景点很有名。', exampleMeaning: 'Điểm tham quan này rất nổi tiếng.', difficulty: DIFFICULTY.MEDIUM },
      { word: '门票', reading: 'mén piào', meaning: 'vé vào cửa', example: '门票多少钱？', exampleMeaning: 'Vé vào cửa bao nhiêu tiền?', difficulty: DIFFICULTY.MEDIUM },
      { word: '导游', reading: 'dǎo yóu', meaning: 'hướng dẫn viên', example: '我们需要导游吗？', exampleMeaning: 'Chúng ta cần hướng dẫn viên không?', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"机场" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nhà ga', 'Sân bay', 'Bến xe', 'Cảng'], answer: 'Sân bay', explanationVi: '机场 (jī chǎng) = sân bay', difficulty: DIFFICULTY.EASY },
      { question: '"Hộ chiếu" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['护照', '签证', '门票', '地图'], answer: '护照', explanationVi: '护照 (hù zhào) = hộ chiếu', difficulty: DIFFICULTY.EASY },
      { question: '"地铁" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Xe buýt', 'Tàu điện ngầm', 'Taxi', 'Xe đạp'], answer: 'Tàu điện ngầm', explanationVi: '地铁 (dì tiě) = tàu điện ngầm', difficulty: DIFFICULTY.EASY },
      { question: '"Hành lý" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['行李', '护照', '签证', '门票'], answer: '行李', explanationVi: '行李 (xíng li) = hành lý', difficulty: DIFFICULTY.EASY },
      { question: '"导游" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tài xế', 'Hướng dẫn viên', 'Tiếp viên', 'Bảo vệ'], answer: 'Hướng dẫn viên', explanationVi: '导游 (dǎo yóu) = hướng dẫn viên', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
