'use client';

import { useEffect, useState } from 'react';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error';
}

let toastListeners: ((toast: Toast) => void)[] = [];

export function toast({ title, description, variant = 'default' }: Omit<Toast, 'id'>) {
  const id = Math.random().toString(36).slice(2);
  toastListeners.forEach(listener => listener({ id, title, description, variant }));
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (toast: Toast) => {
      setToasts(prev => [...prev, toast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, 4000);
    };
    toastListeners.push(listener);
    return () => { toastListeners = toastListeners.filter(l => l !== listener); };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`animate-slide-up rounded-xl px-4 py-3 shadow-lg border ${
            toast.variant === 'success' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
            toast.variant === 'error' ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' :
            'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
          }`}
        >
          <p className="font-medium text-sm">{toast.title}</p>
          {toast.description && <p className="text-xs text-muted-foreground mt-1">{toast.description}</p>}
        </div>
      ))}
    </div>
  );
}
