import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { paginate, errorResponse } from '../types/responses';

const router = Router();

const wordOfDayData: Record<string, Array<{ word: string; meaning: string; example: string; exampleMeaning: string; funFact: string }>> = {
  en: [
    { word: 'Serendipity', meaning: 'Sự tình cờ may mắn', example: 'Finding that book was pure serendipity.', exampleMeaning: 'Tìm được cuốn sách đó là sự tình cờ may mắn.', funFact: 'Từ này được tạo ra bởi Horace Walpole năm 1754, lấy cảm hứng từ truyện cổ tích Ba Hoàng Tử xứ Serendip.' },
    { word: 'Ephemeral', meaning: 'Phù du, ngắn ngủi', example: 'The beauty of cherry blossoms is ephemeral.', exampleMeaning: 'Vẻ đẹp của hoa anh đào thật phù du.', funFact: 'Từ gốc Hy Lạp "ephemeros" nghĩa là "chỉ kéo dài một ngày".' },
    { word: 'Resilience', meaning: 'Sự kiên cường', example: 'Her resilience helped her overcome many challenges.', exampleMeaning: 'Sự kiên cường giúp cô ấy vượt qua nhiều thử thách.', funFact: 'Trong vật lý, resilience là khả năng vật liệu trở lại hình dạng ban đầu sau khi bị biến dạng.' },
    { word: 'Wanderlust', meaning: 'Khao khát đi du lịch', example: 'His wanderlust took him to 50 countries.', exampleMeaning: 'Khao khát du lịch đưa anh ấy đến 50 quốc gia.', funFact: 'Từ này có nguồn gốc từ tiếng Đức: "wandern" (đi bộ) + "Lust" (ham muốn).' },
    { word: 'Eloquent', meaning: 'Hùng biện, lưu loát', example: 'She gave an eloquent speech.', exampleMeaning: 'Cô ấy đã có một bài phát biểu hùng biện.', funFact: 'Từ Latin "eloquens" - nói ra một cách rõ ràng và thuyết phục.' },
    { word: 'Nostalgia', meaning: 'Nỗi nhớ quá khứ', example: 'The old song filled me with nostalgia.', exampleMeaning: 'Bài hát cũ khiến tôi tràn ngập nỗi nhớ.', funFact: 'Ban đầu "nostalgia" được coi là một bệnh lý y khoa vào thế kỷ 17.' },
    { word: 'Perseverance', meaning: 'Sự kiên trì', example: 'Success requires perseverance.', exampleMeaning: 'Thành công đòi hỏi sự kiên trì.', funFact: 'NASA đặt tên rover trên Sao Hỏa là "Perseverance" để tôn vinh tinh thần không bỏ cuộc.' },
  ],
  ja: [
    { word: '木漏れ日 (こもれび)', meaning: 'Ánh nắng xuyên qua lá cây', example: '公園で木漏れ日を楽しみました。', exampleMeaning: 'Tôi thưởng thức ánh nắng xuyên lá ở công viên.', funFact: 'Đây là từ chỉ có trong tiếng Nhật, không có từ tương đương chính xác trong tiếng Anh.' },
    { word: '一期一会 (いちごいちえ)', meaning: 'Mỗi cuộc gặp gỡ chỉ xảy ra một lần', example: '一期一会の精神で生きています。', exampleMeaning: 'Tôi sống với tinh thần trân trọng mỗi khoảnh khắc.', funFact: 'Khái niệm này bắt nguồn từ trà đạo Nhật Bản thế kỷ 16.' },
    { word: '侘寂 (わびさび)', meaning: 'Vẻ đẹp của sự không hoàn hảo', example: '侘寂は日本の美学です。', exampleMeaning: 'Wabi-sabi là mỹ học Nhật Bản.', funFact: 'Wabi-sabi chịu ảnh hưởng từ Phật giáo Thiền tông, nhấn mạnh sự vô thường.' },
    { word: '頑張る (がんばる)', meaning: 'Cố gắng hết sức', example: '試験のために頑張ります。', exampleMeaning: 'Tôi sẽ cố gắng hết sức cho kỳ thi.', funFact: 'Người Nhật dùng "頑張って" như lời động viên phổ biến nhất trong cuộc sống hàng ngày.' },
    { word: '懐かしい (なつかしい)', meaning: 'Cảm giác nhớ nhung ấm áp', example: 'この歌は懐かしいです。', exampleMeaning: 'Bài hát này gợi nhớ quá khứ.', funFact: 'Khác với "nostalgia" mang tính buồn, 懐かしい thường mang cảm xúc ấm áp, tích cực.' },
    { word: '生きがい (いきがい)', meaning: 'Lý do để sống/mục đích sống', example: '仕事が私の生きがいです。', exampleMeaning: 'Công việc là lẽ sống của tôi.', funFact: 'Ikigai là giao điểm của: điều bạn yêu, điều bạn giỏi, điều thế giới cần, và điều bạn được trả tiền.' },
    { word: '勿体無い (もったいない)', meaning: 'Lãng phí/tiếc', example: '食べ物を捨てるのは勿体無いです。', exampleMeaning: 'Vứt thức ăn thật lãng phí.', funFact: 'Wangari Maathai (Nobel Hòa bình 2004) đã quảng bá từ này ra thế giới như triết lý bảo vệ môi trường.' },
  ],
  zh: [
    { word: '缘分 (yuánfèn)', meaning: 'Duyên phận', example: '我们的相遇是缘分。', exampleMeaning: 'Cuộc gặp gỡ của chúng ta là duyên phận.', funFact: 'Khái niệm này bắt nguồn từ Phật giáo, tin rằng mọi mối quan hệ đều được định sẵn.' },
    { word: '加油 (jiāyóu)', meaning: 'Cố lên! Thêm dầu!', example: '加油！你可以的！', exampleMeaning: 'Cố lên! Bạn làm được!', funFact: 'Nghĩa gốc là "thêm dầu" (cho đèn), sau trở thành lời cổ vũ phổ biến nhất Trung Quốc.' },
    { word: '面子 (miànzi)', meaning: 'Thể diện', example: '不要让他丢面子。', exampleMeaning: 'Đừng làm anh ấy mất mặt.', funFact: 'Khái niệm "face" trong tiếng Anh thực ra được mượn từ văn hóa Trung Quốc.' },
    { word: '功夫 (gōngfu)', meaning: 'Công phu/kỹ năng qua luyện tập', example: '学中文需要下功夫。', exampleMeaning: 'Học tiếng Trung cần bỏ công sức.', funFact: '功夫 không chỉ là võ thuật - nghĩa gốc là "thời gian và công sức bỏ ra để thành thạo một kỹ năng".' },
    { word: '幸福 (xìngfú)', meaning: 'Hạnh phúc', example: '我很幸福。', exampleMeaning: 'Tôi rất hạnh phúc.', funFact: '幸 (may mắn) + 福 (phúc lộc) = hạnh phúc đến từ sự may mắn và phúc đức.' },
    { word: '知己 (zhījǐ)', meaning: 'Tri kỷ', example: '他是我的知己。', exampleMeaning: 'Anh ấy là tri kỷ của tôi.', funFact: 'Từ câu chuyện Bá Nha - Tử Kỳ: người hiểu mình như hiểu chính bản thân.' },
    { word: '拼搏 (pīnbó)', meaning: 'Phấn đấu hết mình', example: '为了梦想而拼搏。', exampleMeaning: 'Phấn đấu vì ước mơ.', funFact: '拼 (ghép/liều) + 搏 (đấu) thể hiện tinh thần chiến đấu không ngừng nghỉ.' },
  ],
  ko: [
    { word: '정 (jeong)', meaning: 'Tình cảm sâu đậm', example: '정이 많은 사람이에요.', exampleMeaning: 'Đó là người giàu tình cảm.', funFact: '정 là khái niệm độc đáo của Hàn Quốc - sự gắn bó tình cảm sâu sắc không thể dịch chính xác.' },
    { word: '화이팅 (hwaiting)', meaning: 'Cố lên!', example: '시험 화이팅!', exampleMeaning: 'Thi cử cố lên!', funFact: 'Mượn từ "fighting" tiếng Anh nhưng người bản ngữ Anh không dùng theo cách này.' },
    { word: '눈치 (nunchi)', meaning: 'Khả năng đọc không khí', example: '눈치가 빨라요.', exampleMeaning: 'Anh ấy rất nhanh nhạy.', funFact: 'Nunchi được coi là "siêu năng lực" xã hội của người Hàn, dạy từ nhỏ.' },
    { word: '한 (han)', meaning: 'Nỗi hận/buồn sâu thẳm', example: '한이 서린 노래예요.', exampleMeaning: 'Đó là bài hát chứa đựng nỗi buồn sâu thẳm.', funFact: 'Han là cảm xúc tập thể của dân tộc Hàn, ảnh hưởng đến nghệ thuật và âm nhạc.' },
    { word: '대박 (daebak)', meaning: 'Tuyệt vời/Jackpot', example: '대박! 정말 맛있어요!', exampleMeaning: 'Tuyệt vời! Ngon thật!', funFact: 'Nghĩa gốc là "trúng lớn" (đánh bạc), nay là từ cảm thán phổ biến nhất của giới trẻ Hàn.' },
    { word: '효도 (hyodo)', meaning: 'Hiếu thảo', example: '부모님께 효도해요.', exampleMeaning: 'Tôi hiếu thảo với cha mẹ.', funFact: 'Hiếu thảo là giá trị cốt lõi trong văn hóa Hàn, ảnh hưởng từ Nho giáo.' },
    { word: '열정 (yeoljeong)', meaning: 'Nhiệt huyết', example: '열정을 가지고 일해요.', exampleMeaning: 'Tôi làm việc với nhiệt huyết.', funFact: '열 (nóng) + 정 (tình cảm) = tình cảm nóng bỏng, thể hiện tinh thần "ppalli ppalli" của Hàn.' },
  ],
};

router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const lang = (req.query.lang as string) || 'en';
    const words = wordOfDayData[lang] || wordOfDayData['en'];

    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const todayWord = words[dayOfYear % words.length];

    res.json({
      ...todayWord,
      language: lang,
      date: new Date().toISOString().split('T')[0],
    });
  } catch (error) {
    console.error('Word of day error:', error);
    res.status(500).json(errorResponse('Không thể tải từ trong ngày', 'INTERNAL_ERROR'));
  }
});

router.get('/history', authenticate, async (req: Request, res: Response) => {
  try {
    const lang = (req.query.lang as string) || 'en';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const words = wordOfDayData[lang] || wordOfDayData['en'];

    const today = new Date();
    const history = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
      const word = words[dayOfYear % words.length];
      history.push({
        ...word,
        date: date.toISOString().split('T')[0],
      });
    }

    res.json(paginate(history, page, limit));
  } catch (error) {
    console.error('Word history error:', error);
    res.status(500).json(errorResponse('Không thể tải lịch sử từ vựng', 'INTERNAL_ERROR'));
  }
});

export default router;
