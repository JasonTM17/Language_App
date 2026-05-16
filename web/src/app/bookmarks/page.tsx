'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';
import { EmptyState } from '@/components/ui/states';

interface BookmarkedWord {
  id: string;
  word: string;
  reading?: string;
  meaning: string;
  example?: string;
  exampleMeaning?: string;
  language: {
    code: string;
    name: string;
    flag: string;
  };
}

interface WordOfDay {
  id: string;
  word: string;
  reading?: string;
  meaning: string;
  example?: string;
  exampleMeaning?: string;
  language: {
    code: string;
    name: string;
    flag: string;
  };
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkedWord[]>([]);
  const [wordsOfDay, setWordsOfDay] = useState<WordOfDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'word-of-day'>('word-of-day');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [bookmarksRes, wodRes] = await Promise.all([
        api.study.bookmarks().catch(() => ({ bookmarks: [] })),
        api.study.wordOfTheDay().catch(() => ({ words: [], date: '' })),
      ]);
      setBookmarks(bookmarksRes.bookmarks || []);
      setWordsOfDay(wodRes.words || []);
    } catch {
      setBookmarks([]);
      setWordsOfDay(getMockWordsOfDay());
    }
    setLoading(false);
  };

  const removeBookmark = async (vocabId: string) => {
    try {
      await api.study.removeBookmark(vocabId);
      setBookmarks(prev => prev.filter(b => b.id !== vocabId));
    } catch {
      setBookmarks(prev => prev.filter(b => b.id !== vocabId));
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="animate-pulse h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="animate-pulse h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        <div className="animate-pulse h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Từ vựng của tôi</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Từ vựng hàng ngày và từ đã lưu</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
        <button
          onClick={() => setActiveTab('word-of-day')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'word-of-day'
              ? 'bg-white dark:bg-gray-700 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Từ vựng hôm nay
        </button>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'bookmarks'
              ? 'bg-white dark:bg-gray-700 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Đã lưu ({bookmarks.length})
        </button>
      </div>

      {/* Word of the Day */}
      {activeTab === 'word-of-day' && (
        <div className="space-y-4">
          {wordsOfDay.length === 0 ? (
            <EmptyState
              icon="📅"
              title="Chưa có từ vựng hôm nay"
              description="Đăng ký học ngôn ngữ để nhận từ vựng hàng ngày"
            />
          ) : (
            wordsOfDay.map((word) => (
              <WordCard key={word.id} word={word} showBookmark onBookmark={() => {}} />
            ))
          )}
        </div>
      )}

      {/* Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-3">
          {bookmarks.length === 0 ? (
            <EmptyState
              icon="🔖"
              title="Chưa có từ vựng nào được lưu"
              description="Nhấn biểu tượng bookmark khi học để lưu từ"
            />
          ) : (
            bookmarks.map((word) => (
              <WordCard key={word.id} word={word} showRemove onRemove={() => removeBookmark(word.id)} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

function WordCard({ word, showBookmark, showRemove, onBookmark, onRemove }: {
  word: BookmarkedWord | WordOfDay;
  showBookmark?: boolean;
  showRemove?: boolean;
  onBookmark?: () => void;
  onRemove?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1" onClick={() => setExpanded(!expanded)}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">{word.language.flag}</span>
            <span className="text-lg font-bold">{word.word}</span>
            {word.reading && <span className="text-sm text-gray-500">({word.reading})</span>}
          </div>
          <p className="text-sm text-primary-700 dark:text-primary-300 font-medium">{word.meaning}</p>
        </div>
        {showRemove && (
          <button onClick={onRemove} className="p-2 text-red-400 hover:text-red-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
        {showBookmark && (
          <button onClick={onBookmark} className="p-2 text-yellow-400 hover:text-yellow-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        )}
      </div>
      {expanded && word.example && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-sm italic text-gray-700 dark:text-gray-300">{word.example}</p>
          {word.exampleMeaning && <p className="text-xs text-gray-500 mt-1">{word.exampleMeaning}</p>}
        </div>
      )}
    </div>
  );
}

function getMockWordsOfDay(): WordOfDay[] {
  return [
    { id: '1', word: 'serendipity', meaning: 'sự tình cờ may mắn', example: 'Finding that book was pure serendipity.', exampleMeaning: 'Tìm được cuốn sách đó là sự tình cờ may mắn.', language: { code: 'en', name: 'English', flag: '🇬🇧' } },
    { id: '2', word: '一期一会', reading: 'いちごいちえ', meaning: 'mỗi cuộc gặp gỡ là duy nhất', example: '一期一会の精神で生きる。', exampleMeaning: 'Sống với tinh thần mỗi cuộc gặp là duy nhất.', language: { code: 'ja', name: 'Japanese', flag: '🇯🇵' } },
    { id: '3', word: '缘分', reading: 'yuán fèn', meaning: 'duyên phận', example: '这就是缘分。', exampleMeaning: 'Đây chính là duyên phận.', language: { code: 'zh', name: 'Chinese', flag: '🇨🇳' } },
    { id: '4', word: '인연', reading: 'inyeon', meaning: 'nhân duyên', example: '우리의 인연은 특별해요.', exampleMeaning: 'Nhân duyên của chúng ta thật đặc biệt.', language: { code: 'ko', name: 'Korean', flag: '🇰🇷' } },
  ];
}
