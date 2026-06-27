import { User } from "../models/user.model";
import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import type { AuthRequest } from "../middleware/authMiddleware";
import bcrypt from 'bcrypt';


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

        const isPasswordMatched = await bcrypt.compare(password, user.password)

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

const savePersonalInfo = async (req: AuthRequest, res: Response) => {
    try {

        const email = req?.user?.email;

        console.log('email', email)

        const profileData = req.body;


        if (!email) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No email found in token"
            });
        }

        const result = await User.findOneAndUpdate(
            { email: email },

            {
                $set: {
                    personalInfo: profileData
                }
            },

            {
                new: true,
                runValidators: true
            }
        )

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        // console.log('data',result)

        res.status(200).json({
            success: true,
            message: "Saved Personal Information successfully!",
            data: result
        });

    }
    catch (er: any) {
        console.log(er)

        res.status(500).json({
            success: false,
            message: er.message || "Internal Server Error"
        });
    }
}

const getPersonalInfo = async (req: AuthRequest, res: Response) => {
    try {
        const { customerEmail } = req.query;

        if (!customerEmail) {
            return res.status(400).json({
                success: false,
                message: "Customer email is required in query parameters."
            });
        }

        const user = await User.findOne({ email: customerEmail }).select('name email personalInfo -_id');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        const personalInfo = {
            fullName: user.name,
            email: user.email,
            phone: user.personalInfo?.phone || "",
            altPhone: user.personalInfo?.altPhone || "",
            dateOfBirth: user.personalInfo?.dateOfBirth || "",
            gender: user.personalInfo?.gender || "",
            occupation: user.personalInfo?.occupation || "",
            nidNumber: user.personalInfo?.nidNumber || "",
            location: user.personalInfo?.location || ""
        };

        // console.log(personalInfo)

        return res.status(200).json({
            success: true,
            message: "Personal information fetched successfully!",
            data: personalInfo
        });

    } catch (er: any) {
        console.error("Error in getPersonalInfo:", er);
        return res.status(500).json({
            success: false,
            message: er.message || "Internal server error"
        });
    }
};

const saveAddress = async (req: AuthRequest, res: Response) => {
    try {
        const customerEmail = req.user?.email;

        const addressData = req.body

        if (!customerEmail) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No email found in token"
            });
        }

        if(!addressData.type || !['Home', 'Office'].includes(addressData.type)){
            return res.status(400).json({
                success: false,
                message: "Invalid address type. Must be 'Home' or 'Office'."
            });
        };

        const existingAddress = await User.findOne({
            email: customerEmail,
            "address.type": addressData.type
        })

        let result;

        if(existingAddress){
            result = await User.findOneAndUpdate(
                 { 
                    email: customerEmail, 
                    "address.type": addressData.type 
                },

                {
                    $set: {
                        "address.$": { ...addressData }
                    }
                },
                { new: true, runValidators: true }
            )
        }else{
            result = await User.findOneAndUpdate(
                { email: customerEmail },
                {
                    $push: {
                        address: addressData
                    }
                }
            )
        }


         if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }


        res.status(200).json({
            success: true,
            message: "Saved Address successfully!",
            data: result
        });
    }
    catch (er: any) {
        console.error("Error in getPersonalInfo:", er);
        return res.status(500).json({
            success: false,
            message: er.message || "Internal server error"
        });
    }
}

const getAddress = async (req: AuthRequest, res: Response) => {
    try {
        const { customerEmail } = req.query;

        if (!customerEmail) {
            return res.status(400).json({
                success: false,
                message: "Customer email is required in query parameters."
            });
        }

        const user = await User.findOne({ email: customerEmail }).select('name address -_id');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

       const addressList = user.address || [];

        // console.log('Address Data',addressList)


        res.status(200).json({
            success: true,
            message: "Personal information fetched successfully!",
            data: addressList        
        })


    } catch (er: any) {
        console.error("Error in getPersonalInfo:", er);
        return res.status(500).json({
            success: false,
            message: er.message || "Internal server error"
        });
    }
};

