import express from "express"
import { profileController } from "../controller/profile.controller"
import verifyToken from "../middleware/authMiddleware"

const router = express.Router()

router.get('/adminStats',verifyToken,profileController.adminStats)

export const profileRoute = router