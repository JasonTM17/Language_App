'use client';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className ?? ''}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/40 dark:to-purple-950/40 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          {description}
        </p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] bg-primary-500 text-white hover:bg-primary-600 shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 h-11 px-6 py-2"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && !actionHref && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
