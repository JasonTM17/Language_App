import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishTechnologyLessons: LessonData[] = [
  {
    title: 'Computers & Internet',
    titleVi: 'Máy tính & Internet',
    description: 'Learn vocabulary about computers and the internet',
    descriptionVi: 'Học từ vựng về máy tính và internet',
    topic: TOPICS.TECHNOLOGY,
    vocabulary: [
      { word: 'computer', meaning: 'máy tính', example: 'I use a computer for work.', exampleMeaning: 'Tôi dùng máy tính để làm việc.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'laptop', meaning: 'máy tính xách tay', example: 'My laptop is very light.', exampleMeaning: 'Máy tính xách tay của tôi rất nhẹ.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'phone', meaning: 'điện thoại', example: 'I forgot my phone at home.', exampleMeaning: 'Tôi quên điện thoại ở nhà.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'internet', meaning: 'mạng internet', example: 'The internet is slow today.', exampleMeaning: 'Mạng internet hôm nay chậm.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'website', meaning: 'trang web', example: 'This website is very useful.', exampleMeaning: 'Trang web này rất hữu ích.', difficulty: DIFFICULTY.EASY },
      { word: 'email', meaning: 'thư điện tử', example: 'I will send you an email.', exampleMeaning: 'Tôi sẽ gửi email cho bạn.', difficulty: DIFFICULTY.EASY },
      { word: 'password', meaning: 'mật khẩu', example: 'Don\'t share your password.', exampleMeaning: 'Đừng chia sẻ mật khẩu của bạn.', difficulty: DIFFICULTY.EASY },
      { word: 'download', meaning: 'tải xuống', example: 'I need to download this file.', exampleMeaning: 'Tôi cần tải xuống tệp này.', difficulty: DIFFICULTY.EASY },
      { word: 'search', meaning: 'tìm kiếm', example: 'Search for the answer online.', exampleMeaning: 'Tìm kiếm câu trả lời trên mạng.', difficulty: DIFFICULTY.EASY },
      { word: 'app', meaning: 'ứng dụng', example: 'This app helps me learn languages.', exampleMeaning: 'Ứng dụng này giúp tôi học ngôn ngữ.', difficulty: DIFFICULTY.VERY_EASY },
    ],
    quizzes: [
      { question: '"Máy tính xách tay" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['computer', 'laptop', 'tablet', 'phone'], answer: 'laptop', explanationVi: 'Laptop = máy tính xách tay', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"password" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tên đăng nhập', 'Mật khẩu', 'Email', 'Trang web'], answer: 'Mật khẩu', explanationVi: 'Password = mật khẩu', difficulty: DIFFICULTY.EASY },
      { question: '"download" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tải lên', 'Tải xuống', 'Xóa', 'Lưu'], answer: 'Tải xuống', explanationVi: 'Download = tải xuống, ngược lại upload = tải lên', difficulty: DIFFICULTY.EASY },
      { question: 'Fill in: "_____ for the answer online."', type: QUIZ_TYPES.FILL_BLANK, options: [], answer: 'Search', explanationVi: 'Search = tìm kiếm', difficulty: DIFFICULTY.EASY },
      { question: '"app" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Trò chơi', 'Ứng dụng', 'Trang web', 'Phần mềm'], answer: 'Ứng dụng', explanationVi: 'App (application) = ứng dụng', difficulty: DIFFICULTY.VERY_EASY },
    ],
  },
  {
    title: 'Social Media',
    titleVi: 'Mạng xã hội',
    description: 'Learn vocabulary about social media and online communication',
    descriptionVi: 'Học từ vựng về mạng xã hội và giao tiếp trực tuyến',
    topic: TOPICS.TECHNOLOGY,
    vocabulary: [
      { word: 'post', meaning: 'đăng bài', example: 'She posted a photo on Instagram.', exampleMeaning: 'Cô ấy đăng ảnh lên Instagram.', difficulty: DIFFICULTY.EASY },
      { word: 'share', meaning: 'chia sẻ', example: 'Can you share this link?', exampleMeaning: 'Bạn có thể chia sẻ liên kết này không?', difficulty: DIFFICULTY.EASY },
      { word: 'like', meaning: 'thích / lượt thích', example: 'My post got 100 likes.', exampleMeaning: 'Bài đăng của tôi được 100 lượt thích.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'comment', meaning: 'bình luận', example: 'Please leave a comment.', exampleMeaning: 'Hãy để lại bình luận.', difficulty: DIFFICULTY.EASY },
      { word: 'follow', meaning: 'theo dõi', example: 'Follow me on social media.', exampleMeaning: 'Theo dõi tôi trên mạng xã hội.', difficulty: DIFFICULTY.EASY },
      { word: 'message', meaning: 'tin nhắn', example: 'I sent you a message.', exampleMeaning: 'Tôi đã gửi tin nhắn cho bạn.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'video', meaning: 'video', example: 'This video is very funny.', exampleMeaning: 'Video này rất hài hước.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'photo', meaning: 'ảnh', example: 'Let me take a photo.', exampleMeaning: 'Để tôi chụp ảnh.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'online', meaning: 'trực tuyến', example: 'Are you online now?', exampleMeaning: 'Bạn đang trực tuyến không?', difficulty: DIFFICULTY.EASY },
      { word: 'notification', meaning: 'thông báo', example: 'I got a notification from the app.', exampleMeaning: 'Tôi nhận được thông báo từ ứng dụng.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"Đăng bài" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['share', 'post', 'send', 'write'], answer: 'post', explanationVi: 'Post = đăng bài lên mạng xã hội', difficulty: DIFFICULTY.EASY },
      { question: '"follow" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thích', 'Chia sẻ', 'Theo dõi', 'Bình luận'], answer: 'Theo dõi', explanationVi: 'Follow = theo dõi ai đó trên mạng xã hội', difficulty: DIFFICULTY.EASY },
      { question: '"notification" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tin nhắn', 'Thông báo', 'Bình luận', 'Lượt thích'], answer: 'Thông báo', explanationVi: 'Notification = thông báo', difficulty: DIFFICULTY.EASY },
      { question: '"Chia sẻ" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['post', 'like', 'share', 'comment'], answer: 'share', explanationVi: 'Share = chia sẻ', difficulty: DIFFICULTY.EASY },
      { question: '"online" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ngoại tuyến', 'Trực tuyến', 'Kết nối', 'Đăng nhập'], answer: 'Trực tuyến', explanationVi: 'Online = trực tuyến, ngược lại offline = ngoại tuyến', difficulty: DIFFICULTY.EASY },
    ],
  },
];
