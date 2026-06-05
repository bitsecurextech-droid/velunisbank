import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import { env } from '../config/env';
import logger from '../config/logger';

export const sendTelegramDocument = async (filePath: string, caption: string) => {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;
  const fullPath = `${process.cwd()}/${filePath}`;
  if (!fs.existsSync(fullPath)) return;

  const form = new FormData();
  form.append('chat_id', env.TELEGRAM_CHAT_ID);
  form.append('caption', caption);
  form.append('document', fs.createReadStream(fullPath));

  try {
    await axios.post(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendDocument`,
      form,
      { headers: form.getHeaders() }
    );
  } catch (err) {
    logger.error('Telegram document send failed', err);
  }
};

// Keep your existing sendTelegramMessage function as well
export const sendTelegramMessage = async (text: string) => {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;
  try {
    await axios.post(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: env.TELEGRAM_CHAT_ID,
      text,
    });
  } catch (err) {
    logger.error('Telegram message send failed', err);
  }
};