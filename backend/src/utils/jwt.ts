import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const generateAccessToken = (payload: { id: string; role: string }) =>
  jwt.sign(payload, env.JWT_SECRET, { expiresIn: '15m' });

export const generateRefreshToken = (payload: { id: string; role: string }) =>
  jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, env.JWT_SECRET) as { id: string; role: string };

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, env.JWT_REFRESH_SECRET) as { id: string; role: string };