
export interface IUser {
    name: string,
    email: string,
    password: string,
    date: Date,
    image?: string,
    role: 'admin' | 'customer',
    personalInfo?: {
        phone?: string;
        altPhone?: string;
        dateOfBirth?: string;
        gender?: string;
        nidNumber?: string;
        occupation?: string;
        location?: string;
    };

    address?: {
        id?: string;
        type: 'Home' | 'Office'
        name: string;
        address: string;
        city: string;
        country: string;
        phone: string;
        isDefault: boolean;
    }[];

    status: 'active' | 'banned';
}


