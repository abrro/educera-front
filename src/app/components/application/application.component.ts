import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent {


  constructor(private AuthenticationService : AuthenticationService) {}

  logout() {
    return this.AuthenticationService.logout();

  }
  isLoggedIn() {
    return this.AuthenticationService.isLoggedIn();
  }

  getUserRole() {
    return this.AuthenticationService.getUserRole();
  }


}
