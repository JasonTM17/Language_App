import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishHobbiesElementaryLessons: LessonData[] = [
  {
    title: 'Hobbies & Leisure',
    titleVi: 'Sở thích & Giải trí',
    description: 'Learn hobby and leisure vocabulary in English',
    descriptionVi: 'Học từ vựng về sở thích và giải trí bằng tiếng Anh',
    topic: TOPICS.HOBBIES,
    vocabulary: [
      { word: 'photography', meaning: 'nhiếp ảnh', example: 'Photography is my hobby.', exampleMeaning: 'Nhiếp ảnh là sở thích của tôi.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'gardening', meaning: 'làm vườn', example: 'I enjoy gardening on weekends.', exampleMeaning: 'Tôi thích làm vườn vào cuối tuần.', difficulty: DIFFICULTY.EASY },
      { word: 'hiking', meaning: 'đi bộ đường dài', example: 'We went hiking in the mountains.', exampleMeaning: 'Chúng tôi đi bộ đường dài trên núi.', difficulty: DIFFICULTY.EASY },
      { word: 'knitting', meaning: 'đan len', example: 'My grandmother loves knitting.', exampleMeaning: 'Bà tôi thích đan len.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'pottery', meaning: 'gốm sứ/làm gốm', example: 'I took a pottery class.', exampleMeaning: 'Tôi đã tham gia lớp làm gốm.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'camping', meaning: 'cắm trại', example: 'We go camping every summer.', exampleMeaning: 'Chúng tôi đi cắm trại mỗi mùa hè.', difficulty: DIFFICULTY.EASY },
      { word: 'calligraphy', meaning: 'thư pháp', example: 'She practices calligraphy daily.', exampleMeaning: 'Cô ấy luyện thư pháp hàng ngày.', difficulty: DIFFICULTY.HARD },
      { word: 'volunteering', meaning: 'tình nguyện', example: 'Volunteering makes me happy.', exampleMeaning: 'Làm tình nguyện khiến tôi vui.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'board game', meaning: 'trò chơi bàn cờ', example: 'Let us play a board game.', exampleMeaning: 'Hãy chơi trò chơi bàn cờ.', difficulty: DIFFICULTY.EASY },
      { word: 'meditation', meaning: 'thiền', example: 'Meditation helps me relax.', exampleMeaning: 'Thiền giúp tôi thư giãn.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'collecting', meaning: 'sưu tầm', example: 'He enjoys collecting stamps.', exampleMeaning: 'Anh ấy thích sưu tầm tem.', difficulty: DIFFICULTY.EASY },
      { word: 'woodworking', meaning: 'nghề mộc', example: 'Woodworking requires patience.', exampleMeaning: 'Nghề mộc cần sự kiên nhẫn.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"photography" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hội họa', 'Nhiếp ảnh', 'Điêu khắc', 'Âm nhạc'], answer: 'Nhiếp ảnh', explanationVi: 'photography = nhiếp ảnh', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Làm vườn" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['hiking', 'gardening', 'camping', 'knitting'], answer: 'gardening', explanationVi: 'gardening = làm vườn', difficulty: DIFFICULTY.EASY },
      { question: '"calligraphy" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hội họa', 'Thư pháp', 'Nhiếp ảnh', 'Điêu khắc'], answer: 'Thư pháp', explanationVi: 'calligraphy = thư pháp', difficulty: DIFFICULTY.HARD },
      { question: '"Thiền" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['volunteering', 'meditation', 'collecting', 'hiking'], answer: 'meditation', explanationVi: 'meditation = thiền', difficulty: DIFFICULTY.MEDIUM },
      { question: '"camping" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Đi bộ', 'Cắm trại', 'Bơi lội', 'Leo núi'], answer: 'Cắm trại', explanationVi: 'camping = cắm trại', difficulty: DIFFICULTY.EASY },
    ],
  },
];
