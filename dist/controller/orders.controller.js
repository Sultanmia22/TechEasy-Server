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
exports.orderController = void 0;
const order_mode_1 = require("../models/order.mode");
const cart_model_1 = __importDefault(require("../models/cart.model"));
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const createCheckoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerEmail, shippingInfo, items, totalPrice } = req.body;
        const userOrderDoc = yield order_mode_1.CustomerOrder.findOne({ email: customerEmail });
        let orderToProcess;
        if (userOrderDoc) {
            const pendingOrders = userOrderDoc.orders.filter((order) => order.paymentStatus === "pending");
            orderToProcess = pendingOrders.find((pOrder) => {
                if (pOrder.items.length !== items.length)
                    return false;
                return pOrder.items.every((dbItem) => items.some((InItem) => InItem.productId === dbItem.productId &&
                    InItem.quantity === dbItem.quantity));
            });
        }
        if (!orderToProcess) {
            const newOrderData = {
                orderDate: new Date(),
                shippingInfo,
                items,
                totalPrice,
                paymentStatus: "pending",
            };
            const updatedDoc = yield order_mode_1.CustomerOrder.findOneAndUpdate({ email: customerEmail }, { $push: { orders: newOrderData } }, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true });
            orderToProcess = updatedDoc.orders[updatedDoc.orders.length - 1];
        }
        const delivaryCharge = shippingInfo.district === "dhaka-city" ? 80 : 120;
        const session = yield stripe.checkout.sessions.create({
            line_items: [
                ...((orderToProcess === null || orderToProcess === void 0 ? void 0 : orderToProcess.items) || []).map((item) => ({
                    price_data: {
                        currency: "bdt",
                        product_data: {
                            name: item.name,
                            images: [item.image],
                        },
                        unit_amount: Math.round(item.price * 100),
                    },
                    quantity: item.quantity,
                })),
                {
                    price_data: {
                        currency: "bdt",
                        product_data: {
                            name: "Delivery Charge",
                            description: "Home Delivery Fee",
                        },
                        unit_amount: Math.round(delivaryCharge * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            customer_email: customerEmail,
            metadata: {
                mongoOrderId: orderToProcess === null || orderToProcess === void 0 ? void 0 : orderToProcess._id.toString(),
                email: customerEmail,
                productId: items.map((item) => item.productId).join(","),
            },
            success_url: `${process.env.CLIENT_URL}/payment-success?order_id=${orderToProcess === null || orderToProcess === void 0 ? void 0 : orderToProcess._id}&email=${customerEmail}`,
            cancel_url: `${process.env.CLIENT_URL}/checkout`,
        });
        yield order_mode_1.CustomerOrder.updateOne({ email: customerEmail, "orders._id": orderToProcess === null || orderToProcess === void 0 ? void 0 : orderToProcess._id }, { $set: { "orders.$.stripeSessionId": session.id } });
        res.status(200).json({ url: session.url });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const confirmOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, email } = req.query;
        if (!orderId && !email) {
            res.status(400).json({ message: "Order ID and Email are required" });
        }
        const userDoc = yield order_mode_1.CustomerOrder.findOne({
            email: email,
            "orders._id": orderId,
        }, { "orders.$": 1 });
        if (!userDoc || !userDoc.orders || userDoc.orders.length === 0) {
            return res
                .status(404)
                .json({ message: "Order not found in our database" });
        }
        const orderData = userDoc === null || userDoc === void 0 ? void 0 : userDoc.orders[0];
        if ((orderData === null || orderData === void 0 ? void 0 : orderData.paymentStatus) === "pending" && (orderData === null || orderData === void 0 ? void 0 : orderData.stripeSessionId)) {
            const session = yield stripe.checkout.sessions.retrieve(orderData.stripeSessionId);
            if (session.payment_status === "paid" && session.status === "complete") {
                yield order_mode_1.CustomerOrder.updateOne({
                    email: email,
                    "orders._id": orderId,
                }, { $set: { "orders.$.paymentStatus": "paid" } });
                const productIdsString = session.metadata.productId;
                if (productIdsString) {
                    const productIdsArray = productIdsString.split(",");
                    yield cart_model_1.default.updateMany({
                        userEmail: email,
                        "items.productId": { $in: productIdsArray }
                    }, { $set: { orderStatus: "success" } });
                }
            }
            orderData.paymentStatus = "paid";
        }
        return res.status(200).json({ data: orderData });
    }
    catch (error) {
        console.error("Order Confirmation Error:", error);
        return res.status(500).json({ message: error.message });
    }
});
exports.orderController = {
    createCheckoutSession,
    confirmOrder,
};
//# sourceMappingURL=orders.controller.js.map