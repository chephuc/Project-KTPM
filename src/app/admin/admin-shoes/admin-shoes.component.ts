import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../home-page/product/product.service';
import { Product } from '../../home-page/product/product';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-shoes',
  templateUrl: './admin-shoes.component.html',
  styleUrls: ['./admin-shoes.component.css'],
  providers: [ProductService]
})
export class AdminShoesComponent implements OnInit {

  constructor(private _service: ProductService, private adminService: AdminService, private router: Router) { }
  productList: Product[];

  ngOnInit() {
    this._service.getProducts().subscribe(data => this.productList = data);
  }

  add(shoes: Product) {
    this.adminService.addShoes(shoes).subscribe(
      (res) => {
        this.router.navigateByUrl('/adminshoes')
        alert("Success!")
      },
      err => {
        console.log(err)
        alert("Failed!")
      }
    )
  }

}
