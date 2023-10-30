import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  

  private readonly baseUrl = "http://localhost:8080"

  jwt : string | null = '';

  userEmail : string | null = '';

  userRole : string | null = '';

  constructor(private httpClient : HttpClient) { }

  login(email : string, password : string) : Observable<HttpResponse<any>>{
    return this.httpClient.post<Map<string, string>>(`${this.baseUrl}/users/login`,
      {
        email : email,
        password : password
      },
      {observe : "response"}
      );
  }

  getToken() {
    this.jwt = localStorage.getItem("jwt");
    return this.jwt;
  }
  
  isLoggedIn() {
    return localStorage.getItem('jwt') != null;
  }

  logout() {
    localStorage.removeItem("jwt");
    this.jwt = null;
    this.userEmail = null;
    this.userRole = null;
  }

  getUserEmail(){
    this.jwt = localStorage.getItem('jwt');
    if(this.jwt){
      const payload = JSON.parse(atob(this.jwt.split('.')[1]));
      this.userEmail = payload.sub;
      return this.userEmail;
    }else{
      return this.userEmail;
    }
  }

  getUserRole(){
    this.jwt = localStorage.getItem('jwt');
    if(this.jwt){
      const payload = JSON.parse(atob(this.jwt.split('.')[1]));
      this.userRole = payload.authorities[0].authority;
      return this.userRole;
    }else{
      return this.userRole;
    }
  }


}
