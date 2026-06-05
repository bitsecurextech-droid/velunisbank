export default function ServicesSection() {
  const services = [
    { title: 'Personal Banking', desc: 'Checking, savings, and multi-currency accounts with no hidden fees.', icon: '🏦' },
    { title: 'Business Banking', desc: 'Corporate accounts, payroll, and merchant services for enterprises.', icon: '💼' },
    { title: 'Wealth Management', desc: 'Portfolio management, retirement planning, and private advisory.', icon: '📈' },
    { title: 'Global Transfers', desc: 'Instant internal transfers and international wires at real exchange rates.', icon: '🌍' },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-serif text-gold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(svc => (
            <div key={svc.title} className="glass p-8 rounded-2xl text-center hover:border-gold/30 transition">
              <div className="text-4xl mb-4">{svc.icon}</div>
              <h3 className="text-xl font-serif text-gold mb-3">{svc.title}</h3>
              <p className="text-silver text-sm">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}