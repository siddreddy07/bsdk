import { Router } from 'express';
import * as chatController from "../controllers/chat.controller.js"
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post("/", chatController.chat);

export default router;