import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const ALGORITHM = 'aes-256-cbc';
let key: Buffer;

const rawKey = process.env.ENCRYPTION_KEY;
if (!rawKey) {
  console.warn('⚠️  WARNING: ENCRYPTION_KEY not set! Using temporary dev key.');
  key = Buffer.from('1234567890abcdef1234567890abcdef', 'hex');
} else {
  key = Buffer.from(rawKey, 'hex');
}

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

export const decrypt = (text: string): string => {
  const [ivHex, encrypted] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};