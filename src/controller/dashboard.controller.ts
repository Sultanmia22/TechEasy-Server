import type { Request, Response } from "express";
import { CustomerOrder } from "../models/order.mode";
import { WishList } from "../models/wishlist.model";

const getDashboradSummyData = async (req: Request, res: Response) => {
    try {
        const { customerEmail } = req.query;

        if (!customerEmail) {
            res.status(400).json({
                success: false,
                message: 'Customer Email is required. Please provide a valid email.'
            })
            return;
        }

        const oneHourAgo = new Date(Date.now() - 5 * 60 * 60 * 1000);

        const [orderStats, wishlistData, recentOrdersData] = await Promise.all([

            CustomerOrder.aggregate([
                { $match: { email: customerEmail } },
                {
                    $project: {
                        totalOrder: { $size: "$orders" },
                        totalPendingOrder: {
                            $size: {
                                $filter: {
                                    input: "$orders",
                                    as: "order",
                                    cond: { $eq: ["$$order.devliveredStatus", "pending"] }
                                }
                            }
                        },
                        totalDeliveredOrder: {
                            $size: {
                                $filter: {
                                    input: "$orders",
                                    as: "order",
                                    cond: { $eq: ["$$order.devliveredStatus", "delivered"] }
                                }
                            }
                        }
                    }
                }
            ]),

            
            WishList.findOne({ customerEmail })
                .populate({
                    path: 'wishListItem.productId'
                })
                .slice('wishListItem', 4),


            CustomerOrder.findOne({
                email: customerEmail,
                "orders.orderDate": { $gte: oneHourAgo }
            })
                .populate({
                    path: 'orders.items.productId'
                })

        ]);



        const totalOrder = orderStats[0]?.totalOrder || 0;
        const totalPendingOrder = orderStats[0]?.totalPendingOrder || 0;
        const totalDeliveredOrder = orderStats[0]?.totalDeliveredOrder || 0;

        const wishListItems = wishlistData?.wishListItem || [];
        const totalWishList = wishListItems.length;


        const recentOrders = recentOrdersData?.orders || [];
        res.status(200).json({
            data: {
                stats: {
                    totalOrder,
                    totalPendingOrder,
                    totalDeliveredOrder,
                    totalWishList
                },
                wishListItems,
                recentOrders
            }
        })

    }
    catch (er: any) {
        console.log(er)
        res.status(500).json(er || 'Something went wrong!')
    }
}

export const DashboardController = {
    getDashboradSummyData
}