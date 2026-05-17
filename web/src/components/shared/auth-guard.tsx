'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { DashboardSkeleton } from '@/components/ui/skeleton';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { token, user, hasHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!hasHydrated) return;
    if (!token && !user) {
      router.replace('/auth/login');
    }
  }, [hasHydrated, token, user, router]);

  if (!hasHydrated) {
    return (
      <div className="p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  if (!token && !user) {
    return (
      <div className="p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  return <>{children}</>;
}
