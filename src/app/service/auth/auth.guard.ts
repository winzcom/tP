import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service'

@Injectable() 
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        let url = state.url;
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
}