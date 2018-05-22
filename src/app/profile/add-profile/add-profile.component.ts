import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { FileStorageService } from './../../shared/storage/file-storage.service';
import { MatSnackBar } from '@angular/material';
import { UserService } from './../shared/user.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from './../../shared/entities/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  user: User;
  userSub: Subscription;
  isHovering: boolean;
  profileImgUrl: String;
  srcLoaded: boolean;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private fileStorageService: FileStorageService,
    private route: Router,
    private authService: AuthService,
    private angularFireStore: AngularFirestore
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
