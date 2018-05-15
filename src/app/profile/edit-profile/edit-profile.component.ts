import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/entities/user';
import { Subscription } from 'rxjs/Subscription';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { MatSnackBar } from '@angular/material';
import { FileStorageService } from '../../shared/storage/file-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  animations: [trigger('imageHover', [
    state('hoveringImage', style({
      opacity: 0.3
    })),
    state('notHoveringImage', style({
      opacity: 1
    })),
    transition('hoveringImage <=> notHoveringImage', animate('200ms ease-in'))
  ])]
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup;
  user: User;
  userSub: Subscription;
  isHovering: boolean;
  img: String;
  srcLoaded: boolean;



  constructor(private userService: UserService,
              private fb: FormBuilder,
              private snack: MatSnackBar,
              private fileStorageService: FileStorageService,
              private route: Router) {
    this.profileForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      address: '',
      contactEmail: ''
    });
  }

  ngOnInit() {
    this.userSub = this.userService.getUserWithProfileUrl()
      .subscribe(user => {
        this.user = user;
        console.log(user.profileImgUrl);
        this.img = user.profileImgUrl;
        this.profileForm.patchValue(user);
      });
  }
  ngOnDestroy() {
    console.log("user: ");
    this.userSub.unsubscribe();
  }

  save() {
    const model = this.profileForm.value as User;
    model.uid = this.user.uid;
    this.userService.updateUser(model)
      .then(() => {
        this.route.navigateByUrl("/home");
        this.snack.open('user saved', null, {
          duration: 2000
        });
      } )
      .catch(error => {
        this.snack.open('Something went wrong!', null, {
          duration: 4000
        });
      });
  }

  unchanger(): boolean {
    const model = this.profileForm.value as User;
    return model.name === this.user.name &&
      model.address === this.user.address &&
      model.contactEmail === this.user.contactEmail;
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
    console.log("upload new image");
    if (fileList && fileList.length === 1 &&
      ['image/jpeg', 'image/png'].indexOf(fileList.item(0).type) > -1) {
      this.srcLoaded = false;
      console.log(fileList.item(0));
      const file = fileList.item(0);
      const path = 'profile-images/' + this.user.uid;
      this.fileStorageService.upload(path, file).downloadUrl.subscribe(
        url => {
          this.img = url;
          this.save();
          this.hovering(false);
        }
      );
    } else {
      console.log('wrong: ');
      this.snack.open('You need to drop a single png or jpeg image', null, {
        duration: 4000
      });
      this.hovering(false);

    }
  }
}
