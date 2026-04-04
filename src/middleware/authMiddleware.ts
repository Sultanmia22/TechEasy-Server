import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export interface AuthRequest extends Request {
  user?: any;
}

const verifyToken = (req: AuthRequest, res: Response,next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ message: 'Unauthorized: No token' });
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token' });
  }

  const secret = process.env.JWT_SECRET;

   try{
    const decoded  = jwt.verify(token , secret as string)
    req.user = decoded ;

    next();
   }
   catch(er:any){
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
   }
}

export default verifyToken;