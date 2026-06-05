import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../../middleware/auth';
import { AppError } from '../../middleware/errorHandler';
import { encrypt } from '../../utils/encryption';

const prisma = new PrismaClient();

export const adminCardsController = {
  getAllCards: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const cards = await prisma.card.findMany({
      include: { user: { select: { email: true } } },
      orderBy: { createdAt: 'desc' },
    });
    const safe = cards.map(c => ({ ...c, cvv: '****' }));
    res.json(safe);
  },

  issueCard: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { userId, cardType } = req.body;
    const cardNumber = `4${Date.now().toString().slice(-15)}`;
    const expiryDate = `${String(new Date().getMonth() + 2).padStart(2, '0')}/${(new Date().getFullYear() + 4) % 100}`;
    const cvv = encrypt(String(Math.floor(100 + Math.random() * 900)));
    const card = await prisma.card.create({
      data: { userId, cardNumber, expiryDate, cvv, cardType: cardType || 'PHYSICAL_DEBIT' },
    });
    res.status(201).json({ ...card, cvv: '****' });
  },

  freezeCard: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;   // <-- FIX
    const card = await prisma.card.update({ where: { id }, data: { isFrozen: true } });
    res.json(card);
  },

  unfreezeCard: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;   // <-- FIX
    const card = await prisma.card.update({ where: { id }, data: { isFrozen: false } });
    res.json(card);
  },

  terminateCard: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;   // <-- FIX
    await prisma.card.delete({ where: { id } });
    res.json({ message: 'Card terminated' });
  },
};