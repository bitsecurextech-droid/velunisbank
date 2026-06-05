'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'white',
        borderRadius: '80px',
        padding: '8px 24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
        margin: '20px auto 32px',
        maxWidth: '1300px',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <img
          src="https://res.cloudinary.com/dkomucpin/image/upload/v1780595302/velunis_icon_favicon_zpbqv2.png"
          alt="Velunis Bank"
          style={{ height: '40px' }}
        />
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem',
            fontWeight: 800,
            color: '#001f3f',
          }}
        >
          VELUNIS <span style={{ color: '#D4AF37' }}>BANK</span>
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '26px', alignItems: 'center' }}>
        <Link href="/personal-banking" style={linkStyle}>Personal</Link>
        <Link href="/business-banking" style={linkStyle}>Business</Link>
        <Link href="/wealth-management" style={linkStyle}>Wealth</Link>
        <Link href="/credit-cards" style={linkStyle}>Cards</Link>
        <Link href="/security" style={linkStyle}>Security</Link>
        <Link href="/about" style={linkStyle}>About</Link>
        <Link href="/contact" style={linkStyle}>Contact</Link>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Link
          href="/login"
          style={{
            background: 'transparent',
            border: '1px solid #cdd9ed',
            padding: '8px 18px',
            borderRadius: '40px',
            fontWeight: 600,
            fontSize: '14px',
            color: '#0a2540',
            textDecoration: 'none',
          }}
        >
          Sign In
        </Link>
        <Link
          href="/open-account"
          style={{
            background: '#001f3f',
            color: 'white',
            border: 'none',
            padding: '8px 20px',
            borderRadius: '40px',
            fontWeight: 600,
            fontSize: '14px',
            textDecoration: 'none',
          }}
        >
          Open Account
        </Link>
      </div>
    </nav>
  )
}

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#1e2f4e',
  fontWeight: 500,
  fontSize: '14px',
}