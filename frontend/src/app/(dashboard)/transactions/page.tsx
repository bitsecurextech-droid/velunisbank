'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/transactions')
      .then(res => setTransactions(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p style={{ color: '#5b6e8c' }}>Loading transactions…</p>

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        Transactions
      </h1>
      <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #eef3fc', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafd' }}>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#5b6e8c' }}>No transactions yet.</td>
              </tr>
            ) : (
              transactions.map((txn: any) => (
                <tr key={txn.id} style={{ borderTop: '1px solid #f0f3f8' }}>
                  <td style={tdStyle}>{new Date(txn.createdAt).toLocaleDateString()}</td>
                  <td style={tdStyle}>{txn.description}</td>
                  <td style={{ ...tdStyle, fontWeight: 600, color: txn.type === 'CREDIT' ? '#2D6A4F' : '#8B0000' }}>
                    {txn.type === 'CREDIT' ? '+' : '-'}{txn.currency} {Math.abs(txn.amount).toFixed(2)}
                  </td>
                  <td style={tdStyle}>{txn.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const thStyle: React.CSSProperties = {
  padding: '14px 16px', textAlign: 'left', fontWeight: 600, color: '#001f3f', fontSize: '14px',
}
const tdStyle: React.CSSProperties = {
  padding: '12px 16px', color: '#334e68', fontSize: '14px',
}