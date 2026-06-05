import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const supportController = {
  createTicket: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { subject, message } = req.body;
    const ticket = await prisma.supportTicket.create({
      data: { userId: req.user!.id, subject, message },
    });
    res.status(201).json(ticket);
  },
  getTickets: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const tickets = await prisma.supportTicket.findMany({ where: { userId: req.user!.id } });
    res.json(tickets);
  },
};