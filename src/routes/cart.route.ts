import express from 'express';
import { cartController } from '../controller/cart.controller';
const router = express.Router();

router.post('/addToCart',cartController.addToCart)

export const cartRoute = router;