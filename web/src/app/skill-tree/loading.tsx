'use client';

export default function SkillTreeLoading() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-36 bg-muted rounded" />
        <div className="h-4 w-72 bg-muted rounded" />
      </div>

      {/* Language selector */}
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 w-28 bg-muted rounded-xl" />
        ))}
      </div>

      {/* Skill path - Beginner */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-24 bg-muted rounded" />
          <div className="h-5 w-10 bg-muted rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-28 bg-muted rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Skill path - Elementary */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-28 bg-muted rounded" />
          <div className="h-5 w-10 bg-muted rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 bg-muted rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="h-16 bg-muted rounded-xl" />
    </div>
  );
}
