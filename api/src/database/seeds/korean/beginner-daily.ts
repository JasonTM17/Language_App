import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanDailyLessons: LessonData[] = [
  {
    title: '일상생활 (Daily Life)',
    titleVi: 'Cuộc sống hàng ngày',
    description: 'Common daily activities in Korean',
    descriptionVi: 'Hoạt động hàng ngày bằng tiếng Hàn',
    topic: TOPICS.DAILY_LIFE,
    vocabulary: [
      { word: '일어나다', reading: 'ireonada', meaning: 'thức dậy', example: '아침 7시에 일어나요.', exampleMeaning: 'Tôi dậy lúc 7 giờ sáng.', difficulty: DIFFICULTY.EASY },
      { word: '자다', reading: 'jada', meaning: 'ngủ', example: '11시에 자요.', exampleMeaning: 'Tôi ngủ lúc 11 giờ.', difficulty: DIFFICULTY.EASY },
      { word: '먹다', reading: 'meokda', meaning: 'ăn', example: '아침을 먹어요.', exampleMeaning: 'Tôi ăn sáng.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '마시다', reading: 'masida', meaning: 'uống', example: '커피를 마셔요.', exampleMeaning: 'Tôi uống cà phê.', difficulty: DIFFICULTY.EASY },
      { word: '가다', reading: 'gada', meaning: 'đi', example: '학교에 가요.', exampleMeaning: 'Tôi đi học.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '오다', reading: 'oda', meaning: 'đến/về', example: '집에 와요.', exampleMeaning: 'Tôi về nhà.', difficulty: DIFFICULTY.EASY },
      { word: '공부하다', reading: 'gongbuhada', meaning: 'học', example: '한국어를 공부해요.', exampleMeaning: 'Tôi học tiếng Hàn.', difficulty: DIFFICULTY.EASY },
      { word: '일하다', reading: 'ilhada', meaning: 'làm việc', example: '월요일부터 금요일까지 일해요.', exampleMeaning: 'Tôi làm việc từ thứ 2 đến thứ 6.', difficulty: DIFFICULTY.EASY },
      { word: '운동하다', reading: 'undonghada', meaning: 'tập thể dục', example: '매일 운동해요.', exampleMeaning: 'Tôi tập thể dục mỗi ngày.', difficulty: DIFFICULTY.EASY },
      { word: '쇼핑하다', reading: 'syopinghada', meaning: 'mua sắm', example: '주말에 쇼핑해요.', exampleMeaning: 'Cuối tuần tôi đi mua sắm.', difficulty: DIFFICULTY.EASY },
      { word: '요리하다', reading: 'yorihada', meaning: 'nấu ăn', example: '저녁을 요리해요.', exampleMeaning: 'Tôi nấu bữa tối.', difficulty: DIFFICULTY.EASY },
      { word: '보다', reading: 'boda', meaning: 'xem/nhìn', example: 'TV를 봐요.', exampleMeaning: 'Tôi xem TV.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '듣다', reading: 'deutda', meaning: 'nghe', example: '음악을 들어요.', exampleMeaning: 'Tôi nghe nhạc.', difficulty: DIFFICULTY.EASY },
      { word: '읽다', reading: 'ikda', meaning: 'đọc', example: '책을 읽어요.', exampleMeaning: 'Tôi đọc sách.', difficulty: DIFFICULTY.EASY },
      { word: '쓰다', reading: 'sseuda', meaning: 'viết', example: '일기를 써요.', exampleMeaning: 'Tôi viết nhật ký.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"일어나다" nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ngủ', 'Thức dậy', 'Ăn', 'Đi'], answer: 'Thức dậy', explanation: '일어나다 (ireonada) = thức dậy', explanationVi: '일어나다 (ireonada) = thức dậy', difficulty: DIFFICULTY.EASY },
      { question: 'Cách đọc của "먹다" là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['masida', 'meokda', 'gada', 'boda'], answer: 'meokda', explanation: '먹다 đọc là "meokda" = ăn', explanationVi: '먹다 đọc là "meokda" = ăn', difficulty: DIFFICULTY.EASY },
      { question: 'Điền vào: "한국어를 ___해요." (học)', type: QUIZ_TYPES.FILL_BLANK, options: [], answer: '공부', explanation: '공부하다 (gongbuhada) = học', explanationVi: '공부하다 (gongbuhada) = học', difficulty: DIFFICULTY.EASY },
      { question: '"Về nhà" tiếng Hàn nói thế nào?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['학교에 가요', '집에 와요', '일해요', '자요'], answer: '집에 와요', explanation: '집에 오다 = về nhà (집 = nhà, 오다 = đến/về)', explanationVi: '집에 오다 = về nhà (집 = nhà, 오다 = đến/về)', difficulty: DIFFICULTY.EASY },
      { question: 'Ghép: "요리하다" = ?', type: QUIZ_TYPES.MATCHING, options: ['Mua sắm', 'Nấu ăn', 'Tập thể dục', 'Làm việc'], answer: 'Nấu ăn', explanation: '요리하다 (yorihada) = nấu ăn', explanationVi: '요리하다 (yorihada) = nấu ăn', difficulty: DIFFICULTY.EASY },
    ],
  },
];
