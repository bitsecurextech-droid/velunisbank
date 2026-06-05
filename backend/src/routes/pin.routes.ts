import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { pinController } from '../controllers/pin.controller';

const router = Router();
router.post('/set', authenticate, pinController.setPin);
router.post('/verify', authenticate, pinController.verifyPin);
export default router;