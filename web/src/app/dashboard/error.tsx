'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-md">
        <div className="text-5xl">😵</div>
        <h2 className="text-xl font-semibold text-foreground">
          Something went wrong
        </h2>
        <p className="text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
