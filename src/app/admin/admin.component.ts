import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../navbar/category'
import { AdminService } from './admin.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService]
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService, private router:Router) {

  }
  categoryList: Category[]

  newCategory: any ={
    categoryName: '',
  }

  ngOnInit() {
    this.adminService.getCategory().subscribe(data => this.categoryList = data)
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
}
