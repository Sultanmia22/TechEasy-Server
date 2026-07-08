import { Request, Response } from "express";
import Cart from "../models/cart.model";
import type { AuthRequest } from "../middleware/authMiddleware";
import { Types } from "mongoose";

const addToCart = async (req: Request, res: Response) => {
  try {
    const { userEmail, productId, quantity } = req.body;

    if (!userEmail || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All Required Fields",
      });
    }

    const normalizedQuantity = Number(quantity);

    if (!Number.isFinite(normalizedQuantity) || normalizedQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive number",
      });
    }

    const cart = await Cart.findOneAndUpdate(
      { userEmail, productId },
      {
        $inc: { quantity: normalizedQuantity },
        $setOnInsert: { orderStatus: "pending" },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    )
      .populate({
        path: "productId",
        select: "_id name price image description category brand stock rating",
      })
      .lean();

    res.status(200).json({
      success: true,
      message: "Add To Cart Successfully",
      data: cart,
    });
  } catch (er: any) {
    console.log(er.message);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

const getCartByEmail = async (req: AuthRequest, res: Response) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "User Email is required!",
      });
    }

    const cart = await Cart.find({ userEmail: email })
      .populate({
        path: "productId",
        select: "_id name price image description category brand stock rating",
      })
      .lean();

    const items = (cart || []).map((item) => ({
      ...item,
      productId: item.productId ?? null,
    }));

    const subTotal = items.reduce((sum, item) => {
      const price = typeof item.productId?.price === "number" ? item.productId.price : 0;
      const quantity = Number(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);

    return res.status(200).json({
      success: true,
      message: items.length > 0 ? "Cart fetched successfully" : "No Cart Found",
      data: {
        items,
        0: { subTotal },
      },
    });
  } catch (er) {
    console.log("Error Message", er);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

/* const removeCart = async (req: Request, res: Response) => {
  try{
    const {id} = req.params as { id: string }

   if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const objId = new Types.ObjectId(id);

    const result = await Cart.updateOne(
      {"items.productId":objId},
      {
        $pull: {items: {productId:objId}}
      }
    )

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product successfully remove from cart',
    })
  }

  catch(er:any){

    console.log(er)
  }

} */

export const cartController = {
  addToCart,
  getCartByEmail
};