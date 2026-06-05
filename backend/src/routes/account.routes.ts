import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { accountController } from '../controllers/account.controller';

const router = Router();

router.get('/', authenticate, accountController.getAccounts);
router.get('/:id', authenticate, accountController.getAccount);
router.post('/', authenticate, accountController.createAccount);

export default router;