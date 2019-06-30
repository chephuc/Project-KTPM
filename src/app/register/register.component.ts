import { Component, OnInit } from '@angular/core';
import { UserService } from './User.service';
import { AuthenticationService, TokenPayload} from '../authentication.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './User';
import { MustMatch } from './validation';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {
  credentials: TokenPayload = {
    idUsers: 0,
    UsersName: '',
    UsersPassword: '',
    UsersEmail: '',
    UsersAddress: '',
    UsersPhoneNum: 0,
    UsersPermission: ''
  }
  constructor(private fb: FormBuilder, private service: UserService, private router:Router,private auth: AuthenticationService) { }
  registerForm:FormGroup;
  
  
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
  register(){
    this.auth.register(this.credentials).subscribe(
      () =>{
        this.showAlert("Successful!", "success")
        this.router.navigateByUrl('/signin')
        
      },
      err =>{
        console.log(err);
        this.showAlert("Failed!", "error")
      }
    )
  }
  ngOnInit() {
    this.registerForm = this.fb.group({
      username:['',Validators.required], 
      email:['',[Validators.email, Validators.required]],
      address:['', [Validators.required]],
      phonenum: ['',[Validators.required]],
      password:['', Validators.required],
      confirmpassword:['', Validators.required]
    },{
      validator: MustMatch('password', 'confirmpassword')
    });
  }
  get f() { return this.registerForm.controls; }  
}
