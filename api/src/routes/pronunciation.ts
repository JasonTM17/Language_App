import { Router, Response } from 'express';
import { z } from 'zod';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

interface PhonemeResult {
  phoneme: string;
  score: number;
  feedback: string;
}

interface PronunciationExercise {
  id: string;
  word: string;
  phonetic: string;
  meaning: string;
  difficulty: 'easy' | 'medium' | 'hard';
  commonMistakes: string[];
  tips: string;
}

const vietnameseLearnerMistakes: Record<string, { pattern: string; tip: string }[]> = {
  en: [
    { pattern: 'th', tip: 'Đặt lưỡi giữa hai hàm răng, thổi hơi nhẹ. Không phát âm như "d" hay "t".' },
    { pattern: 'r', tip: 'Cuộn lưỡi ra sau, không chạm vòm miệng. Khác với "r" tiếng Việt.' },
    { pattern: 'l', tip: 'Đầu lưỡi chạm lợi trên, hơi thoát hai bên lưỡi.' },
    { pattern: 'sh', tip: 'Môi hơi tròn, lưỡi nâng lên nhưng không chạm vòm miệng.' },
    { pattern: 'z', tip: 'Giống "s" nhưng có rung dây thanh. Đặt tay lên cổ để cảm nhận.' },
    { pattern: 'v', tip: 'Răng trên chạm môi dưới, có rung dây thanh. Khác "v" tiếng Việt.' },
    { pattern: 'final consonant', tip: 'Phát âm rõ phụ âm cuối. Người Việt hay nuốt âm cuối.' },
    { pattern: 'stress', tip: 'Nhấn mạnh âm tiết chính. Tiếng Anh có trọng âm, tiếng Việt không.' },
  ],
  ja: [
    { pattern: 'long vowel', tip: 'Nguyên âm dài (ō, ū) phải kéo dài gấp đôi. Ảnh hưởng nghĩa từ.' },
    { pattern: 'tsu', tip: 'Âm "tsu" (つ) khác "su". Đầu lưỡi chạm lợi rồi thả ra nhanh.' },
    { pattern: 'r/l', tip: 'Âm "r" tiếng Nhật nằm giữa "r" và "l". Đầu lưỡi chạm nhẹ lợi.' },
    { pattern: 'double consonant', tip: 'Phụ âm kép (っ) cần ngừng hơi một nhịp trước khi phát âm.' },
    { pattern: 'pitch accent', tip: 'Tiếng Nhật có cao độ (pitch), không phải trọng âm như tiếng Anh.' },
  ],
  zh: [
    { pattern: 'tones', tip: 'Thanh điệu quyết định nghĩa. Luyện từng thanh riêng trước khi ghép từ.' },
    { pattern: 'zh/ch/sh', tip: 'Cuộn lưỡi ra sau (retroflex). Khác với z/c/s (không cuộn lưỡi).' },
    { pattern: 'ü', tip: 'Môi tròn như "u" nhưng lưỡi ở vị trí "i". Người Việt hay nhầm với "u".' },
    { pattern: 'initial r', tip: 'Âm "r" đầu từ tiếng Trung giống "zh" nhưng xát hơn, có rung.' },
    { pattern: 'tone sandhi', tip: 'Hai thanh 3 liên tiếp → thanh đầu đổi thành thanh 2. Quy tắc bắt buộc.' },
  ],
  ko: [
    { pattern: 'aspirated', tip: 'Phân biệt ㄱ/ㅋ/ㄲ: bình thường/bật hơi/căng. Đặt tay trước miệng cảm nhận.' },
    { pattern: 'eo/eu', tip: 'ㅓ (eo) khác ㅡ (eu). "eo" miệng mở hơn, "eu" môi dẹt ngang.' },
    { pattern: 'batchim', tip: 'Phụ âm cuối (받침) không bật hơi, chỉ đặt vị trí lưỡi/môi.' },
    { pattern: 'double batchim', tip: 'Hai phụ âm cuối: chỉ phát âm một, âm còn lại chuyển sang âm tiết sau.' },
    { pattern: 'linking', tip: 'Phụ âm cuối nối sang nguyên âm đầu âm tiết sau (연음).' },
  ],
};

