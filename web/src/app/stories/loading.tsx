'use client';

export default function StoriesLoading() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-28 bg-muted rounded" />
        <div className="h-4 w-56 bg-muted rounded" />
      </div>

      {/* Language selector */}
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 w-28 bg-muted rounded-xl" />
        ))}
      </div>

      {/* Story cards */}
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-5 rounded-2xl bg-muted h-24" />
        ))}
      </div>
    </div>
  );
}
