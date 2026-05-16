'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">L</div>
            <span className="font-display font-bold text-2xl">LinguaFlow</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
          <p className="text-muted-foreground">Enter your email to receive a reset link</p>
        </div>

        {sent ? (
          <div className="bg-card rounded-2xl p-8 shadow-xl border border text-center">
            <div className="flex justify-center mb-4">
              <Mail className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Check your email</h2>
            <p className="text-sm text-muted-foreground mb-6">
              If an account exists for {email}, we&apos;ve sent a password reset link.
            </p>
            <Link href="/auth/login">
              <Button variant="outline" className="w-full">Back to Login</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-xl border border">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
            <Button type="submit" className="w-full mt-6" size="lg">
              Send Reset Link
            </Button>
          </form>
        )}

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Remember your password?{' '}
          <Link href="/auth/login" className="text-primary font-medium hover:text-primary-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