const pronunciationExercises: Record<string, PronunciationExercise[]> = {
  en: [
    { id: 'en-p1', word: 'pronunciation', phonetic: '/prəˌnʌnsiˈeɪʃən/', meaning: 'phát âm', difficulty: 'hard', commonMistakes: ['stress', 'final consonant'], tips: 'Trọng âm ở âm tiết thứ 4: pro-nun-ci-A-tion' },
    { id: 'en-p2', word: 'comfortable', phonetic: '/ˈkʌmftəbəl/', meaning: 'thoải mái', difficulty: 'medium', commonMistakes: ['stress', 'final consonant'], tips: 'Chỉ 3 âm tiết: COMF-ter-ble, không phải com-FOR-ta-ble' },
    { id: 'en-p3', word: 'schedule', phonetic: '/ˈʃedjuːl/', meaning: 'lịch trình', difficulty: 'medium', commonMistakes: ['sh'], tips: 'Bắt đầu bằng "sh" /ʃ/, không phải "sk"' },
    { id: 'en-p4', word: 'vocabulary', phonetic: '/vəˈkæbjʊləri/', meaning: 'từ vựng', difficulty: 'medium', commonMistakes: ['v', 'stress'], tips: 'Trọng âm ở âm tiết 2: vo-CAB-u-la-ry' },
    { id: 'en-p5', word: 'environment', phonetic: '/ɪnˈvaɪrənmənt/', meaning: 'môi trường', difficulty: 'medium', commonMistakes: ['v', 'r', 'final consonant'], tips: 'Chú ý âm "v" và "r" liên tiếp: en-VI-ron-ment' },
    { id: 'en-p6', word: 'through', phonetic: '/θruː/', meaning: 'qua, xuyên qua', difficulty: 'hard', commonMistakes: ['th', 'r'], tips: 'Lưỡi giữa răng cho "th", sau đó cuộn lưỡi cho "r"' },
    { id: 'en-p7', word: 'clothes', phonetic: '/kloʊðz/', meaning: 'quần áo', difficulty: 'hard', commonMistakes: ['th', 'z', 'final consonant'], tips: 'Phát âm gần như "cloze", âm "th" rất nhẹ' },
    { id: 'en-p8', word: 'world', phonetic: '/wɜːrld/', meaning: 'thế giới', difficulty: 'hard', commonMistakes: ['r', 'l', 'final consonant'], tips: 'Cuộn lưỡi cho "r", rồi chạm lợi cho "l", kết thúc bằng "d"' },
    { id: 'en-p9', word: 'think', phonetic: '/θɪŋk/', meaning: 'nghĩ', difficulty: 'easy', commonMistakes: ['th'], tips: 'Đặt lưỡi giữa răng, thổi hơi. Không phải "tink" hay "fink"' },
    { id: 'en-p10', word: 'zero', phonetic: '/ˈzɪəroʊ/', meaning: 'số không', difficulty: 'easy', commonMistakes: ['z'], tips: 'Âm "z" có rung dây thanh, khác "s". Đặt tay lên cổ để kiểm tra.' },
    { id: 'en-p11', word: 'vegetable', phonetic: '/ˈvedʒtəbəl/', meaning: 'rau củ', difficulty: 'medium', commonMistakes: ['v', 'final consonant'], tips: 'Chỉ 3 âm tiết: VEJ-tuh-bul' },
    { id: 'en-p12', word: 'literature', phonetic: '/ˈlɪtrətʃər/', meaning: 'văn học', difficulty: 'hard', commonMistakes: ['l', 'r', 'stress'], tips: 'Trọng âm đầu: LIT-ruh-chur' },
  ],
  ja: [
    { id: 'ja-p1', word: 'ありがとうございます', phonetic: 'arigatou gozaimasu', meaning: 'cảm ơn', difficulty: 'easy', commonMistakes: ['long vowel'], tips: 'Kéo dài "ou" trong "arigatou" và "gozaimasu"' },
    { id: 'ja-p2', word: 'すみません', phonetic: 'sumimasen', meaning: 'xin lỗi', difficulty: 'easy', commonMistakes: ['r/l'], tips: 'Phát âm đều các âm tiết, không nhấn mạnh âm nào' },
    { id: 'ja-p3', word: '図書館', phonetic: 'toshokan', meaning: 'thư viện', difficulty: 'medium', commonMistakes: ['long vowel', 'pitch accent'], tips: 'Cao độ: to-SHO-kan (âm giữa cao hơn)' },
    { id: 'ja-p4', word: '経済', phonetic: 'keizai', meaning: 'kinh tế', difficulty: 'hard', commonMistakes: ['long vowel', 'pitch accent'], tips: 'Hai nguyên âm kép: "ei" và "ai" phát âm rõ ràng' },
    { id: 'ja-p5', word: '大学', phonetic: 'daigaku', meaning: 'đại học', difficulty: 'easy', commonMistakes: ['pitch accent'], tips: 'Cao độ: dai-GA-ku (âm giữa cao)' },
    { id: 'ja-p6', word: 'きっぷ', phonetic: 'kippu', meaning: 'vé', difficulty: 'medium', commonMistakes: ['double consonant'], tips: 'Ngừng hơi trước "pp": ki-PPU' },
    { id: 'ja-p7', word: 'つくえ', phonetic: 'tsukue', meaning: 'bàn', difficulty: 'medium', commonMistakes: ['tsu'], tips: 'Âm "tsu" đầu lưỡi chạm lợi rồi thả nhanh' },
    { id: 'ja-p8', word: 'りょこう', phonetic: 'ryokou', meaning: 'du lịch', difficulty: 'hard', commonMistakes: ['r/l', 'long vowel'], tips: '"ry" đầu lưỡi chạm nhẹ lợi, kéo dài "ou" cuối' },
  ],
  zh: [
    { id: 'zh-p1', word: '谢谢', phonetic: 'xièxie', meaning: 'cảm ơn', difficulty: 'easy', commonMistakes: ['tones'], tips: 'Thanh 4 + thanh nhẹ: xuống mạnh rồi nhẹ' },
    { id: 'zh-p2', word: '对不起', phonetic: 'duìbuqǐ', meaning: 'xin lỗi', difficulty: 'easy', commonMistakes: ['tones'], tips: 'Thanh 4-0-3: xuống-nhẹ-xuống rồi lên' },
    { id: 'zh-p3', word: '图书馆', phonetic: 'túshūguǎn', meaning: 'thư viện', difficulty: 'medium', commonMistakes: ['zh/ch/sh', 'ü'], tips: '"shū" lưỡi cuộn ra sau, "guǎn" thanh 3 xuống rồi lên' },
    { id: 'zh-p4', word: '经济', phonetic: 'jīngjì', meaning: 'kinh tế', difficulty: 'medium', commonMistakes: ['tones', 'initial r'], tips: 'Thanh 1 + thanh 4: cao đều rồi xuống mạnh' },
    { id: 'zh-p5', word: '大学', phonetic: 'dàxué', meaning: 'đại học', difficulty: 'easy', commonMistakes: ['tones'], tips: 'Thanh 4 + thanh 2: xuống mạnh rồi lên' },
    { id: 'zh-p6', word: '女人', phonetic: 'nǚrén', meaning: 'phụ nữ', difficulty: 'hard', commonMistakes: ['ü', 'initial r'], tips: '"nǚ" môi tròn + lưỡi vị trí "i", "rén" xát có rung' },
    { id: 'zh-p7', word: '吃饭', phonetic: 'chīfàn', meaning: 'ăn cơm', difficulty: 'medium', commonMistakes: ['zh/ch/sh'], tips: '"chī" cuộn lưỡi + bật hơi mạnh' },
    { id: 'zh-p8', word: '你好', phonetic: 'nǐhǎo', meaning: 'xin chào', difficulty: 'easy', commonMistakes: ['tones', 'tone sandhi'], tips: 'Hai thanh 3 → thanh 2 + thanh 3: "níhǎo"' },
  ],
  ko: [
    { id: 'ko-p1', word: '감사합니다', phonetic: 'gamsahamnida', meaning: 'cảm ơn', difficulty: 'easy', commonMistakes: ['batchim'], tips: '"m" cuối "gam" chỉ ngậm môi, không bật hơi' },
    { id: 'ko-p2', word: '죄송합니다', phonetic: 'joesonghamnida', meaning: 'xin lỗi', difficulty: 'medium', commonMistakes: ['batchim', 'aspirated'], tips: '"ng" cuối "song" giữ trong mũi, "h" bật hơi nhẹ' },
    { id: 'ko-p3', word: '도서관', phonetic: 'doseogwan', meaning: 'thư viện', difficulty: 'easy', commonMistakes: ['eo/eu'], tips: '"eo" (ㅓ) miệng mở vừa, không phải "o" tròn' },
    { id: 'ko-p4', word: '경제', phonetic: 'gyeongje', meaning: 'kinh tế', difficulty: 'medium', commonMistakes: ['batchim', 'aspirated'], tips: '"ng" cuối "gyeong" giữ trong mũi, "j" không bật hơi' },
    { id: 'ko-p5', word: '대학교', phonetic: 'daehakgyo', meaning: 'đại học', difficulty: 'easy', commonMistakes: ['aspirated'], tips: '"h" trong "hak" bật hơi, "gy" không bật hơi' },
    { id: 'ko-p6', word: '까페', phonetic: 'kkape', meaning: 'quán cà phê', difficulty: 'medium', commonMistakes: ['aspirated'], tips: '"kk" (ㄲ) căng cổ họng, không bật hơi, mạnh hơn "k"' },
    { id: 'ko-p7', word: '먹었어요', phonetic: 'meogeosseoyo', meaning: 'đã ăn', difficulty: 'hard', commonMistakes: ['eo/eu', 'linking', 'double batchim'], tips: '"ㄱ" cuối "먹" nối sang "었": meo-geo-sseo-yo' },
    { id: 'ko-p8', word: '읽다', phonetic: 'ikda', meaning: 'đọc', difficulty: 'hard', commonMistakes: ['double batchim'], tips: 'Hai batchim "ㄹㄱ": chỉ phát âm "ㄱ" → "ik-da"' },
  ],
};

