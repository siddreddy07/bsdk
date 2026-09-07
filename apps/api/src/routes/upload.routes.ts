import { Router } from "express"
import { createUploadSignUrl } from "../controllers/upload.controller"

const uploadRouter = Router()

uploadRouter.post("/signature", createUploadSignUrl)

export default uploadRouter