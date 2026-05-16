import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanGreetingsLessons: LessonData[] = [
  {
    title: 'Greetings (인사)',
    titleVi: 'Chào hỏi',
    description: 'Learn basic Korean greetings and expressions',
    descriptionVi: 'Học các câu chào hỏi cơ bản tiếng Hàn',
    topic: TOPICS.GREETINGS,
    vocabulary: [
      { word: '안녕하세요', reading: 'annyeonghaseyo', meaning: 'xin chào (lịch sự)', example: '안녕하세요, 만나서 반갑습니다.', exampleMeaning: 'Xin chào, rất vui được gặp bạn.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '감사합니다', reading: 'gamsahamnida', meaning: 'cảm ơn (trang trọng)', example: '도와주셔서 감사합니다.', exampleMeaning: 'Cảm ơn vì đã giúp đỡ.', difficulty: DIFFICULTY.EASY },
      { word: '고마워요', reading: 'gomawoyo', meaning: 'cảm ơn (thân mật)', example: '선물 고마워요!', exampleMeaning: 'Cảm ơn vì món quà!', difficulty: DIFFICULTY.EASY },
      { word: '죄송합니다', reading: 'joesonghamnida', meaning: 'xin lỗi (trang trọng)', example: '늦어서 죄송합니다.', exampleMeaning: 'Xin lỗi vì đến muộn.', difficulty: DIFFICULTY.EASY },
      { word: '안녕히 가세요', reading: 'annyeonghi gaseyo', meaning: 'tạm biệt (người đi)', example: '안녕히 가세요! 조심하세요.', exampleMeaning: 'Tạm biệt! Cẩn thận nhé.', difficulty: DIFFICULTY.EASY },
      { word: '안녕히 계세요', reading: 'annyeonghi gyeseyo', meaning: 'tạm biệt (người ở lại)', example: '안녕히 계세요, 선생님.', exampleMeaning: 'Tạm biệt, thầy/cô.', difficulty: DIFFICULTY.EASY },
      { word: '만나서 반갑습니다', reading: 'mannaseo bangapseumnida', meaning: 'rất vui được gặp', example: '처음 뵙겠습니다. 만나서 반갑습니다.', exampleMeaning: 'Lần đầu gặp mặt. Rất vui được gặp.', difficulty: DIFFICULTY.EASY },
      { word: '잘 지내세요?', reading: 'jal jinaeseyo?', meaning: 'bạn khỏe không?', example: '오랜만이에요! 잘 지내세요?', exampleMeaning: 'Lâu rồi không gặp! Bạn khỏe không?', difficulty: DIFFICULTY.EASY },
      { word: '네', reading: 'ne', meaning: 'vâng/dạ', example: '네, 알겠습니다.', exampleMeaning: 'Vâng, tôi hiểu rồi.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '아니요', reading: 'aniyo', meaning: 'không', example: '아니요, 괜찮아요.', exampleMeaning: 'Không, không sao.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '실례합니다', reading: 'sillyehamnida', meaning: 'xin phép/xin lỗi (khi hỏi)', example: '실례합니다, 화장실이 어디예요?', exampleMeaning: 'Xin lỗi, nhà vệ sinh ở đâu?', difficulty: DIFFICULTY.EASY },
      { word: '잠시만요', reading: 'jamsimanyo', meaning: 'xin đợi một chút', example: '잠시만요, 곧 갈게요.', exampleMeaning: 'Đợi một chút, tôi sẽ đến ngay.', difficulty: DIFFICULTY.EASY },
      { word: '축하합니다', reading: 'chukahamnida', meaning: 'chúc mừng', example: '생일 축하합니다!', exampleMeaning: 'Chúc mừng sinh nhật!', difficulty: DIFFICULTY.EASY },
      { word: '잘 먹겠습니다', reading: 'jal meokgesseumnida', meaning: 'xin phép ăn (trước bữa ăn)', example: '잘 먹겠습니다! 맛있겠다.', exampleMeaning: 'Xin phép ăn! Trông ngon quá.', difficulty: DIFFICULTY.EASY },
      { word: '수고하셨습니다', reading: 'sugohasyeosseumnida', meaning: 'vất vả rồi (chào đồng nghiệp)', example: '오늘도 수고하셨습니다.', exampleMeaning: 'Hôm nay cũng vất vả rồi.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"Xin chào" (lịch sự) tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['감사합니다', '안녕하세요', '죄송합니다', '안녕히 가세요'], answer: '안녕하세요', explanation: '안녕하세요 = xin chào (lịch sự)', explanationVi: '안녕하세요 = xin chào (lịch sự)', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"Cảm ơn" (trang trọng) tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['고마워요', '감사합니다', '죄송합니다', '실례합니다'], answer: '감사합니다', explanation: '감사합니다 = cảm ơn (trang trọng)', explanationVi: '감사합니다 = cảm ơn (trang trọng)', difficulty: DIFFICULTY.EASY },
      { question: 'Nối: "축하합니다" = ?', type: QUIZ_TYPES.MATCHING, options: ['Chúc mừng', 'Cảm ơn', 'Xin lỗi', 'Tạm biệt'], answer: 'Chúc mừng', explanation: '축하합니다 = chúc mừng', explanationVi: '축하합니다 = chúc mừng', difficulty: DIFFICULTY.EASY },
      { question: '"Vâng/Dạ" tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['아니요', '네', '예', '응'], answer: '네', explanation: '네 = vâng/dạ', explanationVi: '네 = vâng/dạ', difficulty: DIFFICULTY.VERY_EASY },
      { question: 'Khi nói tạm biệt với người ĐI, dùng câu nào?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['안녕히 계세요', '안녕히 가세요', '잘 가요', '또 만나요'], answer: '안녕히 가세요', explanation: '안녕히 가세요 = tạm biệt (nói với người đi)', explanationVi: '안녕히 가세요 = tạm biệt (nói với người đi)', difficulty: DIFFICULTY.EASY },
    ],
  },
];
