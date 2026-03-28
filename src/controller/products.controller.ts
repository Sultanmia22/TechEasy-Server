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

const getFilters = async (req: Request, res: Response) => {
    try {
        const categories = await Products.distinct('category');
        const brands = await Products.distinct('brand');

        res.status(200).json({
            success: true,
            data: { categories, brands }
        });
    }
    catch (er: any) {
        res.status(500).json({
            success: false,
            message: 'Something went Wrong!'
        })
    }
}

const allProduct = async (req: Request, res: Response) => {
    try {
        const { type, value } = req.query;

        let query: any = {};
        let sort: any = {};

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 8;
        const skip = (page - 1) * limit;


        if ((type === 'category' || type === 'brand') && value !== 'all') {
            query[type] = value;
        }

        if (type === 'search' && typeof value === 'string' && value.trim() !== '') {
            query['name'] = { $regex: value, $options: 'i' };
        }

        if (type === 'sort') {
            if (value === 'low') sort.price = 1;
            if (value === 'high') sort.price = -1;
        }

        const product = await Products.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit);


        res.status(200).json({
            success: true,
            message: "Filtered products fetched successfully",
            data: product,
        });

    }
    catch (er: any) {
        console.error(er);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}


export const productController = {
    popularProducts,
    getFilters,
    allProduct
}