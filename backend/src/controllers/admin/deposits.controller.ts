import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../../middleware/auth';
import { AppError } from '../../middleware/errorHandler';
import { sendTelegramMessage } from '../../utils/telegram';

const prisma = new PrismaClient();

export const adminDepositsController = {
  getAllDeposits: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const deposits = await prisma.deposit.findMany({
      include: { user: { select: { email: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(deposits);
  },

  approveDeposit: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;   // <-- FIX
    const deposit = await prisma.deposit.findUnique({ where: { id } });
    if (!deposit || deposit.status !== 'PENDING') throw new AppError('Deposit not found or already processed', 400);

    const account = await prisma.account.findFirst({
      where: { userId: deposit.userId, accountType: 'CHECKING' },
    });
    if (!account) throw new AppError('User has no checking account', 400);

    await prisma.$transaction([
      prisma.deposit.update({ where: { id }, data: { status: 'APPROVED', reviewedAt: new Date() } }),
      prisma.account.update({ where: { id: account.id }, data: { balance: { increment: deposit.amount } } }),
      prisma.transaction.create({
        data: {
          userId: deposit.userId,
          accountId: account.id,
          type: 'CREDIT',
          amount: deposit.amount,
          currency: deposit.currency,
          description: `${deposit.method} deposit approved`,
          status: 'COMPLETED',
        },
      }),
      prisma.notification.create({
        data: {
          userId: deposit.userId,
          title: 'Deposit Approved',
          body: `$${deposit.amount} deposit approved and credited`,
          type: 'DEPOSIT',
        },
      }),
    ]);
    res.json({ message: 'Deposit approved' });
  },

  rejectDeposit: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;   // <-- FIX
    const { adminNote } = req.body;
    const deposit = await prisma.deposit.findUnique({ where: { id } });
    if (!deposit || deposit.status !== 'PENDING') throw new AppError('Deposit not found or already processed', 400);

    await prisma.deposit.update({ where: { id }, data: { status: 'REJECTED', adminNote, reviewedAt: new Date() } });
    await prisma.notification.create({
      data: {
        userId: deposit.userId,
        title: 'Deposit Rejected',
        body: `Your deposit of $${deposit.amount} was rejected. Reason: ${adminNote || 'N/A'}`,
        type: 'DEPOSIT',
      },
    });
    res.json({ message: 'Deposit rejected' });
  },
};