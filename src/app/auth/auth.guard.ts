import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../register/User.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service: UserService, private router: Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let url = state.url;
    return this.checklogin(url);
  }
  checklogin(url:string):boolean{
    if(localStorage.getItem('currentUser') != null)
      return true;
    
    this.service.redirectUrl = url;

    this.router.navigate(["/signin"]);
    
    return false;
  }
}
