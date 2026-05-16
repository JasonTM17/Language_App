'use client';

export default function FriendsLoading() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-24 bg-muted rounded" />
        <div className="h-4 w-56 bg-muted rounded" />
      </div>

      {/* Tabs */}
      <div className="h-12 bg-muted rounded-xl" />

      {/* Search input */}
      <div className="h-11 bg-muted rounded-xl" />

      {/* Friend cards */}
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 rounded-xl bg-muted h-20" />
        ))}
      </div>
    </div>
  );
}
