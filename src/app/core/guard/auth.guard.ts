import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let access_token= localStorage.getItem('access_token');

    if (access_token) {

      let decodedAccessToken = jwtDecode(access_token);
      const userRole = (decodedAccessToken as any).role[0].authority;
      if (route.data['role'] && route.data['role'] != userRole) {
        this.router.navigate(['/authentication/signin']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/main/home']);
    //  this.router.navigate(['/home']);
    return false;
  }
}
