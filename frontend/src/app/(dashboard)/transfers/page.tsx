'use client'

import { useState } from 'react'
import api from '@/lib/api'

export default function TransfersPage() {
  const [accountNumber, setAccountNumber] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const lookupRecipient = async (value: string) => {
    if (value.length < 8) return
    try {
      const { data } = await api.get(`/transfers/lookup?accountNumber=${value}`)
      setRecipientName(data?.name || 'Not found')
    } catch {
      setRecipientName('Error looking up')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    try {
      await api.post('/transfers', { accountNumber, amount: parseFloat(amount), description })
      setMessage('Transfer initiated – pending admin approval.')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Transfer failed')
    }
  }

  return (
    <div style={{ maxWidth: '600px' }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        Transfer Money
      </h1>
      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #eef3fc', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        {error && <p style={{ color: '#8B0000', marginBottom: '12px' }}>{error}</p>}
        {message && <p style={{ color: '#2D6A4F', marginBottom: '12px' }}>{message}</p>}
        <input
          placeholder="Recipient Account Number"
          value={accountNumber}
          onChange={(e) => { setAccountNumber(e.target.value); lookupRecipient(e.target.value) }}
          style={inputStyle}
          required
        />
        {recipientName && <p style={{ marginBottom: '12px', color: '#5b6e8c' }}>Recipient: {recipientName}</p>}
        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={{ width: '100%', background: '#001f3f', color: 'white', border: 'none', padding: '14px', borderRadius: '30px', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
          Transfer
        </button>
      </form>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e0e4ea', background: '#f9fafc', marginBottom: '16px', fontSize: '1rem', color: '#001f3f',
}