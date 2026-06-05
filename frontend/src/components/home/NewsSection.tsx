export default function NewsSection() {
  return (
    <section className="py-20 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-serif text-gold text-center mb-12">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-6 rounded-2xl">
            <p className="text-silver text-xs mb-2">June 2026</p>
            <h3 className="text-gold font-serif mb-2">Velunis Expands to 120+ Countries</h3>
            <p className="text-silver text-sm">Our global footprint now covers every major economy.</p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <p className="text-silver text-xs mb-2">May 2026</p>
            <h3 className="text-gold font-serif mb-2">New AI Fraud System Deployed</h3>
            <p className="text-silver text-sm">Real-time threat detection reduces fraud by 99%.</p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <p className="text-silver text-xs mb-2">April 2026</p>
            <h3 className="text-gold font-serif mb-2">World Elite Card Wins Award</h3>
            <p className="text-silver text-sm">Recognized as the best premium banking card globally.</p>
          </div>
        </div>
      </div>
    </section>
  );
}