import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishTravelIntermediateLessons: LessonData[] = [
  {
    title: 'Hotel Booking',
    titleVi: 'Đặt phòng khách sạn',
    description: 'Learn vocabulary and phrases for booking hotels',
    descriptionVi: 'Học từ vựng và cụm từ để đặt phòng khách sạn',
    topic: TOPICS.TRAVEL,
    vocabulary: [
      { word: 'reservation', meaning: 'đặt phòng/đặt chỗ', example: 'I have a reservation under the name Nguyen.', exampleMeaning: 'Tôi có đặt phòng dưới tên Nguyễn.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'check in', meaning: 'nhận phòng', example: 'What time can I check in?', exampleMeaning: 'Mấy giờ tôi có thể nhận phòng?', difficulty: DIFFICULTY.EASY },
      { word: 'check out', meaning: 'trả phòng', example: 'Check out is at 11 AM.', exampleMeaning: 'Trả phòng lúc 11 giờ sáng.', difficulty: DIFFICULTY.EASY },
      { word: 'single room', meaning: 'phòng đơn', example: 'I would like a single room for two nights.', exampleMeaning: 'Tôi muốn phòng đơn hai đêm.', difficulty: DIFFICULTY.EASY },
      { word: 'double room', meaning: 'phòng đôi', example: 'Do you have a double room available?', exampleMeaning: 'Có phòng đôi trống không?', difficulty: DIFFICULTY.EASY },
      { word: 'suite', meaning: 'phòng suite', example: 'The suite has a beautiful view.', exampleMeaning: 'Phòng suite có view đẹp.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'room service', meaning: 'dịch vụ phòng', example: 'Can I order room service?', exampleMeaning: 'Tôi có thể gọi dịch vụ phòng không?', difficulty: DIFFICULTY.MEDIUM },
      { word: 'complimentary', meaning: 'miễn phí (kèm theo)', example: 'Breakfast is complimentary.', exampleMeaning: 'Bữa sáng miễn phí.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'amenities', meaning: 'tiện nghi', example: 'The hotel has great amenities.', exampleMeaning: 'Khách sạn có tiện nghi tuyệt vời.', difficulty: DIFFICULTY.HARD },
      { word: 'concierge', meaning: 'lễ tân/nhân viên hỗ trợ', example: 'Ask the concierge for restaurant recommendations.', exampleMeaning: 'Hỏi lễ tân gợi ý nhà hàng.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"reservation" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hủy phòng', 'Đặt phòng/đặt chỗ', 'Trả phòng', 'Nhận phòng'], answer: 'Đặt phòng/đặt chỗ', explanationVi: 'Reservation = đặt phòng, đặt chỗ trước', difficulty: DIFFICULTY.EASY },
      { question: '"complimentary" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Đắt tiền', 'Miễn phí (kèm theo)', 'Bắt buộc', 'Tùy chọn'], answer: 'Miễn phí (kèm theo)', explanationVi: 'Complimentary = miễn phí, được tặng kèm', difficulty: DIFFICULTY.MEDIUM },
      { question: '"check out" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nhận phòng', 'Trả phòng', 'Đặt phòng', 'Hủy phòng'], answer: 'Trả phòng', explanationVi: 'Check out = trả phòng, ngược lại check in = nhận phòng', difficulty: DIFFICULTY.EASY },
      { question: '"amenities" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nhân viên', 'Tiện nghi', 'Giá phòng', 'Vị trí'], answer: 'Tiện nghi', explanationVi: 'Amenities = tiện nghi (wifi, hồ bơi, gym...)', difficulty: DIFFICULTY.MEDIUM },
      { question: 'Fill in: "I have a _____ for tonight."', type: QUIZ_TYPES.FILL_BLANK, options: [], answer: 'reservation', explanationVi: 'Reservation = đặt phòng trước', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
  {
    title: 'Travel Problems',
    titleVi: 'Vấn đề khi du lịch',
    description: 'Learn to handle common travel problems',
    descriptionVi: 'Học cách xử lý các vấn đề thường gặp khi du lịch',
    topic: TOPICS.TRAVEL,
    vocabulary: [
      { word: 'delayed', meaning: 'bị trễ/hoãn', example: 'My flight is delayed by two hours.', exampleMeaning: 'Chuyến bay của tôi bị trễ 2 tiếng.', difficulty: DIFFICULTY.EASY },
      { word: 'cancelled', meaning: 'bị hủy', example: 'The train has been cancelled.', exampleMeaning: 'Chuyến tàu đã bị hủy.', difficulty: DIFFICULTY.EASY },
      { word: 'lost', meaning: 'bị mất/lạc', example: 'I lost my passport.', exampleMeaning: 'Tôi bị mất hộ chiếu.', difficulty: DIFFICULTY.EASY },
      { word: 'stolen', meaning: 'bị đánh cắp', example: 'My wallet was stolen.', exampleMeaning: 'Ví của tôi bị đánh cắp.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'embassy', meaning: 'đại sứ quán', example: 'I need to go to the embassy.', exampleMeaning: 'Tôi cần đến đại sứ quán.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'insurance', meaning: 'bảo hiểm', example: 'Do you have travel insurance?', exampleMeaning: 'Bạn có bảo hiểm du lịch không?', difficulty: DIFFICULTY.MEDIUM },
      { word: 'emergency', meaning: 'khẩn cấp', example: 'Call the emergency number.', exampleMeaning: 'Gọi số khẩn cấp.', difficulty: DIFFICULTY.EASY },
      { word: 'refund', meaning: 'hoàn tiền', example: 'Can I get a refund?', exampleMeaning: 'Tôi có thể được hoàn tiền không?', difficulty: DIFFICULTY.MEDIUM },
      { word: 'complaint', meaning: 'khiếu nại', example: 'I would like to make a complaint.', exampleMeaning: 'Tôi muốn khiếu nại.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'rebook', meaning: 'đặt lại', example: 'Can you rebook my flight?', exampleMeaning: 'Bạn có thể đặt lại chuyến bay cho tôi không?', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"delayed" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bị hủy', 'Bị trễ/hoãn', 'Đúng giờ', 'Sớm'], answer: 'Bị trễ/hoãn', explanationVi: 'Delayed = bị trễ, bị hoãn', difficulty: DIFFICULTY.EASY },
      { question: '"refund" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thanh toán', 'Hoàn tiền', 'Phạt', 'Giảm giá'], answer: 'Hoàn tiền', explanationVi: 'Refund = hoàn tiền', difficulty: DIFFICULTY.MEDIUM },
      { question: '"embassy" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sân bay', 'Đại sứ quán', 'Bệnh viện', 'Đồn cảnh sát'], answer: 'Đại sứ quán', explanationVi: 'Embassy = đại sứ quán', difficulty: DIFFICULTY.MEDIUM },
      { question: '"insurance" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bảo hiểm', 'Bảo hành', 'Bảo vệ', 'Bảo mật'], answer: 'Bảo hiểm', explanationVi: 'Insurance = bảo hiểm (travel insurance = bảo hiểm du lịch)', difficulty: DIFFICULTY.MEDIUM },
      { question: '"My wallet was _____." (bị đánh cắp)', type: QUIZ_TYPES.FILL_BLANK, options: [], answer: 'stolen', explanationVi: 'Stolen = bị đánh cắp (quá khứ phân từ của steal)', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
