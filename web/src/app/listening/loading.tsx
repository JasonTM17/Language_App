'use client';

export default function ListeningLoading() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-28 bg-muted rounded" />
        <div className="h-4 w-52 bg-muted rounded" />
      </div>

      {/* Language selector */}
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 w-28 bg-muted rounded-xl" />
        ))}
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>
        <div className="h-2 bg-muted rounded-full" />
      </div>

      {/* Audio player card */}
      <div className="p-6 rounded-2xl bg-muted h-40 flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 rounded-full bg-muted/60" />
      </div>

      {/* Answer options */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-14 bg-muted rounded-xl" />
        ))}
      </div>
    </div>
  );
}
