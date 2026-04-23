import { Types } from "mongoose";
import { Product } from "./products.interface";
export interface IPopulatedCartItem {
    productId: string | Types.ObjectId | Product;
    quantity: number;
}
export interface ICart {
    userEmail: string;
    items: IPopulatedCartItem[];
    orderStatus: string;
}
//# sourceMappingURL=cart.interface.d.ts.map