'use client';

import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-8">
      <h1 className="text-2xl font-bold font-display">Hồ sơ</h1>

      <div className="p-6 rounded-2xl bg-card border">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-2xl font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <p className="text-xs text-muted-foreground mt-1">Cấp {user?.level || 1} • {user?.xp || 0} XP</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-muted/50">
          <div className="text-center">
            <p className="text-xl font-bold text-orange-600">{user?.streak || 0}</p>
            <p className="text-xs text-muted-foreground">Streak</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-primary">{user?.xp || 0}</p>
            <p className="text-xs text-muted-foreground">Tổng XP</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-green-600">{user?.level || 1}</p>
            <p className="text-xs text-muted-foreground">Cấp độ</p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-card border space-y-4">
        <h3 className="font-semibold">Cài đặt</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
            <span className="text-sm">Thông báo</span>
            <span className="text-sm text-muted-foreground">Bật</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
            <span className="text-sm">Mục tiêu hàng ngày</span>
            <span className="text-sm text-muted-foreground">10 phút/ngày</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
            <span className="text-sm">Giao diện</span>
            <span className="text-sm text-muted-foreground">Hệ thống</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        {user?.role === 'admin' && (
          <Link href="/admin" className="flex-1">
            <Button variant="outline" className="w-full">Quản trị</Button>
          </Link>
        )}
        <Button variant="destructive" onClick={logout} className="flex-1">Đăng xuất</Button>
      </div>
    </div>
  );
}
