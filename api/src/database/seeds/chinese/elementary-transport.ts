import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseTransportLessons: LessonData[] = [
  {
    title: 'Transportation',
    titleVi: 'Giao thông',
    description: 'Learn transportation vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về giao thông bằng tiếng Trung',
    topic: TOPICS.TRANSPORT,
    vocabulary: [
      { word: '地铁 (dìtiě)', meaning: 'tàu điện ngầm', example: '我坐地铁上班。', exampleMeaning: 'Tôi đi tàu điện ngầm đi làm.', difficulty: DIFFICULTY.EASY },
      { word: '公交车 (gōngjiāochē)', meaning: 'xe buýt', example: '公交车来了。', exampleMeaning: 'Xe buýt đến rồi.', difficulty: DIFFICULTY.EASY },
      { word: '飞机 (fēijī)', meaning: 'máy bay', example: '我坐飞机去旅游。', exampleMeaning: 'Tôi đi du lịch bằng máy bay.', difficulty: DIFFICULTY.EASY },
      { word: '自行车 (zìxíngchē)', meaning: 'xe đạp', example: '我骑自行车。', exampleMeaning: 'Tôi đi xe đạp.', difficulty: DIFFICULTY.EASY },
      { word: '汽车 (qìchē)', meaning: 'ô tô', example: '我开汽车。', exampleMeaning: 'Tôi lái ô tô.', difficulty: DIFFICULTY.EASY },
      { word: '火车站 (huǒchēzhàn)', meaning: 'ga tàu', example: '火车站在哪里？', exampleMeaning: 'Ga tàu ở đâu?', difficulty: DIFFICULTY.EASY },
      { word: '票 (piào)', meaning: 'vé', example: '我买票。', exampleMeaning: 'Tôi mua vé.', difficulty: DIFFICULTY.EASY },
      { word: '出租车 (chūzūchē)', meaning: 'taxi', example: '我打出租车。', exampleMeaning: 'Tôi bắt taxi.', difficulty: DIFFICULTY.EASY },
      { word: '高铁 (gāotiě)', meaning: 'tàu cao tốc', example: '高铁很快。', exampleMeaning: 'Tàu cao tốc rất nhanh.', difficulty: DIFFICULTY.EASY },
      { word: '机场 (jīchǎng)', meaning: 'sân bay', example: '我到机场了。', exampleMeaning: 'Tôi đã đến sân bay.', difficulty: DIFFICULTY.EASY },
      { word: '路 (lù)', meaning: 'đường', example: '这条路很长。', exampleMeaning: 'Con đường này rất dài.', difficulty: DIFFICULTY.EASY },
      { word: '船 (chuán)', meaning: 'tàu thuyền', example: '我坐船。', exampleMeaning: 'Tôi đi tàu thuyền.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"地铁" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Xe buýt', 'Tàu điện ngầm', 'Ô tô', 'Máy bay'], answer: 'Tàu điện ngầm', explanationVi: '地铁 (dìtiě) = tàu điện ngầm', difficulty: DIFFICULTY.EASY },
      { question: '"Xe đạp" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['自行车', '汽车', '地铁', '公交车'], answer: '自行车', explanationVi: '自行车 (zìxíngchē) = xe đạp', difficulty: DIFFICULTY.EASY },
      { question: '"票" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ga tàu', 'Vé', 'Đường', 'Sân bay'], answer: 'Vé', explanationVi: '票 (piào) = vé', difficulty: DIFFICULTY.EASY },
      { question: '"Sân bay" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['火车站', '机场', '路', '港口'], answer: '机场', explanationVi: '机场 (jīchǎng) = sân bay', difficulty: DIFFICULTY.EASY },
      { question: '"高铁" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tàu điện ngầm', 'Xe buýt', 'Tàu cao tốc', 'Taxi'], answer: 'Tàu cao tốc', explanationVi: '高铁 (gāotiě) = tàu cao tốc', difficulty: DIFFICULTY.EASY },
    ],
  },
];
