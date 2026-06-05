export default function PrivacyPolicy() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f4f6fb', minHeight: '100vh', padding: '40px 32px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#001f3f', marginBottom: '12px' }}>
            Privacy Policy
          </h1>
        </div>
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #eef3fc', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <p style={{ color: '#4a5b7a', lineHeight: '1.8', marginBottom: '20px' }}>
            We collect only the information necessary to provide our banking services: name, email address, and transaction data.
            Your data is encrypted at rest and in transit, and we never sell your personal information to third parties.
          </p>
          <p style={{ color: '#4a5b7a', lineHeight: '1.8' }}>
            For detailed information or to request data deletion, please contact our Data Protection Officer at dpo@velunisbank.com.
          </p>
        </div>
      </div>
    </div>
  );
}