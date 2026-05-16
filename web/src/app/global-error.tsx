'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">💥</div>
          <h2 className="text-xl font-bold mb-2">Lỗi nghiêm trọng</h2>
          <p className="text-gray-600 text-sm mb-6">
            Ứng dụng gặp lỗi không mong muốn. Vui lòng tải lại trang.
          </p>
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            Tải lại trang
          </button>
        </div>
      </body>
    </html>
  );
}
