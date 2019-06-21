import { Component, OnInit } from '@angular/core';
import { Type } from '../../home-page/product/product';
import { AdminService } from '../admin.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-type',
  templateUrl: './admin-type.component.html',
  styleUrls: ['./admin-type.component.css'],
  providers: [AdminService]
})
export class AdminTypeComponent implements OnInit {

  constructor(private adminService: AdminService, private router:Router) { 

  }
  typeList: Type[];
  newType: any ={
    typeName: '',
  }
  isAddForm: boolean;
  typeBeforeUpdate: any;

  ngOnInit() {
    this.adminService.getType().subscribe(data => this.typeList = data)
  }

  pushDataToForm(type: Type) {
    this.isAddForm = false;
    this.newType = JSON.parse(JSON.stringify(type));
    this.typeBeforeUpdate = JSON.parse(JSON.stringify(this.newType));
  }
  onOpenAddFormClick() {
    this.isAddForm = true;

    this.newType = {
      typeName: "",
    };
  }
  addType(type: Type) {
    this.adminService.addType(type).subscribe(
      (res) => {
        this.router.navigateByUrl('/admintype')
        this.adminService.getType().subscribe(data => this.typeList = data)
        alert("Success!")
      },
      err => {
        console.log(err)
        alert("Failed!")
      }
    )
  }

  deleteType(id: number){
    this.adminService.deleteType(id).subscribe(
      (res) => {
        this.router.navigateByUrl("/admintype")
        this.adminService.getType().subscribe(data => this.typeList = data);
        alert("Success!")
      },
      err => {
        console.log(err)
        alert("Failed!")
      }
    )
  }

  updateType(type: Type) {
    if (!type.typeName) {
      type.typeName = "NULL";
    } 

    this.adminService.updateType(type).subscribe(
      (res) => {
        alert("Success!")
        this.router.navigateByUrl("/admintype")
        this.adminService.getType().subscribe(data => this.typeList = data);
      },
      err => {
        console.log(err)
        alert("Failed!")
      })
  }
  onSubmit(type: Type) {
    if (this.isAddForm) {
      this.addType(type)
    } else {
      this.updateType(type)
    }
  }
}
