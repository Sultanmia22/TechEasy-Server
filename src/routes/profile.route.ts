import express from "express"
import { profileController } from "../controller/profile.controller"

const router = express.Router()

router.get('/adminStats',profileController.adminStats)

export const profileRoute = router