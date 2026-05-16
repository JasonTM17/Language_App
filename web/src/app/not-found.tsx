'use client';

import Link from 'next/link';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <SearchX className="w-20 h-20 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold font-display mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-2">Không tìm thấy trang</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
        >
          ← Về trang chủ
        </Link>
      </div>
    </div>
  );
}
