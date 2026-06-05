'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

export default function LoansPage() {
  const [loans, setLoans] = useState<any[]>([])
  const [amount, setAmount] = useState('')
  const [term, setTerm] = useState('12')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const fetchLoans = () => {
    api.get('/loans').then(res => setLoans(res.data)).catch(() => {})
  }

  useEffect(() => { fetchLoans() }, [])

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    try {
      const res = await api.post('/loans/apply', { amount: parseFloat(amount), termMonths: parseInt(term) })
      setMessage(`Loan approved! Monthly payment: $${res.data.monthlyPayment.toFixed(2)}`)
      setAmount('')
      setTerm('12')
      fetchLoans()
    } catch (err: any) {
      setError(err.response?.data?.error || 'Application failed')
    }
  }

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        Loans
      </h1>

      {/* Apply Form */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #eef3fc', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', marginBottom: '30px' }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#001f3f', marginBottom: '16px' }}>Apply for a Loan</h3>
        {error && <p style={{ color: '#8B0000', marginBottom: '12px' }}>{error}</p>}
        {message && <p style={{ color: '#2D6A4F', marginBottom: '12px' }}>{message}</p>}
        <form onSubmit={handleApply} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} style={inputStyle} required />
          <select value={term} onChange={e => setTerm(e.target.value)} style={inputStyle}>
            <option value="6">6 months</option>
            <option value="12">12 months</option>
            <option value="24">24 months</option>
            <option value="36">36 months</option>
          </select>
          <button type="submit" style={{ background: '#001f3f', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '30px', fontWeight: 600, cursor: 'pointer' }}>
            Apply Now
          </button>
        </form>
      </div>

      {/* Active Loans */}
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#001f3f', marginBottom: '16px' }}>My Loans</h2>
      {loans.length === 0 ? (
        <p style={{ color: '#5b6e8c' }}>No active loans.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loans.map((loan: any) => (
            <div key={loan.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #eef3fc', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <p style={{ fontWeight: 600, color: '#001f3f' }}>Amount: ${loan.amount.toLocaleString()}</p>
                  <p style={{ color: '#5b6e8c', fontSize: '14px' }}>Interest Rate: {loan.interestRate}% | Term: {loan.termMonths} months</p>
                  <p style={{ color: '#5b6e8c', fontSize: '14px' }}>Remaining: ${loan.remainingAmount.toFixed(2)}</p>
                  <p style={{ color: loan.status === 'ACTIVE' ? '#2D6A4F' : '#8B0000', fontWeight: 600 }}>Status: {loan.status}</p>
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#001f3f', marginBottom: '8px' }}>Repayments</h4>
                  {loan.repayments?.slice(0, 3).map((r: any) => (
                    <p key={r.id} style={{ fontSize: '13px', color: r.status === 'PAID' ? '#2D6A4F' : '#5b6e8c' }}>
                      ${r.amount.toFixed(2)} due {new Date(r.dueDate).toLocaleDateString()} – {r.status}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  padding: '12px', borderRadius: '12px', border: '1px solid #e0e4ea', background: '#f9fafc', fontSize: '1rem', color: '#001f3f', minWidth: '150px',
}