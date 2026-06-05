import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { encrypt, decrypt } from '../utils/encryption';
import logger from '../config/logger';

const prisma = new PrismaClient();

export const cardController = {
  getCards: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const cards = await prisma.card.findMany({ where: { userId: req.user!.id } });
      const safeCards = cards.map(card => ({
        ...card,
        cardNumber: `****${card.cardNumber.slice(-4)}`,
        cvv: undefined,
      }));
      res.json(safeCards);
    } catch (err) { next(err); }
  },

  getCardDetails: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const cardId = req.params.id as string;   // <-- FIX
      const card = await prisma.card.findFirst({ where: { id: cardId, userId: req.user!.id } });
      if (!card) throw new AppError('Card not found', 404);
      res.json({
        ...card,
        cardNumber: card.cardNumber,
        cvv: decrypt(card.cvv),
      });
    } catch (err) { next(err); }
  },

  freezeCard: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const cardId = req.params.id as string;   // <-- FIX
      const card = await prisma.card.findFirst({ where: { id: cardId, userId: req.user!.id } });
      if (!card) throw new AppError('Card not found', 404);
      await prisma.card.update({ where: { id: card.id }, data: { isFrozen: true } });
      res.json({ message: 'Card frozen' });
    } catch (err) { next(err); }
  },

  unfreezeCard: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const cardId = req.params.id as string;   // <-- FIX
      const card = await prisma.card.findFirst({ where: { id: cardId, userId: req.user!.id } });
      if (!card) throw new AppError('Card not found', 404);
      await prisma.card.update({ where: { id: card.id }, data: { isFrozen: false } });
      res.json({ message: 'Card unfrozen' });
    } catch (err) { next(err); }
  },

  topUpCard: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { cardId, amount } = req.body;
      const card = await prisma.card.findFirst({ where: { id: cardId, userId: req.user!.id } });
      if (!card) throw new AppError('Card not found', 404);
      const checkingAccount = await prisma.account.findFirst({
        where: { userId: req.user!.id, accountType: 'CHECKING' },
      });
      if (!checkingAccount || checkingAccount.balance < amount) throw new AppError('Insufficient funds', 400);
      await prisma.$transaction([
        prisma.account.update({ where: { id: checkingAccount.id }, data: { balance: { decrement: amount } } }),
        prisma.card.update({ where: { id: card.id }, data: { balance: { increment: amount } } }),
        prisma.transaction.create({
          data: {
            userId: req.user!.id,
            accountId: checkingAccount.id,
            type: 'DEBIT',
            amount,
            currency: checkingAccount.currency,
            description: 'Top-up card',
            status: 'COMPLETED',
          },
        }),
        prisma.cardTransaction.create({
          data: {
            cardId: card.id,
            amount,
            merchant: 'Card Top-up',
            status: 'COMPLETED',
          },
        }),
      ]);
      res.json({ message: 'Card topped up' });
    } catch (err) { next(err); }
  },

  getCardTransactions: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const cardId = req.params.id as string;   // <-- FIX
      const txns = await prisma.cardTransaction.findMany({
        where: { cardId, card: { userId: req.user!.id } },
        orderBy: { createdAt: 'desc' },
      });
      res.json(txns);
    } catch (err) { next(err); }
  },
};