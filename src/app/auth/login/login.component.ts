import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../shared/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private route: Router,
    private fb: FormBuilder,
    private snack: MatSnackBar)
  {
    this.loginForm =
      fb.group({
      email: '',
      password: ''
    });
  }

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    const loginModel = this.loginForm.value;
    this.authService
      .login(loginModel.email, loginModel.password)
      .then(() => {
        this.route.navigateByUrl('/home');
        this.snack.open('Logged in!', null, {
          duration: 4000
        });
      })
      .catch(error => {
        console.log(error);
        this.snack.open(error, null, {
          duration: 4000
        });
      });
  }
  signUp() {
    this.route.navigateByUrl('/signup');
  }
}
