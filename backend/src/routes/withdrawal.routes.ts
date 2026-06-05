import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { withdrawalController } from '../controllers/withdrawal.controller';

const router = Router();
router.use(authenticate);

router.post('/', withdrawalController.create);
router.get('/', withdrawalController.history);

export default router;