import { Component, OnInit } from '@angular/core';
import { UserService } from '../register/User.service';
import { AuthenticationService, TokenPayload}  from '../authentication.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  credentials: TokenPayload = {
    idUsers: 0,
    UsersName: '',
    UsersPassword: '',
    UsersEmail: '',
    UsersAddress: '',
    UsersPhoneNum: 0,
    UsersPermission: '',
  }
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router,private auth: AuthenticationService) { }
  signinForm: FormGroup;

  login(){
    this.auth.login(this.credentials).subscribe(
      () =>{
        
      },
      err =>{
        console.log(err)
      }
    )
  }

  ngOnInit() {
    this.signinForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }
  
  onSubmit(){
    //alert(this.userService.redirectUrl);
    // alert(this.signinForm.controls.username.value);

    // let user = (this.userService.login(this.signinForm.controls.username.value,this.signinForm.controls.password.value));

    // if(user){
    //   localStorage.setItem('currentUser','true');
    //   if(this.userService.redirectUrl != "")
    //     this.router.navigate([this.userService.redirectUrl]);
    //   else{
    //     this.router.navigate(["homepage"]);
    //     location.reload();
    //   }
    // }
  }

  get f() { return this.signinForm.controls; }
  
}
