import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './home-page.component';
import { ProductComponent } from './product/product.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { SaleproComponent } from './salepro/salepro.component';
import { SliderComponent } from './slider/slider.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/homepage' },
  { path: 'homepage', component: HomePageComponent },
  { path: 'product', component: ProductComponent },
  { path: 'best-seller', component: BestSellerComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/homepage' }
];

@NgModule({
  declarations: [
    HomePageComponent,
    ProductComponent,
    BestSellerComponent,
    SaleproComponent,
    SliderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class HomePageModule { }
