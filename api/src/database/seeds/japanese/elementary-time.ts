import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseTimeLessons: LessonData[] = [
  {
    title: 'Time & Schedule',
    titleVi: 'Thời gian & Lịch trình',
    description: 'Learn time-related vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về thời gian bằng tiếng Nhật',
    topic: TOPICS.TIME,
    vocabulary: [
      { word: '朝 (あさ)', meaning: 'buổi sáng', example: '朝ごはんを食べます。', exampleMeaning: 'Tôi ăn sáng.', difficulty: DIFFICULTY.EASY },
      { word: '昼 (ひる)', meaning: 'buổi trưa', example: '昼休みです。', exampleMeaning: 'Giờ nghỉ trưa.', difficulty: DIFFICULTY.EASY },
      { word: '夜 (よる)', meaning: 'buổi tối', example: '夜にテレビを見ます。', exampleMeaning: 'Tôi xem TV buổi tối.', difficulty: DIFFICULTY.EASY },
      { word: '今日 (きょう)', meaning: 'hôm nay', example: '今日は月曜日です。', exampleMeaning: 'Hôm nay là thứ Hai.', difficulty: DIFFICULTY.EASY },
      { word: '明日 (あした)', meaning: 'ngày mai', example: '明日は休みです。', exampleMeaning: 'Ngày mai nghỉ.', difficulty: DIFFICULTY.EASY },
      { word: '昨日 (きのう)', meaning: 'hôm qua', example: '昨日は忙しかったです。', exampleMeaning: 'Hôm qua bận.', difficulty: DIFFICULTY.EASY },
      { word: '週末 (しゅうまつ)', meaning: 'cuối tuần', example: '週末に映画を見ます。', exampleMeaning: 'Cuối tuần tôi xem phim.', difficulty: DIFFICULTY.EASY },
      { word: '予定 (よてい)', meaning: 'lịch trình/kế hoạch', example: '明日の予定は何ですか？', exampleMeaning: 'Kế hoạch ngày mai là gì?', difficulty: DIFFICULTY.EASY },
      { word: '約束 (やくそく)', meaning: 'cuộc hẹn/lời hứa', example: '約束があります。', exampleMeaning: 'Tôi có cuộc hẹn.', difficulty: DIFFICULTY.EASY },
      { word: '遅い (おそい)', meaning: 'muộn/chậm', example: '遅れてすみません。', exampleMeaning: 'Xin lỗi vì đến muộn.', difficulty: DIFFICULTY.EASY },
      { word: '早い (はやい)', meaning: 'sớm/nhanh', example: '早く起きます。', exampleMeaning: 'Tôi dậy sớm.', difficulty: DIFFICULTY.EASY },
      { word: '時間 (じかん)', meaning: 'thời gian', example: '時間がありません。', exampleMeaning: 'Không có thời gian.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"朝" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Buổi tối', 'Buổi sáng', 'Buổi chiều', 'Nửa đêm'], answer: 'Buổi sáng', explanationVi: '朝 (あさ) = buổi sáng', difficulty: DIFFICULTY.EASY },
      { question: '"Ngày mai" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['昨日', '明日', '今日', '毎日'], answer: '明日', explanationVi: '明日 (あした) = ngày mai', difficulty: DIFFICULTY.EASY },
      { question: '"約束" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Lịch trình', 'Cuộc hẹn', 'Cuộc họp', 'Bữa tiệc'], answer: 'Cuộc hẹn', explanationVi: '約束 (やくそく) = cuộc hẹn/lời hứa', difficulty: DIFFICULTY.EASY },
      { question: '"Cuối tuần" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['平日', '週末', '休日', '祝日'], answer: '週末', explanationVi: '週末 (しゅうまつ) = cuối tuần', difficulty: DIFFICULTY.EASY },
      { question: '"遅い" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sớm', 'Muộn', 'Đúng giờ', 'Nhanh'], answer: 'Muộn', explanationVi: '遅い (おそい) = muộn/chậm', difficulty: DIFFICULTY.EASY },
    ],
  },
];
