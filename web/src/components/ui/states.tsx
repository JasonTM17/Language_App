'use client';

import { useTranslation } from '@/lib/i18n';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({ message, size = 'md' }: LoadingStateProps) {
  const { t } = useTranslation();
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div
        role="status"
        aria-label={message || 'Đang tải...'}
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-primary/20 border-t-primary`}
      />
      <p className="text-muted-foreground text-sm">{message || t('common.loading')}</p>
    </div>
  );
}

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      {icon && <span className="text-4xl">{icon}</span>}
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      {description && <p className="text-sm text-muted-foreground max-w-sm">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          aria-label={action.label}
          className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ title, message, onRetry }: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
      <span className="text-4xl">😵</span>
      <h3 className="text-lg font-medium text-foreground">{title || t('common.error')}</h3>
      <p className="text-sm text-muted-foreground max-w-sm">{message || t('errors.server_error_desc')}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          aria-label={t('common.retry')}
          className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {t('common.retry')}
        </button>
      )}
    </div>
  );
}

interface SuccessStateProps {
  icon?: string;
  title: string;
  description?: string;
  xpEarned?: number;
  gemsEarned?: number;
}

export function SuccessState({ icon = '🎉', title, description, xpEarned, gemsEarned }: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center animate-in fade-in zoom-in duration-300">
      <span className="text-5xl">{icon}</span>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {(xpEarned || gemsEarned) && (
        <div className="flex gap-4 mt-2">
          {xpEarned && (
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium">
              +{xpEarned} XP
            </span>
          )}
          {gemsEarned && (
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              +{gemsEarned} 💎
            </span>
          )}
        </div>
      )}
    </div>
  );
}
