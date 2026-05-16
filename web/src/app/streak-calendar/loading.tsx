'use client';

export default function StreakCalendarLoading() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-36 bg-muted rounded" />
        <div className="h-4 w-60 bg-muted rounded" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 bg-muted rounded-2xl" />
        ))}
      </div>

      {/* Calendar card */}
      <div className="p-6 rounded-2xl bg-muted space-y-4">
        {/* Month navigation */}
        <div className="flex items-center justify-between">
          <div className="h-8 w-8 bg-muted/60 rounded-lg" />
          <div className="h-6 w-32 bg-muted/60 rounded" />
          <div className="h-8 w-8 bg-muted/60 rounded-lg" />
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-5 bg-muted/60 rounded" />
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="aspect-square bg-muted/60 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="h-8 bg-muted rounded" />

      {/* Motivation banner */}
      <div className="h-14 bg-muted rounded-2xl" />
    </div>
  );
}
