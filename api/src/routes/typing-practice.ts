import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { paginate } from '../types/responses';

const router = Router();

const typingExercises: Record<string, any[]> = {
  en: [
    { id: 'en-1', text: 'The quick brown fox jumps over the lazy dog.', translation: 'Con cáo nâu nhanh nhẹn nhảy qua con chó lười.', difficulty: 'easy' },
    { id: 'en-2', text: 'Practice makes perfect.', translation: 'Luyện tập tạo nên sự hoàn hảo.', difficulty: 'easy' },
    { id: 'en-3', text: 'Learning a new language opens doors to new cultures.', translation: 'Học ngôn ngữ mới mở ra cánh cửa đến văn hóa mới.', difficulty: 'medium' },
    { id: 'en-4', text: 'She sells seashells by the seashore.', translation: 'Cô ấy bán vỏ sò bên bờ biển.', difficulty: 'medium' },
    { id: 'en-5', text: 'The more you practice, the better you become.', translation: 'Bạn càng luyện tập, bạn càng giỏi hơn.', difficulty: 'easy' },
    { id: 'en-6', text: 'Knowledge is power, but enthusiasm pulls the switch.', translation: 'Kiến thức là sức mạnh, nhưng nhiệt huyết mới là công tắc.', difficulty: 'medium' },
    { id: 'en-7', text: 'Every expert was once a beginner who never gave up.', translation: 'Mọi chuyên gia đều từng là người mới không bao giờ bỏ cuộc.', difficulty: 'medium' },
    { id: 'en-8', text: 'The journey of a thousand miles begins with a single step.', translation: 'Hành trình ngàn dặm bắt đầu từ một bước chân.', difficulty: 'medium' },
    { id: 'en-9', text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', translation: 'Thành công không phải là cuối cùng, thất bại không phải là chết: chính lòng dũng cảm tiếp tục mới quan trọng.', difficulty: 'hard' },
    { id: 'en-10', text: 'In the middle of difficulty lies opportunity.', translation: 'Giữa khó khăn ẩn chứa cơ hội.', difficulty: 'easy' },
  ],
  ja: [
    { id: 'ja-1', text: 'おはようございます。', translation: 'Chào buổi sáng.', difficulty: 'easy' },
    { id: 'ja-2', text: '日本語を勉強しています。', translation: 'Tôi đang học tiếng Nhật.', difficulty: 'easy' },
    { id: 'ja-3', text: '毎日少しずつ練習することが大切です。', translation: 'Luyện tập một chút mỗi ngày là quan trọng.', difficulty: 'medium' },
    { id: 'ja-4', text: '新しい言葉を覚えるのは楽しいです。', translation: 'Học từ mới rất vui.', difficulty: 'medium' },
    { id: 'ja-5', text: '日本の文化に興味があります。', translation: 'Tôi quan tâm đến văn hóa Nhật Bản.', difficulty: 'easy' },
    { id: 'ja-6', text: '来週の月曜日に会議があります。', translation: 'Thứ Hai tuần sau có cuộc họp.', difficulty: 'medium' },
    { id: 'ja-7', text: '東京は世界で最も人口が多い都市の一つです。', translation: 'Tokyo là một trong những thành phố đông dân nhất thế giới.', difficulty: 'hard' },
    { id: 'ja-8', text: '失敗は成功のもとです。', translation: 'Thất bại là mẹ thành công.', difficulty: 'easy' },
    { id: 'ja-9', text: '日本語の文法は英語とかなり違います。', translation: 'Ngữ pháp tiếng Nhật khá khác so với tiếng Anh.', difficulty: 'hard' },
    { id: 'ja-10', text: '桜の季節は日本で一番美しい時期です。', translation: 'Mùa hoa anh đào là thời kỳ đẹp nhất ở Nhật Bản.', difficulty: 'hard' },
  ],
  zh: [
    { id: 'zh-1', text: '你好，很高兴认识你。', translation: 'Xin chào, rất vui được gặp bạn.', difficulty: 'easy' },
    { id: 'zh-2', text: '我正在学习中文。', translation: 'Tôi đang học tiếng Trung.', difficulty: 'easy' },
    { id: 'zh-3', text: '每天练习一点很重要。', translation: 'Luyện tập một chút mỗi ngày rất quan trọng.', difficulty: 'medium' },
    { id: 'zh-4', text: '学习新词汇很有趣。', translation: 'Học từ vựng mới rất thú vị.', difficulty: 'easy' },
    { id: 'zh-5', text: '中国文化博大精深。', translation: 'Văn hóa Trung Quốc rộng lớn và sâu sắc.', difficulty: 'medium' },
    { id: 'zh-6', text: '读万卷书不如行万里路。', translation: 'Đọc vạn cuốn sách không bằng đi vạn dặm đường.', difficulty: 'medium' },
    { id: 'zh-7', text: '世上无难事，只怕有心人。', translation: 'Trên đời không có việc gì khó, chỉ sợ lòng không bền.', difficulty: 'hard' },
    { id: 'zh-8', text: '学如逆水行舟，不进则退。', translation: 'Học như thuyền ngược nước, không tiến ắt lùi.', difficulty: 'hard' },
    { id: 'zh-9', text: '活到老学到老。', translation: 'Sống đến già, học đến già.', difficulty: 'easy' },
    { id: 'zh-10', text: '千里之行始于足下。', translation: 'Hành trình ngàn dặm bắt đầu từ bước chân.', difficulty: 'medium' },
  ],
  ko: [
    { id: 'ko-1', text: '안녕하세요, 만나서 반갑습니다.', translation: 'Xin chào, rất vui được gặp bạn.', difficulty: 'easy' },
    { id: 'ko-2', text: '한국어를 공부하고 있어요.', translation: 'Tôi đang học tiếng Hàn.', difficulty: 'easy' },
    { id: 'ko-3', text: '매일 조금씩 연습하는 것이 중요해요.', translation: 'Luyện tập một chút mỗi ngày là quan trọng.', difficulty: 'medium' },
    { id: 'ko-4', text: '새로운 단어를 배우는 것은 재미있어요.', translation: 'Học từ mới rất vui.', difficulty: 'easy' },
    { id: 'ko-5', text: '한국 문화에 관심이 있어요.', translation: 'Tôi quan tâm đến văn hóa Hàn Quốc.', difficulty: 'easy' },
    { id: 'ko-6', text: '서울은 현대적이면서도 전통적인 도시예요.', translation: 'Seoul là thành phố vừa hiện đại vừa truyền thống.', difficulty: 'medium' },
    { id: 'ko-7', text: '실패는 성공의 어머니입니다.', translation: 'Thất bại là mẹ thành công.', difficulty: 'medium' },
    { id: 'ko-8', text: '꿈을 이루기 위해서는 끊임없이 노력해야 합니다.', translation: 'Để thực hiện ước mơ phải nỗ lực không ngừng.', difficulty: 'hard' },
    { id: 'ko-9', text: '한국 음식은 매운 것이 많지만 정말 맛있어요.', translation: 'Đồ ăn Hàn Quốc nhiều món cay nhưng rất ngon.', difficulty: 'hard' },
    { id: 'ko-10', text: '천 리 길도 한 걸음부터 시작됩니다.', translation: 'Đường ngàn dặm cũng bắt đầu từ một bước.', difficulty: 'medium' },
  ],
};

router.get('/', authenticate, async (req, res) => {
  const { lang = 'en', difficulty } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const langCode = String(lang);

  let exercises = typingExercises[langCode] || typingExercises['en'];

  if (difficulty && typeof difficulty === 'string') {
    exercises = exercises.filter(e => e.difficulty === difficulty);
  }

  const result = paginate(exercises, page, limit);
  res.json({ ...result, language: langCode });
});

router.post('/result', authenticate, async (req, res) => {
  const { exerciseId, wpm, accuracy, timeSpent } = req.body;

  res.json({
    result: {
      exerciseId,
      wpm: wpm || 0,
      accuracy: accuracy || 0,
      timeSpent: timeSpent || 0,
      xpEarned: Math.round((wpm || 0) * (accuracy || 0) / 100),
    },
  });
});

export default router;
