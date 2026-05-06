import express from 'express'
import { wishListController } from '../controller/wishlist.controller';
const router = express.Router();

router.post('/addwishlist',wishListController.addWishList)
router.get('/getwishlist',wishListController.getWishlist)

export const wishroute = router;