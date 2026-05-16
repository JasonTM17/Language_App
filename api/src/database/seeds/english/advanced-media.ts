import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishMediaLessons: LessonData[] = [
  {
    title: 'Media & Entertainment',
    titleVi: 'Truyền thông & Giải trí',
    description: 'Learn media and entertainment vocabulary in English',
    descriptionVi: 'Học từ vựng về truyền thông và giải trí bằng tiếng Anh',
    topic: TOPICS.CULTURE,
    vocabulary: [
      { word: 'broadcast', meaning: 'phát sóng', example: 'The show will broadcast live.', exampleMeaning: 'Chương trình sẽ phát sóng trực tiếp.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'documentary', meaning: 'phim tài liệu', example: 'I watched a great documentary.', exampleMeaning: 'Tôi đã xem một phim tài liệu hay.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'editorial', meaning: 'bài xã luận', example: 'She wrote an editorial.', exampleMeaning: 'Cô ấy viết bài xã luận.', difficulty: DIFFICULTY.HARD },
      { word: 'journalism', meaning: 'báo chí', example: 'He studied journalism.', exampleMeaning: 'Anh ấy học báo chí.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'screenplay', meaning: 'kịch bản phim', example: 'The screenplay won an award.', exampleMeaning: 'Kịch bản phim đã đoạt giải.', difficulty: DIFFICULTY.HARD },
      { word: 'subtitle', meaning: 'phụ đề', example: 'Turn on the subtitles.', exampleMeaning: 'Bật phụ đề lên.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'audience', meaning: 'khán giả', example: 'The audience applauded.', exampleMeaning: 'Khán giả vỗ tay.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'streaming', meaning: 'phát trực tuyến', example: 'I prefer streaming movies.', exampleMeaning: 'Tôi thích xem phim trực tuyến.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'podcast', meaning: 'podcast/chương trình audio', example: 'I listen to podcasts daily.', exampleMeaning: 'Tôi nghe podcast hàng ngày.', difficulty: DIFFICULTY.EASY },
      { word: 'censorship', meaning: 'kiểm duyệt', example: 'Censorship is controversial.', exampleMeaning: 'Kiểm duyệt là vấn đề gây tranh cãi.', difficulty: DIFFICULTY.HARD },
      { word: 'headline', meaning: 'tiêu đề/tít báo', example: 'The headline caught my attention.', exampleMeaning: 'Tiêu đề thu hút sự chú ý của tôi.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'genre', meaning: 'thể loại', example: 'What genre do you prefer?', exampleMeaning: 'Bạn thích thể loại nào?', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"broadcast" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ghi hình', 'Phát sóng', 'Biên tập', 'Đạo diễn'], answer: 'Phát sóng', explanationVi: 'broadcast = phát sóng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Phim tài liệu" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['screenplay', 'documentary', 'editorial', 'broadcast'], answer: 'documentary', explanationVi: 'documentary = phim tài liệu', difficulty: DIFFICULTY.MEDIUM },
      { question: '"subtitle" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tiêu đề', 'Phụ đề', 'Kịch bản', 'Thể loại'], answer: 'Phụ đề', explanationVi: 'subtitle = phụ đề', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Kiểm duyệt" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['journalism', 'censorship', 'editorial', 'headline'], answer: 'censorship', explanationVi: 'censorship = kiểm duyệt', difficulty: DIFFICULTY.HARD },
      { question: '"genre" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Khán giả', 'Thể loại', 'Phát sóng', 'Podcast'], answer: 'Thể loại', explanationVi: 'genre = thể loại', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
