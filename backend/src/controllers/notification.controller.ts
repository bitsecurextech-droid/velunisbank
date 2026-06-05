import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const notificationController = {
  getNotifications: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const notifs = await prisma.notification.findMany({
        where: { userId: req.user!.id },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
      res.json(notifs);
    } catch (err) { next(err); }
  },
  markRead: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await prisma.notification.updateMany({
        where: { userId: req.user!.id, read: false },
        data: { read: true },
      });
      res.json({ message: 'All marked read' });
    } catch (err) { next(err); }
  },
};