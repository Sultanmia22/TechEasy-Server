import { Request, Response } from "express";
export declare const productController: {
    popularProducts: (req: Request, res: Response) => Promise<void>;
    getFilters: (req: Request, res: Response) => Promise<void>;
    allProduct: (req: Request, res: Response) => Promise<void>;
    getProductById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=products.controller.d.ts.map