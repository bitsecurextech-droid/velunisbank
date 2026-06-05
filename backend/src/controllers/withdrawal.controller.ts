import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const withdrawalController = {
  create: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { amount, pin, accountNumber, routingNumber, bankName, recipientName } = req.body;
      const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
      if (!user?.transactionPinHash) throw new AppError('Transaction PIN not set', 400);
      const validPin = await bcrypt.compare(pin, user.transactionPinHash);
      if (!validPin) throw new AppError('Invalid PIN', 400);

      const checking = await prisma.account.findFirst({
        where: { userId: req.user!.id, accountType: 'CHECKING' },
      });
      if (!checking || checking.balance < amount) throw new AppError('Insufficient funds', 400);

      await prisma.withdrawal.create({
        data: {
          userId: req.user!.id,
          amount: parseFloat(amount),
          currency: 'USD',
          status: 'PENDING',
          recipientName,
          accountNumber,
          routingNumber,
          bankName,
        },
      });

      res.status(201).json({ message: 'Withdrawal request submitted for approval' });
    } catch (err) { next(err); }
  },

  history: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const withdrawals = await prisma.withdrawal.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(withdrawals);
  },
};