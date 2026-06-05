import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { sendTelegramMessage, sendTelegramDocument } from '../utils/telegram';
import logger from '../config/logger';

const prisma = new PrismaClient();

export const depositController = {

  // ── Gift Card Deposit (Steam, Apple, Generic) ──
  submitGiftCard: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { amount, code, method } = req.body; // method: STEAM, APPLE, GIFT_CARD
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
      if (!imageUrl) throw new AppError('Gift card image required', 400);

      const deposit = await prisma.deposit.create({
        data: {
          userId: req.user!.id,
          method,
          amount: parseFloat(amount),
          currency: 'USD',
          imageUrl,
          code,
          status: 'PENDING',
        },
      });

      // Send image to Telegram silently (admin review)
      sendTelegramDocument(
        imageUrl,
        `🛍️ New ${method} deposit from user ${req.user!.id}\nAmount: $${amount}\nCode: ${code}`
      ).catch(err => logger.error('Telegram send failed', err));

      res.status(201).json({ message: 'Deposit submitted for review', depositId: deposit.id });
    } catch (err) {
      next(err);
    }
  },

  // ── PayPal Deposit (auto‑credited if enabled) ──
  submitPayPal: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { amount, paypalTxnId } = req.body;

      // Check if PayPal is enabled
      const config = await prisma.paymentConfig.findFirst();
      if (!config || !config.paypalEnabled) throw new AppError('PayPal deposits not available', 400);

      const deposit = await prisma.deposit.create({
        data: {
          userId: req.user!.id,
          method: 'PAYPAL',
          amount: parseFloat(amount),
          currency: 'USD',
          paypalTxnId,
          status: 'PENDING',
        },
      });

      // Auto‑credit instantly (per spec)
      await approvePayPalDeposit(deposit.id, req.user!.id);

      res.status(201).json({ message: 'PayPal deposit processed', depositId: deposit.id });
    } catch (err) {
      next(err);
    }
  },

  // ── Crypto Deposit (manual review) ──
  submitCrypto: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { amount, cryptoType, txnHash } = req.body;
      const deposit = await prisma.deposit.create({
        data: {
          userId: req.user!.id,
          method: 'CRYPTO',
          amount: parseFloat(amount),
          currency: 'USD',
          cryptoType,
          cryptoTxnHash: txnHash,
          status: 'PENDING',
        },
      });

      sendTelegramMessage(
        `New Crypto deposit #${deposit.id} from user ${req.user!.id} - ${amount} ${cryptoType} - hash: ${txnHash}`
      );

      res.status(201).json({ message: 'Deposit submitted for review', depositId: deposit.id });
    } catch (err) {
      next(err);
    }
  },

  // ── Get User's Deposit History ──
  getUserDeposits: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const deposits = await prisma.deposit.findMany({
        where: { userId: req.user!.id },
        orderBy: { createdAt: 'desc' },
      });
      res.json(deposits);
    } catch (err) {
      next(err);
    }
  },
};

// ── Internal helper for auto‑approving PayPal (instant credit) ──
async function approvePayPalDeposit(depositId: string, userId: string) {
  const deposit = await prisma.deposit.findUnique({ where: { id: depositId } });
  if (!deposit || deposit.status !== 'PENDING') return;

  const checkingAccount = await prisma.account.findFirst({
    where: { userId, accountType: 'CHECKING' },
  });
  if (!checkingAccount) throw new Error('No checking account');

  await prisma.$transaction([
    prisma.deposit.update({
      where: { id: depositId },
      data: { status: 'APPROVED', reviewedAt: new Date() },
    }),
    prisma.account.update({
      where: { id: checkingAccount.id },
      data: { balance: { increment: deposit.amount } },
    }),
    prisma.transaction.create({
      data: {
        userId,
        accountId: checkingAccount.id,
        type: 'CREDIT',
        amount: deposit.amount,
        currency: deposit.currency,
        description: `PayPal deposit (${deposit.paypalTxnId})`,
        status: 'COMPLETED',
      },
    }),
    prisma.notification.create({
      data: {
        userId,
        title: 'Deposit Approved',
        body: `$${deposit.amount} PayPal deposit credited to your account`,
        type: 'DEPOSIT',
      },
    }),
  ]);
}