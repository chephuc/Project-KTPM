import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../home-page/product/product.service';
import { Product, Type } from '../../home-page/product/product';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../navbar/category';
import * as $ from "jquery";
import * as bootstrap from "bootstrap"

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
    idShoes: "",
    ShoesName: "",
    ShoesColor: "",
    ShoesPrice: "",
    ShoesImg: "",
    idcategory: "",
    idtype: "",
  }

  categoryList: Category[];
  typeList: Type[];
  isAddForm: boolean;
  shoesBeforeUpdate: any;

  ngOnInit() {
    this._service.getProducts().subscribe(data => this.productList = data);
    this.adminService.getCategory().subscribe(data => this.categoryList = data);
    this.adminService.getType().subscribe(data => this.typeList = data);
  }

  insertDataToForm(shoes: Product) {
    this.isAddForm = false;
    this.newProduct = JSON.parse(JSON.stringify(shoes));
    $("#wizardPicturePreview").attr("src", shoes.ShoesImg);
    this.shoesBeforeUpdate = JSON.parse(JSON.stringify(this.newProduct));
  }

  onOpenAddFormClick() {
    this.isAddForm = true;

    this.newProduct = {
      ShoesName: "",
      ShoesColor: "",
      ShoesPrice: "",
      ShoesImg: "",
      idcategory: "",
      idtype: ""
    };
    $("#wizardPicturePreview").attr("src", '../../assets/images/image-select-default.png');
  }

  files: any[];
  onFileChangeEvent(event) {
    this.files = event.target.files[0];
    console.log(this.files);
  }

  add(shoes: Product, photo: File) {
    if (!shoes.idtype) {
      shoes.idtype = "NULL";
    } if (!shoes.idcategory) {
      shoes.idcategory = "NULL"
    }

    let file = new FormData();
    file.append('photo', photo);
    this.adminService.uploadAvatarImage(file).subscribe(
      (res) => {
        shoes.ShoesImg = res.path;
        console.log(res.path)
        console.log(shoes)
        this.adminService.addShoes(shoes).subscribe(
          (res1) => {
            alert("Success!")
            window.location.replace('/adminshoes');
            this._service.getProducts().subscribe(data => this.productList = data);
          },
          err => {
            console.log(err)
            alert("Failed!")
          })
      },
      err => {
        console.log(err)
        alert("Failed!")
      })
  }

  delete(id: number) {
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

  update(shoes: Product, photo: File) {
    if (!shoes.idtype) {
      shoes.idtype = "NULL";
    } if (!shoes.idcategory) {
      shoes.idcategory = "NULL"
    }

    let file = new FormData();
    file.append('photo', photo);
    this.adminService.updateShoes(shoes).subscribe(
      (res) => {
        alert("Success!")
        this.router.navigateByUrl("/adminshoes")
        this._service.getProducts().subscribe(data => this.productList = data);
      },
      err => {
        console.log(err)
        alert("Failed!")
      })
  }

  updateSubmitImage(shoes: Product, photo: File) {
    let file = new FormData();
    file.append('photo', photo);
    this.adminService.uploadAvatarImage(file).subscribe(
      (res) => {
        shoes.ShoesImg = res.path;
        console.log(res.path)
        this.update(shoes, photo)
      },
      err => {
        console.log(err)
        alert("Failed!")
      })
  }

  onSubmit(shoes: Product, photo: File) {
    if (this.isAddForm) {
      this.add(shoes, photo)
    } else {
      if (this.shoesBeforeUpdate.ShoesImg !== shoes.ShoesImg) {
        this.updateSubmitImage(shoes, photo)
      } else {
        this.update(shoes, photo)
      }
    }
  }
}
