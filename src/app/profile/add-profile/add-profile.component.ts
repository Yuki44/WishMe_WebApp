import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { FileStorageService } from './../../shared/storage/file-storage.service';
import { MatSnackBar } from '@angular/material';
import { UserService } from './../shared/user.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from './../../shared/entities/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: User;
  userSub: Subscription;
  isHovering: boolean;
  img: String;
  srcLoaded: boolean;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private fileStorageService: FileStorageService,
    private route: Router,
    private authService: AuthService,
    private angularForeStore: AngularFirestore
  ) {
    this.profileForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      address: '',
      contactEmail: ''
    });
  }

  ngOnInit() {

   this.user = new User();
    // this.user.uid = dbUser.uid;
    this.user.address = 'Addresssss';
    this.user.contactEmail = 'contact@email.com';
    this.user.email = 'contact@email.com';
    this.user.name = 'UserName';
    this.user.profileImgUrl = 'img';

    console.log('###########  ' + this.user.name);

    this.createDbUser(this.user);
    /*
       this.userSub = this.userService.getUserWithProfileUrl()
      .subscribe(user => {
        this.user = user;
        console.log('###########################');
        console.log(user);
        });
    // this.user = this.userService.getUser();
    */
    /*
    this.userSub = this.userService.getUserWithProfileUrl()
      .subscribe(user => {
        this.user = user;
        console.log(user.profileImgUrl);
        this.img = user.profileImgUrl;
        this.profileForm.patchValue(user);
      });
      */
  }
  /*
  ngOnDestroy() {
    console.log('user: ');
    this.userSub.unsubscribe();
  }
  */

  createDbUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService
      .getAuthUser()
      .first()
      .subscribe(authUser => {
        if (authUser && user != null) {
          console.log('#@#@#@#@#@#');
          const coll = this.angularForeStore.collection<User>('app/users/' + authUser.uid);
          console.log('AUTH USER UID: ' + authUser.uid);
          console.log('AUTH SERVICE UID: ' + this.authService.getAuthUser());

          coll.add({
            address: user.address,
            contactEmail: user.contactEmail,
            name: user.name,
            uid: authUser.uid
          }).then(resolve).catch(reject);
      } else {
          reject('User == null / no AuthUser');
      }
    });
  });
}

  /*
createWishlist(list: WishList): Promise<any>{
  if (list != null) {
    console.log("list in serivce:" + list);
    const collection = this.afs.collection<any>('wishlist');
    return collection.add({owner: list.owner, wListName: list.wListName});

  } else {
    return new Promise((resolve, reject) => {
      reject('Value is not a valid');
          });
  }
}
*/

  save() {
    const model = this.profileForm.value as User;
    model.uid = this.user.uid;
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
        this.img = url;
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
