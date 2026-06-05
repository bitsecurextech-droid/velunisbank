import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { notificationController } from '../controllers/notification.controller';

const router = Router();

router.get('/', authenticate, notificationController.getNotifications);
router.post('/mark-read', authenticate, notificationController.markRead);

export default router;