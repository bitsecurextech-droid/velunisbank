'use client';
import { useEffect, useState } from 'react';
import { useCountryCheck } from '@/hooks/useCountryCheck';
import RestrictedPage from '@/app/(public)/restricted/page';

export function CountryGate({ children }: { children: React.ReactNode }) {
  const { allowed, loading } = useCountryCheck();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy">
        <p className="text-gold">Loading...</p>
      </div>
    );
  }

  if (!allowed) {
    return <RestrictedPage />;
  }

  return <>{children}</>;
}