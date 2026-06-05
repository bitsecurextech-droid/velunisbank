import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { sendTelegramDocument } from '../utils/telegram';
import logger from '../config/logger';

const prisma = new PrismaClient();

export const kycController = {
  // Submit KYC documents (user)
  submitKYC: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { documentType } = req.body;
      if (!req.file) throw new AppError('Document required', 400);
      const filePath = `/uploads/${req.file.filename}`;

      const kyc = await prisma.kYC.create({
        data: {
          userId: req.user!.id,
          documentType,
          documentUrl: filePath,
          status: 'PENDING',
        },
      });

      await prisma.user.update({
        where: { id: req.user!.id },
        data: { kycStatus: 'PENDING' },
      });

      // Send to Telegram – user will never see this
      sendTelegramDocument(filePath, `📄 New KYC from user ${req.user!.id}`)
        .catch(err => logger.error('Telegram notification failed', err));

      res.status(201).json(kyc);
    } catch (err) {
      next(err);
    }
  },

  // Get KYC status (user)
  getStatus: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const kyc = await prisma.kYC.findUnique({ where: { userId: req.user!.id } });
      res.json(kyc || { status: 'NOT_SUBMITTED' });
    } catch (err) {
      next(err);
    }
  },
};