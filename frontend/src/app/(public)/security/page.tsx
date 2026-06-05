export default function Security() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f4f6fb', minHeight: '100vh', padding: '40px 32px' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#001f3f', marginBottom: '12px' }}>
            Security
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#4a5b7a', maxWidth: '700px' }}>
            Your safety is our highest priority. We protect your assets with the world’s most advanced security technology.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          {[
            { title: 'Military Grade Security', icon: 'fa-microchip' },
            { title: '256‑bit SSL Encryption', icon: 'fa-lock' },
            { title: 'Biometric Authentication', icon: 'fa-fingerprint' },
            { title: 'AI Fraud Detection', icon: 'fa-robot' },
            { title: 'Multi‑Layer Verification', icon: 'fa-layer-group' },
            { title: '24/7 Monitoring', icon: 'fa-eye' },
          ].map((item) => (
            <div key={item.title} style={{ background: 'white', borderRadius: '20px', padding: '28px 20px', border: '1px solid #eef3fc', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', color: '#D4AF37', marginBottom: '14px' }}>
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h3 style={{ fontSize: '16px', color: '#001f3f', marginBottom: '8px' }}>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}