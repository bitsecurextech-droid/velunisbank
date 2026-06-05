import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const beneficiaryController = {
  list: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const bens = await prisma.beneficiary.findMany({ where: { userId: req.user!.id } });
    res.json(bens);
  },
  create: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { name, accountNumber, bankName, swift, country, currency } = req.body;
    const ben = await prisma.beneficiary.create({
      data: { userId: req.user!.id, name, accountNumber, bankName, swift, country, currency },
    });
    res.status(201).json(ben);
  },
  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;   // <-- FIX
    await prisma.beneficiary.delete({ where: { id } });
    res.json({ message: 'Deleted' });
  },
};