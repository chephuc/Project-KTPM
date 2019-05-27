import { Component, OnInit } from '@angular/core';
import { UserService } from '../register/User.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
  providers: [UserService]
})
export class LoginStatusComponent implements OnInit {

  isLogin:boolean
  constructor(private authService:UserService, private router:Router) { 
    if(localStorage.getItem('currentUser') != null)
      this.isLogin = true;
    else
      this.isLogin = false;
  }

  login(){
    this.router.navigate(['signin']);
  }

  logout(){
    this.authService.logout();
    this.isLogin = false;
    //location.reload();
    this.router.navigate([""]);
  }

  ngOnInit() {
    
  }

}
