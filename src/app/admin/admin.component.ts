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

  ngOnInit() {
    this.adminService.getCategory().subscribe(data => this.categoryList = data)
  }

}
