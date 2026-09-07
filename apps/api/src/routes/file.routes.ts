import { Router } from "express"
import {
  createFiles,
  getFiles,
  deleteFile,
  deleteAllFiles,
} from "../controllers/file.controller"
import { requireAuth } from "../middleware/auth.middleware"

const fileRouter = Router()

fileRouter.get("/:botId", requireAuth, getFiles)
fileRouter.post("/", requireAuth, createFiles)
fileRouter.delete("/bot/:botId", requireAuth, deleteAllFiles)
fileRouter.delete("/:fileId", requireAuth, deleteFile)

export default fileRouter