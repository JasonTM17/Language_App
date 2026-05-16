import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseWorkLessons: LessonData[] = [
  {
    title: 'Work & Office',
    titleVi: 'Công việc & Văn phòng',
    description: 'Learn work-related vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về công việc bằng tiếng Nhật',
    topic: TOPICS.WORK,
    vocabulary: [
      { word: '仕事 (しごと)', meaning: 'công việc', example: '仕事は何ですか？', exampleMeaning: 'Bạn làm nghề gì?', difficulty: DIFFICULTY.EASY },
      { word: '会社 (かいしゃ)', meaning: 'công ty', example: '会社に行きます。', exampleMeaning: 'Tôi đi đến công ty.', difficulty: DIFFICULTY.EASY },
      { word: '会議 (かいぎ)', meaning: 'cuộc họp', example: '午後に会議があります。', exampleMeaning: 'Buổi chiều có cuộc họp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '上司 (じょうし)', meaning: 'sếp', example: '上司は優しいです。', exampleMeaning: 'Sếp tôi tốt bụng.', difficulty: DIFFICULTY.MEDIUM },
      { word: '同僚 (どうりょう)', meaning: 'đồng nghiệp', example: '同僚と昼ご飯を食べます。', exampleMeaning: 'Tôi ăn trưa với đồng nghiệp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '残業 (ざんぎょう)', meaning: 'làm thêm giờ', example: '今日は残業です。', exampleMeaning: 'Hôm nay phải làm thêm giờ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '給料 (きゅうりょう)', meaning: 'lương', example: '給料日は25日です。', exampleMeaning: 'Ngày lương là ngày 25.', difficulty: DIFFICULTY.MEDIUM },
      { word: '休み (やすみ)', meaning: 'nghỉ phép', example: '来週休みを取ります。', exampleMeaning: 'Tuần sau tôi nghỉ phép.', difficulty: DIFFICULTY.EASY },
      { word: '名刺 (めいし)', meaning: 'danh thiếp', example: '名刺を交換しましょう。', exampleMeaning: 'Hãy trao đổi danh thiếp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '出張 (しゅっちょう)', meaning: 'công tác', example: '来月出張があります。', exampleMeaning: 'Tháng sau có chuyến công tác.', difficulty: DIFFICULTY.HARD },
      { word: '面接 (めんせつ)', meaning: 'phỏng vấn', example: '明日面接があります。', exampleMeaning: 'Ngày mai có buổi phỏng vấn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '締め切り (しめきり)', meaning: 'hạn chót', example: '締め切りは金曜日です。', exampleMeaning: 'Hạn chót là thứ Sáu.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"仕事" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Trường học', 'Công việc', 'Nhà hàng', 'Bệnh viện'], answer: 'Công việc', explanationVi: '仕事 (しごと) = công việc', difficulty: DIFFICULTY.EASY },
      { question: '"Công ty" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['学校', '会社', '病院', '銀行'], answer: '会社', explanationVi: '会社 (かいしゃ) = công ty', difficulty: DIFFICULTY.EASY },
      { question: '"残業" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nghỉ phép', 'Làm thêm giờ', 'Họp', 'Công tác'], answer: 'Làm thêm giờ', explanationVi: '残業 (ざんぎょう) = làm thêm giờ', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Đồng nghiệp" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['上司', '同僚', '部下', '社長'], answer: '同僚', explanationVi: '同僚 (どうりょう) = đồng nghiệp', difficulty: DIFFICULTY.MEDIUM },
      { question: '"締め切り" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bắt đầu', 'Kết thúc', 'Hạn chót', 'Lịch trình'], answer: 'Hạn chót', explanationVi: '締め切り (しめきり) = hạn chót', difficulty: DIFFICULTY.HARD },
    ],
  },
];
