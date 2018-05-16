import { User } from './../../shared/entities/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { matchingPassword } from '../shared/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatedPass: ['', [Validators.required, matchingPassword()]]
    });
  }

  signup() {
    const model = this.signupForm.value as User;
    this.authService
      .signup(model)
      .then(user => {
          this.router.navigateByUrl('home').then(() => {
          this.snackBar.open('Signed up!', '', {
            duration: 2000
          });
        });
      })
      .catch(error => {
        /*
        this.snackBar.open(error.message, '', {
          duration: 5000
        });
        */
       console.log('ERROR:   ' + error);
      });
  }

  formControllError(
    formControl: string,
    errorCode: string,
    preRequired?: string[]
  ): boolean {
    if (preRequired && preRequired.length > 0) {
      for (let i = 0; i < preRequired.length; i++) {
        if (this.signupForm.get(formControl).hasError(preRequired[i])) {
          return false;
        }
      }
    }
    return this.signupForm.get(formControl).hasError(errorCode);
  }
}
