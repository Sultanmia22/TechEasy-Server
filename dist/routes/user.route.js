"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const router = express_1.default.Router();
router.post('/', user_controller_1.userController.register);
router.post('/login', user_controller_1.userController.login);
router.post('/socialLogin', user_controller_1.userController.socialLogin);
exports.userRoute = router;
//# sourceMappingURL=user.route.js.map