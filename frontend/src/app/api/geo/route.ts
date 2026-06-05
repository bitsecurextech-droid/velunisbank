import { NextResponse } from 'next/server';

// Blocked country codes (ISO 3166-1 alpha-2)
const BLOCKED_COUNTRIES = [
  'NG', 'GH', 'KE', 'ZA', 'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV',
  'CF', 'TD', 'KM', 'CG', 'CD', 'CI', 'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET',
  'GA', 'GM', 'GN', 'GW', 'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU',
  'MA', 'MZ', 'NA', 'NE', 'RW', 'ST', 'SN', 'SC', 'SL', 'SO', 'SS', 'SD',
  'TZ', 'TG', 'TN', 'UG', 'ZM', 'ZW',
];

// Map country to currency
const CURRENCY_MAP: Record<string, string> = {
  US: 'USD',
  GB: 'GBP',
  CA: 'CAD',
  AU: 'AUD',
  // EU countries
  AT: 'EUR', BE: 'EUR', BG: 'EUR', CY: 'EUR', CZ: 'EUR', DE: 'EUR',
  DK: 'EUR', EE: 'EUR', ES: 'EUR', FI: 'EUR', FR: 'EUR', GR: 'EUR',
  HR: 'EUR', HU: 'EUR', IE: 'EUR', IT: 'EUR', LT: 'EUR', LU: 'EUR',
  LV: 'EUR', MT: 'EUR', NL: 'EUR', PL: 'EUR', PT: 'EUR', RO: 'EUR',
  SE: 'EUR', SI: 'EUR', SK: 'EUR',
};

export async function GET(request: Request) {
  try {
    // Get client IP from headers (Vercel, Netlify, etc. pass it)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '8.8.8.8'; // fallback for localhost

    // For development on localhost, you can force a test country:
    // const ip = '102.89.22.5'; // Nigerian IP for testing restricted
    // const ip = '8.8.8.8';     // US IP for testing allowed

    const res = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await res.json();

    if (data.status === 'fail') {
      // Default to allowed for unknown IPs (like localhost)
      return NextResponse.json({ allowed: true, currency: 'USD' });
    }

    const countryCode = data.countryCode;
    const allowed = !BLOCKED_COUNTRIES.includes(countryCode);
    const currency = CURRENCY_MAP[countryCode] || 'USD';

    return NextResponse.json({ allowed, currency, country: countryCode });
  } catch (error) {
    // If the API fails, allow access (or you can block – change as needed)
    return NextResponse.json({ allowed: true, currency: 'USD' });
  }
}