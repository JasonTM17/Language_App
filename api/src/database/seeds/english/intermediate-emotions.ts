import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishEmotionsIntermediateLessons: LessonData[] = [
  {
    title: 'Complex Emotions',
    titleVi: 'Cảm xúc phức tạp',
    description: 'Learn complex emotional vocabulary in English',
    descriptionVi: 'Học từ vựng về cảm xúc phức tạp bằng tiếng Anh',
    topic: TOPICS.EMOTIONS,
    vocabulary: [
      { word: 'overwhelmed', meaning: 'choáng ngợp', example: 'I feel overwhelmed by work.', exampleMeaning: 'Tôi cảm thấy choáng ngợp vì công việc.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'nostalgic', meaning: 'hoài niệm', example: 'This song makes me nostalgic.', exampleMeaning: 'Bài hát này khiến tôi hoài niệm.', difficulty: DIFFICULTY.HARD },
      { word: 'anxious', meaning: 'lo lắng', example: 'I am anxious about the exam.', exampleMeaning: 'Tôi lo lắng về kỳ thi.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'grateful', meaning: 'biết ơn', example: 'I am grateful for your help.', exampleMeaning: 'Tôi biết ơn sự giúp đỡ của bạn.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'frustrated', meaning: 'bực bội/thất vọng', example: 'He is frustrated with the situation.', exampleMeaning: 'Anh ấy bực bội với tình huống.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'empathy', meaning: 'sự đồng cảm', example: 'Show empathy to others.', exampleMeaning: 'Hãy thể hiện sự đồng cảm với người khác.', difficulty: DIFFICULTY.HARD },
      { word: 'resentment', meaning: 'sự oán giận', example: 'Let go of resentment.', exampleMeaning: 'Hãy buông bỏ sự oán giận.', difficulty: DIFFICULTY.HARD },
      { word: 'contentment', meaning: 'sự mãn nguyện', example: 'She found contentment in simple things.', exampleMeaning: 'Cô ấy tìm thấy sự mãn nguyện trong những điều đơn giản.', difficulty: DIFFICULTY.HARD },
      { word: 'melancholy', meaning: 'u sầu', example: 'A feeling of melancholy filled the room.', exampleMeaning: 'Cảm giác u sầu tràn ngập căn phòng.', difficulty: DIFFICULTY.HARD },
      { word: 'compassion', meaning: 'lòng trắc ẩn', example: 'Treat everyone with compassion.', exampleMeaning: 'Đối xử với mọi người bằng lòng trắc ẩn.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'vulnerable', meaning: 'dễ bị tổn thương', example: 'It is okay to feel vulnerable.', exampleMeaning: 'Cảm thấy dễ bị tổn thương là bình thường.', difficulty: DIFFICULTY.HARD },
      { word: 'resilient', meaning: 'kiên cường', example: 'She is very resilient.', exampleMeaning: 'Cô ấy rất kiên cường.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"overwhelmed" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Vui vẻ', 'Choáng ngợp', 'Buồn bã', 'Tức giận'], answer: 'Choáng ngợp', explanationVi: 'overwhelmed = choáng ngợp', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Hoài niệm" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['anxious', 'nostalgic', 'grateful', 'frustrated'], answer: 'nostalgic', explanationVi: 'nostalgic = hoài niệm', difficulty: DIFFICULTY.HARD },
      { question: '"empathy" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sự oán giận', 'Sự đồng cảm', 'Sự mãn nguyện', 'Sự lo lắng'], answer: 'Sự đồng cảm', explanationVi: 'empathy = sự đồng cảm', difficulty: DIFFICULTY.HARD },
      { question: '"Kiên cường" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['vulnerable', 'resilient', 'anxious', 'grateful'], answer: 'resilient', explanationVi: 'resilient = kiên cường', difficulty: DIFFICULTY.HARD },
      { question: '"compassion" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sự tức giận', 'Lòng trắc ẩn', 'Sự ghen tị', 'Sự sợ hãi'], answer: 'Lòng trắc ẩn', explanationVi: 'compassion = lòng trắc ẩn', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
