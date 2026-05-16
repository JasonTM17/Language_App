'use client';

export default function ShopLoading() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-32 bg-muted rounded" />
          <div className="h-4 w-52 bg-muted rounded" />
        </div>
        <div className="h-10 w-24 bg-muted rounded-xl" />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-28 bg-muted rounded-xl" />
        ))}
      </div>

      {/* Shop items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-28 bg-muted rounded-2xl" />
        ))}
      </div>

      {/* Earn gems section */}
      <div className="h-16 bg-muted rounded-2xl" />
    </div>
  );
}
