'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

export default function AdminKYC() {
  const [kycs, setKycs] = useState<any[]>([])

  const fetchKYCs = () => {
    api.get('/admin/kyc').then(res => setKycs(res.data)).catch(() => {})
  }

  useEffect(() => { fetchKYCs() }, [])

  const approve = async (id: string) => {
    await api.post(`/admin/kyc/${id}/approve`)
    fetchKYCs()
  }

  const reject = async (id: string) => {
    const note = prompt('Rejection reason:')
    if (note) {
      await api.post(`/admin/kyc/${id}/reject`, { adminNotes: note })
      fetchKYCs()
    }
  }

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        KYC Verification
      </h1>
      <div style={{ display: 'grid', gap: '20px' }}>
        {kycs.map((kyc: any) => (
          <div key={kyc.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #eef3fc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p><strong>{kyc.user?.firstName} {kyc.user?.lastName}</strong> ({kyc.user?.email})</p>
                <p>Document: {kyc.documentType} | Status: {kyc.status}</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/admin/kyc/${kyc.id}/document`} target="_blank"
                   style={{ background: '#001f3f', color: 'white', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '14px' }}>
                  View
                </a>
                <button onClick={() => approve(kyc.id)} style={{ background: '#2D6A4F', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer' }}>
                  Approve
                </button>
                <button onClick={() => reject(kyc.id)} style={{ background: '#8B0000', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer' }}>
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
        {kycs.length === 0 && <p style={{ color: '#5b6e8c' }}>No KYC submissions.</p>}
      </div>
    </div>
  )
}