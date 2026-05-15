import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin', 'vietnamese'], variable: '--font-jakarta' });

export const metadata: Metadata = {
  title: 'LinguaFlow - Learn Languages Naturally',
  description: 'Modern language learning platform for Vietnamese students. Learn English, Japanese, Chinese, and Korean with AI-powered tutoring.',
  keywords: ['language learning', 'English', 'Japanese', 'Chinese', 'Korean', 'AI tutor', 'Vietnamese students'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
