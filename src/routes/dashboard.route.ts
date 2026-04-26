import express from 'express'
import { DashboardController } from '../controller/dashboard.controller'

const router = express.Router()

router.get('/getDashboradSummary',DashboardController.getDashboradSummyData)

export const dashboardRoute = router;