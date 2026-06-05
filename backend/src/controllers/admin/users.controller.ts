import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { AuthRequest } from '../../middleware/auth';
import { AppError } from '../../middleware/errorHandler';

const prisma = new PrismaClient();

export const adminUsersController = {
getAllUsers: async (req: AuthRequest, res: Response, next: NextFunction) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      country: true,
      role: true,
      isActive: true,
      isBanned: true,
      transferLocked: true,
      depositLocked: true,
      kycStatus: true,
      createdAt: true,
      // ⬇️ Add this block to include the manager's name & email
      manager: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    } as any,
  });
  res.json(users);
},

  createUser: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { email, password, firstName, lastName, country, currency } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);
      const user = await prisma.user.create({
        data: { email, passwordHash, firstName, lastName, country, currency },
      });
      // auto-create checking account + virtual card
      const accountNumber = `${Date.now()}${Math.floor(Math.random() * 1000)}`.slice(-12);
      await prisma.account.create({
        data: {
          userId: user.id,
          accountType: 'CHECKING',
          accountNumber,
          currency: currency || 'USD',
        },
      });
      await prisma.card.create({
        data: {
          userId: user.id,
          cardNumber: `4${Date.now().toString().slice(-15)}`,
          expiryDate: `${String(new Date().getMonth() + 2).padStart(2, '0')}/${(new Date().getFullYear() + 4) % 100}`,
          cvv: 'encrypted_placeholder', // need encryption utils
          cardType: 'VIRTUAL',
        },
      });
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },

  updateUser: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const { isActive, isBanned, transferLocked, depositLocked, lockReason, role } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { isActive, isBanned, transferLocked, depositLocked, lockReason, role },
    });
    res.json(user);
  },

updateManager: async (req: AuthRequest, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  const { managerId } = req.body;
  await prisma.user.update({ where: { id }, data: { managerId } });
  res.json({ message: 'Manager updated' });
},

};