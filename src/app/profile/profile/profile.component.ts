import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/entities/user';
import { Subscription } from 'rxjs/Subscription';
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
  img?: String;

  constructor(private userService: UserService, private route: Router) {}

  ngOnInit() {
    this.img = 'assets/baseline-face-24px.svg';
    this.userSub = this.userService.getUser().subscribe(user => this.user = user);
    this.userSub = this.userService.getUserWithProfileUrl().subscribe(user => {
      this.user = user;
      console.log(user.profileImgUrl);
      this.img = user.profileImgUrl;
    });
  }

  edit() {
    this.route.navigateByUrl('/editprofile');
  }
}
