'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">⚠️</div>
        <h1 className="text-4xl font-bold font-display mb-4">Oops!</h1>
        <h2 className="text-xl font-semibold mb-2">Đã xảy ra lỗi</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Có lỗi xảy ra khi tải trang. Vui lòng thử lại.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset}>Thử lại</Button>
          <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
            Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}
