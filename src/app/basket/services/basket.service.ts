import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Basket,
  IBasket,
  IBasketItem,
  IBasketTotals,
} from 'src/app/shared/models/basket';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { IProduct } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseURL = environment.baseUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
  shippingPrice = 0;

  constructor(private http: HttpClient) {}

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapPRoductItemToBasketItems(
      item,
      quantity
    );
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItems(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  setBasket(basket: IBasket) {
    localStorage.setItem('basket', JSON.stringify(basket));
    this.basketSource.next(basket);
    this.calculateTotals();

    // return this.http.post(this.baseURL + 'basket', basket)
    //   .subscribe((respons: IBasket) => {
    //       this.basketSource.next(respons);
    //       this.calculateTotals();
    //   },error => {
    //       console.log(error);
    //   });
  }

  getBasket() {
    let cartLocalStorage = JSON.parse(localStorage.getItem('basket'));
    if (cartLocalStorage) {
      //return Observable.of(cartLocalStorage);
      this.basketSource.next(cartLocalStorage);
      this.calculateTotals();
    }
    // return this.http.get(this.baseURL + 'basket?id='+ id)
    //   .pipe(map((basket: IBasket) => {
    //     this.basketSource.next(basket);
    //     this.calculateTotals();
    //   }));
  }

  getCurrentBasketValue() {
    //return this.basketSource.value;
    return JSON.parse(localStorage.getItem('basket'));
  }

  addOrUpdateItems(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const index = items.findIndex((i) => i.productId === itemToAdd.productId);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const index = basket.items.findIndex((i) => i.id === item.productId);
    basket.items[index].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const index = basket.items.findIndex((i) => i.id === item.productId);
    if (basket.items[index].quantity > 1) {
      basket.items[index].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    debugger;
    let cartLocalStorage = this.getCurrentBasketValue();
    cartLocalStorage.items.forEach((element: any, index: any) => {
      if (element.productId === item.productId) {
        cartLocalStorage.items.splice(index, 1);
      }
    });

    this.setBasket(cartLocalStorage);
  }

  deleteAllBasketItems(basket: IBasket) {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket');
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shippingPrice = deliveryMethod.price;
    this.calculateTotals();
  }

  deleteLocalBasket() {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket');
  }

  //========== Private methods
  private createBasket(): IBasket {
    const basket = new Basket();
    //localStorage.setItem('basket_id',basket.id);
    return basket;
  }

  private mapPRoductItemToBasketItems(
    item: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      productId: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.url,
      quantity,
      category: item.category,
    };
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = this.shippingPrice;
    const subTotal = basket.items.reduce((a, b) => b.price * b.quantity + a, 0);
    const total = subTotal + shipping;
    this.basketTotalSource.next({ shipping, total, subTotal });
  }
}