const attemptSchema = z.object({
  exerciseId: z.string(),
  audioScore: z.number().min(0).max(100).optional(),
  phonemes: z.array(z.object({
    phoneme: z.string(),
    score: z.number().min(0).max(100),
  })).optional(),
  duration: z.number().optional(),
});

function analyzePhonemes(exercise: PronunciationExercise, lang: string, clientPhonemes?: { phoneme: string; score: number }[]): PhonemeResult[] {
  if (clientPhonemes && clientPhonemes.length > 0) {
    return clientPhonemes.map(p => {
      const mistakeInfo = vietnameseLearnerMistakes[lang]?.find(m => p.phoneme.includes(m.pattern));
      let feedback: string;
      if (p.score >= 90) feedback = 'Xuất sắc!';
      else if (p.score >= 70) feedback = 'Khá tốt.';
      else if (p.score >= 50) feedback = mistakeInfo?.tip || 'Cần luyện thêm.';
      else feedback = mistakeInfo?.tip || 'Hãy nghe lại mẫu và thử lại.';
      return { phoneme: p.phoneme, score: p.score, feedback };
    });
  }

  const results: PhonemeResult[] = [];
  const mistakes = vietnameseLearnerMistakes[lang] || [];

  for (const mistake of exercise.commonMistakes) {
    const info = mistakes.find(m => m.pattern === mistake);
    if (info) {
      results.push({
        phoneme: info.pattern,
        score: 0,
        feedback: info.tip,
      });
    }
  }

  return results;
}

