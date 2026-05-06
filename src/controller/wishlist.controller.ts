import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
import { WishList } from "../models/wishlist.model";

const addWishList = async (req: AuthRequest, res : Response) => {
    try{
        const {customerEmail,productId} = req.body;


        const existWishlist = await WishList.findOne({customerEmail})

        if(existWishlist){
            const isProductAlreadyInList = existWishlist.wishListItem.some((item) => {
                   return item.productId.toString() === productId
            })

            if(isProductAlreadyInList){
                 res.status(409).json({
                    success: false,
                    message: 'This product already exists in your wishlist'
                });
                return
            }

            existWishlist?.wishListItem.push({productId})
            await existWishlist.save()

            res.status(200).json({
                success: true,
                message: 'Product added to wishlist successfully',
                data: existWishlist
            });
            return            
        }

        const newWishList = await WishList.create({
            customerEmail,
            wishListItem: [{productId}]
        })

        res.status(200).json({
            success : true,
            message : 'Product added to wishlist successfully',
            data : newWishList
        })
    }
    catch(er:any){
        console.log(er)
    }
}

const getWishlist = async (req: Request, res: Response) => {
    try{
        const {customerEmail} = req.query;

        if(!customerEmail){
            res.status(400).json({
                success: false,
                message: 'Please provide Customer Email!'
            })
            return
        }

        const customerWishlist = await WishList.findOne({customerEmail}).populate('wishListItem.productId')

        res.status(200).json({
            success: true,
            data : customerWishlist
        })
    }
    catch(er:any){
        console.log(er)
    }
}

export const wishListController = {
  addWishList,
  getWishlist
};