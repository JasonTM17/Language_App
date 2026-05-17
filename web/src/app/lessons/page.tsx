'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { api } from '@/services/api';
import { BookOpen } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  type: string;
  xpReward: number;
  duration: number;
  level: { name: string; language: { name: string; flag: string; code: string } };
  progress: { completed: boolean; score: number }[];
}

export default function LessonsPage() {
  const searchParams = useSearchParams();
  const langCode = searchParams.get('lang');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params: any = {};
    if (langCode) params.languageCode = langCode;

    api.lessons.list(params)
      .then((data) => setLessons(data.lessons))
      .catch(() => {
        setLessons([
          { id: '1', title: 'Greetings & Introductions', description: 'Learn basic greetings', order: 1, type: 'vocabulary', xpReward: 15, duration: 10, level: { name: 'Beginner', language: { name: 'English', flag: '🇬🇧', code: 'en' } }, progress: [] },
          { id: '2', title: 'Daily Conversation', description: 'Common phrases for everyday', order: 2, type: 'vocabulary', xpReward: 15, duration: 10, level: { name: 'Beginner', language: { name: 'English', flag: '🇬🇧', code: 'en' } }, progress: [] },
          { id: '3', title: 'Basic Grammar: Present Tense', description: 'Form sentences in present tense', order: 3, type: 'grammar', xpReward: 20, duration: 15, level: { name: 'Beginner', language: { name: 'English', flag: '🇬🇧', code: 'en' } }, progress: [] },
        ]);
      })
      .finally(() => setLoading(false));
  }, [langCode]);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded-lg" />
        {[...Array(5)].map((_, i) => <div key={i} className="h-24 bg-muted rounded-2xl" />)}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold font-display">Bài học</h1>
        <p className="text-muted-foreground mt-1">
          {langCode ? `Bài học cho ${langCode.toUpperCase()}` : 'Tất cả bài học'}
        </p>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson, index) => {
          const isCompleted = lesson.progress?.some(p => p.completed);
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
            >
              <Link href={`/lessons?id=${lesson.id}`}>
                <div className={`p-5 rounded-2xl border transition-all hover:shadow-md backdrop-blur-sm ${
                  isCompleted
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200/60 dark:border-green-800/40'
                    : 'bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border-border/60 hover:border-primary/20 hover:shadow-purple-500/5'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shadow-sm ${
                      isCompleted
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 shadow-green-500/10'
                        : 'bg-gradient-to-br from-primary/10 to-purple-500/10 text-primary shadow-primary/10'
                    }`}>
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{lesson.level?.language?.flag}</span>
                        <h3 className="font-semibold">{lesson.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{lesson.description}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">{lesson.xpReward} XP</span>
                      <span className="flex items-center gap-1">{lesson.duration}min</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {lessons.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-primary/60" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Chưa có bài học</h3>
          <p className="text-muted-foreground">Hãy chọn ngôn ngữ trước để xem bài học.</p>
          <Link href="/languages" className="inline-block mt-4">
            <button className="px-6 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">Chọn ngôn ngữ</button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
