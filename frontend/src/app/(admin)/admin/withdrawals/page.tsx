'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<any[]>([])

  const fetch = () => {
    api.get('/admin/withdrawals').then(res => setWithdrawals(res.data)).catch(() => {})
  }

  useEffect(() => { fetch() }, [])

  const approve = async (id: string) => {
    await api.post(`/admin/withdrawals/${id}/approve`)
    fetch()
  }

  const reject = async (id: string) => {
    const note = prompt('Rejection reason:')
    if (note) {
      await api.post(`/admin/withdrawals/${id}/reject`, { adminNote: note })
      fetch()
    }
  }

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        Withdrawal Approvals
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {withdrawals.map(w => (
          <div key={w.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #eef3fc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div>
                <p><strong>{w.user?.email}</strong></p>
                <p>Amount: ${w.amount} | To: {w.recipientName}</p>
                <p>Bank: {w.bankName} | Account: {w.accountNumber}</p>
                <p>Status: {w.status}</p>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {w.status === 'PENDING' && (
                  <>
                    <button onClick={() => approve(w.id)} style={approveBtn}>Approve</button>
                    <button onClick={() => reject(w.id)} style={rejectBtn}>Reject</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const approveBtn: React.CSSProperties = { background: '#2D6A4F', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer' }
const rejectBtn: React.CSSProperties = { background: '#8B0000', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer' }