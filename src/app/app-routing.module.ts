import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { AboutComponent } from './about/about.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginStatusComponent } from './login-status/login-status.component';
import { ProductComponent } from './home-page/product/product.component';
import { BestSellerComponent } from './home-page/best-seller/best-seller.component';
import { ContractComponent } from './contract/contract.component';
import { CartComponent } from './cart/cart.component';
import { CateProductComponent } from './cate-product/cate-product.component';
import { AdminComponent } from './admin/admin.component';
import { AdminShoesComponent } from './admin/admin-shoes/admin-shoes.component';
import { AdminTypeComponent } from './admin/admin-type/admin-type.component';
import { AdminSizeComponent } from './admin/admin-size/admin-size.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/homepage' },
  { path: 'homepage', component: HomePageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contract', component: ContractComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'status',component:LoginStatusComponent},
  { path: 'product',component:ProductComponent},
  { path: 'best-seller',component:BestSellerComponent},
  { path: 'cate-product',component:CateProductComponent},
  { path: 'cate-product/:id',component:CateProductComponent},
  { path: 'admincategory',component:AdminComponent},
  { path: 'adminshoes',component:AdminShoesComponent},
  { path: 'admintype',component:AdminTypeComponent},
  { path: 'adminsize',component: AdminSizeComponent},
  { path: 'adminuser',component: AdminUserComponent},
  { path: 'adminorder',component: AdminOrderComponent},
  // { path: 'binding', component: DemoBindingComponent, canActivate:[AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: '/homepage' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
