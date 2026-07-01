import type { Request, Response } from "express"
import { User } from "../models/user.model"
import { Products } from "../models/products.model"
import { CustomerOrder } from "../models/order.mode"
import type { AuthRequest } from "../middleware/authMiddleware"

const adminStats = async (req: AuthRequest, res: Response) => {
    try {

        const {role} = req.user

        if(role !== 'admin'){
            return res.status(401).json({
                success : false,
                message : 'You are unauthirized for this action'
            })
        }

        const [totalUsers, totalProducts, totalOrders, revenueData] = await Promise.all([
            User.countDocuments(),
            Products.countDocuments(),
            CustomerOrder.countDocuments(),

            CustomerOrder.aggregate([
                {
                    $group: {
                        _id: null,

                        totalRevenue: { $sum: { $sum: "$orders.totalPrice" } }
                    }
                }
            ])
        ])

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        res.status(200).json({
            success: true,
            message: "Dashboard summary fetched successfully",
            data: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue
            }
        });
    }
    catch (er: unknown) {
        if (er instanceof Error) {
            res.status(500).json({
                success: false,
                message: er.message || 'An unexpected internal server error occurred'
            })
        }
        else {
            res.status(500).json({
                success: false,
                message: 'An unexpected internal server error occurred'
            })
        }
    }
}

export const profileController = {
    adminStats,
}