import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseTechnologyLessons: LessonData[] = [
  {
    title: 'Technology & Internet',
    titleVi: 'Công nghệ & Internet',
    description: 'Learn technology vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về công nghệ bằng tiếng Trung',
    topic: TOPICS.TECHNOLOGY,
    vocabulary: [
      { word: '电脑 (diànnǎo)', meaning: 'máy tính', example: '我用电脑工作。', exampleMeaning: 'Tôi dùng máy tính làm việc.', difficulty: DIFFICULTY.EASY },
      { word: '手机 (shǒujī)', meaning: 'điện thoại di động', example: '我有手机。', exampleMeaning: 'Tôi có điện thoại di động.', difficulty: DIFFICULTY.EASY },
      { word: '网络 (wǎngluò)', meaning: 'internet/mạng', example: '网络很快。', exampleMeaning: 'Mạng rất nhanh.', difficulty: DIFFICULTY.EASY },
      { word: '邮件 (yóujiàn)', meaning: 'email', example: '我发邮件。', exampleMeaning: 'Tôi gửi email.', difficulty: DIFFICULTY.EASY },
      { word: '应用 (yìngyòng)', meaning: 'ứng dụng', example: '下载这个应用。', exampleMeaning: 'Tải ứng dụng này.', difficulty: DIFFICULTY.EASY },
      { word: '照片 (zhàopiàn)', meaning: 'ảnh', example: '我拍照片。', exampleMeaning: 'Tôi chụp ảnh.', difficulty: DIFFICULTY.EASY },
      { word: '视频 (shìpín)', meaning: 'video', example: '我看视频。', exampleMeaning: 'Tôi xem video.', difficulty: DIFFICULTY.EASY },
      { word: '网站 (wǎngzhàn)', meaning: 'website', example: '这个网站很好。', exampleMeaning: 'Website này rất tốt.', difficulty: DIFFICULTY.EASY },
      { word: '密码 (mìmǎ)', meaning: 'mật khẩu', example: '请输入密码。', exampleMeaning: 'Xin nhập mật khẩu.', difficulty: DIFFICULTY.EASY },
      { word: '搜索 (sōusuǒ)', meaning: 'tìm kiếm', example: '我在网上搜索。', exampleMeaning: 'Tôi tìm kiếm trên mạng.', difficulty: DIFFICULTY.MEDIUM },
      { word: '下载 (xiàzài)', meaning: 'tải xuống', example: '下载文件。', exampleMeaning: 'Tải file xuống.', difficulty: DIFFICULTY.EASY },
      { word: '微信 (Wēixìn)', meaning: 'WeChat', example: '我用微信聊天。', exampleMeaning: 'Tôi dùng WeChat nhắn tin.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"电脑" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Điện thoại', 'Máy tính', 'Tivi', 'Máy ảnh'], answer: 'Máy tính', explanationVi: '电脑 (diànnǎo) = máy tính', difficulty: DIFFICULTY.EASY },
      { question: '"Email" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['应用', '邮件', '网站', '文件'], answer: '邮件', explanationVi: '邮件 (yóujiàn) = email', difficulty: DIFFICULTY.EASY },
      { question: '"搜索" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tải xuống', 'Gửi đi', 'Tìm kiếm', 'Xóa'], answer: 'Tìm kiếm', explanationVi: '搜索 (sōusuǒ) = tìm kiếm', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Mật khẩu" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['网络', '密码', '邮件', '手机'], answer: '密码', explanationVi: '密码 (mìmǎ) = mật khẩu', difficulty: DIFFICULTY.EASY },
      { question: '"视频" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ảnh', 'Video', 'Nhạc', 'Sách'], answer: 'Video', explanationVi: '视频 (shìpín) = video', difficulty: DIFFICULTY.EASY },
    ],
  },
];
