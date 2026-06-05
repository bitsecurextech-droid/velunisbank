import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { loanController } from '../controllers/loan.controller';

const router = Router();
router.use(authenticate);

router.get('/', loanController.list);
router.post('/apply', loanController.apply);
router.get('/:id/schedule', loanController.schedule);

export default router;