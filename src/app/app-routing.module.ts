import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './core/component/contactus/contactus.component';
import { NotFoundComponent } from './core/component/not-found/not-found.component';
import { ServerErrorComponent } from './core/component/server-error/server-error.component';
import { TestErrorComponent } from './core/component/test-error/test-error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/component/home/home.component';
import { ProductDetailsComponent } from './shop/component/product-details/product-details.component';
import { ShopComponent } from './shop/component/shop/shop.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: 'Home'}},
  {path: 'test-error', component: TestErrorComponent, data: {breadcrumb: 'Test Error'}},
  {path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'}},
  {path: 'contact-us', component: ContactusComponent, data: {breadcrumb: 'Contact Us'}},
  {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'}},
  {path: 'shop',loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule), data: {breadcrumb: 'Shop'}},
  {path: 'basket',loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule),data: {breadcrumb: 'basket'}},
 
  {path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule),data: {breadcrumb: 'checkout'}},

  {path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () => import('./order/order.module').then(mod => mod.OrderModule),data: {breadcrumb: 'orders'}},

  {path: 'account',loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule),data: {breadcrumb: {skip: true}}},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
