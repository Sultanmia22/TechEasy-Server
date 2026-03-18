import { User } from "../models/user.model";
import { Request, Response } from 'express';

const register = async (req: Request,res: Response) => {
    try{
        const {email} = req.body;

        const isUserExists = await User.findOne({email})

        if(isUserExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists!',
            })
        }

        const savedUser = await User.create(req.body)        

        const userResponse = savedUser.toObject();

        delete (userResponse as any).password;

      console.log(userResponse)

      res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: userResponse
    });


    }
    catch(er:any){
      res.status(500).json({
      success: false,
      message: 'Failed to register user',
      error: er.message,
    });
    }
};

export const userController = {
    register,
}


  