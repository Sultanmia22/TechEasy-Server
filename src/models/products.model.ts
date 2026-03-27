import { model, Schema, Types } from "mongoose"
import { Product } from "../types/products.interface";

const productSchema = new Schema<Product>(
  {
    id: { 
      type: Number, 
      required: true, 
      unique: true 
    },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    stock: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
    specs: { type: Schema.Types.Mixed } 
  },
  {
    timestamps: true 
  }
);

export const Products = model<Product>('products',productSchema)