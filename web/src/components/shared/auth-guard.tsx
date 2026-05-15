'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { DashboardSkeleton } from '@/components/ui/skeleton';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { token, user } = useAuthStore();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!token && !user) {
      router.replace('/auth/login');
    } else {
      setChecked(true);
    }
  }, [token, user, router]);

  if (!checked) {
    return (
      <div className="p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  return <>{children}</>;
}
