'use client';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/90 to-navy z-0" />
      <div className="max-w-7xl mx-auto px-4 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif text-gold mb-6 leading-tight">
              Global Banking<br />Without Borders
            </h1>
            <p className="text-silver text-lg mb-8 max-w-xl">
              Premium international banking designed for individuals, businesses, and global citizens.
            </p>
            <div className="flex gap-4">
              <Link href="/login" className="bg-gold text-navy font-semibold px-8 py-4 rounded-lg hover:bg-gold/90 transition">
                Open Account
              </Link>
              <Link href="/personal-banking" className="glass px-8 py-4 rounded-lg text-white font-semibold hover:border-gold/40 transition">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="glass p-8 rounded-2xl">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-56 rounded-xl flex items-center justify-center border border-gold/20">
                <div className="w-80 h-48 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl border border-gold/30 shadow-2xl p-6 relative overflow-hidden">
                  <div className="text-gold text-xs mb-4">VELUNIS BANK</div>
                  <div className="text-white text-lg font-mono mb-4">•••• •••• •••• 4827</div>
                  <div className="flex justify-between text-xs text-silver">
                    <span>JOHN DOE</span>
                    <span>12/28</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent pointer-events-none" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-navy/50 rounded-xl p-4 border border-gold/10">
                  <p className="text-silver text-xs">Balance</p>
                  <p className="text-gold text-xl font-semibold">$48,250</p>
                </div>
                <div className="bg-navy/50 rounded-xl p-4 border border-gold/10">
                  <p className="text-silver text-xs">Growth</p>
                  <p className="text-green-400 text-xl font-semibold">+12.4%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}