import { Component, OnInit } from '@angular/core';
import { UserService } from './User.service';
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

  constructor(private fb: FormBuilder, private service: UserService, private router:Router) { }
  registerForm:FormGroup;

  ngOnInit() {
    this.registerForm = this.fb.group({
      username:['',Validators.required], 
      email:['',[Validators.email, Validators.required]],
      password:['', Validators.required],
      confirmpassword:['', Validators.required]
    },{
      validator: MustMatch('password', 'confirmpassword')
    });
  }
  get f() { return this.registerForm.controls; }

  resUser:User;
  onSubmit(){			
    if (this.registerForm.invalid)
    {
      return;
    }		
    let user = new User();
    user.username = this.registerForm.controls["username"].value;
    user.email = this.registerForm.controls["email"].value;
    user.password = this.registerForm.controls["password"].value;
    
    this.service.insertUser(user).subscribe(data=>this.resUser = data);
    if(user)
      {
        this.router.navigate(["signin"]);
      }
  }
}
