import { Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const pinController = {
  setPin: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { pin } = req.body;
      if (!pin || pin.length !== 4 || !/^\d+$/.test(pin)) throw new AppError('PIN must be exactly 4 digits', 400);
      const hash = await bcrypt.hash(pin, 10);
      await prisma.user.update({
        where: { id: req.user!.id },
        data: { transactionPinHash: hash, isPinSet: true },
      });
      res.json({ message: 'Transaction PIN set successfully' });
    } catch (err) { next(err); }
  },

  verifyPin: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
      if (!user?.transactionPinHash) throw new AppError('PIN not set', 400);
      const valid = await bcrypt.compare(req.body.pin, user.transactionPinHash);
      res.json({ valid });
    } catch (err) { next(err); }
  },
};