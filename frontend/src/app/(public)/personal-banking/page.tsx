export default function PersonalBanking() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f4f6fb', minHeight: '100vh', padding: '40px 32px' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#001f3f', marginBottom: '12px' }}>
            Personal Banking
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#4a5b7a', maxWidth: '700px' }}>
            Premium checking, savings, and multi‑currency accounts with zero hidden fees and world‑class service.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {[
            { title: 'Checking Accounts', desc: 'No monthly fees, high interest, instant virtual card.', icon: 'fa-money-check-dollar' },
            { title: 'Savings Accounts', desc: 'Earn up to 3.5% APY with automated savings goals.', icon: 'fa-piggy-bank' },
            { title: 'Multi‑Currency', desc: 'Hold USD, EUR, GBP, CAD, AUD – convert instantly.', icon: 'fa-globe' },
            { title: 'Premium Debit Card', desc: 'Free worldwide ATM withdrawals and purchase protection.', icon: 'fa-credit-card' },
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