import express from "express"
import { orderController } from "../controller/orders.controller";
import verifyToken from "../middleware/authMiddleware";
const router = express.Router()

router.post('/create-checkout-session',verifyToken,orderController.createCheckoutSession)

router.get('/confirmOrder',verifyToken,orderController.paidOrder)

router.get('/getSignleOrder',verifyToken,orderController.getSingleOrder)
router.patch('/updateDeliveryStatus',verifyToken,orderController.updateDeliveryStatus)

export const orderRoute = router;