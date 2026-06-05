import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { depositController } from '../controllers/deposit.controller';
import upload from '../middleware/upload';

const router = Router();

router.use(authenticate);
router.post('/giftcard', upload.single('image'), depositController.submitGiftCard);
router.post('/paypal', depositController.submitPayPal);
router.post('/crypto', depositController.submitCrypto);
router.get('/history', depositController.getUserDeposits);

export default router;