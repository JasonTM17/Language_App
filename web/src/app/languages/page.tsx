'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';

interface Language {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  description: string;
  levels: { id: string; name: string; slug: string; order: number }[];
}

export default function LanguagesPage() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.languages.list()
      .then((data) => setLanguages(data.languages))
      .catch(() => {
        setLanguages([
          { id: '1', code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', description: 'Learn English for communication, TOEIC, and career growth', levels: [{ id: '1', name: 'Beginner', slug: 'beginner', order: 1 }, { id: '2', name: 'Elementary', slug: 'elementary', order: 2 }, { id: '3', name: 'Intermediate', slug: 'intermediate', order: 3 }, { id: '4', name: 'Advanced', slug: 'advanced', order: 4 }] },
          { id: '2', code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', description: 'Learn Japanese for JLPT, anime, and working in Japan', levels: [{ id: '5', name: 'Beginner', slug: 'beginner', order: 1 }, { id: '6', name: 'Elementary', slug: 'elementary', order: 2 }, { id: '7', name: 'Intermediate', slug: 'intermediate', order: 3 }, { id: '8', name: 'Advanced', slug: 'advanced', order: 4 }] },
          { id: '3', code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', description: 'Learn Chinese for HSK, business, and travel', levels: [{ id: '9', name: 'Beginner', slug: 'beginner', order: 1 }, { id: '10', name: 'Elementary', slug: 'elementary', order: 2 }, { id: '11', name: 'Intermediate', slug: 'intermediate', order: 3 }, { id: '12', name: 'Advanced', slug: 'advanced', order: 4 }] },
          { id: '4', code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', description: 'Learn Korean for TOPIK, K-culture, and study abroad', levels: [{ id: '13', name: 'Beginner', slug: 'beginner', order: 1 }, { id: '14', name: 'Elementary', slug: 'elementary', order: 2 }, { id: '15', name: 'Intermediate', slug: 'intermediate', order: 3 }, { id: '16', name: 'Advanced', slug: 'advanced', order: 4 }] },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded-lg" />
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => <div key={i} className="h-48 bg-muted rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display">Choose a Language</h1>
        <p className="text-muted-foreground mt-1">Select a language to start or continue learning</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {languages.map((lang) => (
          <div key={lang.id} className="group p-6 rounded-2xl bg-card border border shadow-sm hover:shadow-md hover:border-primary-200 dark:hover:border-primary-800 transition-all">
            <div className="flex items-start gap-4">
              <div className="text-5xl">{lang.flag}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{lang.name}</h3>
                <p className="text-sm text-muted-foreground">{lang.nativeName}</p>
                <p className="text-sm text-muted-foreground mt-2">{lang.description}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {lang.levels.map((level) => (
                <span key={level.id} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-muted-foreground dark:text-gray-300">
                  {level.name}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <Link href={`/lessons?lang=${lang.code}`} className="flex-1">
                <Button className="w-full" size="sm">Start Learning</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
