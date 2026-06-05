import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Velunis Bank – Banking Without Borders</title>
        <link rel="icon" href="https://res.cloudinary.com/dkomucpin/image/upload/v1780595302/velunis_icon_favicon_zpbqv2.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div style={{ fontFamily: "'Inter', sans-serif", background: '#f4f6fb', color: '#0a2540' }}>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #f4f6fb; }
          .container { max-width: 1300px; margin: 0 auto; padding: 0 32px; }

          /* HERO */
          .hero {
            background: linear-gradient(145deg, #ffffff 0%, #f0f4fc 100%);
            border-radius: 40px; padding: 60px 48px; margin-bottom: 32px;
            box-shadow: 0 12px 30px rgba(0,0,0,0.05);
            display: flex; flex-wrap: wrap; gap: 40px; justify-content: space-between; align-items: center;
          }
          .hero-left { flex: 1.2; }
          .global-badge { font-size: 14px; font-weight: 600; color: #D4AF37; background: #fdf6e3; display: inline-block; padding: 4px 14px; border-radius: 30px; margin-bottom: 20px; }
          .hero-left h1 { font-size: 52px; font-weight: 800; letter-spacing: -1px; margin-bottom: 12px; color: #001f3f; line-height: 1.1; }
          .hero-left h1 span { color: #D4AF37; }
          .hero-left .balance-large { font-size: 48px; font-weight: 800; color: #001f3f; margin: 16px 0 12px; }
          .hero-left .premium-text { color: #4a5b7a; font-size: 16px; max-width: 90%; margin-bottom: 28px; line-height: 1.5; }
          .hero-btn { background: #001f3f; color: white; border: none; padding: 14px 32px; border-radius: 40px; font-weight: 700; font-size: 15px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; }
          .hero-right { flex: 0.9; min-width: 280px; }
          .bank-card {
            background: linear-gradient(125deg, #121f33, #1b2b44); border-radius: 28px;
            padding: 24px 28px; color: white; box-shadow: 0 20px 35px -10px rgba(0,0,0,0.3);
          }
          .bank-card .card-row { display: flex; justify-content: space-between; margin-bottom: 28px; font-size: 12px; font-weight: 500; }
          .bank-card .card-number { font-size: 22px; letter-spacing: 2px; font-weight: 600; margin: 20px 0 12px; }
          .bank-card .card-details { display: flex; justify-content: space-between; margin-top: 20px; }
          .bank-card .card-brand { font-weight: 800; font-size: 14px; }
          .balance-widget { margin-top: 20px; background: rgba(255,255,255,0.08); border-radius: 16px; padding: 16px; text-align: center; }
          .balance-widget h4 { color: #D4AF37; font-size: 14px; margin-bottom: 6px; }
          .balance-widget h2 { color: white; font-size: 28px; }

          /* STATS */
          .stats {
            display: flex; flex-wrap: wrap; gap: 24px; background: white;
            border-radius: 32px; padding: 32px; margin-bottom: 40px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.02);
          }
          .stat-item { flex: 1; text-align: center; }
          .stat-number { font-size: 32px; font-weight: 800; color: #001f3f; }
          .stat-label { font-size: 14px; color: #5b6e8c; }

          /* SERVICES */
          .section-title { font-size: 2.2rem; font-weight: 700; color: #001f3f; margin-bottom: 40px; text-align: center; }
          .services-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 24px; margin-bottom: 48px;
          }
          .service-card {
            background: white; border-radius: 28px; padding: 32px 24px;
            transition: all 0.2s ease; box-shadow: 0 8px 20px rgba(0,0,0,0.02);
            border: 1px solid #eef3fc; text-align: center;
          }
          .service-card i { font-size: 36px; color: #D4AF37; margin-bottom: 18px; }
          .service-card h3 { font-size: 20px; margin-bottom: 10px; color: #001f3f; }
          .service-card p { font-size: 14px; color: #5b6e8c; }

          /* SECURITY */
          .security-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px; margin-bottom: 60px;
          }
          .security-card {
            background: white; border-radius: 20px; padding: 28px 20px;
            border: 1px solid #eef3fc; text-align: center;
          }
          .security-card i { font-size: 28px; color: #D4AF37; margin-bottom: 14px; }
          .security-card h3 { font-size: 16px; color: #001f3f; margin-bottom: 8px; }

          /* TESTIMONIALS */
          .testimonial-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px; margin-bottom: 60px;
          }
          .testimonial-card {
            background: white; border-radius: 24px; padding: 28px;
            border: 1px solid #eef3fc;
          }
          .testimonial-card p { font-style: italic; color: #334e68; margin-bottom: 16px; }
          .testimonial-card h4 { color: #001f3f; margin-bottom: 4px; }
          .testimonial-card span { font-size: 13px; color: #627d98; }

          /* MOBILE APP */
          .app-showcase {
            background: white; border-radius: 40px; padding: 48px;
            display: flex; flex-wrap: wrap; gap: 40px; align-items: center;
            box-shadow: 0 12px 30px rgba(0,0,0,0.05); margin-bottom: 48px;
          }
          .app-left { flex: 1; }
          .app-left h2 { font-size: 2rem; color: #001f3f; margin-bottom: 16px; }
          .app-left p { color: #4a5b7a; margin-bottom: 20px; line-height: 1.6; }
          .app-left ul { list-style: none; margin-bottom: 24px; }
          .app-left li { margin-bottom: 8px; color: #334e68; }
          .app-left li i { color: #D4AF37; margin-right: 8px; }
          .app-right { flex: 1; text-align: center; }
          .app-right img { max-width: 280px; border-radius: 30px; box-shadow: 0 20px 30px rgba(0,0,0,0.15); }

          /* FAQ */
          .faq-grid { margin-bottom: 60px; }
          .faq-item {
            background: white; border-radius: 16px; padding: 24px;
            border: 1px solid #eef3fc; margin-bottom: 16px;
          }
          .faq-item h3 { font-size: 1.1rem; color: #001f3f; margin-bottom: 8px; }
          .faq-item p { color: #5b6e8c; }

          @media (max-width: 768px) {
            .container { padding: 0 12px; }
            .hero { flex-direction: column; padding: 32px 24px; text-align: center; }
            .hero-left h1 { font-size: 36px; }
            .hero-left .balance-large { font-size: 36px; }
            .app-showcase { flex-direction: column; }
          }
        `}</style>

        <div className="container">
          {/* HERO */}
          <section className="hero">
            <div className="hero-left">
              <div className="global-badge">
                <i className="fas fa-globe-americas"></i> Global Private Banking
              </div>
              <h1>
                Global Banking<br /><span>Without Borders</span>
              </h1>
              <div className="balance-large">$125,840.42</div>
              <p className="premium-text">
                Premium international banking designed for modern individuals, families, and enterprises.
                Secure. Seamless. Limitless.
              </p>
              <button className="hero-btn">
                Open Account <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <div className="hero-right">
              <div className="bank-card">
                <div className="card-row">
                  <span><i className="fas fa-sim-card"></i> ELITE</span>
                  <span>WORLD</span>
                </div>
                <div className="card-number">5683 **** **** 8848</div>
                <div className="card-details">
                  <span>VALID THRU 12/28</span>
                  <span>JAMES CARTER</span>
                </div>
                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
                  <span className="card-brand">VELUNIS</span>
                  <span><i className="fab fa-cc-visa"></i> <i className="fab fa-cc-mastercard"></i></span>
                </div>
              </div>
              <div className="balance-widget">
                <h4><i className="fas fa-chart-line"></i> Your Balance</h4>
                <h2>$125,840.42</h2>
              </div>
            </div>
          </section>

          {/* STATS */}
          <div className="stats">
            <div className="stat-item"><div className="stat-number">$18B+</div><div className="stat-label">Assets Managed</div></div>
            <div className="stat-item"><div className="stat-number">120+</div><div className="stat-label">Countries Served</div></div>
            <div className="stat-item"><div className="stat-number">2M+</div><div className="stat-label">Happy Clients</div></div>
            <div className="stat-item"><div className="stat-number">99.99%</div><div className="stat-label">Platform Uptime</div></div>
          </div>

          {/* SERVICES */}
          <h2 className="section-title">Our Premium Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <i className="fas fa-user-check"></i>
              <h3>Personal Banking</h3>
              <p>Checking, savings & multi-currency accounts with zero hidden fees.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-chart-line"></i>
              <h3>Business Banking</h3>
              <p>Corporate accounts, payroll, and merchant services for global enterprises.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-gem"></i>
              <h3>Wealth Management</h3>
              <p>Portfolio management, retirement planning, and private advisory.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-exchange-alt"></i>
              <h3>Global Transfers</h3>
              <p>Fast, secure, and affordable worldwide transfers at real exchange rates.</p>
            </div>
          </div>

          {/* SECURITY */}
          <h2 className="section-title">Security You Can Trust</h2>
          <div className="security-grid">
            <div className="security-card"><i className="fas fa-microchip"></i><h3>Military Grade Security</h3></div>
            <div className="security-card"><i className="fas fa-lock"></i><h3>256‑bit SSL Encryption</h3></div>
            <div className="security-card"><i className="fas fa-fingerprint"></i><h3>Biometric Authentication</h3></div>
            <div className="security-card"><i className="fas fa-robot"></i><h3>AI Fraud Detection</h3></div>
            <div className="security-card"><i className="fas fa-layer-group"></i><h3>Multi‑Layer Verification</h3></div>
          </div>

          {/* TESTIMONIALS */}
          <h2 className="section-title">Trusted by Global Clients</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p>“Velunis transformed how I manage international banking.”</p>
              <h4>James Carter</h4>
              <span>Private Banking Client</span>
            </div>
            <div className="testimonial-card">
              <p>“Fast transfers, excellent support and premium card benefits.”</p>
              <h4>Sarah Mitchell</h4>
              <span>Business Banking Client</span>
            </div>
            <div className="testimonial-card">
              <p>“The best international banking experience I've ever used.”</p>
              <h4>Michael Evans</h4>
              <span>Investor</span>
            </div>
          </div>

          {/* MOBILE APP */}
          <div className="app-showcase">
            <div className="app-left">
              <h2>Bank Anywhere. Anytime.</h2>
              <p>
                Manage accounts, transfer funds, freeze cards, track investments and monitor spending from the Velunis Banking App.
              </p>
              <ul>
                <li><i className="fas fa-check-circle"></i> Real‑Time Transactions</li>
                <li><i className="fas fa-check-circle"></i> Card Controls</li>
                <li><i className="fas fa-check-circle"></i> Investment Dashboard</li>
                <li><i className="fas fa-check-circle"></i> Biometric Login</li>
              </ul>
              <button className="hero-btn"><i className="fas fa-download"></i> Download App</button>
            </div>
            <div className="app-right">
              <img src="https://res.cloudinary.com/dkomucpin/image/upload/v1780595160/VELUNIS_BANK_qaymmz.png" alt="Velunis Mobile App" />
            </div>
          </div>

          {/* FAQ */}
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I open an account?</h3>
              <p>Complete the online registration and verify your identity – it takes only a few minutes.</p>
            </div>
            <div className="faq-item">
              <h3>Which countries are supported?</h3>
              <p>We currently serve the United States, United Kingdom, Canada, Europe, and Australia.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer premium cards?</h3>
              <p>Yes. Choose from World Elite, Private Banking, and Premier Gold cards, each with exclusive benefits.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}