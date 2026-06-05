import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.get('/', (_req, res) => {
  res.json({ investments: [] });
});

router.get('/portfolio', (_req, res) => {
  res.json({ portfolio: [] });
});

export default router;