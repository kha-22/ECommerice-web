import { v4 as uuid4 } from 'uuid';

export interface IBasket {
  id: string;
  items: IBasketItem[];
}

export interface IBasketItem {
  productId: number;
  productName: string;
  discount: number;
  price: number;
  quantity: number;
  pictureUrl: string;
  category: string;
}

export class Basket implements IBasket {
  id = uuid4();
  items: IBasketItem[] = [];
}

export interface IBasketTotals {
  shipping: number;
  subTotal: number;
  total: number;
}
