import { Router } from "express"
import { getBots, getBot, patchBot, createBot, deleteBot } from "../controllers/bot.controller"
import { requireAuth } from "../middleware/auth.middleware"

const router = Router()

router.get("/", requireAuth, getBots)
router.get("/:botId", requireAuth, getBot)
router.patch("/:botId", requireAuth, patchBot)
router.delete("/:botId", requireAuth, deleteBot)
router.post("/create-bot",requireAuth,createBot)

export default router
