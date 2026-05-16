import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishEnvironmentLessons: LessonData[] = [
  {
    title: 'Environment & Nature',
    titleVi: 'Môi trường & Thiên nhiên',
    description: 'Learn environment vocabulary in English',
    descriptionVi: 'Học từ vựng về môi trường bằng tiếng Anh',
    topic: TOPICS.WEATHER,
    vocabulary: [
      { word: 'pollution', meaning: 'ô nhiễm', example: 'Air pollution is a big problem.', exampleMeaning: 'Ô nhiễm không khí là vấn đề lớn.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'recycle', meaning: 'tái chế', example: 'We should recycle plastic bottles.', exampleMeaning: 'Chúng ta nên tái chế chai nhựa.', difficulty: DIFFICULTY.EASY },
      { word: 'climate change', meaning: 'biến đổi khí hậu', example: 'Climate change affects everyone.', exampleMeaning: 'Biến đổi khí hậu ảnh hưởng mọi người.', difficulty: DIFFICULTY.HARD },
      { word: 'deforestation', meaning: 'phá rừng', example: 'Deforestation destroys animal habitats.', exampleMeaning: 'Phá rừng hủy hoại môi trường sống động vật.', difficulty: DIFFICULTY.HARD },
      { word: 'renewable energy', meaning: 'năng lượng tái tạo', example: 'Solar power is renewable energy.', exampleMeaning: 'Năng lượng mặt trời là năng lượng tái tạo.', difficulty: DIFFICULTY.HARD },
      { word: 'ecosystem', meaning: 'hệ sinh thái', example: 'The ocean ecosystem is fragile.', exampleMeaning: 'Hệ sinh thái đại dương rất mong manh.', difficulty: DIFFICULTY.HARD },
      { word: 'endangered', meaning: 'có nguy cơ tuyệt chủng', example: 'Tigers are endangered animals.', exampleMeaning: 'Hổ là động vật có nguy cơ tuyệt chủng.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'sustainable', meaning: 'bền vững', example: 'We need sustainable development.', exampleMeaning: 'Chúng ta cần phát triển bền vững.', difficulty: DIFFICULTY.HARD },
      { word: 'carbon footprint', meaning: 'dấu chân carbon', example: 'Reduce your carbon footprint.', exampleMeaning: 'Giảm dấu chân carbon của bạn.', difficulty: DIFFICULTY.HARD },
      { word: 'conservation', meaning: 'bảo tồn', example: 'Wildlife conservation is important.', exampleMeaning: 'Bảo tồn động vật hoang dã rất quan trọng.', difficulty: DIFFICULTY.HARD },
      { word: 'drought', meaning: 'hạn hán', example: 'The drought destroyed crops.', exampleMeaning: 'Hạn hán phá hủy mùa màng.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'flood', meaning: 'lũ lụt', example: 'Heavy rain caused floods.', exampleMeaning: 'Mưa lớn gây ra lũ lụt.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"pollution" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sạch sẽ', 'Ô nhiễm', 'Tái chế', 'Bảo vệ'], answer: 'Ô nhiễm', explanationVi: 'Pollution = ô nhiễm', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Tái chế" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['reduce', 'recycle', 'reuse', 'remove'], answer: 'recycle', explanationVi: 'Recycle = tái chế', difficulty: DIFFICULTY.EASY },
      { question: '"endangered" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nguy hiểm', 'Có nguy cơ tuyệt chủng', 'Mạnh mẽ', 'Hiếm'], answer: 'Có nguy cơ tuyệt chủng', explanationVi: 'Endangered = có nguy cơ tuyệt chủng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Lũ lụt" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['drought', 'flood', 'storm', 'earthquake'], answer: 'flood', explanationVi: 'Flood = lũ lụt', difficulty: DIFFICULTY.EASY },
      { question: '"sustainable" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tạm thời', 'Bền vững', 'Nhanh chóng', 'Đắt đỏ'], answer: 'Bền vững', explanationVi: 'Sustainable = bền vững', difficulty: DIFFICULTY.HARD },
    ],
  },
];
