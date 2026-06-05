import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../../middleware/auth';

const prisma = new PrismaClient();

export const adminSettingsController = {
  getPaymentConfig: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const config = await prisma.paymentConfig.findFirst();
    res.json(config || {});
  },

  updatePaymentConfig: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const {
      paypalEnabled,
      paypalEmail,
      cryptoBtc,
      cryptoEth,
      cryptoUsdt,
      steamEnabled,
      appleEnabled,
      giftCardEnabled,
    } = req.body;

    const config = await prisma.paymentConfig.upsert({
      where: { id: 'main' },
      update: { paypalEnabled, paypalEmail, cryptoBtc, cryptoEth, cryptoUsdt, steamEnabled, appleEnabled, giftCardEnabled },
      create: { id: 'main', paypalEnabled, paypalEmail, cryptoBtc, cryptoEth, cryptoUsdt, steamEnabled, appleEnabled, giftCardEnabled },
    });

    res.json(config);
  },
};