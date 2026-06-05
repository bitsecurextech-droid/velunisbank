export default function Terms() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f4f6fb', minHeight: '100vh', padding: '40px 32px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#001f3f', marginBottom: '12px' }}>
            Terms of Service
          </h1>
        </div>
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #eef3fc', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <p style={{ color: '#4a5b7a', lineHeight: '1.8', marginBottom: '20px' }}>
            By using Velunis Bank services, you agree to these Terms of Service. We may update these terms periodically.
            Accounts are subject to identity verification (KYC). We reserve the right to suspend accounts for suspicious or fraudulent activity.
          </p>
          <p style={{ color: '#4a5b7a', lineHeight: '1.8' }}>
            For the complete legal document, please contact legal@velunisbank.com.
          </p>
        </div>
      </div>
    </div>
  );
}