import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/entities/user';
import { Subscription } from 'rxjs/Subscription';
import { FileStorageService } from '../../shared/storage/file-storage.service';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  userSub: Subscription;
  img: String;

  constructor(private userService: UserService,
              private route: Router) { }

  ngOnInit() {
    this.userSub = this.userService.getUserWithProfileUrl()
      .subscribe(user => {
        this.user = user;
        console.log(user.profileImgUrl);
        this.img = user.profileImgUrl;
      });
  }

  edit() {
    this.route.navigateByUrl('/editprofile');
  }

}
