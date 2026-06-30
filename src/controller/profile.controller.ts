import type { Request, Response } from "express"

const adminStats = async (req: Request, res: Response) => {
    try{
        
    }
    catch(er:unknown){
        if(er instanceof Error){
            res.status(500).json({
                success : false,
                message: er.message || 'An unexpected internal server error occurred'
            })
        }
        else{
            res.status(500).json({
                success : false,
                message : 'An unexpected internal server error occurred'
            })
        }
    }
}

export const profileController = {
    adminStats,
}