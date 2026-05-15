const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface RequestOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
  };

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    throw new ApiError('Session expired', 401);
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new ApiError(error.error || `HTTP ${response.status}`, response.status);
  }

  return response.json();
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  xp: number;
  level: number;
  streak: number;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface DashboardStats {
  xp: number;
  level: number;
  streak: number;
  completedLessons: number;
  quizAccuracy: number;
}

export interface DashboardData {
  stats: DashboardStats;
  enrollments: any[];
  recentProgress: any[];
}

export interface ChatSession {
  id: string;
  language: string;
  role: string;
  messages: any[];
}

export interface ChatResponse {
  response: { content: string; corrections: string[]; suggestion: string; language: string };
  messages: any[];
}

export const api = {
  auth: {
    login: (data: { email: string; password: string }) => request<AuthResponse>('/auth/login', { method: 'POST', body: data }),
    register: (data: { email: string; password: string; name: string }) => request<AuthResponse>('/auth/register', { method: 'POST', body: data }),
    me: () => request<{ user: User }>('/auth/me'),
    logout: () => request<{ message: string }>('/auth/logout', { method: 'POST' }),
  },
  languages: {
    list: () => request<{ languages: any[] }>('/languages'),
    get: (code: string) => request<{ language: any }>(`/languages/${code}`),
    enroll: (code: string, data: { goal?: string; levelId?: string }) => request<{ enrollment: any }>(`/languages/${code}/enroll`, { method: 'POST', body: data }),
  },
  lessons: {
    list: (params?: { languageCode?: string; levelId?: string }) => {
      const query = params ? '?' + new URLSearchParams(params as any).toString() : '';
      return request<{ lessons: any[] }>(`/lessons${query}`);
    },
    get: (id: string) => request<{ lesson: any }>(`/lessons/${id}`),
    complete: (id: string, data: { score?: number; timeSpent?: number }) => request<{ progress: any }>(`/lessons/${id}/complete`, { method: 'POST', body: data }),
  },
  vocabulary: {
    list: (lessonId?: string, due?: boolean) => {
      const params = new URLSearchParams();
      if (lessonId) params.set('lessonId', lessonId);
      if (due) params.set('due', 'true');
      const query = params.toString() ? `?${params.toString()}` : '';
      return request<{ vocabulary: any[]; total?: number; due?: number }>(`/vocabulary${query}`);
    },
    review: (id: string, known: boolean) => request<{ progress: any }>(`/vocabulary/${id}/review`, { method: 'POST', body: { known } }),
  },
  quiz: {
    getByLesson: (lessonId: string) => request<{ quizzes: any[] }>(`/quiz/lesson/${lessonId}`),
    practice: (params?: { language?: string; limit?: number }) => {
      const query = params ? '?' + new URLSearchParams(params as any).toString() : '';
      return request<{ quizzes: any[]; total: number }>(`/quiz/practice${query}`);
    },
    attempt: (id: string, data: { answer: string; timeSpent?: number }) => request<{ attempt: any; correct: boolean; explanation: string }>(`/quiz/${id}/attempt`, { method: 'POST', body: data }),
  },
  progress: {
    dashboard: () => request<DashboardData>('/progress/dashboard'),
    streak: () => request<{ streak: number }>('/progress/streak'),
  },
  chat: {
    start: (data: { language: string; role: string }) => request<{ session: ChatSession }>('/chat/start', { method: 'POST', body: data }),
    sendMessage: (sessionId: string, message: string) => request<ChatResponse>(`/chat/${sessionId}/message`, { method: 'POST', body: { message } }),
    sessions: () => request<{ sessions: ChatSession[] }>('/chat/sessions'),
  },
  admin: {
    stats: () => request<any>('/admin/stats'),
    users: (page?: number) => request<any>(`/admin/users?page=${page || 1}`),
    lessons: () => request<any>('/admin/lessons'),
    createLesson: (data: any) => request<any>('/admin/lessons', { method: 'POST', body: data }),
    updateLesson: (id: string, data: any) => request<any>(`/admin/lessons/${id}`, { method: 'PUT', body: data }),
    deleteLesson: (id: string) => request<any>(`/admin/lessons/${id}`, { method: 'DELETE' }),
  },
};
