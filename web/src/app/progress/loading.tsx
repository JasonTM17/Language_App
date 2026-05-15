'use client';

export default function ProgressLoading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-8 w-44 bg-muted rounded" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 bg-muted rounded-xl" />
        ))}
      </div>
      <div className="h-64 bg-muted rounded-xl" />
    </div>
  );
}
