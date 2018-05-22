import { AddProfileComponent } from './../../profile/add-profile/add-profile.component';
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
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  userCreated: boolean;
  profileForm: FormGroup;
  user: User;
  userSub: Subscription;
  isHovering: boolean;
  profileImgUrl: String;
  srcLoaded: boolean;
  userUid: String;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private fileStorageService: FileStorageService,
    private route: Router,
    private angularFireStore: AngularFirestore
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

    this.userCreated = false;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  signup() {
    const model = this.signupForm.value as User;
    this.authService
      .signup(model)
      .then(user => {
        this.userCreated = true;
        /*
        this.router.navigateByUrl('home').then(() => {
          this.snackBar.open('Signed up!', '', {
            duration: 2000
          });
        });
        */
      })
      .catch(error => {
        /*
        this.snackBar.open(error.message, '', {
          duration: 5000
        });
        */
        console.log('ERROR:   ' + error);
      });

      this.prepareNewUser();
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

  prepareNewUser() {
    this.authService.getAuthUserUid();
    this.user = new User();
    this.user.uid = this.authService.authUserUid;
    this.user.name = '';
    this.user.contactEmail = '';
    this.user.address = '';
    this.user.profileImgUrl = '';
    this.userService.createUserProfile(this.user);
    this.userSub = this.userService
    .getUserWithProfileUrl()
    .subscribe(user => {
      this.user = user;
      if (this.user.profileImgUrl) {
        this.profileImgUrl = user.profileImgUrl;
      } else {
        // change to database one
        this.profileImgUrl = '/assets/baseline-face-24px.svg';
      }
      this.profileForm.patchValue(user);
    });
  }

  save() {
    // this.prepareNewUser();
    const model = this.profileForm.value as User;
    model.uid = this.authService.authUserUid;
    console.log('add-prodile: saving user in model on Save' + model.uid);
    this.userService
      .updateUser(model)
      .then(() => {
        this.route.navigateByUrl('/home');
        this.snack.open('user saved', null, {
          duration: 2000
        });
      })
      .catch(error => {
        this.snack.open('Something went wrong!', null, {
          duration: 4000
        });
      });
  }


  unchanger(): boolean {
    const model = this.profileForm.value as User;
    return (
      model.name === this.user.name &&
      model.address === this.user.address &&
      model.contactEmail === this.user.contactEmail
    );
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

  hovering(isHovering: boolean) {
    this.isHovering = isHovering;
  }

  uploadNewImage(fileList) {
    console.log('upload new image');
    if (
      fileList &&
      fileList.length === 1 &&
      ['image/jpeg', 'image/png'].indexOf(fileList.item(0).type) > -1
    ) {
      this.srcLoaded = false;
      console.log(fileList.item(0));
      const file = fileList.item(0);
      const path = 'profile-images/' + this.user.uid;
      this.fileStorageService.upload(path, file).downloadUrl.subscribe(url => {
        this.profileImgUrl = url;
        this.save();
        this.hovering(false);
      });
    } else {
      console.log('wrong: ');
      this.snack.open('You need to drop a single png or jpeg image', null, {
        duration: 4000
      });
      this.hovering(false);
    }
  }
}
