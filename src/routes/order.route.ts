import express from "express"
import { orderController } from "../controller/orders.controller";
import verifyToken from "../middleware/authMiddleware";
const router = express.Router()

router.post('/create-checkout-session',verifyToken,orderController.createCheckoutSession)
router.get('/confirmOrder',orderController.confirmOrder)

export const orderRoute = router;