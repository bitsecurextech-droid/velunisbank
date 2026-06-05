import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../../middleware/auth';

const prisma = new PrismaClient();

export const adminReportsController = {
  userReport: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const totalUsers = await prisma.user.count();
    const kycApproved = await prisma.user.count({ where: { kycStatus: 'APPROVED' } });
    res.json({ totalUsers, kycApproved });
  },
  transactionReport: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const totalVolume = await prisma.transaction.aggregate({ _sum: { amount: true } });
    res.json({ totalVolume: totalVolume._sum.amount || 0 });
  },
  // ... more as needed
};