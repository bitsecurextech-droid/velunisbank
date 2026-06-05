import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const login = async (email: string, password: string, totp?: string) => {
    setLoading(true);
    const { data } = await api.post('/auth/login', { email, password, totpCode: totp });
    useAuthStore.getState().login(data.accessToken, data.refreshToken, data.user);
    setLoading(false);
  };
  const register = async (form: any) => {
    setLoading(true);
    const { data } = await api.post('/auth/register', form);
    useAuthStore.getState().login(data.accessToken, data.refreshToken, data.user);
    setLoading(false);
  };
  const logout = () => useAuthStore.getState().logout();
  return { login, register, logout, loading };
}