const deleteAddress = async (req: Request, res: Response) => {
    try{
        const {customerEmail,type} = req.query;

        if (!customerEmail) {
            return res.status(400).json({
                success: false,
                message: "Customer email is required in query parameters."
            });
        }

        if(!type){
            return res.status(400).json({
                success: false,
                message: "Address Type is required in query parameters."
            });
        }

        const existingUser = await User.findOne({email:customerEmail})

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email."
            });
        }

        const hasAddressType = existingUser.address?.some(add => add.type === type)

        if (!hasAddressType) {
            return res.status(404).json({
                success: false,
                message: `No address found with type '${type}' for this user.`
            });
        }

        const result = await User.findOneAndUpdate(
            { email: customerEmail },
            {
                $pull: {
                    address: { type: type }
                }
            },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Address deleted successfully.",
            data: result
        });

    }
    catch(er:any){
        console.log(er)
        return res.status(500).json({
            success: false,
            message: er.message || "Internal server error"
        });
    }
}

const changleRoleByAdmin = async (req:AuthRequest, res: Response) => {
    try{
        const {role} = req.user

        const {email,newRole} = req.body;

        if(role !== 'admin'){
            return res.status(401).json({
                succeess : false,
                message : 'You are not authorized to update user role'
            })
        }

        const updatedUser = await User.findOneAndUpdate(
            {email: email},
            {
                $set: {role: newRole}
            },
            {new: true}
        )

        if (!updatedUser) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User role updated successfully',
            data: updatedUser
        });
    }
    catch(er:unknown){
        console.error(er);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

const bannedUser = async (req: AuthRequest, res: Response) => {
    try{
        const {role} = req.user

        const {email,statusVal} = req.body;

        if(role !== 'admin'){
            return res.status(403).json({
                success: false
            })
        }

        const updateUser = await User.findOneAndUpdate(
            {email: email},
            {
                $set: {status: statusVal}
            },
            {new: true}
        )

        if(!updateUser){
            return res.status(404).json({
                success: false,
                message: 'User Not Found'
            })
            return
        }

        res.status(200).json({
            success : true,
            message: `${updateUser.status} has Successfully!`,
            data: updateUser?.status
        })
    }
    catch(er:unknown){
        if (er instanceof Error) {
            console.error("Error occurred:", er.message);
            return res.status(500).json({ 
                success: false, 
                message: er.message 
            });
        } 
        
        console.error("Unknown error:", er);
        return res.status(500).json({ 
            success: false, 
            message: 'An unexpected internal server error occurred' 
        });
    }
}

const deleteUser = async (req: AuthRequest, res: Response) => {
    try{
        const {role} = req.user
        const adminRole = role as string

        const {email} = req.query;


        const emailString = email as string

        if(adminRole?.trim() !== process.env.ADMIN_ROLE?.trim()){
            return res.status(403).json({
                success: false,
                message: 'You are unauthorized for this action'
            })
        }

        const deleteUser = await User.deleteOne({email:emailString})

        console.log('Delete Users',deleteUser)

        if (deleteUser.deletedCount === 0) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found!" 
            });
        }

        return res.status(200).json({
            success: true,
            message : 'User Permanently Delete from this application'
        }) 
        
    }
    catch(er:unknown){
         if (er instanceof Error) {
            console.error("Error occurred:", er.message);
            return res.status(500).json({ 
                success: false, 
                message: er.message 
            });
        } 
        
        console.error("Unknown error:", er);
        return res.status(500).json({ 
            success: false, 
            message: 'An unexpected internal server error occurred' 
        });
    }
}

const allUsers = async (req: AuthRequest, res: Response) => {
    try {
        
        const {role} = req.user

        if(role !== process.env.ADMIN_ROLE){
            return res.status(403).json({
                success : false,
                message: 'You are unauthorized for this action'
            })
        }

        const users = await User.find()
        .select('_id name email image status createdAt')
        .lean()

      res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      total: users.length,
      data: users
    });

    }
    catch (er: unknown) {
        if (er instanceof Error) {
            console.log(er.message)
            res.status(500).json({
                success: false,
                message: er.message
            })
        }
        else {
            res.status(500).json({
                success: false,
                message: "An unknown error occurred",
            })
        }
    }
}

export const userController = {
    register,
    login,
    socialLogin,
    savePersonalInfo,
    getPersonalInfo,
    saveAddress,
    getAddress,
    deleteAddress,
    changleRoleByAdmin,
    bannedUser,
    deleteUser,
    allUsers
}


