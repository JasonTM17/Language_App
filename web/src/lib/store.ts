import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  xp: number;
  level: number;
  streak: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasHydrated: false,
      setAuth: (user, token) => {
        if (typeof window !== 'undefined') localStorage.setItem('token', token);
        set({ user, token, isAuthenticated: true, hasHydrated: true });
      },
      logout: () => {
        if (typeof window !== 'undefined') localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      },
      updateUser: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null,
      })),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'linguaflow-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

interface AppState {
  currentLanguage: string | null;
  sidebarOpen: boolean;
  setCurrentLanguage: (code: string) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentLanguage: null,
  sidebarOpen: true,
  setCurrentLanguage: (code) => set({ currentLanguage: code }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
