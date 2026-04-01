import express from 'express';
import { productController } from '../controller/products.controller';

const router = express.Router();

router.get('/popularProduct',productController.popularProducts)
router.get('/filters',productController.getFilters)
router.get('/allProduct',productController.allProduct)
router.get('/:id',productController.getProductById)

export const productRoute = router