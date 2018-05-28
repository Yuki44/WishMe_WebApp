import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.isAuthenticated().map(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigateByUrl('login');
      }
      return isLoggedIn;
    });
  }
}
