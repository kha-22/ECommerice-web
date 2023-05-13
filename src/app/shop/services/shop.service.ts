import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from 'src/app/shared/models/brand';
import { IPagination, Pagination } from 'src/app/shared/models/pagination';
import { IType } from 'src/app/shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { IProduct } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { of, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.baseUrl;
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();
  productCache = new Map();

  constructor(private http: HttpClient) {}

  getProducts(useCache: boolean) {
    // if(useCache === false){
    //    this.productCache = new Map();
    // }

    // if(this.productCache.size > 0 && useCache === true){
    //   if(this.productCache.has(Object.values(this.shopParams).join('-'))){
    //     this.pagination.data = this.productCache.get(Object.values(this.shopParams).join('-'));
    //     return of(this.pagination);
    //   }
    // }

    let params = new HttpParams();

    // if(this.shopParams.brandId != 0){
    //   params = params.append('brandId',this.shopParams.brandId.toString());
    // }
    if (this.shopParams.categoryId != 0) {
      params = params.set('categoryId', this.shopParams.categoryId.toString());
    }
    if (this.shopParams.search) {
      params = params.set('search', this.shopParams.search);
    }
    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());

    return this.http
      .get<IPagination>(this.baseUrl + 'product/getProducts', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          //this.products = [...this.products, ...response.body.data];
          //this.productCache.set(Object.values(this.shopParams).join('-'), response.body.data);
          this.pagination = response.body;
          return this.pagination;
        })
      );
  }
  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number) {
    let product: IProduct;
    this.productCache.forEach((products: IProduct[]) => {
      product = products.find((p) => p.id === id);
    });

    if (product) return of(product);

    return this.http.get<IProduct>(this.baseUrl + 'product/getProduct/' + id);
  }

  getAllCategories() {
    if (this.brands.length > 0) {
      return of(this.brands);
    }

    return this.http
      .get<IBrand[]>(this.baseUrl + 'Category/getAllCategories')
      .pipe(
        map((response) => {
          this.brands = response;
          return response;
        })
      );
  }

  getTypes() {
    if (this.types.length > 0) {
      return of(this.types);
    }

    return this.http.get<IType[]>(this.baseUrl + 'product/getTypes').pipe(
      map((response) => {
        this.types = response;
        return response;
      })
    );
  }

  getLatestProducts(): any {
    return this.http.get(this.baseUrl + 'Product/getLatestProducts');
  }

  getTopProductSales(): any {
    return this.http.get(this.baseUrl + 'Product/getTopProductSales');
  }

  checkProductQtyAva(product: IProduct, qtyReq: number): any {
    return this.http.get(
      this.baseUrl +
        'Product/checkProductQtyAva?productId=' +
        product.id +
        '&qtyReq=' +
        qtyReq
    );
  }
}
