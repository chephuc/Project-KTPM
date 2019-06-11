import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  constructor(public auth:AuthenticationService, public authguard: AuthGuardService){
    
  }
}
