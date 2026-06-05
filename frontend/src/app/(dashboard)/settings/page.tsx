'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'

export default function SettingsPage() {
  const [profile, setProfile] = useState({ firstName: '', lastName: '', phone: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.get('/users/profile').then(res => {
      setProfile({
        firstName: res.data.firstName || '',
        lastName: res.data.lastName || '',
        phone: res.data.phone || '',
      })
    }).catch(() => {})
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.put('/users/profile', profile)
      setMessage('Profile updated.')
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Failed to update')
    }
  }

  return (
    <div style={{ maxWidth: '600px' }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        Settings
      </h1>
      <form onSubmit={handleSave} style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #eef3fc', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        <input placeholder="First Name" value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} style={inputStyle} />
        <input placeholder="Last Name" value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} style={inputStyle} />
        <input placeholder="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} style={inputStyle} />
        <button type="submit" style={{ width: '100%', background: '#001f3f', color: 'white', border: 'none', padding: '14px', borderRadius: '30px', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
          Save Changes
        </button>
        {message && <p style={{ marginTop: '10px', color: '#2D6A4F' }}>{message}</p>}
      </form>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e0e4ea', background: '#f9fafc', marginBottom: '16px', fontSize: '1rem', color: '#001f3f',
}