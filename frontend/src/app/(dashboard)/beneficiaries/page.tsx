'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

export default function BeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState<any[]>([])
  const [name, setName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [bankName, setBankName] = useState('')
  const [swift, setSwift] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchBens = () => {
    api.get('/beneficiaries').then(res => setBeneficiaries(res.data)).catch(() => {})
  }

  useEffect(() => { fetchBens() }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/beneficiaries', { name, accountNumber, bankName, swift, country: 'US', currency: 'USD' })
      setName(''); setAccountNumber(''); setBankName(''); setSwift('')
      setMessage('Beneficiary added.')
      fetchBens()
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Failed to add')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
      <div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
          Beneficiaries
        </h1>
        {beneficiaries.length === 0 ? (
          <p style={{ color: '#5b6e8c' }}>No beneficiaries saved.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {beneficiaries.map((b: any) => (
              <div key={b.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #eef3fc' }}>
                <p style={{ fontWeight: 600, color: '#001f3f' }}>{b.name}</p>
                <p style={{ fontSize: '14px', color: '#5b6e8c' }}>Account: {b.accountNumber}</p>
                {b.bankName && <p style={{ fontSize: '14px', color: '#5b6e8c' }}>Bank: {b.bankName}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#001f3f', marginBottom: '16px' }}>
          Add Beneficiary
        </h2>
        <form onSubmit={handleAdd} style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #eef3fc' }}>
          <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required />
          <input placeholder="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} style={inputStyle} required />
          <input placeholder="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} style={inputStyle} />
          <input placeholder="SWIFT Code" value={swift} onChange={(e) => setSwift(e.target.value)} style={inputStyle} />
          <button type="submit" disabled={loading} style={{ width: '100%', background: '#001f3f', color: 'white', border: 'none', padding: '12px', borderRadius: '30px', fontWeight: 700, cursor: 'pointer' }}>
            {loading ? 'Adding…' : 'Add'}
          </button>
          {message && <p style={{ marginTop: '10px', color: '#2D6A4F' }}>{message}</p>}
        </form>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e0e4ea', background: '#f9fafc', marginBottom: '14px', fontSize: '1rem', color: '#001f3f',
}