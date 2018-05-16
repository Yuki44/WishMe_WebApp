import { Component, OnInit } from '@angular/core';
import { User } from '../shared/entities/user';
import { UserService } from '../profile/shared/user.service';
import { FileStorageService } from '../shared/storage/file-storage.service';
import { Subscription } from 'rxjs/Subscription';
import { WishlistService } from '../shared/services/wishlist.service';
import { AuthService } from '../auth/shared/auth.service';
import { forEach } from '@angular/router/src/utils/collection';
import { WishList } from '../shared/entities/wish-list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wishlist-list',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  userSub: Subscription;
  wishlists: WishList[];
  edit: boolean = false;
  editForm: FormGroup;



  constructor(private wishListService: WishlistService,
              private fb: FormBuilder,
              private auth: AuthService) {
    this.editForm = fb.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.userSub = this.auth.getAuthUser()
      .subscribe(user => {
        this.user = user;
        this.wishListService.getWishLists(this.user.uid).subscribe(wishlists => {
          this.wishlists = wishlists;
        });
      });
  }

  goToWishList(wishlist: WishList){
    console.log("wishlist clicked!" + wishlist.id);
  }

  editList(){
    this.edit = true;
  }

}
