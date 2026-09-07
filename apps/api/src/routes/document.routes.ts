import { Router } from "express"
import { uploadDocuments } from "../controllers/document.controller"
import { uploadPdf } from "../middleware/upload.middleware"

const documentRouter = Router()

documentRouter.post(
  "/upload",
  uploadPdf.array("documents", 4),
  uploadDocuments
)

export default documentRouter