import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseEmotionsIntermediateLessons: LessonData[] = [
  {
    title: 'Complex Emotions',
    titleVi: 'Cảm xúc phức tạp',
    description: 'Learn complex emotional vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về cảm xúc phức tạp bằng tiếng Trung',
    topic: TOPICS.EMOTIONS,
    vocabulary: [
      { word: '不知所措 (bùzhīsuǒcuò)', meaning: 'choáng ngợp/bối rối', example: '我感到不知所措。', exampleMeaning: 'Tôi cảm thấy choáng ngợp.', difficulty: DIFFICULTY.HARD },
      { word: '怀念 (huáiniàn)', meaning: 'hoài niệm/nhớ nhung', example: '我很怀念大学时光。', exampleMeaning: 'Tôi rất nhớ thời đại học.', difficulty: DIFFICULTY.MEDIUM },
      { word: '焦虑 (jiāolǜ)', meaning: 'lo lắng/bất an', example: '考试让我很焦虑。', exampleMeaning: 'Kỳ thi khiến tôi lo lắng.', difficulty: DIFFICULTY.MEDIUM },
      { word: '感恩 (gǎn\'ēn)', meaning: 'biết ơn', example: '我很感恩你的帮助。', exampleMeaning: 'Tôi rất biết ơn sự giúp đỡ của bạn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '沮丧 (jǔsàng)', meaning: 'bực bội/chán nản', example: '他对这个情况很沮丧。', exampleMeaning: 'Anh ấy rất chán nản với tình huống này.', difficulty: DIFFICULTY.MEDIUM },
      { word: '同理心 (tónglǐxīn)', meaning: 'sự đồng cảm', example: '要有同理心。', exampleMeaning: 'Hãy có sự đồng cảm.', difficulty: DIFFICULTY.HARD },
      { word: '怨恨 (yuànhèn)', meaning: 'sự oán giận', example: '放下怨恨吧。', exampleMeaning: 'Hãy buông bỏ sự oán giận.', difficulty: DIFFICULTY.HARD },
      { word: '满足 (mǎnzú)', meaning: 'sự mãn nguyện', example: '她在简单的事物中找到满足。', exampleMeaning: 'Cô ấy tìm thấy sự mãn nguyện trong những điều đơn giản.', difficulty: DIFFICULTY.MEDIUM },
      { word: '忧郁 (yōuyù)', meaning: 'u sầu/trầm uất', example: '他有些忧郁。', exampleMeaning: 'Anh ấy hơi u sầu.', difficulty: DIFFICULTY.HARD },
      { word: '慈悲 (cíbēi)', meaning: 'lòng trắc ẩn', example: '用慈悲对待每个人。', exampleMeaning: 'Đối xử với mọi người bằng lòng trắc ẩn.', difficulty: DIFFICULTY.HARD },
      { word: '脆弱 (cuìruò)', meaning: 'dễ bị tổn thương', example: '感到脆弱是正常的。', exampleMeaning: 'Cảm thấy dễ bị tổn thương là bình thường.', difficulty: DIFFICULTY.MEDIUM },
      { word: '坚韧 (jiānrèn)', meaning: 'kiên cường', example: '她非常坚韧。', exampleMeaning: 'Cô ấy rất kiên cường.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"怀念" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Vui vẻ', 'Hoài niệm/nhớ nhung', 'Buồn bã', 'Tức giận'], answer: 'Hoài niệm/nhớ nhung', explanationVi: '怀念 (huáiniàn) = hoài niệm/nhớ nhung', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Lo lắng" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['感恩', '焦虑', '同理心', '怨恨'], answer: '焦虑', explanationVi: '焦虑 (jiāolǜ) = lo lắng/bất an', difficulty: DIFFICULTY.MEDIUM },
      { question: '"同理心" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sự oán giận', 'Sự đồng cảm', 'Sự mãn nguyện', 'Sự lo lắng'], answer: 'Sự đồng cảm', explanationVi: '同理心 (tónglǐxīn) = sự đồng cảm', difficulty: DIFFICULTY.HARD },
      { question: '"Kiên cường" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['脆弱', '坚韧', '焦虑', '感恩'], answer: '坚韧', explanationVi: '坚韧 (jiānrèn) = kiên cường', difficulty: DIFFICULTY.HARD },
      { question: '"慈悲" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sự tức giận', 'Lòng trắc ẩn', 'Sự ghen tị', 'Sự sợ hãi'], answer: 'Lòng trắc ẩn', explanationVi: '慈悲 (cíbēi) = lòng trắc ẩn', difficulty: DIFFICULTY.HARD },
    ],
  },
];