function calculateOverallScore(phonemeResults: PhonemeResult[], clientScore?: number): number {
  if (clientScore !== undefined) return clientScore;
  if (phonemeResults.length === 0) return 0;
  const avg = phonemeResults.reduce((sum, p) => sum + p.score, 0) / phonemeResults.length;
  return Math.round(avg);
}

function generateFeedback(score: number, exercise: PronunciationExercise, lang: string): string {
  if (score >= 90) return 'Tuyệt vời! Phát âm rất chuẩn. Tiếp tục giữ vững nhé!';
  if (score >= 75) return `Khá tốt! Chú ý thêm: ${exercise.tips}`;
  if (score >= 50) {
    const mistakes = vietnameseLearnerMistakes[lang] || [];
    const relevantTip = mistakes.find(m => exercise.commonMistakes.includes(m.pattern));
    return `Cần cải thiện. ${relevantTip?.tip || exercise.tips}`;
  }
  return `Hãy luyện tập thêm. Mẹo: ${exercise.tips}`;
}

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  const { lang = 'en', difficulty } = req.query;
  const langCode = String(lang);

  let exercises = pronunciationExercises[langCode] || pronunciationExercises['en'];

  if (difficulty && typeof difficulty === 'string') {
    exercises = exercises.filter(e => e.difficulty === difficulty);
  }

  const tips = vietnameseLearnerMistakes[langCode] || [];

  res.json({ exercises, language: langCode, tips });
});

