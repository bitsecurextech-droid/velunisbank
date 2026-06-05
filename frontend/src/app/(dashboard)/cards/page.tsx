'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

export default function CardsPage() {
  const [cards, setCards] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCards = () => {
    api.get('/cards')
      .then(res => setCards(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchCards() }, [])

  const toggleFreeze = async (id: string, current: boolean) => {
    if (current) {
      await api.post(`/cards/${id}/unfreeze`)
    } else {
      await api.post(`/cards/${id}/freeze`)
    }
    fetchCards()
  }

  if (loading) return <p style={{ color: '#5b6e8c' }}>Loading cards…</p>

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#001f3f', marginBottom: '24px' }}>
        My Cards
      </h1>
      {cards.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #eef3fc' }}>
          <p style={{ color: '#5b6e8c' }}>No cards issued yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {cards.map((card: any) => (
            <div key={card.id} style={{
              background: card.cardType === 'VIRTUAL' ? 'linear-gradient(135deg, #0a0f16, #111927)' : 'linear-gradient(135deg, #1a1a2e, #16213e)',
              borderRadius: '20px', padding: '24px', color: 'white', border: '1px solid rgba(212,175,55,0.3)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: '#D4AF37' }}>VELUNIS</span>
                <span style={{ fontSize: '0.8rem', color: '#C7CDD6' }}>{card.cardType.replace('_', ' ')}</span>
              </div>
              <div style={{ fontSize: '1.2rem', letterSpacing: '3px', marginBottom: '16px' }}>
                {card.cardNumber}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#C7CDD6' }}>
                <span>Exp: {card.expiryDate}</span>
                <span>{card.isFrozen ? '❄️ Frozen' : 'Active'}</span>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => toggleFreeze(card.id, card.isFrozen)}
                  style={{ background: card.isFrozen ? '#D4AF37' : 'transparent', border: '1px solid #D4AF37', color: card.isFrozen ? '#001f3f' : '#D4AF37', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                >
                  {card.isFrozen ? 'Unfreeze' : 'Freeze'}
                </button>
                <button style={{ background: 'transparent', border: '1px solid #cdd9ed', color: '#C7CDD6', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}