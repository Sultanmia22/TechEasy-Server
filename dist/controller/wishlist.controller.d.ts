import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
export declare const wishListController: {
    addWishList: (req: AuthRequest, res: Response) => Promise<void>;
    getWishlist: (req: Request, res: Response) => Promise<void>;
    deleteWishlist: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=wishlist.controller.d.ts.map