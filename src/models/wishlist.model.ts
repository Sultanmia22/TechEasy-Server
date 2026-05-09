import { model, Schema } from "mongoose";
import type { IWishList } from "../types/wishlist.interface";

const wishlistSchema = new Schema <IWishList>({
    customerEmail : {type : String, required : true},
    wishListItem : [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'products',
                required: true,
            },
            _id: false 
        }
    ]
},

{timestamps : true},

)

export const WishList = model<IWishList>('Wishlist',wishlistSchema)