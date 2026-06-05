'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    api.get('/transactions')
      .then(res => {
        // Use the first 5 transactions from the backend, or fallback to sample data
        if (res.data && res.data.length > 0) {
          setTransactions(res.data.slice(0, 5))
        } else {
          setTransactions([
            { id: 1, description: 'Amazon Store', amount: 125.50, type: 'DEBIT' },
            { id: 2, description: 'Apple Store', amount: 199.00, type: 'DEBIT' },
            { id: 3, description: 'Deposit', amount: 500.00, type: 'CREDIT' },
          ])
        }
      })
      .catch(() => {
        setTransactions([
          { id: 1, description: 'Amazon Store', amount: 125.50, type: 'DEBIT' },
          { id: 2, description: 'Apple Store', amount: 199.00, type: 'DEBIT' },
          { id: 3, description: 'Deposit', amount: 500.00, type: 'CREDIT' },
        ])
      })
  }, [])

  if (transactions.length === 0) {
    return <p style={{ color: '#5b6e8c' }}>No recent transactions.</p>
  }

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: '24px',
        border: '1px solid #eef3fc',
        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
      }}
    >
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.4rem',
          color: '#001f3f',
          marginBottom: '16px',
        }}
      >
        Recent Transactions
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {transactions.map((txn: any) => (
          <div
            key={txn.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid #f0f3f8',
              paddingBottom: '10px',
            }}
          >
            <span style={{ color: '#334e68' }}>{txn.description}</span>
            <span
              style={{
                fontWeight: 600,
                color: txn.type === 'CREDIT' ? '#2D6A4F' : '#8B0000',
              }}
            >
              {txn.type === 'CREDIT' ? '+' : '-'}${Math.abs(txn.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}