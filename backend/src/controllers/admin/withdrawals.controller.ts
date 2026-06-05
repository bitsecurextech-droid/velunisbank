import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../../middleware/auth';
import { AppError } from '../../middleware/errorHandler';

const prisma = new PrismaClient();

export const adminWithdrawalController = {
  getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const withdrawals = await prisma.withdrawal.findMany({
      include: { user: { select: { email: true, firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(withdrawals);
  },
  approve: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const withdrawal = await prisma.withdrawal.findUnique({ where: { id } });
    if (!withdrawal || withdrawal.status !== 'PENDING') throw new AppError('Invalid', 400);

    const account = await prisma.account.findFirst({
      where: { userId: withdrawal.userId, accountType: 'CHECKING' },
    });
    if (!account || account.balance < withdrawal.amount) throw new AppError('Insufficient funds', 400);

    await prisma.$transaction([
      prisma.withdrawal.update({ where: { id }, data: { status: 'APPROVED', approvedAt: new Date() } }),
      prisma.account.update({ where: { id: account.id }, data: { balance: { decrement: withdrawal.amount } } }),
      prisma.transaction.create({
        data: {
          userId: withdrawal.userId,
          accountId: account.id,
          type: 'DEBIT',
          amount: withdrawal.amount,
          currency: withdrawal.currency,
          description: `Withdrawal to ${withdrawal.recipientName}`,
          status: 'COMPLETED',
        },
      }),
      prisma.notification.create({
        data: {
          userId: withdrawal.userId,
          title: 'Withdrawal Approved',
          body: `$${withdrawal.amount} has been sent to ${withdrawal.recipientName}`,
          type: 'TRANSACTION',
        },
      }),
    ]);
    res.json({ message: 'Approved' });
  },
  reject: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const { adminNote } = req.body;
    await prisma.withdrawal.update({ where: { id }, data: { status: 'REJECTED', adminNote } });
    res.json({ message: 'Rejected' });
  },
};