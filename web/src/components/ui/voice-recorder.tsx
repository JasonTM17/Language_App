'use client';

import { useState, useRef, useCallback } from 'react';

interface VoiceRecorderProps {
  onRecordingComplete: (blob: Blob, duration: number) => void;
  maxDuration?: number;
  className?: string;
}

export function VoiceRecorder({ onRecordingComplete, maxDuration = 30, className = '' }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4',
      });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mediaRecorder.mimeType });
        const recordDuration = (Date.now() - startTimeRef.current) / 1000;
        onRecordingComplete(blob, recordDuration);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(100);
      startTimeRef.current = Date.now();
      setIsRecording(true);
      setDuration(0);

      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setDuration(elapsed);
        if (elapsed >= maxDuration) {
          stopRecording();
        }
      }, 1000);
    } catch {
      setHasPermission(false);
    }
  }, [maxDuration, onRecordingComplete]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (hasPermission === false) {
    return (
      <div className={`text-center p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 ${className}`}>
        <p className="text-sm text-red-600 dark:text-red-400">
          Vui lòng cho phép truy cập microphone để sử dụng tính năng này.
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
          isRecording
            ? 'bg-red-500 text-white scale-110 shadow-lg shadow-red-200 dark:shadow-red-900/30'
            : 'bg-primary text-primary-foreground hover:scale-105 shadow-md'
        }`}
        aria-label={isRecording ? 'Dừng ghi âm' : 'Bắt đầu ghi âm'}
      >
        {isRecording ? (
          <span className="w-5 h-5 rounded-sm bg-white" />
        ) : (
          <span className="text-2xl">🎙️</span>
        )}
      </button>

      {isRecording && (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm font-mono text-muted-foreground">
            {formatTime(duration)} / {formatTime(maxDuration)}
          </span>
        </div>
      )}

      {!isRecording && (
        <p className="text-xs text-muted-foreground">
          Nhấn để ghi âm giọng nói của bạn
        </p>
      )}

      {isRecording && (
        <div className="w-full max-w-[200px] h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500 rounded-full transition-all duration-1000"
            style={{ width: `${(duration / maxDuration) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
