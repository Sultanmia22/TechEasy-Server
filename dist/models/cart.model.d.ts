import { ICart } from "../types/cart.interface";
declare const Cart: import("mongoose").Model<ICart, {}, {}, {}, import("mongoose").Document<unknown, {}, ICart, {}, import("mongoose").DefaultSchemaOptions> & ICart & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, ICart>;
export default Cart;
//# sourceMappingURL=cart.model.d.ts.map