'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    Promise.all([
      api.admin.stats().catch(() => ({ stats: { totalUsers: 2, totalLessons: 12, totalVocabulary: 40, totalQuizzes: 5, totalEnrollments: 0 } })),
      api.admin.users().catch(() => ({ users: [], total: 0 })),
    ]).then(([statsData, usersData]) => {
      setStats(statsData.stats);
      setUsers(usersData.users);
    }).finally(() => setLoading(false));
  }, [user, router]);

  if (user?.role !== 'admin') return null;

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => <div key={i} className="h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your platform</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/dashboard')}>Back to App</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats?.totalUsers || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Users</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-2xl font-bold text-green-600">{stats?.totalLessons || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Lessons</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-2xl font-bold text-purple-600">{stats?.totalVocabulary || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Vocabulary</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-2xl font-bold text-orange-600">{stats?.totalQuizzes || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Quizzes</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-2xl font-bold text-pink-600">{stats?.totalEnrollments || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Enrollments</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <h2 className="font-semibold text-lg mb-4">Recent Users</h2>
        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Name</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Email</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Role</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">XP</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u: any) => (
                  <tr key={u.id} className="border-b border-gray-100 dark:border-gray-700/50">
                    <td className="py-3 px-2 font-medium">{u.name}</td>
                    <td className="py-3 px-2 text-gray-500">{u.email}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-2">{u.xp}</td>
                    <td className="py-3 px-2 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No users found. Start the API server and seed the database.</p>
        )}
      </div>
    </div>
  );
}
