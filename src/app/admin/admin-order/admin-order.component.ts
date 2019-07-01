import { Component, OnInit } from '@angular/core';
import { Order } from '../admin-user/User';
import { AdminService } from '../admin.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
  providers: [AdminService]
})
export class AdminOrderComponent implements OnInit {

  constructor(private adminService: AdminService, private router:Router) { }

  orderList: Order[];

  ngOnInit() {
    this.adminService.getOrder().subscribe(data => this.orderList = data)
  }

}
