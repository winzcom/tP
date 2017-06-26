import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 

  }

  ngOnInit() {
    this.setUpForm();
  }

  setUpForm() {
    this.loginForm = this.fb.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  login(login: FormGroup) {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then((authenticated) =>{
      if(authenticated) {
        this.router.navigate([''])
      } 
    }).catch(err => console.log(err) );
  }

  loginWith(provider) {
    this.authService.loginWith(provider).then((authenticated)=>{
      if(authenticated) {
        this.router.navigate(['/']);
      } else {
  
      }
    }).catch()
  }

  loginWithFacebook() {

  }

}
