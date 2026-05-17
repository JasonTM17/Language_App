'use client';

import { useState } from 'react';
import { AudioPlayer } from '@/components/ui/audio-player';
import type { SupportedLanguage } from '@/services/audio';
import { motion, AnimatePresence } from 'framer-motion';

interface Idiom {
  id: string;
  phrase: string;
  reading?: string;
  literalMeaning: string;
  actualMeaning: string;
  example: string;
  exampleTranslation: string;
  equivalent?: string;
}

const idioms: Record<string, Idiom[]> = {
  en: [
    { id: 'en-1', phrase: 'Break the ice', literalMeaning: 'Phá vỡ băng', actualMeaning: 'Bắt đầu cuộc trò chuyện, phá vỡ sự ngại ngùng', example: 'He told a joke to break the ice at the meeting.', exampleTranslation: 'Anh ấy kể chuyện cười để phá vỡ sự ngại ngùng trong cuộc họp.', equivalent: 'Phá băng / Mở lời' },
    { id: 'en-2', phrase: 'A piece of cake', literalMeaning: 'Một miếng bánh', actualMeaning: 'Rất dễ dàng', example: 'The exam was a piece of cake!', exampleTranslation: 'Bài thi dễ ợt!', equivalent: 'Dễ như ăn kẹo' },
    { id: 'en-3', phrase: 'Hit the books', literalMeaning: 'Đánh vào sách', actualMeaning: 'Bắt đầu học bài chăm chỉ', example: 'I need to hit the books for tomorrow\'s test.', exampleTranslation: 'Tôi cần học bài cho bài kiểm tra ngày mai.', equivalent: 'Cắm đầu vào sách' },
    { id: 'en-4', phrase: 'Under the weather', literalMeaning: 'Dưới thời tiết', actualMeaning: 'Cảm thấy không khỏe, hơi ốm', example: 'I\'m feeling a bit under the weather today.', exampleTranslation: 'Hôm nay tôi cảm thấy hơi không khỏe.', equivalent: 'Trái gió trở trời' },
    { id: 'en-5', phrase: 'Cost an arm and a leg', literalMeaning: 'Tốn một cánh tay và một chân', actualMeaning: 'Rất đắt đỏ', example: 'That new phone costs an arm and a leg.', exampleTranslation: 'Cái điện thoại mới đó đắt kinh khủng.', equivalent: 'Đắt cắt cổ' },
    { id: 'en-6', phrase: 'Let the cat out of the bag', literalMeaning: 'Thả mèo ra khỏi túi', actualMeaning: 'Vô tình tiết lộ bí mật', example: 'She let the cat out of the bag about the surprise party.', exampleTranslation: 'Cô ấy vô tình lộ bí mật về bữa tiệc bất ngờ.', equivalent: 'Lỡ miệng / Bật mí' },
    { id: 'en-7', phrase: 'Kill two birds with one stone', literalMeaning: 'Giết hai con chim bằng một hòn đá', actualMeaning: 'Làm được hai việc cùng lúc', example: 'By cycling to work, I kill two birds with one stone — exercise and commuting.', exampleTranslation: 'Đạp xe đi làm, tôi được cả hai — tập thể dục và di chuyển.', equivalent: 'Một mũi tên trúng hai đích' },
    { id: 'en-8', phrase: 'Burn the midnight oil', literalMeaning: 'Đốt dầu lúc nửa đêm', actualMeaning: 'Thức khuya làm việc/học bài', example: 'Students often burn the midnight oil before exams.', exampleTranslation: 'Sinh viên thường thức khuya trước kỳ thi.', equivalent: 'Thức khuya / Đèn sách' },
    { id: 'en-9', phrase: 'Bite off more than you can chew', literalMeaning: 'Cắn nhiều hơn bạn có thể nhai', actualMeaning: 'Nhận quá nhiều việc, vượt quá khả năng', example: 'I bit off more than I could chew with three projects at once.', exampleTranslation: 'Tôi nhận quá nhiều việc khi làm 3 dự án cùng lúc.', equivalent: 'Tham thì thâm' },
    { id: 'en-10', phrase: 'The ball is in your court', literalMeaning: 'Bóng ở sân bạn', actualMeaning: 'Đến lượt bạn quyết định/hành động', example: 'I\'ve made my offer. The ball is in your court now.', exampleTranslation: 'Tôi đã đưa ra đề nghị. Giờ đến lượt bạn quyết định.', equivalent: 'Tùy bạn quyết định' },
  ],
  ja: [
    { id: 'ja-1', phrase: '猫の手も借りたい', reading: 'neko no te mo karitai', literalMeaning: 'Muốn mượn cả tay mèo', actualMeaning: 'Bận rộn đến mức cần bất kỳ sự giúp đỡ nào', example: '年末は猫の手も借りたいほど忙しい。', exampleTranslation: 'Cuối năm bận đến mức muốn mượn cả tay mèo.', equivalent: 'Bận rộn tối mắt tối mũi' },
    { id: 'ja-2', phrase: '花より団子', reading: 'hana yori dango', literalMeaning: 'Bánh dango hơn hoa', actualMeaning: 'Thực tế hơn vẻ đẹp bên ngoài, thích ăn hơn ngắm', example: '彼女は花より団子タイプだ。', exampleTranslation: 'Cô ấy thuộc kiểu thực tế hơn lãng mạn.', equivalent: 'Có thực mới vực được đạo' },
    { id: 'ja-3', phrase: '七転び八起き', reading: 'nana korobi ya oki', literalMeaning: 'Ngã 7 lần, đứng dậy 8 lần', actualMeaning: 'Không bao giờ bỏ cuộc, kiên trì', example: '七転び八起きの精神で頑張ろう。', exampleTranslation: 'Hãy cố gắng với tinh thần không bỏ cuộc.', equivalent: 'Thất bại là mẹ thành công' },
    { id: 'ja-4', phrase: '口が軽い', reading: 'kuchi ga karui', literalMeaning: 'Miệng nhẹ', actualMeaning: 'Hay nói lộ bí mật, không giữ được miệng', example: '彼は口が軽いから秘密を言わないで。', exampleTranslation: 'Anh ấy hay lộ bí mật nên đừng nói.', equivalent: 'Miệng hẹ / Lắm mồm' },
    { id: 'ja-5', phrase: '目から鱗', reading: 'me kara uroko', literalMeaning: 'Vảy rơi khỏi mắt', actualMeaning: 'Bất ngờ hiểu ra điều gì đó, giác ngộ', example: 'その説明を聞いて目から鱗だった。', exampleTranslation: 'Nghe giải thích xong tôi bỗng hiểu ra.', equivalent: 'Mở mắt ra / Ngộ ra' },
    { id: 'ja-6', phrase: '石の上にも三年', reading: 'ishi no ue ni mo san nen', literalMeaning: 'Ngồi trên đá cũng 3 năm', actualMeaning: 'Kiên nhẫn sẽ được đền đáp', example: '石の上にも三年、諦めないで。', exampleTranslation: 'Kiên nhẫn rồi sẽ thành công, đừng bỏ cuộc.', equivalent: 'Có công mài sắt có ngày nên kim' },
    { id: 'ja-7', phrase: '腹が立つ', reading: 'hara ga tatsu', literalMeaning: 'Bụng đứng lên', actualMeaning: 'Tức giận', example: '彼の態度に腹が立った。', exampleTranslation: 'Tôi tức giận vì thái độ của anh ấy.', equivalent: 'Nổi giận / Bực mình' },
    { id: 'ja-8', phrase: '一石二鳥', reading: 'isseki nichou', literalMeaning: 'Một đá hai chim', actualMeaning: 'Làm một việc được hai kết quả', example: '自転車通勤は一石二鳥だ。', exampleTranslation: 'Đạp xe đi làm được cả hai lợi ích.', equivalent: 'Một mũi tên trúng hai đích' },
  ],
  zh: [
    { id: 'zh-1', phrase: '入乡随俗', reading: 'rù xiāng suí sú', literalMeaning: 'Vào làng theo phong tục', actualMeaning: 'Đến đâu theo phong tục đó', example: '到了日本就入乡随俗吧。', exampleTranslation: 'Đến Nhật thì theo phong tục Nhật thôi.', equivalent: 'Nhập gia tùy tục' },
    { id: 'zh-2', phrase: '对牛弹琴', reading: 'duì niú tán qín', literalMeaning: 'Đàn cho trâu nghe', actualMeaning: 'Nói với người không hiểu, phí công', example: '跟他解释编程就像对牛弹琴。', exampleTranslation: 'Giải thích lập trình cho anh ấy như đàn gảy tai trâu.', equivalent: 'Đàn gảy tai trâu / Nước đổ đầu vịt' },
    { id: 'zh-3', phrase: '画蛇添足', reading: 'huà shé tiān zú', literalMeaning: 'Vẽ rắn thêm chân', actualMeaning: 'Làm thừa, thêm thắt không cần thiết', example: '你的文章已经很好了，别画蛇添足。', exampleTranslation: 'Bài viết của bạn đã tốt rồi, đừng thêm thắt nữa.', equivalent: 'Vẽ rắn thêm chân / Thừa' },
    { id: 'zh-4', phrase: '马马虎虎', reading: 'mǎ mǎ hū hū', literalMeaning: 'Ngựa ngựa hổ hổ', actualMeaning: 'Tàm tạm, bình thường, không tốt không xấu', example: '你中文怎么样？马马虎虎。', exampleTranslation: 'Tiếng Trung của bạn thế nào? Tàm tạm.', equivalent: 'Tàm tạm / Bình bình' },
    { id: 'zh-5', phrase: '半途而废', reading: 'bàn tú ér fèi', literalMeaning: 'Nửa đường bỏ phế', actualMeaning: 'Bỏ cuộc giữa chừng', example: '学语言不能半途而废。', exampleTranslation: 'Học ngôn ngữ không thể bỏ giữa chừng.', equivalent: 'Bỏ cuộc giữa chừng / Đứt gánh giữa đường' },
    { id: 'zh-6', phrase: '一举两得', reading: 'yī jǔ liǎng dé', literalMeaning: 'Một cử động được hai', actualMeaning: 'Làm một việc được hai lợi ích', example: '骑车上班一举两得。', exampleTranslation: 'Đạp xe đi làm được cả hai lợi ích.', equivalent: 'Một công đôi việc' },
    { id: 'zh-7', phrase: '笨鸟先飞', reading: 'bèn niǎo xiān fēi', literalMeaning: 'Chim dốt bay trước', actualMeaning: 'Người kém cần nỗ lực sớm hơn', example: '我知道自己笨，所以笨鸟先飞。', exampleTranslation: 'Tôi biết mình kém nên cố gắng sớm hơn.', equivalent: 'Chậm chân thì phải đi trước' },
    { id: 'zh-8', phrase: '脸皮厚', reading: 'liǎn pí hòu', literalMeaning: 'Da mặt dày', actualMeaning: 'Trơ trẽn, không biết xấu hổ', example: '他脸皮真厚，又来借钱了。', exampleTranslation: 'Anh ấy trơ trẽn thật, lại đến mượn tiền.', equivalent: 'Mặt dày / Trơ trẽn' },
  ],
  ko: [
    { id: 'ko-1', phrase: '눈이 높다', reading: 'nuni nopda', literalMeaning: 'Mắt cao', actualMeaning: 'Kén chọn, tiêu chuẩn cao', example: '그녀는 눈이 높아서 남자친구가 없어요.', exampleTranslation: 'Cô ấy kén chọn nên không có bạn trai.', equivalent: 'Kén cá chọn canh' },
    { id: 'ko-2', phrase: '발이 넓다', reading: 'bari neolda', literalMeaning: 'Chân rộng', actualMeaning: 'Quen biết nhiều người, quan hệ rộng', example: '그는 발이 넓어서 어디서든 아는 사람이 있어요.', exampleTranslation: 'Anh ấy quen biết rộng nên đâu cũng có người quen.', equivalent: 'Rộng quan hệ / Quen biết rộng' },
    { id: 'ko-3', phrase: '식은 죽 먹기', reading: 'sigeun juk meokgi', literalMeaning: 'Ăn cháo nguội', actualMeaning: 'Rất dễ dàng', example: '이 시험은 식은 죽 먹기예요.', exampleTranslation: 'Bài thi này dễ ợt.', equivalent: 'Dễ như ăn kẹo' },
    { id: 'ko-4', phrase: '귀가 얇다', reading: 'gwiga yalpda', literalMeaning: 'Tai mỏng', actualMeaning: 'Dễ bị ảnh hưởng bởi lời người khác', example: '그녀는 귀가 얇아서 쉽게 속아요.', exampleTranslation: 'Cô ấy dễ tin nên hay bị lừa.', equivalent: 'Nhẹ dạ cả tin' },
    { id: 'ko-5', phrase: '손이 크다', reading: 'soni keuda', literalMeaning: 'Tay to', actualMeaning: 'Hào phóng, làm gì cũng nhiều', example: '어머니는 손이 커서 음식을 많이 만들어요.', exampleTranslation: 'Mẹ tôi hào phóng nên nấu ăn rất nhiều.', equivalent: 'Rộng rãi / Hào phóng' },
    { id: 'ko-6', phrase: '입이 짧다', reading: 'ibi jjalpda', literalMeaning: 'Miệng ngắn', actualMeaning: 'Kén ăn, ăn ít', example: '아이가 입이 짧아서 걱정이에요.', exampleTranslation: 'Con bé kén ăn nên tôi lo lắng.', equivalent: 'Kén ăn / Ăn ít' },
    { id: 'ko-7', phrase: '꿩 먹고 알 먹고', reading: 'kkwong meokgo al meokgo', literalMeaning: 'Ăn gà lôi rồi ăn trứng', actualMeaning: 'Được cả hai lợi ích cùng lúc', example: '운동하면서 친구도 만나니 꿩 먹고 알 먹고예요.', exampleTranslation: 'Vừa tập thể dục vừa gặp bạn, được cả hai.', equivalent: 'Một công đôi việc' },
    { id: 'ko-8', phrase: '세 살 버릇 여든까지 간다', reading: 'se sal beoreut yeodeunkkaji ganda', literalMeaning: 'Thói quen 3 tuổi theo đến 80', actualMeaning: 'Thói quen từ nhỏ khó bỏ', example: '세 살 버릇 여든까지 간다고 어릴 때 교육이 중요해요.', exampleTranslation: 'Thói quen nhỏ theo suốt đời nên giáo dục từ bé rất quan trọng.', equivalent: 'Tre non dễ uốn' },
  ],
};

