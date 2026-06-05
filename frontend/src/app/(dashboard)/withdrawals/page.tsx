'use client'

import { useState } from 'react'
import api from '@/lib/api'

export default function WithdrawalsPage() {
  const [form, setForm] = useState({
    amount: '',
    pin: '',
    recipientName: '',
    accountNumber: '',
    routingNumber: '',
    bankName: '',
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    if (form.pin.length !== 4 || !/^\d+$/.test(form.pin)) {
      setError('PIN must be 4 digits')
      return
    }
    setLoading(true)
    try {
      await api.post('/withdrawals', {
        amount: parseFloat(form.amount),
        pin: form.pin,
        recipientName: form.recipientName,
        accountNumber: form.accountNumber,
        routingNumber: form.routingNumber,
        bankName: form.bankName,
      })
      setMessage('Withdrawal request submitted for approval.')
      setForm({ amount: '', pin: '', recipientName: '', accountNumber: '', routingNumber: '', bankName: '' })
    } catch (err: any) {
      setError(err.response?.data?.error || 'Withdrawal failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px' }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        Withdraw Funds
      </h1>
      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #eef3fc', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        {error && <p style={{ color: '#8B0000', marginBottom: '12px' }}>{error}</p>}
        {message && <p style={{ color: '#2D6A4F', marginBottom: '12px' }}>{message}</p>}
        <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} style={inputStyle} required />
        <input name="pin" type="password" maxLength={4} placeholder="Transaction PIN" value={form.pin} onChange={handleChange} style={inputStyle} required />
        <input name="recipientName" placeholder="Recipient Name" value={form.recipientName} onChange={handleChange} style={inputStyle} required />
        <input name="accountNumber" placeholder="Recipient Account Number" value={form.accountNumber} onChange={handleChange} style={inputStyle} required />
        <input name="routingNumber" placeholder="Routing Number" value={form.routingNumber} onChange={handleChange} style={inputStyle} />
        <input name="bankName" placeholder="Bank Name" value={form.bankName} onChange={handleChange} style={inputStyle} />
        <button type="submit" disabled={loading} style={{ width: '100%', background: '#001f3f', color: 'white', border: 'none', padding: '14px', borderRadius: '30px', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
          {loading ? 'Processing...' : 'Submit Withdrawal'}
        </button>
      </form>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e0e4ea', background: '#f9fafc', marginBottom: '16px', fontSize: '1rem', color: '#001f3f',
}