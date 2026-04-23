"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("../controller/products.controller");
const router = express_1.default.Router();
router.get('/popularProduct', products_controller_1.productController.popularProducts);
router.get('/filters', products_controller_1.productController.getFilters);
router.get('/allProduct', products_controller_1.productController.allProduct);
router.get('/:id', products_controller_1.productController.getProductById);
exports.productRoute = router;
//# sourceMappingURL=products.route.js.map