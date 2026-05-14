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
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishListController = void 0;
const wishlist_model_1 = require("../models/wishlist.model");
const addWishList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerEmail, productId } = req.body;
        const existWishlist = yield wishlist_model_1.WishList.findOne({ customerEmail });
        if (existWishlist) {
            const isProductAlreadyInList = existWishlist.wishListItem.some((item) => {
                return item.productId.toString() === productId;
            });
            if (isProductAlreadyInList) {
                res.status(409).json({
                    success: false,
                    message: 'This product already exists in your wishlist'
                });
                return;
            }
            existWishlist === null || existWishlist === void 0 ? void 0 : existWishlist.wishListItem.push({ productId });
            yield existWishlist.save();
            res.status(200).json({
                success: true,
                message: 'Product added to wishlist successfully',
                data: existWishlist
            });
            return;
        }
        const newWishList = yield wishlist_model_1.WishList.create({
            customerEmail,
            wishListItem: [{ productId }]
        });
        res.status(200).json({
            success: true,
            message: 'Product added to wishlist successfully',
            data: newWishList
        });
    }
    catch (er) {
        console.log(er);
    }
});
const getWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerEmail } = req.query;
        if (!customerEmail) {
            res.status(400).json({
                success: false,
                message: 'Please provide Customer Email!'
            });
            return;
        }
        const customerWishlist = yield wishlist_model_1.WishList.findOne({ customerEmail }).populate('wishListItem.productId');
        res.status(200).json({
            success: true,
            data: customerWishlist
        });
    }
    catch (er) {
        console.log(er);
    }
});
const deleteWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerEmail, productId } = req.query;
        if (!customerEmail) {
            res.status(400).json({
                success: false,
                message: 'Please provide Customer Email!'
            });
            return;
        }
        const customerWishList = yield wishlist_model_1.WishList.findOne({ customerEmail });
        if (!customerEmail) {
            res.status(404).json({
                success: false,
                message: "Wishlist Not Found!"
            });
            return;
        }
        const result = yield wishlist_model_1.WishList.updateOne({ customerEmail: customerEmail }, { $pull: { wishListItem: { productId: productId } } });
        res.status(200).json({
            success: true,
            message: 'Wishlist item deleted successfully'
        });
    }
    catch (er) {
        console.log(er);
    }
});
exports.wishListController = {
    addWishList,
    getWishlist,
    deleteWishlist
};
//# sourceMappingURL=wishlist.controller.js.map