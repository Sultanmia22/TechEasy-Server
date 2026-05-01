import express from 'express'
import { DashboardController } from '../controller/dashboard.controller'
import verifyToken from '../middleware/authMiddleware';

const router = express.Router()

router.get('/getDashboradSummary',verifyToken,DashboardController.getDashboradSummyData)

router.get('/orders',DashboardController.getMyOrders)

export const dashboardRoute = router;