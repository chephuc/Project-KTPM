import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../navbar/category'
import { AdminService } from './admin.service'
import { AuthenticationService } from '../authentication.service';
import { AuthGuardService } from '../auth-guard.service'
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

  ngOnInit() {
    this.adminService.getCategory().subscribe(data => this.categoryList = data)
    
    console.log("user",this.auth.getUserDetails().UsersName)
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
        this.router.navigateByUrl('/admincategory')
        this.adminService.getCategory().subscribe(data => this.categoryList = data)
        alert("Success!")
      },
      err => {
        console.log(err)
        alert("Failed!")
      }
    )
  }
  deleteCategory(id: number){
    this.adminService.deleteCategory(id).subscribe(
      (res) => {
        this.router.navigateByUrl("/admincategory")
        this.adminService.getCategory().subscribe(data => this.categoryList = data);
        alert("Success!")
      },
      err => {
        console.log(err)
        alert("Failed!")
      }
    )
  }

  updateCategory(category: Category) {
    if (!category.CategoryName) {
      category.CategoryName = "NULL";
    } 

    this.adminService.updateCategory(category).subscribe(
      (res) => {
        alert("Success!")
        this.router.navigateByUrl("/admincategory")
        this.adminService.getCategory().subscribe(data => this.categoryList = data);
      },
      err => {
        console.log(err)
        alert("Failed!")
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
