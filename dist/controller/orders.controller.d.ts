import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
export declare const orderController: {
    createCheckoutSession: (req: AuthRequest, res: Response) => Promise<void>;
    confirmOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=orders.controller.d.ts.map