import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { fetchKnowledgeConfig, saveKnowledgeConfig } from '../controllers/knowledge.controller';

const router = Router();

router.get(
  "/get-config",
  requireAuth,
  fetchKnowledgeConfig
)

router.put("/add-config",requireAuth,saveKnowledgeConfig)

export default router