import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { userController } from '../controllers/user.controller';
import upload from '../middleware/upload';   // <-- THIS MUST BE PRESENT

const router = Router();

router.get('/profile', authenticate, userController.getProfile);
router.put('/profile', authenticate, userController.updateProfile);
router.put('/change-password', authenticate, userController.changePassword);
router.post('/avatar', authenticate, upload.single('avatar'), userController.uploadAvatar);

export default router;