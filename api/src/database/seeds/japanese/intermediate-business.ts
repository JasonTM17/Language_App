import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseBusinessLessons: LessonData[] = [
  {
    title: 'Business Japanese',
    titleVi: 'Tiếng Nhật thương mại',
    description: 'Learn business vocabulary in Japanese',
    descriptionVi: 'Học từ vựng kinh doanh bằng tiếng Nhật',
    topic: TOPICS.WORK,
    vocabulary: [
      { word: '会議 (かいぎ)', meaning: 'cuộc họp', example: '会議は3時からです。', exampleMeaning: 'Cuộc họp từ 3 giờ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '名刺 (めいし)', meaning: 'danh thiếp', example: '名刺を交換しましょう。', exampleMeaning: 'Hãy trao đổi danh thiếp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '締め切り (しめきり)', meaning: 'hạn chót', example: '締め切りは金曜日です。', exampleMeaning: 'Hạn chót là thứ Sáu.', difficulty: DIFFICULTY.MEDIUM },
      { word: '出張 (しゅっちょう)', meaning: 'công tác', example: '来週出張があります。', exampleMeaning: 'Tuần sau tôi có chuyến công tác.', difficulty: DIFFICULTY.MEDIUM },
      { word: '残業 (ざんぎょう)', meaning: 'làm thêm giờ', example: '今日は残業です。', exampleMeaning: 'Hôm nay tôi làm thêm giờ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '報告書 (ほうこくしょ)', meaning: 'báo cáo', example: '報告書を書きます。', exampleMeaning: 'Tôi viết báo cáo.', difficulty: DIFFICULTY.HARD },
      { word: '取引先 (とりひきさき)', meaning: 'đối tác kinh doanh', example: '取引先と会います。', exampleMeaning: 'Tôi gặp đối tác kinh doanh.', difficulty: DIFFICULTY.HARD },
      { word: '給料 (きゅうりょう)', meaning: 'lương', example: '給料日は25日です。', exampleMeaning: 'Ngày lương là ngày 25.', difficulty: DIFFICULTY.MEDIUM },
      { word: '面接 (めんせつ)', meaning: 'phỏng vấn', example: '面接は明日です。', exampleMeaning: 'Phỏng vấn là ngày mai.', difficulty: DIFFICULTY.MEDIUM },
      { word: '上司 (じょうし)', meaning: 'sếp/cấp trên', example: '上司に相談します。', exampleMeaning: 'Tôi tham khảo ý kiến sếp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '部下 (ぶか)', meaning: 'cấp dưới', example: '部下を指導します。', exampleMeaning: 'Tôi hướng dẫn cấp dưới.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'プレゼン', meaning: 'thuyết trình', example: 'プレゼンの準備をします。', exampleMeaning: 'Tôi chuẩn bị thuyết trình.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"会議" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Công tác', 'Cuộc họp', 'Phỏng vấn', 'Thuyết trình'], answer: 'Cuộc họp', explanationVi: '会議 (かいぎ) = cuộc họp', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Hạn chót" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['出張', '締め切り', '残業', '給料'], answer: '締め切り', explanationVi: '締め切り (しめきり) = hạn chót/deadline', difficulty: DIFFICULTY.MEDIUM },
      { question: '"残業" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nghỉ phép', 'Làm thêm giờ', 'Đi công tác', 'Họp'], answer: 'Làm thêm giờ', explanationVi: '残業 (ざんぎょう) = làm thêm giờ/overtime', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Sếp" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['部下', '上司', '同僚', '社長'], answer: '上司', explanationVi: '上司 (じょうし) = sếp/cấp trên', difficulty: DIFFICULTY.MEDIUM },
      { question: '"名刺" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hợp đồng', 'Danh thiếp', 'Báo cáo', 'Lương'], answer: 'Danh thiếp', explanationVi: '名刺 (めいし) = danh thiếp/name card', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
