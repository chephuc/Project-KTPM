import { Component, OnInit } from '@angular/core';
import { Detail, Size } from '../../home-page/product/product';
import { AdminService } from '../admin.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-size',
  templateUrl: './admin-size.component.html',
  styleUrls: ['./admin-size.component.css'],
  providers: [AdminService]
})
export class AdminSizeComponent implements OnInit {

  constructor(private adminService: AdminService, private router:Router) { }

  detailList: Detail[];
  sizeList: Size[];
  newSize: any = {
    idShoes: "",
    idSize: ""
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
  ngOnInit() {
    this.adminService.getDetail().subscribe(data =>this.detailList = data);
    this.adminService.getAllSize().subscribe(data =>this.sizeList = data)
  }
  addDetail(detail: Detail) {

    this.adminService.addDetail(detail).subscribe(
      (res) => {
        $("#btn-close").click()
        this.router.navigateByUrl('/adminsize')
        this.adminService.getDetail().subscribe(data => this.detailList = data)
        this.showAlert("Successful!", "success")
      },
      err => {
        console.log(err)
        $("#btn-close").click()
        this.showAlert("Failed!", "error")
      }
    )
  }
}
