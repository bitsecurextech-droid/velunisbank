import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import accountRoutes from './account.routes';
import cardRoutes from './card.routes';
import transactionRoutes from './transaction.routes';
import depositRoutes from './deposit.routes';
import transferRoutes from './transfer.routes';
import beneficiaryRoutes from './beneficiary.routes';
import notificationRoutes from './notification.routes';
import supportRoutes from './support.routes';
import kycRoutes from './kyc.routes';
import paymentConfigRoutes from './paymentConfig.routes';
import adminRoutes from './admin/index.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/accounts', accountRoutes);
router.use('/cards', cardRoutes);
router.use('/transactions', transactionRoutes);
router.use('/deposits', depositRoutes);
router.use('/transfers', transferRoutes);
router.use('/beneficiaries', beneficiaryRoutes);
router.use('/notifications', notificationRoutes);
router.use('/support', supportRoutes);
router.use('/kyc', kycRoutes);
router.use('/payment-config', paymentConfigRoutes);
router.use('/admin', adminRoutes);

// ── Loans (inline) ──
const loanRouter = Router();
loanRouter.get('/', (_req, res) => {
  res.json({ loans: [] });
});
loanRouter.post('/apply', (_req, res) => {
  res.status(201).json({ message: 'Loan application received' });
});
router.use('/loans', loanRouter);

// ── Investments (inline) ──
const investmentRouter = Router();
investmentRouter.get('/', (_req, res) => {
  res.json({ investments: [] });
});
investmentRouter.get('/portfolio', (_req, res) => {
  res.json({ portfolio: [] });
});
router.use('/investments', investmentRouter);

import withdrawalRoutes from './withdrawal.routes';
// ...
router.use('/withdrawals', withdrawalRoutes);

import pinRoutes from './pin.routes';
// ...
router.use('/pin', pinRoutes);

export default router;