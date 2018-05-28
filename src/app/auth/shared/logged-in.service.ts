import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggedInService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().map(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigateByUrl('home');
      }
      return !isLoggedIn;
    });
  }
}
