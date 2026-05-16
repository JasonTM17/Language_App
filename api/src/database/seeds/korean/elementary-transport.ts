import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanTransportLessons: LessonData[] = [
  {
    title: 'Transportation',
    titleVi: 'Giao thông',
    description: 'Learn transportation vocabulary in Korean',
    descriptionVi: 'Học từ vựng về giao thông bằng tiếng Hàn',
    topic: TOPICS.TRANSPORT,
    vocabulary: [
      { word: '지하철', meaning: 'tàu điện ngầm', example: '지하철을 타요.', exampleMeaning: 'Tôi đi tàu điện ngầm.', difficulty: DIFFICULTY.EASY },
      { word: '버스', meaning: 'xe buýt', example: '버스로 가요.', exampleMeaning: 'Tôi đi bằng xe buýt.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '비행기', meaning: 'máy bay', example: '비행기로 여행해요.', exampleMeaning: 'Tôi du lịch bằng máy bay.', difficulty: DIFFICULTY.EASY },
      { word: '자전거', meaning: 'xe đạp', example: '자전거를 타요.', exampleMeaning: 'Tôi đi xe đạp.', difficulty: DIFFICULTY.EASY },
      { word: '자동차', meaning: 'ô tô', example: '자동차를 운전해요.', exampleMeaning: 'Tôi lái ô tô.', difficulty: DIFFICULTY.EASY },
      { word: '역', meaning: 'ga tàu', example: '역이 어디예요?', exampleMeaning: 'Ga tàu ở đâu?', difficulty: DIFFICULTY.EASY },
      { word: '표', meaning: 'vé', example: '표를 사요.', exampleMeaning: 'Tôi mua vé.', difficulty: DIFFICULTY.EASY },
      { word: '택시', meaning: 'taxi', example: '택시를 타요.', exampleMeaning: 'Tôi đi taxi.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '기차', meaning: 'tàu hỏa', example: '기차로 부산에 가요.', exampleMeaning: 'Tôi đi Busan bằng tàu hỏa.', difficulty: DIFFICULTY.EASY },
      { word: 'KTX', meaning: 'tàu cao tốc Hàn Quốc', example: 'KTX는 빨라요.', exampleMeaning: 'KTX rất nhanh.', difficulty: DIFFICULTY.EASY },
      { word: '공항', meaning: 'sân bay', example: '공항에 도착했어요.', exampleMeaning: 'Tôi đã đến sân bay.', difficulty: DIFFICULTY.EASY },
      { word: '길', meaning: 'đường', example: '이 길은 복잡해요.', exampleMeaning: 'Con đường này phức tạp.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"지하철" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Xe buýt', 'Tàu điện ngầm', 'Ô tô', 'Máy bay'], answer: 'Tàu điện ngầm', explanationVi: '지하철 = tàu điện ngầm', difficulty: DIFFICULTY.EASY },
      { question: '"Xe đạp" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['자전거', '자동차', '지하철', '버스'], answer: '자전거', explanationVi: '자전거 = xe đạp', difficulty: DIFFICULTY.EASY },
      { question: '"표" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ga tàu', 'Vé', 'Đường', 'Sân bay'], answer: 'Vé', explanationVi: '표 = vé', difficulty: DIFFICULTY.EASY },
      { question: '"Sân bay" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['역', '공항', '길', '항구'], answer: '공항', explanationVi: '공항 = sân bay', difficulty: DIFFICULTY.EASY },
      { question: '"기차" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tàu điện ngầm', 'Xe buýt', 'Tàu hỏa', 'Taxi'], answer: 'Tàu hỏa', explanationVi: '기차 = tàu hỏa', difficulty: DIFFICULTY.EASY },
    ],
  },
];
