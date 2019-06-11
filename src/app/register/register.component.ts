import { Component, OnInit } from '@angular/core';
import { UserService } from './User.service';
import { AuthenticationService, TokenPayload} from '../authentication.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './User';
import { MustMatch } from './validation';
import { Router } from '@angular/router';


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
    UsersPhoneNum: 0
  }
  constructor(private fb: FormBuilder, private service: UserService, private router:Router,private auth: AuthenticationService) { }
  registerForm:FormGroup;

  register(){
    this.auth.register(this.credentials).subscribe(
      () =>{
        this.router.navigateByUrl('/signin')
      },
      err =>{
        console.log(err);
        alert("Failed")
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
