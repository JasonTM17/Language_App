import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseHobbiesLessons: LessonData[] = [
  {
    title: 'Hobbies & Free Time',
    titleVi: 'Sở thích & Thời gian rảnh',
    description: 'Learn hobby vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về sở thích bằng tiếng Nhật',
    topic: TOPICS.HOBBIES,
    vocabulary: [
      { word: '趣味 (しゅみ)', meaning: 'sở thích', example: '趣味は何ですか？', exampleMeaning: 'Sở thích của bạn là gì?', difficulty: DIFFICULTY.EASY },
      { word: '読書 (どくしょ)', meaning: 'đọc sách', example: '読書が好きです。', exampleMeaning: 'Tôi thích đọc sách.', difficulty: DIFFICULTY.EASY },
      { word: '映画 (えいが)', meaning: 'phim', example: '映画を見ます。', exampleMeaning: 'Tôi xem phim.', difficulty: DIFFICULTY.EASY },
      { word: '音楽 (おんがく)', meaning: 'âm nhạc', example: '音楽を聴きます。', exampleMeaning: 'Tôi nghe nhạc.', difficulty: DIFFICULTY.EASY },
      { word: '料理 (りょうり)', meaning: 'nấu ăn', example: '料理が上手です。', exampleMeaning: 'Tôi nấu ăn giỏi.', difficulty: DIFFICULTY.EASY },
      { word: '旅行 (りょこう)', meaning: 'du lịch', example: '旅行が大好きです。', exampleMeaning: 'Tôi rất thích du lịch.', difficulty: DIFFICULTY.EASY },
      { word: '写真 (しゃしん)', meaning: 'chụp ảnh', example: '写真を撮ります。', exampleMeaning: 'Tôi chụp ảnh.', difficulty: DIFFICULTY.EASY },
      { word: 'スポーツ', meaning: 'thể thao', example: 'スポーツをします。', exampleMeaning: 'Tôi chơi thể thao.', difficulty: DIFFICULTY.EASY },
      { word: '絵 (え)', meaning: 'vẽ tranh', example: '絵を描きます。', exampleMeaning: 'Tôi vẽ tranh.', difficulty: DIFFICULTY.EASY },
      { word: 'ゲーム', meaning: 'game', example: 'ゲームをします。', exampleMeaning: 'Tôi chơi game.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '散歩 (さんぽ)', meaning: 'đi dạo', example: '公園で散歩します。', exampleMeaning: 'Tôi đi dạo ở công viên.', difficulty: DIFFICULTY.EASY },
      { word: 'ピアノ', meaning: 'piano', example: 'ピアノを弾きます。', exampleMeaning: 'Tôi chơi piano.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"趣味" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Công việc', 'Sở thích', 'Gia đình', 'Trường học'], answer: 'Sở thích', explanationVi: '趣味 (しゅみ) = sở thích', difficulty: DIFFICULTY.EASY },
      { question: '"Đọc sách" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['映画', '読書', '音楽', '料理'], answer: '読書', explanationVi: '読書 (どくしょ) = đọc sách', difficulty: DIFFICULTY.EASY },
      { question: '"音楽" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Phim', 'Sách', 'Âm nhạc', 'Thể thao'], answer: 'Âm nhạc', explanationVi: '音楽 (おんがく) = âm nhạc', difficulty: DIFFICULTY.EASY },
      { question: '"Du lịch" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['散歩', '旅行', '写真', '料理'], answer: '旅行', explanationVi: '旅行 (りょこう) = du lịch', difficulty: DIFFICULTY.EASY },
      { question: '"散歩" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Chạy bộ', 'Đi dạo', 'Bơi lội', 'Leo núi'], answer: 'Đi dạo', explanationVi: '散歩 (さんぽ) = đi dạo', difficulty: DIFFICULTY.EASY },
    ],
  },
];
