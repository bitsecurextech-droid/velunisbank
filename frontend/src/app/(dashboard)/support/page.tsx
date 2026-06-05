'use client'

import { useState } from 'react'
import api from '@/lib/api'

export default function SupportPage() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await api.post('/support', { subject, message })
      setSuccess('Ticket created. Our team will respond shortly.')
      setSubject('')
      setMessage('')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit')
    }
  }

  return (
    <div style={{ maxWidth: '600px' }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        Support
      </h1>
      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #eef3fc', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        {error && <p style={{ color: '#8B0000', marginBottom: '12px' }}>{error}</p>}
        {success && <p style={{ color: '#2D6A4F', marginBottom: '12px' }}>{success}</p>}
        <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} style={inputStyle} required />
        <textarea placeholder="Describe your issue" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} style={{ ...inputStyle, height: '100px' }} required />
        <button type="submit" style={{ width: '100%', background: '#001f3f', color: 'white', border: 'none', padding: '14px', borderRadius: '30px', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
          Submit Ticket
        </button>
      </form>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e0e4ea', background: '#f9fafc', marginBottom: '16px', fontSize: '1rem', color: '#001f3f',
}