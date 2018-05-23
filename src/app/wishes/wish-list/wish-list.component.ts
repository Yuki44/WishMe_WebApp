import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WishList } from '../../shared/entities/wish-list';
import { Wish } from '../../shared/entities/wish';
import { WishService } from '../../shared/services/wish.service';
import 'rxjs/operator/switchMap';
import { WishDeleteComponent } from '../wish-delete/wish-delete.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteWishlistComponent } from '../../home/delete-wishlist/delete-wishlist.component';
import { filter } from 'rxjs/operators';
import { DataService } from '../../shared/services/data.service';
import { WishlistService } from '../../shared/services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']



})
export class WishListComponent implements OnInit {
  descriptionVisible: boolean;
  wishes: Wish[];
  wishList: WishList;
  wish: Wish;
  deleteWishRef: MatDialogRef<WishDeleteComponent>;



  constructor(private route: Router,
              private aRoute: ActivatedRoute,
              private wishService: WishService,
              private listService: WishlistService,
              private dialog: MatDialog,
              private data: DataService) {

  }

  toggleDescription(){
    if(this.descriptionVisible){
      this.descriptionVisible = false;
    } else {
      this.descriptionVisible = true;
    }
  }

  ngOnInit() {
    this.aRoute.paramMap
      .switchMap(params => this.wishService.getWishes(params.get('id')))
      .subscribe(wishes => this.wishes = wishes);
    this.aRoute.paramMap.switchMap(params => this.listService.getOneWishlist(params.get('id'))).
      subscribe(list => {
    this.wishList = list;
    });
  }

  editWish(wish: Wish) {
    this.data.changeMessage(wish.id);
    this.route.navigateByUrl('/wish');

  }

  addWish() {
    this.wish = new Wish();
    this.wish.name = 'name';
    this.wish.rating = 1;
    this.wish.price = '0DKK';
    this.wish.link = 'www.google.com';
    this.wish.description = 'Description';
    this.aRoute.paramMap
      .switchMap(params => this.wishService.createWish(this.wish,params.get('id'))).map(wish => this.data.changeMessage(wish.id))
      .subscribe(wish =>  this.route.navigateByUrl('/wish'));

  }

  deleteWish(w: Wish){
    this.wish = new Wish();
    this.deleteWishRef = this.dialog.open(WishDeleteComponent, {
      hasBackdrop: false,
      data: {
        name: this.wish ? w.name : '',
      }
    });
    this.deleteWishRef.afterClosed()
      .pipe(filter(name => name))
      .subscribe(wish => {
        this.wishService.deleteWish(w);
      });
  }
}
