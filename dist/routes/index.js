"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./user.route");
const products_route_1 = require("./products.route");
const cart_route_1 = require("./cart.route");
const order_route_1 = require("./order.route");
const router = express_1.default.Router();
const moduleRoute = [
    {
        path: '/users',
        route: user_route_1.userRoute,
    },
    {
        path: '/product',
        route: products_route_1.productRoute,
    },
    {
        path: '/cart',
        route: cart_route_1.cartRoute,
    },
    {
        path: '/order',
        route: order_route_1.orderRoute,
    },
];
moduleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
//# sourceMappingURL=index.js.map