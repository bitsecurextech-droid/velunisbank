import { Request, Response, NextFunction } from 'express';

const BLOCKED_COUNTRIES = [
  'NG', 'GH', 'KE', 'ZA', 'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV',
  'CF', 'TD', 'KM', 'CG', 'CD', 'CI', 'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET',
  'GA', 'GM', 'GN', 'GW', 'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU',
  'MA', 'MZ', 'NA', 'NE', 'RW', 'ST', 'SN', 'SC', 'SL', 'SO', 'SS', 'SD',
  'TZ', 'TG', 'TN', 'UG', 'ZM', 'ZW'
];

export const countryGate = (req: Request, res: Response, next: NextFunction) => {
  const country = req.headers['x-country-code'] as string || '';
  if (BLOCKED_COUNTRIES.includes(country.toUpperCase())) {
    return res.status(403).json({ error: 'Service not available in your region' });
  }
  next();
};