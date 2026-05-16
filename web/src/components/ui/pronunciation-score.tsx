'use client';

interface PronunciationScoreProps {
  score: number;
  breakdown?: {
    pronunciation: number;
    fluency: number;
    intonation?: number;
    accuracy?: number;
  };
  feedback?: string;
}

export function PronunciationScore({ score, breakdown, feedback }: PronunciationScoreProps) {
  const getScoreColor = (s: number) => {
    if (s >= 90) return 'text-green-500';
    if (s >= 75) return 'text-blue-500';
    if (s >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLabel = (s: number) => {
    if (s >= 90) return 'Xuất sắc';
    if (s >= 75) return 'Rất tốt';
    if (s >= 60) return 'Khá';
    if (s >= 40) return 'Cần cải thiện';
    return 'Thử lại';
  };

  const getScoreRing = (s: number) => {
    if (s >= 90) return 'from-green-400 to-green-600';
    if (s >= 75) return 'from-blue-400 to-blue-600';
    if (s >= 60) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
          <circle
            cx="50" cy="50" r="42" fill="none" strokeWidth="8"
            stroke="url(#scoreGradient)"
            strokeLinecap="round"
            strokeDasharray={`${score * 2.64} 264`}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={score >= 75 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444'} />
              <stop offset="100%" stopColor={score >= 75 ? '#16a34a' : score >= 60 ? '#ca8a04' : '#dc2626'} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
          <span className="text-[10px] text-muted-foreground">/100</span>
        </div>
      </div>

      <p className={`text-sm font-semibold ${getScoreColor(score)}`}>
        {getScoreLabel(score)}
      </p>

      {breakdown && (
        <div className="w-full space-y-2">
          {Object.entries(breakdown).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-24 capitalize">
                {key === 'pronunciation' ? 'Phát âm' :
                 key === 'fluency' ? 'Lưu loát' :
                 key === 'intonation' ? 'Ngữ điệu' : 'Chính xác'}
              </span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${getScoreRing(value)}`}
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="text-xs font-medium w-8 text-right">{value}</span>
            </div>
          ))}
        </div>
      )}

      {feedback && (
        <p className="text-xs text-muted-foreground text-center mt-2 px-2">
          {feedback}
        </p>
      )}
    </div>
  );
}
