export default function RestrictedPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        background: '#081426',
        color: '#F8F8F6',
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(212,175,55,0.15)',
          padding: '16px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
            }}
          >
            <img
              src="https://res.cloudinary.com/dkomucpin/image/upload/v1780595302/velunis_icon_favicon_zpbqv2.png"
              alt="Velunis Bank"
              style={{
                height: '40px',
                width: '40px',
                borderRadius: '50%',
              }}
            />
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#D4AF37',
                fontSize: '1.5rem',
                letterSpacing: '1px',
              }}
            >
              VELUNIS BANK
            </span>
          </a>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            width: '100%',
            background: 'rgba(8,20,38,0.6)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '24px',
            padding: '56px 32px',
            boxShadow:
              '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
            textAlign: 'center',
          }}
        >
          {/* Gold Lock Emblem */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                height: '80px',
                width: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D4AF37, #b8960f)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(212,175,55,0.3)',
              }}
            >
              <svg
                style={{ width: '40px', height: '40px', color: '#081426' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#D4AF37',
              fontSize: '2.5rem',
              lineHeight: '1.2',
              marginBottom: '16px',
            }}
          >
            Service Not Available
            <br />
            in Your Region
          </h1>

          <div
            style={{
              width: '80px',
              height: '2px',
              background: '#D4AF37',
              margin: '24px auto',
            }}
          />

          <p
            style={{
              color: '#C7CDD6',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              marginBottom: '12px',
            }}
          >
            Velunis Bank is currently unavailable in your country. We are
            expanding rapidly to bring premium banking to every corner of the
            globe.
          </p>

          <p
            style={{
              color: 'rgba(199,205,214,0.7)',
              fontSize: '0.9rem',
              marginBottom: '32px',
            }}
          >
            Our international banking services are currently offered to
            residents of the United States, United Kingdom, Canada, Australia,
            and the European Union.
          </p>

          <div
            style={{
              marginTop: '32px',
              padding: '20px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '16px',
              border: '1px solid rgba(212,175,55,0.1)',
            }}
          >
            <p style={{ color: '#C7CDD6', fontSize: '0.9rem', marginBottom: '8px' }}>
              For inquiries, reach our global support team
            </p>
            <a
              href="mailto:support@velunisbank.com"
              style={{
                color: '#D4AF37',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1.2rem',
              }}
            >
              support@velunisbank.com
            </a>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: '1px solid rgba(212,175,55,0.1)',
          padding: '20px 24px',
          fontSize: '0.85rem',
          color: 'rgba(199,205,214,0.5)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src="https://res.cloudinary.com/dkomucpin/image/upload/v1780595302/velunis_icon_favicon_zpbqv2.png"
              alt="Velunis"
              style={{ height: '16px', width: '16px', borderRadius: '50%' }}
            />
            <span>
              © {new Date().getFullYear()} Velunis Bank. Banking Without
              Borders.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a
              href="/privacy-policy"
              style={{ color: 'rgba(199,205,214,0.7)', textDecoration: 'none' }}
            >
              Privacy
            </a>
            <a
              href="/terms"
              style={{ color: 'rgba(199,205,214,0.7)', textDecoration: 'none' }}
            >
              Terms
            </a>
            <a
              href="/contact"
              style={{ color: 'rgba(199,205,214,0.7)', textDecoration: 'none' }}
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}