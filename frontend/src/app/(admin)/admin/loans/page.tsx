'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

export default function AdminLoans() {
  const [loans, setLoans] = useState<any[]>([])

  const fetch = () => {
    api.get('/admin/loans').then(res => setLoans(res.data)).catch(() => {})
  }

  useEffect(() => { fetch() }, [])

  const updateStatus = async (id: string, status: string) => {
    await api.patch(`/admin/loans/${id}`, { status })
    fetch()
  }

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        Loans Management
      </h1>
      <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #eef3fc', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafd' }}>
              <th style={th}>User</th>
              <th style={th}>Amount</th>
              <th style={th}>Interest</th>
              <th style={th}>Term (months)</th>
              <th style={th}>Remaining</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan: any) => (
              <tr key={loan.id} style={{ borderTop: '1px solid #f0f3f8' }}>
                <td style={td}>{loan.user?.email}</td>
                <td style={td}>${loan.amount.toLocaleString()}</td>
                <td style={td}>{loan.interestRate}%</td>
                <td style={td}>{loan.termMonths}</td>
                <td style={td}>${loan.remainingAmount.toFixed(2)}</td>
                <td style={td}>{loan.status}</td>
                <td style={td}>
                  <select
                    value={loan.status}
                    onChange={(e) => updateStatus(loan.id, e.target.value)}
                    style={{ padding: '4px 8px', borderRadius: '8px', border: '1px solid #cdd9ed' }}
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="PAID">PAID</option>
                    <option value="DEFAULTED">DEFAULTED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const th: React.CSSProperties = {
  padding: '12px 16px',
  textAlign: 'left',
  fontWeight: 600,
  color: '#001f3f',
  fontSize: '14px',
}

const td: React.CSSProperties = {
  padding: '10px 16px',
  color: '#334e68',
  fontSize: '14px',
}