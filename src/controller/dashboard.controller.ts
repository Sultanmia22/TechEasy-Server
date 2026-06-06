import type { Request, Response } from "express";
import { CustomerOrder } from "../models/order.mode";
import { WishList } from "../models/wishlist.model";
import type { AuthRequest } from "../middleware/authMiddleware";
import { User } from "../models/user.model";

const getDashboradSummyData = async (req: AuthRequest, res: Response) => {
    try {

        const {user,role} = req.user

        const { email } = req.query;

        if (!email) {
            res.status(400).json({
                success: false,
                message: 'Customer Email is required. Please provide a valid email.'
            })
            return;
        }


        if(role === 'admin') {
            const orderData = await CustomerOrder.aggregate([
                { $unwind: "$orders" },
                {
                  $facet: {
                    "stats": [
                      {
                        $group: {
                          _id: null,
                          totalOrders: { $sum: 1 },
                          totalSales: { $sum: "$orders.totalPrice" },
                          totalPending: { $sum: { $cond: [{ $eq: [{ $arrayElemAt: ["$orders.delivaryStatus", -1] }, "pending"] }, 1, 0] } },
                          totalDelivered: { $sum: { $cond: [{ $eq: [{ $arrayElemAt: ["$orders.delivaryStatus", -1] }, "delivered"] }, 1, 0] } }
                        }
                      }
                    ],
                    "recentOrders": [
                      { $sort: { "orders.createdAt": -1 } },
                      { $limit: 5 },
                      {
                        $lookup: {
                          from: "users",
                          localField: "email",
                          foreignField: "email",
                          as: "customerInfo" 
                        }
                      },
                      {
                        $project: {
                         orderId: "$orders._id",
                          customerName: { $arrayElemAt: ["$customerInfo.name", 0] },
                          customerEmail: { $arrayElemAt: ["$customerInfo.email", 0] },
                          amount: "$orders.totalPrice",
                          status: { $arrayElemAt: ["$orders.delivaryStatus", -1] },
                          date: "$orders.orderDate",
                          products: {
                              $map: {
                                  input: "$orders.items",
                                  as: "item",
                                  in: {
                                      name: "$$item.name",
                                      quantity: "$$item.quantity",
                                      image: "$$item.image"
                                  }
                              }
                          }
                      }
                      }
                    ],
                    "topProducts": [
                      { $unwind: "$orders.items" },
                      {
                        $group: {
                          _id: "$orders.items.productId",
                          productName: { $first: "$orders.items.name" },
                          productImage: { $first: "$orders.items.image" },
                          totalQty: { $sum: "$orders.items.quantity" },
                          totalAmount: { $sum: { $multiply: ["$orders.items.price", "$orders.items.quantity"] } }
                        }
                      },
                      { $sort: { totalQty: -1 } },
                      { $limit: 5 }
                    ]
                  }
                }
              ]);
          
             
              const recentUsers = await User.find({ role: 'customer' }) 
                .sort({ createdAt: -1 })
                .limit(5)
                .select("name image email createdAt status");
          
              // Result structure
              const data = orderData[0];
              const stats = data.stats[0] || { totalOrders: 0, totalSales: 0, totalPending: 0, totalDelivered: 0 };
              
              // console.log(data)
              return res.status(200).json({
                data: {
                  stats: {
                    totalOrder: stats.totalOrders,
                    totalRevenue: stats.totalSales,
                    totalPendingOrder: stats.totalPending,
                    totalDeliveredOrder: stats.totalDelivered
                  },
                  recentOrders: data.recentOrders,
                  topProducts: data.topProducts,
                  recentUsers: recentUsers
                }
              });
        }

        const oneHourAgo = new Date(Date.now() - 5 * 60 * 60 * 1000);

        const [orderStats, wishlistData, recentOrdersData] = await Promise.all([

            CustomerOrder.aggregate([
                { $match: { email: email } },
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


            WishList.findOne({ customerEmail: email })
                .populate({
                    path: 'wishListItem.productId'
                })
                .slice('wishListItem', 4),


            CustomerOrder.findOne({
                email: email,
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

const getMyOrders = async (req: Request, res: Response) => {
    try {
        const { customerEmail } = req.query;

        if (!customerEmail) {
            res.status(400).json({
                success: false,
                message: 'Customer Email is required. Please provide a valid email.'
            })
            return;
        }

        const findorders = await CustomerOrder.findOne({ email: customerEmail })

        const customerOrders = findorders?.orders;


        if (!customerOrders || customerOrders.length === 0) {
            res.status(404).json({
                success: false,
                message: 'Product not found!',
                data: []
            })
            return;
        }

        res.status(200).json({
            success: true,
            data: customerOrders
        })
    }
    catch (er: any) {
        console.log(er)
    }
}

export const DashboardController = {
    getDashboradSummyData,
    getMyOrders
}