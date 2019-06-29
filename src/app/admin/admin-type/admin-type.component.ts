import { Component, OnInit } from '@angular/core';
import { Type } from '../../home-page/product/product';
import { AdminService } from '../admin.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  p: any

  ngOnInit() {
    this.adminService.getType().subscribe(data => this.typeList = data)
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
        $("#btn-close").click()
        this.router.navigateByUrl('/admintype')
        this.adminService.getType().subscribe(data => this.typeList = data)
        this.showAlert("Successful!", "success")
      },
      err => {
        console.log(err)
        $("#btn-close").click()
        this.showAlert("Failed!", "error")
      }
    )
  }

  deleteType(id: number){

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
          'Your type has been deleted.',
          'success'
        )
        //delete
        this.adminService.deleteType(id).subscribe(
          (res) => {
            this.router.navigateByUrl("/admintype")
            this.adminService.getType().subscribe(data => this.typeList = data);
          },
          err => {
            console.log(err)
            this.showAlert("Failed!", "error")
          }
        )
      }
    })
  }

  updateType(type: Type) {
    if (!type.typeName) {
      type.typeName = "NULL";
    } 

    this.adminService.updateType(type).subscribe(
      (res) => {
        $("#btn-close").click()
        this.showAlert("Successful!", "success")
        this.router.navigateByUrl("/admintype")
        this.adminService.getType().subscribe(data => this.typeList = data);
      },
      err => {
        console.log(err)
        $("#btn-close").click()
        this.showAlert("Failed!", "error")
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
