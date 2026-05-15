import * as React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
    const initials = fallback || alt?.charAt(0)?.toUpperCase() || '?';

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden rounded-full bg-primary-100 dark:bg-primary-900/30',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt || ''} className="aspect-square h-full w-full object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-medium text-primary-700 dark:text-primary-300">
            {initials}
          </span>
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar };
