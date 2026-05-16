import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishEmotionsLessons: LessonData[] = [
  {
    title: 'Feelings & Emotions',
    titleVi: 'Cảm xúc & Tình cảm',
    description: 'Learn to express feelings and emotions in English',
    descriptionVi: 'Học cách diễn đạt cảm xúc và tình cảm bằng tiếng Anh',
    topic: TOPICS.EMOTIONS,
    vocabulary: [
      { word: 'happy', meaning: 'vui vẻ/hạnh phúc', example: 'I am very happy today.', exampleMeaning: 'Hôm nay tôi rất vui.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'sad', meaning: 'buồn', example: 'She looks sad.', exampleMeaning: 'Cô ấy trông buồn.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'angry', meaning: 'giận/tức giận', example: 'Don\'t be angry with me.', exampleMeaning: 'Đừng giận tôi.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'scared', meaning: 'sợ hãi', example: 'I am scared of spiders.', exampleMeaning: 'Tôi sợ nhện.', difficulty: DIFFICULTY.EASY },
      { word: 'excited', meaning: 'hào hứng/phấn khích', example: 'I am excited about the trip.', exampleMeaning: 'Tôi hào hứng về chuyến đi.', difficulty: DIFFICULTY.EASY },
      { word: 'tired', meaning: 'mệt mỏi', example: 'I am so tired after work.', exampleMeaning: 'Tôi rất mệt sau giờ làm.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'surprised', meaning: 'ngạc nhiên', example: 'I was surprised by the news.', exampleMeaning: 'Tôi ngạc nhiên vì tin đó.', difficulty: DIFFICULTY.EASY },
      { word: 'worried', meaning: 'lo lắng', example: 'I am worried about the exam.', exampleMeaning: 'Tôi lo lắng về bài thi.', difficulty: DIFFICULTY.EASY },
      { word: 'bored', meaning: 'chán', example: 'I am bored at home.', exampleMeaning: 'Tôi chán ở nhà.', difficulty: DIFFICULTY.EASY },
      { word: 'nervous', meaning: 'hồi hộp/lo lắng', example: 'I feel nervous before presentations.', exampleMeaning: 'Tôi hồi hộp trước khi thuyết trình.', difficulty: DIFFICULTY.EASY },
      { word: 'proud', meaning: 'tự hào', example: 'I am proud of you.', exampleMeaning: 'Tôi tự hào về bạn.', difficulty: DIFFICULTY.EASY },
      { word: 'lonely', meaning: 'cô đơn', example: 'She feels lonely in the new city.', exampleMeaning: 'Cô ấy cảm thấy cô đơn ở thành phố mới.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"happy" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Buồn', 'Vui vẻ', 'Giận', 'Sợ'], answer: 'Vui vẻ', explanationVi: 'Happy = vui vẻ, hạnh phúc', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"worried" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Vui', 'Buồn', 'Lo lắng', 'Giận'], answer: 'Lo lắng', explanationVi: 'Worried = lo lắng', difficulty: DIFFICULTY.EASY },
      { question: '"Hồi hộp" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['excited', 'nervous', 'scared', 'surprised'], answer: 'nervous', explanationVi: 'Nervous = hồi hộp, lo lắng', difficulty: DIFFICULTY.EASY },
      { question: '"proud" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Xấu hổ', 'Tự hào', 'Cô đơn', 'Chán'], answer: 'Tự hào', explanationVi: 'Proud = tự hào', difficulty: DIFFICULTY.EASY },
      { question: 'Fill in: "I am _____ of spiders." (sợ)', type: QUIZ_TYPES.FILL_BLANK, options: [], answer: 'scared', explanationVi: 'Scared of = sợ cái gì đó', difficulty: DIFFICULTY.EASY },
    ],
  },
];
