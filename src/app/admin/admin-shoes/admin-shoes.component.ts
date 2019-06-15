import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../home-page/product/product.service';
import { Product, Type } from '../../home-page/product/product';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../navbar/category';

@Component({
  selector: 'app-admin-shoes',
  templateUrl: './admin-shoes.component.html',
  styleUrls: ['./admin-shoes.component.css'],
  providers: [ProductService]
})
export class AdminShoesComponent implements OnInit {

  constructor(private _service: ProductService, private adminService: AdminService, private router: Router, private route: ActivatedRoute, ) { }
  productList: Product[];
  newProduct: any = {
    ShoesName : "",
    ShoesColor : "",
    ShoesPrice : "",
    ShoesImg : "",
    idcategory : "",
    idtype : ""
  }

  categoryList: Category[];
  typeList: Type[];

  ngOnInit() {
    this._service.getProducts().subscribe(data => this.productList = data);
    this.adminService.getCategory().subscribe(data => {this.categoryList = data; console.log(data)});
    this.adminService.getType().subscribe(data => this.typeList = data);
  }

  add(shoes: Product) {
    if(!shoes.idtype){
      shoes.idtype = "NULL";
    }if(!shoes.idcategory){
      shoes.idcategory = "NULL"
    }

    this.adminService.addShoes(shoes).subscribe(
      (res) => {
        // this.router.navigateByUrl("/admin")
        window.location.replace('/adminshoes');
        this._service.getProducts().subscribe(data => this.productList = data);
        alert("Success!")
      },
      err => {
        console.log(err)
        alert("Failed!")
      }
    )
  }

  delete(id: number){
    this.adminService.deteleProduct(id).subscribe(
      (res) => {
        this.router.navigateByUrl("/adminshoes")
        this._service.getProducts().subscribe(data => this.productList = data);
        alert("Success!")
      },
      err => {
        console.log(err)
        alert("Failed!")
      }
    )
  }
}
