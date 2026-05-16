'use client';

import { useEffect, useState } from 'react';

interface CelebrationProps {
  type?: 'confetti' | 'stars' | 'sparkles';
  duration?: number;
  onComplete?: () => void;
}

export function Celebration({ type = 'confetti', duration = 2000, onComplete }: CelebrationProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; color: string; size: number }>>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const colors = type === 'stars'
      ? ['#fbbf24', '#f59e0b', '#d97706', '#fcd34d', '#fef3c7']
      : type === 'sparkles'
      ? ['#a78bfa', '#8b5cf6', '#7c3aed', '#c4b5fd', '#ddd6fe']
      : ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];

    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 500,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [type, duration, onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-celebration"
          style={{
            left: `${p.x}%`,
            top: '-10px',
            animationDelay: `${p.delay}ms`,
            animationDuration: `${duration}ms`,
          }}
        >
          {type === 'stars' ? (
            <span style={{ fontSize: `${p.size * 2}px` }}>⭐</span>
          ) : type === 'sparkles' ? (
            <span style={{ fontSize: `${p.size * 2}px` }}>✨</span>
          ) : (
            <div
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          )}
        </div>
      ))}
      <style jsx>{`
        @keyframes celebration-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-celebration {
          animation: celebration-fall ease-out forwards;
        }
      `}</style>
    </div>
  );
}
