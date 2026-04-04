import { User } from "../models/user.model";
import { Request, Response } from 'express';
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const isUserExists = await User.findOne({ email })

        if (isUserExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists!',
            })
        }

        const savedUser = await User.create(req.body)

        const userResponse = savedUser.toObject();

        delete (userResponse as any).password;


        res.status(201).json({
            success: true,
            message: 'Your registration successfully! Please Login',
            data: userResponse
        });


    }
    catch (er: any) {
        console.log('ERROR Details:', er)
        res.status(500).json({
            success: false,
            message: 'Failed to register user',
            error: er.message,
        });
    }
};


const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');


        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found with this email!',
            });
        }



        if (!user.password) {
            return res.status(400).json({
                message: 'This account was created using Google. Please use Google Sign-In to continue.'
            });
        }

        const isPasswordMatched = await bycrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect password!',
            });
        }

         const accessToken = jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    );

        res.status(200).json({
            success: true,
            data: {
                user,
                accessToken
            },
        });
    }
    catch (er: any) {
        console.log("Error in Login:", er.message);
        res.status(500).json({
            success: false,
            message: er.message || 'Something went wrong on the server'
        })
    }
};


const socialLogin = async (req: Request, res: Response) => {
    try {
        const { name, email, image } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                image,
                role: "customer",
                date: new Date().toISOString(),
            });
        }

        const accessToken = jwt.sign(
            { id: user._id, role: user.role, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            success: true,
            data: {
                user,
                accessToken 
            }
        });

    } catch (er: any) {
        console.log("Error in Social Login:", er.message);
        res.status(500).json({
            success: false, 
            message: er.message || 'Something went wrong during social login'
        });
    }
};

export const userController = {
    register,
    login,
    socialLogin
}


