"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishList = void 0;
const mongoose_1 = require("mongoose");
const wishlistSchema = new mongoose_1.Schema({
    customerEmail: { type: String, required: true },
    wishListItem: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'products',
                required: true,
            },
            _id: false
        }
    ]
}, { timestamps: true });
exports.WishList = (0, mongoose_1.model)('Wishlist', wishlistSchema);
//# sourceMappingURL=wishlist.model.js.map