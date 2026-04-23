"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    userEmail: { type: String, required: true },
    items: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'products',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            },
            _id: false
        }
    ],
    orderStatus: { type: String, enum: ['pending', 'success', 'failed'], required: true }
}, {
    timestamps: true
});
const Cart = (0, mongoose_1.model)('Carts', cartSchema);
exports.default = Cart;
//# sourceMappingURL=cart.model.js.map