import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../navbar/category'
import { AdminService } from './admin.service'
import { AuthenticationService } from '../authentication.service';
import { AuthGuardService } from '../auth-guard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService]
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService, private router:Router,private authguard: AuthGuardService,private auth: AuthenticationService) {

  }
  categoryList: Category[]

  newCategory: any ={
    CategoryName: "",
  }
  isAddForm: boolean;
  categoryBeforeUpdate: any;
  p: any

  ngOnInit() {
    this.adminService.getCategory().subscribe(data => this.categoryList = data)
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

  pushDataToForm(category: Category) {
    this.isAddForm = false;
    this.newCategory = JSON.parse(JSON.stringify(category));
    this.categoryBeforeUpdate = JSON.parse(JSON.stringify(this.newCategory));
  }
 
  onOpenAddFormClick() {
    this.isAddForm = true;

    this.newCategory = {
      CategoryName: "",
    };
  }

  addCategory(category: Category) {
    this.adminService.addCategory(category).subscribe(
      (res) => {
        $("#btn-close").click()
        this.showAlert("Successful!", "success")
        this.router.navigateByUrl('/admincategory')
        this.adminService.getCategory().subscribe(data => this.categoryList = data)
      },
      err => {
        console.log(err)
        this.showAlert("Failed!", "error")
      }
    )
  }
  deleteCategory(id: number){
    this.adminService.deleteCategory(id).subscribe(
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
              'Your file has been deleted.',
              'success'
            )
            this.router.navigateByUrl("/admincategory")
            this.adminService.getCategory().subscribe(data => this.categoryList = data);
          }
        })
      },
      err => {
        console.log(err)
        this.showAlert("Failed!", "error")
      }
    )
  }

  updateCategory(category: Category) {
    if (!category.CategoryName) {
      category.CategoryName = "NULL";
    } 

    this.adminService.updateCategory(category).subscribe(
      (res) => {
        this.showAlert("Successful!", "success")
        this.router.navigateByUrl("/admincategory")
        this.adminService.getCategory().subscribe(data => this.categoryList = data);
      },
      err => {
        console.log(err)
        this.showAlert("Failed!", "error")
      })
  }
  onSubmit(category: Category) {
    if (this.isAddForm) {
      this.addCategory(category)
    } else {
      this.updateCategory(category)
    }
  }

}
