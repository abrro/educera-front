import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup;
  submitted = false;

  constructor(private authenticationService : AuthenticationService,
    private formBuilder: FormBuilder, private router : Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : ['', [Validators.email, Validators.required]],
      password : ['', [Validators.required]],
    })
  }

  get f(){
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if(this.loginForm.invalid) {
      return;
    }
    this.authenticationService.login(
      this.f['email'].value,
      this.f['password'].value
    ).subscribe({
      next: (res) => {
      if(res.status == 200){
          localStorage.setItem("jwt", res.body.token);
        }
      },
      error : (error) => {
        window.alert(error);
      },
      complete : () => {
        this.router.navigate(["courses"]);
      }
     })
  }
}
