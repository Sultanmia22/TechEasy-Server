import { Request, Response } from "express";
import Cart from "../models/cart.model";
import type { AuthRequest } from "../middleware/authMiddleware";

const addToCart = async (req: Request, res: Response) => {
  try {
    const { userEmail, productId, quantity } = req.body;

    if (!userEmail || !productId || !quantity) {
      res.status(400).json({
        success: false,
        message: "Please Provide All Required Fields",
      });
    }

    let cart = await Cart.findOne({ userEmail });

    if (!cart) {
      cart = await Cart.create({
        userEmail,
        items: [
          {
            productId,
            quantity,
          },
        ],
      });
    }
    else{
        const existingItemIndex = cart.items.findIndex((item) => item.productId.toString() === productId.toString())

        if(existingItemIndex > -1 && cart.items[existingItemIndex]){
            cart.items[existingItemIndex].quantity += quantity
        }

        else{
            cart.items.push({productId,quantity})
        }

        await cart.save()
    }

    res.status(200).json({
        success: true,
        message: 'Add To Cart Successfully',
        data: cart
    })

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

    const query = {userEmail:email as string}

    if (!email) {
      res.status(400).json({
        success: false,
        message: "User Email is required!",
      });
    }

    const cart = await Cart.find(query).populate('items.productId');

    const subTotal = cart[0]?.items.reduce((sum,item) => {
      const product = item.productId as { price: number };
      return sum + product.price * item.quantity
    },0)


    if(!cart){
        res.status(404).json({
            success: false,
            message: 'No Cart Founded',
            data: []
        })
    }

  

    res.status(200).json({
        success: true,
        data: {
          cart,
          subTotal,
        }
    })
  } catch (er) {
    console.log("Error Message", er);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

export const cartController = {
  addToCart,
  getCartByEmail
};
