import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { beneficiaryController } from '../controllers/beneficiary.controller';

const router = Router();

router.get('/', authenticate, beneficiaryController.list);
router.post('/', authenticate, beneficiaryController.create);
router.delete('/:id', authenticate, beneficiaryController.delete);

export default router;