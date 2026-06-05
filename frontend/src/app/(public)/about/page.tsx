export default function About() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f4f6fb', minHeight: '100vh', padding: '40px 32px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        {/* Icon / Logo */}
        <img
          src="https://res.cloudinary.com/dkomucpin/image/upload/v1780595302/velunis_icon_favicon_zpbqv2.png"
          alt="Velunis Bank"
          style={{ height: '64px', marginBottom: '24px' }}
        />

        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#001f3f', marginBottom: '12px' }}>
            About Velunis Bank
          </h1>
          <div style={{ width: '60px', height: '4px', background: '#D4AF37', margin: '0 auto 24px' }} />
        </div>

        <div style={{ background: 'white', borderRadius: '24px', padding: '40px', border: '1px solid #eef3fc', boxShadow: '0 8px 20px rgba(0,0,0,0.02)', textAlign: 'left' }}>
          <p style={{ fontSize: '1.1rem', color: '#4a5b7a', lineHeight: '1.8', marginBottom: '20px' }}>
            Velunis Bank was founded on the belief that banking should be borderless, elegant, and absolutely secure.
            Headquartered in London and regulated by the Financial Conduct Authority, we serve over 2 million clients across 120 countries.
          </p>
          <p style={{ fontSize: '1.1rem', color: '#4a5b7a', lineHeight: '1.8', marginBottom: '20px' }}>
            Our mission is to deliver the highest standard of private banking to every global citizen.
            From multi‑currency accounts and premium cards to wealth management and 24/7 concierge support,
            we provide a complete financial ecosystem designed for modern individuals, families, and enterprises.
          </p>
          <p style={{ fontSize: '1.1rem', color: '#4a5b7a', lineHeight: '1.8' }}>
            Trust, transparency, and innovation are at the core of everything we do.
            Welcome to banking without borders.
          </p>
        </div>
      </div>
    </div>
  );
}