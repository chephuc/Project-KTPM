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


  ngOnInit() {
    this.adminService.getType().subscribe(data => this.typeList = data)
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
}
