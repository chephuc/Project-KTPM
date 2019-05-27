import { Component, OnInit } from '@angular/core';
import { UserService } from '../register/User.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  signinForm: FormGroup;


  ngOnInit() {
    this.signinForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onSubmit(){
    //alert(this.userService.redirectUrl);
    alert(this.signinForm.controls.username.value);

    let user = (this.userService.login(this.signinForm.controls.username.value,this.signinForm.controls.password.value));

    if(user){
      localStorage.setItem('currentUser','true');
      if(this.userService.redirectUrl != "")
        this.router.navigate([this.userService.redirectUrl]);
      else{
        this.router.navigate(["homepage"]);
        location.reload();
      }
    }
  }

  get f() { return this.signinForm.controls; }
  
}
