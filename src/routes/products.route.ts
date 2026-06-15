import express from 'express';
import { productController } from '../controller/products.controller';
import verifyToken from '../middleware/authMiddleware';

const router = express.Router();


router.get('/popularProduct', productController.popularProducts);
router.get('/filters', productController.getFilters);
router.get('/allProduct', productController.allProduct);
router.get('/productList', productController.productList);

// all post route
router.post('/addProduct', verifyToken, productController.addProduct);

// all daynamic route 
router.get('/:id', productController.getProductById);

export const productRoute = router