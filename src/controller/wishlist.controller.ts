import type { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
import { WishList } from "../models/wishlist.model";

const addWishList = async (req: AuthRequest, res : Response) => {
    try{
        const {customerEmail,productId} = req.body;

        console.log(`customerEmail ${customerEmail} and productId ${productId}`)

        const existWishlist = await WishList.findOne({customerEmail})

        if(existWishlist){
            const isProductAlreadyInList = existWishlist.wishListItem.some((item) => {
                    item.productId.toString === productId
            })

            if(isProductAlreadyInList){
                return res.status(409).json({
                    success: false,
                    message: 'This product already exists in your wishlist'
                });
            }

            existWishlist?.wishListItem.push({productId})
            await existWishlist.save()

            res.status(200).json({
                success: true,
                message: 'Product added to wishlist successfully',
                data: existWishlist
            });
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

export const wishListController = {
  addWishList
};