'use client';

import { useState } from 'react';

interface GrammarPoint {
  id: string;
  title: string;
  titleVi: string;
  pattern: string;
  explanation: string;
  examples: { sentence: string; translation: string }[];
}

const grammarData: Record<string, GrammarPoint[]> = {
  en: [
    {
      id: 'en-1', title: 'Present Simple', titleVi: 'Thì hiện tại đơn',
      pattern: 'S + V(s/es) + O',
      explanation: 'Dùng để diễn tả thói quen, sự thật hiển nhiên, lịch trình cố định.',
      examples: [
        { sentence: 'I study English every day.', translation: 'Tôi học tiếng Anh mỗi ngày.' },
        { sentence: 'She works at a hospital.', translation: 'Cô ấy làm việc ở bệnh viện.' },
        { sentence: 'The sun rises in the east.', translation: 'Mặt trời mọc ở phía đông.' },
      ],
    },
    {
      id: 'en-2', title: 'Present Continuous', titleVi: 'Thì hiện tại tiếp diễn',
      pattern: 'S + am/is/are + V-ing',
      explanation: 'Dùng để diễn tả hành động đang xảy ra tại thời điểm nói hoặc kế hoạch tương lai gần.',
      examples: [
        { sentence: 'I am studying Japanese now.', translation: 'Tôi đang học tiếng Nhật.' },
        { sentence: 'They are playing football.', translation: 'Họ đang chơi bóng đá.' },
        { sentence: 'She is coming tomorrow.', translation: 'Ngày mai cô ấy sẽ đến.' },
      ],
    },
    {
      id: 'en-3', title: 'Past Simple', titleVi: 'Thì quá khứ đơn',
      pattern: 'S + V-ed/V2 + O',
      explanation: 'Dùng để diễn tả hành động đã xảy ra và kết thúc trong quá khứ.',
      examples: [
        { sentence: 'I visited Hanoi last year.', translation: 'Năm ngoái tôi đã đến Hà Nội.' },
        { sentence: 'She studied Korean in college.', translation: 'Cô ấy đã học tiếng Hàn ở đại học.' },
        { sentence: 'We went to the beach yesterday.', translation: 'Hôm qua chúng tôi đã đi biển.' },
      ],
    },
    {
      id: 'en-4', title: 'Future Simple', titleVi: 'Thì tương lai đơn',
      pattern: 'S + will + V',
      explanation: 'Dùng để diễn tả dự đoán, quyết định tức thời, lời hứa.',
      examples: [
        { sentence: 'I will help you.', translation: 'Tôi sẽ giúp bạn.' },
        { sentence: 'It will rain tomorrow.', translation: 'Ngày mai trời sẽ mưa.' },
        { sentence: 'She will be a doctor.', translation: 'Cô ấy sẽ trở thành bác sĩ.' },
      ],
    },
    {
      id: 'en-5', title: 'Comparatives', titleVi: 'So sánh hơn',
      pattern: 'S + be + adj-er/more adj + than + O',
      explanation: 'Dùng để so sánh hai đối tượng. Tính từ ngắn thêm -er, tính từ dài thêm more.',
      examples: [
        { sentence: 'English is easier than Chinese.', translation: 'Tiếng Anh dễ hơn tiếng Trung.' },
        { sentence: 'Tokyo is more expensive than Hanoi.', translation: 'Tokyo đắt hơn Hà Nội.' },
        { sentence: 'He is taller than me.', translation: 'Anh ấy cao hơn tôi.' },
      ],
    },
  ],
  ja: [
    {
      id: 'ja-1', title: 'です/ます Form', titleVi: 'Thể lịch sự です/ます',
      pattern: 'N + です / V-ます',
      explanation: 'Thể lịch sự cơ bản trong tiếng Nhật. Dùng khi nói chuyện với người lạ, người lớn tuổi.',
      examples: [
        { sentence: '私は学生です。', translation: 'Tôi là sinh viên.' },
        { sentence: '毎日勉強します。', translation: 'Tôi học mỗi ngày.' },
        { sentence: 'これは本です。', translation: 'Đây là quyển sách.' },
      ],
    },
    {
      id: 'ja-2', title: 'Particles は/が/を/に', titleVi: 'Trợ từ は/が/を/に',
      pattern: 'N + は/が/を/に',
      explanation: 'は (wa): chủ đề, が (ga): chủ ngữ mới, を (wo): tân ngữ, に (ni): địa điểm/thời gian.',
      examples: [
        { sentence: '私は日本語を勉強します。', translation: 'Tôi học tiếng Nhật.' },
        { sentence: '猫が好きです。', translation: 'Tôi thích mèo.' },
        { sentence: '学校に行きます。', translation: 'Tôi đi đến trường.' },
      ],
    },
    {
      id: 'ja-3', title: 'て-form (Te-form)', titleVi: 'Thể て (nối hành động)',
      pattern: 'V-て + V / V-てください',
      explanation: 'Dùng để nối hành động, yêu cầu lịch sự, diễn tả trạng thái đang diễn ra.',
      examples: [
        { sentence: '食べてください。', translation: 'Xin hãy ăn.' },
        { sentence: '本を読んで、寝ます。', translation: 'Tôi đọc sách rồi đi ngủ.' },
        { sentence: '今、勉強しています。', translation: 'Bây giờ tôi đang học.' },
      ],
    },
  ],
  zh: [
    {
      id: 'zh-1', title: '是...的 Structure', titleVi: 'Cấu trúc 是...的',
      pattern: 'S + 是 + N/Adj',
      explanation: 'Cấu trúc cơ bản nhất: A là B. 是 (shì) = là.',
      examples: [
        { sentence: '我是越南人。', translation: 'Tôi là người Việt Nam.' },
        { sentence: '她是老师。', translation: 'Cô ấy là giáo viên.' },
        { sentence: '这是我的书。', translation: 'Đây là sách của tôi.' },
      ],
    },
    {
      id: 'zh-2', title: '了 (Completed Action)', titleVi: 'Trợ từ 了 (hành động hoàn thành)',
      pattern: 'S + V + 了 + O',
      explanation: '了 (le) đặt sau động từ để chỉ hành động đã hoàn thành.',
      examples: [
        { sentence: '我吃了早饭。', translation: 'Tôi đã ăn sáng.' },
        { sentence: '他去了日本。', translation: 'Anh ấy đã đi Nhật.' },
        { sentence: '我学了两年中文。', translation: 'Tôi đã học 2 năm tiếng Trung.' },
      ],
    },
    {
      id: 'zh-3', title: '在 + V (Progressive)', titleVi: 'Đang làm gì (在 + V)',
      pattern: 'S + 在 + V',
      explanation: '在 (zài) đặt trước động từ để chỉ hành động đang diễn ra (tương tự "đang" trong tiếng Việt).',
      examples: [
        { sentence: '我在看书。', translation: 'Tôi đang đọc sách.' },
        { sentence: '她在做饭。', translation: 'Cô ấy đang nấu ăn.' },
        { sentence: '他们在开会。', translation: 'Họ đang họp.' },
      ],
    },
    {
      id: 'zh-4', title: '比 (Comparison)', titleVi: 'So sánh hơn (比)',
      pattern: 'A + 比 + B + Adj',
      explanation: '比 (bǐ) dùng để so sánh. A 比 B + tính từ = A hơn B.',
      examples: [
        { sentence: '他比我高。', translation: 'Anh ấy cao hơn tôi.' },
        { sentence: '今天比昨天冷。', translation: 'Hôm nay lạnh hơn hôm qua.' },
        { sentence: '中文比英文难。', translation: 'Tiếng Trung khó hơn tiếng Anh.' },
      ],
    },
  ],
  ko: [
    {
      id: 'ko-1', title: '-입니다/이에요 (To Be)', titleVi: 'Động từ "là" -입니다/이에요',
      pattern: 'N + 입니다/이에요',
      explanation: '입니다 (trang trọng) và 이에요/예요 (thân mật) = là. Dùng để giới thiệu, mô tả.',
      examples: [
        { sentence: '저는 학생입니다.', translation: 'Tôi là sinh viên.' },
        { sentence: '이것은 책이에요.', translation: 'Đây là quyển sách.' },
        { sentence: '한국 사람이에요.', translation: 'Là người Hàn Quốc.' },
      ],
    },
    {
      id: 'ko-2', title: '-아/어요 (Polite Ending)', titleVi: 'Đuôi lịch sự -아/어요',
      pattern: 'V + 아/어요',
      explanation: 'Đuôi lịch sự thông dụng nhất. 아요 cho nguyên âm ㅏ/ㅗ, 어요 cho các nguyên âm khác.',
      examples: [
        { sentence: '한국어를 공부해요.', translation: 'Tôi học tiếng Hàn.' },
        { sentence: '매일 운동해요.', translation: 'Tôi tập thể dục mỗi ngày.' },
        { sentence: '커피를 마셔요.', translation: 'Tôi uống cà phê.' },
      ],
    },
    {
      id: 'ko-3', title: '-고 있다 (Progressive)', titleVi: 'Đang làm gì (-고 있다)',
      pattern: 'V + 고 있다',
      explanation: '-고 있다 gắn vào gốc động từ để diễn tả hành động đang diễn ra (tương tự "đang" trong tiếng Việt).',
      examples: [
        { sentence: '지금 공부하고 있어요.', translation: 'Tôi đang học bây giờ.' },
        { sentence: '비가 오고 있어요.', translation: 'Trời đang mưa.' },
        { sentence: '친구를 기다리고 있어요.', translation: 'Tôi đang đợi bạn.' },
      ],
    },
    {
      id: 'ko-4', title: '-보다 (Comparison)', titleVi: 'So sánh hơn (-보다)',
      pattern: 'N + 보다 + Adj',
      explanation: '보다 đặt sau danh từ được so sánh, nghĩa là "hơn". A가 B보다 + adj = A hơn B.',
      examples: [
        { sentence: '오늘이 어제보다 추워요.', translation: 'Hôm nay lạnh hơn hôm qua.' },
        { sentence: '한국어가 영어보다 어려워요.', translation: 'Tiếng Hàn khó hơn tiếng Anh.' },
        { sentence: '서울이 부산보다 커요.', translation: 'Seoul lớn hơn Busan.' },
      ],
    },
  ],
};

