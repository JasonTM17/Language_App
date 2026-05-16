'use client';

import { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface ForecastData {
  forecast: Record<string, number>;
  dueToday: number;
  totalCards: number;
  masteredCards: number;
}

export default function ReviewPage() {
  const [data, setData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.study.reviewForecast()
      .then(setData)
      .catch(() => {
        setData({
          forecast: getMockForecast(),
          dueToday: 12,
          totalCards: 85,
          masteredCards: 34,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="animate-pulse h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="animate-pulse h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
      </div>
    );
  }

  const forecast = data?.forecast || {};
  const maxCards = Math.max(...Object.values(forecast), 1);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Ôn tập</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Lịch ôn tập theo thuật toán lặp lại ngắt quãng</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 text-center">
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{data?.dueToday || 0}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Cần ôn hôm nay</p>
        </div>
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{data?.totalCards || 0}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Tổng thẻ</p>
        </div>
        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{data?.masteredCards || 0}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Đã thuộc</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">Tiến độ ghi nhớ</span>
          <span className="font-medium">{data?.totalCards ? Math.round((data.masteredCards / data.totalCards) * 100) : 0}%</span>
        </div>
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
            style={{ width: `${data?.totalCards ? (data.masteredCards / data.totalCards) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* 7-day forecast */}
      <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <h2 className="font-semibold mb-4">Dự báo 7 ngày tới</h2>
        <div className="flex items-end justify-between gap-2 h-40">
          {Object.entries(forecast).map(([date, count]) => {
            const height = maxCards > 0 ? (count / maxCards) * 100 : 0;
            const dayName = getDayName(date);
            const isToday = date === new Date().toISOString().split('T')[0];

            return (
              <div key={date} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500">{count}</span>
                <div className="w-full flex items-end" style={{ height: '100px' }}>
                  <div
                    className={`w-full rounded-t-lg transition-all ${
                      isToday
                        ? 'bg-gradient-to-t from-primary-500 to-primary-400'
                        : 'bg-gradient-to-t from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500'
                    }`}
                    style={{ height: `${Math.max(height, 5)}%` }}
                  />
                </div>
                <span className={`text-xs ${isToday ? 'font-bold text-primary-600' : 'text-gray-500'}`}>
                  {dayName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
        <h3 className="font-medium text-sm text-primary-800 dark:text-primary-200 mb-2">Mẹo ôn tập hiệu quả</h3>
        <ul className="space-y-1 text-sm text-primary-700 dark:text-primary-300">
          <li>• Ôn tập mỗi ngày vào cùng một giờ để tạo thói quen</li>
          <li>• Không nên ôn quá 50 thẻ mỗi lần để tránh mệt mỏi</li>
          <li>• Kết hợp ôn tập với việc sử dụng từ trong câu thực tế</li>
        </ul>
      </div>
    </div>
  );
}

function getDayName(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (dateStr === today.toISOString().split('T')[0]) return 'Nay';
  if (dateStr === tomorrow.toISOString().split('T')[0]) return 'Mai';

  const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  return days[date.getDay()];
}

function getMockForecast(): Record<string, number> {
  const forecast: Record<string, number> = {};
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    forecast[dateStr] = Math.floor(Math.random() * 15) + 3;
  }
  return forecast;
}
