'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

const ALL_METHODS = [
  { key: 'ach', label: 'ACH Transfer', icon: 'fa-university', desc: 'Transfer directly from your bank account.', requires: [] },
  { key: 'wire', label: 'Wire Transfer', icon: 'fa-building-columns', desc: 'Receive domestic or international wires.', requires: [] },
  { key: 'debitCard', label: 'Debit Card', icon: 'fa-credit-card', desc: 'Fund your account with a debit card.', requires: [] },
  { key: 'directDeposit', label: 'Direct Deposit', icon: 'fa-file-invoice-dollar', desc: 'Set up recurring direct deposits.', requires: [] },
  { key: 'mobileCheck', label: 'Mobile Check Deposit', icon: 'fa-mobile-screen-button', desc: 'Snap a picture of your check.', requires: [] },
  { key: 'steamEnabled', label: 'Steam Gift Card', icon: 'fa-steam', desc: 'Upload your Steam gift card for credit.', requires: ['image'] },
  { key: 'appleEnabled', label: 'Apple Gift Card', icon: 'fa-apple', desc: 'Upload your Apple gift card for credit.', requires: ['image'] },
  { key: 'giftCardEnabled', label: 'Generic Gift Card', icon: 'fa-gift', desc: 'Upload any gift card for review.', requires: ['image'] },
  { key: 'paypalEnabled', label: 'PayPal', icon: 'fa-paypal', desc: 'Send via PayPal Friends & Family.', requires: ['paypalTxnId'] },
  { key: 'crypto', label: 'Cryptocurrency', icon: 'fa-bitcoin', desc: 'Deposit BTC, ETH, or USDT.', requires: ['cryptoType', 'txnHash'] },
]

export default function DepositsPage() {
  const [config, setConfig] = useState<any>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [code, setCode] = useState('')
  const [paypalTxnId, setPaypalTxnId] = useState('')
  const [cryptoType, setCryptoType] = useState('BTC')
  const [txnHash, setTxnHash] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('/payment-config').then(res => setConfig(res.data || {})).catch(() => {})
  }, [])

  const isEnabled = (key: string) => {
    if (key === 'ach' || key === 'wire' || key === 'debitCard' || key === 'directDeposit' || key === 'mobileCheck' || key === 'crypto') return true // always visible, can be toggled later
    return config[key] === true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (selected === 'steamEnabled' || selected === 'appleEnabled' || selected === 'giftCardEnabled') {
        if (!file) throw new Error('Please upload the gift card image.')
        const fd = new FormData()
        fd.append('image', file)
        fd.append('amount', amount)
        fd.append('code', code)
        fd.append('method', selected.replace('Enabled', '').toUpperCase())
        await api.post('/deposits/giftcard', fd)
        setMessage('Gift card submitted for review. You will be notified once approved.')
      } else if (selected === 'paypalEnabled') {
        await api.post('/deposits/paypal', { amount: parseFloat(amount), paypalTxnId })
        setMessage('PayPal deposit submitted successfully.')
      } else if (selected === 'crypto') {
        await api.post('/deposits/crypto', { amount: parseFloat(amount), cryptoType, txnHash })
        setMessage('Crypto deposit submitted for review.')
      } else {
        // ACH, wire, debit card, etc. are informational for now
        setMessage('Instructions will be sent to your email.')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Deposit failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        Deposit Funds
      </h1>

      {!selected ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {ALL_METHODS.filter(m => isEnabled(m.key)).map(method => (
            <button
              key={method.key}
              onClick={() => setSelected(method.key)}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid #eef3fc',
                textAlign: 'left',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              <i className={`fas ${method.icon}`} style={{ color: '#D4AF37', fontSize: '1.5rem', marginBottom: '10px' }}></i>
              <h3 style={{ color: '#001f3f', marginBottom: '6px' }}>{method.label}</h3>
              <p style={{ color: '#5b6e8c', fontSize: '14px' }}>{method.desc}</p>
            </button>
          ))}
        </div>
      ) : (
        <div style={{ maxWidth: '500px' }}>
          <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', marginBottom: '16px' }}>
            ← Back to all methods
          </button>
          <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #eef3fc', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            {error && <p style={{ color: '#8B0000', marginBottom: '12px' }}>{error}</p>}
            {message && <p style={{ color: '#2D6A4F', marginBottom: '12px' }}>{message}</p>}

            <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} style={inputStyle} required />

            {(selected === 'steamEnabled' || selected === 'appleEnabled' || selected === 'giftCardEnabled') && (
              <>
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} style={{ marginBottom: '16px' }} required />
                <input placeholder="Gift Card Code" value={code} onChange={e => setCode(e.target.value)} style={inputStyle} required />
                <p style={{ fontSize: '12px', color: '#5b6e8c', marginBottom: '12px' }}>The image will be reviewed by our team.</p>
              </>
            )}

            {selected === 'paypalEnabled' && (
              <>
                <p style={{ marginBottom: '12px', color: '#5b6e8c' }}>
                  Send F&F to: <strong>{config.paypalEmail || 'Not configured'}</strong>
                </p>
                <input placeholder="PayPal Transaction ID" value={paypalTxnId} onChange={e => setPaypalTxnId(e.target.value)} style={inputStyle} required />
              </>
            )}

            {selected === 'crypto' && (
              <>
                <select value={cryptoType} onChange={e => setCryptoType(e.target.value)} style={inputStyle}>
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                  <option value="USDT">USDT</option>
                </select>
                {cryptoType === 'BTC' && <p style={{ fontSize: '12px', color: '#5b6e8c', marginBottom: '8px' }}>Send to: {config.cryptoBtc || 'Not configured'}</p>}
                {cryptoType === 'ETH' && <p style={{ fontSize: '12px', color: '#5b6e8c', marginBottom: '8px' }}>Send to: {config.cryptoEth || 'Not configured'}</p>}
                {cryptoType === 'USDT' && <p style={{ fontSize: '12px', color: '#5b6e8c', marginBottom: '8px' }}>Send to: {config.cryptoUsdt || 'Not configured'}</p>}
                <input placeholder="Transaction Hash" value={txnHash} onChange={e => setTxnHash(e.target.value)} style={inputStyle} required />
              </>
            )}

            <button type="submit" disabled={loading} style={{ width: '100%', background: '#001f3f', color: 'white', border: 'none', padding: '14px', borderRadius: '30px', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
              {loading ? 'Processing...' : 'Submit Deposit'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  borderRadius: '12px',
  border: '1px solid #e0e4ea',
  background: '#f9fafc',
  marginBottom: '16px',
  fontSize: '1rem',
  color: '#001f3f',
}