import { Request, Response } from "express";
import { Products } from "../models/products.model";


const popularProducts = async (req: Request, res: Response) => {
    try {
        const result = await Products.find({}).sort({ rating: -1 }).limit(6).exec()

        res.status(200).json({
            success: true,
            message: "Top 6 popular products fetched successfully",
            data: result
        });
    }
    catch (er: any) {
        console.error("Popular Products Error:", er);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export const productController = {
    popularProducts
}