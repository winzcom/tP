import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  private isAuth:boolean;
  constructor(private authService: AuthService) { 
   
  }

  ngOnInit() {
     
    this.authService.auth$.subscribe((result) =>{
      this.isAuth = result
    })
  }

  logout() {
    this.authService.logout();
  }

}
