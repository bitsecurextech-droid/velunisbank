export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-serif text-gold text-center mb-12">Trusted by Millions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-2xl">
            <p className="text-silver mb-4">“Velunis made international business effortless. I can hold multiple currencies and transfer instantly.”</p>
            <p className="text-gold font-serif">— Sarah Chen, CEO</p>
          </div>
          <div className="glass p-8 rounded-2xl">
            <p className="text-silver mb-4">“The World Elite card is stunning. Concierge service is truly world-class.”</p>
            <p className="text-gold font-serif">— Michael Ross, Entrepreneur</p>
          </div>
          <div className="glass p-8 rounded-2xl">
            <p className="text-silver mb-4">“Their security features give me peace of mind. Best banking experience ever.”</p>
            <p className="text-gold font-serif">— David Kim, Investor</p>
          </div>
        </div>
      </div>
    </section>
  );
}