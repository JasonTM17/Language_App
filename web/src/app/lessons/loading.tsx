'use client';

export default function LessonsLoading() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-8 w-40 bg-muted rounded" />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-muted rounded-xl" />
        ))}
      </div>
    </div>
  );
}
