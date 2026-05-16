import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseFamilyLessons: LessonData[] = [
  {
    title: '家庭成员',
    titleVi: 'Thành viên gia đình',
    description: 'Learn family member vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về thành viên gia đình trong tiếng Trung',
    topic: TOPICS.FAMILY,
    vocabulary: [
      { word: '爸爸', reading: 'bà ba', meaning: 'Bố', example: '我爸爸是医生。', exampleMeaning: 'Bố tôi là bác sĩ.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '妈妈', reading: 'mā ma', meaning: 'Mẹ', example: '妈妈做饭很好吃。', exampleMeaning: 'Mẹ nấu ăn rất ngon.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '哥哥', reading: 'gē ge', meaning: 'Anh trai', example: '我哥哥比我大三岁。', exampleMeaning: 'Anh trai tôi lớn hơn tôi 3 tuổi.', difficulty: DIFFICULTY.EASY },
      { word: '姐姐', reading: 'jiě jie', meaning: 'Chị gái', example: '姐姐在大学学习。', exampleMeaning: 'Chị gái đang học đại học.', difficulty: DIFFICULTY.EASY },
      { word: '弟弟', reading: 'dì di', meaning: 'Em trai', example: '弟弟今年十岁。', exampleMeaning: 'Em trai năm nay 10 tuổi.', difficulty: DIFFICULTY.EASY },
      { word: '妹妹', reading: 'mèi mei', meaning: 'Em gái', example: '妹妹很可爱。', exampleMeaning: 'Em gái rất dễ thương.', difficulty: DIFFICULTY.EASY },
      { word: '爷爷', reading: 'yé ye', meaning: 'Ông (nội)', example: '爷爷今年八十岁了。', exampleMeaning: 'Ông nội năm nay 80 tuổi.', difficulty: DIFFICULTY.EASY },
      { word: '奶奶', reading: 'nǎi nai', meaning: 'Bà (nội)', example: '奶奶住在乡下。', exampleMeaning: 'Bà nội sống ở quê.', difficulty: DIFFICULTY.EASY },
      { word: '家', reading: 'jiā', meaning: 'Nhà / Gia đình', example: '我家有五口人。', exampleMeaning: 'Gia đình tôi có 5 người.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '孩子', reading: 'hái zi', meaning: 'Con / Trẻ em', example: '他有两个孩子。', exampleMeaning: 'Anh ấy có hai đứa con.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"爸爸" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Mẹ', 'Bố', 'Ông', 'Bà'], answer: 'Bố', explanationVi: '爸爸 (bà ba) = Bố', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"姐姐" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Anh trai', 'Chị gái', 'Em gái', 'Em trai'], answer: 'Chị gái', explanationVi: '姐姐 (jiě jie) = Chị gái', difficulty: DIFFICULTY.EASY },
      { question: '"家" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Trường', 'Công ty', 'Nhà / Gia đình', 'Bệnh viện'], answer: 'Nhà / Gia đình', explanationVi: '家 (jiā) = Nhà, gia đình', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"弟弟" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Anh trai', 'Chị gái', 'Em trai', 'Em gái'], answer: 'Em trai', explanationVi: '弟弟 (dì di) = Em trai', difficulty: DIFFICULTY.EASY },
      { question: '"奶奶" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ông nội', 'Bà nội', 'Mẹ', 'Chị gái'], answer: 'Bà nội', explanationVi: '奶奶 (nǎi nai) = Bà nội', difficulty: DIFFICULTY.EASY },
    ],
  },
  {
    title: '家庭活动',
    titleVi: 'Hoạt động gia đình',
    description: 'Learn vocabulary about family activities',
    descriptionVi: 'Học từ vựng về hoạt động gia đình',
    topic: TOPICS.FAMILY,
    vocabulary: [
      { word: '一起', reading: 'yī qǐ', meaning: 'Cùng nhau', example: '我们一起吃饭吧。', exampleMeaning: 'Chúng ta cùng ăn cơm nhé.', difficulty: DIFFICULTY.EASY },
      { word: '做饭', reading: 'zuò fàn', meaning: 'Nấu ăn', example: '妈妈在做饭。', exampleMeaning: 'Mẹ đang nấu ăn.', difficulty: DIFFICULTY.EASY },
      { word: '看电视', reading: 'kàn diàn shì', meaning: 'Xem TV', example: '爸爸在看电视。', exampleMeaning: 'Bố đang xem TV.', difficulty: DIFFICULTY.EASY },
      { word: '散步', reading: 'sàn bù', meaning: 'Đi dạo', example: '晚饭后我们去散步。', exampleMeaning: 'Sau bữa tối chúng tôi đi dạo.', difficulty: DIFFICULTY.EASY },
      { word: '打电话', reading: 'dǎ diàn huà', meaning: 'Gọi điện thoại', example: '我给妈妈打电话。', exampleMeaning: 'Tôi gọi điện cho mẹ.', difficulty: DIFFICULTY.EASY },
      { word: '回家', reading: 'huí jiā', meaning: 'Về nhà', example: '我六点回家。', exampleMeaning: 'Tôi 6 giờ về nhà.', difficulty: DIFFICULTY.EASY },
      { word: '过年', reading: 'guò nián', meaning: 'Đón năm mới', example: '我们回老家过年。', exampleMeaning: 'Chúng tôi về quê đón năm mới.', difficulty: DIFFICULTY.MEDIUM },
      { word: '生日', reading: 'shēng rì', meaning: 'Sinh nhật', example: '今天是我妈妈的生日。', exampleMeaning: 'Hôm nay là sinh nhật mẹ tôi.', difficulty: DIFFICULTY.EASY },
      { word: '照片', reading: 'zhào piàn', meaning: 'Ảnh', example: '我们拍一张照片吧。', exampleMeaning: 'Chúng ta chụp một tấm ảnh nhé.', difficulty: DIFFICULTY.EASY },
      { word: '开心', reading: 'kāi xīn', meaning: 'Vui vẻ', example: '全家人都很开心。', exampleMeaning: 'Cả gia đình đều rất vui vẻ.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"一起" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Một mình', 'Cùng nhau', 'Riêng biệt', 'Xa nhau'], answer: 'Cùng nhau', explanationVi: '一起 (yī qǐ) = Cùng nhau', difficulty: DIFFICULTY.EASY },
      { question: '"做饭" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ăn cơm', 'Nấu ăn', 'Rửa bát', 'Đi chợ'], answer: 'Nấu ăn', explanationVi: '做饭 (zuò fàn) = Nấu ăn', difficulty: DIFFICULTY.EASY },
      { question: '"回家" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Đi làm', 'Đi học', 'Về nhà', 'Đi chơi'], answer: 'Về nhà', explanationVi: '回家 (huí jiā) = Về nhà', difficulty: DIFFICULTY.EASY },
      { question: '"生日" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Năm mới', 'Sinh nhật', 'Kỷ niệm', 'Lễ hội'], answer: 'Sinh nhật', explanationVi: '生日 (shēng rì) = Sinh nhật', difficulty: DIFFICULTY.EASY },
      { question: '"开心" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Buồn', 'Giận', 'Vui vẻ', 'Mệt'], answer: 'Vui vẻ', explanationVi: '开心 (kāi xīn) = Vui vẻ, hạnh phúc', difficulty: DIFFICULTY.EASY },
    ],
  },
];
