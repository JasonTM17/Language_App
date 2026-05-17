'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧', desc: 'TOEIC, IELTS, giao tiếp' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', desc: 'JLPT, anime, du học Nhật' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', desc: 'HSK, kinh doanh, du lịch' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', desc: 'TOPIK, K-pop, K-drama' },
];

const goals = [
  { minutes: 5, label: '5 phút/ngày', desc: 'Nhẹ nhàng' },
  { minutes: 10, label: '10 phút/ngày', desc: 'Bình thường' },
  { minutes: 15, label: '15 phút/ngày', desc: 'Nghiêm túc' },
  { minutes: 30, label: '30 phút/ngày', desc: 'Chuyên sâu' },
];

const levels = [
  { value: 'beginner', label: 'Mới bắt đầu', desc: 'Chưa biết gì hoặc biết rất ít' },
  { value: 'elementary', label: 'Sơ cấp', desc: 'Biết một số từ và câu cơ bản' },
  { value: 'intermediate', label: 'Trung cấp', desc: 'Có thể giao tiếp đơn giản' },
  { value: 'advanced', label: 'Nâng cao', desc: 'Giao tiếp tốt, muốn hoàn thiện' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState(10);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [loading, setLoading] = useState(false);

  const toggleLang = (code: string) => {
    setSelectedLangs((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      await api.auth.me();
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/onboarding/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ languages: selectedLangs, dailyGoal: selectedGoal, level: selectedLevel }),
      });
      router.push('/dashboard');
    } catch {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Step progress indicator */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-primary dark:text-primary-400">
              Bước {step + 1}/3
            </span>
            <span className="text-muted-foreground">
              {step === 0 ? 'Chọn ngôn ngữ' : step === 1 ? 'Mục tiêu hàng ngày' : 'Trình độ của bạn'}
            </span>
          </div>
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                  i <= step ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 0: Language Selection */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold font-display">Chào mừng bạn! 👋</h1>
              <p className="text-muted-foreground mt-2">Bạn muốn học ngôn ngữ nào?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => toggleLang(lang.code)}
                  className={`p-6 rounded-2xl border-2 text-center transition-all ${
                    selectedLangs.includes(lang.code)
                      ? 'border-primary bg-primary/5 scale-105'
                      : 'border-border hover:border-primary-200'
                  }`}
                >
                  <div className="text-4xl mb-2">{lang.flag}</div>
                  <p className="font-semibold">{lang.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{lang.desc}</p>
                </button>
              ))}
            </div>
            <Button
              onClick={() => setStep(1)}
              disabled={selectedLangs.length === 0}
              className="w-full"
              size="lg"
            >
              Tiếp tục
            </Button>
          </div>
        )}

        {/* Step 1: Daily Goal */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold font-display">Mục tiêu hàng ngày 🎯</h1>
              <p className="text-muted-foreground mt-2">Bạn muốn học bao lâu mỗi ngày?</p>
            </div>
            <div className="space-y-3">
              {goals.map((goal) => (
                <button
                  key={goal.minutes}
                  onClick={() => setSelectedGoal(goal.minutes)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    selectedGoal === goal.minutes
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary-200'
                  }`}
                >
                  <div>
                    <p className="font-semibold">{goal.label}</p>
                    <p className="text-sm text-muted-foreground">{goal.desc}</p>
                  </div>
                  {selectedGoal === goal.minutes && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm">✓</div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(0)} className="flex-1">Quay lại</Button>
              <Button onClick={() => setStep(2)} className="flex-1">Tiếp tục</Button>
            </div>
          </div>
        )}

        {/* Step 2: Level */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold font-display">Trình độ của bạn 📚</h1>
              <p className="text-muted-foreground mt-2">Chọn trình độ phù hợp nhất</p>
            </div>
            <div className="space-y-3">
              {levels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setSelectedLevel(level.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedLevel === level.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary-200'
                  }`}
                >
                  <p className="font-semibold">{level.label}</p>
                  <p className="text-sm text-muted-foreground">{level.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Quay lại</Button>
              <Button onClick={handleComplete} loading={loading} className="flex-1">Bắt đầu học!</Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
