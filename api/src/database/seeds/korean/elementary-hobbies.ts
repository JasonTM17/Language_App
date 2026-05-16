import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanHobbiesLessons: LessonData[] = [
  {
    title: 'Hobbies & Free Time',
    titleVi: 'Sở thích & Thời gian rảnh',
    description: 'Learn hobby vocabulary in Korean',
    descriptionVi: 'Học từ vựng về sở thích bằng tiếng Hàn',
    topic: TOPICS.HOBBIES,
    vocabulary: [
      { word: '취미', meaning: 'sở thích', example: '취미가 뭐예요?', exampleMeaning: 'Sở thích của bạn là gì?', difficulty: DIFFICULTY.EASY },
      { word: '독서', meaning: 'đọc sách', example: '독서를 좋아해요.', exampleMeaning: 'Tôi thích đọc sách.', difficulty: DIFFICULTY.EASY },
      { word: '영화', meaning: 'phim', example: '영화를 봐요.', exampleMeaning: 'Tôi xem phim.', difficulty: DIFFICULTY.EASY },
      { word: '음악', meaning: 'âm nhạc', example: '음악을 들어요.', exampleMeaning: 'Tôi nghe nhạc.', difficulty: DIFFICULTY.EASY },
      { word: '요리', meaning: 'nấu ăn', example: '요리를 잘해요.', exampleMeaning: 'Tôi nấu ăn giỏi.', difficulty: DIFFICULTY.EASY },
      { word: '여행', meaning: 'du lịch', example: '여행을 좋아해요.', exampleMeaning: 'Tôi thích du lịch.', difficulty: DIFFICULTY.EASY },
      { word: '사진', meaning: 'chụp ảnh', example: '사진을 찍어요.', exampleMeaning: 'Tôi chụp ảnh.', difficulty: DIFFICULTY.EASY },
      { word: '운동', meaning: 'thể thao/tập thể dục', example: '운동을 해요.', exampleMeaning: 'Tôi tập thể dục.', difficulty: DIFFICULTY.EASY },
      { word: '그림', meaning: 'vẽ tranh', example: '그림을 그려요.', exampleMeaning: 'Tôi vẽ tranh.', difficulty: DIFFICULTY.EASY },
      { word: '게임', meaning: 'game', example: '게임을 해요.', exampleMeaning: 'Tôi chơi game.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '산책', meaning: 'đi dạo', example: '공원에서 산책해요.', exampleMeaning: 'Tôi đi dạo ở công viên.', difficulty: DIFFICULTY.EASY },
      { word: '노래', meaning: 'hát', example: '노래를 불러요.', exampleMeaning: 'Tôi hát.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"취미" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Công việc', 'Sở thích', 'Gia đình', 'Trường học'], answer: 'Sở thích', explanationVi: '취미 = sở thích', difficulty: DIFFICULTY.EASY },
      { question: '"Đọc sách" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['영화', '독서', '음악', '요리'], answer: '독서', explanationVi: '독서 = đọc sách', difficulty: DIFFICULTY.EASY },
      { question: '"음악" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Phim', 'Sách', 'Âm nhạc', 'Thể thao'], answer: 'Âm nhạc', explanationVi: '음악 = âm nhạc', difficulty: DIFFICULTY.EASY },
      { question: '"Du lịch" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['산책', '여행', '사진', '요리'], answer: '여행', explanationVi: '여행 = du lịch', difficulty: DIFFICULTY.EASY },
      { question: '"산책" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Chạy bộ', 'Đi dạo', 'Bơi lội', 'Leo núi'], answer: 'Đi dạo', explanationVi: '산책 = đi dạo', difficulty: DIFFICULTY.EASY },
    ],
  },
];
