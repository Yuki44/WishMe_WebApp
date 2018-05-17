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
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { AddWishComponent } from '../wishes/add-wish/add-wish.component';
import { AddWishlistComponent } from './add-wishlist/add-wishlist.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-wishlist-list',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  wList: WishList;
  user: User;
  userSub: Subscription;
  wishlists: WishList[];
  editForm: FormGroup;
  addWishRef: MatDialogRef<AddWishlistComponent>;



  constructor(private wishListService: WishlistService,
              private fb: FormBuilder,
              private auth: AuthService,
              private dialog: MatDialog) {
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
          console.log(wishlists);
        });
      });


  }

  goToWishList(wishlist: WishList){
    console.log('wishlist clicked!' + wishlist.id);
  }

  editList(){
  }
  openDialog(){
    this.wList = new WishList();
    this.addWishRef = this.dialog.open(AddWishlistComponent, {
      hasBackdrop: false
    });
    this.addWishRef.afterClosed()
      .pipe(filter(name => name))
      .map(name => {
        this.wList.wListName = name;
        this.wList.owner = this.user.uid;

      }).subscribe(wlisT => {
      this.wishListService.createWishlist(this.wList)
    });
  }

}
