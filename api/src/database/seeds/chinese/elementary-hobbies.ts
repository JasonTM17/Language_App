import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseHobbiesLessons: LessonData[] = [
  {
    title: 'Hobbies & Free Time',
    titleVi: 'Sở thích & Thời gian rảnh',
    description: 'Learn hobby vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về sở thích bằng tiếng Trung',
    topic: TOPICS.HOBBIES,
    vocabulary: [
      { word: '爱好 (àihào)', meaning: 'sở thích', example: '你的爱好是什么？', exampleMeaning: 'Sở thích của bạn là gì?', difficulty: DIFFICULTY.EASY },
      { word: '看书 (kànshū)', meaning: 'đọc sách', example: '我喜欢看书。', exampleMeaning: 'Tôi thích đọc sách.', difficulty: DIFFICULTY.EASY },
      { word: '看电影 (kàn diànyǐng)', meaning: 'xem phim', example: '我看电影。', exampleMeaning: 'Tôi xem phim.', difficulty: DIFFICULTY.EASY },
      { word: '听音乐 (tīng yīnyuè)', meaning: 'nghe nhạc', example: '我听音乐。', exampleMeaning: 'Tôi nghe nhạc.', difficulty: DIFFICULTY.EASY },
      { word: '做饭 (zuòfàn)', meaning: 'nấu ăn', example: '我会做饭。', exampleMeaning: 'Tôi biết nấu ăn.', difficulty: DIFFICULTY.EASY },
      { word: '旅游 (lǚyóu)', meaning: 'du lịch', example: '我喜欢旅游。', exampleMeaning: 'Tôi thích du lịch.', difficulty: DIFFICULTY.EASY },
      { word: '拍照 (pāizhào)', meaning: 'chụp ảnh', example: '我拍照。', exampleMeaning: 'Tôi chụp ảnh.', difficulty: DIFFICULTY.EASY },
      { word: '运动 (yùndòng)', meaning: 'thể thao', example: '我做运动。', exampleMeaning: 'Tôi tập thể thao.', difficulty: DIFFICULTY.EASY },
      { word: '画画 (huàhuà)', meaning: 'vẽ tranh', example: '我画画。', exampleMeaning: 'Tôi vẽ tranh.', difficulty: DIFFICULTY.EASY },
      { word: '玩游戏 (wán yóuxì)', meaning: 'chơi game', example: '我玩游戏。', exampleMeaning: 'Tôi chơi game.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '散步 (sànbù)', meaning: 'đi dạo', example: '我在公园散步。', exampleMeaning: 'Tôi đi dạo ở công viên.', difficulty: DIFFICULTY.EASY },
      { word: '唱歌 (chànggē)', meaning: 'hát', example: '我喜欢唱歌。', exampleMeaning: 'Tôi thích hát.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"爱好" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Công việc', 'Sở thích', 'Gia đình', 'Trường học'], answer: 'Sở thích', explanationVi: '爱好 (àihào) = sở thích', difficulty: DIFFICULTY.EASY },
      { question: '"Đọc sách" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['看电影', '看书', '听音乐', '做饭'], answer: '看书', explanationVi: '看书 (kànshū) = đọc sách', difficulty: DIFFICULTY.EASY },
      { question: '"听音乐" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Xem phim', 'Đọc sách', 'Nghe nhạc', 'Thể thao'], answer: 'Nghe nhạc', explanationVi: '听音乐 (tīng yīnyuè) = nghe nhạc', difficulty: DIFFICULTY.EASY },
      { question: '"Du lịch" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['散步', '旅游', '拍照', '做饭'], answer: '旅游', explanationVi: '旅游 (lǚyóu) = du lịch', difficulty: DIFFICULTY.EASY },
      { question: '"散步" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Chạy bộ', 'Đi dạo', 'Bơi lội', 'Leo núi'], answer: 'Đi dạo', explanationVi: '散步 (sànbù) = đi dạo', difficulty: DIFFICULTY.EASY },
    ],
  },
];
