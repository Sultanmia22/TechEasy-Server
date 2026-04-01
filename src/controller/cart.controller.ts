import { Request, Response } from "express";
import Cart from "../models/cart.model";

const addToCart = async (req: Request, res: Response) => {
    try{
       const {userEmail,productId,quantity} = req.body;
       
       if(!userEmail || !productId || !quantity){
        res.status(400).json({
            success: false,
            message: 'Please Provide All Required Fields'
        })
       }

       const cart = await Cart.create({
        userEmail,
        items: [
            {
                productId,
                quantity,
            }
        ]
       })

       res.status(200).json({
        success: true,
        message: 'Product Added To Cart Successfully',
        data: cart
       })
    }
    catch(er:any){
        console.log(er.message);
        res.status(500).json({
            success: false,
            message: 'Something Went Wrong'
        })
    }
}

export const cartController = {
    addToCart
}