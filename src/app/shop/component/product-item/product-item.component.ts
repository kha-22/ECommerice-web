import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/services/basket.service';
import { CardService } from 'src/app/basket/services/card.service';
import { IProduct } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: IProduct;
  imageURL = environment.imagesUrl + 'Images/Products/';

  constructor(
    private basketService: BasketService,
    private cardService: CardService,
    private toaster: ToastrService,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    console.log(this.product);
  }

  addItemToBasket() {
    debugger;
    this.shopService.checkProductQtyAva(this.product, 1).subscribe(
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
            this.basketService.addItemToBasket(this.product);
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

  // getProductSearch(){
  //   this.shopService.checkProductQtyAva(this.product)
  //     .subscribe((response: any) => {
  //       setTimeout(() => {
  //         if(response.message == "" && response.status == false){
  //           this.toaster.error("Quantity not available in stock");
  //         }
  //         if(response.message == "Quantity request greater than in stock" && response.status == false){
  //           this.toaster.error("Quantity request greater than in stock");
  //         }
  //         if(response.message == "Quantity available" && response.status == true){
  //           this.toaster.error("Quantity request greater than in stock");

  //           this.basketService.addItemToBasket(this.product);
  //           this.toaster.success("Product added in your basket");
  //           //this.cardService.addToCart(this.product);
  //         }
  //       }, 50);
  //     }, (err: any) => {
  //       setTimeout(() => {
  //         this.toaster.error("Server response error");
  //       }, 50);
  //     }, () => {
  //       //final
  //     });
  // }
}
