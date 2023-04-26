import { IAddress } from "./address";

export interface IOrderToCreate {
    orderItems: IOrderItem[];
}

export interface IOrder {
    id: number;
    userId: string;
    username: string;
    orderDate: Date;
    totalAmount: number;
    orderItems: IOrderItem[];
}

export interface IOrderItem {
    productId: number;
    productName: string;
    pictureUrl: string;
    price: number;
    quantity: number;
}

