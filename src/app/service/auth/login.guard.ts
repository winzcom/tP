import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/first';

@Injectable() 
export class LoginGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        let url = state.url; let canLoad = true;
        this.authService.redirectUrl = url;
        
        if(this.authService.getData() !== null) {
            this.router.navigate(['']);
            return false;
        } else return true;
    }
}