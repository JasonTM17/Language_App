'use client';

export default function ChatLoading() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-8 w-36 bg-muted rounded" />
      <div className="flex flex-col space-y-3 max-w-2xl">
        <div className="h-16 w-3/4 bg-muted rounded-xl self-start" />
        <div className="h-16 w-2/3 bg-muted rounded-xl self-end" />
        <div className="h-16 w-3/4 bg-muted rounded-xl self-start" />
      </div>
      <div className="h-12 bg-muted rounded-lg" />
    </div>
  );
}
