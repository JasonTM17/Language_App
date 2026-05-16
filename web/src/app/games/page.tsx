'use client';

import { useRouter } from 'next/navigation';
import { Shuffle, Zap, Wrench, PenLine, Globe, Link2, TextCursorInput, MessageCircle, type LucideIcon } from 'lucide-react';

interface MiniGame {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  icon: LucideIcon;
  href: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  color: string;
}

const miniGames: MiniGame[] = [
  { id: 'word-scramble', title: 'Word Scramble', titleVi: 'Xáo chữ', description: 'Sắp xếp lại chữ cái thành từ đúng', icon: Shuffle, href: '/word-scramble', difficulty: 'easy', xpReward: 10, color: 'from-blue-500 to-blue-600' },
  { id: 'timed-challenge', title: 'Speed Quiz', titleVi: 'Quiz tốc độ', description: 'Trả lời nhanh nhất có thể trong 60 giây', icon: Zap, href: '/timed-challenge', difficulty: 'medium', xpReward: 25, color: 'from-yellow-500 to-orange-500' },
  { id: 'grammar-fix', title: 'Grammar Fix', titleVi: 'Sửa ngữ pháp', description: 'Tìm và sửa lỗi sai trong câu', icon: Wrench, href: '/grammar-correction', difficulty: 'medium', xpReward: 20, color: 'from-green-500 to-green-600' },
  { id: 'dictation', title: 'Dictation', titleVi: 'Nghe chép', description: 'Nghe và gõ lại từ/câu chính xác', icon: PenLine, href: '/dictation', difficulty: 'hard', xpReward: 30, color: 'from-purple-500 to-purple-600' },
  { id: 'translation', title: 'Translation', titleVi: 'Dịch thuật', description: 'Dịch câu giữa tiếng Việt và ngoại ngữ', icon: Globe, href: '/translation', difficulty: 'medium', xpReward: 20, color: 'from-teal-500 to-teal-600' },
  { id: 'matching', title: 'Matching', titleVi: 'Nối từ', description: 'Nối từ với nghĩa tương ứng', icon: Link2, href: '/matching', difficulty: 'easy', xpReward: 10, color: 'from-pink-500 to-pink-600' },
  { id: 'fill-blank', title: 'Fill in Blank', titleVi: 'Điền từ', description: 'Điền từ còn thiếu vào câu', icon: TextCursorInput, href: '/fill-blank', difficulty: 'medium', xpReward: 15, color: 'from-indigo-500 to-indigo-600' },
  { id: 'conversation', title: 'Conversation', titleVi: 'Hội thoại', description: 'Luyện hội thoại theo tình huống', icon: MessageCircle, href: '/conversation', difficulty: 'hard', xpReward: 35, color: 'from-red-500 to-red-600' },
];

const difficultyLabels = { easy: 'Dễ', medium: 'Trung bình', hard: 'Khó' };
const difficultyColors = { easy: 'text-green-600 bg-green-50', medium: 'text-orange-600 bg-orange-50', hard: 'text-red-600 bg-red-50' };

export default function GamesPage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Mini Games</h1>
        <p className="text-muted-foreground mt-1">Học mà chơi, chơi mà học</p>
      </div>

      {/* Daily challenge banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-700 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-80 uppercase tracking-wide">Thử thách hôm nay</p>
            <p className="text-lg font-bold mt-1">Speed Quiz: Đạt 15 điểm</p>
            <p className="text-sm opacity-80 mt-0.5">Phần thưởng: +50 XP, +10 💎</p>
          </div>
          <button
            onClick={() => router.push('/timed-challenge')}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-all"
          >
            Chơi ngay
          </button>
        </div>
      </div>

      {/* Games grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {miniGames.map((game) => (
          <button
            key={game.id}
            onClick={() => router.push(game.href)}
            className="p-5 rounded-2xl bg-card border border text-left hover:scale-[1.02] transition-all hover:shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center shadow-sm`}>
                <game.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{game.titleVi}</h3>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${difficultyColors[game.difficulty]}`}>
                    {difficultyLabels[game.difficulty]}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{game.description}</p>
                <p className="text-xs text-primary font-medium mt-2">+{game.xpReward} XP</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="p-4 rounded-xl bg-muted/50 border border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-primary">47</p>
              <p className="text-xs text-muted-foreground">Games chơi</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-green-600">82%</p>
              <p className="text-xs text-muted-foreground">Tỷ lệ thắng</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-orange-600">15</p>
              <p className="text-xs text-muted-foreground">Combo cao nhất</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
