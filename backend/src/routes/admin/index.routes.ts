import { Router } from 'express';
import { authenticate, adminOnly, superAdminOnly } from '../../middleware/auth';
import { adminUsersController } from '../../controllers/admin/users.controller';
import { adminDepositsController } from '../../controllers/admin/deposits.controller';
import { adminTransactionsController } from '../../controllers/admin/transactions.controller';
import { adminCardsController } from '../../controllers/admin/cards.controller';
import { adminKYCController } from '../../controllers/admin/kycReview.controller';
import { adminReportsController } from '../../controllers/admin/reports.controller';
import { adminsController } from '../../controllers/admin/admins.controller';
import { adminSettingsController } from '../../controllers/admin/settings.controller';
import { adminWithdrawalController } from '../../controllers/admin/withdrawals.controller';
import { adminLoanController } from '../../controllers/admin/loans.controller';

const router = Router();

router.use(authenticate);
router.use(adminOnly);
router.get('/withdrawals', adminWithdrawalController.getAll);
router.post('/withdrawals/:id/approve', adminWithdrawalController.approve);
router.post('/withdrawals/:id/reject', adminWithdrawalController.reject);

router.get('/loans', adminLoanController.getAll);
router.patch('/loans/:id', adminLoanController.updateStatus);

// Users
router.get('/users', adminUsersController.getAllUsers);
router.post('/users', superAdminOnly, adminUsersController.createUser);
router.patch('/users/:id', adminUsersController.updateUser);

// Deposits
router.get('/deposits', adminDepositsController.getAllDeposits);
router.post('/deposits/:id/approve', adminDepositsController.approveDeposit);
router.post('/deposits/:id/reject', adminDepositsController.rejectDeposit);

// Transactions
router.get('/transactions', adminTransactionsController.getTransactions);
router.post('/transactions/:id/approve', adminTransactionsController.approveTransfer);
router.post('/transactions/:id/reject', adminTransactionsController.rejectTransfer);

// Cards
router.get('/cards', adminCardsController.getAllCards);
router.post('/cards', adminCardsController.issueCard);
router.post('/cards/:id/freeze', adminCardsController.freezeCard);
router.post('/cards/:id/unfreeze', adminCardsController.unfreezeCard);
router.delete('/cards/:id', adminCardsController.terminateCard);

// KYC
router.get('/kyc', adminKYCController.getAllKYC);
router.get('/kyc/:id/document', adminKYCController.getDocument);
router.post('/kyc/:id/approve', adminKYCController.approveKYC);
router.post('/kyc/:id/reject', adminKYCController.rejectKYC);

// Reports
router.get('/reports/users', adminReportsController.userReport);
router.get('/reports/transactions', adminReportsController.transactionReport);

// Admins management
router.get('/admins', superAdminOnly, adminsController.getAllAdmins);
router.post('/admins', superAdminOnly, adminsController.createAdmin);

// Settings (payment config)
router.get('/settings/payment', superAdminOnly, adminSettingsController.getPaymentConfig);
router.put('/settings/payment', superAdminOnly, adminSettingsController.updatePaymentConfig);

// routes (add inside the router after existing routes)
router.get('/withdrawals', adminWithdrawalController.getAll);
router.post('/withdrawals/:id/approve', adminWithdrawalController.approve);
router.post('/withdrawals/:id/reject', adminWithdrawalController.reject);
router.get('/loans', adminLoanController.getAll);
router.patch('/loans/:id', adminLoanController.updateStatus);
router.patch('/users/:id/manager', adminUsersController.updateManager);

export default router;