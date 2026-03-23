import { model, Schema } from "mongoose";
import { IUser } from "../types/user.interface";
import bcrypt from 'bcrypt';
const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true,select: false},
    date: {type: Date, required: true},
    image: {type: String, required: true},
    role: {type: String, enum: ['admin','customer'], default: 'customer' },
},

{
    timestamps: true,
},

)

userSchema.pre('save',async function (this:any){
    const user = this

    if(!user.isModified('password')){
        return;
    }

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    catch (error: any) {
        throw new Error(error); 
    }
})

export const User = model<IUser>('Users',userSchema)