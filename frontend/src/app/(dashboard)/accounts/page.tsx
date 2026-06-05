'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/accounts')
      .then(res => setAccounts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p style={{ color: '#5b6e8c' }}>Loading accounts…</p>

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        My Accounts
      </h1>
      {accounts.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #eef3fc' }}>
          <p style={{ color: '#5b6e8c' }}>No accounts yet. <a href="/open-account" style={{ color: '#D4AF37' }}>Open one now</a>.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {accounts.map((acc: any) => (
            <div key={acc.id} style={{
              background: 'white', borderRadius: '20px', padding: '24px',
              border: '1px solid #eef3fc', boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
            }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: '#001f3f', marginBottom: '12px' }}>
                {acc.accountType.replace('_', ' ')}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#5b6e8c', marginBottom: '16px' }}>
                Account Number: {acc.accountNumber}
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: '#001f3f' }}>
                {acc.currency} {acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                <button style={smallBtn}>Details</button>
                <button style={smallBtn}>Statements</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const smallBtn: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid #cdd9ed',
  padding: '6px 14px',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: 500,
  cursor: 'pointer',
  color: '#001f3f',
}