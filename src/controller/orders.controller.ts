import type { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
import { CustomerOrder } from "../models/order.mode";
import type { IOrderItem } from "../types/order.interface";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req: AuthRequest, res: Response) => {
  try {
    const { customerEmail, shippingInfo, items, totalPrice } = req.body;

    const userOrderDoc = await CustomerOrder.findOne({ email: customerEmail });

    let orderToProcess;

    if (userOrderDoc) {
      const pendingOrders = userOrderDoc.orders.filter(
        (order) => order.paymentStatus === "pending",
      );

      orderToProcess = pendingOrders.find((pOrder) => {
        if (pOrder.items.length !== items.length) return false;

        return pOrder.items.every((dbItem) =>
          items.some(
            (InItem: IOrderItem) =>
              InItem.productId === dbItem.productId &&
              InItem.quantity === dbItem.quantity,
          ),
        );
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

      const updatedDoc = await CustomerOrder.findOneAndUpdate(
        { email: customerEmail },
        { $push: { orders: newOrderData } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );

      orderToProcess = updatedDoc.orders[updatedDoc.orders.length - 1];
    }

    const delivaryCharge = shippingInfo.district === 'dhaka-city' ? 80 : 120

    const session = await stripe.checkout.sessions.create({
     line_items: [
    
    ...(orderToProcess?.items || []).map((item: any) => ({
      price_data: {
        currency: "bdt",
        product_data: { 
          name: item.name,
          images: [item.image], // চাইলে ইমেজও দিতে পারেন
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
        mongoOrderId: orderToProcess?._id.toString(),
        email: customerEmail,
      },
      success_url: `${process.env.CLIENT_URL}/payment-success?order_id=${orderToProcess?._id}&email=${customerEmail}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
    });

    await CustomerOrder.updateOne(
      { email: customerEmail, "orders._id": orderToProcess?._id },
      { $set: { "orders.$.stripeSessionId": session.id } },
    );

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const orderController = {
  createCheckoutSession,
};
