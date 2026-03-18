
import { Date } from "mongoose";

export interface IUser {
    name: string,
    email: string,
    password: string,
    date: Date,
    image?: string,
    role: 'admin' | 'customer' | 'seller'
}