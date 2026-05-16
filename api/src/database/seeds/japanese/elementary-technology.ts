import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseTechnologyLessons: LessonData[] = [
  {
    title: 'Technology & Internet',
    titleVi: 'Công nghệ & Internet',
    description: 'Learn technology vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về công nghệ bằng tiếng Nhật',
    topic: TOPICS.TECHNOLOGY,
    vocabulary: [
      { word: 'パソコン', meaning: 'máy tính', example: 'パソコンを使います。', exampleMeaning: 'Tôi sử dụng máy tính.', difficulty: DIFFICULTY.EASY },
      { word: '携帯電話 (けいたいでんわ)', meaning: 'điện thoại di động', example: '携帯電話を持っています。', exampleMeaning: 'Tôi có điện thoại di động.', difficulty: DIFFICULTY.EASY },
      { word: 'インターネット', meaning: 'internet', example: 'インターネットで調べます。', exampleMeaning: 'Tôi tra cứu trên internet.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'メール', meaning: 'email', example: 'メールを送ります。', exampleMeaning: 'Tôi gửi email.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'アプリ', meaning: 'ứng dụng', example: 'アプリをダウンロードします。', exampleMeaning: 'Tôi tải ứng dụng.', difficulty: DIFFICULTY.EASY },
      { word: '写真 (しゃしん)', meaning: 'ảnh', example: '写真を撮ります。', exampleMeaning: 'Tôi chụp ảnh.', difficulty: DIFFICULTY.EASY },
      { word: '動画 (どうが)', meaning: 'video', example: '動画を見ます。', exampleMeaning: 'Tôi xem video.', difficulty: DIFFICULTY.EASY },
      { word: 'ウェブサイト', meaning: 'website', example: 'ウェブサイトを作ります。', exampleMeaning: 'Tôi tạo website.', difficulty: DIFFICULTY.EASY },
      { word: 'パスワード', meaning: 'mật khẩu', example: 'パスワードを入力します。', exampleMeaning: 'Tôi nhập mật khẩu.', difficulty: DIFFICULTY.EASY },
      { word: '検索 (けんさく)', meaning: 'tìm kiếm', example: 'ネットで検索します。', exampleMeaning: 'Tôi tìm kiếm trên mạng.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'ダウンロード', meaning: 'tải xuống', example: 'ファイルをダウンロードします。', exampleMeaning: 'Tôi tải file xuống.', difficulty: DIFFICULTY.EASY },
      { word: 'SNS', meaning: 'mạng xã hội', example: 'SNSを使います。', exampleMeaning: 'Tôi dùng mạng xã hội.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"パソコン" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Điện thoại', 'Máy tính', 'Tivi', 'Máy ảnh'], answer: 'Máy tính', explanationVi: 'パソコン = máy tính (personal computer)', difficulty: DIFFICULTY.EASY },
      { question: '"Email" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['アプリ', 'メール', 'ウェブ', 'ファイル'], answer: 'メール', explanationVi: 'メール = email', difficulty: DIFFICULTY.EASY },
      { question: '"検索" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tải xuống', 'Gửi đi', 'Tìm kiếm', 'Xóa'], answer: 'Tìm kiếm', explanationVi: '検索 (けんさく) = tìm kiếm', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Ứng dụng" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['ゲーム', 'アプリ', 'サイト', 'メール'], answer: 'アプリ', explanationVi: 'アプリ = ứng dụng (application)', difficulty: DIFFICULTY.EASY },
      { question: '"動画" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ảnh', 'Video', 'Nhạc', 'Sách'], answer: 'Video', explanationVi: '動画 (どうが) = video', difficulty: DIFFICULTY.EASY },
    ],
  },
];
