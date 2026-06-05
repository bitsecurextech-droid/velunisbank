'use client'

import { useEffect, useState, useRef } from 'react'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>({})
  const [message, setMessage] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    api.get('/users/profile').then(res => setProfile(res.data)).catch(() => {})
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fd = new FormData()
    fd.append('avatar', file)
    try {
      const res = await api.post('/users/avatar', fd)
      setProfile({ ...profile, avatarUrl: res.data.avatarUrl })
      setMessage('Avatar updated')
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Upload failed')
    }
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        My Profile
      </h1>
      {message && <p style={{ color: '#2D6A4F', marginBottom: '16px' }}>{message}</p>}
      <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #eef3fc', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <img
            src={profile.avatarUrl || 'https://via.placeholder.com/80'}
            alt="Avatar"
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #D4AF37' }}
          />
          <div>
            <button
              onClick={() => fileRef.current?.click()}
              style={{ background: '#001f3f', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer' }}
            >
              Change Photo
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
          </div>
        </div>

        {/* Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone || '—'}</p>
          <p><strong>Date of Birth:</strong> {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : '—'}</p>
          <p><strong>Country:</strong> {profile.country}</p>
          <p><strong>Currency:</strong> {profile.currency}</p>
          <p><strong>Address:</strong> {profile.addressLine1}, {profile.city}, {profile.state} {profile.postalCode}</p>
          <p><strong>Employment:</strong> {profile.employmentStatus || '—'}</p>
          <p><strong>Annual Income:</strong> ${profile.annualIncome?.toLocaleString() || '—'}</p>
          <p><strong>Source of Funds:</strong> {profile.sourceOfFunds || '—'}</p>
          <p><strong>Account Type Requested:</strong> {profile.accountTypeRequested || '—'}</p>
          <p><strong>KYC Status:</strong> {profile.kycStatus}</p>
          <p><strong>PIN Set:</strong> {profile.isPinSet ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  )
}