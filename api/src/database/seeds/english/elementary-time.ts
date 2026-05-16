import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishTimeLessons: LessonData[] = [
  {
    title: 'Time & Schedule',
    titleVi: 'Thời gian & Lịch trình',
    description: 'Learn time-related vocabulary in English',
    descriptionVi: 'Học từ vựng về thời gian bằng tiếng Anh',
    topic: TOPICS.TIME,
    vocabulary: [
      { word: 'morning', meaning: 'buổi sáng', example: 'I exercise in the morning.', exampleMeaning: 'Tôi tập thể dục buổi sáng.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'afternoon', meaning: 'buổi chiều', example: 'I have class in the afternoon.', exampleMeaning: 'Tôi có lớp buổi chiều.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'evening', meaning: 'buổi tối', example: 'I watch TV in the evening.', exampleMeaning: 'Tôi xem TV buổi tối.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'midnight', meaning: 'nửa đêm', example: 'I sleep before midnight.', exampleMeaning: 'Tôi ngủ trước nửa đêm.', difficulty: DIFFICULTY.EASY },
      { word: 'schedule', meaning: 'lịch trình', example: 'What is your schedule today?', exampleMeaning: 'Lịch trình hôm nay của bạn là gì?', difficulty: DIFFICULTY.EASY },
      { word: 'appointment', meaning: 'cuộc hẹn', example: 'I have a doctor appointment.', exampleMeaning: 'Tôi có cuộc hẹn bác sĩ.', difficulty: DIFFICULTY.EASY },
      { word: 'on time', meaning: 'đúng giờ', example: 'Please arrive on time.', exampleMeaning: 'Xin hãy đến đúng giờ.', difficulty: DIFFICULTY.EASY },
      { word: 'late', meaning: 'muộn/trễ', example: 'I am late for work.', exampleMeaning: 'Tôi đi làm muộn.', difficulty: DIFFICULTY.EASY },
      { word: 'early', meaning: 'sớm', example: 'I wake up early.', exampleMeaning: 'Tôi dậy sớm.', difficulty: DIFFICULTY.EASY },
      { word: 'weekend', meaning: 'cuối tuần', example: 'I relax on weekends.', exampleMeaning: 'Tôi thư giãn vào cuối tuần.', difficulty: DIFFICULTY.EASY },
      { word: 'weekday', meaning: 'ngày trong tuần', example: 'I work on weekdays.', exampleMeaning: 'Tôi làm việc ngày trong tuần.', difficulty: DIFFICULTY.EASY },
      { word: 'quarter', meaning: '15 phút/một phần tư', example: 'It is a quarter past three.', exampleMeaning: 'Bây giờ là 3 giờ 15 phút.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"morning" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Buổi tối', 'Buổi sáng', 'Buổi chiều', 'Nửa đêm'], answer: 'Buổi sáng', explanationVi: 'morning = buổi sáng', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"Đúng giờ" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['late', 'early', 'on time', 'fast'], answer: 'on time', explanationVi: 'on time = đúng giờ', difficulty: DIFFICULTY.EASY },
      { question: '"appointment" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Lịch trình', 'Cuộc hẹn', 'Cuộc họp', 'Bữa tiệc'], answer: 'Cuộc hẹn', explanationVi: 'appointment = cuộc hẹn', difficulty: DIFFICULTY.EASY },
      { question: '"Cuối tuần" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['weekday', 'weekend', 'holiday', 'vacation'], answer: 'weekend', explanationVi: 'weekend = cuối tuần (thứ 7 và chủ nhật)', difficulty: DIFFICULTY.EASY },
      { question: '"late" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sớm', 'Muộn', 'Đúng giờ', 'Nhanh'], answer: 'Muộn', explanationVi: 'late = muộn/trễ', difficulty: DIFFICULTY.EASY },
    ],
  },
];
