'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Target, Bot, BookOpen, Layers, Trophy, Smartphone, type LucideIcon } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧', learners: '2.5M+' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', learners: '1.2M+' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', learners: '1.8M+' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', learners: '900K+' },
];

const features: { icon: LucideIcon; title: string; desc: string; color: string }[] = [
  { icon: Target, title: 'Personalized Learning', desc: 'AI-powered paths tailored to your goals - TOEIC, JLPT, HSK, TOPIK', color: 'text-red-500' },
  { icon: Bot, title: 'AI Tutor', desc: 'Practice conversations with an AI that corrects your grammar and pronunciation', color: 'text-blue-500' },
  { icon: BookOpen, title: 'Rich Content', desc: 'Vocabulary, grammar, listening, speaking, reading, and writing exercises', color: 'text-green-500' },
  { icon: Layers, title: 'Smart Flashcards', desc: 'Spaced repetition system to remember vocabulary long-term', color: 'text-purple-500' },
  { icon: Trophy, title: 'Gamification', desc: 'XP, streaks, levels, and achievements to keep you motivated', color: 'text-yellow-500' },
  { icon: Smartphone, title: 'Learn Anywhere', desc: 'Web and mobile apps synced so you never miss a lesson', color: 'text-teal-500' },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/30 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">L</div>
            <span className="font-display font-bold text-xl">LinguaFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#languages" className="text-sm text-muted-foreground hover:text-primary transition-colors">Languages</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Start Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary-100 dark:border-primary-800 mb-6"
          >
            <span className="text-xs font-medium text-primary-700 dark:text-primary-300">New: AI Tutor with role-play scenarios</span>
          </motion.div>
          <motion.h1 {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Learn Languages{' '}
            <span className="gradient-text">Naturally</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Master English, Japanese, Chinese, and Korean with AI-powered tutoring,
            smart flashcards, and personalized learning paths designed for Vietnamese students.
          </motion.p>
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/auth/register">
              <Button size="xl" className="w-full sm:w-auto">
                Start Learning Free
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">See How It Works</Button>
            </Link>
          </motion.div>

          {/* Language Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.code}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="group p-4 rounded-2xl bg-card border border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-2">{lang.flag}</div>
                <h3 className="font-semibold text-sm">{lang.name}</h3>
                <p className="text-xs text-muted-foreground">{lang.learners} learners</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Comprehensive tools and methods backed by language learning science</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card/50 border dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 transition-colors">
                <div className="mb-4">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-primary-500 to-accent-600 text-white">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg opacity-90 mb-8">Join thousands of Vietnamese students learning languages the smart way.</p>
            <Link href="/auth/register">
              <Button size="xl" className="bg-white text-primary-700 hover:bg-gray-100 shadow-xl">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xs">L</div>
            <span className="font-display font-semibold">LinguaFlow</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 LinguaFlow. Made with ❤️ for Vietnamese learners.</p>
        </div>
      </footer>
    </div>
  );
}
