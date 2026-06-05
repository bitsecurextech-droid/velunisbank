export default function MobileAppShowcase() {
  return (
    <section className="py-20 bg-black/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif text-gold mb-6">Banking in Your Pocket</h2>
            <p className="text-silver text-lg mb-8">
              Our mobile app delivers the full Velunis experience on your phone. Transfer, deposit, freeze cards, and chat with support — anywhere.
            </p>
            <div className="flex gap-4">
              <div className="bg-black/60 border border-gold/20 rounded-xl px-6 py-3 text-white text-sm">App Store</div>
              <div className="bg-black/60 border border-gold/20 rounded-xl px-6 py-3 text-white text-sm">Google Play</div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-96 bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl border-2 border-gold/30 p-4 shadow-2xl">
              <div className="bg-navy/50 rounded-xl p-4 mb-3 text-center">
                <p className="text-gold text-xs">Balance</p>
                <p className="text-white font-bold">$48,250</p>
              </div>
              <div className="space-y-2">
                <div className="bg-navy/30 rounded-lg p-3 text-xs text-silver">Send Money</div>
                <div className="bg-navy/30 rounded-lg p-3 text-xs text-silver">Deposit</div>
                <div className="bg-navy/30 rounded-lg p-3 text-xs text-silver">Cards</div>
                <div className="bg-navy/30 rounded-lg p-3 text-xs text-silver">Transactions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}