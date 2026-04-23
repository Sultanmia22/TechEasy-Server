import { Request, Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
export declare const cartController: {
    addToCart: (req: Request, res: Response) => Promise<void>;
    getCartByEmail: (req: AuthRequest, res: Response) => Promise<void>;
    removeCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=cart.controller.d.ts.map