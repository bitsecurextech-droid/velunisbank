export default function Contact() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f4f6fb', minHeight: '100vh', padding: '40px 32px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: '#001f3f', marginBottom: '12px' }}>
            Contact Us
          </h1>
          <p style={{ color: '#4a5b7a' }}>Our private banking team is available 24/7.</p>
        </div>
        <form style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #eef3fc', boxShadow: '0 8px 20px rgba(0,0,0,0.02)' }}>
          <input placeholder="Your Name" style={inputStyle} />
          <input placeholder="Email Address" type="email" style={inputStyle} />
          <textarea placeholder="Your Message" rows={4} style={{ ...inputStyle, height: '120px' }} />
          <button style={{ background: '#001f3f', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '40px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', width: '100%' }}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  borderRadius: '12px',
  border: '1px solid #e0e4ea',
  background: '#f9fafc',
  marginBottom: '16px',
  fontSize: '1rem',
  color: '#001f3f',
};