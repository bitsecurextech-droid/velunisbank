import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { generalLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import accountRoutes from './routes/account.routes';
import cardRoutes from './routes/card.routes';
import transactionRoutes from './routes/transaction.routes';
import depositRoutes from './routes/deposit.routes';
import transferRoutes from './routes/transfer.routes';
import beneficiaryRoutes from './routes/beneficiary.routes';
import notificationRoutes from './routes/notification.routes';
import supportRoutes from './routes/support.routes';
import kycRoutes from './routes/kyc.routes';
import paymentConfigRoutes from './routes/paymentConfig.routes';
import adminRoutes from './routes/admin/index.routes';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use('/api/v1', generalLimiter);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/cards', cardRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/deposits', depositRoutes);
app.use('/api/v1/transfers', transferRoutes);
app.use('/api/v1/beneficiaries', beneficiaryRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/support', supportRoutes);
app.use('/api/v1/kyc', kycRoutes);
app.use('/api/v1/payment-config', paymentConfigRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/uploads', express.static('uploads'));

app.use(errorHandler);
export default app;