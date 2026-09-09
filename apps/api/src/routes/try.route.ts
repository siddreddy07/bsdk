import express from 'express'
import { trainMd, tryWebsite } from '../controllers/demo.controller.js';

const router = express.Router()




router.post("/", tryWebsite);
router.post("/train",trainMd)

export default router