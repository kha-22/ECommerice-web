export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  pictureUrl: string;
  category: string;
  quantity: number;
  url: string;
}

export class ProductRate {
  productId: number;
  rate: number;
}