const languageTabs = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function GrammarPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const points = grammarData[selectedLang] || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display">Ngữ pháp</h1>
        <p className="text-muted-foreground mt-1">Các điểm ngữ pháp quan trọng</p>
      </div>

      {/* Language tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {languageTabs.map((lang) => (
          <button
            key={lang.code}
            onClick={() => { setSelectedLang(lang.code); setExpandedId(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              selectedLang === lang.code
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-gray-200'
            }`}
          >
            <span>{lang.flag}</span>
            {lang.name}
          </button>
        ))}
      </div>

      {/* Grammar points */}
      <div className="space-y-4">
        {points.map((point) => (
          <div key={point.id} className="rounded-2xl bg-card border border overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === point.id ? null : point.id)}
              className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div>
                <h3 className="font-semibold text-lg">{point.title}</h3>
                <p className="text-sm text-primary dark:text-primary-400">{point.titleVi}</p>
              </div>
              <svg className={`w-5 h-5 text-muted-foreground transition-transform ${expandedId === point.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedId === point.id && (
              <div className="px-5 pb-5 space-y-4 border-t border pt-4">
                <div className="p-3 rounded-xl bg-primary/5 border border-primary-100 dark:border-primary-800">
                  <p className="text-sm font-mono font-bold text-primary-700 dark:text-primary-300">{point.pattern}</p>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{point.explanation}</p>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Ví dụ:</p>
                  {point.examples.map((ex, i) => (
                    <div key={i} className="p-3 rounded-lg bg-muted/50">
                      <p className="font-medium text-sm">{ex.sentence}</p>
                      <p className="text-xs text-muted-foreground mt-1">{ex.translation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
