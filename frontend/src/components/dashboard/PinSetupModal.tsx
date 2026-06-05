'use client'

import { useState } from 'react'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

export default function PinSetupModal({ onComplete }: { onComplete: () => void }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      setError('PIN must be exactly 4 digits')
      return
    }
    setLoading(true)
    try {
      await api.post('/pin/set', { pin })
      // Update local user state to reflect isPinSet = true
      useAuthStore.setState((state) => ({
        user: { ...state.user, isPinSet: true },
      }))
      onComplete()
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to set PIN')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
      >
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#001f3f', marginBottom: '8px' }}>
          Set Transaction PIN
        </h2>
        <p style={{ color: '#5b6e8c', marginBottom: '24px' }}>
          Create a 4‑digit PIN to secure withdrawals and transfers.
        </p>
        {error && <p style={{ color: '#8B0000', marginBottom: '12px' }}>{error}</p>}
        <input
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter 4‑digit PIN"
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: '1px solid #e0e4ea',
            background: '#f9fafc',
            marginBottom: '20px',
            fontSize: '1.2rem',
            textAlign: 'center',
            letterSpacing: '8px',
          }}
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
            borderRadius: '30px',
            fontWeight: 700,
            fontSize: '15px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Setting...' : 'Set PIN'}
        </button>
      </form>
    </div>
  )
}