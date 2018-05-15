import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/entities/user';
import { Subscription } from 'rxjs/Subscription';
import { FileStorageService } from '../../shared/storage/file-storage.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  userSub: Subscription;
  img: String;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userSub = this.userService.getUserWithProfileUrl()
      .subscribe(user => {
        this.user = user;
        console.log(user.profileImgUrl);
        this.img = user.profileImgUrl;
      });
  }

}
