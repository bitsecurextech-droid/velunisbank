'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

export default function DigitalAssetsPage() {
  const [config, setConfig] = useState<any>({})

  useEffect(() => {
    api.get('/payment-config').then(res => setConfig(res.data || {})).catch(() => {})
  }, [])

  const coins = [
    { symbol: 'BTC', address: config.cryptoBtc, color: '#f7931a' },
    { symbol: 'ETH', address: config.cryptoEth, color: '#627eea' },
    { symbol: 'USDT', address: config.cryptoUsdt, color: '#26a17b' },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        Digital Assets
      </h1>
      <p style={{ color: '#5b6e8c', marginBottom: '30px' }}>
        Institutional-grade custody. Bank-level security. Deposit addresses for your crypto holdings.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {coins.map(coin => (
          <div key={coin.symbol} style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #eef3fc', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <i className="fab fa-bitcoin" style={{ color: coin.color, fontSize: '2rem' }}></i>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#001f3f', fontSize: '1.4rem' }}>{coin.symbol}</h3>
            </div>
            <p style={{ color: '#5b6e8c', fontSize: '14px', marginBottom: '8px' }}>Deposit Address</p>
            <div style={{ background: '#f4f6fb', padding: '10px 14px', borderRadius: '10px', wordBreak: 'break-all', fontSize: '13px', marginBottom: '16px' }}>
              {coin.address || 'Not configured'}
            </div>
            <button
              onClick={() => coin.address && navigator.clipboard.writeText(coin.address)}
              style={{ background: 'transparent', border: '1px solid #cdd9ed', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer', fontWeight: 500 }}
            >
              Copy Address
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}