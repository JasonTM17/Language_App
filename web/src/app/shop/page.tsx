'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
  category: 'power-ups' | 'cosmetics' | 'streak';
}

const shopItems: ShopItem[] = [
  { id: 'heart-refill', name: 'Hồi tim', description: 'Hồi đầy 5 trái tim ngay lập tức', icon: '❤️', price: 50, category: 'power-ups' },
  { id: 'streak-freeze', name: 'Đóng băng streak', description: 'Bảo vệ streak 1 ngày khi bạn quên học', icon: '🧊', price: 100, category: 'streak' },
  { id: 'double-xp', name: 'Nhân đôi XP', description: 'Nhận gấp đôi XP trong 30 phút', icon: '⚡', price: 150, category: 'power-ups' },
  { id: 'hint-pack', name: 'Gói gợi ý', description: '5 lượt gợi ý miễn phí trong bài tập', icon: '💡', price: 75, category: 'power-ups' },
  { id: 'streak-repair', name: 'Sửa streak', description: 'Khôi phục streak đã mất (1 ngày)', icon: '🔧', price: 200, category: 'streak' },
  { id: 'timer-boost', name: 'Thêm thời gian', description: '+15 giây trong thử thách tốc độ', icon: '⏰', price: 60, category: 'power-ups' },
  { id: 'badge-gold', name: 'Huy hiệu vàng', description: 'Khung avatar vàng nổi bật', icon: '🏅', price: 500, category: 'cosmetics' },
  { id: 'badge-diamond', name: 'Huy hiệu kim cương', description: 'Khung avatar kim cương hiếm', icon: '💎', price: 1000, category: 'cosmetics' },
  { id: 'theme-sakura', name: 'Giao diện Sakura', description: 'Giao diện hồng hoa anh đào', icon: '🌸', price: 300, category: 'cosmetics' },
  { id: 'theme-ocean', name: 'Giao diện Đại dương', description: 'Giao diện xanh biển sâu', icon: '🌊', price: 300, category: 'cosmetics' },
];

const earnMethods = [
  { icon: '📖', title: 'Hoàn thành bài học', gems: '+5', description: 'Mỗi bài học hoàn thành' },
  { icon: '✅', title: 'Quiz hoàn hảo', gems: '+10', description: 'Trả lời đúng 100% quiz' },
  { icon: '🔥', title: 'Streak 7 ngày', gems: '+25', description: 'Duy trì streak 7 ngày liên tiếp' },
  { icon: '⚡', title: 'Thử thách tốc độ', gems: '+15', description: 'Đạt 100+ điểm trong speed quiz' },
  { icon: '🏆', title: 'Mở khóa thành tựu', gems: '+20', description: 'Mỗi thành tựu mới' },
  { icon: '📅', title: 'Hoàn thành quest', gems: '+10', description: 'Hoàn thành nhiệm vụ hàng ngày' },
];

export default function ShopPage() {
  const [gems, setGems] = useState(250);
  const [category, setCategory] = useState<'all' | 'power-ups' | 'cosmetics' | 'streak'>('all');
  const [purchased, setPurchased] = useState<Set<string>>(new Set());
  const [showEarn, setShowEarn] = useState(false);

  const filteredItems = category === 'all' ? shopItems : shopItems.filter(i => i.category === category);

  const buyItem = (item: ShopItem) => {
    if (gems < item.price) return;
    setGems(prev => prev - item.price);
    setPurchased(prev => new Set([...prev, item.id]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Cửa hàng</h1>
          <p className="text-muted-foreground mt-1">Dùng gems để mua vật phẩm hữu ích</p>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/60 dark:border-purple-800/30"
        >
          <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          <span className="text-lg font-bold text-purple-700 dark:text-purple-300">{gems}</span>
        </motion.div>
      </div>

      {/* Category tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 flex-wrap"
      >
        {[
          { key: 'all', label: 'Tất cả' },
          { key: 'power-ups', label: 'Tăng sức mạnh' },
          { key: 'streak', label: 'Streak' },
          { key: 'cosmetics', label: 'Trang trí' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setCategory(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              category === tab.key
                ? 'bg-primary text-white shadow-sm shadow-primary/20'
                : 'bg-muted/60 text-muted-foreground hover:bg-primary/5 hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Shop items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item, index) => {
          const canAfford = gems >= item.price;
          const alreadyBought = purchased.has(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              className={`p-4 rounded-2xl transition-all backdrop-blur-sm ${
                alreadyBought
                  ? 'border-green-200/60 dark:border-green-800/40 bg-gradient-to-br from-green-50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10 opacity-70'
                  : 'bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 hover:shadow-md hover:shadow-purple-500/5 hover:border-primary/20'
              } border`}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{item.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  <span className="font-bold text-sm">{item.price}</span>
                </div>
                {alreadyBought ? (
                  <span className="text-xs text-green-600 font-medium">✓ Đã mua</span>
                ) : (
                  <Button
                    onClick={() => buyItem(item)}
                    disabled={!canAfford}
                    className="text-xs px-3 py-1 h-auto"
                  >
                    {canAfford ? 'Mua' : 'Không đủ'}
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* How to earn gems */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm"
      >
        <button
          onClick={() => setShowEarn(!showEarn)}
          className="w-full flex items-center justify-between"
        >
          <h2 className="font-semibold text-lg">Cách kiếm gems</h2>
          <motion.svg
            animate={{ rotate: showEarn ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
        <AnimatePresence>
          {showEarn && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3">
                {earnMethods.map((method, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <span className="text-xl">{method.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{method.title}</p>
                      <p className="text-xs text-muted-foreground">{method.description}</p>
                    </div>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{method.gems}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
