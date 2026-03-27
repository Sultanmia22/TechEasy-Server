import express from 'express';
import { productController } from '../controller/products.controller';

const router = express.Router();

router.get('/popularProduct',productController.popularProducts)

export const productRoute = router