'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-8"
    >
      <div>
        <h1 className="text-2xl font-bold font-display">Chọn ngôn ngữ</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Chọn ngôn ngữ bạn muốn học hoặc tiếp tục</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 shadow-sm hover:shadow-lg hover:shadow-purple-500/5 hover:border-primary/20 transition-all backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <div className="text-5xl group-hover:scale-110 transition-transform">{lang.flag}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{lang.name}</h3>
                <p className="text-sm text-muted-foreground">{lang.nativeName}</p>
                <p className="text-sm text-muted-foreground mt-2">{lang.description}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {lang.levels.map((level) => (
                <span key={level.id} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary/80 border border-primary/10">
                  {level.name}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <Link href={`/lessons?lang=${lang.code}`} className="flex-1">
                <Button className="w-full shadow-sm shadow-primary/10" size="sm">Bắt đầu học</Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
