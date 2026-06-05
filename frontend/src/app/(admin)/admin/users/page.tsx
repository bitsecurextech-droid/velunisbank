'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([])
  const user = useAuthStore(s => s.user)

  const fetchUsers = () => {
    api.get('/admin/users').then(res => setUsers(res.data)).catch(() => {})
  }

  useEffect(() => { fetchUsers() }, [])

  const toggleUser = async (id: string, field: string, value: any) => {
    await api.patch(`/admin/users/${id}`, { [field]: value })
    fetchUsers()
  }

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        User Management
      </h1>
      <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #eef3fc', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafd' }}>
              <th style={th}>Email</th>
              <th style={th}>Name</th>
              <th style={th}>Role</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u: any) => (
              <tr key={u.id} style={{ borderTop: '1px solid #f0f3f8' }}>
                <td style={td}>{u.email}</td>
                <td style={td}>{u.firstName} {u.lastName}</td>
                <td style={td}>{u.role}</td>
                <td style={td}>{u.isActive ? 'Active' : 'Suspended'}{u.isBanned ? ' / Banned' : ''}</td>
                <td style={td}>
                  <button onClick={() => toggleUser(u.id, 'isActive', !u.isActive)} style={actionBtn}>
                    {u.isActive ? 'Suspend' : 'Activate'}
                  </button>
                  <button onClick={() => toggleUser(u.id, 'isBanned', !u.isBanned)} style={actionBtn}>
                    {u.isBanned ? 'Unban' : 'Ban'}
                  </button>
                  {user?.role === 'SUPER_ADMIN' && (
                    <button
                      onClick={() => toggleUser(u.id, 'role', u.role === 'ADMIN' ? 'USER' : 'ADMIN')}
                      style={actionBtn}
                    >
                      {u.role === 'ADMIN' ? 'Demote to User' : 'Promote to Admin'}
                    </button>
                  )}
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

const actionBtn: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid #cdd9ed',
  padding: '4px 10px',
  borderRadius: '20px',
  fontSize: '12px',
  marginRight: '6px',
  cursor: 'pointer',
}