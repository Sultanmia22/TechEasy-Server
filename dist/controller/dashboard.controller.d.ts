import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware";
export declare const DashboardController: {
    getDashboradSummyData: (req: AuthRequest, res: Response) => Promise<void>;
    getMyOrders: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=dashboard.controller.d.ts.map