import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/services/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder, IOrderToCreate } from 'src/app/shared/models/order';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submitOrder() {
    debugger;
    if (this.checkoutForm.invalid) {
      this.toaster.error('Please check invalid data');
      this.checkoutForm.get('paymentForm').setValidators([Validators.required]);
      this.checkoutForm.get('paymentForm').updateValueAndValidity();
      return;
    }

    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);

    this.checkoutService.createOrder(orderToCreate).subscribe(
      (order: IOrder) => {
        this.basketService.deleteLocalBasket();
        this.toaster.success('Order submitted successfully');
        console.log(order);

        const navExtras: NavigationExtras = { state: order };
        this.router.navigate(['checkout/success'], navExtras);
      },
      (err) => {
        console.log(err);
        this.toaster.error(err.message);
      }
    );
  }

  getOrderToCreate(basket: IBasket) {
    let orderItems = this.basketService.getCurrentBasketValue().items;
    orderItems.forEach((element: any) => {
      element.total = element.price * element.quantity;
    });

    return {
      orderItems: orderItems,
    };
  }
}
