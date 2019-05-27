import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ListCateProductComponent } from './list-cate-product/list-cate-product.component';
import { CateProductComponent } from './cate-product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StringfilterPipe } from './stringfilter.pipe';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/homepage' },
  { path: 'cate-product', component: CateProductComponent },
  { path: 'cate-product/:id', component: CateProductComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/homepage' }
];

@NgModule({
  declarations: [
    ListCateProductComponent,
    CateProductComponent,
    StringfilterPipe,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class CateProductModule { }
