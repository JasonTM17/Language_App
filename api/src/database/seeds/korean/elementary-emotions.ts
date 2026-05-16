import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanEmotionsLessons: LessonData[] = [
  {
    title: 'Emotions & Feelings',
    titleVi: 'Cảm xúc & Tâm trạng',
    description: 'Learn emotion vocabulary in Korean',
    descriptionVi: 'Học từ vựng về cảm xúc bằng tiếng Hàn',
    topic: TOPICS.EMOTIONS,
    vocabulary: [
      { word: '기쁘다', meaning: 'vui mừng', example: '시험에 합격해서 기뻐요.', exampleMeaning: 'Tôi vui vì đậu kỳ thi.', difficulty: DIFFICULTY.EASY },
      { word: '슬프다', meaning: 'buồn', example: '영화가 슬퍼요.', exampleMeaning: 'Bộ phim buồn.', difficulty: DIFFICULTY.EASY },
      { word: '화나다', meaning: 'tức giận', example: '거짓말에 화가 났어요.', exampleMeaning: 'Tôi tức giận vì lời nói dối.', difficulty: DIFFICULTY.EASY },
      { word: '무섭다', meaning: 'sợ hãi', example: '어두운 곳이 무서워요.', exampleMeaning: 'Tôi sợ chỗ tối.', difficulty: DIFFICULTY.EASY },
      { word: '피곤하다', meaning: 'mệt mỏi', example: '오늘 너무 피곤해요.', exampleMeaning: 'Hôm nay tôi rất mệt.', difficulty: DIFFICULTY.EASY },
      { word: '행복하다', meaning: 'hạnh phúc', example: '가족과 함께 행복해요.', exampleMeaning: 'Tôi hạnh phúc bên gia đình.', difficulty: DIFFICULTY.EASY },
      { word: '외롭다', meaning: 'cô đơn', example: '혼자 있으면 외로워요.', exampleMeaning: 'Ở một mình thì cô đơn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '걱정하다', meaning: 'lo lắng', example: '시험이 걱정돼요.', exampleMeaning: 'Tôi lo lắng về kỳ thi.', difficulty: DIFFICULTY.MEDIUM },
      { word: '놀라다', meaning: 'ngạc nhiên', example: '선물을 받아서 놀랐어요.', exampleMeaning: 'Tôi ngạc nhiên vì nhận quà.', difficulty: DIFFICULTY.MEDIUM },
      { word: '부끄럽다', meaning: 'xấu hổ', example: '실수해서 부끄러워요.', exampleMeaning: 'Tôi xấu hổ vì mắc lỗi.', difficulty: DIFFICULTY.MEDIUM },
      { word: '심심하다', meaning: 'chán', example: '할 일이 없어서 심심해요.', exampleMeaning: 'Không có gì làm nên chán.', difficulty: DIFFICULTY.EASY },
      { word: '설레다', meaning: 'hồi hộp/phấn khích', example: '여행 전에 설레요.', exampleMeaning: 'Tôi hồi hộp trước chuyến đi.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"기쁘다" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Buồn', 'Vui mừng', 'Tức giận', 'Sợ hãi'], answer: 'Vui mừng', explanationVi: '기쁘다 = vui mừng', difficulty: DIFFICULTY.EASY },
      { question: '"Buồn" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['기쁘다', '슬프다', '화나다', '무섭다'], answer: '슬프다', explanationVi: '슬프다 = buồn', difficulty: DIFFICULTY.EASY },
      { question: '"피곤하다" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Vui vẻ', 'Buồn ngủ', 'Mệt mỏi', 'Đói'], answer: 'Mệt mỏi', explanationVi: '피곤하다 = mệt mỏi', difficulty: DIFFICULTY.EASY },
      { question: '"Hạnh phúc" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['행복하다', '기쁘다', '설레다', '놀라다'], answer: '행복하다', explanationVi: '행복하다 = hạnh phúc', difficulty: DIFFICULTY.EASY },
      { question: '"걱정하다" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Vui vẻ', 'Lo lắng', 'Tức giận', 'Ngạc nhiên'], answer: 'Lo lắng', explanationVi: '걱정하다 = lo lắng', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
