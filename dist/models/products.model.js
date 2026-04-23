"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    stock: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
    specs: { type: mongoose_1.Schema.Types.Mixed }
}, {
    timestamps: true
});
exports.Products = (0, mongoose_1.model)('products', productSchema);
//# sourceMappingURL=products.model.js.map