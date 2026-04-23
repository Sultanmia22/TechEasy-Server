"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerOrder = void 0;
const mongoose_1 = require("mongoose");
// ১. Shipping Info Schema
const ShippingInfoSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    address: String,
    upazila: String,
    district: String,
    mobile: String,
    email: String,
    comment: String,
}, { _id: false });
// ২. Order Item Schema
const OrderItemSchema = new mongoose_1.Schema({
    productId: String, // আপনার ইন্টারফেসে এটি ছিল, তাই যোগ করলাম
    name: String,
    price: Number,
    quantity: Number,
    image: String,
}, { _id: false });
// ৩. Main Customer Schema
const CustomerOrderSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    orders: [
        {
            orderDate: { type: Date, default: Date.now },
            shippingInfo: { type: ShippingInfoSchema, required: true },
            items: { type: [OrderItemSchema], required: true },
            totalPrice: { type: Number, required: true },
            paymentStatus: {
                type: String,
                enum: ["pending", "paid", "failed"],
                default: "pending",
            },
            stripeSessionId: String,
        },
    ],
}, { timestamps: true });
exports.CustomerOrder = (0, mongoose_1.model)("CustomerOrder", CustomerOrderSchema);
//# sourceMappingURL=order.mode.js.map