import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const transferController = {
  lookupRecipient: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { accountNumber } = req.query;
      const account = await prisma.account.findUnique({
        where: { accountNumber: accountNumber as string },
        include: { user: { select: { firstName: true, lastName: true } } },
      });
      if (!account) return res.json({ name: null });
      res.json({ name: `${account.user.firstName} ${account.user.lastName}`, accountId: account.id });
    } catch (err) { next(err); }
  },

  createTransfer: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { accountNumber, amount, description } = req.body;
      const sender = await prisma.account.findFirst({
        where: { userId: req.user!.id, accountType: 'CHECKING' },
      });
      if (!sender) throw new AppError('No checking account', 400);
      if (sender.balance < amount) throw new AppError('Insufficient funds', 400);

      // Check if user is transfer-locked
      const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
      if (user?.transferLocked) throw new AppError(`Transfers locked: ${user.lockReason || 'Contact support'}`, 403);

      // Find recipient
      const recipientAccount = await prisma.account.findUnique({ where: { accountNumber } });
      if (!recipientAccount) throw new AppError('Recipient account not found', 404);

      // Create pending transfer
      const txn = await prisma.transaction.create({
        data: {
          userId: req.user!.id,
          accountId: sender.id,
          type: 'TRANSFER_OUT',
          amount: parseFloat(amount),
          currency: sender.currency,
          description: description || 'Transfer',
          status: 'PENDING',
          recipientName: `${recipientAccount.userId}`, // placeholder; we'll use actual name lookup later
          recipientAccount: recipientAccount.accountNumber,
        },
      });

      res.status(201).json({ message: 'Transfer pending approval', transactionId: txn.id });
    } catch (err) { next(err); }
  },

  getTransfers: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const txns = await prisma.transaction.findMany({
        where: { userId: req.user!.id, type: { in: ['TRANSFER_OUT', 'TRANSFER_IN'] } },
        orderBy: { createdAt: 'desc' },
      });
      res.json(txns);
    } catch (err) { next(err); }
  },
};