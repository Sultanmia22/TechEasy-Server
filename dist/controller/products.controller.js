"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const products_model_1 = require("../models/products.model");
const popularProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_model_1.Products.find({}).sort({ rating: -1 }).limit(6).exec();
        res.status(200).json({
            success: true,
            message: "Top 6 popular products fetched successfully",
            data: result
        });
    }
    catch (er) {
        console.error("Popular Products Error:", er);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
const getFilters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield products_model_1.Products.distinct('category');
        const brands = yield products_model_1.Products.distinct('brand');
        res.status(200).json({
            success: true,
            data: { categories, brands }
        });
    }
    catch (er) {
        res.status(500).json({
            success: false,
            message: 'Something went Wrong!'
        });
    }
});
const allProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 8, category, brand, name, price } = req.query;
        let query = {};
        if (category && typeof category === 'string')
            query.category = category;
        if (brand && typeof brand === 'string')
            query.brand = brand;
        if (name && typeof name === 'string' && name.trim() !== '') {
            query.name = { $regex: name, $options: 'i' };
        }
        // Sort 
        let sort = {};
        if (price === 'low')
            sort.price = 1;
        if (price === 'high')
            sort.price = -1;
        // Pagination
        const skip = (Number(page) - 1) * Number(limit);
        const total = yield products_model_1.Products.countDocuments(query);
        const products = yield products_model_1.Products.find(query).sort(sort).skip(skip).limit(Number(limit));
        res.status(200).json({
            success: true,
            data: products,
            total,
            page: Number(page),
            limit: Number(limit)
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const singleProduct = yield products_model_1.Products.findById(id);
        if (!singleProduct) {
            return res.status(404).json({
                success: false,
                message: 'Poduct Not Found',
            });
        }
        res.status(200).json({
            success: true,
            data: singleProduct
        });
    }
    catch (er) {
        console.log(er.message);
        res.status(500).json({
            success: false,
            message: 'Something weent wrong'
        });
    }
});
exports.productController = {
    popularProducts,
    getFilters,
    allProduct,
    getProductById
};
//# sourceMappingURL=products.controller.js.map