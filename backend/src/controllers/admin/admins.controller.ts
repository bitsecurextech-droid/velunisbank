import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { AuthRequest } from '../../middleware/auth';
import { AppError } from '../../middleware/errorHandler';

const prisma = new PrismaClient();

export const adminsController = {
getAllAdmins: async (req: AuthRequest, res: Response, next: NextFunction) => {
  const admins = await prisma.user.findMany({
    where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    } as any,   // <-- temporary bypass for stale types
  });
  res.json(admins);
},

  createAdmin: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { email, password, firstName, lastName, role } = req.body;
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') throw new AppError('Invalid role', 400);
    const passwordHash = await bcrypt.hash(password, 12);
    const admin = await prisma.user.create({
      data: { email, passwordHash, firstName, lastName, country: 'US', role },
    });
    res.status(201).json({ id: admin.id, email: admin.email, role: admin.role });
  },
};