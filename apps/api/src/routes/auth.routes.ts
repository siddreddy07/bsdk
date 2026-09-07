import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.delete('/account', requireAuth, authController.deleteAccount);
router.get('/me', requireAuth, authController.me);
router.patch('/me', requireAuth, authController.updateProfile);

export default router;