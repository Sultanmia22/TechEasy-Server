import { Types } from "mongoose";

export interface ProductSpecs {
  [key: string]: string | number;
}

export interface Product {
  _id:Types.ObjectId;
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  image: string;
  description?: string;
  specs?: ProductSpecs;
}