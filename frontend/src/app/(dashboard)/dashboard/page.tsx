'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'
import BalanceCard from '@/components/dashboard/BalanceCard'
import QuickActions from '@/components/dashboard/QuickActions'
import RecentTransactions from '@/components/dashboard/RecentTransactions'

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [userName, setUserName] = useState('')
  const [activity, setActivity] = useState<any>({})

  useEffect(() => {
    // Fetch accounts
    api.get('/accounts')
      .then(res => setAccounts(res.data || []))
      .catch(() => {})

    // Fetch user profile (for name and activity logs)
    api.get('/users/profile')
      .then(res => {
        const profile = res.data
        setUserName(profile.firstName || '')
        setActivity({
          lastLogin: profile.lastLogin,
          lastLoginIp: profile.lastLoginIp,
          dailyTransferLimit: profile.dailyTransferLimit || 'Not set',
          dailyWithdrawalLimit: profile.dailyWithdrawalLimit || 'Not set',
          accountTypeRequested: profile.accountTypeRequested || 'Personal',
        })
      })
      .catch(() => {})
  }, [])

  const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0)
  const checking = accounts.find(a => a.accountType === 'CHECKING')?.balance || 0
  const savings = accounts.find(a => a.accountType === 'SAVINGS')?.balance || 0

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        Welcome Back{userName ? `, ${userName}` : ''}
      </h1>

      {/* Balance Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <BalanceCard title="Total Balance" amount={totalBalance} />
        <BalanceCard title="Checking" amount={checking} />
        <BalanceCard title="Savings" amount={savings} />
      </div>

      {/* Account Activity */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #eef3fc', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', marginBottom: '32px' }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#001f3f', marginBottom: '12px' }}>
          Account Activity
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '14px' }}>
          <div>
            <p style={{ color: '#5b6e8c' }}>Last Login</p>
            <p style={{ fontWeight: 600 }}>{activity.lastLogin ? new Date(activity.lastLogin).toLocaleString() : 'N/A'}</p>
          </div>
          <div>
            <p style={{ color: '#5b6e8c' }}>Last IP</p>
            <p style={{ fontWeight: 600 }}>{activity.lastLoginIp || 'N/A'}</p>
          </div>
          <div>
            <p style={{ color: '#5b6e8c' }}>Daily Transfer Limit</p>
            <p style={{ fontWeight: 600 }}>{activity.dailyTransferLimit}</p>
          </div>
          <div>
            <p style={{ color: '#5b6e8c' }}>Daily Withdrawal Limit</p>
            <p style={{ fontWeight: 600 }}>{activity.dailyWithdrawalLimit}</p>
          </div>
          <div>
            <p style={{ color: '#5b6e8c' }}>Account Type</p>
            <p style={{ fontWeight: 600 }}>{activity.accountTypeRequested}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '32px' }}>
        <QuickActions />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  )
}