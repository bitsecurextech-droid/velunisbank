export default function Footer() {
  return (
    <footer
      style={{
        background: '#001f3f',
        color: '#C7CDD6',
        padding: '60px 32px 24px',
        marginTop: '80px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '1300px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
        }}
      >
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <img
              src="https://res.cloudinary.com/dkomucpin/image/upload/v1780595302/velunis_icon_favicon_zpbqv2.png"
              alt="Velunis"
              style={{ height: '36px' }}
            />
            <span style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37', fontSize: '1.5rem', fontWeight: 800 }}>
              VELUNIS <span style={{ color: 'white' }}>BANK</span>
            </span>
          </div>
          <p style={{ fontSize: '13px', lineHeight: '1.6', marginTop: '8px' }}>
            Banking Without Borders.
          </p>
        </div>

        {/* Banking */}
        <div>
          <h4 style={{ color: '#D4AF37', marginBottom: '16px', fontWeight: 600, fontSize: '1rem' }}>Banking</h4>
          <a href="/personal-banking" style={linkStyle}>Personal Banking</a>
          <a href="/business-banking" style={linkStyle}>Business Banking</a>
          <a href="/wealth-management" style={linkStyle}>Wealth Management</a>
          <a href="/credit-cards" style={linkStyle}>Premium Cards</a>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ color: '#D4AF37', marginBottom: '16px', fontWeight: 600, fontSize: '1rem' }}>Company</h4>
          <a href="/about" style={linkStyle}>About Us</a>
          <a href="/careers" style={linkStyle}>Careers</a>
          <a href="/contact" style={linkStyle}>Contact</a>
          <a href="/help-center" style={linkStyle}>Help Center</a>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{ color: '#D4AF37', marginBottom: '16px', fontWeight: 600, fontSize: '1rem' }}>Legal</h4>
          <a href="/privacy-policy" style={linkStyle}>Privacy Policy</a>
          <a href="/terms" style={linkStyle}>Terms of Service</a>
          <a href="/legal" style={linkStyle}>Legal Information</a>
          <a href="/security" style={linkStyle}>Security</a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          marginTop: '40px',
          paddingTop: '20px',
          textAlign: 'center',
          fontSize: '13px',
          color: '#5b6e8c',
        }}
      >
        <p>© {new Date().getFullYear()} Velunis Bank. All rights reserved. Velunis Bank Ltd is regulated by the FCA.</p>
      </div>
    </footer>
  );
}

const linkStyle: React.CSSProperties = {
  display: 'block',
  color: '#C7CDD6',
  textDecoration: 'none',
  marginBottom: '10px',
  fontSize: '14px',
  transition: 'color 0.2s',
};