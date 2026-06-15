import { Request, Response } from "express";
import { Products } from "../models/products.model";
import type { AuthRequest } from "../middleware/authMiddleware";
import type { Product } from "../types/products.interface";
import { FilterQuery } from 'mongoose';

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
        const { page = 1, limit = 8, category, brand, name, price } = req.query;

        let query: any = {};

        if (category && typeof category === 'string') query.category = category;
        if (brand && typeof brand === 'string') query.brand = brand;
        if (name && typeof name === 'string' && name.trim() !== '') {
            query.name = { $regex: name, $options: 'i' };
        }

        // Sort 
        let sort: any = {};
        if (price === 'low') sort.price = 1;
        if (price === 'high') sort.price = -1;

        // Pagination
        const skip = (Number(page) - 1) * Number(limit);

        const total = await Products.countDocuments(query);

        const products = await Products.find(query).sort(sort).skip(skip).limit(Number(limit))

        res.status(200).json({
            success: true,
            data: products,
            total,
            page: Number(page),
            limit: Number(limit)
        });

    } catch (err: any) {
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const singleProduct = await Products.findById(id);

        if (!singleProduct) {
            return res.status(404).json({
                success: false,
                message: 'Poduct Not Found',
            })
        }

        res.status(200).json({
            success: true,
            data: singleProduct
        })
    }
    catch (er: any) {
        console.log(er.message)
        res.status(500).json({
            success: false,
            message: 'Something weent wrong'
        })
    }
}

const addProduct = async (req: AuthRequest, res: Response) => {
    try {
        const {role} = req.user
        const productData = req.body;
        console.log(productData)

        if (role !== process.env.ADMIN_ROLE) {
            return res.status(401).json({
                success: false,
                message: 'You Are Unauthorized for The Add Product'
            })
        }

        const result = await Products.insertOne(productData)

        if (!result) {
            return res.status(400).json({
                success: false,
                message: 'Failed to add product.'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Product added successfully!',
            data: result
        })
    }
    catch (er: unknown) {
        if (er instanceof Error) {
            console.error("Error occurred:", er.message);
            res.status(500).json({
                success: false,
                message: er.message || 'An unexpected internal server error occurred'
            })
        }

        res.status(500).json({
            success: false,
            message: 'An unexpected internal server error occurred'
        })
    }
}


const productList = async (req: AuthRequest, res: Response) => {
    try{
        const {role} = req.user

        const {search,category,sort,page=1,limit=5} = req.query;

        if(role !== process.env.ADMIN_ROLE){
            return res.status(401).json({
                success: false,
                message: 'You Are Unauthorized for the get product list'
            })
        }

        const query: FilterQuery<Product> = {}

        if(search){
            query.name = {$regex: search, $options: 'i'}
        };

        if(category){
            query.category = category;
        };

        // Sort Logic 
        let sortOptions: Record<string, 1 | -1> = {};

        if(sort === 'price_asc') sortOptions.price = 1;

        else if (sort === 'price_desc') sortOptions.price = -1;

        else sortOptions.createdAt = -1;

        // Pagination Logic 
        const skip = (Number(page) - 1) * Number(limit);

        const productList = await Products.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit))

        const total = await Products.countDocuments(query);

        // console.log(productList)

        res.status(200).json({
            success: true,
            message: 'Product Get Successfully',
           data: {
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            products: productList,
           }
        })
    }
    catch(er:unknown){
        if(er instanceof Error){
            console.log('Product List Error:',er.message)
            return res.status(500).json({
                success: false,
                message: er.message || 'An unexpected internal server error occurred'
            })
        }

        res.status(500).json({
            success: false,
            message:'An unexpected internal server error occurred'
        })
    }
}


export const productController = {
    popularProducts,
    getFilters,
    allProduct,
    getProductById,
    addProduct,
    productList
}