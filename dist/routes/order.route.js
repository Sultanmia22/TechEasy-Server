"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("../controller/orders.controller");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.post('/create-checkout-session', authMiddleware_1.default, orders_controller_1.orderController.createCheckoutSession);
router.get('/confirmOrder', authMiddleware_1.default, orders_controller_1.orderController.paidOrder);
router.get('/getSignleOrder', authMiddleware_1.default, orders_controller_1.orderController.getSingleOrder);
exports.orderRoute = router;
//# sourceMappingURL=order.route.js.map