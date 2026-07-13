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

    // সরাসরি নতুন ডকুমেন্ট তৈরি, কোনো ম্যাচিং বা আপডেট নয়
    const newCartItem = await Cart.create({
      userEmail,
      productId,
      quantity: normalizedQuantity,
      orderStatus: "pending",
    });

    // তৈরি করা ডকুমেন্টটি populate করে রেসপন্সে পাঠানো
    const cart = await Cart.findById(newCartItem._id)
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

    const cart = await Cart.find({ 
      userEmail: email,
      orderStatus: "pending"   
    })
      .populate({
        path: "productId",
        select: "_id name price image description category brand stock rating",
      })
      .lean();

      // console.log( 'Cart:', cart)

    const items = (cart || []).map((item) => ({
      ...item,
      productId: item.productId ?? null,
    }));

    // console.log( 'Items:', items)

    const subTotal = items.reduce((sum, item) => {
      const price = typeof item.productId?.price === "number" ? item.productId.price : 0;
      const quantity = Number(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);

    // console.log('SubTotal:',subTotal)

    return res.status(200).json({
      success: true,
      message: items.length > 0 ? "Cart fetched successfully" : "No Cart Found",
      data: {
        items,
        subTotal,  
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

 const removeCart = async (req: Request, res: Response) => {
  try{
    const {id} = req.params as { id: string }

   if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const objId = new Types.ObjectId(id);

    const result = await Cart.deleteOne(objId)


    if (result.deletedCount === 0) {
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

} 

export const cartController = {
  addToCart,
  getCartByEmail,
  removeCart
};