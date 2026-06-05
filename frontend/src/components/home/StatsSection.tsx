export default function StatsSection() {
  const stats = [
    { label: 'Assets Managed', value: '$18B+' },
    { label: 'Countries Served', value: '120+' },
    { label: 'Clients', value: '2M+' },
    { label: 'Uptime', value: '99.99%' },
  ];

  return (
    <section className="py-20 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-serif text-gold mb-2">{stat.value}</p>
              <p className="text-silver text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}