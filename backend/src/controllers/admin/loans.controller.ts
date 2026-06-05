import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../../middleware/auth';

const prisma = new PrismaClient();

export const adminLoanController = {
  getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const loans = await prisma.loan.findMany({
      include: { user: { select: { email: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(loans);
  },
updateStatus: async (req: AuthRequest, res: Response, next: NextFunction) => {
  const id = req.params.id as string;   // cast added
  const { status } = req.body;
  await prisma.loan.update({ where: { id }, data: { status } });
  res.json({ message: 'Updated' });
},
};