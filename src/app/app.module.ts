import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HomePageModule } from './home-page/home-page.module';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { UserService } from './register/User.service';
import { LoginStatusComponent } from './login-status/login-status.component';
import { Router, RouterModule } from '@angular/router';
import { ContractComponent } from './contract/contract.component';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { CateProductModule } from './cate-product/cate-product.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductService } from './home-page/best-seller/best-seller.service';
import { CartService } from './cart/cart.service';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    ProductDetailComponent,
    RegisterComponent,
    SigninComponent,
    LoginStatusComponent,
    ContractComponent,
    CartComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomePageModule,
    AdminModule,
    CateProductModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ],

  providers: [UserService, ProductService, CartService, AuthenticationService,AuthGuardService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
