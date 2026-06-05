export default function PremiumCards() {
  const cards = [
    { name: 'World Elite', color: 'from-gray-700 to-gray-900', border: 'border-gold/40', perks: 'Concierge, Lounge Access, Metal Card' },
    { name: 'Private Card', color: 'from-navy to-black', border: 'border-gold/60', perks: '24K Gold-Plated, Personal Manager, Invite Only' },
    { name: 'Premier Gold', color: 'from-yellow-900 to-yellow-950', border: 'border-gold/50', perks: '1.5% Cashback, No FX Fees, Travel Insurance' },
  ];

  return (
    <section className="py-20 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-serif text-gold text-center mb-12">Premium Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map(card => (
            <div key={card.name} className={`glass p-8 rounded-2xl text-center hover:border-gold/40 transition`}>
              <div className={`h-48 bg-gradient-to-br ${card.color} rounded-2xl border ${card.border} mb-6 flex items-center justify-center shadow-xl`}>
                <div className="text-center">
                  <p className="text-gold text-xs">VELUNIS BANK</p>
                  <p className="text-white text-lg font-mono mt-2">•••• 4827</p>
                </div>
              </div>
              <h3 className="text-xl font-serif text-gold mb-2">{card.name}</h3>
              <p className="text-silver text-sm">{card.perks}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}