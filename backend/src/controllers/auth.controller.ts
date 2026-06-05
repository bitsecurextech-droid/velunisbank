import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { PrismaClient } from '@prisma/client';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';
import logger from '../config/logger';

const prisma = new PrismaClient();

export const authController = {
  // ── REGISTER ──
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        phone,
        dateOfBirth,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        accountType,
        country,
        currency,
      } = req.body;

      // Defaults if not provided
      const userCountry = country || 'US';
      const userCurrency = currency || 'USD';

      if (!email || !password || !firstName || !lastName) {
        throw new AppError('Missing required fields: email, password, firstName, lastName', 400);
      }

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) throw new AppError('Email already registered', 409);

      const passwordHash = await bcrypt.hash(password, 12);
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
          phone: phone || null,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          country: userCountry,
          currency: userCurrency as any,
          addressLine1: addressLine1 || null,
          addressLine2: addressLine2 || null,
          city: city || null,
          state: state || null,
          postalCode: postalCode || null,
          accountTypeRequested: accountType || 'CHECKING',
        },
      });

      // Auto‑generate virtual card (temporarily disabled)
      /*
      await prisma.card.create({ ... });
      */

      const accessToken = generateAccessToken({ id: user.id, role: user.role });
      const refreshToken = generateRefreshToken({ id: user.id, role: user.role });

      res.status(201).json({ accessToken, refreshToken, user: { id: user.id, email: user.email } });
    } catch (err) {
      next(err);
    }
  },

  // ── LOGIN ──
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, totpCode } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.isActive || user.isBanned) throw new AppError('Invalid credentials', 401);

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) throw new AppError('Invalid credentials', 401);

      if (user.twoFactorEnabled) {
        if (!totpCode) throw new AppError('2FA code required', 401);
        const verified = speakeasy.totp.verify({
          secret: user.twoFactorSecret!,
          encoding: 'base32',
          token: totpCode,
        });
        if (!verified) throw new AppError('Invalid 2FA code', 401);
      }

      const accessToken = generateAccessToken({ id: user.id, role: user.role });
      const refreshToken = generateRefreshToken({ id: user.id, role: user.role });

      await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });

      res.json({ accessToken, refreshToken, user: { id: user.id, email: user.email, role: user.role } });
    } catch (err) {
      next(err);
    }
  },

  // ── REFRESH TOKEN ──
  refreshToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      const payload = verifyRefreshToken(refreshToken);
      const user = await prisma.user.findUnique({ where: { id: payload.id } });
      if (!user) throw new AppError('User not found', 404);

      const newAccessToken = generateAccessToken({ id: user.id, role: user.role });
      const newRefreshToken = generateRefreshToken({ id: user.id, role: user.role });
      res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (err) {
      next(err);
    }
  },

  // ── ENABLE 2FA ──
  enable2FA: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
      if (!user) throw new AppError('User not found', 404);

      const secret = speakeasy.generateSecret({ length: 20 });
      const otpauth_url = speakeasy.otpauthURL({
        secret: secret.base32,
        label: `Velunis Bank:${user.email}`,
        issuer: 'Velunis Bank',
      });
      const qrCodeDataURL = await QRCode.toDataURL(otpauth_url);

      await prisma.user.update({
        where: { id: user.id },
        data: { twoFactorSecret: secret.base32, twoFactorEnabled: false },
      });

      res.json({ qrCode: qrCodeDataURL, secret: secret.base32 });
    } catch (err) {
      next(err);
    }
  },

  // ── VERIFY 2FA ──
  verify2FA: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body;
      const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
      if (!user || !user.twoFactorSecret) throw new AppError('2FA not set up', 400);

      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token,
      });
      if (!verified) throw new AppError('Invalid code', 400);

      await prisma.user.update({ where: { id: user.id }, data: { twoFactorEnabled: true } });
      res.json({ message: '2FA enabled successfully' });
    } catch (err) {
      next(err);
    }
  },
};