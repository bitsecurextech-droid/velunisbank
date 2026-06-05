import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from './errorHandler';

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new AppError('Not authenticated', 401);
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { id: string; role: string };
    req.user = payload;
    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
};

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || (req.user.role !== 'ADMIN' && req.user.role !== 'SUPER_ADMIN')) {
    throw new AppError('Admin access required', 403);
  }
  next();
};

export const superAdminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'SUPER_ADMIN') {
    throw new AppError('Super admin access required', 403);
  }
  next();
};