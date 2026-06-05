import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const userController = {
getProfile: async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        middleName: true,
        phone: true,
        dateOfBirth: true,
        country: true,
        currency: true,
        role: true,
        kycStatus: true,
        isPinSet: true,
        avatarUrl: true,
        lastLogin: true,
        lastLoginIp: true,
        dailyTransferLimit: true,
        dailyWithdrawalLimit: true,
        addressLine1: true,
        addressLine2: true,
        city: true,
        state: true,
        postalCode: true,
        employmentStatus: true,
        annualIncome: true,
        sourceOfFunds: true,
        accountTypeRequested: true,
        transferLocked: true,
        depositLocked: true,
        lockReason: true,
      },
    });
    res.json(user);
  } catch (err) { next(err); }
},

  updateProfile: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { firstName, lastName, phone } = req.body;
      const user = await prisma.user.update({
        where: { id: req.user!.id },
        data: { firstName, lastName, phone },
      });
      res.json(user);
    } catch (err) { next(err); }
  },

  changePassword: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
      if (!user) throw new AppError('User not found', 404);
      const valid = await bcrypt.compare(oldPassword, user.passwordHash);
      if (!valid) throw new AppError('Old password is incorrect', 400);
      const passwordHash = await bcrypt.hash(newPassword, 12);
      await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
      res.json({ message: 'Password updated' });
    } catch (err) { next(err); }
  },

uploadAvatar: async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.file) throw new AppError('Image required', 400);
    const filePath = `/uploads/${req.file.filename}`;
    await prisma.user.update({
      where: { id: req.user!.id },
      data: { avatarUrl: filePath },
    });
    res.json({ avatarUrl: filePath });
  } catch (err) { next(err); }
},

};