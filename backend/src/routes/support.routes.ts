import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { supportController } from '../controllers/support.controller';

const router = Router();

router.post('/', authenticate, supportController.createTicket);
router.get('/', authenticate, supportController.getTickets);

export default router;