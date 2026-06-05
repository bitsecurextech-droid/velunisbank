export default function WealthManagement() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f4f6fb', minHeight: '100vh', padding: '40px 32px' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#001f3f', marginBottom: '12px' }}>
            Wealth Management
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#4a5b7a', maxWidth: '700px' }}>
            Bespoke investment strategies, retirement planning, and private advisory for your financial future.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {[
            { title: 'Portfolio Management', desc: 'Actively managed portfolios tailored to your risk profile.', icon: 'fa-chart-line' },
            { title: 'Retirement Planning', desc: 'Tax‑advantaged accounts with expert guidance for your golden years.', icon: 'fa-umbrella-beach' },
            { title: 'Private Advisory', desc: 'One‑on‑one wealth advice from certified financial planners.', icon: 'fa-user-tie' },
            { title: 'Estate Planning', desc: 'Trust services and legacy planning for high‑net‑worth families.', icon: 'fa-landmark' },
          ].map((item) => (
            <div key={item.title} style={{ background: 'white', borderRadius: '24px', padding: '36px 28px', border: '1px solid #eef3fc', boxShadow: '0 8px 20px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '40px', color: '#D4AF37', marginBottom: '20px' }}>
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#001f3f', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ color: '#5b6e8c', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}