"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoute = void 0;
const express_1 = __importDefault(require("express"));
const dashboard_controller_1 = require("../controller/dashboard.controller");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.get('/getDashboradSummary', authMiddleware_1.default, dashboard_controller_1.DashboardController.getDashboradSummyData);
router.get('/orders', dashboard_controller_1.DashboardController.getMyOrders);
exports.dashboardRoute = router;
//# sourceMappingURL=dashboard.route.js.map