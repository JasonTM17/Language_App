'use client';

export default function DailyChallengeLoading() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-pulse">
      {/* Hero icon + title */}
      <div className="text-center py-8 space-y-3">
        <div className="w-16 h-16 rounded-full bg-muted mx-auto" />
        <div className="h-8 w-52 bg-muted rounded mx-auto" />
        <div className="h-4 w-72 bg-muted rounded mx-auto" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 bg-muted rounded-2xl" />
        ))}
      </div>

      {/* Rules card */}
      <div className="h-36 bg-muted rounded-2xl" />

      {/* Start button */}
      <div className="flex justify-center">
        <div className="h-12 w-44 bg-muted rounded-xl" />
      </div>
    </div>
  );
}
