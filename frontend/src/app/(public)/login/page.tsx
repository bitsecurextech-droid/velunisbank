'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totp, setTotp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Show success message if redirected from registration
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMsg('Account created successfully. Please sign in.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password, totpCode: totp || undefined });
      useAuthStore.getState().login(data.accessToken, data.refreshToken, data.user);
      // Redirect based on role
      if (data.user.role === 'ADMIN' || data.user.role === 'SUPER_ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f4f6fb', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '40px', maxWidth: '440px', width: '100%', boxShadow: '0 12px 30px rgba(0,0,0,0.05)', border: '1px solid #eef3fc' }}>
        {/* Logo and title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img
            src="https://res.cloudinary.com/dkomucpin/image/upload/v1780595302/velunis_icon_favicon_zpbqv2.png"
            alt="Velunis Bank"
            style={{ height: '48px', marginBottom: '12px' }}
          />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f' }}>Welcome Back</h2>
          <p style={{ color: '#4a5b7a', marginTop: '4px' }}>Sign in to your Velunis account</p>
        </div>

        {/* Success / Error messages */}
        {successMsg && <p style={{ color: '#2D6A4F', textAlign: 'center', marginBottom: '16px' }}>{successMsg}</p>}
        {error && <p style={{ color: '#8B0000', textAlign: 'center', marginBottom: '16px' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="2FA Code (if enabled)"
            value={totp}
            onChange={(e) => setTotp(e.target.value)}
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: '#001f3f',
              color: 'white',
              border: 'none',
              padding: '14px',
              borderRadius: '40px',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
              marginTop: '8px',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', color: '#5b6e8c' }}>
          <p style={{ marginBottom: '8px' }}>
            <a href="/forgot-password" style={{ color: '#D4AF37', textDecoration: 'none' }}>Forgot your password?</a>
          </p>
          <p>
            Don't have an account?{' '}
            <Link href="/open-account" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: 600 }}>
              Open Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  borderRadius: '12px',
  border: '1px solid #e0e4ea',
  background: '#f9fafc',
  marginBottom: '16px',
  fontSize: '1rem',
  color: '#001f3f',
};