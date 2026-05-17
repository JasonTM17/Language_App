import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ServiceWorkerRegister } from '@/components/pwa/service-worker-register';

const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin', 'vietnamese'], variable: '--font-jakarta' });

export const metadata: Metadata = {
  title: 'LinguaFlow - Learn Languages Naturally',
  description: 'Modern language learning platform for Vietnamese students. Learn English, Japanese, Chinese, and Korean with AI-powered tutoring.',
  keywords: ['language learning', 'English', 'Japanese', 'Chinese', 'Korean', 'AI tutor', 'Vietnamese students'],
  metadataBase: new URL('https://web-vert-phi-72.vercel.app'),
  icons: {
    icon: '/favicon.svg',
    apple: '/icon-192.svg',
  },
  openGraph: {
    title: 'LinguaFlow - Learn Languages Naturally',
    description: 'Learn English, Japanese, Chinese, and Korean with AI-powered tutoring and smart flashcards.',
    type: 'website',
    locale: 'vi_VN',
    siteName: 'LinguaFlow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinguaFlow - Learn Languages Naturally',
    description: 'Learn English, Japanese, Chinese, and Korean with AI-powered tutoring.',
  },
  manifest: '/manifest.json',
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} font-sans`}>
        <noscript>
          <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h1>LinguaFlow</h1>
            <p>Ứng dụng này yêu cầu JavaScript để hoạt động. Vui lòng bật JavaScript trong trình duyệt của bạn.</p>
          </div>
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
