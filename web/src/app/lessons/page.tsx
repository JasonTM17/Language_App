'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { api } from '@/services/api';

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
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        {[...Array(5)].map((_, i) => <div key={i} className="h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display">Lessons</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {langCode ? `Showing lessons for ${langCode.toUpperCase()}` : 'All available lessons'}
        </p>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson, index) => {
          const isCompleted = lesson.progress?.some(p => p.completed);
          return (
            <Link key={lesson.id} href={`/lessons?id=${lesson.id}`}>
              <div className={`p-5 rounded-2xl border transition-all hover:shadow-md ${
                isCompleted
                  ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                  : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                    isCompleted
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                      : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{lesson.level?.language?.flag}</span>
                      <h3 className="font-semibold">{lesson.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{lesson.description}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">⭐ {lesson.xpReward} XP</span>
                    <span className="flex items-center gap-1">⏱️ {lesson.duration}min</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {lessons.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📚</div>
          <h3 className="text-lg font-semibold mb-2">No lessons available</h3>
          <p className="text-gray-500">Choose a language first to see available lessons.</p>
          <Link href="/languages" className="inline-block mt-4">
            <button className="px-6 py-2 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors">Browse Languages</button>
          </Link>
        </div>
      )}
    </div>
  );
}
