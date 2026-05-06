import { Schema, model } from "mongoose";
import type { IOrderItem, IShippingInfo } from "../types/order.interface";

// ১. Shipping Info Schema
const ShippingInfoSchema = new Schema<IShippingInfo>(
  {
    firstName: String,
    lastName: String,
    address: String,
    upazila: String,
    district: String,
    mobile: String,
    email: String,
    comment: String,
  },
  { _id: false },
);

// ২. Order Item Schema
const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: String, 
    name: String,
    price: Number,
    quantity: Number,
    image: String,
  },
  { _id: false },
);

// ৩. Main Customer Schema
const CustomerOrderSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    orders: [
      {
        orderDate: { type: Date, default: Date.now },
        shippingInfo: { type: ShippingInfoSchema, required: true },
        items: { type: [OrderItemSchema], required: true },
        totalPrice: { type: Number, required: true },
        deliveryCharge : {type: Number, required: true},
        paymentStatus: {
          type: String,
          enum: ["pending", "paid", "failed"],
          default: "pending",
        },
        orderStatus : {
          type : [String],
          enum : ['confirmed', 'paid', 'pending', 'shiped','delivered'],
          default: ['confirmed']
        },
        stripeSessionId: String,
      },
    ],
  },
  { timestamps: true },
);

export const CustomerOrder = model("CustomerOrder", CustomerOrderSchema);
