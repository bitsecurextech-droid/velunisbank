import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { kycController } from '../controllers/kyc.controller';
import upload from '../middleware/upload';

const router = Router();

router.post('/submit', authenticate, upload.single('document'), kycController.submitKYC);
router.get('/status', authenticate, kycController.getStatus);

export default router;