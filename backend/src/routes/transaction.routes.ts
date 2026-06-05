import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { transferController } from '../controllers/transfer.controller';

const router = Router();

router.get('/lookup', authenticate, transferController.lookupRecipient);
router.post('/', authenticate, transferController.createTransfer);
router.get('/history', authenticate, transferController.getTransfers);

export default router;