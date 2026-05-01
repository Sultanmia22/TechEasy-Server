import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
import { CustomerOrder } from "../models/order.mode";
import type { IOrderItem } from "../types/order.interface";
import { Session } from "node:inspector";
import Cart from "../models/cart.model";
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
        orderStatus: 'confirmed'
      };

      const updatedDoc = await CustomerOrder.findOneAndUpdate(
        { email: customerEmail },
        { $push: { orders: newOrderData } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
      );

      orderToProcess = updatedDoc.orders[updatedDoc.orders.length - 1];
    }

    const delivaryCharge = shippingInfo.district === "dhaka-city" ? 80 : 120;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        ...(orderToProcess?.items || []).map((item: any) => ({
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
        mongoOrderId: orderToProcess?._id.toString(),
        email: customerEmail,
        productId: items.map((item: any) => item.productId).join(","),
      },
      success_url: `${process.env.CLIENT_URL}/payment-success?order_id=${orderToProcess?._id}&email=${customerEmail}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
    });

    await CustomerOrder.updateOne(
      { email: customerEmail, "orders._id": orderToProcess?._id },
      { $set: { "orders.$.stripeSessionId": session.id } },
    );

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const paidOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, email } = req.query;

    if (!orderId && !email) {
      res.status(400).json({ message: "Order ID and Email are required" });
    }

    const userDoc = await CustomerOrder.findOne(
      {
        email: email as string,
        "orders._id": orderId as string,
      },
      { "orders.$": 1 },
    );

    if (!userDoc || !userDoc.orders || userDoc.orders.length === 0) {
      return res
        .status(404)
        .json({ message: "Order not found in our database" });
    }

    const orderData = userDoc?.orders[0];

    if (orderData?.paymentStatus === "pending" && orderData?.stripeSessionId) {
      const session = await stripe.checkout.sessions.retrieve(
        orderData.stripeSessionId,
      );

      if (session.payment_status === "paid" && session.status === "complete") {
        await CustomerOrder.updateOne(
          {
            email: email as string,
            "orders._id": orderId as string,
          },

          {
            $set: { "orders.$.paymentStatus": "paid" },
            $addToSet: {
              "orders.$.orderStatus": "paid"
            }
          },
        );

        const productIdsString = session.metadata.productId;
        if (productIdsString) {
          const productIdsArray = productIdsString.split(",");

          await Cart.updateMany(
            {
              userEmail: email as string,
              "items.productId": { $in: productIdsArray }
            },
            {
              $set: { orderStatus: "success" },

            },
          );
        }
      }
      orderData.paymentStatus = "paid";
    }

    return res.status(200).json({ data: orderData });
  } catch (error: any) {
    console.error("Order Confirmation Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { customerEmail, orderId } = req.query;

    if (!customerEmail || !orderId) {
      res.status(400).json({
        success: false,
        message: 'Order ID and Email are required'
      })
      return;
    }

    const customerAllOrder = await CustomerOrder.findOne({ email: customerEmail as string })

    const singleOrder = customerAllOrder?.orders.find(order => order._id.toString() === orderId)

    res.status(200).json({
      success: true,
      data: singleOrder || {}
    })
  }
  catch (er: any) {
    console.log(er)
  }
};

export const orderController = {
  createCheckoutSession,
  paidOrder,
  getSingleOrder
};
