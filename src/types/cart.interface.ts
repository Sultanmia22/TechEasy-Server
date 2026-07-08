import { Date, Types } from "mongoose";
import { Product } from "./products.interface";


export interface ICart {
  userEmail: string;
  quantity: number;
  productId:string | Types.ObjectId | Product;
  orderStatus: string;
}