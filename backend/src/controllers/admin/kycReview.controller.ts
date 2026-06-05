import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { AuthRequest } from '../../middleware/auth';
import { AppError } from '../../middleware/errorHandler';

const prisma = new PrismaClient();

export const adminKYCController = {
  getAllKYC: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const kycs = await prisma.kYC.findMany({
      include: { user: { select: { email: true, firstName: true, lastName: true } } },
      orderBy: { submittedAt: 'desc' },
    });
    res.json(kycs);
  },

  approveKYC: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const kyc = await prisma.kYC.update({
      where: { id },
      data: { status: 'APPROVED', reviewedAt: new Date() },
    });
    await prisma.user.update({ where: { id: kyc.userId }, data: { kycStatus: 'APPROVED' } });
    res.json(kyc);
  },

  rejectKYC: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const { adminNotes } = req.body;
    const kyc = await prisma.kYC.update({
      where: { id },
      data: { status: 'REJECTED', adminNotes, reviewedAt: new Date() },
    });
    await prisma.user.update({ where: { id: kyc.userId }, data: { kycStatus: 'REJECTED' } });
    res.json(kyc);
  },

  // Serve the KYC document file to admin
  getDocument: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const kyc = await prisma.kYC.findUnique({ where: { id } });
    if (!kyc || !kyc.documentUrl) throw new AppError('Document not found', 404);
    const filePath = path.resolve(kyc.documentUrl);
    res.sendFile(filePath);
  },
};