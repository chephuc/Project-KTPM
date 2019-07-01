import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { AdminService } from '../admin.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
  providers: [AdminService]
})
export class AdminUserComponent implements OnInit {

  constructor(private adminService: AdminService, private router:Router) { }

  userList: User[];

  ngOnInit() {
    this.adminService.getUser().subscribe(data => this.userList = data)
  }

}
