import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanNatureLessons: LessonData[] = [
  {
    title: 'Nature & Geography',
    titleVi: 'Thiên nhiên & Địa lý',
    description: 'Learn nature and geography vocabulary in Korean',
    descriptionVi: 'Học từ vựng về thiên nhiên và địa lý bằng tiếng Hàn',
    topic: TOPICS.WEATHER,
    vocabulary: [
      { word: '화산', meaning: 'núi lửa', example: '화산이 폭발했어요.', exampleMeaning: 'Núi lửa đã phun trào.', difficulty: DIFFICULTY.MEDIUM },
      { word: '빙하', meaning: 'sông băng', example: '빙하가 녹고 있어요.', exampleMeaning: 'Sông băng đang tan.', difficulty: DIFFICULTY.HARD },
      { word: '반도', meaning: 'bán đảo', example: '한국은 반도예요.', exampleMeaning: 'Hàn Quốc là bán đảo.', difficulty: DIFFICULTY.EASY },
      { word: '군도', meaning: 'quần đảo', example: '일본은 군도예요.', exampleMeaning: 'Nhật Bản là quần đảo.', difficulty: DIFFICULTY.MEDIUM },
      { word: '폭포', meaning: 'thác nước', example: '폭포가 아름다워요.', exampleMeaning: 'Thác nước rất đẹp.', difficulty: DIFFICULTY.EASY },
      { word: '협곡', meaning: 'hẻm núi', example: '협곡이 웅장해요.', exampleMeaning: 'Hẻm núi rất hùng vĩ.', difficulty: DIFFICULTY.HARD },
      { word: '산호초', meaning: 'rạn san hô', example: '산호초를 보호합시다.', exampleMeaning: 'Hãy bảo vệ rạn san hô.', difficulty: DIFFICULTY.MEDIUM },
      { word: '가뭄', meaning: 'hạn hán', example: '가뭄이 계속되고 있어요.', exampleMeaning: 'Hạn hán đang tiếp diễn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '생태계', meaning: 'hệ sinh thái', example: '생태계를 보호합시다.', exampleMeaning: 'Hãy bảo vệ hệ sinh thái.', difficulty: DIFFICULTY.HARD },
      { word: '생물다양성', meaning: 'đa dạng sinh học', example: '생물다양성이 중요해요.', exampleMeaning: 'Đa dạng sinh học rất quan trọng.', difficulty: DIFFICULTY.HARD },
      { word: '열대', meaning: 'nhiệt đới', example: '베트남은 열대 기후예요.', exampleMeaning: 'Việt Nam có khí hậu nhiệt đới.', difficulty: DIFFICULTY.MEDIUM },
      { word: '대륙', meaning: 'lục địa', example: '대륙은 일곱 개 있어요.', exampleMeaning: 'Có bảy lục địa.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"화산" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sông', 'Núi lửa', 'Hồ', 'Đồi'], answer: 'Núi lửa', explanationVi: '화산 = núi lửa', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Sông băng" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['폭포', '빙하', '협곡', '화산'], answer: '빙하', explanationVi: '빙하 = sông băng', difficulty: DIFFICULTY.HARD },
      { question: '"군도" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bán đảo', 'Quần đảo', 'Lục địa', 'Đại dương'], answer: 'Quần đảo', explanationVi: '군도 = quần đảo', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Hạn hán" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['홍수', '가뭄', '태풍', '지진'], answer: '가뭄', explanationVi: '가뭄 = hạn hán', difficulty: DIFFICULTY.MEDIUM },
      { question: '"생태계" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Khí hậu', 'Hệ sinh thái', 'Thời tiết', 'Môi trường'], answer: 'Hệ sinh thái', explanationVi: '생태계 = hệ sinh thái', difficulty: DIFFICULTY.HARD },
    ],
  },
];
