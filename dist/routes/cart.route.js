"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoute = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controller/cart.controller");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.post('/addToCart', cart_controller_1.cartController.addToCart);
router.get('/getCart/:email', authMiddleware_1.default, cart_controller_1.cartController.getCartByEmail);
router.patch('/removeCart/:id', cart_controller_1.cartController.removeCart);
exports.cartRoute = router;
//# sourceMappingURL=cart.route.js.map