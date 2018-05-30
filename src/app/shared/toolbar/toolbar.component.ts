import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/shared/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(
    private authService: AuthService,
    private route: Router,
    private snack: MatSnackBar
  ) {
    this.isLoggedIn = false;
  }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(isLogged => {
      this.isLoggedIn = isLogged;
    });
  }

  // Route to login
  login() {
    this.route.navigateByUrl('/login');
  }

  // Route to home
  home() {
    this.route.navigateByUrl('/');
  }

  logout() {
    this.authService
      .logout()
      .then(() => this.route.navigateByUrl('/login'))
      .then(() =>
        this.snack.open('You are now logged out!', null, {
          duration: 4000
        })
      )
      .catch(error =>
        this.snack.open(error, null, {
          duration: 4000
        })
      );
  }
}
