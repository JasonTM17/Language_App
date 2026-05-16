import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { paginate, errorResponse } from '../types/responses';

const router = Router();

interface GrammarTip {
  id: string;
  title: string;
  titleVi: string;
  explanation: string;
  pattern?: string;
  examples: Array<{ sentence: string; translation: string }>;
  level: string;
  commonMistakes?: string;
}

const grammarTips: Record<string, GrammarTip[]> = {
  en: [
    { id: 'en-1', title: 'Present Simple vs Present Continuous', titleVi: 'Hiện tại đơn vs Hiện tại tiếp diễn', explanation: 'Present Simple dùng cho thói quen, sự thật. Present Continuous dùng cho hành động đang xảy ra.', examples: [{ sentence: 'I study English every day. (Simple)', translation: 'Tôi học tiếng Anh mỗi ngày.' }, { sentence: 'I am studying English now. (Continuous)', translation: 'Tôi đang học tiếng Anh bây giờ.' }], level: 'beginner' },
    { id: 'en-2', title: 'Countable vs Uncountable Nouns', titleVi: 'Danh từ đếm được vs không đếm được', explanation: 'Countable: dùng a/an, many, few. Uncountable: dùng much, little, some.', examples: [{ sentence: 'I have many books. (countable)', translation: 'Tôi có nhiều sách.' }, { sentence: 'I need some water. (uncountable)', translation: 'Tôi cần một ít nước.' }], level: 'beginner' },
    { id: 'en-3', title: 'Past Simple vs Present Perfect', titleVi: 'Quá khứ đơn vs Hiện tại hoàn thành', explanation: 'Past Simple: hành động đã kết thúc, có thời gian cụ thể. Present Perfect: hành động liên quan đến hiện tại.', examples: [{ sentence: 'I went to Japan last year. (Past Simple)', translation: 'Tôi đã đi Nhật năm ngoái.' }, { sentence: 'I have been to Japan. (Present Perfect)', translation: 'Tôi đã từng đi Nhật.' }], level: 'intermediate' },
    { id: 'en-4', title: 'Conditional Sentences', titleVi: 'Câu điều kiện', explanation: 'Type 1: If + present, will + V. Type 2: If + past, would + V. Type 3: If + past perfect, would have + V3.', examples: [{ sentence: 'If it rains, I will stay home. (Type 1)', translation: 'Nếu trời mưa, tôi sẽ ở nhà.' }, { sentence: 'If I were rich, I would travel. (Type 2)', translation: 'Nếu tôi giàu, tôi sẽ đi du lịch.' }], level: 'intermediate' },
    { id: 'en-5', title: 'Relative Clauses', titleVi: 'Mệnh đề quan hệ', explanation: 'Who (người), which (vật), that (cả hai), where (nơi), when (thời gian).', examples: [{ sentence: 'The man who lives next door is a teacher.', translation: 'Người đàn ông sống cạnh nhà là giáo viên.' }, { sentence: 'The book which I bought is interesting.', translation: 'Cuốn sách mà tôi mua rất thú vị.' }], level: 'intermediate' },
  ],
  ja: [
    { id: 'ja-1', title: 'は vs が (Particles)', titleVi: 'Trợ từ は vs が', explanation: 'は (wa): đánh dấu chủ đề. が (ga): đánh dấu chủ ngữ mới/nhấn mạnh.', examples: [{ sentence: '私は学生です。', translation: 'Tôi là học sinh. (chủ đề)' }, { sentence: '誰が来ましたか？', translation: 'Ai đã đến? (nhấn mạnh chủ ngữ)' }], level: 'beginner' },
    { id: 'ja-2', title: 'て-form (Te-form)', titleVi: 'Thể て', explanation: 'Dùng để nối câu, yêu cầu, đang làm gì. Cách chia: 食べる→食べて, 飲む→飲んで.', examples: [{ sentence: '食べてください。', translation: 'Xin hãy ăn.' }, { sentence: '本を読んでいます。', translation: 'Tôi đang đọc sách.' }], level: 'beginner' },
    { id: 'ja-3', title: 'Verb Groups (動詞グループ)', titleVi: 'Nhóm động từ', explanation: 'Group 1 (u-verbs): 書く, 飲む. Group 2 (ru-verbs): 食べる, 見る. Group 3 (irregular): する, 来る.', examples: [{ sentence: '書く → 書きます (Group 1)', translation: 'Viết → Viết (lịch sự)' }, { sentence: '食べる → 食べます (Group 2)', translation: 'Ăn → Ăn (lịch sự)' }], level: 'beginner' },
    { id: 'ja-4', title: 'Passive Form (受身形)', titleVi: 'Thể bị động', explanation: 'Group 1: u→areru. Group 2: ru→rareru. する→される, 来る→来られる.', examples: [{ sentence: '先生に褒められました。', translation: 'Tôi được thầy khen.' }, { sentence: '雨に降られました。', translation: 'Tôi bị mưa (gặp mưa).' }], level: 'intermediate' },
  ],
  zh: [
    { id: 'zh-1', title: '了 (le) - Completed Action', titleVi: 'Trợ từ 了 - Hành động hoàn thành', explanation: '了 đặt sau động từ biểu thị hành động đã hoàn thành, hoặc cuối câu biểu thị thay đổi trạng thái.', examples: [{ sentence: '我吃了饭。', translation: 'Tôi đã ăn cơm.' }, { sentence: '下雨了。', translation: 'Trời mưa rồi. (thay đổi trạng thái)' }], level: 'beginner' },
    { id: 'zh-2', title: '的/得/地 (de)', titleVi: 'Ba chữ "de" trong tiếng Trung', explanation: '的: bổ nghĩa cho danh từ. 得: bổ nghĩa cho động từ (kết quả). 地: bổ nghĩa cho động từ (cách thức).', examples: [{ sentence: '漂亮的花 (beautiful flower)', translation: 'Hoa đẹp (的 + danh từ)' }, { sentence: '跑得快 (run fast)', translation: 'Chạy nhanh (得 + kết quả)' }], level: 'beginner' },
    { id: 'zh-3', title: '把 (bǎ) Structure', titleVi: 'Cấu trúc 把', explanation: 'S + 把 + O + V + complement. Dùng khi muốn nhấn mạnh tác động lên đối tượng.', examples: [{ sentence: '我把书放在桌子上。', translation: 'Tôi đặt sách lên bàn.' }, { sentence: '请把门关上。', translation: 'Xin hãy đóng cửa lại.' }], level: 'intermediate' },
    { id: 'zh-4', title: 'Measure Words (量词)', titleVi: 'Lượng từ', explanation: 'Tiếng Trung dùng lượng từ giữa số và danh từ: 个(cái), 本(cuốn), 只(con), 条(sợi/con).', examples: [{ sentence: '一个人 (one person)', translation: 'Một người (个 = lượng từ chung)' }, { sentence: '三本书 (three books)', translation: 'Ba cuốn sách (本 = cho sách)' }], level: 'beginner' },
  ],
  ko: [
    { id: 'ko-1', title: '은/는 vs 이/가 (Particles)', titleVi: 'Trợ từ 은/는 vs 이/가', explanation: '은/는: đánh dấu chủ đề (topic). 이/가: đánh dấu chủ ngữ (subject), thông tin mới.', examples: [{ sentence: '저는 학생이에요. (topic)', translation: 'Tôi là học sinh. (chủ đề)' }, { sentence: '누가 왔어요? (subject)', translation: 'Ai đã đến? (chủ ngữ mới)' }], level: 'beginner' },
    { id: 'ko-2', title: 'Honorific Speech (존댓말)', titleVi: 'Kính ngữ', explanation: 'Tiếng Hàn có nhiều cấp độ lịch sự: 해요체 (lịch sự thường), 합니다체 (trang trọng), 반말 (thân mật).', examples: [{ sentence: '먹어요 (polite)', translation: 'Ăn (lịch sự thường)' }, { sentence: '먹습니다 (formal)', translation: 'Ăn (trang trọng)' }], level: 'beginner' },
    { id: 'ko-3', title: 'Verb Conjugation Basics', titleVi: 'Chia động từ cơ bản', explanation: 'Bỏ 다 → thêm đuôi. 아/어요 (hiện tại), 았/었어요 (quá khứ), ㄹ/을 거예요 (tương lai).', examples: [{ sentence: '가다 → 가요 (present)', translation: 'Đi → Đi (hiện tại)' }, { sentence: '먹다 → 먹었어요 (past)', translation: 'Ăn → Đã ăn (quá khứ)' }], level: 'beginner' },
    { id: 'ko-4', title: '(으)면 - Conditional', titleVi: 'Câu điều kiện (으)면', explanation: 'V + (으)면: nếu... thì... Dùng cho điều kiện và giả định.', examples: [{ sentence: '비가 오면 집에 있어요.', translation: 'Nếu trời mưa thì ở nhà.' }, { sentence: '시간이 있으면 만나요.', translation: 'Nếu có thời gian thì gặp nhau.' }], level: 'intermediate' },
  ],
};

router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const lang = (req.query.lang as string) || 'en';
    const level = req.query.level as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    let tips = grammarTips[lang] || grammarTips['en'];
    if (level) {
      tips = tips.filter((t) => t.level === level);
    }

    res.json(paginate(tips, page, limit));
  } catch (error) {
    console.error('Grammar tips error:', error);
    res.status(500).json(errorResponse('Không thể tải mẹo ngữ pháp', 'INTERNAL_ERROR'));
  }
});

router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    for (const lang of Object.values(grammarTips)) {
      const tip = lang.find((t) => t.id === id);
      if (tip) {
        res.json(tip);
        return;
      }
    }

    res.status(404).json(errorResponse('Không tìm thấy mẹo ngữ pháp', 'NOT_FOUND'));
  } catch (error) {
    console.error('Grammar tip error:', error);
    res.status(500).json(errorResponse('Không thể tải mẹo ngữ pháp', 'INTERNAL_ERROR'));
  }
});

export default router;
