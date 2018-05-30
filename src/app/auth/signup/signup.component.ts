import { User } from './../../shared/entities/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { matchingPassword } from '../shared/password.validator';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../profile/shared/user.service';
import { FileStorageService } from '../../shared/storage/file-storage.service';
import { getFile } from 'ts-node';
import { getSourceFile } from 'tslint';
import { readFile } from 'fs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  profileForm: FormGroup;
  user: User;
  loading: boolean;
  signedUp: boolean;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private route: Router,
    private fileService: FileStorageService
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatedPass: ['', [Validators.required, matchingPassword()]]
    });

    this.profileForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      address: '',
      contactEmail: ''
    });
  }

  ngOnInit() {
    this.loading = false;
  }

  signUp() {
    const signupModel = this.signupForm.value as User;
    this.authService.signUpUser(signupModel);
    this.signedUp = true;
  }

  saveUser() {
    this.loading = true;
    this.user = new User();
    const profileModel = this.profileForm.value as User;
    this.user = profileModel;
    this.userService.createUserProfile(this.user);
      this.route.navigateByUrl('/home');
      this.loading = true;
      this.snack.open('user saved', null, {
        duration: 3000
      });
    }


  formControlError(formControl: string, errorCode: string, preRequired?: string[]): boolean {
    if (preRequired && preRequired.length > 0) {
      for (let i = 0; i < preRequired.length; i++) {
        if (this.signupForm.get(formControl).hasError(preRequired[i])) {
          return false;
        }
      }
    }
    return this.signupForm.get(formControl).hasError(errorCode);
  }

  fcErr(fc: string, ec: string, pre?: string[]): boolean {
    if (pre && pre.length > 0) {
      for (let i = 0; i < pre.length; i++) {
        if (this.profileForm.get(fc).hasError(pre[i])) {
          return false;
        }
      }
    }
    return this.profileForm.get(fc).hasError(ec);
  }
}
