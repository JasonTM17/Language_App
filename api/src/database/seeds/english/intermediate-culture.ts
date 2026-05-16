import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishCultureLessons: LessonData[] = [
  {
    title: 'Culture & Traditions',
    titleVi: 'Văn hóa & Truyền thống',
    description: 'Learn culture-related vocabulary in English',
    descriptionVi: 'Học từ vựng về văn hóa bằng tiếng Anh',
    topic: TOPICS.CULTURE,
    vocabulary: [
      { word: 'tradition', meaning: 'truyền thống', example: 'It is a family tradition.', exampleMeaning: 'Đó là truyền thống gia đình.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'festival', meaning: 'lễ hội', example: 'The music festival is in June.', exampleMeaning: 'Lễ hội âm nhạc vào tháng 6.', difficulty: DIFFICULTY.EASY },
      { word: 'ceremony', meaning: 'nghi lễ', example: 'The wedding ceremony was beautiful.', exampleMeaning: 'Nghi lễ cưới rất đẹp.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'heritage', meaning: 'di sản', example: 'We must protect our cultural heritage.', exampleMeaning: 'Chúng ta phải bảo vệ di sản văn hóa.', difficulty: DIFFICULTY.HARD },
      { word: 'custom', meaning: 'phong tục', example: 'Each country has different customs.', exampleMeaning: 'Mỗi nước có phong tục khác nhau.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'celebrate', meaning: 'kỷ niệm/ăn mừng', example: 'We celebrate New Year together.', exampleMeaning: 'Chúng tôi ăn mừng năm mới cùng nhau.', difficulty: DIFFICULTY.EASY },
      { word: 'ancestor', meaning: 'tổ tiên', example: 'We honor our ancestors.', exampleMeaning: 'Chúng tôi tôn kính tổ tiên.', difficulty: DIFFICULTY.HARD },
      { word: 'religion', meaning: 'tôn giáo', example: 'There are many religions in the world.', exampleMeaning: 'Có nhiều tôn giáo trên thế giới.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'costume', meaning: 'trang phục', example: 'She wore a traditional costume.', exampleMeaning: 'Cô ấy mặc trang phục truyền thống.', difficulty: DIFFICULTY.EASY },
      { word: 'folklore', meaning: 'văn hóa dân gian', example: 'Vietnamese folklore is very rich.', exampleMeaning: 'Văn hóa dân gian Việt Nam rất phong phú.', difficulty: DIFFICULTY.HARD },
      { word: 'ritual', meaning: 'nghi thức', example: 'The tea ritual is important in Japan.', exampleMeaning: 'Nghi thức trà quan trọng ở Nhật.', difficulty: DIFFICULTY.HARD },
      { word: 'diversity', meaning: 'sự đa dạng', example: 'Cultural diversity makes the world interesting.', exampleMeaning: 'Sự đa dạng văn hóa làm thế giới thú vị.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"tradition" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hiện đại', 'Truyền thống', 'Phong cách', 'Thời trang'], answer: 'Truyền thống', explanationVi: 'Tradition = truyền thống', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Lễ hội" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['ceremony', 'festival', 'ritual', 'custom'], answer: 'festival', explanationVi: 'Festival = lễ hội', difficulty: DIFFICULTY.EASY },
      { question: '"heritage" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Di sản', 'Lịch sử', 'Bảo tàng', 'Cổ vật'], answer: 'Di sản', explanationVi: 'Heritage = di sản', difficulty: DIFFICULTY.HARD },
      { question: 'Fill in: "Each country has different _____." (phong tục)', type: QUIZ_TYPES.FILL_BLANK, options: [], answer: 'customs', explanationVi: 'Custom(s) = phong tục', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Tổ tiên" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['ancestor', 'heritage', 'tradition', 'folklore'], answer: 'ancestor', explanationVi: 'Ancestor = tổ tiên', difficulty: DIFFICULTY.HARD },
    ],
  },
];
