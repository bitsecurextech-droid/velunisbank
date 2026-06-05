export default function Careers() {
  const jobs = [
    { title: 'Senior Backend Engineer', location: 'London / Remote', type: 'Full-time' },
    { title: 'UX Designer', location: 'New York', type: 'Full-time' },
    { title: 'Compliance Officer', location: 'London', type: 'Full-time' },
    { title: 'Customer Support Specialist', location: 'Remote', type: 'Full-time' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f4f6fb', minHeight: '100vh', padding: '40px 32px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#001f3f', marginBottom: '12px' }}>
            Careers at Velunis
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#4a5b7a' }}>
            Join a team that is redefining global banking.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          {jobs.map((job) => (
            <div key={job.title} style={{
              background: 'white', borderRadius: '20px', padding: '24px 28px',
              border: '1px solid #eef3fc', boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
              display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: '#001f3f', marginBottom: '4px' }}>{job.title}</h3>
                <p style={{ color: '#5b6e8c', fontSize: '0.95rem' }}>{job.location} · {job.type}</p>
              </div>
              <button style={{
                background: '#001f3f', color: 'white', border: 'none', padding: '10px 24px',
                borderRadius: '40px', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
              }}>
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}