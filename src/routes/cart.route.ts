import express from 'express';
import { cartController } from '../controller/cart.controller';
import verifyToken from '../middleware/authMiddleware';
const router = express.Router();

router.post('/addToCart',cartController.addToCart)
 router.get('/getCart/:email',verifyToken,cartController.getCartByEmail)
router.patch('/removeCart/:id',cartController.removeCart)

export const cartRoute = router;