'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/states';
import { Search } from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  languages: string[];
  status: 'online' | 'offline' | 'studying';
  lastActive: string;
}

interface FriendRequest {
  id: string;
  name: string;
  avatar: string;
  level: number;
  mutualFriends: number;
}

const friends: Friend[] = [
  { id: '1', name: 'Nguyễn Minh Anh', avatar: '👩', xp: 2450, level: 15, streak: 30, languages: ['🇬🇧', '🇯🇵'], status: 'studying', lastActive: 'Đang học' },
  { id: '2', name: 'Trần Đức Huy', avatar: '👨', xp: 1890, level: 12, streak: 14, languages: ['🇬🇧', '🇰🇷'], status: 'online', lastActive: '5 phút trước' },
  { id: '3', name: 'Lê Thị Mai', avatar: '👩‍🦰', xp: 3200, level: 20, streak: 45, languages: ['🇬🇧', '🇯🇵', '🇨🇳'], status: 'online', lastActive: '2 phút trước' },
  { id: '4', name: 'Phạm Văn Long', avatar: '🧑', xp: 980, level: 7, streak: 5, languages: ['🇬🇧'], status: 'offline', lastActive: '3 giờ trước' },
  { id: '5', name: 'Hoàng Thị Lan', avatar: '👧', xp: 1560, level: 10, streak: 21, languages: ['🇬🇧', '🇨🇳'], status: 'offline', lastActive: '1 ngày trước' },
  { id: '6', name: 'Vũ Quang Minh', avatar: '👦', xp: 4100, level: 25, streak: 60, languages: ['🇬🇧', '🇯🇵', '🇰🇷', '🇨🇳'], status: 'studying', lastActive: 'Đang học' },
];

const friendRequests: FriendRequest[] = [
  { id: 'r1', name: 'Đỗ Thanh Tùng', avatar: '🧑‍🎓', level: 8, mutualFriends: 3 },
  { id: 'r2', name: 'Ngô Thị Hương', avatar: '👩‍💼', level: 11, mutualFriends: 1 },
];

const statusColors = {
  online: 'bg-green-400',
  studying: 'bg-blue-400',
  offline: 'bg-gray-300',
};

const statusLabels = {
  online: 'Online',
  studying: 'Đang học',
  offline: 'Offline',
};

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'find'>('friends');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold font-display">Bạn bè</h1>
        <p className="text-muted-foreground mt-1">Kết nối và cùng nhau học tập</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-xl p-1">
        {[
          { key: 'friends' as const, label: 'Bạn bè', count: friends.length },
          { key: 'requests' as const, label: 'Lời mời', count: friendRequests.length },
          { key: 'find' as const, label: 'Tìm bạn', count: 0 },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-white dark:bg-gray-700 shadow-sm'
                : 'text-muted-foreground hover:text-gray-700'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.key ? 'bg-primary-100 text-primary-700' : 'bg-gray-200 text-muted-foreground'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'friends' && (
          <motion.div
            key="friends"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Search */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm bạn bè..."
              className="w-full p-3 rounded-xl border border-border/60 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 backdrop-blur-sm text-sm focus:border-primary focus:outline-none"
            />

            {/* Online friends */}
            <div className="space-y-2">
              {filteredFriends
                .sort((a, b) => {
                  const order = { studying: 0, online: 1, offline: 2 };
                  return order[a.status] - order[b.status];
                })
                .map((friend, index) => (
                  <motion.div
                    key={friend.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(index * 0.04, 0.4) }}
                    className="p-4 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 hover:shadow-md hover:shadow-purple-500/5 hover:border-primary/20 transition-all flex items-center gap-3"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl">
                        {friend.avatar}
                      </div>
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${statusColors[friend.status]}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">{friend.name}</p>
                        <span className="text-xs text-muted-foreground">Lv.{friend.level}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{friend.lastActive}</span>
                        <span className="text-xs">•</span>
                        <span className="text-xs text-orange-500">🔥 {friend.streak}</span>
                      </div>
                      <div className="flex gap-1 mt-1">
                        {friend.languages.map((lang, i) => (
                          <span key={i} className="text-xs">{lang}</span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">{friend.xp.toLocaleString()} XP</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'requests' && (
          <motion.div
            key="requests"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {friendRequests.length === 0 ? (
              <EmptyState
                icon={
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                }
                title="Không có lời mời nào"
                description="Khi ai đó gửi lời mời kết bạn, bạn sẽ thấy ở đây."
              />
            ) : (
              friendRequests.map((req, index) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(index * 0.04, 0.4) }}
                  className="p-4 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 hover:shadow-md hover:shadow-purple-500/5 hover:border-primary/20 transition-all flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl">
                    {req.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{req.name}</p>
                    <p className="text-xs text-muted-foreground">Level {req.level} • {req.mutualFriends} bạn chung</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Chấp nhận</Button>
                    <Button size="sm" variant="outline">Từ chối</Button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {activeTab === 'find' && (
          <motion.div
            key="find"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Nhập tên hoặc email..."
              className="w-full p-3 rounded-xl border border-border/60 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 backdrop-blur-sm text-sm focus:border-primary focus:outline-none"
            />

            <div className="text-center py-8">
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                  <Search className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-muted-foreground text-sm">Tìm bạn bè bằng tên hoặc email</p>
              <p className="text-xs text-muted-foreground mt-1">Mời bạn bè cùng học để tăng động lực!</p>
            </div>

            {/* Suggested friends */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">Gợi ý kết bạn</p>
              <div className="space-y-2">
                {[
                  { name: 'Bùi Thị Ngọc', avatar: '👩‍🎨', level: 9, reason: '3 bạn chung' },
                  { name: 'Lý Văn Đạt', avatar: '🧑‍💻', level: 14, reason: 'Cùng học English' },
                  { name: 'Trương Minh Châu', avatar: '👩‍🔬', level: 6, reason: '2 bạn chung' },
                ].map((suggestion, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(i * 0.04, 0.4) }}
                    className="p-3 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 hover:shadow-md hover:shadow-purple-500/5 hover:border-primary/20 transition-all flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl">
                      {suggestion.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{suggestion.name}</p>
                      <p className="text-xs text-muted-foreground">Lv.{suggestion.level} • {suggestion.reason}</p>
                    </div>
                    <Button size="sm" variant="outline">Kết bạn</Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
