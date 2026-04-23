import { Schema } from "mongoose";
import type { IOrderItem, IShippingInfo } from "../types/order.interface";
export declare const CustomerOrder: import("mongoose").Model<{
    email: string;
    orders: import("mongoose").Types.DocumentArray<{
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }, {}, {}> & {
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }>;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    email: string;
    orders: import("mongoose").Types.DocumentArray<{
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }, {}, {}> & {
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }>;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    email: string;
    orders: import("mongoose").Types.DocumentArray<{
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }, {}, {}> & {
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }>;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    email: string;
    orders: import("mongoose").Types.DocumentArray<{
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }, {}, {}> & {
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }>;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    email: string;
    orders: import("mongoose").Types.DocumentArray<{
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }, {}, {}> & {
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }>;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    email: string;
    orders: import("mongoose").Types.DocumentArray<{
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }, {}, {}> & {
        items: import("mongoose").Types.DocumentArray<IOrderItem, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, IOrderItem, {}, {}> & IOrderItem>;
        orderDate: NativeDate;
        shippingInfo: IShippingInfo;
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }>;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    email: string;
    orders: import("mongoose").Types.DocumentArray<{
        items: import("mongoose").Types.DocumentArray<{
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }, {}, {}> & {
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }>;
        orderDate: NativeDate;
        shippingInfo: {
            firstName: string;
            lastName: string;
            address: string;
            upazila: string;
            district: string;
            mobile: string;
            email: string;
            comment?: string;
        };
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        items: import("mongoose").Types.DocumentArray<{
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }, {}, {}> & {
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }>;
        orderDate: NativeDate;
        shippingInfo: {
            firstName: string;
            lastName: string;
            address: string;
            upazila: string;
            district: string;
            mobile: string;
            email: string;
            comment?: string;
        };
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }, {}, {}> & {
        items: import("mongoose").Types.DocumentArray<{
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }, {}, {}> & {
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }>;
        orderDate: NativeDate;
        shippingInfo: {
            firstName: string;
            lastName: string;
            address: string;
            upazila: string;
            district: string;
            mobile: string;
            email: string;
            comment?: string;
        };
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }>;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    email: string;
    orders: import("mongoose").Types.DocumentArray<{
        items: import("mongoose").Types.DocumentArray<{
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }, {}, {}> & {
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }>;
        orderDate: NativeDate;
        shippingInfo: {
            firstName: string;
            lastName: string;
            address: string;
            upazila: string;
            district: string;
            mobile: string;
            email: string;
            comment?: string;
        };
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        items: import("mongoose").Types.DocumentArray<{
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }, {}, {}> & {
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }>;
        orderDate: NativeDate;
        shippingInfo: {
            firstName: string;
            lastName: string;
            address: string;
            upazila: string;
            district: string;
            mobile: string;
            email: string;
            comment?: string;
        };
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }, {}, {}> & {
        items: import("mongoose").Types.DocumentArray<{
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }, {}, {}> & {
            productId: string;
            name: string;
            price: number;
            quantity: number;
            image: string;
        }>;
        orderDate: NativeDate;
        shippingInfo: {
            firstName: string;
            lastName: string;
            address: string;
            upazila: string;
            district: string;
            mobile: string;
            email: string;
            comment?: string;
        };
        totalPrice: number;
        paymentStatus: "pending" | "failed" | "paid";
        stripeSessionId?: string | null;
    }>;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=order.mode.d.ts.map