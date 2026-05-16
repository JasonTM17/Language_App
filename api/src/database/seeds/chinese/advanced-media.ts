import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseMediaLessons: LessonData[] = [
  {
    title: 'Media & Entertainment',
    titleVi: 'Truyền thông & Giải trí',
    description: 'Learn media and entertainment vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về truyền thông và giải trí bằng tiếng Trung',
    topic: TOPICS.CULTURE,
    vocabulary: [
      { word: '播出 (bōchū)', meaning: 'phát sóng', example: '节目将播出。', exampleMeaning: 'Chương trình sẽ phát sóng.', difficulty: DIFFICULTY.MEDIUM },
      { word: '纪录片 (jìlùpiàn)', meaning: 'phim tài liệu', example: '我看了一部纪录片。', exampleMeaning: 'Tôi đã xem một phim tài liệu.', difficulty: DIFFICULTY.MEDIUM },
      { word: '社论 (shèlùn)', meaning: 'bài xã luận', example: '她写了一篇社论。', exampleMeaning: 'Cô ấy viết bài xã luận.', difficulty: DIFFICULTY.HARD },
      { word: '新闻 (xīnwén)', meaning: 'tin tức/báo chí', example: '你看新闻了吗？', exampleMeaning: 'Bạn xem tin tức chưa?', difficulty: DIFFICULTY.EASY },
      { word: '剧本 (jùběn)', meaning: 'kịch bản', example: '他在写剧本。', exampleMeaning: 'Anh ấy đang viết kịch bản.', difficulty: DIFFICULTY.HARD },
      { word: '字幕 (zìmù)', meaning: 'phụ đề', example: '请打开字幕。', exampleMeaning: 'Hãy bật phụ đề.', difficulty: DIFFICULTY.MEDIUM },
      { word: '观众 (guānzhòng)', meaning: 'khán giả', example: '观众鼓掌了。', exampleMeaning: 'Khán giả vỗ tay.', difficulty: DIFFICULTY.MEDIUM },
      { word: '流媒体 (liúméitǐ)', meaning: 'phát trực tuyến', example: '我喜欢用流媒体看电影。', exampleMeaning: 'Tôi thích xem phim trực tuyến.', difficulty: DIFFICULTY.MEDIUM },
      { word: '节目 (jiémù)', meaning: 'chương trình', example: '你喜欢什么节目？', exampleMeaning: 'Bạn thích chương trình nào?', difficulty: DIFFICULTY.EASY },
      { word: '审查 (shěnchá)', meaning: 'kiểm duyệt', example: '审查引起了争议。', exampleMeaning: 'Kiểm duyệt gây tranh cãi.', difficulty: DIFFICULTY.HARD },
      { word: '标题 (biāotí)', meaning: 'tiêu đề/tít báo', example: '标题吸引了我的注意。', exampleMeaning: 'Tiêu đề thu hút sự chú ý của tôi.', difficulty: DIFFICULTY.MEDIUM },
      { word: '类型 (lèixíng)', meaning: 'thể loại', example: '你喜欢什么类型？', exampleMeaning: 'Bạn thích thể loại nào?', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"播出" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ghi hình', 'Phát sóng', 'Biên tập', 'Đạo diễn'], answer: 'Phát sóng', explanationVi: '播出 (bōchū) = phát sóng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Phim tài liệu" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['剧本', '纪录片', '社论', '播出'], answer: '纪录片', explanationVi: '纪录片 (jìlùpiàn) = phim tài liệu', difficulty: DIFFICULTY.MEDIUM },
      { question: '"字幕" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tiêu đề', 'Phụ đề', 'Kịch bản', 'Thể loại'], answer: 'Phụ đề', explanationVi: '字幕 (zìmù) = phụ đề', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Kiểm duyệt" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['新闻', '审查', '社论', '标题'], answer: '审查', explanationVi: '审查 (shěnchá) = kiểm duyệt', difficulty: DIFFICULTY.HARD },
      { question: '"类型" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Khán giả', 'Thể loại', 'Phát sóng', 'Chương trình'], answer: 'Thể loại', explanationVi: '类型 (lèixíng) = thể loại', difficulty: DIFFICULTY.EASY },
    ],
  },
];
