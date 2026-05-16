'use client';

import { useState, useCallback } from 'react';
import { audioService, type SupportedLanguage } from '@/services/audio';

interface AudioPlayerProps {
  text: string;
  language: SupportedLanguage;
  className?: string;
  showSlowButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function AudioPlayer({ text, language, className = '', showSlowButton = true, size = 'md' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingSlow, setIsPlayingSlow] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-xl',
  };

  const handlePlay = useCallback(async () => {
    if (isPlaying) {
      audioService.stop();
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    try {
      await audioService.speak(text, language);
    } catch {}
    setIsPlaying(false);
  }, [text, language, isPlaying]);

  const handlePlaySlow = useCallback(async () => {
    if (isPlayingSlow) {
      audioService.stop();
      setIsPlayingSlow(false);
      return;
    }
    setIsPlayingSlow(true);
    try {
      await audioService.speakSlow(text, language);
    } catch {}
    setIsPlayingSlow(false);
  }, [text, language, isPlayingSlow]);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={handlePlay}
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all ${
          isPlaying
            ? 'bg-primary text-primary-foreground scale-110 animate-pulse'
            : 'bg-primary/10 text-primary hover:bg-primary/20'
        }`}
        aria-label={isPlaying ? 'Dừng phát' : 'Phát âm thanh'}
      >
        {isPlaying ? '⏸' : '🔊'}
      </button>
      {showSlowButton && (
        <button
          onClick={handlePlaySlow}
          className={`${sizeClasses[size === 'lg' ? 'md' : 'sm']} rounded-full flex items-center justify-center transition-all ${
            isPlayingSlow
              ? 'bg-orange-500 text-white scale-110 animate-pulse'
              : 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 hover:bg-orange-200 dark:hover:bg-orange-900/30'
          }`}
          aria-label={isPlayingSlow ? 'Dừng phát' : 'Phát chậm'}
        >
          🐢
        </button>
      )}
    </div>
  );
}
