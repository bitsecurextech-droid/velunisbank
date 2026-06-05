export default function HelpCenter() {
  const faqs = [
    { q: 'How do I open an account?', a: 'Click "Open Account" on our homepage, fill in your details, and verify your email. No paperwork needed.' },
    { q: 'How long do transfers take?', a: 'Internal transfers are instant. International transfers typically complete within 1‑2 business days.' },
    { q: 'Is my money safe?', a: 'Yes. Funds are held in regulated banks and protected up to $250,000 by deposit insurance schemes.' },
    { q: 'How do I freeze my card?', a: 'Log in to your dashboard, go to Cards, and toggle Freeze. You can unfreeze it anytime.' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f4f6fb', minHeight: '100vh', padding: '40px 32px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#001f3f', marginBottom: '12px' }}>
            Help Center
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#4a5b7a' }}>Find answers to common questions.</p>
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          {faqs.map((faq, i) => (
            <details key={i} style={{
              background: 'white', borderRadius: '16px', padding: '24px',
              border: '1px solid #eef3fc', boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
            }}>
              <summary style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#001f3f', cursor: 'pointer', listStyle: 'none' }}>
                {faq.q}
              </summary>
              <p style={{ marginTop: '12px', color: '#4a5b7a', lineHeight: '1.6' }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}