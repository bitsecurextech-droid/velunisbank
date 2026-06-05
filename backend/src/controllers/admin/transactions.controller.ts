import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../../middleware/auth';
import { AppError } from '../../middleware/errorHandler';

const prisma = new PrismaClient();

export const adminTransactionsController = {
  getTransactions: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const txns = await prisma.transaction.findMany({
      include: {
        user: { select: { email: true } },
        account: { select: { accountNumber: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(txns);
  },

  approveTransfer: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;   // <-- FIX
    const txn = await prisma.transaction.findUnique({ where: { id } });
    if (!txn || txn.type !== 'TRANSFER_OUT' || txn.status !== 'PENDING')
      throw new AppError('Invalid transaction', 400);

    const recipient = await prisma.account.findUnique({
      where: { accountNumber: txn.recipientAccount! },
    });
    if (!recipient) throw new AppError('Recipient account not found', 404);

    await prisma.$transaction([
      prisma.transaction.update({ where: { id }, data: { status: 'COMPLETED' } }),
      prisma.account.update({
        where: { id: txn.accountId },
        data: { balance: { decrement: txn.amount } },
      }),
      prisma.account.update({
        where: { id: recipient.id },
        data: { balance: { increment: txn.amount } },
      }),
      prisma.transaction.create({
        data: {
          userId: recipient.userId,
          accountId: recipient.id,
          type: 'TRANSFER_IN',
          amount: txn.amount,
          currency: txn.currency,
          description: `Transfer from ${txn.accountId}`,
          status: 'COMPLETED',
          reference: txn.id,
        },
      }),
      prisma.notification.createMany({
        data: [
          {
            userId: txn.userId,
            title: 'Transfer Sent',
            body: `$${txn.amount} sent to ${txn.recipientName}`,
            type: 'TRANSACTION',
          },
          {
            userId: recipient.userId,
            title: 'Transfer Received',
            body: `$${txn.amount} received`,
            type: 'TRANSACTION',
          },
        ],
      }),
    ]);
    res.json({ message: 'Transfer approved' });
  },

  rejectTransfer: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;   // <-- FIX
    const txn = await prisma.transaction.findUnique({ where: { id } });
    if (!txn) throw new AppError('Transaction not found', 404);
    await prisma.transaction.update({ where: { id }, data: { status: 'FAILED' } });
    res.json({ message: 'Transfer rejected' });
  },
};