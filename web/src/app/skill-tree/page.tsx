'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Skill {
  id: string;
  title: string;
  titleVi: string;
  icon: string;
  lessonsTotal: number;
  lessonsCompleted: number;
  locked: boolean;
  level: number;
  maxLevel: number;
  xpReward: number;
}

interface SkillPath {
  language: string;
  levelName: string;
  skills: Skill[];
}

const skillPaths: Record<string, SkillPath[]> = {
  en: [
    {
      language: 'English',
      levelName: 'Beginner',
      skills: [
        { id: 'en-greetings', title: 'Greetings', titleVi: 'Chào hỏi', icon: '👋', lessonsTotal: 5, lessonsCompleted: 5, locked: false, level: 3, maxLevel: 5, xpReward: 10 },
        { id: 'en-numbers', title: 'Numbers', titleVi: 'Số đếm', icon: '🔢', lessonsTotal: 5, lessonsCompleted: 4, locked: false, level: 2, maxLevel: 5, xpReward: 10 },
        { id: 'en-food', title: 'Food & Drink', titleVi: 'Đồ ăn & Thức uống', icon: '🍕', lessonsTotal: 5, lessonsCompleted: 3, locked: false, level: 2, maxLevel: 5, xpReward: 10 },
        { id: 'en-family', title: 'Family', titleVi: 'Gia đình', icon: '👨‍👩‍👧', lessonsTotal: 5, lessonsCompleted: 1, locked: false, level: 1, maxLevel: 5, xpReward: 10 },
        { id: 'en-shopping', title: 'Shopping', titleVi: 'Mua sắm', icon: '🛒', lessonsTotal: 5, lessonsCompleted: 0, locked: false, level: 0, maxLevel: 5, xpReward: 10 },
        { id: 'en-travel', title: 'Travel', titleVi: 'Du lịch', icon: '✈️', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
        { id: 'en-health', title: 'Health', titleVi: 'Sức khỏe', icon: '🏥', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
        { id: 'en-hobbies', title: 'Hobbies', titleVi: 'Sở thích', icon: '🎨', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
        { id: 'en-clothing', title: 'Clothing', titleVi: 'Quần áo', icon: '👕', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
        { id: 'en-weather', title: 'Weather', titleVi: 'Thời tiết', icon: '🌤️', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
      ],
    },
    {
      language: 'English',
      levelName: 'Elementary',
      skills: [
        { id: 'en-transport', title: 'Transport', titleVi: 'Giao thông', icon: '🚌', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 20 },
        { id: 'en-technology', title: 'Technology', titleVi: 'Công nghệ', icon: '💻', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 20 },
        { id: 'en-emotions', title: 'Emotions', titleVi: 'Cảm xúc', icon: '😊', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 20 },
        { id: 'en-colors', title: 'Colors', titleVi: 'Màu sắc', icon: '🎨', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 20 },
        { id: 'en-animals', title: 'Animals', titleVi: 'Động vật', icon: '🐾', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 20 },
      ],
    },
  ],
  ja: [
    {
      language: 'Japanese',
      levelName: 'Beginner',
      skills: [
        { id: 'ja-greetings', title: 'あいさつ', titleVi: 'Chào hỏi', icon: '🙇', lessonsTotal: 5, lessonsCompleted: 3, locked: false, level: 2, maxLevel: 5, xpReward: 10 },
        { id: 'ja-numbers', title: 'すうじ', titleVi: 'Số đếm', icon: '🔢', lessonsTotal: 5, lessonsCompleted: 2, locked: false, level: 1, maxLevel: 5, xpReward: 10 },
        { id: 'ja-food', title: 'たべもの', titleVi: 'Đồ ăn', icon: '🍣', lessonsTotal: 5, lessonsCompleted: 0, locked: false, level: 0, maxLevel: 5, xpReward: 10 },
        { id: 'ja-travel', title: 'りょこう', titleVi: 'Du lịch', icon: '🗾', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
        { id: 'ja-daily', title: 'にちじょう', titleVi: 'Hàng ngày', icon: '📅', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
        { id: 'ja-shopping', title: 'かいもの', titleVi: 'Mua sắm', icon: '🛍️', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
        { id: 'ja-family', title: 'かぞく', titleVi: 'Gia đình', icon: '👨‍👩‍👧', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
        { id: 'ja-weather', title: 'てんき', titleVi: 'Thời tiết', icon: '🌸', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
      ],
    },
  ],
  zh: [
    {
      language: 'Chinese',
      levelName: 'Beginner',
      skills: [
        { id: 'zh-greetings', title: '问候', titleVi: 'Chào hỏi', icon: '🙏', lessonsTotal: 5, lessonsCompleted: 2, locked: false, level: 1, maxLevel: 5, xpReward: 10 },
        { id: 'zh-numbers', title: '数字', titleVi: 'Số đếm', icon: '🔢', lessonsTotal: 5, lessonsCompleted: 1, locked: false, level: 1, maxLevel: 5, xpReward: 10 },
        { id: 'zh-food', title: '食物', titleVi: 'Đồ ăn', icon: '🥟', lessonsTotal: 5, lessonsCompleted: 0, locked: false, level: 0, maxLevel: 5, xpReward: 10 },
        { id: 'zh-shopping', title: '购物', titleVi: 'Mua sắm', icon: '🛒', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
        { id: 'zh-daily', title: '日常', titleVi: 'Hàng ngày', icon: '📅', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
        { id: 'zh-family', title: '家人', titleVi: 'Gia đình', icon: '👨‍👩‍👧', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
        { id: 'zh-travel', title: '旅行', titleVi: 'Du lịch', icon: '🧳', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
        { id: 'zh-weather', title: '天气', titleVi: 'Thời tiết', icon: '☀️', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
      ],
    },
  ],
  ko: [
    {
      language: 'Korean',
      levelName: 'Beginner',
      skills: [
        { id: 'ko-greetings', title: '인사', titleVi: 'Chào hỏi', icon: '🇰🇷', lessonsTotal: 5, lessonsCompleted: 2, locked: false, level: 1, maxLevel: 5, xpReward: 10 },
        { id: 'ko-numbers', title: '숫자', titleVi: 'Số đếm', icon: '🔢', lessonsTotal: 5, lessonsCompleted: 0, locked: false, level: 0, maxLevel: 5, xpReward: 10 },
        { id: 'ko-food', title: '음식', titleVi: 'Đồ ăn', icon: '🍜', lessonsTotal: 5, lessonsCompleted: 0, locked: false, level: 0, maxLevel: 5, xpReward: 10 },
        { id: 'ko-daily', title: '일상', titleVi: 'Hàng ngày', icon: '📅', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
        { id: 'ko-family', title: '가족', titleVi: 'Gia đình', icon: '👨‍👩‍👧', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
        { id: 'ko-shopping', title: '쇼핑', titleVi: 'Mua sắm', icon: '🛍️', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
        { id: 'ko-travel', title: '여행', titleVi: 'Du lịch', icon: '✈️', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
        { id: 'ko-weather', title: '날씨', titleVi: 'Thời tiết', icon: '🌧️', lessonsTotal: 5, lessonsCompleted: 0, locked: true, level: 0, maxLevel: 5, xpReward: 15 },
      ],
    },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

function CrownIcon({ level, maxLevel }: { level: number; maxLevel: number }) {
  const colors = ['bg-gray-300', 'bg-green-400', 'bg-blue-400', 'bg-purple-400', 'bg-yellow-400'];
  const color = colors[Math.min(level, colors.length - 1)];
  return (
    <div className="flex gap-0.5 justify-center mt-1">
      {Array.from({ length: maxLevel }).map((_, i) => (
        <div key={i} className={`w-2 h-2 rounded-full ${i < level ? color : 'bg-gray-200 dark:bg-gray-700'}`} />
      ))}
    </div>
  );
}

export default function SkillTreePage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const router = useRouter();

  const paths = skillPaths[selectedLang] || [];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Cây kỹ năng</h1>
        <p className="text-muted-foreground mt-1">Hoàn thành từng kỹ năng để mở khóa kỹ năng tiếp theo</p>
      </div>

      {/* Language selector */}
      <div className="flex gap-2 flex-wrap">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
              selectedLang === lang.code
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary-200'
            }`}
          >
            <span>{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
          </button>
        ))}
      </div>

      {/* Skill paths */}
      {paths.map((path, pathIdx) => (
        <div key={pathIdx} className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{path.levelName}</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
              {path.skills.filter(s => s.lessonsCompleted >= s.lessonsTotal).length}/{path.skills.length}
            </span>
          </div>

          {/* Skills grid - tree layout */}
          <div className="relative">
            {/* Connection lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -translate-x-1/2 hidden md:block" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {path.skills.map((skill, idx) => {
                const progress = skill.lessonsTotal > 0 ? (skill.lessonsCompleted / skill.lessonsTotal) * 100 : 0;
                const isCompleted = skill.lessonsCompleted >= skill.lessonsTotal;

                return (
                  <button
                    key={skill.id}
                    disabled={skill.locked}
                    onClick={() => !skill.locked && router.push(`/lessons?lang=${selectedLang}`)}
                    className={`relative p-4 rounded-2xl border-2 transition-all text-center ${
                      skill.locked
                        ? 'border-border bg-muted/50 opacity-60 cursor-not-allowed'
                        : isCompleted
                          ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10 hover:scale-105'
                          : 'border-primary/20 bg-card hover:scale-105 hover:border-primary-400'
                    }`}
                  >
                    {skill.locked && (
                      <div className="absolute top-2 right-2 text-muted-foreground">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}

                    <div className="text-3xl mb-2">{skill.icon}</div>
                    <p className="text-xs font-medium truncate">{skill.titleVi}</p>

                    {!skill.locked && (
                      <>
                        {/* Progress ring */}
                        <div className="mt-2 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${isCompleted ? 'bg-yellow-400' : 'bg-primary'}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <CrownIcon level={skill.level} maxLevel={skill.maxLevel} />
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="p-4 rounded-xl bg-muted/50 border border">
        <p className="text-xs font-medium text-muted-foreground mb-2">Chú thích:</p>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded border-2 border-primary-300 bg-white"></span> Đang học</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded border-2 border-yellow-400 bg-yellow-50"></span> Hoàn thành</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded border-2 border-gray-200 bg-gray-50 opacity-60"></span> Khóa</span>
        </div>
      </div>
    </div>
  );
}
