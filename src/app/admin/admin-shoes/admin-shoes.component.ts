import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../home-page/product/product.service';
import { Product, Type, Size } from '../../home-page/product/product';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../navbar/category';
import Swal from 'sweetalert2';
import * as $ from "jquery";
import * as bootstrap from "bootstrap"

@Component({
  selector: 'app-admin-shoes',
  templateUrl: './admin-shoes.component.html',
  styleUrls: ['./admin-shoes.component.css'],
  providers: [ProductService]
})
export class AdminShoesComponent implements OnInit {

  constructor(private _service: ProductService, private adminService: AdminService, private router: Router, private route: ActivatedRoute) { }
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
  productSize: Size[];
  isAddForm: boolean;
  shoesBeforeUpdate: any;
  checksize: boolean;
  sizeArr: string = "";
  p: any;
  search: any

  ngOnInit() {
    this._service.getProducts().subscribe(data => this.productList = data);
    this.adminService.getCategory().subscribe(data => this.categoryList = data);
    this.adminService.getType().subscribe(data => this.typeList = data);
  }

  showAlert(text, type) {
    if (type === "success") {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: text,
        showConfirmButton: false,
        timer: 1000
      });
    }
    else if (type === "error") {
      Swal.fire({
        position: 'center',
        type: 'error',
        title: text,
        showConfirmButton: true,
      });
    }
  }

  insertDataToForm(shoes: Product, id: number) {
    this.checksize = true
    this.isAddForm = false;
    this.newProduct = JSON.parse(JSON.stringify(shoes));
    $("#wizardPicturePreview").attr("src", shoes.ShoesImg);
    this.shoesBeforeUpdate = JSON.parse(JSON.stringify(this.newProduct));

    this._service.getProductSize(id).subscribe(data =>{
      this.productSize = data;
      this.sizeArr = "";
      for(let pro of this.productSize){
        this.sizeArr += pro.Size + " ";
      } 
    })

    
  }

  onOpenAddFormClick() {
    this.checksize = false
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

  files: any;
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
            $("#btn-close").click()
            this.showAlert("Successful!", "success")
            this.router.navigateByUrl("/adminshoes")        
            this._service.getProducts().subscribe(data => this.productList = data);
          },
          err => {
            console.log(err)
            this.showAlert("Failed!", "error")
          })
      },
      err => {
        console.log(err)
        this.showAlert("Failed!", "error")
      })
  }

  delete(id: any) {
    this.adminService.deteleProduct(id).subscribe(
      (res) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Deleted!',
              'Your shoes has been deleted.',
              'success'
            )
            this.router.navigateByUrl("/adminshoes")
            this._service.getProducts().subscribe(data => this.productList = data);
          }
        })
        
      },
      err => {
        console.log(err)
        this.showAlert("Failed!", "error")
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
        $("#btn-close").click()
        this.showAlert("Successful!", "success")
        this.router.navigateByUrl("/adminshoes")
        this._service.getProducts().subscribe(data => this.productList = data);
      },
      err => {
        console.log(err)
        this.showAlert("Failed!", "error")
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
