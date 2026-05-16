import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanTimeLessons: LessonData[] = [
  {
    title: 'Time & Schedule',
    titleVi: 'Thời gian & Lịch trình',
    description: 'Learn time-related vocabulary in Korean',
    descriptionVi: 'Học từ vựng về thời gian bằng tiếng Hàn',
    topic: TOPICS.TIME,
    vocabulary: [
      { word: '아침', meaning: 'buổi sáng', example: '아침에 운동해요.', exampleMeaning: 'Tôi tập thể dục buổi sáng.', difficulty: DIFFICULTY.EASY },
      { word: '점심', meaning: 'buổi trưa', example: '점심시간이에요.', exampleMeaning: 'Giờ nghỉ trưa.', difficulty: DIFFICULTY.EASY },
      { word: '저녁', meaning: 'buổi tối', example: '저녁에 TV를 봐요.', exampleMeaning: 'Tôi xem TV buổi tối.', difficulty: DIFFICULTY.EASY },
      { word: '오늘', meaning: 'hôm nay', example: '오늘은 월요일이에요.', exampleMeaning: 'Hôm nay là thứ Hai.', difficulty: DIFFICULTY.EASY },
      { word: '내일', meaning: 'ngày mai', example: '내일은 쉬어요.', exampleMeaning: 'Ngày mai nghỉ.', difficulty: DIFFICULTY.EASY },
      { word: '어제', meaning: 'hôm qua', example: '어제 바빴어요.', exampleMeaning: 'Hôm qua bận.', difficulty: DIFFICULTY.EASY },
      { word: '주말', meaning: 'cuối tuần', example: '주말에 영화를 봐요.', exampleMeaning: 'Cuối tuần tôi xem phim.', difficulty: DIFFICULTY.EASY },
      { word: '일정', meaning: 'lịch trình', example: '내일 일정이 뭐예요?', exampleMeaning: 'Lịch trình ngày mai là gì?', difficulty: DIFFICULTY.EASY },
      { word: '약속', meaning: 'cuộc hẹn/lời hứa', example: '약속이 있어요.', exampleMeaning: 'Tôi có cuộc hẹn.', difficulty: DIFFICULTY.EASY },
      { word: '늦다', meaning: 'muộn/trễ', example: '늦어서 미안해요.', exampleMeaning: 'Xin lỗi vì đến muộn.', difficulty: DIFFICULTY.EASY },
      { word: '일찍', meaning: 'sớm', example: '일찍 일어나요.', exampleMeaning: 'Tôi dậy sớm.', difficulty: DIFFICULTY.EASY },
      { word: '시간', meaning: 'thời gian', example: '시간이 없어요.', exampleMeaning: 'Không có thời gian.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"아침" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Buổi tối', 'Buổi sáng', 'Buổi chiều', 'Nửa đêm'], answer: 'Buổi sáng', explanationVi: '아침 = buổi sáng', difficulty: DIFFICULTY.EASY },
      { question: '"Ngày mai" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['어제', '내일', '오늘', '매일'], answer: '내일', explanationVi: '내일 = ngày mai', difficulty: DIFFICULTY.EASY },
      { question: '"약속" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Lịch trình', 'Cuộc hẹn', 'Cuộc họp', 'Bữa tiệc'], answer: 'Cuộc hẹn', explanationVi: '약속 = cuộc hẹn/lời hứa', difficulty: DIFFICULTY.EASY },
      { question: '"Cuối tuần" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['평일', '주말', '휴일', '공휴일'], answer: '주말', explanationVi: '주말 = cuối tuần', difficulty: DIFFICULTY.EASY },
      { question: '"늦다" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sớm', 'Muộn', 'Đúng giờ', 'Nhanh'], answer: 'Muộn', explanationVi: '늦다 = muộn/trễ', difficulty: DIFFICULTY.EASY },
    ],
  },
];
