import { Component, OnInit } from '@angular/core';
import { UserService } from '../register/User.service';
import { AuthenticationService, TokenPayload}  from '../authentication.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  login(){
    this.auth.login(this.credentials).subscribe(
      () =>{
        this.showAlert("Successful!", "success")

      },
      err =>{
        this.showAlert("Failed!", "error")
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
