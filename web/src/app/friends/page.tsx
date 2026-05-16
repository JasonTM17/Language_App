'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/states';

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
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Bạn bè</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Kết nối và cùng nhau học tập</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
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
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.key ? 'bg-primary-100 text-primary-700' : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'friends' && (
        <div className="space-y-4">
          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm bạn bè..."
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:border-primary-500 focus:outline-none"
          />

          {/* Online friends */}
          <div className="space-y-2">
            {filteredFriends
              .sort((a, b) => {
                const order = { studying: 0, online: 1, offline: 2 };
                return order[a.status] - order[b.status];
              })
              .map((friend) => (
                <div key={friend.id} className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl">
                      {friend.avatar}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${statusColors[friend.status]}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{friend.name}</p>
                      <span className="text-xs text-gray-400">Lv.{friend.level}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500">{friend.lastActive}</span>
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
                    <p className="text-sm font-medium text-primary-600">{friend.xp.toLocaleString()} XP</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-3">
          {friendRequests.length === 0 ? (
            <EmptyState
              icon="📭"
              title="Không có lời mời nào"
              description="Khi ai đó gửi lời mời kết bạn, bạn sẽ thấy ở đây."
            />
          ) : (
            friendRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl">
                  {req.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{req.name}</p>
                  <p className="text-xs text-gray-500">Level {req.level} • {req.mutualFriends} bạn chung</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Chấp nhận</Button>
                  <Button size="sm" variant="outline">Từ chối</Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'find' && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nhập tên hoặc email..."
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:border-primary-500 focus:outline-none"
          />

          <div className="text-center py-8">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-500 text-sm">Tìm bạn bè bằng tên hoặc email</p>
            <p className="text-xs text-gray-400 mt-1">Mời bạn bè cùng học để tăng động lực!</p>
          </div>

          {/* Suggested friends */}
          <div>
            <p className="text-sm font-medium text-gray-500 mb-3">Gợi ý kết bạn</p>
            <div className="space-y-2">
              {[
                { name: 'Bùi Thị Ngọc', avatar: '👩‍🎨', level: 9, reason: '3 bạn chung' },
                { name: 'Lý Văn Đạt', avatar: '🧑‍💻', level: 14, reason: 'Cùng học English' },
                { name: 'Trương Minh Châu', avatar: '👩‍🔬', level: 6, reason: '2 bạn chung' },
              ].map((suggestion, i) => (
                <div key={i} className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl">
                    {suggestion.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{suggestion.name}</p>
                    <p className="text-xs text-gray-500">Lv.{suggestion.level} • {suggestion.reason}</p>
                  </div>
                  <Button size="sm" variant="outline">Kết bạn</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
