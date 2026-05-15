import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseShoppingLessons: LessonData[] = [
  {
    title: '购物 (Shopping)',
    titleVi: 'Mua sắm',
    description: 'Shopping vocabulary and phrases in Chinese',
    descriptionVi: 'Từ vựng và cụm từ mua sắm tiếng Trung',
    topic: TOPICS.SHOPPING,
    vocabulary: [
      { word: '多少钱', reading: 'duō shǎo qián', meaning: 'bao nhiêu tiền?', example: '这个多少钱？', exampleMeaning: 'Cái này bao nhiêu tiền?', difficulty: DIFFICULTY.EASY },
      { word: '贵', reading: 'guì', meaning: 'đắt', example: '太贵了！', exampleMeaning: 'Đắt quá!', difficulty: DIFFICULTY.EASY },
      { word: '便宜', reading: 'pián yi', meaning: 'rẻ', example: '能便宜一点吗？', exampleMeaning: 'Giảm giá được không?', difficulty: DIFFICULTY.EASY },
      { word: '大', reading: 'dà', meaning: 'to/lớn', example: '有大一点的吗？', exampleMeaning: 'Có cái lớn hơn không?', difficulty: DIFFICULTY.VERY_EASY },
      { word: '小', reading: 'xiǎo', meaning: 'nhỏ', example: '太小了。', exampleMeaning: 'Nhỏ quá.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '试', reading: 'shì', meaning: 'thử', example: '我可以试一下吗？', exampleMeaning: 'Tôi thử được không?', difficulty: DIFFICULTY.EASY },
      { word: '颜色', reading: 'yán sè', meaning: 'màu sắc', example: '有别的颜色吗？', exampleMeaning: 'Có màu khác không?', difficulty: DIFFICULTY.EASY },
      { word: '打折', reading: 'dǎ zhé', meaning: 'giảm giá', example: '现在打折吗？', exampleMeaning: 'Bây giờ có giảm giá không?', difficulty: DIFFICULTY.EASY },
      { word: '付钱', reading: 'fù qián', meaning: 'trả tiền', example: '在哪里付钱？', exampleMeaning: 'Trả tiền ở đâu?', difficulty: DIFFICULTY.EASY },
      { word: '现金', reading: 'xiàn jīn', meaning: 'tiền mặt', example: '可以用现金吗？', exampleMeaning: 'Dùng tiền mặt được không?', difficulty: DIFFICULTY.EASY },
      { word: '刷卡', reading: 'shuā kǎ', meaning: 'quẹt thẻ', example: '可以刷卡吗？', exampleMeaning: 'Quẹt thẻ được không?', difficulty: DIFFICULTY.EASY },
      { word: '收据', reading: 'shōu jù', meaning: 'hóa đơn', example: '请给我收据。', exampleMeaning: 'Cho tôi hóa đơn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '退货', reading: 'tuì huò', meaning: 'trả hàng', example: '可以退货吗？', exampleMeaning: 'Trả hàng được không?', difficulty: DIFFICULTY.MEDIUM },
      { word: '换', reading: 'huàn', meaning: 'đổi', example: '我想换一个。', exampleMeaning: 'Tôi muốn đổi cái khác.', difficulty: DIFFICULTY.EASY },
      { word: '包装', reading: 'bāo zhuāng', meaning: 'gói/đóng gói', example: '请帮我包装。', exampleMeaning: 'Gói giúp tôi.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: 'Hỏi giá tiếng Trung nói thế nào?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['这是什么', '多少钱', '在哪里', '怎么走'], answer: '多少钱', explanation: '多少钱 (duō shǎo qián) = bao nhiêu tiền?', explanationVi: '多少钱 (duō shǎo qián) = bao nhiêu tiền?', difficulty: DIFFICULTY.EASY },
      { question: '"贵" nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Rẻ', 'Đắt', 'Đẹp', 'Xấu'], answer: 'Đắt', explanation: '贵 (guì) = đắt', explanationVi: '贵 (guì) = đắt', difficulty: DIFFICULTY.EASY },
      { question: 'Điền vào: "能___一点吗？" (rẻ)', type: QUIZ_TYPES.FILL_BLANK, options: [], answer: '便宜', explanation: '便宜 (pián yi) = rẻ. "能便宜一点吗" = Giảm giá được không?', explanationVi: '便宜 (pián yi) = rẻ. "能便宜一点吗" = Giảm giá được không?', difficulty: DIFFICULTY.EASY },
      { question: '"Quẹt thẻ" tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['付钱', '刷卡', '现金', '找钱'], answer: '刷卡', explanation: '刷卡 (shuā kǎ) = quẹt thẻ', explanationVi: '刷卡 (shuā kǎ) = quẹt thẻ', difficulty: DIFFICULTY.EASY },
      { question: 'Ghép: "打折" = ?', type: QUIZ_TYPES.MATCHING, options: ['Trả tiền', 'Giảm giá', 'Trả hàng', 'Đổi hàng'], answer: 'Giảm giá', explanation: '打折 (dǎ zhé) = giảm giá', explanationVi: '打折 (dǎ zhé) = giảm giá', difficulty: DIFFICULTY.EASY },
    ],
  },
];
