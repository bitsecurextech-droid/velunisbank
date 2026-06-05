export default function Legal() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f4f6fb', minHeight: '100vh', padding: '40px 32px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#001f3f', marginBottom: '12px' }}>
            Legal Information
          </h1>
        </div>
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #eef3fc', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <p style={{ color: '#4a5b7a', lineHeight: '1.8', marginBottom: '20px' }}>
            Velunis Bank is a digital banking institution regulated by the Financial Conduct Authority (FCA) under registration number 12345678.
            All services are subject to our Terms and Conditions and Privacy Policy.
          </p>
          <p style={{ color: '#4a5b7a', lineHeight: '1.8' }}>
            Velunis Bank Ltd is registered in England and Wales (Company No. 12345678).
            Registered office: 1 Luxury Street, London, United Kingdom.
          </p>
        </div>
      </div>
    </div>
  );
}