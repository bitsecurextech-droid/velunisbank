import { create } from 'zustand';
import api from '@/lib/api';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
  login: (access: string, refresh: string, user: any) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  refreshToken: null,
  user: null,

  login: (access, refresh, user) =>
    set({ accessToken: access, refreshToken: refresh, user }),

  logout: () =>
    set({ accessToken: null, refreshToken: null, user: null }),

  refreshUser: async () => {
    const { accessToken, user } = get();
    if (!accessToken) return;
    try {
      const res = await api.get('/users/profile');
      set({ user: { ...user, ...res.data } });
    } catch (err) {
      console.error('Failed to refresh user profile', err);
    }
  },
}));