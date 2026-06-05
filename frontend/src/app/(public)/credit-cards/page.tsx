export default function CreditCards() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f4f6fb', minHeight: '100vh' }}>
      {/* ── HERO SECTION with background image ── */}
      <section
        style={{
          backgroundImage:
            'url(https://res.cloudinary.com/dkomucpin/image/upload/v1780642935/card_tsfseo.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0,31,63,0.8) 0%, rgba(8,20,38,0.7) 100%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: '0 20px',
            color: 'white',
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
              color: '#D4AF37',
              marginBottom: '16px',
              letterSpacing: '-0.5px',
            }}
          >
            Premium Cards
          </h1>
          <p style={{ fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto', color: '#C7CDD6' }}>
            Exclusive cards crafted for the discerning global citizen. <br />
            Unlock a world of privilege, security, and luxury.
          </p>
        </div>
      </section>

      {/* ── CARDS DETAIL SECTION ── */}
      <section style={{ padding: '80px 32px', maxWidth: '1300px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.5rem',
            color: '#001f3f',
            textAlign: 'center',
            marginBottom: '60px',
          }}
        >
          Choose Your Card
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
          }}
        >
          {/* World Elite Card */}
          <CardDetail
            name="World Elite Card"
            color="#D4AF37"
            benefits={[
              '24/7 Personal Concierge Service',
              'Unlimited Airport Lounge Access',
              'Solid Metal Card Construction',
              'Comprehensive Travel Insurance',
              'Exclusive Dining & Hotel Privileges',
            ]}
          />

          {/* Private Banking Card */}
          <CardDetail
            name="Private Banking Card"
            color="#D4AF37"
            benefits={[
              'Dedicated Private Account Manager',
              '24K Gold‑Plated Card',
              'Invitation‑Only Membership',
              'Bespoke Wealth Management Services',
              'Priority Access to Global Events',
            ]}
          />

          {/* Premier Gold Card */}
          <CardDetail
            name="Premier Gold Card"
            color="#D4AF37"
            benefits={[
              '1.5% Unlimited Cashback',
              'Zero Foreign Transaction Fees',
              'Premium Travel Insurance Coverage',
              'Exclusive Shopping Discounts',
              'Instant Card Freeze & Unfreeze',
            ]}
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <p style={{ color: '#4a5b7a', marginBottom: '24px' }}>
            Ready to elevate your financial lifestyle?
          </p>
          <a
            href="/open-account"
            style={{
              background: '#001f3f',
              color: 'white',
              padding: '16px 40px',
              borderRadius: '40px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Apply Now <i className="fas fa-arrow-right" style={{ fontSize: '0.9rem' }}></i>
          </a>
        </div>
      </section>
    </div>
  );
}

// Reusable card detail component
function CardDetail({ name, color, benefits }: { name: string; color: string; benefits: string[] }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '28px',
        padding: '40px 30px',
        border: '1px solid #eef3fc',
        boxShadow: '0 12px 30px rgba(0,0,0,0.04)',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '4px',
          background: color,
          marginBottom: '24px',
        }}
      />
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.8rem',
          color: '#001f3f',
          marginBottom: '20px',
        }}
      >
        {name}
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {benefits.map((benefit, idx) => (
          <li
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              marginBottom: '14px',
              color: '#334e68',
              fontSize: '0.95rem',
              lineHeight: '1.5',
            }}
          >
            <i
              className="fas fa-check-circle"
              style={{ color: color, marginTop: '3px', fontSize: '0.95rem' }}
            ></i>
            {benefit}
          </li>
        ))}
      </ul>
      <button
        style={{
          marginTop: '28px',
          background: 'transparent',
          border: `1px solid ${color}`,
          color: '#001f3f',
          padding: '10px 24px',
          borderRadius: '40px',
          fontWeight: 600,
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'all 0.3s',
        }}
      >
        Learn More
      </button>
    </div>
  );
}