router.get('/tips/:lang', authenticate, async (req: AuthRequest, res: Response) => {
  const { lang } = req.params;
  const tips = vietnameseLearnerMistakes[lang] || vietnameseLearnerMistakes['en'];
  res.json({ tips, language: lang });
});

router.post('/attempt', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { exerciseId, audioScore, phonemes, duration } = attemptSchema.parse(req.body);

    const lang = exerciseId.split('-')[0];
    const exercises = pronunciationExercises[lang] || pronunciationExercises['en'];
    const exercise = exercises.find(e => e.id === exerciseId);

    if (!exercise) {
      return res.status(404).json({ error: 'Bài tập không tồn tại' });
    }

    const phonemeResults = analyzePhonemes(exercise, lang, phonemes);
    const overallScore = calculateOverallScore(phonemeResults, audioScore);
    const feedback = generateFeedback(overallScore, exercise, lang);

    const xpEarned = Math.round(overallScore / 10);
    const passed = overallScore >= 60;

    const weakPhonemes = phonemeResults
      .filter(p => p.score < 70)
      .map(p => ({ phoneme: p.phoneme, tip: p.feedback }));

    const improvementAreas = exercise.commonMistakes.map(mistake => {
      const info = (vietnameseLearnerMistakes[lang] || []).find(m => m.pattern === mistake);
      return { area: mistake, tip: info?.tip || '' };
    });

    res.json({
      result: {
        exerciseId,
        word: exercise.word,
        phonetic: exercise.phonetic,
        score: overallScore,
        passed,
        feedback,
        phonemeAnalysis: phonemeResults,
        weakPhonemes,
        improvementAreas,
        xpEarned,
        duration: duration || 0,
        nextRecommendation: passed
          ? 'Thử từ khó hơn hoặc chuyển sang bài mới.'
          : `Luyện lại từ "${exercise.word}". ${exercise.tips}`,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Lỗi khi xử lý bài phát âm' });
  }
});

router.get('/progress', authenticate, async (req: AuthRequest, res: Response) => {
  const { lang = 'en' } = req.query;
  const langCode = String(lang);
  const exercises = pronunciationExercises[langCode] || pronunciationExercises['en'];

  res.json({
    language: langCode,
    totalExercises: exercises.length,
    commonMistakesForVietnamese: vietnameseLearnerMistakes[langCode] || [],
    exercisesByDifficulty: {
      easy: exercises.filter(e => e.difficulty === 'easy').length,
      medium: exercises.filter(e => e.difficulty === 'medium').length,
      hard: exercises.filter(e => e.difficulty === 'hard').length,
    },
  });
});

export default router;
