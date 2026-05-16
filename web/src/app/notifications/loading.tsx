'use client';

export default function NotificationsLoading() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-32 bg-muted rounded" />
          <div className="h-4 w-44 bg-muted rounded" />
        </div>
        <div className="h-9 w-40 bg-muted rounded-lg" />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        <div className="h-8 w-20 bg-muted rounded-lg" />
        <div className="h-8 w-24 bg-muted rounded-lg" />
      </div>

      {/* Notification items */}
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4 rounded-xl bg-muted h-20" />
        ))}
      </div>
    </div>
  );
}
