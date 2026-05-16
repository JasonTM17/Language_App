'use client';

export default function SpeakingLoading() {
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

      {/* Prompt card */}
      <div className="p-6 rounded-2xl bg-muted h-40" />

      {/* Recording button */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-muted" />
        <div className="h-4 w-40 bg-muted rounded" />
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <div className="h-10 w-28 bg-muted rounded-xl" />
        <div className="h-10 w-28 bg-muted rounded-xl" />
      </div>
    </div>
  );
}
