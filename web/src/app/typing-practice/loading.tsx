'use client';

export default function TypingPracticeLoading() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-36 bg-muted rounded" />
        <div className="h-4 w-64 bg-muted rounded" />
      </div>

      {/* Language selector */}
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 w-28 bg-muted rounded-xl" />
        ))}
      </div>

      {/* Start card */}
      <div className="p-6 rounded-2xl bg-muted h-44" />

      {/* Tips card */}
      <div className="h-24 bg-muted rounded-xl" />
    </div>
  );
}
