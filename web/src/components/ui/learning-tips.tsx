'use client';

import { useState, useMemo } from 'react';

interface LearningTip {
  id: string;
  category: 'vocabulary' | 'grammar' | 'speaking' | 'listening' | 'general';
  title: string;
  content: string;
  icon: string;
  language?: string;
}

const tips: LearningTip[] = [
  { id: '1', category: 'vocabulary', title: 'Phương pháp liên tưởng', content: 'Kết nối từ mới với hình ảnh hoặc câu chuyện. Ví dụ: "enormous" → tưởng tượng con voi khổng lồ (e-NOR-mous → elephant).', icon: '🧠' },
  { id: '2', category: 'vocabulary', title: 'Quy tắc 5 lần gặp', content: 'Bạn cần gặp một từ ít nhất 5 lần trong các ngữ cảnh khác nhau để nhớ lâu. Đọc, nghe, viết, nói, và ôn tập.', icon: '🔄' },
  { id: '3', category: 'grammar', title: 'Học qua mẫu câu', content: 'Thay vì học quy tắc ngữ pháp khô khan, hãy học qua mẫu câu hoàn chỉnh. Não bộ ghi nhớ pattern tốt hơn quy tắc.', icon: '📝' },
  { id: '4', category: 'grammar', title: 'Sai là bình thường', content: 'Mỗi lỗi sai là một cơ hội học. Ghi lại lỗi thường gặp và ôn lại định kỳ. Đừng sợ mắc lỗi!', icon: '✅' },
  { id: '5', category: 'speaking', title: 'Shadowing technique', content: 'Nghe và lặp lại ngay lập tức (không đợi hết câu). Phương pháp này cải thiện phát âm và ngữ điệu rất hiệu quả.', icon: '🎤' },
  { id: '6', category: 'speaking', title: 'Nói với chính mình', content: 'Tự mô tả những gì bạn đang làm bằng ngôn ngữ đang học. "I am cooking dinner" khi nấu ăn, "I am walking to work" khi đi bộ.', icon: '💬' },
  { id: '7', category: 'listening', title: 'Nghe chủ động vs thụ động', content: 'Nghe thụ động (nền) giúp quen âm thanh. Nghe chủ động (tập trung + ghi chú) giúp hiểu nội dung. Cần cả hai!', icon: '🎧' },
  { id: '8', category: 'listening', title: 'Tốc độ 0.75x', content: 'Khi mới bắt đầu, giảm tốc độ xuống 0.75x. Khi quen, tăng lên 1x rồi 1.25x. Tai sẽ thích nghi dần.', icon: '⏱️' },
  { id: '9', category: 'general', title: 'Pomodoro cho ngôn ngữ', content: '25 phút học tập trung + 5 phút nghỉ. Sau 4 pomodoro, nghỉ 15-30 phút. Não cần thời gian xử lý thông tin.', icon: '🍅' },
  { id: '10', category: 'general', title: 'Streak quan trọng hơn thời lượng', content: 'Học 10 phút mỗi ngày tốt hơn 2 tiếng cuối tuần. Tính nhất quán tạo thói quen và giúp nhớ lâu hơn.', icon: '🔥' },
  { id: '11', category: 'vocabulary', title: 'Từ vựng theo chủ đề', content: 'Học từ theo nhóm chủ đề (ẩm thực, du lịch, công việc) giúp tạo mạng lưới liên kết trong não.', icon: '🗂️' },
  { id: '12', category: 'general', title: 'Immersion tại nhà', content: 'Đổi ngôn ngữ điện thoại, xem phim có phụ đề, nghe podcast. Tạo môi trường ngôn ngữ ngay tại nhà.', icon: '🏠' },
  { id: '13', category: 'speaking', title: 'Ghi âm và so sánh', content: 'Ghi âm giọng mình, so sánh với người bản ngữ. Bạn sẽ nhận ra điểm cần cải thiện mà tai không nghe thấy khi nói.', icon: '🔊' },
  { id: '14', category: 'grammar', title: 'Input trước Output', content: 'Đọc và nghe nhiều trước khi cố nói/viết. Não cần đủ "input" để tạo ra "output" tự nhiên.', icon: '📥' },
  { id: '15', category: 'listening', title: 'Nghe lại 3 lần', content: 'Lần 1: nghe tổng thể. Lần 2: nghe chi tiết + ghi chú. Lần 3: nghe lại kiểm tra. Mỗi lần nghe bạn sẽ bắt được thêm.', icon: '3️⃣' },
];

interface LearningTipsProps {
  category?: LearningTip['category'];
  limit?: number;
}

export function LearningTips({ category, limit = 3 }: LearningTipsProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visibleTips = useMemo(() => {
    let filtered = tips.filter(t => !dismissed.has(t.id));
    if (category) filtered = filtered.filter(t => t.category === category);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  }, [category, limit, dismissed]);

  if (visibleTips.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
        💡 Mẹo học tập
      </h3>
      {visibleTips.map(tip => (
        <div
          key={tip.id}
          className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-100 dark:border-amber-800/30"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">{tip.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{tip.title}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{tip.content}</p>
            </div>
            <button
              onClick={() => setDismissed(prev => new Set([...prev, tip.id]))}
              className="text-gray-400 hover:text-gray-600 text-xs flex-shrink-0"
              aria-label="Ẩn mẹo"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
