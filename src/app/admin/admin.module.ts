import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminShoesComponent } from './admin-shoes/admin-shoes.component';
import { StringfilterPipe } from './admin-shoes/stringfilter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { AdminTypeComponent } from './admin-type/admin-type.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdminSizeComponent } from './admin-size/admin-size.component';
import { StringFilterPipe } from './admin-size/string-filter.pipe';

const routes: Routes = [

];

@NgModule({
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    AdminShoesComponent,
    StringfilterPipe,
    AdminTypeComponent,
    AdminSizeComponent,
    StringFilterPipe
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    NgSelectModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AdminModule { }
