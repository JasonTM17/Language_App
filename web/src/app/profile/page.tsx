'use client';

import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold font-display">Profile</h1>

      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <p className="text-xs text-gray-400 mt-1">Level {user?.level || 1} • {user?.xp || 0} XP</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
          <div className="text-center">
            <p className="text-xl font-bold text-orange-600">{user?.streak || 0}</p>
            <p className="text-xs text-gray-500">Streak</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-primary-600">{user?.xp || 0}</p>
            <p className="text-xs text-gray-500">Total XP</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-green-600">{user?.level || 1}</p>
            <p className="text-xs text-gray-500">Level</p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-4">
        <h3 className="font-semibold">Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700">
            <span className="text-sm">Notifications</span>
            <span className="text-sm text-gray-500">On</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700">
            <span className="text-sm">Daily Goal</span>
            <span className="text-sm text-gray-500">10 min/day</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700">
            <span className="text-sm">Theme</span>
            <span className="text-sm text-gray-500">System</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        {user?.role === 'admin' && (
          <Link href="/admin" className="flex-1">
            <Button variant="outline" className="w-full">Admin Panel</Button>
          </Link>
        )}
        <Button variant="destructive" onClick={logout} className="flex-1">Log Out</Button>
      </div>
    </div>
  );
}
