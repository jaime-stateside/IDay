import { Component } from '@angular/core';

import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userLoggued;
  constructor(public afAuth: AuthServiceService) { 
    this.afAuth.suscribe().subscribe(user => {
      if (!user) {
        this.userLoggued = null;    
        return;
      }
      this.userLoggued = user;
    });
  }

  login() {
    this.afAuth.login();
  }

  logout() {
    this.afAuth.logout();
  }
}
