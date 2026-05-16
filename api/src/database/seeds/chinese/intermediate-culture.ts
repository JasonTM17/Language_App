import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseCultureLessons: LessonData[] = [
  {
    title: 'Chinese Culture',
    titleVi: 'Văn hóa Trung Quốc',
    description: 'Learn culture-related vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về văn hóa Trung Quốc',
    topic: TOPICS.CULTURE,
    vocabulary: [
      { word: '春节 (chūnjié)', meaning: 'Tết Nguyên Đán', example: '春节快乐！', exampleMeaning: 'Chúc mừng năm mới!', difficulty: DIFFICULTY.EASY },
      { word: '红包 (hóngbāo)', meaning: 'lì xì', example: '过年收红包。', exampleMeaning: 'Nhận lì xì dịp Tết.', difficulty: DIFFICULTY.EASY },
      { word: '功夫 (gōngfu)', meaning: 'kung fu', example: '他会功夫。', exampleMeaning: 'Anh ấy biết kung fu.', difficulty: DIFFICULTY.EASY },
      { word: '书法 (shūfǎ)', meaning: 'thư pháp', example: '我学书法。', exampleMeaning: 'Tôi học thư pháp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '长城 (chángchéng)', meaning: 'Vạn Lý Trường Thành', example: '我想去长城。', exampleMeaning: 'Tôi muốn đến Vạn Lý Trường Thành.', difficulty: DIFFICULTY.MEDIUM },
      { word: '饺子 (jiǎozi)', meaning: 'sủi cảo', example: '过年吃饺子。', exampleMeaning: 'Ăn sủi cảo dịp Tết.', difficulty: DIFFICULTY.EASY },
      { word: '龙 (lóng)', meaning: 'rồng', example: '龙是中国的象征。', exampleMeaning: 'Rồng là biểu tượng Trung Quốc.', difficulty: DIFFICULTY.EASY },
      { word: '太极拳 (tàijíquán)', meaning: 'thái cực quyền', example: '早上打太极拳。', exampleMeaning: 'Buổi sáng tập thái cực quyền.', difficulty: DIFFICULTY.HARD },
      { word: '中秋节 (zhōngqiūjié)', meaning: 'Tết Trung Thu', example: '中秋节吃月饼。', exampleMeaning: 'Ăn bánh trung thu dịp Trung Thu.', difficulty: DIFFICULTY.MEDIUM },
      { word: '茶 (chá)', meaning: 'trà', example: '中国人喜欢喝茶。', exampleMeaning: 'Người Trung Quốc thích uống trà.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '京剧 (jīngjù)', meaning: 'kinh kịch', example: '京剧很有名。', exampleMeaning: 'Kinh kịch rất nổi tiếng.', difficulty: DIFFICULTY.HARD },
      { word: '筷子 (kuàizi)', meaning: 'đũa', example: '用筷子吃饭。', exampleMeaning: 'Dùng đũa ăn cơm.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"春节" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tết Trung Thu', 'Tết Nguyên Đán', 'Giáng sinh', 'Lễ Quốc khánh'], answer: 'Tết Nguyên Đán', explanationVi: '春节 (chūnjié) = Tết Nguyên Đán', difficulty: DIFFICULTY.EASY },
      { question: '"Lì xì" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['红包', '礼物', '钱', '信封'], answer: '红包', explanationVi: '红包 (hóngbāo) = lì xì', difficulty: DIFFICULTY.EASY },
      { question: '"长城" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tử Cấm Thành', 'Vạn Lý Trường Thành', 'Thiên An Môn', 'Cung điện'], answer: 'Vạn Lý Trường Thành', explanationVi: '长城 (chángchéng) = Vạn Lý Trường Thành', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Thư pháp" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['功夫', '书法', '太极拳', '京剧'], answer: '书法', explanationVi: '书法 (shūfǎ) = thư pháp', difficulty: DIFFICULTY.MEDIUM },
      { question: '"筷子" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thìa', 'Đũa', 'Nĩa', 'Dao'], answer: 'Đũa', explanationVi: '筷子 (kuàizi) = đũa', difficulty: DIFFICULTY.EASY },
    ],
  },
];
