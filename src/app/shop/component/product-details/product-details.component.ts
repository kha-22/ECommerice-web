import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/services/basket.service';
import { IBasketItem } from 'src/app/shared/models/basket';
import { IProduct } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;
  imageUrl = environment.imagesUrl + 'Images/Products/';
  currentRate = 3;

  constructor(
    private shopService: ShopService,
    private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService,
    private toaster: ToastrService
  ) {
    this.bcService.set('@productDetails', '');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.shopService
      .getProduct(+this.activateRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (response) => {
          this.product = response;
          this.bcService.set('@productDetails', this.product.name);
        },
        (err) => {
          console.log(err.error);
        },
        () => {
          //final
        }
      );
  }

  addItemToBasket() {
    debugger;
    this.shopService.checkProductQtyAva(this.product, this.quantity).subscribe(
      (response: any) => {
        debugger;
        setTimeout(() => {
          if (
            response.message == 'Quantity not available in stock' &&
            response.status == false
          ) {
            this.toaster.error('Quantity not available in stock');
          }
          if (
            response.message == 'Quantity request greater than in stock' &&
            response.status == false
          ) {
            this.toaster.error('Quantity request greater than in stock');
          }
          if (
            response.message == 'Quantity available' &&
            response.status == true
          ) {
            this.basketService.addItemToBasket(this.product, this.quantity);
            this.toaster.success('Product added in your basket');
            //this.cardService.addToCart(this.product);
          }
        }, 50);
      },
      (err: any) => {
        setTimeout(() => {
          this.toaster.error('Server response error');
        }, 50);
      },
      () => {
        //final
      }
    );
  }

  // addItemToBasket(){
  //   this.basketService.addItemToBasket(this.product, this.quantity);
  //   this.toaster.success("Product added in your basket");
  // }

  incrementQuantity(item: IBasketItem) {
    this.quantity++;
  }

  decrementQuantity(item: IBasketItem) {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
