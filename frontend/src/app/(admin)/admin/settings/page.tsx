'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

export default function AdminSettings() {
  const [config, setConfig] = useState<any>({})

  useEffect(() => {
    api.get('/admin/settings/payment').then(res => setConfig(res.data || {})).catch(() => {})
  }, [])

  const handleToggle = async (key: string, value: boolean) => {
    const updated = { ...config, [key]: value }
    setConfig(updated)
    await api.put('/admin/settings/payment', updated)
  }

  const handleChange = async (key: string, value: string) => {
    const updated = { ...config, [key]: value }
    setConfig(updated)
    await api.put('/admin/settings/payment', updated)
  }

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        Global Settings
      </h1>
      <div style={{ display: 'grid', gap: '20px', maxWidth: '600px' }}>
        {/* Toggles */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #eef3fc' }}>
          <h3 style={{ marginBottom: '12px' }}>Deposit Methods</h3>
          {['paypalEnabled', 'steamEnabled', 'appleEnabled', 'giftCardEnabled'].map(key => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <span>{key.replace('Enabled', '')}</span>
              <input type="checkbox" checked={config[key] || false} onChange={e => handleToggle(key, e.target.checked)} />
            </div>
          ))}
        </div>

        {/* Bank Account Details */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #eef3fc' }}>
          <h3 style={{ marginBottom: '12px' }}>ACH / Wire / Direct Deposit Details</h3>
          <label style={labelStyle}>ACH Account Number</label>
          <input
            value={config.achAccountNumber || ''}
            onChange={e => handleChange('achAccountNumber', e.target.value)}
            style={inputStyle}
          />
          <label style={labelStyle}>Wire Routing Number</label>
          <input
            value={config.wireRoutingNumber || ''}
            onChange={e => handleChange('wireRoutingNumber', e.target.value)}
            style={inputStyle}
          />
          <label style={labelStyle}>Direct Deposit Info</label>
          <textarea
            value={config.directDepositInfo || ''}
            onChange={e => handleChange('directDepositInfo', e.target.value)}
            style={{ ...inputStyle, height: '80px' }}
          />
        </div>

        {/* Crypto Addresses */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #eef3fc' }}>
          <h3 style={{ marginBottom: '12px' }}>Crypto Addresses</h3>
          {['cryptoBtc', 'cryptoEth', 'cryptoUsdt'].map(field => (
            <div key={field}>
              <label style={labelStyle}>{field.replace('crypto', '')}</label>
              <input
                value={config[field] || ''}
                onChange={e => handleChange(field, e.target.value)}
                style={inputStyle}
              />
            </div>
          ))}
          <label style={labelStyle}>PayPal Email</label>
          <input
            value={config.paypalEmail || ''}
            onChange={e => handleChange('paypalEmail', e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '4px', color: '#001f3f', fontWeight: 500 }
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cdd9ed', marginBottom: '12px', fontSize: '14px' }