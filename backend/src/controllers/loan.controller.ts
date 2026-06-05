import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const loanController = {
  // Apply for a new loan
  apply: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { amount, termMonths } = req.body;
      if (!amount || !termMonths) throw new AppError('Amount and term are required', 400);
      
      // Simple interest calculation (e.g., 5% for up to 12 months, 8% for longer)
      const interestRate = termMonths <= 12 ? 5.0 : 8.0;
      const totalRepayable = amount * (1 + (interestRate / 100) * (termMonths / 12));

      const loan = await prisma.loan.create({
        data: {
          userId: req.user!.id,
          amount: parseFloat(amount),
          interestRate,
          termMonths: parseInt(termMonths),
          remainingAmount: totalRepayable,
          status: 'ACTIVE',
        },
      });

      // Generate repayment schedule (simplified: equal monthly payments)
      const monthlyPayment = totalRepayable / termMonths;
      const repayments = [];
      for (let i = 0; i < termMonths; i++) {
        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + i + 1);
        repayments.push({
          loanId: loan.id,
          amount: monthlyPayment,
          dueDate,
          status: 'PENDING',
        });
      }
      await prisma.loanRepayment.createMany({ data: repayments });

      res.status(201).json({ message: 'Loan application approved', loanId: loan.id, monthlyPayment });
    } catch (err) {
      next(err);
    }
  },

  // Get user's loans
  list: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const loans = await prisma.loan.findMany({
      where: { userId: req.user!.id },
      include: { repayments: { orderBy: { dueDate: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(loans);
  },

  // Get repayment schedule for a specific loan
  schedule: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const loanId = req.params.id as string;
    const repayments = await prisma.loanRepayment.findMany({
      where: { loanId, loan: { userId: req.user!.id } },
      orderBy: { dueDate: 'asc' },
    });
    res.json(repayments);
  },
};