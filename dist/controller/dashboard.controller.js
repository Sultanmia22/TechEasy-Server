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
exports.DashboardController = void 0;
const order_mode_1 = require("../models/order.mode");
const wishlist_model_1 = require("../models/wishlist.model");
const getDashboradSummyData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { customerEmail } = req.query;
        if (!customerEmail) {
            res.status(400).json({
                success: false,
                message: 'Customer Email is required. Please provide a valid email.'
            });
            return;
        }
        const oneHourAgo = new Date(Date.now() - 5 * 60 * 60 * 1000);
        const [orderStats, wishlistData, recentOrdersData] = yield Promise.all([
            order_mode_1.CustomerOrder.aggregate([
                { $match: { email: customerEmail } },
                {
                    $project: {
                        totalOrder: { $size: "$orders" },
                        totalPendingOrder: {
                            $size: {
                                $filter: {
                                    input: "$orders",
                                    as: "order",
                                    cond: { $eq: ["$$order.devliveredStatus", "pending"] }
                                }
                            }
                        },
                        totalDeliveredOrder: {
                            $size: {
                                $filter: {
                                    input: "$orders",
                                    as: "order",
                                    cond: { $eq: ["$$order.devliveredStatus", "delivered"] }
                                }
                            }
                        }
                    }
                }
            ]),
            wishlist_model_1.WishList.findOne({ customerEmail })
                .populate({
                path: 'wishListItem.productId'
            })
                .slice('wishListItem', 4),
            order_mode_1.CustomerOrder.findOne({
                email: customerEmail,
                "orders.orderDate": { $gte: oneHourAgo }
            })
                .populate({
                path: 'orders.items.productId'
            })
        ]);
        const totalOrder = ((_a = orderStats[0]) === null || _a === void 0 ? void 0 : _a.totalOrder) || 0;
        const totalPendingOrder = ((_b = orderStats[0]) === null || _b === void 0 ? void 0 : _b.totalPendingOrder) || 0;
        const totalDeliveredOrder = ((_c = orderStats[0]) === null || _c === void 0 ? void 0 : _c.totalDeliveredOrder) || 0;
        const wishListItems = (wishlistData === null || wishlistData === void 0 ? void 0 : wishlistData.wishListItem) || [];
        const totalWishList = wishListItems.length;
        const recentOrders = (recentOrdersData === null || recentOrdersData === void 0 ? void 0 : recentOrdersData.orders) || [];
        res.status(200).json({
            data: {
                stats: {
                    totalOrder,
                    totalPendingOrder,
                    totalDeliveredOrder,
                    totalWishList
                },
                wishListItems,
                recentOrders
            }
        });
    }
    catch (er) {
        console.log(er);
        res.status(500).json(er || 'Something went wrong!');
    }
});
const getMyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerEmail } = req.query;
        if (!customerEmail) {
            res.status(400).json({
                success: false,
                message: 'Customer Email is required. Please provide a valid email.'
            });
            return;
        }
        const findorders = yield order_mode_1.CustomerOrder.findOne({ email: customerEmail });
        const customerOrders = findorders === null || findorders === void 0 ? void 0 : findorders.orders;
        if (!customerOrders || customerOrders.length === 0) {
            res.status(404).json({
                success: false,
                message: 'Product not found!',
                data: []
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: customerOrders
        });
    }
    catch (er) {
        console.log(er);
    }
});
exports.DashboardController = {
    getDashboradSummyData,
    getMyOrders
};
//# sourceMappingURL=dashboard.controller.js.map