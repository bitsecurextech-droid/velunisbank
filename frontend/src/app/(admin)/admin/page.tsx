'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, transactions: 0, pendingKYC: 0, pendingDeposits: 0 })

  useEffect(() => {
    Promise.all([
      api.get('/admin/users').then(r => r.data.length),
      api.get('/admin/transactions').then(r => r.data.length),
      api.get('/admin/kyc').then(r => r.data.filter((k: any) => k.status === 'PENDING').length),
      api.get('/admin/deposits').then(r => r.data.filter((d: any) => d.status === 'PENDING').length),
    ]).then(([users, transactions, kyc, deposits]) => {
      setStats({ users, transactions, pendingKYC: kyc, pendingDeposits: deposits })
    }).catch(() => {})
  }, [])

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        Admin Dashboard
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <StatCard title="Total Users" value={stats.users} color="#001f3f" />
        <StatCard title="Total Transactions" value={stats.transactions} color="#001f3f" />
        <StatCard title="Pending KYC" value={stats.pendingKYC} color="#D4AF37" />
        <StatCard title="Pending Deposits" value={stats.pendingDeposits} color="#D4AF37" />
      </div>
    </div>
  )
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #eef3fc', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
      <p style={{ color: '#5b6e8c', fontSize: '14px' }}>{title}</p>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color }}>{value}</p>
    </div>
  )
}