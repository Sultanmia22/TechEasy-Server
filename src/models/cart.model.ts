import { model, Schema } from "mongoose";
import { ICart } from "../types/cart.interface";


const cartSchema = new Schema<ICart>({
    userEmail: { type: String, required: true },
    
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Products',
                required: true,
            },

            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            },
            _id: false 
        }
    ],

},
{
  timestamps: true
}
)




const Cart = model<ICart>('Carts',cartSchema)

export default Cart