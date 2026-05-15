const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface RequestOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
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

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  auth: {
    login: (data: { email: string; password: string }) => request<any>('/auth/login', { method: 'POST', body: data }),
    register: (data: { email: string; password: string; name: string }) => request<any>('/auth/register', { method: 'POST', body: data }),
    me: () => request<any>('/auth/me'),
    logout: () => request<any>('/auth/logout', { method: 'POST' }),
  },
  languages: {
    list: () => request<any>('/languages'),
    get: (code: string) => request<any>(`/languages/${code}`),
    enroll: (code: string, data: { goal?: string; levelId?: string }) => request<any>(`/languages/${code}/enroll`, { method: 'POST', body: data }),
  },
  lessons: {
    list: (params?: { languageCode?: string; levelId?: string }) => {
      const query = params ? '?' + new URLSearchParams(params as any).toString() : '';
      return request<any>(`/lessons${query}`);
    },
    get: (id: string) => request<any>(`/lessons/${id}`),
    complete: (id: string, data: { score: number; timeSpent: number }) => request<any>(`/lessons/${id}/complete`, { method: 'POST', body: data }),
  },
  vocabulary: {
    list: (lessonId?: string) => request<any>(`/vocabulary${lessonId ? `?lessonId=${lessonId}` : ''}`),
    review: (id: string, known: boolean) => request<any>(`/vocabulary/${id}/review`, { method: 'POST', body: { known } }),
  },
  quiz: {
    getByLesson: (lessonId: string) => request<any>(`/quiz/lesson/${lessonId}`),
    attempt: (id: string, data: { answer: string; timeSpent?: number }) => request<any>(`/quiz/${id}/attempt`, { method: 'POST', body: data }),
  },
  progress: {
    dashboard: () => request<any>('/progress/dashboard'),
    streak: () => request<any>('/progress/streak'),
  },
  chat: {
    start: (data: { language: string; role: string }) => request<any>('/chat/start', { method: 'POST', body: data }),
    sendMessage: (sessionId: string, message: string) => request<any>(`/chat/${sessionId}/message`, { method: 'POST', body: { message } }),
    sessions: () => request<any>('/chat/sessions'),
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
