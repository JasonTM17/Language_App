import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseMediaLessons: LessonData[] = [
  {
    title: 'Media & Entertainment',
    titleVi: 'Truyền thông & Giải trí',
    description: 'Learn media and entertainment vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về truyền thông và giải trí bằng tiếng Nhật',
    topic: TOPICS.CULTURE,
    vocabulary: [
      { word: '放送 (ほうそう)', meaning: 'phát sóng', example: '番組が放送されます。', exampleMeaning: 'Chương trình sẽ được phát sóng.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'ドキュメンタリー', meaning: 'phim tài liệu', example: 'ドキュメンタリーを見ました。', exampleMeaning: 'Tôi đã xem phim tài liệu.', difficulty: DIFFICULTY.MEDIUM },
      { word: '社説 (しゃせつ)', meaning: 'bài xã luận', example: '社説を読みました。', exampleMeaning: 'Tôi đã đọc bài xã luận.', difficulty: DIFFICULTY.HARD },
      { word: '報道 (ほうどう)', meaning: 'báo chí/tin tức', example: '報道を見ましたか？', exampleMeaning: 'Bạn đã xem tin tức chưa?', difficulty: DIFFICULTY.MEDIUM },
      { word: '脚本 (きゃくほん)', meaning: 'kịch bản', example: '脚本を書いています。', exampleMeaning: 'Tôi đang viết kịch bản.', difficulty: DIFFICULTY.HARD },
      { word: '字幕 (じまく)', meaning: 'phụ đề', example: '字幕をつけてください。', exampleMeaning: 'Hãy bật phụ đề.', difficulty: DIFFICULTY.MEDIUM },
      { word: '観客 (かんきゃく)', meaning: 'khán giả', example: '観客が拍手しました。', exampleMeaning: 'Khán giả vỗ tay.', difficulty: DIFFICULTY.MEDIUM },
      { word: '配信 (はいしん)', meaning: 'phát trực tuyến', example: '動画を配信しています。', exampleMeaning: 'Đang phát video trực tuyến.', difficulty: DIFFICULTY.MEDIUM },
      { word: '番組 (ばんぐみ)', meaning: 'chương trình', example: '好きな番組は何ですか？', exampleMeaning: 'Chương trình yêu thích của bạn là gì?', difficulty: DIFFICULTY.EASY },
      { word: '検閲 (けんえつ)', meaning: 'kiểm duyệt', example: '検閲は議論を呼びます。', exampleMeaning: 'Kiểm duyệt gây tranh cãi.', difficulty: DIFFICULTY.HARD },
      { word: '見出し (みだし)', meaning: 'tiêu đề/tít báo', example: '見出しが目を引きました。', exampleMeaning: 'Tiêu đề thu hút sự chú ý.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'ジャンル', meaning: 'thể loại', example: 'どのジャンルが好きですか？', exampleMeaning: 'Bạn thích thể loại nào?', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"放送" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ghi hình', 'Phát sóng', 'Biên tập', 'Đạo diễn'], answer: 'Phát sóng', explanationVi: '放送 (ほうそう) = phát sóng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Phim tài liệu" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['脚本', 'ドキュメンタリー', '社説', '放送'], answer: 'ドキュメンタリー', explanationVi: 'ドキュメンタリー = phim tài liệu', difficulty: DIFFICULTY.MEDIUM },
      { question: '"字幕" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tiêu đề', 'Phụ đề', 'Kịch bản', 'Thể loại'], answer: 'Phụ đề', explanationVi: '字幕 (じまく) = phụ đề', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Kiểm duyệt" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['報道', '検閲', '社説', '見出し'], answer: '検閲', explanationVi: '検閲 (けんえつ) = kiểm duyệt', difficulty: DIFFICULTY.HARD },
      { question: '"ジャンル" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Khán giả', 'Thể loại', 'Phát sóng', 'Chương trình'], answer: 'Thể loại', explanationVi: 'ジャンル = thể loại', difficulty: DIFFICULTY.EASY },
    ],
  },
];
