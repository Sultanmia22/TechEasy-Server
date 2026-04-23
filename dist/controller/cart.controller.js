"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
const mongoose_1 = require("mongoose");
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail, productId, quantity } = req.body;
        if (!userEmail || !productId || !quantity) {
            res.status(400).json({
                success: false,
                message: "Please Provide All Required Fields",
            });
        }
        let cart = yield cart_model_1.default.findOne({ userEmail });
        if (!cart) {
            cart = yield cart_model_1.default.create({
                userEmail,
                items: [
                    {
                        productId,
                        quantity,
                    },
                ],
                orderStatus: 'pending'
            });
        }
        else {
            const existingItemIndex = cart.items.findIndex((item) => item.productId.toString() === productId.toString());
            if (existingItemIndex > -1 && cart.items[existingItemIndex]) {
                cart.items[existingItemIndex].quantity += quantity;
            }
            else {
                cart.items.push({ productId, quantity });
            }
            yield cart.save();
        }
        res.status(200).json({
            success: true,
            message: 'Add To Cart Successfully',
            data: cart
        });
    }
    catch (er) {
        console.log(er.message);
        res.status(500).json({
            success: false,
            message: "Something Went Wrong",
        });
    }
});
const getCartByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email } = req.params;
        const query = {
            userEmail: email,
            orderStatus: "pending"
        };
        if (!email) {
            res.status(400).json({
                success: false,
                message: "User Email is required!",
            });
        }
        const cart = yield cart_model_1.default.find(query).populate('items.productId');
        const subTotal = (_a = cart[0]) === null || _a === void 0 ? void 0 : _a.items.reduce((sum, item) => {
            const product = item.productId;
            return sum + product.price * item.quantity;
        }, 0);
        if (!cart) {
            res.status(404).json({
                success: false,
                message: 'No Cart Founded',
                data: []
            });
        }
        res.status(200).json({
            success: true,
            data: {
                cart,
                subTotal,
            }
        });
    }
    catch (er) {
        console.log("Error Message", er);
        res.status(500).json({
            success: false,
            message: "Something Went Wrong",
        });
    }
});
const removeCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
            });
        }
        const objId = new mongoose_1.Types.ObjectId(id);
        const result = yield cart_model_1.default.updateOne({ "items.productId": objId }, {
            $pull: { items: { productId: objId } }
        });
        if (result.modifiedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart",
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product successfully remove from cart',
        });
    }
    catch (er) {
        console.log(er);
    }
});
exports.cartController = {
    addToCart,
    getCartByEmail,
    removeCart
};
//# sourceMappingURL=cart.controller.js.map