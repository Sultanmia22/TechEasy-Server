/* import { model, Schema } from "mongoose";
import { ICart } from "../types/cart.interface";

const cartSchema = new Schema<ICart>(
  {
    userEmail: { type: String, required: true },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.index({ userEmail: 1, productId: 1 }, { unique: true });

const Cart = model<ICart>("Carts", cartSchema);

void (async () => {
  try {
    await Cart.collection.dropIndex("userEmail_1");
    console.log("Dropped legacy userEmail unique index from cart collection");
  } catch (error: any) {
    if (error?.codeName !== "IndexNotFound") {
      console.error("Failed to drop legacy cart index:", error);
    }
  }

  await Cart.syncIndexes();
})();

export default Cart */

import { model, Schema } from "mongoose";
import { ICart } from "../types/cart.interface";

const cartSchema = new Schema<ICart>(
  {
    userEmail: { type: String, required: true },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = model<ICart>("Carts", cartSchema);

export default Cart;