'use client';

export default function QuizLoading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-8 w-32 bg-muted rounded" />
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="h-24 bg-muted rounded-xl" />
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-14 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
