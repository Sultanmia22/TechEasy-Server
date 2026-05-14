import type { Types } from "mongoose";
import type { Product } from "./products.interface";
interface IWishListItem {
    productId: string | Types.ObjectId | Product;
}
export interface IWishList {
    customerEmail: string;
    wishListItem: IWishListItem[];
}
export {};
//# sourceMappingURL=wishlist.interface.d.ts.map