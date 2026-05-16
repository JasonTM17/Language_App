import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseSportsLessons: LessonData[] = [
  {
    title: 'Sports & Fitness',
    titleVi: 'Thể thao & Sức khỏe',
    description: 'Learn sports and fitness vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về thể thao và sức khỏe bằng tiếng Nhật',
    topic: TOPICS.HOBBIES,
    vocabulary: [
      { word: '大会 (たいかい)', meaning: 'giải đấu', example: '大会は来週始まります。', exampleMeaning: 'Giải đấu bắt đầu tuần sau.', difficulty: DIFFICULTY.MEDIUM },
      { word: '優勝 (ゆうしょう)', meaning: 'vô địch', example: '優勝しました！', exampleMeaning: 'Đã vô địch!', difficulty: DIFFICULTY.MEDIUM },
      { word: '選手 (せんしゅ)', meaning: 'vận động viên', example: '彼女はプロの選手です。', exampleMeaning: 'Cô ấy là vận động viên chuyên nghiệp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '持久力 (じきゅうりょく)', meaning: 'sức bền', example: 'ランニングで持久力をつけます。', exampleMeaning: 'Chạy bộ xây dựng sức bền.', difficulty: DIFFICULTY.HARD },
      { word: '柔軟性 (じゅうなんせい)', meaning: 'sự linh hoạt', example: 'ヨガで柔軟性が上がります。', exampleMeaning: 'Yoga cải thiện sự linh hoạt.', difficulty: DIFFICULTY.HARD },
      { word: '準備運動 (じゅんびうんどう)', meaning: 'khởi động', example: '準備運動をしましょう。', exampleMeaning: 'Hãy khởi động.', difficulty: DIFFICULTY.MEDIUM },
      { word: '審判 (しんぱん)', meaning: 'trọng tài', example: '審判が判定しました。', exampleMeaning: 'Trọng tài đã đưa ra quyết định.', difficulty: DIFFICULTY.MEDIUM },
      { word: '相手 (あいて)', meaning: 'đối thủ', example: '相手を尊重しましょう。', exampleMeaning: 'Hãy tôn trọng đối thủ.', difficulty: DIFFICULTY.EASY },
      { word: '体力 (たいりょく)', meaning: 'thể lực', example: '体力がすごいです。', exampleMeaning: 'Thể lực rất tốt.', difficulty: DIFFICULTY.MEDIUM },
      { word: '技術 (ぎじゅつ)', meaning: 'kỹ thuật', example: '技術を磨きましょう。', exampleMeaning: 'Hãy rèn luyện kỹ thuật.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'スポーツマンシップ', meaning: 'tinh thần thể thao', example: 'スポーツマンシップを見せましょう。', exampleMeaning: 'Hãy thể hiện tinh thần thể thao.', difficulty: DIFFICULTY.MEDIUM },
      { word: '自己ベスト (じこベスト)', meaning: 'kỷ lục cá nhân', example: '自己ベストを更新しました。', exampleMeaning: 'Tôi đã phá kỷ lục cá nhân.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"大会" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Trận đấu', 'Giải đấu', 'Đội bóng', 'Sân vận động'], answer: 'Giải đấu', explanationVi: '大会 (たいかい) = giải đấu', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Vận động viên" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['審判', '選手', '相手', '優勝'], answer: '選手', explanationVi: '選手 (せんしゅ) = vận động viên', difficulty: DIFFICULTY.MEDIUM },
      { question: '"持久力" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tốc độ', 'Sức bền', 'Sức mạnh', 'Kỹ thuật'], answer: 'Sức bền', explanationVi: '持久力 (じきゅうりょく) = sức bền', difficulty: DIFFICULTY.HARD },
      { question: '"Trọng tài" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['選手', '審判', '相手', '監督'], answer: '審判', explanationVi: '審判 (しんぱん) = trọng tài', difficulty: DIFFICULTY.MEDIUM },
      { question: '"相手" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Đồng đội', 'Đối thủ', 'Huấn luyện viên', 'Trọng tài'], answer: 'Đối thủ', explanationVi: '相手 (あいて) = đối thủ', difficulty: DIFFICULTY.EASY },
    ],
  },
];
