import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { paymentConfigController } from '../controllers/paymentConfig.controller';

const router = Router();

router.get('/', authenticate, paymentConfigController.getConfig);
// Admin-only update, but we'll add middleware later or in controller
router.put('/', authenticate, paymentConfigController.updateConfig);

export default router;