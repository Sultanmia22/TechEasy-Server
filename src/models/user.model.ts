import { Schema } from "mongoose";
import { IUser } from "../types/user.interface";

const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, required: true},
    image: {type: String, required: true},
    role: {type: String, enum: ['admin', 'seller'], default: 'customer' },
},

{
    timestamps: true,
}

)