import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const accountController = {
  getAccounts: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const accounts = await prisma.account.findMany({ where: { userId: req.user!.id, isActive: true } });
      res.json(accounts);
    } catch (err) { next(err); }
  },

  getAccount: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const accountId = req.params.id as string;  // <-- FIX HERE
      const account = await prisma.account.findFirst({
        where: { id: accountId, userId: req.user!.id },
      });
      if (!account) throw new AppError('Account not found', 404);
      res.json(account);
    } catch (err) { next(err); }
  },

  createAccount: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { accountType, currency } = req.body;
      const accountNumber = `${Date.now()}${Math.floor(Math.random() * 1000)}`.slice(-12);
      const account = await prisma.account.create({
        data: {
          userId: req.user!.id,
          accountType,
          accountNumber,
          currency: currency || 'USD',
          iban: `VN${accountNumber}`,
          swift: 'VELUNISXX',
          routingNumber: `${Math.floor(100000000 + Math.random() * 900000000)}`,
        },
      });
      res.status(201).json(account);
    } catch (err) { next(err); }
  },
};