
export interface IUser {
    name: string,
    email: string,
    password: string,
    date: Date,
    image?: string,
    role: 'admin' | 'customer',
    profile?: {
        phone?: string;
        altPhone?: string;
        dateOfBirth?: string;
        gender?: string;
        nidNumber?: string;
        occupation?: string;
        location?: string;
    };
}

