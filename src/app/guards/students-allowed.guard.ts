import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';
import { Location } from '@angular/common';

export const studentsAllowedGuard: CanActivateFn = (route, state) => {

  const authService : AuthenticationService = inject(AuthenticationService);
  const location: Location = inject(Location);
  if(authService.getUserRole() == "STUDENT") {
    return true;
  }else {
    window.alert("Not allowed to view this content as a student");
    location.back();
    return false;
  } 

};


