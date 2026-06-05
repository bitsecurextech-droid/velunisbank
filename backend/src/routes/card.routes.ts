import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { cardController } from '../controllers/card.controller';

const router = Router();

router.get('/', authenticate, cardController.getCards);
router.get('/:id', authenticate, cardController.getCardDetails);
router.post('/:id/freeze', authenticate, cardController.freezeCard);
router.post('/:id/unfreeze', authenticate, cardController.unfreezeCard);
router.post('/topup', authenticate, cardController.topUpCard);
router.get('/:id/transactions', authenticate, cardController.getCardTransactions);

export default router;