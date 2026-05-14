"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishroute = void 0;
const express_1 = __importDefault(require("express"));
const wishlist_controller_1 = require("../controller/wishlist.controller");
const router = express_1.default.Router();
router.post('/addwishlist', wishlist_controller_1.wishListController.addWishList);
router.get('/getwishlist', wishlist_controller_1.wishListController.getWishlist);
router.delete('/deleteWishlist', wishlist_controller_1.wishListController.deleteWishlist);
exports.wishroute = router;
//# sourceMappingURL=wishlist.route.js.map