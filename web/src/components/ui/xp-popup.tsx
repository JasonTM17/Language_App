'use client';

import { useEffect, useState } from 'react';

interface XpPopupProps {
  amount: number;
  onComplete?: () => void;
}

export function XpPopup({ amount, onComplete }: XpPopupProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-xp-popup">
      <div className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold text-lg shadow-lg shadow-yellow-200/50 dark:shadow-yellow-900/30">
        +{amount} XP
      </div>
      <style jsx>{`
        @keyframes xp-float {
          0% { transform: translateX(-50%) translateY(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(-50%) translateY(-60px); opacity: 0; }
        }
        .animate-xp-popup {
          animation: xp-float 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
