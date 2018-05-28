import { Component, OnInit } from '@angular/core';
import { User } from '../shared/entities/user';
import { Subscription } from 'rxjs/Subscription';
import { WishlistService } from '../shared/services/wishlist.service';
import { AuthService } from '../auth/shared/auth.service';
import { WishList } from '../shared/entities/wish-list';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddWishlistComponent } from './add-wishlist/add-wishlist.component';
import { filter } from 'rxjs/operators';
import { EditWishlistComponent } from './edit-wishlist/edit-wishlist.component';
import { DeleteWishlistComponent } from './delete-wishlist/delete-wishlist.component';
import { Router } from '@angular/router';

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
  addWishRef: MatDialogRef<AddWishlistComponent>;
  editWishRef: MatDialogRef<EditWishlistComponent>;
  deleteWishRef: MatDialogRef<DeleteWishlistComponent>;

  constructor(
    private wishListService: WishlistService,
    private auth: AuthService,
    private dialog: MatDialog,
    private route: Router
  ) {}

  ngOnInit() {
    this.userSub = this.auth.getAuthUser().subscribe(user => {
      this.user = user;
      this.wishListService.getWishLists(this.user.uid).subscribe(wishlists => {
        this.wishlists = wishlists;
        console.log(wishlists);
      });
    });
  }

  goToWishList(wishlist: WishList) {
    console.log('wishlist clicked!' + wishlist.id);
    this.route.navigateByUrl('/wishes/' + wishlist.id);
  }

  editList(wl: WishList) {
    this.wList = new WishList();
    this.editWishRef = this.dialog.open(EditWishlistComponent, {
      hasBackdrop: false,
      data: {
        name: this.wList ? wl.wListName : ''
      }
    });
    this.editWishRef
      .afterClosed()
      .pipe(filter(name => name))
      .map(name => {
        this.wList.wListName = name;
        this.wList.owner = this.user.uid;
        this.wList.id = wl.id;
      })
      .subscribe(wlisT => {
        this.wishListService.updateWishList(this.wList);
      });
  }

  openDialog() {
    this.wList = new WishList();
    this.addWishRef = this.dialog.open(AddWishlistComponent, {
      hasBackdrop: false
    });
    this.addWishRef
      .afterClosed()
      .pipe(filter(name => name))
      .map(name => {
        this.wList.wListName = name;
        this.wList.owner = this.user.uid;
      })
      .subscribe(wlisT => {
        this.wishListService.createWishlist(this.wList);
      });
  }

  deleteList(wl: WishList) {
    event.stopPropagation();
    this.wList = new WishList();
    this.deleteWishRef = this.dialog.open(DeleteWishlistComponent, {
      hasBackdrop: false,
      data: {
        name: this.wList ? wl.wListName : ''
      }
    });
    this.deleteWishRef
      .afterClosed()
      .pipe(filter(name => name))
      .subscribe(wlisT => {
        this.wishListService.deleteWishList(wl);
      });
  }
}
