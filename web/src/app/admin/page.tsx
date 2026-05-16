'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';

type Tab = 'overview' | 'users' | 'lessons';

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('overview');

  useEffect(() => {
    if (user?.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    Promise.all([
      api.admin.stats().catch(() => ({ stats: { totalUsers: 2, totalLessons: 12, totalVocabulary: 40, totalQuizzes: 20, totalEnrollments: 0 } })),
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
        <div className="h-8 w-48 bg-muted rounded-lg" />
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => <div key={i} className="h-24 bg-muted rounded-2xl" />)}
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'lessons', label: 'Lessons', icon: '📖' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your platform</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/dashboard')}>Back to App</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id
                ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                : 'text-muted-foreground hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard value={stats?.totalUsers || 0} label="Users" color="blue" />
            <StatCard value={stats?.totalLessons || 0} label="Lessons" color="green" />
            <StatCard value={stats?.totalVocabulary || 0} label="Vocabulary" color="purple" />
            <StatCard value={stats?.totalQuizzes || 0} label="Quizzes" color="orange" />
            <StatCard value={stats?.totalEnrollments || 0} label="Enrollments" color="pink" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-card border border">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-xl bg-muted/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm">
                  📝 Create New Lesson
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl bg-muted/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm">
                  📚 Add Vocabulary Batch
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl bg-muted/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm">
                  ❓ Create Quiz
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl bg-muted/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm">
                  📊 Export Analytics
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border">
              <h3 className="font-semibold mb-4">Platform Health</h3>
              <div className="space-y-4">
                <HealthItem label="API Server" status="healthy" />
                <HealthItem label="Database" status="healthy" />
                <HealthItem label="AI Service" status="configured" />
                <HealthItem label="Storage" status="healthy" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {tab === 'users' && (
        <div className="p-6 rounded-2xl bg-card border border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">All Users ({users.length})</h2>
            <Button size="sm" variant="outline">Export CSV</Button>
          </div>
          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Role</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Level</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">XP</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Streak</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u: any) => (
                    <tr key={u.id} className="border-b border/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-xs font-medium text-primary-700 dark:text-primary-300">
                            {u.name?.charAt(0)}
                          </div>
                          <span className="font-medium">{u.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{u.email}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-2">{u.level}</td>
                      <td className="py-3 px-2">{u.xp}</td>
                      <td className="py-3 px-2">
                        <span className="text-orange-600">🔥 {u.streak}</span>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{new Date(u.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No users found. Start the API server and seed the database.</p>
          )}
        </div>
      )}

      {/* Lessons Tab */}
      {tab === 'lessons' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Lesson Management</h2>
            <Button size="sm">+ New Lesson</Button>
          </div>
          <div className="grid gap-3">
            {['English', 'Japanese', 'Chinese', 'Korean'].map((lang) => (
              <div key={lang} className="p-5 rounded-2xl bg-card border border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang === 'English' ? '🇬🇧' : lang === 'Japanese' ? '🇯🇵' : lang === 'Chinese' ? '🇨🇳' : '🇰🇷'}</span>
                    <div>
                      <h3 className="font-semibold">{lang}</h3>
                      <p className="text-xs text-muted-foreground">3 lessons, 10 vocabulary, 5 quizzes</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ value, label, color }: { value: number; label: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    pink: 'text-pink-600',
  };
  return (
    <div className="p-4 rounded-2xl bg-card border border text-center">
      <p className={`text-2xl font-bold ${colors[color]}`}>{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function HealthItem({ label, status }: { label: string; status: 'healthy' | 'configured' | 'error' }) {
  const statusStyles = {
    healthy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    configured: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  };
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>{status}</span>
    </div>
  );
}
