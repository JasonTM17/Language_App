'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useAuthStore, useAppStore } from '@/lib/store';
import {
  Home, Globe, BookOpen, FileText, Ruler, Lightbulb, Layers, RefreshCw,
  Brain, HelpCircle, Zap, Bot, Mic, Headphones, PenTool, AudioLines,
  Edit3, MessageCircle, Languages, Puzzle, Blocks, ClipboardList, Link2,
  Type, Library, BookOpenText, Landmark, Trophy, GitBranch, Shuffle,
  Wrench, Flame, Bookmark, Medal, Users, CalendarDays, Swords, Target,
  Gem, Keyboard, Gamepad2, LayoutGrid, BarChart3, TrendingUp, Sparkles, Quote,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/languages', label: 'Languages', icon: Globe },
  { href: '/lessons', label: 'Lessons', icon: BookOpen },
  { href: '/vocabulary', label: 'Vocabulary', icon: FileText },
  { href: '/grammar', label: 'Grammar', icon: Ruler },
  { href: '/grammar-tips', label: 'Grammar Tips', icon: Lightbulb },
  { href: '/flashcards', label: 'Flashcards', icon: Layers },
  { href: '/review', label: 'Review', icon: RefreshCw },
  { href: '/weak-words', label: 'Weak Words', icon: Brain },
  { href: '/quiz', label: 'Quiz', icon: HelpCircle },
  { href: '/timed-challenge', label: 'Speed Quiz', icon: Zap },
  { href: '/ai-tutor', label: 'AI Tutor', icon: Bot },
  { href: '/speaking', label: 'Speaking', icon: Mic },
  { href: '/listening', label: 'Listening', icon: Headphones },
  { href: '/dictation', label: 'Dictation', icon: PenTool },
  { href: '/pronunciation', label: 'Pronunciation', icon: AudioLines },
  { href: '/writing', label: 'Writing', icon: Edit3 },
  { href: '/conversation', label: 'Conversation', icon: MessageCircle },
  { href: '/translation', label: 'Translation', icon: Languages },
  { href: '/sentence', label: 'Sentences', icon: Puzzle },
  { href: '/sentence-builder', label: 'Build', icon: Blocks },
  { href: '/fill-blank', label: 'Fill Blank', icon: ClipboardList },
  { href: '/matching', label: 'Matching', icon: Link2 },
  { href: '/characters', label: 'Characters', icon: Type },
  { href: '/stories', label: 'Stories', icon: Library },
  { href: '/reading', label: 'Reading', icon: BookOpenText },
  { href: '/culture', label: 'Culture', icon: Landmark },
  { href: '/idioms', label: 'Idioms', icon: Quote },
  { href: '/achievements', label: 'Achievements', icon: Trophy },
  { href: '/skill-tree', label: 'Skill Tree', icon: GitBranch },
  { href: '/word-scramble', label: 'Word Scramble', icon: Shuffle },
  { href: '/grammar-correction', label: 'Grammar Fix', icon: Wrench },
  { href: '/streak-calendar', label: 'Streak', icon: Flame },
  { href: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { href: '/leaderboard', label: 'Leaderboard', icon: Medal },
  { href: '/friends', label: 'Friends', icon: Users },
  { href: '/study-plan', label: 'Study Plan', icon: CalendarDays },
  { href: '/quests', label: 'Quests', icon: Swords },
  { href: '/daily-goals', label: 'Daily Goals', icon: Target },
  { href: '/daily-challenge', label: 'Challenge', icon: Zap },
  { href: '/shop', label: 'Shop', icon: Gem },
  { href: '/typing-practice', label: 'Typing', icon: Keyboard },
  { href: '/games', label: 'Games', icon: Gamepad2 },
  { href: '/memory-game', label: 'Memory', icon: LayoutGrid },
  { href: '/progress', label: 'Progress', icon: BarChart3 },
  { href: '/analytics', label: 'Analytics', icon: TrendingUp },
  { href: '/word-of-day', label: 'Word of Day', icon: Sparkles },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Chuyển đến nội dung chính
      </a>

      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 glass border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={toggleSidebar} aria-label="Mở/đóng menu điều hướng" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">L</div>
              <span className="font-display font-bold text-lg hidden sm:block">LinguaFlow</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" strokeWidth={2}/><path strokeLinecap="round" strokeWidth={2} d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              )}
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
              <span className="text-sm">🔥</span>
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">{user?.streak || 0} day streak</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
              <span className="text-sm">⭐</span>
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">{user?.xp || 0} XP</span>
            </div>
            <div className="relative group">
              <button aria-label={`Tài khoản của ${user?.name || 'người dùng'}`} className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-medium text-sm">
                {user?.name?.charAt(0) || 'U'}
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                  <p className="font-medium text-sm">{user?.name}</p>
                  <p className="text-xs text-gray-500">Level {user?.level || 1}</p>
                </div>
                <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">Profile</Link>
                {user?.role === 'admin' && (
                  <Link href="/admin" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">Admin Panel</Link>
                )}
                <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">Log out</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 bottom-0 z-30 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-100 dark:border-primary-800'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main id="main-content" className="pt-16 lg:pl-64">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={toggleSidebar} />
      )}
    </div>
  );
}
