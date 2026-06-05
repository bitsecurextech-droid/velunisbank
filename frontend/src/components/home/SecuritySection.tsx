export default function SecuritySection() {
  return (
    <section className="py-20 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-serif text-gold mb-6">Military-Grade Security</h2>
        <p className="text-silver mb-12 max-w-2xl mx-auto">
          Your assets are protected with the same encryption used by governments and global financial institutions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="glass p-6 rounded-2xl">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-gold font-serif mb-2">256-bit Encryption</h3>
            <p className="text-silver text-sm">Data encrypted at rest and in transit.</p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-gold font-serif mb-2">AI Fraud Detection</h3>
            <p className="text-silver text-sm">Real-time monitoring of every transaction.</p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <div className="text-3xl mb-3">🔐</div>
            <h3 className="text-gold font-serif mb-2">Biometric Login</h3>
            <p className="text-silver text-sm">Face ID and fingerprint authentication.</p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="text-gold font-serif mb-2">2FA Protection</h3>
            <p className="text-silver text-sm">Two-factor authentication on every login.</p>
          </div>
        </div>
      </div>
    </section>
  );
}