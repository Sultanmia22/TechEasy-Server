export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  upazila: string;
  district: string;
  mobile: string;
  email: string;
  comment?: string;
}

export interface IOrder {
  orderDate: Date;
  shippingInfo: IShippingInfo;
  items: IOrderItem[];
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  stripeSessionId?: string;
}

export interface ICustomer {
  email: string;
  orders: IOrder[];
}