const languageTabs = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function IdiomsPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const currentIdioms = idioms[selectedLang] || [];

  return (
    <motion.div className="space-y-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div>
        <h1 className="text-2xl font-bold font-display">Thành ngữ & Tục ngữ</h1>
        <p className="text-muted-foreground mt-1">Học thành ngữ để nói tự nhiên như người bản ngữ</p>
      </div>

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

      <div className="space-y-3">
        {currentIdioms.map((idiom, index) => (
          <motion.div key={idiom.id} className="rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 overflow-hidden" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}>
            <button
              onClick={() => setExpandedId(expandedId === idiom.id ? null : idiom.id)}
              className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg">{idiom.phrase}</h3>
                  {selectedLang !== 'en' && (
                    <AudioPlayer text={idiom.phrase} language={selectedLang as SupportedLanguage} size="sm" />
                  )}
                </div>
                {idiom.reading && (
                  <p className="text-sm text-muted-foreground mt-0.5">{idiom.reading}</p>
                )}
                <p className="text-sm text-primary dark:text-primary-400 mt-1">{idiom.actualMeaning}</p>
              </div>
              <svg className={`w-5 h-5 text-muted-foreground transition-transform shrink-0 ml-3 ${expandedId === idiom.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedId === idiom.id && (
              <div className="px-5 pb-5 space-y-4 border-t border pt-4">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase mb-1">Nghĩa đen</p>
                    <p className="text-sm text-blue-800 dark:text-blue-300">{idiom.literalMeaning}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
                    <p className="text-xs font-medium text-green-600 dark:text-green-400 uppercase mb-1">Nghĩa thực</p>
                    <p className="text-sm text-green-800 dark:text-green-300">{idiom.actualMeaning}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Ví dụ</p>
                  <p className="font-medium text-sm">{idiom.example}</p>
                  <p className="text-xs text-muted-foreground mt-1">{idiom.exampleTranslation}</p>
                </div>

                {idiom.equivalent && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Tương đương tiếng Việt:</span>
                    <span className="text-sm font-medium text-primary">{idiom.equivalent}</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
