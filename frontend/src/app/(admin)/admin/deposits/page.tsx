'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

export default function AdminDeposits() {
  const [deposits, setDeposits] = useState<any[]>([])

  const fetch = () => {
    api.get('/admin/deposits').then(res => setDeposits(res.data)).catch(() => {})
  }

  useEffect(() => { fetch() }, [])

  const approve = async (id: string) => {
    await api.post(`/admin/deposits/${id}/approve`)
    fetch()
  }

  const reject = async (id: string) => {
    const note = prompt('Rejection reason:')
    if (note) {
      await api.post(`/admin/deposits/${id}/reject`, { adminNote: note })
      fetch()
    }
  }

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        Deposit Approvals
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {deposits.map(d => (
          <div key={d.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #eef3fc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div>
                <p><strong>{d.user?.email}</strong></p>
                <p>Method: {d.method} | Amount: ${d.amount}</p>
                <p>Status: {d.status}</p>
                {d.imageUrl && <a href={`http://localhost:4000${d.imageUrl}`} target="_blank" style={{ color: '#D4AF37' }}>View Image</a>}
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {d.status === 'PENDING' && (
                  <>
                    <button onClick={() => approve(d.id)} style={approveBtn}>Approve</button>
                    <button onClick={() => reject(d.id)} style={rejectBtn}>Reject</button>
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